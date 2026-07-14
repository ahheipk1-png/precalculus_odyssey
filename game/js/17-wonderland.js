  // ============================================================================
  // Wonderland — carnival lobby + "Tile Ball" minigame (module 17)
  // ----------------------------------------------------------------------------
  // Classic script sharing the one global scope (see other js/ modules). Renders
  // its whole UI into <div id="wonderlandView" class="view-container"> at open
  // time (innerHTML, no `el` cache) and toggles views the same way openShop does.
  //
  // Economy: playing Tile Ball costs 1 Wonderland Pass (state.wonderPasses,
  // earned via awardWonderPasses in 09-items.js). Prizes are materials + items
  // paid out through addMaterials/addItem, then updateStats() (which autosaves —
  // this module never touches localStorage itself).
  //
  // Design decisions:
  // - The game runs on a fixed 480x340 logical canvas; CSS scales it to the
  //   container width (height:auto keeps the aspect), and pointer input is
  //   mapped back through getBoundingClientRect, so it works at any size.
  // - One requestAnimationFrame loop, id kept in WOND.raf. stopTileBall()
  //   cancels it and unbinds listeners; as a safety net the loop also
  //   self-stops if #wonderlandView ever loses .active (e.g. another module
  //   switched views without calling closeWonderland()).
  // - Ball movement is integrated in <=6px substeps so a sped-up ball can never
  //   tunnel through an 18px tile between frames.
  // - Every cross-module call (playMusic, playSfx, showToast, updateStats,
  //   openMapHub, addMaterials, addItem, ...) is typeof-guarded per the house
  //   rules, so the module degrades gracefully if a dependency is missing.
  // - wonderRewardForScore(f) and applyWonderReward(r) are the pure/testable
  //   API: reward tiers by fraction of tiles destroyed, and the payout side
  //   effects, kept separate so the console can exercise both.
  // ============================================================================

  // ---------- Tile Ball constants ----------
  var WOND_W = 480, WOND_H = 340;            // logical canvas size (CSS scales it)
  var WOND_COLS = 6, WOND_ROWS = 5;          // 30 tiles total
  var WOND_BASE_SPEED = 4.0;                 // px per 60fps-frame
  var WOND_MAX_SPEED = 7.5;
  var WOND_START_BALLS = 3;

  // ---------- Mutable game state (module-global, reset by wondInitGame) ----------
  var WOND = {
    raf: 0,               // requestAnimationFrame id (0 = not scheduled)
    running: false,
    over: false,
    canvas: null,
    ctx2d: null,
    lastTs: 0,
    colors: null,
    stars: [],
    tiles: [],
    tilesTotal: WOND_COLS * WOND_ROWS,
    tilesLeft: WOND_COLS * WOND_ROWS,
    balls: WOND_START_BALLS,
    hits: 0,              // paddle bounces + tile breaks; every 8th speeds the ball up
    speed: WOND_BASE_SPEED,
    launched: false,
    paddle: { x: 0, y: 0, w: 84, h: 12 },
    ball: { x: 0, y: 0, vx: 0, vy: 0, r: 7 },
    keys: { left: false, right: false },
    handlers: null        // bound listeners, kept so stopTileBall can remove them
  };

  // ---------- Small pure helpers ----------
  function wondClamp(v, lo, hi){ return v < lo ? lo : (v > hi ? hi : v); }

  // Read a CSS design token off :root (canvas can't use var() directly).
  function wondToken(name, fallback){
    try {
      var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return v || fallback;
    } catch (e) { return fallback; }
  }

  function wondPalette(){
    return {
      chalk:    wondToken('--chalk', '#F4F1E8'),
      chalkDim: wondToken('--chalk-dim', '#B9C7BE'),
      yellow:   wondToken('--yellow', '#F2C14E'),
      coral:    wondToken('--coral', '#F0705E'),
      sky:      wondToken('--sky', '#6EC1E4')
    };
  }

  // PURE: reward tier for a cleared fraction f (tiles destroyed / total).
  function wonderRewardForScore(f){
    if (f >= 1.0) return { chips: { quantum_chip: 1, cpu: 2 },        gold: 2, silver: 2, item: 'star_dew' };
    if (f >= 0.7) return { chips: { cpu: 1, energy_core: 2 },         gold: 2, silver: 1, item: 'moon_herb' };
    if (f >= 0.4) return { chips: { energy_core: 2, robotic_alloy: 1 }, silver: 2, item: null };
    return { chips: { energy_core: 1 }, item: null };                // consolation
  }
  // Compact "🥇2 🥈2 🔋2 🖥️1" summary of a reward.
  function wondRewardStr(r){
    var parts = [];
    if (r.gold)   parts.push('🥇' + r.gold);
    if (r.silver) parts.push('🥈' + r.silver);
    if (r.chips && typeof chipsSummary === 'function') { var s = chipsSummary(r.chips); if (s) parts.push(s); }
    return parts.join(' ');
  }

  // PURE: kid-facing label for the tier a fraction currently earns (HUD + results).
  function wondTierLabel(f){
    if (f >= 1.0) return '🌟 Grand Prize';
    if (f >= 0.7) return '🥇 Gold Prize';
    if (f >= 0.4) return '🥈 Silver Prize';
    return '🫀 Consolation Prize';
  }

  // Pay out a reward object from wonderRewardForScore. Side effects only — the
  // full-clear fanfare is inferred from the tier itself (only f>=1 grants star_dew).
  function applyWonderReward(r){
    if (!r) return;
    if (r.chips && typeof addChips === 'function') addChips(r.chips);
    if ((r.gold || r.silver) && typeof addCurrency === 'function') addCurrency(r.gold, r.silver);
    if (r.item && typeof addItem === 'function') addItem(r.item, 1);
    if (typeof updateStats === 'function') updateStats();   // refresh HUD + autosave
    var msg = '🎁 Prize won: ' + wondRewardStr(r);
    if (r.item) {
      var it = (typeof ITEMS === 'object' && ITEMS[r.item]) ? ITEMS[r.item] : { icon: '🎁', name: r.item };
      msg += ' + ' + it.icon + ' ' + it.name;
    }
    if (typeof showToast === 'function') showToast(msg);
    var fullClear = r.item === 'star_dew';
    if (typeof playSfx === 'function') playSfx(fullClear ? 'victory' : 'loot');
  }

  // ---------- View toggling (openShop pattern, robust variant) ----------
  function wondShowView(){
    document.querySelectorAll('.view-container').forEach(function(v){ v.classList.remove('active'); });
    var view = document.getElementById('wonderlandView');
    if (view) view.classList.add('active');
    return view;
  }

  function openWonderland(){
    stopTileBall();                       // never leave a stale loop behind
    var view = wondShowView();
    if (!view) return;
    view.innerHTML = wondLobbyHtml();
    if (typeof playMusic === 'function') playMusic('arena');
  }

  function closeWonderland(){
    stopTileBall();
    var view = document.getElementById('wonderlandView');
    if (view) view.classList.remove('active');
    var eq = document.getElementById('equationView');
    if (eq) eq.classList.add('active');
    if (typeof playMusic === 'function') playMusic('practice');
  }

  // Back button: the Map Hub when it exists, otherwise fall back to the equation view.
  function wonderBackToMap(){
    stopTileBall();
    var view = document.getElementById('wonderlandView');
    if (view) view.classList.remove('active');
    if (typeof openMapHub === 'function') { openMapHub(); return; }
    closeWonderland();
  }

  // ---------- Lobby ----------
  function wondLobbyHtml(){
    var passes = (typeof state === 'object' && state) ? (state.wonderPasses || 0) : 0;
    var locked = [
      ['🎠', 'Merry Math-Go-Round'],
      ['🎣', 'Gone Fishin’'],
      ['🎯', 'Bullseye Numbers']
    ].map(function(g){
      return '<div class="wond-card wond-locked">' +
        '<div class="wond-card-icon">' + g[0] + '</div>' +
        '<div class="wond-card-name">' + g[1] + '</div>' +
        '<div class="wond-card-desc">A new carnival game is being built!</div>' +
        '<span class="wond-soon">🔒 Coming soon</span>' +
        '</div>';
    }).join('');
    return '' +
      '<div class="wond-board">' +
        '<div class="wond-head">' +
          '<h2 class="wond-title"><span class="wond-wheel">🎡</span> Wonderland</h2>' +
          '<p class="wond-sub">Step right up! Trade passes for carnival games and prizes!</p>' +
        '</div>' +
        '<div class="wond-passrow">' +
          '<span class="wond-passes">🎟️ Wonderland Passes: <b>' + passes + '</b></span>' +
          '<span class="wond-hint">Finish a planet perfectly to earn passes!</span>' +
        '</div>' +
        '<div class="wond-grid">' +
          '<div class="wond-card">' +
            '<div class="wond-card-icon">🧱</div>' +
            '<div class="wond-card-name">Tile Ball</div>' +
            '<div class="wond-card-desc">Bounce the ball and smash every tile to win the Grand Prize!</div>' +
            '<button type="button" class="btn btn-primary wond-play" onclick="startTileBall()">Play! (1 🎟️)</button>' +
          '</div>' +
          '<div class="wond-card">' +
            '<div class="wond-card-icon">🎲</div>' +
            '<div class="wond-card-name">Hoo Hey How</div>' +
            '<div class="wond-card-desc">Bet Cash on lucky symbols and roll three dice!</div>' +
            '<button type="button" class="btn btn-primary wond-play" onclick="openHooHey()">Play! (Cash 💵)</button>' +
          '</div>' +
          locked +
        '</div>' +
        '<div class="wond-footer">' +
          '<button type="button" class="btn btn-ghost" onclick="wonderBackToMap()">← Back to Earth</button>' +
        '</div>' +
      '</div>';
  }

  // ---------- Tile Ball: screens ----------
  function wondGameHtml(){
    return '' +
      '<div class="wond-board wond-game">' +
        '<div class="wond-game-top">' +
          '<h2 class="wond-title wond-title-sm">🧱 Tile Ball</h2>' +
          '<button type="button" class="btn btn-ghost" onclick="openWonderland()">← Lobby</button>' +
        '</div>' +
        '<div class="wond-hud" id="wondHud"></div>' +
        '<div class="wond-canvas-wrap">' +
          '<canvas id="wondCanvas" class="wond-canvas" width="' + WOND_W + '" height="' + WOND_H + '" aria-label="Tile Ball game"></canvas>' +
        '</div>' +
        '<p class="wond-tip">Move: mouse, drag, or ⬅️ ➡️ keys · Click, tap, or Space to launch · Leaving mid-game skips the prize!</p>' +
      '</div>';
  }

  function wondPrizeChips(r){
    var parts = [];
    if (r.gold)   parts.push('<span class="wond-chip wond-prize-chip">🥇 Gold ×' + r.gold + '</span>');
    if (r.silver) parts.push('<span class="wond-chip wond-prize-chip">🥈 Silver ×' + r.silver + '</span>');
    var cm = r.chips || {};
    var order = (typeof CHIP_ORDER !== 'undefined') ? CHIP_ORDER : Object.keys(cm);
    order.forEach(function(k){
      if (!cm[k]) return;
      var m = (typeof CHIPS === 'object' && CHIPS[k]) ? CHIPS[k] : { icon: '🧩', name: k };
      parts.push('<span class="wond-chip wond-prize-chip">' + m.icon + ' ' + m.name + ' ×' + cm[k] + '</span>');
    });
    if (r.item){
      var it = (typeof ITEMS === 'object' && ITEMS[r.item]) ? ITEMS[r.item] : { icon: '🎁', name: r.item };
      parts.push('<span class="wond-chip wond-prize-chip wond-item-chip">' + it.icon + ' ' + it.name + ' ×1</span>');
    }
    return parts.join('');
  }

  function wondResultHtml(f, destroyed, r){
    var pct = Math.round(f * 100);
    var passes = (typeof state === 'object' && state) ? (state.wonderPasses || 0) : 0;
    var headline = f >= 1.0 ? '🌟 GRAND PRIZE! 🌟' : (f >= 0.4 ? '🎉 Nice run!' : '💪 Nice try!');
    return '' +
      '<div class="wond-board">' +
        '<div class="wond-head">' +
          '<h2 class="wond-title">' + headline + '</h2>' +
          '<p class="wond-sub">You smashed <b>' + destroyed + ' / ' + WOND.tilesTotal + '</b> tiles (' + pct + '%) — ' + wondTierLabel(f) + '</p>' +
        '</div>' +
        '<div class="wond-result-card">' +
          '<div class="wond-result-label">Your prizes</div>' +
          '<div class="wond-prizes">' + wondPrizeChips(r) + '</div>' +
        '</div>' +
        '<div class="wond-footer">' +
          '<button type="button" class="btn btn-primary" onclick="startTileBall()">Play again! (1 🎟️ — you have ' + passes + ')</button>' +
          '<button type="button" class="btn btn-ghost" onclick="openWonderland()">← Back to Lobby</button>' +
        '</div>' +
      '</div>';
  }

  // ---------- Tile Ball: lifecycle ----------
  function startTileBall(){
    if (WOND.running) return;                                 // ignore double-clicks
    var view = document.getElementById('wonderlandView');
    if (!view) return;                                        // container not wired yet
    var passes = (typeof state === 'object' && state) ? (state.wonderPasses || 0) : 0;
    if (passes < 1){
      if (typeof showToast === 'function') showToast('You need a Wonderland Pass! Finish a planet to earn some.');
      if (typeof playSfx === 'function') playSfx('wrong');
      return;
    }
    state.wonderPasses = passes - 1;
    if (typeof updateStats === 'function') updateStats();     // HUD refresh + autosave
    wondShowView();
    view.innerHTML = wondGameHtml();
    wondInitGame();
    if (typeof playSfx === 'function') playSfx('ui-click');
  }

  function wondInitGame(){
    var canvas = document.getElementById('wondCanvas');
    if (!canvas) return;
    WOND.canvas = canvas;
    WOND.ctx2d = canvas.getContext('2d');
    WOND.colors = wondPalette();
    WOND.running = true;
    WOND.over = false;
    WOND.lastTs = 0;
    WOND.balls = WOND_START_BALLS;
    WOND.hits = 0;
    WOND.speed = WOND_BASE_SPEED;
    WOND.launched = false;
    WOND.keys.left = WOND.keys.right = false;
    WOND.paddle.x = (WOND_W - WOND.paddle.w) / 2;
    WOND.paddle.y = WOND_H - 26;
    wondBuildTiles();
    wondBuildStars();
    wondResetBall();
    wondBindInput();
    wondUpdateHud();
    WOND.raf = requestAnimationFrame(wondLoop);
  }

  // Stop the loop and unbind input. Safe to call any number of times.
  function stopTileBall(){
    if (WOND.raf){ cancelAnimationFrame(WOND.raf); WOND.raf = 0; }
    WOND.running = false;
    WOND.lastTs = 0;
    var h = WOND.handlers;
    if (h){
      if (h.canvas){
        h.canvas.removeEventListener('pointermove', h.move);
        h.canvas.removeEventListener('pointerdown', h.down);
      }
      document.removeEventListener('keydown', h.kd);
      document.removeEventListener('keyup', h.ku);
      WOND.handlers = null;
    }
  }

  function endTileBall(){
    if (WOND.over) return;
    WOND.over = true;
    var destroyed = WOND.tilesTotal - WOND.tilesLeft;
    var f = WOND.tilesTotal > 0 ? destroyed / WOND.tilesTotal : 0;
    stopTileBall();
    var r = wonderRewardForScore(f);
    applyWonderReward(r);
    var view = document.getElementById('wonderlandView');
    if (view) view.innerHTML = wondResultHtml(f, destroyed, r);
  }

  // ---------- Tile Ball: setup helpers ----------
  function wondBuildTiles(){
    var gap = 6, tileH = 18, tileW = 70;
    var left = (WOND_W - (WOND_COLS * tileW + (WOND_COLS - 1) * gap)) / 2;
    var top = 40;
    var cols = WOND.colors;
    var rowColors = [cols.coral, cols.yellow, cols.sky, cols.chalk, cols.chalkDim];
    WOND.tiles = [];
    for (var r = 0; r < WOND_ROWS; r++){
      for (var c = 0; c < WOND_COLS; c++){
        WOND.tiles.push({
          x: left + c * (tileW + gap),
          y: top + r * (tileH + gap),
          w: tileW, h: tileH,
          color: rowColors[r % rowColors.length],
          alive: true
        });
      }
    }
    WOND.tilesTotal = WOND.tiles.length;
    WOND.tilesLeft = WOND.tiles.length;
  }

  // A fixed constellation of faint chalk dots (deterministic — no flicker on replay).
  function wondBuildStars(){
    WOND.stars = [];
    for (var i = 0; i < 24; i++){
      WOND.stars.push({ x: (i * 97 + 31) % WOND_W, y: 170 + ((i * 53 + 11) % (WOND_H - 190)) });
    }
  }

  function wondResetBall(){
    var b = WOND.ball, p = WOND.paddle;
    WOND.launched = false;
    b.x = p.x + p.w / 2;
    b.y = p.y - b.r - 1;
    b.vx = 0;
    b.vy = 0;
  }

  function wondLaunch(){
    if (!WOND.running || WOND.over || WOND.launched) return;
    var b = WOND.ball;
    var vx = WOND.speed * (Math.random() * 0.8 - 0.4);        // slight random tilt
    b.vx = vx;
    b.vy = -Math.sqrt(Math.max(1, WOND.speed * WOND.speed - vx * vx));
    WOND.launched = true;
  }

  // Rescale velocity to a new speed, keeping direction. Capped at WOND_MAX_SPEED.
  function wondSetSpeed(s){
    WOND.speed = Math.min(s, WOND_MAX_SPEED);
    var b = WOND.ball;
    var mag = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
    if (mag > 0){
      b.vx = b.vx / mag * WOND.speed;
      b.vy = b.vy / mag * WOND.speed;
    }
  }

  function wondCountHit(){
    WOND.hits++;
    if (WOND.hits % 8 === 0) wondSetSpeed(WOND.speed * 1.06); // "speeds up slightly every 8 hits"
  }

  // ---------- Tile Ball: input ----------
  function wondBindInput(){
    var canvas = WOND.canvas;
    // Pointer events cover mouse AND touch; CSS touch-action:none stops page scroll.
    var onPointerMove = function(e){
      var rect = canvas.getBoundingClientRect();
      if (!rect.width) return;
      var x = (e.clientX - rect.left) * (WOND_W / rect.width);
      WOND.paddle.x = wondClamp(x - WOND.paddle.w / 2, 0, WOND_W - WOND.paddle.w);
      if (!WOND.launched) WOND.ball.x = WOND.paddle.x + WOND.paddle.w / 2;
    };
    var onPointerDown = function(e){
      e.preventDefault();
      onPointerMove(e);
      wondLaunch();
    };
    var onKeyDown = function(e){
      if (e.key === 'ArrowLeft'){ WOND.keys.left = true; e.preventDefault(); }
      else if (e.key === 'ArrowRight'){ WOND.keys.right = true; e.preventDefault(); }
      else if (e.key === ' ' || e.key === 'Spacebar'){ wondLaunch(); e.preventDefault(); }
    };
    var onKeyUp = function(e){
      if (e.key === 'ArrowLeft') WOND.keys.left = false;
      else if (e.key === 'ArrowRight') WOND.keys.right = false;
    };
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    WOND.handlers = { canvas: canvas, move: onPointerMove, down: onPointerDown, kd: onKeyDown, ku: onKeyUp };
  }

  // ---------- Tile Ball: main loop ----------
  function wondLoop(ts){
    if (!WOND.running) return;
    WOND.raf = requestAnimationFrame(wondLoop);
    // Safety net: if another module stole the view without closeWonderland(),
    // kill the loop rather than simulate a game nobody can see.
    var view = document.getElementById('wonderlandView');
    if (!view || !view.classList.contains('active')){ stopTileBall(); return; }
    var step = 1;
    if (WOND.lastTs) step = Math.min((ts - WOND.lastTs) / (1000 / 60), 2.5);
    WOND.lastTs = ts;
    wondUpdate(step);
    if (WOND.running) wondDraw();
  }

  function wondUpdate(step){
    var p = WOND.paddle;
    var move = 7 * step;
    if (WOND.keys.left) p.x -= move;
    if (WOND.keys.right) p.x += move;
    p.x = wondClamp(p.x, 0, WOND_W - p.w);

    var b = WOND.ball;
    if (!WOND.launched){                       // ball rides the paddle until launch
      b.x = p.x + p.w / 2;
      b.y = p.y - b.r - 1;
      return;
    }
    // Substep so a fast ball can't tunnel through a tile between frames.
    var speedNow = Math.sqrt(b.vx * b.vx + b.vy * b.vy) || WOND.speed;
    var sub = Math.max(1, Math.ceil((speedNow * step) / 6));
    for (var i = 0; i < sub; i++){
      if (!WOND.running || WOND.over) return;
      wondStepBall(step / sub);
    }
  }

  function wondStepBall(s){
    var b = WOND.ball, p = WOND.paddle;
    b.x += b.vx * s;
    b.y += b.vy * s;

    // Walls
    if (b.x - b.r < 0){ b.x = b.r; b.vx = Math.abs(b.vx); }
    if (b.x + b.r > WOND_W){ b.x = WOND_W - b.r; b.vx = -Math.abs(b.vx); }
    if (b.y - b.r < 0){ b.y = b.r; b.vy = Math.abs(b.vy); }

    // Paddle: bounce angle depends on where the ball lands (edges = sharper angle)
    if (b.vy > 0 && b.y + b.r >= p.y && b.y + b.r <= p.y + p.h + 8 &&
        b.x >= p.x - b.r && b.x <= p.x + p.w + b.r){
      var rel = wondClamp((b.x - (p.x + p.w / 2)) / (p.w / 2), -1, 1);
      var ang = rel * 1.05;                    // max ~60° from vertical
      b.vx = WOND.speed * Math.sin(ang);
      b.vy = -Math.abs(WOND.speed * Math.cos(ang));
      b.y = p.y - b.r - 0.1;
      wondCountHit();
    }

    // Tiles (at most one break per substep)
    for (var i = 0; i < WOND.tiles.length; i++){
      var t = WOND.tiles[i];
      if (!t.alive) continue;
      if (b.x + b.r > t.x && b.x - b.r < t.x + t.w && b.y + b.r > t.y && b.y - b.r < t.y + t.h){
        t.alive = false;
        WOND.tilesLeft--;
        // Reflect on the axis we came from (previous position was outside that band)
        var py = b.y - b.vy * s;
        if (py <= t.y - b.r || py >= t.y + t.h + b.r) b.vy = -b.vy; else b.vx = -b.vx;
        if (typeof playSfx === 'function') playSfx('battle-hit');
        wondCountHit();
        wondUpdateHud();
        if (WOND.tilesLeft <= 0){ endTileBall(); return; }
        break;
      }
    }

    // Floor: lose a ball
    if (b.y - b.r > WOND_H){
      WOND.balls--;
      wondUpdateHud();
      if (typeof playSfx === 'function') playSfx('wrong');
      if (WOND.balls <= 0){ endTileBall(); return; }
      wondResetBall();
    }
  }

  // ---------- Tile Ball: rendering ----------
  function wondUpdateHud(){
    var hud = document.getElementById('wondHud');
    if (!hud) return;
    var destroyed = WOND.tilesTotal - WOND.tilesLeft;
    var f = WOND.tilesTotal > 0 ? destroyed / WOND.tilesTotal : 0;
    hud.innerHTML =
      '<span class="wond-chip">🧱 Tiles left: <b>' + WOND.tilesLeft + '</b></span>' +
      '<span class="wond-chip">⚾ Balls: <b>' + WOND.balls + '</b></span>' +
      '<span class="wond-chip">🎁 Prize now: <b>' + wondTierLabel(f) + '</b></span>';
  }

  // Rounded-rect fill without relying on ctx.roundRect (older browsers).
  function wondRoundRect(c, x, y, w, h, r, fill){
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
    c.fillStyle = fill;
    c.fill();
  }

  function wondDraw(){
    var c = WOND.ctx2d;
    if (!c) return;
    var cols = WOND.colors, p = WOND.paddle, b = WOND.ball;
    // Chalkboard-dark backdrop + faint star dots
    c.fillStyle = '#142a1f';
    c.fillRect(0, 0, WOND_W, WOND_H);
    c.fillStyle = 'rgba(244,241,232,0.18)';
    for (var i = 0; i < WOND.stars.length; i++){
      c.fillRect(WOND.stars[i].x, WOND.stars[i].y, 2, 2);
    }
    // Tiles
    for (var j = 0; j < WOND.tiles.length; j++){
      var t = WOND.tiles[j];
      if (t.alive) wondRoundRect(c, t.x, t.y, t.w, t.h, 4, t.color);
    }
    // Paddle + ball
    wondRoundRect(c, p.x, p.y, p.w, p.h, 6, cols.chalk);
    c.beginPath();
    c.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    c.fillStyle = cols.yellow;
    c.fill();
    // Launch hint
    if (!WOND.launched && !WOND.over){
      c.fillStyle = 'rgba(244,241,232,0.75)';
      c.font = '600 16px Quicksand, sans-serif';
      c.textAlign = 'center';
      c.fillText('Click, tap, or press Space to launch!', WOND_W / 2, WOND_H / 2 + 30);
    }
  }
