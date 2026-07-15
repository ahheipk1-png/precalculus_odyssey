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
      lb.className = 'reset-btn'; lb.id = 'authLogoutBtn'; lb.type = 'button';
      lb.title = 'Log out of ' + esc(sess.username); lb.textContent = '🚪 Log out'; lb.onclick = window.authLogout;
      bar.appendChild(lb);
    }
  }

  // ---------- progress sync (so the admin dashboard can see each player's progress) ----------
  function authProgressSummary(){
    var s = (typeof state === 'object' && state) ? state : {};
    return {
      level: s.level, maxLevel: s.maxLevel,
      arenasPassed: s.bossDefeated ? Object.keys(s.bossDefeated).length : 0,
      bossDefeated: s.bossDefeated || {}, levelSolves: s.levelSolves,
      streak: s.streak, score: s.score, heroLvl: s.heroLvl, heroXp: s.heroXp,
      coins: s.coins, currencies: s.currencies, chips: s.chips, wonderPasses: s.wonderPasses,
      settings: s.settings, miniGames: s.miniGames, arenaStats: s.arenaStats, testMode: !!s.testMode
    };
  }
  window.authPushProgress = function(){
    var sess = loadSession();
    if (!sess || !sess.token || (sess.username || '').toLowerCase() === 'admin') return;   // don't sync the admin/test account
    try { api('/api/auth/progress', { body: { progress: authProgressSummary() }, auth: true }); } catch (e) {}
  };
  var _progTimer = null;
  function authStartProgressSync(){
    if (_progTimer) clearInterval(_progTimer);
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
  };

  function row(label, val){ return '<div class="pd-row"><span class="pd-k">' + label + '</span><span class="pd-v">' + val + '</span></div>'; }
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
    var passed = p.arenasPassed || 0;
    h += '<div class="pd-card"><div class="pd-title">🚀 Progress</div>' +
      row('🪐 Current arena', 'Arena ' + (p.level || 1) + ' of ' + (p.maxLevel || 187)) +
      row('✅ Arenas passed', passed + ' / ' + (p.maxLevel || 187)) +
      row('⭐ This arena solved', (p.levelSolves || 0) + ' / 10') +
      row('🦸 Hero', 'Lv. ' + (p.heroLvl || 1) + ' (XP ' + (p.heroXp || 0) + ')') +
      row('🔥 Best streak / score', (p.streak || 0) + ' / ' + (p.score || 0)) +
      row('💵 Cash', (p.coins || 0) + ' · 🥇' + ((p.currencies && p.currencies.gold) || 0) + ' 🥈' + ((p.currencies && p.currencies.silver) || 0)) +
      row('🎟️ Wonderland passes', (p.wonderPasses || 0)) +
      (p.testMode ? row('🧪 Mode', 'TEST account') : '') + '</div>';

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
    return h;
  }

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
