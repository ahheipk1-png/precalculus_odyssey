// ============================================================================
// cloud-auth.js — username/password login, account-request/approval, admin panel,
// single active session (items 1,2,3,6). Talks to the D1-backed Functions at
// /api/auth/* and /api/admin/*. Replaces the start screen's saved-player LIST
// (item 3) with a Log-in / Request-account form.
//
// NOTE: the network flows require the deployed Cloudflare Functions + the
// migrations (0002 auth, 0003 seeds admin/admin, 0004 seeds the test account
// mitb / 6.2831853). The test account `mitb` unlocks test mode in-game and is
// exempt from single-login (see TEST_USERNAMES / TEST_NAMES).
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
      '<input type="password" id="authPass" class="auth-input" placeholder="' + (isLogin ? 'Password' : 'Choose a password (8+ characters)') + '" autocomplete="' + (isLogin ? 'current-password' : 'new-password') + '" maxlength="64">' +
      '<button type="button" class="btn btn-primary auth-submit" onclick="' + (isLogin ? 'authLogin()' : 'authRegister()') + '">' + (isLogin ? 'Log in ▶' : 'Request account ▶') + '</button>' +
      (isLogin ? '' : '<p class="auth-note">An admin approves new accounts before your first log-in.</p>') +
      '</div>';
  }
  function renderStart(){
    var card = document.querySelector('#startScreen .start-screen-card');
    if (!card) return;
    card.innerHTML =
      '<h2 class="start-screen-title">Precalculus Odyssey</h2>' +
      '<p class="start-screen-tagline">Knowledge Is Humanity’s Strongest Weapon</p>' +
      '<div class="auth-tabs">' +
        '<button type="button" class="auth-tab' + (authTab === 'login' ? ' active' : '') + '" onclick="authSetTab(\'login\')">Log in</button>' +
        '<button type="button" class="auth-tab' + (authTab === 'register' ? ' active' : '') + '" onclick="authSetTab(\'register\')">Request account</button>' +
      '</div>' +
      formHtml() +
      '<p class="auth-msg" id="authMsg"></p>';
    var pass = document.getElementById('authPass');
    if (pass) pass.addEventListener('keydown', function (ev){ if (ev.key === 'Enter'){ ev.preventDefault(); authTab === 'login' ? window.authLogin() : window.authRegister(); } });
  }

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
      bridgeToGame(r.data.username);
    } else msg((r.data && r.data.error) || 'Login failed.', 'err');
  }

  window.authLogout = async function (){ try { await api('/api/auth/logout', { auth: true }); } catch (e) {} clearSession(); try { location.reload(); } catch (e) {} };

  // Hand off to the existing game with `username` as the active profile.
  function bridgeToGame(username){
    window.activeProfileName = username;
    var loaded = false;
    try {
      var list = (typeof loadAllProfiles === 'function') ? loadAllProfiles() : [];
      var mine = list.filter(function (p){ return (p.name || '').toLowerCase() === username.toLowerCase(); })[0];
      if (mine && typeof applySnapshotToState === 'function'){ window.activeProfileId = mine.id; applySnapshotToState(mine); loaded = true; }
    } catch (e) {}
    if (!window.activeProfileId) window.activeProfileId = 'acc_' + String(username).toLowerCase();
    if (!loaded && typeof resetPlayerState === 'function') resetPlayerState();
    var ss = document.getElementById('startScreen'); if (ss) ss.hidden = true;
    if (typeof startGame === 'function') startGame();
    if (!loaded && typeof showOpeningNarration === 'function' && typeof state === 'object' && !state.testMode) showOpeningNarration();
    injectHeaderAuth();
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
      lb.className = 'reset-btn'; lb.id = 'authLogoutBtn'; lb.type = 'button';
      lb.title = 'Log out of ' + esc(sess.username); lb.textContent = '🚪 Log out'; lb.onclick = window.authLogout;
      bar.appendChild(lb);
    }
  }

  // ---------- admin panel (item 2) ----------
  async function openAdmin(){
    var old = document.getElementById('adminOverlay'); if (old) old.remove();
    var ov = document.createElement('div'); ov.id = 'adminOverlay'; ov.className = 'settings-overlay';
    ov.innerHTML = '<div class="settings-card admin-card"><h2 class="settings-title">🛠️ Admin — Accounts</h2>' +
      '<div id="adminList" class="admin-list">Loading…</div>' +
      '<button type="button" class="btn btn-ghost" onclick="var o=document.getElementById(\'adminOverlay\');if(o)o.remove();">Close</button></div>';
    ov.addEventListener('click', function (e){ if (e.target === ov) ov.remove(); });
    document.body.appendChild(ov);
    var r = await api('/api/admin/accounts', { method: 'GET', auth: true });
    var list = document.getElementById('adminList'); if (!list) return;
    if (!(r.ok && r.data.ok)){ list.innerHTML = '<p class="auth-msg auth-err">' + esc((r.data && r.data.error) || 'Could not load accounts.') + '</p>'; return; }
    if (!r.data.accounts.length){ list.innerHTML = '<p class="admin-empty">No accounts yet.</p>'; return; }
    list.innerHTML = r.data.accounts.map(function (a){
      return '<div class="admin-row">' +
        '<div class="admin-who"><b>' + esc(a.username) + '</b> <span class="admin-status admin-' + esc(a.status) + '">' + esc(a.status) + (a.isAdmin ? ' · admin' : '') + '</span></div>' +
        '<div class="admin-actions">' +
          (a.status !== 'approved' ? '<button class="btn btn-ghost admin-btn" onclick="authAdminAction(\'' + esc(a.username) + '\',\'approve\')">✓ Approve</button>' : '') +
          (a.status === 'approved' && !a.isAdmin ? '<button class="btn btn-ghost admin-btn" onclick="authAdminAction(\'' + esc(a.username) + '\',\'disable\')">Disable</button>' : '') +
          (a.status === 'pending' ? '<button class="btn btn-ghost admin-btn" onclick="authAdminAction(\'' + esc(a.username) + '\',\'reject\')">✕ Reject</button>' : '') +
          '<button class="btn btn-ghost admin-btn" onclick="authAdminSetPw(\'' + esc(a.username) + '\')">🔑 Set password</button>' +
        '</div></div>';
    }).join('');
  }
  window.authAdminAction = async function (username, action){
    var r = await api('/api/admin/account', { body: { username: username, action: action }, auth: true });
    if (r.ok && r.data.ok) openAdmin(); else alert((r.data && r.data.error) || 'Action failed.');
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
