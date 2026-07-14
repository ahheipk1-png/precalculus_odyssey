  // ============================================================================
  // cloud-save.js — client cloud-save layer (Cloudflare Pages Functions + D1).
  // ----------------------------------------------------------------------------
  // Classic script in the shared global scope (loads after 03-save.js). Adds a
  // cloud layer AROUND the existing localStorage save without replacing it:
  //   saveGame()  →  localStorage (unchanged)  →  Cloud.queueSave() (debounced)
  //
  // Design (see Precalculus_Odyssey_Cloudflare_Hosting_and_Cloud_Save.md):
  //   • localStorage stays the fast cache + offline fallback.
  //   • Cloud (D1) is the authoritative long-term save, event-based + debounced.
  //   • Anonymous account via a one-time Recovery Code; server issues a session
  //     token (Bearer). The client never sees D1 ids as secrets.
  //   • Every profile has a monotonic server `revision`; PUT sends expectedRevision
  //     so a stale write returns 409 → conflict UI (never a silent overwrite).
  //   • Offline / errors: keep a pending snapshot, retry with backoff, show status.
  //   • Optional best-effort C:\temp backup via a localhost companion (off by default).
  // The canonical snapshot body is the EXISTING getSaveSnapshot() — no competing
  // state model. All API paths are RELATIVE (/api/cloud/...); no domain hard-coded.
  // ============================================================================
  (function(){
    var API = '/api/cloud';
    var LS = {
      session: 'poCloudSession',   // { token, accountId, expiresAt }
      meta:    'poCloudMeta',      // { [profileId]: { revision, lastSyncAt, status } }
      prefs:   'poSavePrefs',      // savePreferences
      pending: 'poCloudPending'    // { [profileId]: snapshot }  awaiting upload
    };
    var DEBOUNCE_MS = 10000;       // 10s after the last meaningful mutation
    var _timer = null, _retryTimer = null, _backoff = 0, _online = (typeof navigator === 'undefined') || navigator.onLine !== false;

    function readJSON(k, dflt){ try { return JSON.parse(localStorage.getItem(k)) || dflt; } catch (e) { return dflt; } }
    function writeJSON(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

    var Cloud = {
      status: 'local',     // 'local' | 'saved' | 'saving' | 'offline' | 'conflict' | 'error'
      lastError: null,
      onStatus: null       // optional hook set by the UI
    };

    // ---- preferences ----
    function prefs(){
      var p = readJSON(LS.prefs, null);
      if (!p){ p = { cloudSaveEnabled: true, localStorageEnabled: true, localFileBackupEnabled: false, localFileServiceUrl: 'http://127.0.0.1:8765' }; writeJSON(LS.prefs, p); }
      return p;
    }
    function setPref(k, v){ var p = prefs(); p[k] = v; writeJSON(LS.prefs, p); }
    function session(){ return readJSON(LS.session, null); }
    function loggedIn(){ var s = session(); return !!(s && s.token); }
    function meta(){ return readJSON(LS.meta, {}); }
    function setMeta(pid, patch){ var m = meta(); m[pid] = Object.assign({}, m[pid], patch); writeJSON(LS.meta, m); }
    function pending(){ return readJSON(LS.pending, {}); }
    function setPending(pid, snap){ var p = pending(); if (snap) p[pid] = snap; else delete p[pid]; writeJSON(LS.pending, p); }

    function setStatus(s, err){ Cloud.status = s; Cloud.lastError = err || null; if (typeof Cloud.onStatus === 'function') { try { Cloud.onStatus(s, err); } catch (e) {} } if (typeof updateCloudStatusUI === 'function') updateCloudStatusUI(); }

    // ---- HTTP ----
    function api(method, path, body){
      var s = session();
      var headers = { 'Content-Type': 'application/json' };
      if (s && s.token) headers['Authorization'] = 'Bearer ' + s.token;
      return fetch(API + path, { method: method, headers: headers, body: body ? JSON.stringify(body) : undefined })
        .then(function(res){
          return res.text().then(function(t){
            var data = null; try { data = t ? JSON.parse(t) : null; } catch (e) {}
            if (!res.ok){ var e = new Error('HTTP ' + res.status); e.status = res.status; e.data = data; throw e; }
            return data;
          });
        });
    }

    // ---- canonical snapshot (reuse the proven getSaveSnapshot) ----
    function serialize(){
      var body = (typeof getSaveSnapshot === 'function') ? getSaveSnapshot() : null;
      if (!body) return null;
      return {
        saveVersion: body.schemaVersion || 2,
        profileId: body.id,
        playerName: body.name,
        clientUpdatedAt: new Date().toISOString(),
        data: body
      };
    }

    // ---- account ----
    function createAccount(){
      return api('POST', '/account', { deviceName: (navigator && navigator.userAgent || '').slice(0, 60) })
        .then(function(r){
          writeJSON(LS.session, { token: r.sessionToken, accountId: r.accountId, expiresAt: r.expiresAt });
          setStatus('saved');
          return r; // caller shows r.recoveryCode ONCE
        });
    }
    function recoverAccount(code){
      return api('POST', '/account/recover', { recoveryCode: String(code || '').trim() })
        .then(function(r){ writeJSON(LS.session, { token: r.sessionToken, accountId: r.accountId, expiresAt: r.expiresAt }); setStatus('saved'); return r; });
    }
    function signOut(){ localStorage.removeItem(LS.session); setStatus('local'); }

    // ---- profiles ----
    function listProfiles(){ return api('GET', '/profiles'); }
    function loadProfile(pid){ return api('GET', '/profiles/' + encodeURIComponent(pid)); }
    function deleteProfile(pid){ return api('DELETE', '/profiles/' + encodeURIComponent(pid)); }

    // Upload one snapshot with optimistic-concurrency revision.
    function pushProfile(snap){
      if (!snap || !snap.profileId) return Promise.resolve(null);
      var pid = snap.profileId;
      var m = meta()[pid] || {};
      setStatus('saving');
      return api('PUT', '/profiles/' + encodeURIComponent(pid), {
        expectedRevision: (typeof m.revision === 'number') ? m.revision : 0,
        saveVersion: snap.saveVersion,
        playerName: snap.playerName,
        save: snap.data
      }).then(function(r){
        setMeta(pid, { revision: r.revision, lastSyncAt: r.updatedAt, status: 'saved' });
        setPending(pid, null);
        _backoff = 0;
        setStatus('saved');
        return r;
      });
    }

    // ---- sync queue (debounced) ----
    function queueSave(reason){
      if (!prefs().cloudSaveEnabled || !loggedIn()) return;   // cloud is opt-in via account creation
      var snap = serialize();
      if (!snap) return;
      setPending(snap.profileId, snap);
      if (Cloud.status !== 'saving') setStatus('saving');
      if (_timer) clearTimeout(_timer);
      var wait = (reason === 'flush' || reason === 'sync-now') ? 0 : DEBOUNCE_MS;
      _timer = setTimeout(flush, wait);
    }

    function flush(){
      if (_timer){ clearTimeout(_timer); _timer = null; }
      if (!loggedIn()){ setStatus('local'); return Promise.resolve(); }
      if (!_online){ setStatus('offline'); scheduleRetry(); return Promise.resolve(); }
      var p = pending(); var ids = Object.keys(p);
      if (!ids.length){ setStatus('saved'); return Promise.resolve(); }
      // upload sequentially; stop on the first conflict so the user can resolve it
      var chain = Promise.resolve();
      ids.forEach(function(pid){
        chain = chain.then(function(){
          return pushProfile(p[pid])
            .then(function(){ if (prefs().localFileBackupEnabled) backupToLocalFile(p[pid]); })
            .catch(function(e){ handleSyncError(e, pid); throw e; });
        });
      });
      return chain.catch(function(){ /* stop chain; error already handled */ });
    }

    function handleSyncError(e, pid){
      var st = e && e.status;
      if (st === 409){ setStatus('conflict', e.data); if (typeof onCloudConflict === 'function') onCloudConflict(pid, e.data); return; }
      if (st === 401){ setStatus('error', 'session expired'); return; }      // ask to re-enter recovery code
      if (st === 413){ setStatus('error', 'save too large'); return; }        // keep local copy; do not retry forever
      if (st === 429 || !st || st >= 500){ setStatus('offline'); scheduleRetry(); return; } // transient → backoff
      setStatus('error', 'cloud error ' + st);
    }

    function scheduleRetry(){
      if (_retryTimer) return;
      _backoff = Math.min(_backoff ? _backoff * 2 : 5000, 120000);   // 5s → … → 2min cap
      _retryTimer = setTimeout(function(){ _retryTimer = null; if (Object.keys(pending()).length) flush(); }, _backoff);
    }

    // ---- optional best-effort local-file backup (localhost companion) ----
    function backupToLocalFile(snap){
      var url = prefs().localFileServiceUrl;
      if (!url) return;
      fetch(url + '/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(snap) })
        .catch(function(){ /* failure here must NEVER affect cloud status */ });
    }
    function detectLocalFileService(){
      var url = prefs().localFileServiceUrl; if (!url) return Promise.resolve(false);
      return fetch(url + '/health').then(function(r){ return r.ok; }).catch(function(){ return false; });
    }

    // ---- lifecycle: online/offline + flush on hide ----
    if (typeof window !== 'undefined'){
      window.addEventListener('online', function(){ _online = true; if (Object.keys(pending()).length) flush(); });
      window.addEventListener('offline', function(){ _online = false; setStatus('offline'); });
      document.addEventListener('visibilitychange', function(){ if (document.visibilityState === 'hidden' && Object.keys(pending()).length) flush(); });
    }

    // ---- public API ----
    Cloud.queueSave = queueSave;
    Cloud.syncNow = function(){ queueSave('sync-now'); };
    Cloud.createAccount = createAccount;
    Cloud.recoverAccount = recoverAccount;
    Cloud.signOut = signOut;
    Cloud.listProfiles = listProfiles;
    Cloud.loadProfile = loadProfile;
    Cloud.deleteProfile = deleteProfile;
    Cloud.serialize = serialize;
    Cloud.prefs = prefs;
    Cloud.setPref = setPref;
    Cloud.loggedIn = loggedIn;
    Cloud.meta = meta;
    Cloud.detectLocalFileService = detectLocalFileService;
    Cloud.hasPending = function(){ return Object.keys(pending()).length > 0; };
    window.Cloud = Cloud;
  })();
