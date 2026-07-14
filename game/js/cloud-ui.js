  // ============================================================================
  // cloud-ui.js — the Cloud Save panel + status indicator (pairs with cloud-save.js).
  // Classic script in the shared scope. Builds an overlay panel on demand and wires
  // the account / recovery / sync / conflict / export-import / migration flows.
  // Never blocks gameplay: a cloud failure only changes the small status chip.
  // ============================================================================
  (function(){
    var STATUS = {
      saved:   { icon:'☁', label:'Saved to cloud',        cls:'cst-ok' },
      saving:  { icon:'☁', label:'Saving…',               cls:'cst-busy' },
      offline: { icon:'⚠', label:'Offline — saved here',  cls:'cst-warn' },
      conflict:{ icon:'⚠', label:'Cloud conflict',        cls:'cst-warn' },
      error:   { icon:'✕', label:'Cloud save error',      cls:'cst-err' },
      local:   { icon:'○', label:'Local-only profile',    cls:'cst-dim' }
    };

    function esc(s){ return (typeof escapeHtml === 'function') ? escapeHtml(String(s)) : String(s == null ? '' : s); }
    function toast(m){ if (typeof showToast === 'function') showToast(m); }
    function fmtTime(iso){ if (!iso) return '—'; try { return new Date(iso).toLocaleString(); } catch (e) { return iso; } }

    // ---- header status chip ----
    window.updateCloudStatusUI = function(){
      var icon = document.getElementById('cloudStatusIcon');
      var btn = document.getElementById('cloudBtn');
      if (!icon || !window.Cloud) return;
      var s = STATUS[Cloud.status] || STATUS.local;
      icon.textContent = s.icon;
      if (btn){ btn.classList.remove('cst-ok','cst-busy','cst-warn','cst-err','cst-dim'); btn.classList.add(s.cls); btn.title = 'Cloud Save — ' + s.label; }
      var p = document.getElementById('cloudPanel');
      if (p && p.getAttribute('data-open') === '1') renderCloudPanel();  // live-refresh when open
    };
    if (window.Cloud) Cloud.onStatus = window.updateCloudStatusUI;

    // ---- panel ----
    function ensurePanel(){
      var p = document.getElementById('cloudPanel');
      if (p) return p;
      p = document.createElement('div');
      p.id = 'cloudPanel'; p.className = 'cloud-overlay'; p.setAttribute('data-open','0');
      p.addEventListener('click', function(ev){ if (ev.target === p) closeCloudPanel(); });
      document.body.appendChild(p);
      return p;
    }
    window.openCloudPanel = function(){ var p = ensurePanel(); p.setAttribute('data-open','1'); p.style.display='flex'; renderCloudPanel(); };
    window.closeCloudPanel = function(){ var p = document.getElementById('cloudPanel'); if (p){ p.setAttribute('data-open','0'); p.style.display='none'; } };

    function renderCloudPanel(){
      var p = ensurePanel();
      var C = window.Cloud, inCloud = C && C.loggedIn();
      var s = STATUS[C ? C.status : 'local'] || STATUS.local;
      var prefs = C ? C.prefs() : {};
      var acct = inCloud
        ? '<div class="cl-row"><button class="btn btn-primary" onclick="cloudSyncNow()">☁ Sync Now</button>' +
          '<button class="btn btn-ghost" onclick="cloudSignOut()">Sign out of cloud</button></div>' +
          '<div class="cl-note">Signed in to cloud. Your progress uploads automatically after you play.</div>' +
          '<div id="cloudProfileList" class="cl-profiles">Loading cloud profiles…</div>'
        : '<div class="cl-row"><button class="btn btn-primary" onclick="cloudEnable()">✨ Enable Cloud Save</button>' +
          '<button class="btn btn-ghost" onclick="cloudRecoverPrompt()">Enter recovery code</button></div>' +
          '<div class="cl-note">Cloud Save lets you continue on another device. No email needed — you get a one-time <b>recovery code</b>.</div>';

      p.innerHTML =
        '<div class="cloud-card">' +
          '<div class="cl-head"><h2>☁ Cloud Save</h2><button class="btn btn-ghost" onclick="closeCloudPanel()">✕</button></div>' +
          '<div class="cl-status ' + s.cls + '">' + s.icon + ' ' + esc(s.label) + '</div>' +
          acct +
          '<hr class="cl-hr">' +
          '<div class="cl-sub">Backup &amp; transfer</div>' +
          '<div class="cl-row"><button class="btn btn-ghost" onclick="cloudExport()">⬇ Export save (JSON)</button>' +
          '<button class="btn btn-ghost" onclick="cloudImport()">⬆ Import save (JSON)</button></div>' +
          '<label class="cl-check"><input type="checkbox" id="clLocalBk" ' + (prefs.localFileBackupEnabled ? 'checked' : '') + ' onchange="cloudToggleLocalBackup(this.checked)"> ' +
            'Also back up to <code>C:\\temp\\PrecalculusOdyssey</code> (optional; needs the local companion running)</label>' +
          '<div id="clLocalStatus" class="cl-note"></div>' +
        '</div>';

      if (inCloud) refreshCloudProfiles();
      if (prefs.localFileBackupEnabled) checkLocalBackup();
    }

    function refreshCloudProfiles(){
      var box = document.getElementById('cloudProfileList'); if (!box || !window.Cloud) return;
      Cloud.listProfiles().then(function(r){
        var list = (r && r.profiles) || [];
        if (!list.length){ box.innerHTML = '<div class="cl-note">No cloud profiles yet. Play a bit, or use “Enable Cloud Save” to upload your local profiles.</div>'; return; }
        box.innerHTML = '<div class="cl-sub">Cloud profiles</div>' + list.map(function(pr){
          return '<div class="cl-prof"><div class="cl-prof-main"><b>' + esc(pr.player_name) + '</b>' +
            '<span class="cl-prof-meta">rev ' + pr.revision + ' · ' + fmtTime(pr.updated_at) + '</span></div>' +
            '<div class="cl-prof-btns"><button class="btn btn-ghost" onclick="cloudLoadProfile(\'' + esc(pr.profile_id) + '\')">Load here</button></div></div>';
        }).join('');
      }).catch(function(e){ box.innerHTML = '<div class="cl-note">Could not list cloud profiles (' + (e && e.status || 'offline') + ').</div>'; });
    }

    // ---- account ----
    window.cloudEnable = function(){
      if (!window.Cloud) return;
      Cloud.createAccount().then(function(r){
        showRecoveryCode(r.recoveryCode);
        offerMigration();
        renderCloudPanel();
      }).catch(function(e){ toast('Could not enable cloud save (' + (e && e.status || 'offline') + ').'); });
    };
    window.cloudRecoverPrompt = function(){
      var code = window.prompt('Enter your Cloud Save recovery code:');
      if (!code) return;
      Cloud.recoverAccount(code).then(function(){ toast('✅ Cloud account restored.'); renderCloudPanel(); })
        .catch(function(e){ toast(e && e.status === 401 ? '❌ That code did not match.' : 'Recovery failed (offline?).'); });
    };
    window.cloudSignOut = function(){ if (window.Cloud){ Cloud.signOut(); toast('Signed out of cloud (local saves kept).'); renderCloudPanel(); } };
    window.cloudSyncNow = function(){ if (window.Cloud){ Cloud.syncNow(); toast('☁ Syncing…'); } };

    function showRecoveryCode(code){
      var m = document.createElement('div'); m.className = 'cloud-overlay'; m.style.display = 'flex';
      m.innerHTML =
        '<div class="cloud-card cl-code-card">' +
          '<div class="cl-head"><h2>🔑 Your recovery code</h2></div>' +
          '<p class="cl-note">Write this down and keep it safe. It is shown <b>only once</b>. Anyone with this code can load your saves; losing it means cloud recovery is impossible.</p>' +
          '<div class="cl-code" id="clCode">' + esc(code) + '</div>' +
          '<div class="cl-row"><button class="btn btn-primary" id="clCopy">📋 Copy</button>' +
          '<button class="btn btn-ghost" onclick="window.print()">🖨 Print</button>' +
          '<button class="btn btn-ghost cl-close-code">I saved it ✓</button></div>' +
        '</div>';
      document.body.appendChild(m);
      m.querySelector('#clCopy').addEventListener('click', function(){ try { navigator.clipboard.writeText(code); toast('Copied.'); } catch (e) { toast('Copy failed — write it down.'); } });
      m.querySelector('.cl-close-code').addEventListener('click', function(){ m.remove(); });
    }

    // ---- migrate local profiles to cloud ----
    function offerMigration(){
      var locals = (typeof loadAllProfiles === 'function') ? loadAllProfiles() : [];
      if (!locals.length) return;
      if (!window.confirm(locals.length + ' local profile(s) found. Upload them to the cloud now?')) return;
      uploadLocals(locals, 0, 0);   // each stored profile already IS a canonical snapshot body
    };
    function uploadLocals(list, i, okN){
      if (i >= list.length){ toast('☁ Uploaded ' + okN + '/' + list.length + ' profile(s) to cloud.'); renderCloudPanel(); return; }
      var pf = list[i];
      // Build a canonical snapshot body from this stored profile (it already IS a getSaveSnapshot body).
      putRawProfile(pf).then(function(){ uploadLocals(list, i + 1, okN + 1); })
                       .catch(function(){ uploadLocals(list, i + 1, okN); });
    }
    // Low-level PUT for an arbitrary stored profile object (used by migration).
    function putRawProfile(pf){
      var meta = (window.Cloud.meta() || {})[pf.id] || {};
      return fetch('/api/cloud/profiles/' + encodeURIComponent(pf.id), {
        method:'PUT',
        headers:{ 'Content-Type':'application/json', 'Authorization':'Bearer ' + (JSON.parse(localStorage.getItem('poCloudSession')||'{}').token || '') },
        body: JSON.stringify({ expectedRevision: meta.revision || 0, saveVersion: pf.schemaVersion || 2, playerName: pf.name, save: pf })
      }).then(function(res){ if(!res.ok){ var e=new Error(res.status); e.status=res.status; throw e; } return res.json(); })
        .then(function(r){ var m = JSON.parse(localStorage.getItem('poCloudMeta')||'{}'); m[pf.id] = { revision:r.revision, lastSyncAt:r.updatedAt, status:'saved' }; localStorage.setItem('poCloudMeta', JSON.stringify(m)); return r; });
    }

    // ---- load a cloud profile onto this device ----
    window.cloudLoadProfile = function(pid){
      if (!window.Cloud) return;
      Cloud.loadProfile(pid).then(function(r){
        var body = r.save; if (!body || !body.id){ toast('That cloud save looks empty.'); return; }
        var list = (typeof loadAllProfiles === 'function') ? loadAllProfiles() : [];
        var idx = list.findIndex(function(p){ return p.id === body.id; });
        if (idx === -1) list.push(body); else list[idx] = body;
        if (typeof saveAllProfiles === 'function') saveAllProfiles(list);
        var m = JSON.parse(localStorage.getItem('poCloudMeta')||'{}'); m[pid] = { revision:r.revision, lastSyncAt:r.updatedAt, status:'saved' }; localStorage.setItem('poCloudMeta', JSON.stringify(m));
        toast('☁ “' + (body.name||'profile') + '” downloaded. Reloading…');
        setTimeout(function(){ location.reload(); }, 900);
      }).catch(function(e){ toast('Could not load that profile (' + (e && e.status || 'offline') + ').'); });
    };

    // ---- conflict ----
    window.onCloudConflict = function(pid, data){
      var m = document.createElement('div'); m.className = 'cloud-overlay'; m.style.display = 'flex';
      m.innerHTML =
        '<div class="cloud-card">' +
          '<div class="cl-head"><h2>⚠ A newer cloud save exists</h2></div>' +
          '<p class="cl-note">The cloud has a newer version of this profile (revision ' + esc(data && data.cloudRevision) + ', ' + fmtTime(data && data.cloudUpdatedAt) + '). Choose which to keep — nothing is overwritten without your say-so.</p>' +
          '<div class="cl-row" style="flex-direction:column; align-items:stretch; gap:8px;">' +
            '<button class="btn btn-primary" id="clUseCloud">Use the cloud save (replace this device)</button>' +
            '<button class="btn btn-ghost" id="clKeepLocal">Keep this device (overwrite cloud)</button>' +
            '<button class="btn btn-ghost" id="clCancelConf">Cancel</button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(m);
      m.querySelector('#clUseCloud').addEventListener('click', function(){ m.remove(); cloudLoadProfile(pid); });
      m.querySelector('#clKeepLocal').addEventListener('click', function(){
        m.remove();
        // Adopt the cloud revision so our next PUT is accepted, then re-queue (overwrites cloud).
        var mm = JSON.parse(localStorage.getItem('poCloudMeta')||'{}'); mm[pid] = Object.assign({}, mm[pid], { revision: (data && data.cloudRevision) || 0 }); localStorage.setItem('poCloudMeta', JSON.stringify(mm));
        if (window.Cloud) Cloud.syncNow();
      });
      m.querySelector('#clCancelConf').addEventListener('click', function(){ m.remove(); });
    };

    // ---- export / import JSON ----
    window.cloudExport = function(){
      var snap = (typeof getSaveSnapshot === 'function') ? getSaveSnapshot() : null;
      if (!snap){ toast('Start a game first.'); return; }
      var blob = new Blob([JSON.stringify(snap, null, 2)], { type:'application/json' });
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob);
      a.download = 'precalculus-odyssey-' + (snap.name || 'save') + '.json'; a.click();
      setTimeout(function(){ URL.revokeObjectURL(a.href); }, 2000);
    };
    window.cloudImport = function(){
      var inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'application/json,.json';
      inp.addEventListener('change', function(){
        var f = inp.files && inp.files[0]; if (!f) return;
        var r = new FileReader();
        r.onload = function(){
          try {
            var body = JSON.parse(r.result);
            if (!body || !body.id || !body.name){ toast('That file is not a valid save.'); return; }
            var list = (typeof loadAllProfiles === 'function') ? loadAllProfiles() : [];
            var idx = list.findIndex(function(p){ return p.id === body.id; });
            if (idx !== -1 && !window.confirm('A profile with this id exists. Replace it?')) return;
            if (idx === -1) list.push(body); else list[idx] = body;
            if (typeof saveAllProfiles === 'function') saveAllProfiles(list);
            toast('⬆ Imported “' + (body.name) + '”. Reloading…');
            setTimeout(function(){ location.reload(); }, 900);
          } catch (e) { toast('Could not read that file.'); }
        };
        r.readAsText(f);
      });
      inp.click();
    };

    // ---- optional local-file backup ----
    window.cloudToggleLocalBackup = function(on){ if (window.Cloud){ Cloud.setPref('localFileBackupEnabled', !!on); if (on) checkLocalBackup(); else { var el0=document.getElementById('clLocalStatus'); if(el0) el0.textContent=''; } } };
    function checkLocalBackup(){
      var box = document.getElementById('clLocalStatus'); if (!box || !window.Cloud) return;
      box.textContent = 'Checking for the local companion…';
      Cloud.detectLocalFileService().then(function(up){
        box.textContent = up ? '✅ Local companion detected — backups will also be written to C:\\temp\\PrecalculusOdyssey.'
                             : '⚠ Local companion not running. Start tools/local-save-server.ps1. Cloud saving is unaffected.';
      });
    }

    // reflect initial status once everything is loaded
    if (typeof window !== 'undefined') setTimeout(function(){ if (typeof updateCloudStatusUI === 'function') updateCloudStatusUI(); }, 0);
  })();
