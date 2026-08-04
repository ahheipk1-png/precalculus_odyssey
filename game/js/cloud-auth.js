// ============================================================================
// cloud-auth.js — username/password login, account-request/approval, admin panel,
// single active session (items 1,2,3,6). Talks to the D1-backed Functions at
// /api/auth/* and /api/admin/*. Replaces the start screen's saved-player LIST
// (item 3) with a Log-in / Request-account form.
//
// NOTE: the network flows require the deployed Cloudflare Functions + the
// migrations (run /api/admin/bootstrap once, which seeds admin/admin). The
// `admin` account is BOTH the admin dashboard owner AND the test account: it
// unlocks test mode in-game and is exempt from single-login (see TEST_USERNAMES
// in _shared.js / TEST_NAMES in 01-data.js).
// ============================================================================
(function () {
  var AUTH_KEY = 'poAuthSession';
  function loadSession(){ try { return JSON.parse(localStorage.getItem(AUTH_KEY)); } catch (e) { return null; } }
  function saveSession(s){ try { localStorage.setItem(AUTH_KEY, JSON.stringify(s)); } catch (e) {} }
  function clearSession(){ try { localStorage.removeItem(AUTH_KEY); } catch (e) {} }
  window.authSession = loadSession;

  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function (c){ return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]; }); }

  async function api(path, opts){
    opts = opts || {};
    var headers = { 'Content-Type': 'application/json' };
    var sess = loadSession();
    if (opts.auth && sess && sess.token) headers['Authorization'] = 'Bearer ' + sess.token;
    var res, data = {};
    try {
      res = await fetch(path, { method: opts.method || 'POST', headers: headers, body: opts.body ? JSON.stringify(opts.body) : undefined });
      try { data = await res.json(); } catch (e) {}
      return { status: res.status, ok: res.ok, data: data };
    } catch (e) {
      return { status: 0, ok: false, data: { error: 'Network error — is the game deployed to Cloudflare?' } };
    }
  }

  // ---------- start-screen login / register ----------
  var authTab = 'login';
  function msg(text, kind){ var m = document.getElementById('authMsg'); if (m){ m.textContent = text || ''; m.className = 'auth-msg' + (kind ? (' auth-' + kind) : ''); } }

  function formHtml(){
    var isLogin = authTab === 'login';
    return '<div class="auth-form">' +
      '<input type="text" id="authUser" class="auth-input" placeholder="' + (isLogin ? 'Username' : 'Choose a username (3–16)') + '" autocomplete="username" maxlength="16">' +
      '<div class="auth-pass-wrap">' +
        '<input type="password" id="authPass" class="auth-input" placeholder="' + (isLogin ? 'Password' : 'Choose a password (8+ characters)') + '" autocomplete="' + (isLogin ? 'current-password' : 'new-password') + '" maxlength="64">' +
        '<button type="button" class="auth-eye" id="authEye" onclick="authToggleEye()" aria-label="Show password" title="Show / hide password">👁</button>' +
      '</div>' +
      '<button type="button" class="btn btn-primary auth-submit" onclick="' + (isLogin ? 'authLogin()' : 'authRegister()') + '">' + (isLogin ? 'Log in ▶' : 'Request account ▶') + '</button>' +
      (isLogin ? '' : '<p class="auth-note">An admin approves new accounts before your first log-in.</p>') +
      '</div>';
  }
  // Faint gold math formulas scattered around the hero (decorative only).
  var AUTH_FORMULAS = [
    ['6%', '16%', 'y = \\sin x'], ['5%', '40%', 'e^{i\\theta} = \\cos\\theta + i\\sin\\theta'],
    ['7%', '66%', 'y = a\\cos x + b'], ['82%', '20%', 'y = ax^2 + bx + c'],
    ['84%', '46%', '\\tfrac{d}{dx}(x^n)=nx^{n-1}'], ['80%', '70%', '\\sin^2 x + \\cos^2 x = 1'],
    ['20%', '82%', '\\pi'], ['70%', '84%', '\\theta']
  ];
  function heroDecorHtml(){
    var f = AUTH_FORMULAS.map(function (p){
      return '<span class="auth-formula" style="left:' + p[0] + ';top:' + p[1] + '">' + esc(p[2].replace(/\\\w+|[{}^]/g, function(m){
        return ({ '\\sin':'sin','\\cos':'cos','\\theta':'θ','\\pi':'π','\\tfrac':'','\\frac':'','\\;':' ' })[m] || (m === '^' ? '^' : (m === '{' || m === '}' ? '' : m));
      })) + '</span>';
    }).join('');
    return '<div class="auth-stars" aria-hidden="true"></div><div class="auth-decor" aria-hidden="true">' + f + '</div>';
  }
  function featureStripHtml(){
    var items = [['🧭', 'Explore Realms', 'Journey through beautiful math worlds.'],
                 ['⚔️', 'Solve Challenges', 'Tackle problems and level up your skills.'],
                 ['🏆', 'Earn Rewards', 'Unlock achievements and powerful artifacts.'],
                 ['📈', 'Track Progress', 'Watch yourself become a math master.']];
    return '<div class="auth-features">' + items.map(function (i){
      return '<div class="auth-feat"><span class="auth-feat-ico">' + i[0] + '</span><div><b>' + i[1] + '</b><span>' + i[2] + '</span></div></div>';
    }).join('') + '</div>';
  }

  // Inline icons (match the login design reference: game/assets/precalculus_odyssey_login_designed_fixed.html).
  var AUTH_USER_ICON = '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"></circle><path d="M4.8 20c.7-4.1 3.1-6.2 7.2-6.2s6.5 2.1 7.2 6.2"></path></svg>';
  var AUTH_LOCK_ICON = '<svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg>';

  // Welcome screen = the illustrated hero (welcome-hero.png) as backdrop + a two-wing "auth dock"
  // at the bottom straddling the portal: username (left wing) + tabs, password (right wing) + Log in.
  // Every control is wired to the real auth flow (the reference mockup only had placeholders).
  function renderStart(){
    var screen = document.getElementById('startScreen');
    var card = screen && screen.querySelector('.start-screen-card');
    if (!card || !screen) return;
    screen.classList.remove('auth-hero', 'auth-photo');
    screen.classList.add('auth-dock-mode');
    ['.auth-stars', '.auth-decor'].forEach(function (sel){ var e = screen.querySelector(sel); if (e && e.parentNode) e.parentNode.removeChild(e); });
    var isLogin = authTab === 'login';
    card.innerHTML =
      '<section class="auth-dock" aria-label="Sign in to Precalculus Odyssey">' +
        '<div class="dock-wing left">' +
          '<div class="wing-top">' +
            '<div class="welcome-copy">' +
              '<p class="eyebrow">Account access</p>' +
              '<h2 class="wing-title">' + (isLogin ? 'Continue your journey' : 'Start your journey') + '</h2>' +
            '</div>' +
            '<div class="tabs">' +
              '<button type="button" class="tab' + (isLogin ? ' active' : ' secondary') + '" onclick="authSetTab(\'login\')">Log in</button>' +
              '<button type="button" class="tab' + (!isLogin ? ' active' : ' secondary') + '" onclick="authSetTab(\'register\')">Request account</button>' +
            '</div>' +
          '</div>' +
          '<div class="field-wrap">' +
            '<span class="field-icon" aria-hidden="true">' + AUTH_USER_ICON + '</span>' +
            '<input class="field" type="text" id="authUser" placeholder="' + (isLogin ? 'Username' : 'Choose a username (3–16)') + '" aria-label="Username" autocomplete="username" maxlength="16" />' +
          '</div>' +
        '</div>' +
        '<div class="portal-gap" aria-hidden="true"><span class="journey-marker">Your path awaits</span></div>' +
        '<div class="dock-wing right">' +
          '<div class="wing-top">' +
            '<div class="welcome-copy">' +
              '<p class="eyebrow">' + (isLogin ? 'Welcome back' : 'New here') + '</p>' +
              '<h2 class="wing-title">' + (isLogin ? 'Enter the Odyssey' : 'Join the Odyssey') + '</h2>' +
            '</div>' +
            (isLogin
              ? '<p class="forgot">Forgot password? <span role="button" tabindex="0" onclick="authRecover()" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();authRecover();}">Recover access</span></p>'
              : '<p class="forgot forgot-note">An admin approves new accounts.</p>') +
          '</div>' +
          '<div class="password-row">' +
            '<div class="field-wrap">' +
              '<span class="field-icon" aria-hidden="true">' + AUTH_LOCK_ICON + '</span>' +
              '<input class="field" type="password" id="authPass" placeholder="' + (isLogin ? 'Password' : 'Choose a password (8+)') + '" aria-label="Password" autocomplete="' + (isLogin ? 'current-password' : 'new-password') + '" maxlength="64" />' +
              '<button type="button" class="auth-eye" id="authEye" onclick="authToggleEye()" aria-label="Show password" title="Show / hide password">👁</button>' +
            '</div>' +
            '<button type="button" class="login-button" onclick="' + (isLogin ? 'authLogin()' : 'authRegister()') + '">' + (isLogin ? 'Log in' : 'Request') + ' <span class="arrow" aria-hidden="true">▶</span></button>' +
          '</div>' +
          '<p class="auth-msg" id="authMsg"></p>' +
        '</div>' +
      '</section>';
    var user = document.getElementById('authUser');
    if (user) user.addEventListener('keydown', function (ev){ if (ev.key === 'Enter'){ ev.preventDefault(); var p = document.getElementById('authPass'); if (p) p.focus(); } });
    var pass = document.getElementById('authPass');
    if (pass) pass.addEventListener('keydown', function (ev){ if (ev.key === 'Enter'){ ev.preventDefault(); authTab === 'login' ? window.authLogin() : window.authRegister(); } });
  }

  // No self-serve password reset exists (accounts are admin-approved) — guide the player honestly.
  window.authRecover = function (){
    msg('Password resets are handled by an admin — ask them to set a new password for you.', 'ok');
  };

  // Show / hide the password (classic eye toggle).
  window.authToggleEye = function(){
    var p = document.getElementById('authPass'), e = document.getElementById('authEye');
    if (!p) return;
    var show = p.type === 'password';
    p.type = show ? 'text' : 'password';
    if (e){ e.textContent = show ? '🙈' : '👁'; e.setAttribute('aria-label', show ? 'Hide password' : 'Show password'); e.classList.toggle('on', show); }
    p.focus();
  };

  window.authSetTab = function (t){ authTab = t; renderStart(); };

  window.authRegister = async function (){
    var u = (document.getElementById('authUser').value || '').trim(), p = document.getElementById('authPass').value || '';
    if (u.length < 3) return msg('Username must be at least 3 characters.', 'err');
    if (p.length < 8) return msg('Password must be at least 8 characters.', 'err');
    msg('Requesting…');
    var r = await api('/api/auth/register', { body: { username: u, password: p } });
    if (r.ok && r.data.ok){
      if (r.data.status === 'approved'){ msg('Admin account created — logging you in…', 'ok'); doLogin(u, p); }
      else { authTab = 'login'; renderStart(); msg(r.data.message || 'Requested! Wait for an admin to approve your account.', 'ok'); }
    } else msg((r.data && r.data.error) || 'Could not register.', 'err');
  };

  window.authLogin = function (){ doLogin((document.getElementById('authUser').value || '').trim(), document.getElementById('authPass').value || ''); };
  async function doLogin(u, p){
    if (!u || !p) return msg('Enter your username and password.', 'err');
    msg('Logging in…');
    var r = await api('/api/auth/login', { body: { username: u, password: p } });
    if (r.ok && r.data.ok){
      saveSession({ token: r.data.sessionToken, username: r.data.username, isAdmin: !!r.data.isAdmin, accountId: r.data.accountId });
      await bridgeToGame(r.data.username);
    } else msg((r.data && r.data.error) || 'Login failed.', 'err');
  }

  window.authLogout = async function (){ try { await api('/api/auth/logout', { auth: true }); } catch (e) {} clearSession(); try { location.reload(); } catch (e) {} };

  // Single-active-session enforcement: logging in elsewhere revokes this device's session
  // server-side (login.js). Previously discovering that only stopped the background cloud sync
  // with a passive toast — the player kept right on playing locally, indistinguishable from being
  // properly logged in, silently piling up progress that could never reach the cloud and would
  // look "more advanced" than the account's real (other-device) progress on a later re-login,
  // quietly overwriting it (user 2026-07-21: "the login in this computer should be kicked out with
  // a notification"). Now: the moment a revoked session (401) is detected — either right at boot
  // (bridgeToGame's initial fetch) or on the next heartbeat (authPushProgress) — this device is
  // force-logged-out immediately via a blocking modal, so local play can never keep drifting past
  // the point the account was actually taken over elsewhere.
  var _kickedOut = false;
  function handleSessionRevoked(){
    if (_kickedOut) return;
    _kickedOut = true;
    if (_progTimer){ clearInterval(_progTimer); _progTimer = null; }
    clearSession();
    var ov = document.getElementById('accountKickOverlay');
    if (ov) ov.hidden = false;
    else { window.alert('Your account was logged in on another device — you have been logged out here.'); location.reload(); }
  }
  window.ackAccountKick = function(){ location.reload(); };

  // Hand off to the existing game with `username` as the active profile.
  // Prefers the account's CLOUD save over a local profile whenever the cloud is further along (a
  // new device, or this account played further elsewhere more recently) — logging in should show
  // your FULL latest status (level, HP, gear, weapons, items, everything — not just a summary),
  // not silently reset to blank just because this happens to be a new device (2026-07-21: a
  // player's arena-11 progress from a second computer was invisible on re-login; the first fix
  // only restored a level/cash summary, not gear/items — this restores the same full snapshot
  // shape getSaveSnapshot()/applySnapshotToState() already use for local profiles, since the
  // player confirmed "status" means everything: levels, HP, arenas unlocked, weapons, items).
  // A full local save on THIS device still wins if it's further along than the cloud copy.
  // Count of arenas actually beaten — the only MONOTONIC progress signal a snapshot carries.
  // state.level is just "the arena currently being played" and legitimately goes DOWN whenever the
  // player travels back on the Star Atlas to replay an earlier arena, so it must never be used to
  // judge which of two saves is further along (see bridgeToGame below for the data-loss this caused).
  function _clearedCount(s){
    var m = s && s.bossDefeated; if (!m || typeof m !== 'object') return 0;
    var c = 0; for (var k in m){ if (m[k]) c++; }
    return c;
  }
  // Union `from`'s cleared/perfect maps into `into` (which may be a snapshot OR the live state).
  // These two maps only ever legitimately GROW (user 2026-08-04: "any level passed should never be
  // locked again, every level got green star should never be downgraded") — so whichever copy wins
  // a load decision, the loser's cleared arenas and stars are always folded in, never dropped.
  function _mergeProgressMaps(into, from){
    if (!into || !from) return into;
    ['bossDefeated', 'perfectArenas'].forEach(function(key){
      var src = from[key]; if (!src || typeof src !== 'object') return;
      var dst = into[key];
      if (!dst || typeof dst !== 'object') { dst = {}; into[key] = dst; }
      for (var k in src){ if (src[k] && !dst[k]) dst[k] = true; }
    });
    return into;
  }

  // Set when the login-time cloud read FAILED (network / transient D1 error — seen live
  // 2026-08-01: "D1_ERROR: D1 DB storage operation exceeded timeout"). While pending, no push may
  // overwrite the cloud until one successful read+merge has happened (authPushProgress below) —
  // otherwise a single failed read silently reads as "no cloud save" and the next heartbeat
  // clobbers the player's real progress with whatever stale/fresh state this device booted from.
  var _cloudMergePending = false;

  async function bridgeToGame(username){
    window.activeProfileName = username;
    var loaded = false;
    var localMine = null;
    try {
      var list = (typeof loadAllProfiles === 'function') ? loadAllProfiles() : [];
      localMine = list.filter(function (p){ return (p.name || '').toLowerCase() === username.toLowerCase(); })[0] || null;
    } catch (e) {}
    var cloudProgress = null, cloudReadOk = false;
    // Two attempts: a single transient failure must not cost the player their cloud save.
    for (var attempt = 0; attempt < 2 && !cloudReadOk; attempt++){
      try {
        var pr = await api('/api/auth/progress', { method: 'GET', auth: true });
        // The stored session token (boot() resuming a prior login) is already dead — most likely
        // this account was logged into on another device while this tab was closed. Bounce straight
        // to the kick-out screen rather than silently starting the game on stale local data.
        if (pr.status === 401){ handleSessionRevoked(); return; }
        if (pr.ok && pr.data && pr.data.ok){
          cloudReadOk = true;
          if (pr.data.progress) cloudProgress = pr.data.progress;
        }
      } catch (e) {}
    }
    _cloudMergePending = !cloudReadOk;
    // Pick the further-along copy by arenas CLEARED (monotonic), tie-broken by save recency —
    // NEVER by state.level (2026-08-04 data-loss postmortem: clear 1-10, travel back to arena 3
    // → cloud legitimately says level 3; any device still holding an old level-4 local profile
    // then won the old `cloud.level > local.level` comparison and pushed a weeks-old relic over
    // the real save, permanently wiping arenas 4-10 — exactly what happened to a real player).
    var chosen = null, other = null, fromCloud = false;
    if (cloudProgress && localMine){
      var cc = _clearedCount(cloudProgress), lc = _clearedCount(localMine);
      if (cc > lc){ chosen = cloudProgress; other = localMine; fromCloud = true; }
      else if (lc > cc){ chosen = localMine; other = cloudProgress; }
      else if ((cloudProgress.savedAt || 0) >= (localMine.savedAt || 0)){ chosen = cloudProgress; other = localMine; fromCloud = true; }
      else { chosen = localMine; other = cloudProgress; }
    } else if (cloudProgress){ chosen = cloudProgress; fromCloud = true; }
    else if (localMine){ chosen = localMine; }
    if (chosen && typeof applySnapshotToState === 'function'){
      _mergeProgressMaps(chosen, other);   // the losing copy's cleared arenas/stars still count
      applySnapshotToState(chosen);
      window.activeProfileId = fromCloud ? ('acc_' + String(username).toLowerCase()) : chosen.id;
      loaded = true;
      if (fromCloud && typeof showToast === 'function') showToast('☁️ Welcome back! Restored your full progress from the cloud.');
    }
    if (!window.activeProfileId) window.activeProfileId = 'acc_' + String(username).toLowerCase();
    if (!loaded && typeof resetPlayerState === 'function') resetPlayerState();
    var ss = document.getElementById('startScreen'); if (ss) ss.hidden = true;
    if (typeof startGame === 'function') startGame();
    if (!loaded && typeof showOpeningNarration === 'function' && typeof state === 'object' && !state.testMode) {
      showOpeningNarration();
    } else if (loaded && typeof openStarAtlas === 'function') {
      // Returning player: land on the Star Atlas, scoped to the star system their restored
      // progress puts them in — not straight into an active question (user 2026-07-22: "when i
      // login, it should start in the most recent star system not answering questions"). A
      // brand-new player (the showOpeningNarration branch above) has no "most recent" system yet,
      // so they still start on their actual Arena 1 practice view as before.
      openStarAtlas();
      if (typeof atlasOpenSystem === 'function' && typeof _currentSystemId === 'function') atlasOpenSystem(_currentSystemId());
    }
    injectHeaderAuth();
    authStartProgressSync();
  }

  // Add Admin (if admin) + Log-out buttons to the header, once in-game.
  function injectHeaderAuth(){
    var bar = document.querySelector('.header-actions');
    if (!bar) return;
    var sess = loadSession();
    if (sess && sess.isAdmin && !document.getElementById('authAdminBtn')){
      var ab = document.createElement('button');
      ab.className = 'reset-btn'; ab.id = 'authAdminBtn'; ab.type = 'button';
      ab.title = 'Admin — approve accounts, override passwords, see each account’s status';
      ab.textContent = '🛠️ Admin'; ab.onclick = openAdmin;
      bar.appendChild(ab);
    }
    if (sess && !document.getElementById('authLogoutBtn')){
      var lb = document.createElement('button');
      // reset-btn-signout: on the phone/iPad "☰ Menu" dropdown (styles.css) this gets a divider
      // + coral tint so it doesn't blend into the row of nav pills above it (player: "cannot find
      // log out button in mobile version" — it was there, just visually identical to Practice/
      // Profile/Earth Hub/etc and easy to miss as the very last item in the list).
      lb.className = 'reset-btn reset-btn-signout'; lb.id = 'authLogoutBtn'; lb.type = 'button';
      lb.title = 'Log out of ' + esc(sess.username); lb.textContent = '🚪 Log out'; lb.onclick = window.authLogout;
      bar.appendChild(lb);
    }
  }

  // ---------- progress sync (full save — so a login on a different device restores EVERYTHING:
  // level, HP, unlocked arenas, weapons, items, not just a level/cash summary — and the admin
  // dashboard can see each player's real status) ----------
  // Reuses the exact snapshot shape getSaveSnapshot() already builds for local profile saves
  // (03-save.js) — same fields applySnapshotToState() already knows how to restore, so cloud
  // login and local-profile resume are the same code path on the read side.
  function authProgressSummary(){
    if (typeof getSaveSnapshot === 'function') return getSaveSnapshot();
    var s = (typeof state === 'object' && state) ? state : {};
    return { level: s.level, coins: s.coins };   // getSaveSnapshot unavailable — minimal fallback
  }
  // Was fire-and-forget (called api() without awaiting it, inside a sync try/catch that could
  // never actually catch an async failure) — a revoked/expired session, or any transient network
  // error, failed EVERY sync silently forever with no sign to the player or the admin dashboard
  // (2026-07-21, diagnosing why a player's progress on a second computer never showed up anywhere).
  var _progTimer = null, _progFailStreak = 0, _applyingOverride = false;
  // opts.ack: this push is CONFIRMING an admin override was just applied locally (see the
  // OVERRIDE_PENDING branch below) — lets the server clear admin_override so normal pushes resume.
  window.authPushProgress = async function(opts){
    // saveGame() (03-save.js) itself calls authPushProgress() on every save as a side effect — while
    // we're mid-way through applying an override (saveGame() below persists it locally), suppress
    // that nested call so it doesn't race our own explicit ack push with a second, redundant one.
    if (_applyingOverride) return;
    var sess = loadSession();
    if (!sess || !sess.token || (sess.username || '').toLowerCase() === 'admin') return;   // don't sync the admin/test account
    // Login-time cloud read failed (transient D1/network error) — this device booted from local or
    // fresh state WITHOUT ever seeing the cloud copy. Pushing now could permanently overwrite real
    // progress, so first re-read the cloud and fold its cleared-arenas/stars into the live state;
    // until a read succeeds, skip pushing entirely (each 25s heartbeat retries).
    if (_cloudMergePending){
      var g;
      try { g = await api('/api/auth/progress', { method: 'GET', auth: true }); }
      catch (e) { g = { ok: false, status: 0 }; }
      if (g.status === 401){ handleSessionRevoked(); return; }
      if (!(g.ok && g.data && g.data.ok)) return;   // cloud still unreadable — do NOT overwrite it
      if (g.data.progress && typeof state === 'object') _mergeProgressMaps(state, g.data.progress);
      _cloudMergePending = false;
    }
    var ack = !!(opts && opts.ack);
    var r;
    try { r = await api('/api/auth/progress', { body: { progress: authProgressSummary(), ack: ack }, auth: true }); }
    catch (e) { r = { ok: false, status: 0 }; }
    if (r.ok && r.data && r.data.ok){ _progFailStreak = 0; return; }
    // An admin edited or reset this player's progress (admin/save.js) — apply it locally right now
    // (even for an already-logged-in, live session, not just on next login) rather than letting this
    // push overwrite the admin's version with our own stale local state, then confirm with ack:true
    // so the flag clears and normal pushes resume. Guarded by `ack` itself so a confirm push that
    // somehow gets OVERRIDE_PENDING again doesn't recurse forever — just let the next heartbeat retry.
    if (!ack && r.data && r.data.error === 'OVERRIDE_PENDING' && r.data.progress){
      _applyingOverride = true;
      if (typeof applySnapshotToState === 'function') applySnapshotToState(r.data.progress);
      if (typeof saveGame === 'function') saveGame();
      _applyingOverride = false;
      if (typeof showToast === 'function') showToast('🛠️ An admin updated your progress — refreshed!');
      return window.authPushProgress({ ack: true });
    }
    if (r.status === 401){
      // The session was revoked server-side — this account was logged into on another device
      // (login.js enforces single-active-session by design). Force this device out immediately
      // (handleSessionRevoked) rather than quietly continuing to play on stale local data.
      handleSessionRevoked();
      return;
    }
    _progFailStreak++;
    if (_progFailStreak === 3 && typeof showToast === 'function') showToast('⚠️ Trouble syncing progress to the cloud — will keep retrying.');
  };
  function authStartProgressSync(){
    if (_progTimer) clearInterval(_progTimer);
    _progFailStreak = 0;
    window.authPushProgress();
    _progTimer = setInterval(function(){ if (loadSession()) window.authPushProgress(); else { clearInterval(_progTimer); _progTimer = null; } }, 25000);
  }

  // ---------- admin: FULL-SCREEN dashboard (item 2) ----------
  function ensureAdminView(){
    var v = document.getElementById('adminView');
    if (!v){ v = document.createElement('div'); v.id = 'adminView'; v.className = 'view-container admin-view'; (document.querySelector('.board') || document.body).appendChild(v); }
    return v;
  }
  function openAdmin(){
    var v = ensureAdminView();
    document.querySelectorAll('.view-container').forEach(function (x){ x.classList.remove('active'); });
    v.classList.add('active');
    v.innerHTML =
      '<div class="admin-page"><div class="admin-top">' +
        '<h2 class="admin-h">🛠️ Admin Dashboard</h2>' +
        '<button type="button" class="btn btn-ghost" onclick="closeAdmin()" data-tooltip="Return to the game.">← Back to game</button>' +
      '</div><div id="adminBody" class="admin-body">Loading…</div></div>';
    renderAdminAccounts();
  }
  window.closeAdmin = function(){
    var v = document.getElementById('adminView'); if (v) v.classList.remove('active');
    var eq = document.getElementById('equationView'); if (eq) eq.classList.add('active');
    if (typeof loadProblem === 'function') loadProblem();
  };

  function loc(a){ var parts = [a.city, a.region, a.country].filter(function (x){ return x && x !== 'seed'; }); return (parts.join(', ') || '—') + (a.ip && a.ip !== 'seed' ? ' · ' + esc(a.ip) : ''); }
  function when(t){ return t ? esc(String(t).replace('T', ' ').replace(/\..*/, '') + ' UTC') : '—'; }

  async function renderAdminAccounts(){
    var body = document.getElementById('adminBody'); if (!body) return;
    var r = await api('/api/admin/accounts', { method: 'GET', auth: true });
    if (!(r.ok && r.data.ok)){ body.innerHTML = '<p class="auth-msg auth-err">' + esc((r.data && r.data.error) || 'Could not load accounts.') + '</p>'; return; }
    if (!r.data.accounts.length){ body.innerHTML = '<p class="admin-empty">No accounts yet. Ask someone to Request an account!</p>'; return; }
    var pending = r.data.accounts.filter(function (a){ return a.status === 'pending'; });
    var others  = r.data.accounts.filter(function (a){ return a.status !== 'pending'; });

    var waitHtml = '<div class="admin-section-title">⏳ Waiting for approval (' + pending.length + ')</div>';
    waitHtml += pending.length ? pending.map(function (a){
      return '<div class="admin-wait">' +
        '<div class="admin-wait-head"><b>' + esc(a.username) + '</b> <span class="admin-status admin-pending">pending</span></div>' +
        '<div class="admin-wait-meta"><div>🔑 Password: <code>' + esc(a.password || '—') + '</code></div><div>📍 ' + loc(a) + '</div><div>🕒 ' + when(a.createdAt) + '</div></div>' +
        '<div class="admin-actions">' +
          '<button class="btn btn-primary admin-btn" onclick="authAdminAction(\'' + esc(a.username) + '\',\'approve\')">✓ Approve — let them play</button>' +
          '<button class="btn btn-ghost admin-btn" onclick="authAdminAction(\'' + esc(a.username) + '\',\'reject\')">✕ Reject</button>' +
          '<button class="btn btn-ghost admin-btn" onclick="authShowPlayer(\'' + esc(a.username) + '\')">🔍 Details</button>' +
        '</div></div>';
    }).join('') : '<p class="admin-empty">No accounts waiting. 🎉</p>';

    var othHtml = '<div class="admin-section-title">All accounts (' + others.length + ')</div>';
    othHtml += others.map(function (a){
      return '<div class="admin-row">' +
        '<div class="admin-who"><b>' + esc(a.username) + '</b> <span class="admin-status admin-' + esc(a.status) + '">' + esc(a.status) + (a.isAdmin ? ' · admin' : '') + '</span> ' +
          '<span class="admin-small">🔑 ' + esc(a.password || '—') + ' · 📍 ' + loc(a) + '</span></div>' +
        '<div class="admin-actions">' +
          '<button class="btn btn-primary admin-btn" onclick="authShowPlayer(\'' + esc(a.username) + '\')">🔍 Details</button>' +
          (a.status === 'approved' && !a.isAdmin ? '<button class="btn btn-ghost admin-btn" onclick="authAdminAction(\'' + esc(a.username) + '\',\'disable\')">Disable</button>' : '') +
          (a.status !== 'approved' ? '<button class="btn btn-ghost admin-btn" onclick="authAdminAction(\'' + esc(a.username) + '\',\'approve\')">✓ Approve</button>' : '') +
          '<button class="btn btn-ghost admin-btn" onclick="authAdminSetPw(\'' + esc(a.username) + '\')">🔑 Set password</button>' +
        '</div></div>';
    }).join('');

    body.innerHTML = waitHtml + othHtml;
  }

  // Per-player details: account info + settings + progress + per-arena performance.
  window.authShowPlayer = async function(username){
    var body = document.getElementById('adminBody'); if (!body) return;
    body.innerHTML = '<p>Loading ' + esc(username) + '…</p>';
    var r = await api('/api/admin/player?username=' + encodeURIComponent(username), { method: 'GET', auth: true });
    if (!(r.ok && r.data.ok)){ body.innerHTML = '<button class="btn btn-ghost" onclick="authOpenAdmin()">← Back</button><p class="auth-msg auth-err">' + esc((r.data && r.data.error) || 'Could not load player.') + '</p>'; return; }
    body.innerHTML = renderPlayerDetail(r.data.account, r.data.progress);
    if (r.data.account && !r.data.account.isAdmin) loadAdminSaveTools(r.data.account.username);
  };

  function row(label, val){ return '<div class="pd-row"><span class="pd-k">' + label + '</span><span class="pd-v">' + val + '</span></div>'; }
  // Look up a gear item's display name from the real catalogue + its upgrade level from the
  // player's own saved array (upgradeLvl lives per-player, not in the shared config).
  function _adminGearRow(icon, label, catalog, playerArr, equippedId, def){
    var id = equippedId || def;
    var item = Array.isArray(catalog) ? catalog.find(function(x){ return x.id === id; }) : null;
    var entry = Array.isArray(playerArr) ? playerArr.find(function(x){ return x && x.id === id; }) : null;
    var lvl = entry ? (entry.upgradeLvl || 0) : 0;
    return row(icon + ' ' + label, esc(item ? item.name : id) + (lvl > 0 ? ' +' + lvl : ''));
  }
  function renderPlayerDetail(a, p){
    var h = '<button class="btn btn-ghost" onclick="authOpenAdmin()" data-tooltip="Back to the account list.">← All accounts</button>';
    h += '<h2 class="admin-h2">' + esc(a.username) + ' <span class="admin-status admin-' + esc(a.status) + '">' + esc(a.status) + (a.isAdmin ? ' · admin' : '') + '</span></h2>';

    // Account card
    h += '<div class="pd-card"><div class="pd-title">Account</div>' +
      row('🔑 Password', '<code>' + esc(a.password || '—') + '</code>') +
      row('📍 Location', loc(a)) +
      row('🕒 Registered', when(a.createdAt)) +
      row('👀 Last seen', when(a.lastSeenAt)) +
      row('🔄 Progress synced', when(a.progressAt)) + '</div>';

    if (!p){
      h += '<div class="pd-card"><p class="admin-empty">This player hasn’t played (no progress synced yet). Progress appears here after they log in and play a bit.</p></div>';
      return h;
    }

    // Settings
    var st = p.settings || {};
    h += '<div class="pd-card"><div class="pd-title">⚙️ Settings</div>' +
      row('🎵 Music volume', (st.musicVol != null ? st.musicVol : '—') + '%') +
      row('🔊 SFX volume', (st.sfxVol != null ? st.sfxVol : '—') + '%') + '</div>';

    // Progress
    // arenasPassed used to be a precomputed field on the old lightweight summary; the full
    // snapshot (getSaveSnapshot's shape) doesn't include it, so derive it here instead.
    var passed = p.bossDefeated ? Object.keys(p.bossDefeated).length : 0;
    h += '<div class="pd-card"><div class="pd-title">🚀 Progress</div>' +
      row('🪐 Current arena', 'Arena ' + ((typeof arenaDisplayNumber === 'function') ? arenaDisplayNumber(p.level || 1) : (p.level || 1)) + ' of ' + (p.maxLevel || 65)) +
      row('✅ Arenas passed', passed + ' / ' + (p.maxLevel || 65)) +
      row('⭐ This arena solved', (p.levelSolves || 0) + ' / 10') +
      row('🦸 Hero', 'Lv. ' + (p.heroLvl || 1) + ' (XP ' + (p.heroXp || 0) + ')') +
      row('🔥 Best streak / score', (p.streak || 0) + ' / ' + (p.score || 0)) +
      row('💵 Cash', (p.coins || 0) + ' · 🥇' + ((p.currencies && p.currencies.gold) || 0) + ' 🥈' + ((p.currencies && p.currencies.silver) || 0)) +
      row('🎟️ Wonderland passes', (p.wonderPasses || 0)) +
      (p.testMode ? row('🧪 Mode', 'TEST account') : '') + '</div>';

    // Gear & chips — read from the REAL global catalogues (WEAPONS/SHIELDS/ARMOR/SHOES/CHIPS,
    // game/config/gear.config.js + economy.config.js) since this page already loads them as
    // classic globals — names/icons can never drift out of sync the way a duplicated list would.
    h += '<div class="pd-card"><div class="pd-title">⚔️ Equipped gear</div>' +
      _adminGearRow('⚔️', 'Weapon', (typeof WEAPONS !== 'undefined' ? WEAPONS : []), p.weapons, p.equippedWeapon, 'wood_sword') +
      _adminGearRow('🛡️', 'Shield', (typeof SHIELDS !== 'undefined' ? SHIELDS : []), p.shields, p.equippedShield, 'leather_buckler') +
      _adminGearRow('🧥', 'Armor', (typeof ARMOR !== 'undefined' ? ARMOR : []), p.armor, p.equippedArmor, 'cloth_tunic') +
      _adminGearRow('👟', 'Shoes', (typeof SHOES !== 'undefined' ? SHOES : []), p.shoes, p.equippedShoes, 'basic_boots') +
      '</div>';

    var chipsMap = p.chips || {};
    var chipOrder = (typeof CHIP_ORDER !== 'undefined') ? CHIP_ORDER : [];
    var chipCat = (typeof CHIPS !== 'undefined') ? CHIPS : {};
    var chipRows = chipOrder.map(function(id){
      var n = chipsMap[id] || 0; if (n <= 0) return '';
      var c = chipCat[id] || {};
      return row((c.icon || '🧩') + ' ' + esc(c.name || id), n);
    }).join('');
    h += '<div class="pd-card"><div class="pd-title">🧩 Chips</div>' +
      (chipRows || '<p class="admin-empty">No chips collected yet.</p>') + '</div>';

    // Per-arena performance
    var as = p.arenaStats || {};
    var keys = Object.keys(as).sort(function(x, y){ return (+x) - (+y); });
    var boss = p.bossDefeated || {};
    if (keys.length){
      var rows = keys.map(function(k){
        var s = as[k] || {}, solves = s.solves || 0, fails = s.fails || 0, tot = solves + fails;
        var acc = tot ? Math.round(solves / tot * 100) : 0;
        return '<tr><td>Arena ' + esc(k) + '</td><td>' + solves + '</td><td>' + fails + '</td><td>' + acc + '%</td><td>' + (s.stars3 || 0) + '</td><td>' + (boss[k] ? '✅' : '') + '</td></tr>';
      }).join('');
      h += '<div class="pd-card"><div class="pd-title">📊 Performance per arena</div>' +
        '<div class="pd-tablewrap"><table class="pd-table"><thead><tr><th>Arena</th><th>Solved</th><th>Wrong</th><th>Accuracy</th><th>⭐ Perfect</th><th>Boss</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>';
    } else {
      h += '<div class="pd-card"><div class="pd-title">📊 Performance per arena</div><p class="admin-empty">No arena attempts recorded yet.</p></div>';
    }

    // Mini-game high scores
    var mg = p.miniGames || {}, mgKeys = Object.keys(mg);
    if (mgKeys.length){
      var mgRows = mgKeys.map(function(k){ var m = mg[k] || {}; return row('🎮 ' + esc(k), 'high ' + (m.highScore != null ? m.highScore : (m.unlockedCount != null ? ('level ' + m.unlockedCount) : '—')) + ' · plays ' + (m.plays || 0)); }).join('');
      h += '<div class="pd-card"><div class="pd-title">🕹️ Mini-games</div>' + mgRows + '</div>';
    }

    // Admin tools — edit the player's authoritative cloud save (not for the admin/test account).
    if (!a.isAdmin){
      h += '<div class="pd-card admin-tools" id="adminToolsCard">' +
        '<div class="pd-title">🛠️ Admin tools — edit cloud save</div>' +
        '<p class="admin-empty" id="adminToolsBody">Loading cloud save…</p></div>';
    }
    return h;
  }

  // Curated, safe-to-edit numeric fields — must mirror CURATED in functions/api/admin/save.js.
  var ADMIN_SAVE_FIELDS = [
    { key: 'level',        label: '🪐 Arena / level',   min: 1, max: 65 },
    { key: 'coins',        label: '💵 Cash',            min: 0, max: 1e9 },
    { key: 'gold',         label: '🥇 Gold',            min: 0, max: 1e9 },
    { key: 'silver',       label: '🥈 Silver',          min: 0, max: 1e9 },
    { key: 'heroLvl',      label: '🦸 Hero level',      min: 1, max: 999 },
    { key: 'playerMaxHp',  label: '❤️ Max HP',          min: 1, max: 1e7 },
    { key: 'playerHp',     label: '❤️ Current HP',      min: 0, max: 1e7 },
    { key: 'playerMaxMp',  label: '💧 Max MP',          min: 0, max: 1e7 },
    { key: 'playerMp',     label: '💧 Current MP',      min: 0, max: 1e7 },
    { key: 'wonderPasses', label: '🎟️ Wonderland passes', min: 0, max: 1e6 }
  ];

  // Editable gear slots — options are built from the REAL global catalogues (WEAPONS/SHIELDS/
  // ARMOR/SHOES, game/config/gear.config.js) since this page already loads them as classic globals,
  // so the dropdowns can never drift out of sync with the actual game data. The server
  // (functions/api/admin/save.js) still validates ids against its own duplicated list — it's a
  // separate runtime (Cloudflare Function) that can't import this classic-script config.
  var ADMIN_GEAR_SLOTS = [
    { key: 'weapon', label: '⚔️ Weapon', catalog: function(){ return (typeof WEAPONS !== 'undefined') ? WEAPONS : []; } },
    { key: 'shield', label: '🛡️ Shield', catalog: function(){ return (typeof SHIELDS !== 'undefined') ? SHIELDS : []; } },
    { key: 'armor',  label: '🧥 Armor',  catalog: function(){ return (typeof ARMOR !== 'undefined')  ? ARMOR  : []; } },
    { key: 'shoes',  label: '👟 Shoes',  catalog: function(){ return (typeof SHOES !== 'undefined')  ? SHOES  : []; } }
  ];

  // Load the player's account progress and render the editable admin-tools card. Operates on
  // cloud_accounts.progress_json (the account-login system's full save snapshot) — NOT the older,
  // separate Cloud Save layer's player_profiles table, which no real username/password player ever
  // populates (its own upload UI was never wired into index.html). Edits here reach even an
  // already-logged-in player within ~25s via the admin_override flag (migration 0007) — see
  // authPushProgress's OVERRIDE_PENDING handling below.
  async function loadAdminSaveTools(username){
    var card = document.getElementById('adminToolsBody');
    if (!card) return;
    var r = await api('/api/admin/save?username=' + encodeURIComponent(username), { method: 'GET', auth: true });
    var deleteBtn = '<button class="btn btn-ghost admin-btn admin-danger" id="adminDeleteBtn" onclick="authAdminDeleteAccount(\'' + esc(username) + '\')">🗑 Delete account permanently</button>';
    if (!(r.ok && r.data.ok)){
      card.innerHTML = '<p class="auth-msg auth-err">' + esc((r.data && r.data.error) || 'Could not load progress.') + '</p>' +
        '<div class="admin-actions">' + deleteBtn + '</div>';
      return;
    }
    if (!r.data.hasProgress){
      card.innerHTML = '<p class="admin-empty">This player hasn’t synced any progress yet — values become editable once they log in and play a bit. You can still remove the account.</p>' +
        '<div class="admin-actions">' + deleteBtn + '</div>';
      return;
    }
    var f = r.data.fields || {};
    var inputs = ADMIN_SAVE_FIELDS.map(function(fld){
      var val = (f[fld.key] == null ? '' : f[fld.key]);
      return '<label class="admin-field"><span class="admin-field-label">' + fld.label + '</span>' +
        '<input class="admin-field-input" type="number" id="adminfld_' + fld.key + '" value="' + esc(val) +
        '" min="' + fld.min + '" max="' + fld.max + '" step="1"></label>';
    }).join('');

    var gearData = r.data.gear || {};
    var gearInputs = ADMIN_GEAR_SLOTS.map(function(g){
      var cur = (gearData[g.key] && gearData[g.key].equipped) || '';
      var curLvl = (gearData[g.key] && gearData[g.key].upgradeLvl) || 0;
      var opts = g.catalog().map(function(it){
        return '<option value="' + esc(it.id) + '"' + (it.id === cur ? ' selected' : '') + '>' + esc(it.name) + '</option>';
      }).join('');
      return '<label class="admin-field"><span class="admin-field-label">' + g.label + '</span>' +
          '<select class="admin-field-input" id="admingear_' + g.key + '">' + opts + '</select></label>' +
        '<label class="admin-field"><span class="admin-field-label">' + g.label + ' upgrade (+0–3)</span>' +
          '<input class="admin-field-input" type="number" id="admingearlvl_' + g.key + '" value="' + curLvl + '" min="0" max="3" step="1"></label>';
    }).join('');

    var chipsData = r.data.chips || {};
    var chipCat = (typeof CHIPS !== 'undefined') ? CHIPS : {};
    var chipOrder = (typeof CHIP_ORDER !== 'undefined') ? CHIP_ORDER : Object.keys(chipCat);
    var chipInputs = chipOrder.map(function(id){
      var c = chipCat[id] || {};
      var val = (chipsData[id] != null ? chipsData[id] : 0);
      return '<label class="admin-field"><span class="admin-field-label">' + (c.icon || '🧩') + ' ' + esc(c.name || id) + '</span>' +
        '<input class="admin-field-input" type="number" id="adminchip_' + id + '" value="' + val + '" min="0" max="999999" step="1"></label>';
    }).join('');

    card.innerHTML =
      '<p class="admin-tools-note">Editing <b>' + esc(username) + '</b>’s live progress (last synced ' + esc(when(r.data.progressAt)) + '). ' +
        'Changes reach them within ~25 seconds if they’re online right now, or on their next login otherwise.</p>' +
      '<div class="admin-field-grid">' + inputs + '</div>' +
      '<p class="admin-tools-note">⚔️ Equipped gear — picking an item automatically marks it owned, so it survives their next sync.</p>' +
      '<div class="admin-field-grid">' + gearInputs + '</div>' +
      '<p class="admin-tools-note">🧩 Chips</p>' +
      '<div class="admin-field-grid">' + chipInputs + '</div>' +
      '<p class="auth-msg" id="adminToolsMsg"></p>' +
      '<div class="admin-actions">' +
        '<button class="btn btn-primary admin-btn" onclick="authAdminSaveOverride(\'' + esc(username) + '\')">💾 Save overrides</button>' +
        '<button class="btn btn-ghost admin-btn admin-danger" onclick="authAdminResetPlayer(\'' + esc(username) + '\')">↺ Reset to beginning</button>' +
        deleteBtn +
      '</div>';
  }
  window.loadAdminSaveTools = loadAdminSaveTools;

  function adminToolsMsg(text, kind){ var m = document.getElementById('adminToolsMsg'); if (m){ m.textContent = text || ''; m.className = 'auth-msg' + (kind ? (' auth-' + kind) : ''); } }

  window.authAdminSaveOverride = async function(username){
    var fields = {};
    ADMIN_SAVE_FIELDS.forEach(function(fld){
      var inp = document.getElementById('adminfld_' + fld.key);
      if (inp && inp.value !== '') fields[fld.key] = inp.value;
    });
    var gear = {};
    ADMIN_GEAR_SLOTS.forEach(function(g){
      var sel = document.getElementById('admingear_' + g.key);
      var lvlInp = document.getElementById('admingearlvl_' + g.key);
      if (sel && sel.value) gear[g.key] = sel.value;
      if (lvlInp && lvlInp.value !== '') gear[g.key + 'UpgradeLvl'] = lvlInp.value;
    });
    var chips = {};
    var chipIds = (typeof CHIP_ORDER !== 'undefined') ? CHIP_ORDER : Object.keys((typeof CHIPS !== 'undefined') ? CHIPS : {});
    chipIds.forEach(function(id){
      var inp = document.getElementById('adminchip_' + id);
      if (inp && inp.value !== '') chips[id] = inp.value;
    });
    adminToolsMsg('Saving…');
    var r = await api('/api/admin/save', { body: { username: username, action: 'override', fields: fields, gear: gear, chips: chips }, auth: true });
    if (r.ok && r.data.ok){ adminToolsMsg('Saved — reaches ' + username + ' within ~25s if online, or on next login.', 'ok'); loadAdminSaveTools(username); }
    else adminToolsMsg((r.data && r.data.error) || 'Save failed.', 'err');
  };

  window.authAdminResetPlayer = async function(username){
    if (!window.confirm('Reset ' + username + ' to the very beginning? Their arena, cash, and gear-driven stats reset. This cannot be undone.')) return;
    adminToolsMsg('Resetting…');
    var r = await api('/api/admin/save', { body: { username: username, action: 'reset' }, auth: true });
    if (r.ok && r.data.ok){ adminToolsMsg('Reset — takes effect within ~25s if online, or on next login.', 'ok'); loadAdminSaveTools(username); }
    else adminToolsMsg((r.data && r.data.error) || 'Reset failed.', 'err');
  };

  window.authAdminDeleteAccount = async function(username){
    var typed = window.prompt('Permanently DELETE the account “' + username + '” and all its cloud data?\n\nType the username to confirm:');
    if (typed == null) return;
    if (normalizeUsername(typed) !== normalizeUsername(username)){ alert('Username did not match — nothing deleted.'); return; }
    // Save/Reset both show "Saving…/Resetting…" before their await; Delete jumped straight to the
    // fetch with no sign the click registered — added the same in-progress state here for parity.
    var btn = document.getElementById('adminDeleteBtn');
    if (btn){ btn.disabled = true; btn.textContent = '🗑 Deleting…'; }
    var r = await api('/api/admin/account', { body: { username: username, action: 'delete' }, auth: true });
    if (r.ok && r.data.ok){ alert('Account “' + username + '” deleted.'); openAdmin(); }
    else {
      alert((r.data && r.data.error) || 'Delete failed.');
      if (btn){ btn.disabled = false; btn.textContent = '🗑 Delete account permanently'; }
    }
  };
  function normalizeUsername(u){ return String(u == null ? '' : u).trim().toLowerCase(); }

  window.authAdminAction = async function (username, action){
    var r = await api('/api/admin/account', { body: { username: username, action: action }, auth: true });
    if (r.ok && r.data.ok) renderAdminAccounts(); else alert((r.data && r.data.error) || 'Action failed.');
  };
  window.authAdminSetPw = async function (username){
    var pw = window.prompt('New password for ' + username + ' (8+ characters):');
    if (pw == null) return;
    if (String(pw).length < 8){ alert('Password must be at least 8 characters.'); return; }
    var r = await api('/api/admin/account', { body: { username: username, action: 'setPassword', newPassword: pw }, auth: true });
    alert(r.ok && r.data.ok ? 'Password updated for ' + username + '.' : ((r.data && r.data.error) || 'Failed.'));
  };
  window.authOpenAdmin = openAdmin;

  // ---------- boot ----------
  function boot(){
    if (!document.getElementById('startScreen')) return;
    var sess = loadSession();
    if (sess && sess.token && sess.username){ bridgeToGame(sess.username); return; }   // resume existing session
    renderStart();
  }
  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);
  window.authRenderStart = renderStart;
})();
