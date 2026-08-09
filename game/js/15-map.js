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

  // ------------------------------------------------------------------
  // TILE MAP (2026-08-05, player: "make the earth hub become walkable map so that the player needs
  // to walk to different stores/lab/etc"). The hub used to be a free-roam avatar sliding over a
  // painted backdrop on a 100x100 % grid with NOTHING to bump into, and phones didn't get a map at
  // all — under 1024px it fell back to a flat grid of tappable cards. It's now a real tile world:
  // discrete tile-by-tile steps, terrain that genuinely blocks you (walls / pond / trees), and a
  // camera that follows the player, so reaching a shop means walking a route around obstacles.
  //
  // Buildings are SOLID — you can't stand on a roof. Walking INTO one opens it ("bump the door"),
  // which keeps the demo's step-and-go immediacy while making buildings real obstacles you route
  // around. Enter/Space while standing next to one still works (keyboard/AT users), and tapping a
  // building tile opens it directly (phones, and anyone who just wants the old one-tap speed).
  // ------------------------------------------------------------------
  var WMAP_TILE = { FLOOR: 0, WALL: 1, WATER: 2, TREE: 3 };

  // Terrain only — buildings are overlaid from WMAP_SPOTS' tx/ty (below) and are always solid, so
  // this never has to know about them. Verified fully connected by wmapAudit().
  //
  // 31 x 17, grown from 21 x 11 on 2026-08-05 (player: "make the board much large....the shops are
  // too tight"). Once the shops became 2x2 they ate most of the 21-wide board and the walking gaps
  // between them shrank to a couple of tiles. The world is now roughly 2.2x the area, laid out in
  // three widely-spaced bands with 3-4 tile corridors between every building.
  //
  // Built from a compact spec rather than a hand-typed 31x17 literal: at this size a literal is
  // genuinely hard to read and very easy to get subtly wrong (one stray digit = an invisible wall).
  var WMAP_COLS = 31, WMAP_ROWS = 17;
  var WMAP_WATER = [[14, 10, 3, 2]];              // [x, y, w, h] — the village pond
  var WMAP_TREES = [
    [6, 5], [9, 5], [22, 5], [25, 5],
    [7, 10], [24, 10], [16, 4], [16, 12],
    [12, 14], [19, 14]
  ];
  var WMAP_GRID = (function buildGrid(){
    var g = [], x, y;
    for (y = 0; y < WMAP_ROWS; y++){
      var row = [];
      for (x = 0; x < WMAP_COLS; x++){
        var edge = (x === 0 || y === 0 || x === WMAP_COLS - 1 || y === WMAP_ROWS - 1);
        row.push(edge ? 1 : 0);
      }
      g.push(row);
    }
    WMAP_WATER.forEach(function(r){
      for (var wy = r[1]; wy < r[1] + r[3]; wy++)
        for (var wx = r[0]; wx < r[0] + r[2]; wx++) g[wy][wx] = 2;
    });
    WMAP_TREES.forEach(function(t){ g[t[1]][t[0]] = 3; });
    return g;
  })();

  // The nine buildings. tx/ty = the tile the building OCCUPIES (solid). Laid out to echo the old
  // painted map's rough arrangement (lab top-left, Arena Infinity top-centre, Wonderland top-right,
  // shops in the middle band, farm/item store along the bottom) so the place still feels familiar.
  var WMAP_SPOTS = [
    // Three bands (rows 2-3, 7-8, 12-13) with 3-4 open rows between them, and 5+ open columns
    // between neighbours in a band — so every shop has real walking room around it.
    { id: 'alchemy',  emoji: '🧪', name: 'Laboratory',    tx: 3,  ty: 2, accent: 'var(--sky)', desc: 'Synthesize Super Medicine and Acid Vials from ingredients + chips.' },
    { id: 'practice', emoji: '♾️', name: 'Arena Infinity', tx: 14, ty: 2, accent: 'var(--sky)', desc: 'Endless mixed practice from every arena you’ve cleared — earn XP, Wonderland Passes 🎟️ & a gold chest.' },
    { id: 'wonder',   emoji: '🎡', name: 'Wonderland',    tx: 25, ty: 2, accent: 'var(--coral)', desc: 'Choose 🎰 Casino (bet Cash on games of chance) or 🕹️ Arcade (skill games & puzzles) — both cost Wonderland Passes.' },
    { id: 'weapon',   emoji: '⚔️', name: 'Weapon Store',  tx: 11, ty: 7, accent: 'var(--coral)', desc: 'Buy and upgrade weapons & shields with Cash and chips.' },
    { id: 'trading',  emoji: '🔄', name: 'Trading Room',  tx: 19, ty: 7, accent: 'var(--yellow)', desc: 'Trade Cash ⇄ Gold ⇄ Silver at fluctuating market prices.' },
    { id: 'hotel',    emoji: '🏨', name: 'Hotel',         tx: 26, ty: 7, accent: 'var(--sky)', desc: 'Sleep to fully restore your HP & MP.' },
    { id: 'item',     emoji: '🎒', name: 'Item Store',    tx: 20, ty: 12, accent: 'var(--yellow)', desc: 'Buy potions, ingredients and farm supplies.' },
    // `dev: true` → shown on the map but not enterable yet: tapping / bumping / walking-up + Enter
    // all just toast "under development" (see wmapDevBlocked, wired into every entry path). Rendered
    // greyed with a 🚧 badge (wmap-dev in map.css). Flip this flag off to ship the Farm.
    { id: 'farm',     emoji: '🌾', name: 'Farm',          tx: 8,  ty: 12, accent: 'var(--yellow)', desc: 'Under development — coming soon! Grow crops and raise animals for materials over time.', dev: true },
    // Hidden until specialStoreUnlocked() (42-special-store.js) — clearing Arena 44's boss. Not
    // just rendered-disabled: it doesn't appear on the map at all before that, so there's nothing
    // to be curious about early. While hidden its tile is ordinary walkable floor — see
    // wmapSpotAt(), which only ever reports VISIBLE spots, so solidity follows visibility.
    { id: 'special',  emoji: '🏭', name: 'Special Item Store', tx: 3, ty: 7, accent: 'var(--violet, #9a6cff)',
      desc: 'Permanent HP/MP/AP/DP/Speed upgrades, stacking forever at a rising price. Unlocked by clearing Arena 44.', hidden: true }
  ];

  // Buildings actually shown right now — filters out `hidden` spots whose unlock check hasn't
  // passed yet (currently only the Special Item Store). Used by both rendering and the
  // walk-up-and-press-Enter proximity check so a hidden building can't be reached either way.
  function wmapVisibleSpots(){
    return WMAP_SPOTS.filter(function(s){
      if (!s.hidden) return true;
      return typeof specialStoreUnlocked === 'function' && specialStoreUnlocked();
    });
  }

  // (WMAP_COLS/WMAP_ROWS are declared above — the grid is built FROM them now, not measured from it.)
  var WMAP_SPAWN = { x: 15, y: 15 };          // village square, bottom-centre
  var wmapPos = { x: WMAP_SPAWN.x, y: WMAP_SPAWN.y };   // player's TILE; remembered between visits
  var wmapFacing = 'down';
  var wmapStepping = false;        // one step at a time, so held keys don't teleport you
  var wmapWalkTimer = null;        // pending "arrival" timer while a walk is in flight

  // Every building is WMAP_BSIZE x WMAP_BSIZE tiles (2026-08-05, player: "i think the shop should be
  // larger.....maybe 2 times 2 grids"). tx/ty is the footprint's TOP-LEFT tile; it blocks that whole
  // square. The band layout already left 2-row gaps and wide column gaps, so no repositioning was
  // needed — but wmapAudit() re-checks reachability rather than trusting that.
  var WMAP_BSIZE = 2;

  // The VISIBLE spot whose footprint covers this tile, or null. Hidden (not-yet-unlocked) buildings
  // deliberately report null, so their whole square is plain walkable floor until they're earned.
  function wmapSpotAt(x, y){
    var spots = wmapVisibleSpots();
    for (var i = 0; i < spots.length; i++){
      var s = spots[i];
      if (x >= s.tx && x < s.tx + WMAP_BSIZE && y >= s.ty && y < s.ty + WMAP_BSIZE) return s;
    }
    return null;
  }
  // Terrain-only walkability. Buildings are handled separately by the caller (bumping one opens it
  // rather than moving into it), so this stays a pure question about the ground.
  function wmapTerrainOpen(x, y){
    if (x < 0 || y < 0 || x >= WMAP_COLS || y >= WMAP_ROWS) return false;
    return WMAP_GRID[y][x] === WMAP_TILE.FLOOR;
  }
  // Can the player actually stand here? Floor AND no building on it.
  function wmapCanWalk(x, y){
    return wmapTerrainOpen(x, y) && !wmapSpotAt(x, y);
  }

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
  // (wmapCompact() used to live here: ≤1024px fell back to a flat grid of tappable cards with no
  // map at all. Removed 2026-08-05 — phones now get the same tile world plus an on-screen D-pad.)
  function wmapFindSpot(id){
    for (var i = 0; i < WMAP_SPOTS.length; i++){
      if (WMAP_SPOTS[i].id === id) return WMAP_SPOTS[i];
    }
    return null;
  }
  // An under-development building (spot.dev) is shown but not enterable. Returns true (and toasts)
  // when a spot is blocked, so callers can bail. Wired into BOTH entry points — wmapGoTo (click) and
  // wmapArrive (keyboard walk-up + Enter) — so there's no path that actually opens it.
  function wmapDevBlocked(spot){
    if (!spot || !spot.dev) return false;
    wmapToast('🚧 ' + spot.name + ' is under development — coming soon!');
    return true;
  }
  function wmapCancelWalk(){
    if (wmapWalkTimer) { clearTimeout(wmapWalkTimer); wmapWalkTimer = null; }
    if (typeof wmapUnbindKeys === 'function') wmapUnbindKeys();   // stop free-walk keys on any nav away
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
    wmapBindKeys();                          // tile stepping: keys + D-pad
    wmapPaint();                             // place the avatar on its tile + centre the camera
    if (typeof playMusic === 'function') playMusic('practice');
    // One-time "Special Item Store is open!" celebration — fires exactly once, the first Earth
    // Hub visit after Arena 44's boss falls (42-special-store.js). No-op every other visit.
    if (typeof specialStoreMaybeAnnounce === 'function') specialStoreMaybeAnnounce();
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

  // Header "📚 Practice" button: jump straight back to the arena from ANY view (hub, shop, minigame…).
  function returnToPractice(){
    if (typeof wgStopAll === 'function') wgStopAll();
    if (typeof stopTileBall === 'function') stopTileBall();
    wmapCancelWalk();
    document.querySelectorAll('.view-container').forEach(function(v){ v.classList.remove('active'); });
    var eq = document.getElementById('equationView');
    if (eq) eq.classList.add('active');
    if (typeof playMusic === 'function') playMusic('practice');
    // Coming back to Practice right after clearing an arena — even after a detour through
    // Wonderland/Earth Hub/etc. in between — ask once whether to keep going into the new arena
    // or jump to the Star Atlas to pick a different one, instead of silently dropping the player
    // into whatever arena they landed on (player: "ask...challenge the next arena by default, or
    // bring player to the atlas to choose"). Cleared immediately so it only asks once per advance,
    // no matter how long the detour before the player next clicks Practice.
    if (state.justAdvancedArena){
      state.justAdvancedArena = false;
      if (typeof showNextArenaChoice === 'function'){ showNextArenaChoice(); return; }
    }
    if (typeof loadProblem === 'function') loadProblem();
  }

  // The choice screen itself + its two outcomes.
  function showNextArenaChoice(){
    var ov = document.getElementById('nextArenaChoiceOverlay');
    if (!ov){ if (typeof loadProblem === 'function') loadProblem(); return; }   // markup missing — just proceed
    var titleEl = document.getElementById('nextArenaChoiceTitle');
    if (titleEl){
      var arena = (typeof getArena === 'function') ? getArena(state.level) : null;
      titleEl.textContent = 'Ready for Arena ' + state.level + (arena && arena.topic ? ' · ' + arena.topic : '') + '?';
    }
    ov.hidden = false;
    if (typeof playSfx === 'function') playSfx('machine');
  }
  function confirmPracticeNextArena(){
    var ov = document.getElementById('nextArenaChoiceOverlay');
    if (ov) ov.hidden = true;
    if (typeof loadProblem === 'function') loadProblem();
  }
  function chooseFromAtlasInstead(){
    var ov = document.getElementById('nextArenaChoiceOverlay');
    if (ov) ov.hidden = true;
    if (typeof openStarAtlas === 'function') openStarAtlas();
    else if (typeof openCodex === 'function') openCodex('atlas');
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

  // One terrain tile per cell. Purely presentational — walkability is decided by wmapCanWalk(),
  // never by what a tile looks like.
  function wmapTilesHtml(){
    var out = [], y, x;
    for (y = 0; y < WMAP_ROWS; y++){
      for (x = 0; x < WMAP_COLS; x++){
        var t = WMAP_GRID[y][x], cls = 'wmap-tile';
        if (t === WMAP_TILE.WALL) cls += ' wmap-t-wall';
        else if (t === WMAP_TILE.WATER) cls += ' wmap-t-water';
        else if (t === WMAP_TILE.TREE) cls += ' wmap-t-tree';
        else cls += ' wmap-t-floor' + ((x + y) % 2 ? ' wmap-t-alt' : '');
        out.push('<div class="' + cls + '" style="left:' + (x * 100 / WMAP_COLS) + '%;top:' +
          (y * 100 / WMAP_ROWS) + '%" aria-hidden="true"></div>');
      }
    }
    return out.join('');
  }

  // Buildings sit ON the grid at their tx/ty. Still real <button>s so tapping one opens it directly
  // and screen readers can reach every destination without walking the grid.
  function wmapBuildingsHtml(){
    return wmapVisibleSpots().map(function(s){
      var badge = s.dev
        ? '<span class="wmap-badge wmap-badge-dev" title="This building is under development">🚧</span>'
        : (s.id === 'wonder'
          ? '<span class="wmap-badge" id="wmapWonderBadge" title="Wonderland Passes you have">🎟️ ' + (state.wonderPasses || 0) + '</span>'
          : '');
      return '<button type="button" class="wmap-building' + (s.dev ? ' wmap-dev' : '') + '" data-id="' + s.id + '" ' +
        'style="left:' + (s.tx * 100 / WMAP_COLS) + '%;top:' + (s.ty * 100 / WMAP_ROWS) + '%;--wmap-accent:' + s.accent + '" ' +
        'onclick="wmapGoTo(\'' + s.id + '\')" ' +
        (s.dev ? 'aria-disabled="true" ' : '') +
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
        // viewport = fixed window; world = the full grid, translated under it by the camera.
        '<div class="wmap-viewport" id="wmapViewport">' +
          '<div class="wmap-world" id="wmapWorld" style="--wmap-cols:' + WMAP_COLS + ';--wmap-rows:' + WMAP_ROWS + '">' +
            wmapTilesHtml() +
            wmapBuildingsHtml() +
            '<div class="wmap-avatar" id="wmapAvatar" aria-hidden="true">' +
              '<span class="wmap-avatar-flip"><span class="wmap-avatar-emoji">🧑‍🚀</span></span>' +
            '</div>' +
          '</div>' +
          '<div class="wmap-enter-hint" id="wmapEnterHint" hidden></div>' +
        '</div>' +
        '<div class="wmap-dpad" id="wmapDpad" aria-label="Move">' +
          '<button type="button" class="wmap-dbtn wmap-d-up"    data-dx="0"  data-dy="-1" aria-label="Walk up">▲</button>' +
          '<button type="button" class="wmap-dbtn wmap-d-left"  data-dx="-1" data-dy="0"  aria-label="Walk left">◀</button>' +
          '<button type="button" class="wmap-dbtn wmap-d-down"  data-dx="0"  data-dy="1"  aria-label="Walk down">▼</button>' +
          '<button type="button" class="wmap-dbtn wmap-d-right" data-dx="1"  data-dy="0"  aria-label="Walk right">▶</button>' +
        '</div>' +
        '<p class="wmap-hint">🎮 Walk with <b>arrow keys</b>, <b>WASD</b> or the <b>D-pad</b> — bump into a building to go in. ' +
          '(Standing next to one, <b>Enter</b> works too; tapping a building opens it straight away.) ' +
          '<span class="wmap-coord" id="wmapCoord">📍 (' + wmapPos.x + ', ' + wmapPos.y + ')</span></p>' +
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
  // Tapping/clicking a building opens it directly — the deliberate shortcut for phones, mouse users
  // and screen readers. Walking there with the keys/D-pad is the scenic route, not a toll gate.
  function wmapGoTo(id){
    var spot = wmapFindSpot(id);
    if (!spot) return;
    if (wmapDevBlocked(spot)) return;        // under-development building: toast, don't open
    wmapCancelWalk();
    wmapArrive(id);
  }

  // ------------------------------------------------------------------
  // Free keyboard walking (item 10): the scene is a 100×100 grid — the avatar's
  // %-coords ARE its 0-100 grid position. Arrow keys / WASD move it smoothly; step
  // up to a building (within ~8 units of its door) and press Enter to go in.
  // ------------------------------------------------------------------
  var WMAP_STEP_MS = 130;                    // must match the avatar's left/top transition in map.css
  var wmapNearId = null, wmapKd = null, wmapDpadTimer = null;

  // PURE + console-testable: try to move one tile. Returns what happened, which is what makes this
  // testable without a DOM ('enter' = bumped a building, 'blocked' = terrain said no, 'move' = walked).
  // Bumping a building is how you go in, so a building tile is never something you stand on.
  function wmapStep(dx, dy){
    if (dx < 0) wmapFacing = 'left'; else if (dx > 0) wmapFacing = 'right';
    else if (dy < 0) wmapFacing = 'up'; else if (dy > 0) wmapFacing = 'down';
    var nx = wmapPos.x + dx, ny = wmapPos.y + dy;
    var spot = wmapSpotAt(nx, ny);
    if (spot) return { result: 'enter', id: spot.id };
    if (!wmapTerrainOpen(nx, ny)) return { result: 'blocked' };
    wmapPos.x = nx; wmapPos.y = ny;
    return { result: 'move' };
  }

  // Move + all the presentation around it. Guarded by wmapStepping so a held key walks at a steady
  // pace instead of firing as fast as the OS repeats.
  function wmapTryStep(dx, dy){
    var view = document.getElementById('mapView');
    if (!view || !view.classList.contains('active')) return;
    if (wmapStepping) return;
    var out = wmapStep(dx, dy);
    var av = document.getElementById('wmapAvatar');
    wmapFaceAvatar();
    if (out.result === 'enter'){
      if (typeof playSfx === 'function') playSfx('ui-click');
      wmapArrive(out.id);                      // wmapArrive itself re-checks dev-blocked
      return;
    }
    if (out.result === 'blocked'){
      if (av) av.classList.add('wmap-bump');
      setTimeout(function(){ var a = document.getElementById('wmapAvatar'); if (a) a.classList.remove('wmap-bump'); }, 160);
      return;
    }
    wmapStepping = true;
    if (av) av.classList.add('wmap-keywalk');
    wmapPaint();
    setTimeout(function(){
      wmapStepping = false;
      var a = document.getElementById('wmapAvatar');
      if (a) a.classList.remove('wmap-keywalk');
    }, wmapPrefersReducedMotion() ? 0 : WMAP_STEP_MS);
  }

  // Point the avatar sprite the way it's walking. Up/down have their own art; left and right share
  // one "side" pose that CSS mirrors, so the two can never end up drawn the wrong way round.
  function wmapFaceAvatar(){
    var av = document.getElementById('wmapAvatar');
    if (!av) return;
    var side = (wmapFacing === 'left' || wmapFacing === 'right');
    av.setAttribute('data-face', side ? 'side' : wmapFacing);
    // player-side.png is drawn facing LEFT (verified by measuring the visor's offset from the body
    // centre), so RIGHT is the direction that needs mirroring — this was inverted when first shipped.
    av.classList.toggle('wmap-flip', wmapFacing === 'right');
  }

  // Pick a tile size from the viewport. Originally this divided the width by the column count so the
  // world exactly spanned the screen — right for a 21-wide board, wrong for a 31-wide one, where it
  // would shrink tiles to ~58px and undo the whole point of making the shops 2x2.
  //
  // The world is now comfortably bigger than any viewport, so the wasted-margin problem it was
  // solving can't recur; instead aim for a fixed number of tiles ACROSS (WMAP_TILES_ACROSS) and let
  // the camera scroll. That keeps buildings a consistent, chunky size on every screen — a phone sees
  // fewer tiles rather than the same tiles shrunk to nothing.
  var WMAP_TILE_MIN = 52, WMAP_TILE_MAX = 96, WMAP_TILES_ACROSS = 20;
  function wmapFitTiles(){
    var vp = document.getElementById('wmapViewport'), world = document.getElementById('wmapWorld');
    if (!vp || !world) return;
    var vw = vp.clientWidth;
    if (!vw) return;                          // not laid out yet — CSS default stands in
    var t = Math.round(vw / WMAP_TILES_ACROSS);
    t = Math.max(WMAP_TILE_MIN, Math.min(WMAP_TILE_MAX, t));
    // Safety net: if a very wide screen could still out-run the world, fall back to filling it so no
    // dead margin ever comes back.
    if (t * WMAP_COLS < vw) t = Math.ceil(vw / WMAP_COLS);
    world.style.setProperty('--wmap-tile', t + 'px');
  }

  // Put the avatar on its tile, slide the camera, refresh the adjacency hint.
  function wmapPaint(){
    wmapFitTiles();
    wmapFaceAvatar();
    var av = document.getElementById('wmapAvatar');
    if (av){
      av.style.left = (wmapPos.x * 100 / WMAP_COLS) + '%';
      av.style.top = (wmapPos.y * 100 / WMAP_ROWS) + '%';
    }
    wmapUpdateCamera();
    wmapUpdateProximity();
  }

  // Centre the player in the viewport, but never scroll past the edges of the world — so a world
  // smaller than the viewport just sits centred instead of drifting.
  function wmapUpdateCamera(){
    var vp = document.getElementById('wmapViewport'), world = document.getElementById('wmapWorld');
    if (!vp || !world) return;
    var vw = vp.clientWidth, vh = vp.clientHeight;
    var ww = world.offsetWidth, wh = world.offsetHeight;
    if (!ww || !wh) return;
    var tw = ww / WMAP_COLS, th = wh / WMAP_ROWS;
    var tx, ty;
    if (ww <= vw) tx = (vw - ww) / 2;
    else tx = Math.min(0, Math.max(vw - ww, vw / 2 - (wmapPos.x * tw + tw / 2)));
    if (wh <= vh) ty = (vh - wh) / 2;
    else ty = Math.min(0, Math.max(vh - wh, vh / 2 - (wmapPos.y * th + th / 2)));
    world.style.transform = 'translate(' + Math.round(tx) + 'px,' + Math.round(ty) + 'px)';
  }

  // Highlight the building you're standing beside (4-neighbour) and show the Enter hint.
  function wmapUpdateProximity(){
    var near = wmapSpotAt(wmapPos.x, wmapPos.y - 1) || wmapSpotAt(wmapPos.x, wmapPos.y + 1) ||
               wmapSpotAt(wmapPos.x - 1, wmapPos.y) || wmapSpotAt(wmapPos.x + 1, wmapPos.y);
    var co = document.getElementById('wmapCoord');
    if (co) co.textContent = '📍 (' + wmapPos.x + ', ' + wmapPos.y + ')';
    var newId = near ? near.id : null;
    if (newId !== wmapNearId){
      wmapNearId = newId;
      var buildings = document.querySelectorAll('.wmap-building');
      for (var b = 0; b < buildings.length; b++) buildings[b].classList.toggle('wmap-near', buildings[b].getAttribute('data-id') === newId);
    }
    var hint = document.getElementById('wmapEnterHint');
    if (hint){
      if (near){
        hint.hidden = false;
        hint.innerHTML = near.dev
          ? '🚧 ' + near.emoji + ' ' + wmapEsc(near.name) + ' is under development'
          : '▶ Press <b>Enter</b> to visit ' + near.emoji + ' ' + wmapEsc(near.name);
      }
      else hint.hidden = true;
    }
  }

  function wmapBindKeys(){
    wmapUnbindKeys();
    wmapNearId = null;
    wmapKd = function(e){
      var view = document.getElementById('mapView');
      if (!view || !view.classList.contains('active')) return;
      switch (e.key){
        case 'ArrowUp': case 'w': case 'W': e.preventDefault(); wmapTryStep(0, -1); return;
        case 'ArrowDown': case 's': case 'S': e.preventDefault(); wmapTryStep(0, 1); return;
        case 'ArrowLeft': case 'a': case 'A': e.preventDefault(); wmapTryStep(-1, 0); return;
        case 'ArrowRight': case 'd': case 'D': e.preventDefault(); wmapTryStep(1, 0); return;
        case 'Enter': case ' ':
          if (wmapNearId){ e.preventDefault(); wmapArrive(wmapNearId); }
          return;
      }
    };
    document.addEventListener('keydown', wmapKd);
    wmapBindDpad();
    // Re-fit on rotate/resize so the village keeps filling the width. Bound once for the page life
    // (wmapPaint no-ops harmlessly when the hub isn't on screen), so repeat visits can't stack it.
    if (!wmapResizeBound){
      wmapResizeBound = true;
      window.addEventListener('resize', function(){
        var v = document.getElementById('mapView');
        if (v && v.classList.contains('active')) wmapPaint();
      });
    }
  }
  var wmapResizeBound = false;
  function wmapUnbindKeys(){
    if (wmapKd){ document.removeEventListener('keydown', wmapKd); wmapKd = null; }
    wmapStopDpad();
    wmapStepping = false;
  }

  // On-screen D-pad (phones/tablets — and handy with a mouse). Hold-to-repeat mirrors key repeat.
  // pointerdown (not click) so it responds on touch-down; the CSS gives it touch-action:none so a
  // press that drifts a few pixels moves the player instead of scrolling the page.
  function wmapStopDpad(){ if (wmapDpadTimer){ clearInterval(wmapDpadTimer); wmapDpadTimer = null; } }
  function wmapBindDpad(){
    var pad = document.getElementById('wmapDpad');
    if (!pad || pad.dataset.wired) return;
    pad.dataset.wired = '1';
    pad.querySelectorAll('.wmap-dbtn').forEach(function(btn){
      var dx = Number(btn.dataset.dx), dy = Number(btn.dataset.dy);
      btn.addEventListener('pointerdown', function(e){
        e.preventDefault();
        wmapTryStep(dx, dy);
        wmapStopDpad();
        wmapDpadTimer = setInterval(function(){ wmapTryStep(dx, dy); }, WMAP_STEP_MS + 40);
      });
      ['pointerup', 'pointerleave', 'pointercancel'].forEach(function(ev){
        btn.addEventListener(ev, wmapStopDpad);
      });
    });
  }

  // Console-testable integrity check: every VISIBLE building must be reachable on foot from spawn.
  // Buildings are solid, so "reachable" means standing on an adjacent walkable tile — a building
  // walled off behind trees/water would be a silent dead end, and this is what catches that.
  function wmapAudit(){
    var seen = {}, queue = [[WMAP_SPAWN.x, WMAP_SPAWN.y]], reached = 0;
    seen[WMAP_SPAWN.x + ',' + WMAP_SPAWN.y] = true;
    while (queue.length){
      var cur = queue.shift(), cx = cur[0], cy = cur[1];
      reached++;
      [[0,-1],[0,1],[-1,0],[1,0]].forEach(function(d){
        var nx = cx + d[0], ny = cy + d[1], k = nx + ',' + ny;
        if (seen[k] || !wmapCanWalk(nx, ny)) return;
        seen[k] = true; queue.push([nx, ny]);
      });
    }
    // A building is reachable if ANY tile around its whole WMAP_BSIZE square was reached — with a
    // 2x2 footprint the four corners of the old 1-tile check aren't enough.
    function perimeter(s){
      var out = [];
      for (var d = 0; d < WMAP_BSIZE; d++){
        out.push([s.tx + d, s.ty - 1], [s.tx + d, s.ty + WMAP_BSIZE],
                 [s.tx - 1, s.ty + d], [s.tx + WMAP_BSIZE, s.ty + d]);
      }
      return out;
    }
    var unreachable = wmapVisibleSpots().filter(function(s){
      return !perimeter(s).some(function(p){ return seen[p[0] + ',' + p[1]]; });
    }).map(function(s){ return s.id; });

    // Footprints must not sit on blocking terrain or on each other — either would silently eat
    // tiles the layout assumes are free, and neither shows up as "unreachable".
    var overlaps = [], owner = {};
    wmapVisibleSpots().forEach(function(s){
      for (var dy = 0; dy < WMAP_BSIZE; dy++){
        for (var dx = 0; dx < WMAP_BSIZE; dx++){
          var x = s.tx + dx, y = s.ty + dy, k = x + ',' + y;
          if (!wmapTerrainOpen(x, y)) overlaps.push(s.id + ' on blocked terrain ' + k);
          if (owner[k]) overlaps.push(s.id + ' overlaps ' + owner[k] + ' at ' + k);
          owner[k] = s.id;
        }
      }
    });
    return { spawnWalkable: wmapCanWalk(WMAP_SPAWN.x, WMAP_SPAWN.y),
             tilesReachable: reached, unreachableBuildings: unreachable, footprintClashes: overlaps,
             ok: !unreachable.length && !overlaps.length };
  }

  function wmapArrive(id){
    if (wmapDevBlocked(wmapFindSpot(id))) return;   // safety net for the keyboard walk-up + Enter path
    switch (id) {
      case 'practice': wmapOpenExternal('openArenaInfinity'); return;
      case 'weapon':   wmapOpenExternal('openShop'); return;
      case 'item':     wmapOpenExternal('openItemStore'); return;
      case 'hotel':    wmapOpenHotel(); return;
      case 'wonder':   wmapOpenExternal('openWonderland'); return;
      case 'farm':     wmapOpenExternal('openFarm'); return;
      case 'alchemy':  wmapOpenExternal('openAlchemy'); return;
      case 'trading':  wmapOpenExternal('openTrading'); return;
      case 'atlas':    wmapOpenExternal('openStarAtlas'); return;
      case 'special':  wmapOpenExternal('openSpecialStore'); return;
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
      '<div class="wmap-hotel-now" title="Your current HP, MP and Cash before sleeping">❤️ ' + state.playerHp + '/' + state.playerMaxHp +
        ' &nbsp;·&nbsp; 💧 ' + state.playerMp + '/' + state.playerMaxMp +
        ' &nbsp;·&nbsp; 💵 ' + (state.coins || 0) + '</div>' +
      '<button type="button" class="btn btn-primary wmap-sleep-btn" title="Pay 💵 ' + cost + ' Cash to fully restore your HP & MP" onclick="wmapDoSleep()"' +
        ((full || broke) ? ' disabled' : '') + '>😴 Sleep — 💵 ' + cost + '</button>' +
      (reason ? '<div class="wmap-hotel-reason">' + reason + '</div>' : '') +
      '<button type="button" class="btn btn-ghost wmap-hotel-leave" title="Leave without sleeping — HP & MP stay as they are" onclick="wmapCloseHotel()">🚪 Maybe later</button>';
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
