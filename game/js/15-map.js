  // ---------- Star-System Hub (view: #mapView, "Star Village") ----------
  // A night-sky hub the player walks around between planets. Every service building
  // (weapon store, item store, hotel, wonderland, farm, alchemy lab) hangs off this one hub so
  // kids get a single charming home screen instead of a wall of buttons.
  //
  // Design decisions:
  //  * The WHOLE UI re-renders into #mapView on every openMapHub() call — no stale DOM and no
  //    dependency on the `el` cache for map-owned elements (getElementById at call time only).
  //  * WALKING: buildings live at % coordinates inside the scene; the avatar div transitions
  //    left/top over 0.7s (flipping horizontally when heading left) and only ON ARRIVAL does the
  //    destination open. Under prefers-reduced-motion the avatar teleports and opens instantly.
  //  * Cross-module doors (openShop / openItemStore / openWonderland / openFarm / openAlchemy)
  //    are typeof-guarded so the map can ship before those modules — a missing one toasts
  //    "Opening soon!" and the player just stays on the map.
  //  * The Hotel is map-owned. hotelCost() / hotelSleep() are console-testable helpers that do
  //    the math + transaction; the DOM handlers around them only do presentation (toast, sfx,
  //    the floating-💤 animation, closing the panel).

  var WMAP_WALK_MS = 700;          // must match the 0.7s left/top transition in map.css

  // The seven buildings. x/y = CENTER of the building card in % of the scene box. The avatar
  // walks to the "door" (same x, y + 10) so it stands on the path, not on the roof.
  var WMAP_SPOTS = [
    { id: 'practice', emoji: '📚', name: 'Practice Hall', x: 12, y: 74, accent: 'var(--sky)', desc: 'Jump back into the current planet’s math challenge.' },
    { id: 'weapon',   emoji: '⚔️', name: 'Weapon Store',  x: 33, y: 58, accent: 'var(--coral)', desc: 'Buy and upgrade weapons & shields with Cash and chips.' },
    { id: 'item',     emoji: '🎒', name: 'Item Store',    x: 56, y: 70, accent: 'var(--yellow)', desc: 'Buy potions, ingredients and farm supplies.' },
    { id: 'hotel',    emoji: '🏨', name: 'Hotel',         x: 82, y: 62, accent: 'var(--sky)', desc: 'Sleep to fully restore your HP & MP.' },
    { id: 'wonder',   emoji: '🎡', name: 'Wonderland',    x: 84, y: 24, accent: 'var(--coral)', desc: 'Spend Wonderland Passes on mini-games (Tile Ball, Hoo Hey How).' },
    { id: 'farm',     emoji: '🌾', name: 'Farm',          x: 57, y: 30, accent: 'var(--yellow)', desc: 'Grow crops and raise animals for materials over time.' },
    { id: 'alchemy',  emoji: '🧪', name: 'Laboratory',    x: 27, y: 22, accent: 'var(--sky)', desc: 'Synthesize Super Medicine and Acid Vials from ingredients + chips.' },
    { id: 'trading',  emoji: '🔄', name: 'Trading Room',  x: 44, y: 46, accent: 'var(--yellow)', desc: 'Trade Cash ⇄ Gold ⇄ Silver at fluctuating market prices.' }
  ];

  var wmapPos = { x: 12, y: 84 };  // where the avatar is standing (scene %); remembered between visits
  var wmapWalkTimer = null;        // pending "arrival" timer while a walk is in flight

  // ------------------------------------------------------------------
  // Tiny defensive helpers
  // ------------------------------------------------------------------
  function wmapEsc(s){
    if (typeof escapeHtml === 'function') return escapeHtml(String(s));
    return String(s).replace(/[&<>"']/g, function(c){
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function wmapToast(msg){
    if (typeof showToast === 'function') showToast(msg);
  }
  function wmapPrefersReducedMotion(){
    try {
      return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch (e) { return false; }
  }
  function wmapFindSpot(id){
    for (var i = 0; i < WMAP_SPOTS.length; i++){
      if (WMAP_SPOTS[i].id === id) return WMAP_SPOTS[i];
    }
    return null;
  }
  function wmapCancelWalk(){
    if (wmapWalkTimer) { clearTimeout(wmapWalkTimer); wmapWalkTimer = null; }
  }

  // ------------------------------------------------------------------
  // View open / close (mirrors the openShop/closeShop pattern)
  // ------------------------------------------------------------------
  function openMapHub(){
    var view = document.getElementById('mapView');
    if (!view) return;
    wmapCancelWalk();
    view.innerHTML = wmapRenderHtml();
    document.querySelectorAll('.view-container').forEach(function(v){ v.classList.remove('active'); });
    view.classList.add('active');
    if (typeof playMusic === 'function') playMusic('practice');
  }

  // Header "Earth Hub" button: travel there WITH the worm-hole warp effect (openMapHub itself is
  // called instantly by shop/farm "Back to Earth" buttons, which shouldn't animate).
  function travelToEarthHub(){
    if (typeof playWarpFx === 'function') { playWarpFx(function(){ openMapHub(); }); }
    else { openMapHub(); }
  }

  function closeMapHub(){
    wmapCancelWalk();
    var view = document.getElementById('mapView');
    if (view) view.classList.remove('active');
    var eq = document.getElementById('equationView');
    if (eq) eq.classList.add('active');
    if (typeof loadProblem === 'function') loadProblem();
    if (typeof playMusic === 'function') playMusic('practice');
  }

  // ------------------------------------------------------------------
  // Rendering
  // ------------------------------------------------------------------
  function wmapStatusHtml(){
    return '<span class="wmap-chip">💵 <b>' + (state.coins || 0) + '</b></span>' +
      '<span class="wmap-chip">❤️ <b>' + state.playerHp + '/' + state.playerMaxHp + '</b></span>' +
      '<span class="wmap-chip">💧 <b>' + state.playerMp + '/' + state.playerMaxMp + '</b></span>' +
      '<span class="wmap-chip">🎟️ <b>' + (state.wonderPasses || 0) + '</b></span>';
  }

  function wmapRefreshStatus(){
    var strip = document.getElementById('wmapStatus');
    if (strip) strip.innerHTML = wmapStatusHtml();
    var badge = document.getElementById('wmapWonderBadge');
    if (badge) badge.textContent = '🎟️ ' + (state.wonderPasses || 0);
  }

  // Chalk night sky: dotted walking path, soft hills and twinkling stars. Drawn in a 1000×620
  // box stretched to the scene (preserveAspectRatio="none") so SVG coords line up with the
  // buildings' % coords (x% × 10, y% × 6.2). Emoji decorations are HTML spans (not SVG text)
  // so they never distort when the scene box changes shape on small screens.
  function wmapSceneSvg(){
    var stars = [
      [60, 60], [180, 118], [300, 48], [430, 92], [520, 150], [640, 58], [758, 120],
      [930, 158], [80, 220], [500, 238], [948, 320], [42, 380], [718, 300], [875, 62],
      [242, 262], [382, 178], [660, 170], [140, 320]
    ];
    var dots = stars.map(function(p, i){
      return '<circle class="wmap-star" cx="' + p[0] + '" cy="' + p[1] + '" r="' + (2 + (i % 3)) +
        '" style="animation-delay:' + ((i % 5) * 0.55) + 's"/>';
    }).join('');
    return '<svg class="wmap-sky" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">' +
      dots +
      // rolling hills at the horizon
      '<path d="M0 500 Q 250 430 520 500 T 1000 488 L 1000 620 L 0 620 Z" fill="rgba(244,241,232,0.04)"/>' +
      '<path d="M0 560 Q 300 508 600 560 T 1000 548 L 1000 620 L 0 620 Z" fill="rgba(244,241,232,0.05)"/>' +
      // the winding chalk path: joins every building "door" (see WMAP_SPOTS y+10 rule)
      '<path class="wmap-path" d="M 120 521 C 200 500 260 460 330 421 C 410 470 480 500 560 496 ' +
        'C 650 490 750 470 820 446 C 890 410 880 300 840 211 C 760 240 650 240 570 248 ' +
        'C 470 260 350 230 270 198"/>' +
      '</svg>';
  }

  function wmapBuildingsHtml(){
    return WMAP_SPOTS.map(function(s){
      var badge = (s.id === 'wonder')
        ? '<span class="wmap-badge" id="wmapWonderBadge">🎟️ ' + (state.wonderPasses || 0) + '</span>'
        : '';
      return '<button type="button" class="wmap-building" style="left:' + s.x + '%;top:' + s.y +
        '%;--wmap-accent:' + s.accent + '" onclick="wmapGoTo(\'' + s.id + '\')" ' +
        'title="' + wmapEsc(s.name + (s.desc ? ' — ' + s.desc : '')) + '" ' +
        'aria-label="' + wmapEsc(s.name + (s.desc ? '. ' + s.desc : '')) + '">' +
        badge +
        '<span class="wmap-sign" aria-hidden="true">' + s.emoji + '</span>' +
        '<span class="wmap-bname">' + wmapEsc(s.name) + '</span>' +
        '</button>';
    }).join('');
  }

  function wmapRenderHtml(){
    return '' +
      '<div class="wmap-wrap">' +
        '<div class="wmap-head">' +
          '<h2 class="wmap-title">🌍 Earth Hub</h2>' +
          '<button type="button" class="btn btn-ghost wmap-back" onclick="closeMapHub()">📚 Back to Practice</button>' +
        '</div>' +
        '<div class="wmap-status" id="wmapStatus">' + wmapStatusHtml() + '</div>' +
        '<div class="wmap-scene">' +
          wmapSceneSvg() +
          '<span class="wmap-deco" style="left:89%;top:9%" aria-hidden="true">🌙</span>' +
          '<span class="wmap-deco wmap-deco-sm" style="left:8%;top:12%" aria-hidden="true">🪐</span>' +
          '<span class="wmap-deco wmap-deco-sm" style="left:47%;top:7%" aria-hidden="true">✨</span>' +
          wmapBuildingsHtml() +
          '<div class="wmap-avatar" id="wmapAvatar" style="left:' + wmapPos.x + '%;top:' + wmapPos.y + '%" aria-hidden="true">' +
            '<span class="wmap-avatar-flip"><span class="wmap-avatar-emoji">🧑‍🚀</span></span>' +
          '</div>' +
        '</div>' +
        '<p class="wmap-hint">Tap a building — your explorer walks over and knocks! 🚶</p>' +
        '<div class="wmap-hotel-overlay" id="wmapHotelOverlay" hidden>' +
          '<div class="wmap-hotel" id="wmapHotelCard" role="dialog" aria-modal="true" aria-label="Starlight Hotel">' +
            '<div class="wmap-zzz" aria-hidden="true">💤</div>' +
            '<div id="wmapHotelBody"></div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  // ------------------------------------------------------------------
  // Walking + destination dispatch
  // ------------------------------------------------------------------
  function wmapGoTo(id){
    var spot = wmapFindSpot(id);
    if (!spot) return;
    var av = document.getElementById('wmapAvatar');
    if (!av) { wmapArrive(id); return; }     // no scene rendered (console call) — just open
    wmapCancelWalk();                        // clicking mid-walk retargets to the new building
    var dest = { x: spot.x, y: spot.y + 10 };
    var goingLeft = dest.x < wmapPos.x;
    var alreadyThere = Math.abs(dest.x - wmapPos.x) < 0.5 && Math.abs(dest.y - wmapPos.y) < 0.5;
    wmapPos = dest;
    av.classList.toggle('wmap-flip', goingLeft);
    av.style.left = dest.x + '%';
    av.style.top = dest.y + '%';
    if (wmapPrefersReducedMotion() || alreadyThere) {
      av.classList.remove('wmap-walking');   // teleport: no bob, open immediately
      wmapArrive(id);
      return;
    }
    if (typeof playSfx === 'function') playSfx('ui-click');
    av.classList.add('wmap-walking');
    wmapWalkTimer = setTimeout(function(){
      wmapWalkTimer = null;
      var a = document.getElementById('wmapAvatar');
      if (a) a.classList.remove('wmap-walking');
      wmapArrive(id);
    }, WMAP_WALK_MS + 60);                   // small buffer so the transition visibly finishes
  }

  function wmapArrive(id){
    switch (id) {
      case 'practice': closeMapHub(); return;
      case 'weapon':   wmapOpenExternal('openShop'); return;
      case 'item':     wmapOpenExternal('openItemStore'); return;
      case 'hotel':    wmapOpenHotel(); return;
      case 'wonder':   wmapOpenExternal('openWonderland'); return;
      case 'farm':     wmapOpenExternal('openFarm'); return;
      case 'alchemy':  wmapOpenExternal('openAlchemy'); return;
      case 'trading':  wmapOpenExternal('openTrading'); return;
      case 'atlas':    wmapOpenExternal('openStarAtlas'); return;
    }
  }

  // Other modules' openers add .active to their own view but don't know about mapView, so we
  // step aside first. If the module isn't loaded yet, stay on the map and tease it.
  function wmapOpenExternal(fnName){
    var fn = window[fnName];
    if (typeof fn === 'function') {
      var view = document.getElementById('mapView');
      if (view) view.classList.remove('active');
      fn();
    } else {
      wmapToast('🔨 Opening soon!');
    }
  }

  // ------------------------------------------------------------------
  // Hotel 🏨 — "A cozy night under the stars"
  // ------------------------------------------------------------------
  // PURE (console-testable): a night always costs 15 Cash per planet level.
  function hotelCost(){
    return 15 * (state.level || 1);
  }

  // The transaction, UI-free (console-testable). Returns { ok, msg }. On success it deducts the
  // Cash, refills HP/MP and lets updateStats() refresh the HUD + autosave.
  function hotelSleep(){
    var cost = hotelCost();
    var full = state.playerHp >= state.playerMaxHp && state.playerMp >= state.playerMaxMp;
    if (full) return { ok: false, msg: 'You’re already fully rested!' };
    if ((state.coins || 0) < cost) {
      return { ok: false, msg: 'Not enough Cash — a night costs 💵 ' + cost + ' and you have 💵 ' + (state.coins || 0) + '.' };
    }
    state.coins -= cost;
    state.playerHp = state.playerMaxHp;
    state.playerMp = state.playerMaxMp;
    if (typeof updateStats === 'function') updateStats();
    return { ok: true, msg: '😴 A cozy night under the stars — HP & MP fully restored!' };
  }

  function wmapRenderHotel(){
    var body = document.getElementById('wmapHotelBody');
    if (!body) return;
    var cost = hotelCost();
    var full = state.playerHp >= state.playerMaxHp && state.playerMp >= state.playerMaxMp;
    var broke = (state.coins || 0) < cost;
    var reason = full ? 'You’re already fully rested — go have an adventure!'
      : (broke ? 'Not enough Cash — solve problems to earn 💵 ' + (cost - (state.coins || 0)) + ' more.' : '');
    body.innerHTML = '' +
      '<div class="wmap-hotel-emoji" aria-hidden="true">🏨</div>' +
      '<h3 class="wmap-hotel-title">Starlight Hotel</h3>' +
      '<p class="wmap-hotel-desc">A cozy night under the stars — wake up with full ❤️ HP and 💧 MP!</p>' +
      '<div class="wmap-hotel-now">❤️ ' + state.playerHp + '/' + state.playerMaxHp +
        ' &nbsp;·&nbsp; 💧 ' + state.playerMp + '/' + state.playerMaxMp +
        ' &nbsp;·&nbsp; 💵 ' + (state.coins || 0) + '</div>' +
      '<button type="button" class="btn btn-primary wmap-sleep-btn" onclick="wmapDoSleep()"' +
        ((full || broke) ? ' disabled' : '') + '>😴 Sleep — 💵 ' + cost + '</button>' +
      (reason ? '<div class="wmap-hotel-reason">' + reason + '</div>' : '') +
      '<button type="button" class="btn btn-ghost wmap-hotel-leave" onclick="wmapCloseHotel()">🚪 Maybe later</button>';
  }

  function wmapOpenHotel(){
    var ov = document.getElementById('wmapHotelOverlay');
    if (!ov) return;
    wmapRenderHotel();
    var card = document.getElementById('wmapHotelCard');
    if (card) card.classList.remove('wmap-sleeping');
    ov.hidden = false;
  }

  function wmapCloseHotel(){
    var ov = document.getElementById('wmapHotelOverlay');
    if (ov) ov.hidden = true;
    var card = document.getElementById('wmapHotelCard');
    if (card) card.classList.remove('wmap-sleeping');
  }

  function wmapDoSleep(){
    var res = hotelSleep();
    wmapRefreshStatus();
    wmapRenderHotel();                       // re-disable the button / update the numbers
    wmapToast(res.msg);
    if (!res.ok) return;
    if (typeof playSfx === 'function') playSfx('buy');
    var card = document.getElementById('wmapHotelCard');
    if (card && !wmapPrefersReducedMotion()) {
      card.classList.add('wmap-sleeping');   // floating 💤 + dimmed "lights out" card
      setTimeout(wmapCloseHotel, 1300);
    } else {
      wmapCloseHotel();
    }
  }
