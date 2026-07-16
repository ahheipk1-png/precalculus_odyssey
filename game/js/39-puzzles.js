  // ============================================================================
  // Wonderland arcade — wave 2, part 1 (module 39)
  // Shared A2 shell + the grid/timing games:
  //   📦 Cargo Bay (Sokoban)          — push crates onto targets
  //   ❄️ Glacier Push (Shikinjou-ice) — crates SLIDE until they hit something
  //   🔗 Circuit Loop (tile connect)  — rotate tiles to light every bulb
  //   🗼 Sky Stacker (timing/stack)   — drop swinging blocks, build a tower
  // All are entered through wonderPlay() (1 Wonderland Pass) and pay a gold
  // chest of materials scaled by performance. Classic script, global scope.
  // ============================================================================

  var A2 = { raf: 0, timers: [], kd: null, ku: null };

  function a2StopAll(){
    if (A2.raf){ cancelAnimationFrame(A2.raf); A2.raf = 0; }
    for (var i = 0; i < A2.timers.length; i++){ clearTimeout(A2.timers[i]); clearInterval(A2.timers[i]); }
    A2.timers = [];
    if (A2.kd){ document.removeEventListener('keydown', A2.kd); A2.kd = null; }
    if (A2.ku){ document.removeEventListener('keyup', A2.ku); A2.ku = null; }
    if (typeof a2DragCancel === 'function') a2DragCancel();
  }
  function a2Later(fn, ms){ var id = setTimeout(fn, ms); A2.timers.push(id); return id; }
  function a2Every(fn, ms){ var id = setInterval(fn, ms); A2.timers.push(id); return id; }
  function a2Keys(kd, ku){
    if (A2.kd) document.removeEventListener('keydown', A2.kd);
    if (A2.ku) document.removeEventListener('keyup', A2.ku);
    A2.kd = kd || null; A2.ku = ku || null;
    if (kd) document.addEventListener('keydown', kd);
    if (ku) document.addEventListener('keyup', ku);
  }
  function a2View(){ return document.getElementById('wonderlandView'); }
  function a2Active(){ var v = a2View(); return !!(v && v.classList.contains('active')); }

  // Small "⌨️ Controls: …" badge so keyboard shortcuts are always visible near the HUD.
  function a2KeyLegend(text){ return '<div class="a2-keylegend">⌨️ ' + text + '</div>'; }

  // ---- Shared POINTER-based drag-and-drop --------------------------------------------------
  // Native HTML5 draggable/ondragstart/ondrop does NOT fire on touch devices — that's why
  // pieces felt "not draggable" before. Pointer events unify mouse, touch and pen, so this
  // works everywhere. One drag at a time; onDrop(el, payload) receives the element under the
  // pointer at release (matched via [data-dropzone]) and whatever payload a2DragStart was given.
  var A2_DRAG = { ghost: null, payload: null, onDrop: null };
  function a2DragStart(e, payload, ghostHtml, onDrop){
    if (e.cancelable) e.preventDefault();
    a2DragCancel();
    var g = document.createElement('div');
    g.className = 'a2-drag-ghost';
    g.innerHTML = ghostHtml;
    document.body.appendChild(g);
    A2_DRAG.ghost = g; A2_DRAG.payload = payload; A2_DRAG.onDrop = onDrop;
    _a2DragMove(e);
    document.addEventListener('pointermove', _a2DragMove);
    document.addEventListener('pointerup', _a2DragEnd);
    document.addEventListener('pointercancel', _a2DragEnd);
  }
  function _a2DragMove(e){
    if (!A2_DRAG.ghost) return;
    A2_DRAG.ghost.style.left = e.clientX + 'px';
    A2_DRAG.ghost.style.top = e.clientY + 'px';
    var el = document.elementFromPoint(e.clientX, e.clientY);
    var dz = el && el.closest ? el.closest('[data-dropzone]') : null;
    var prev = document.querySelector('.a2-drop-hover');
    if (prev && prev !== dz) prev.classList.remove('a2-drop-hover');
    if (dz) dz.classList.add('a2-drop-hover');
  }
  function _a2DragEnd(e){
    document.removeEventListener('pointermove', _a2DragMove);
    document.removeEventListener('pointerup', _a2DragEnd);
    document.removeEventListener('pointercancel', _a2DragEnd);
    var el = document.elementFromPoint(e.clientX, e.clientY);
    var dz = el && el.closest ? el.closest('[data-dropzone]') : null;
    var payload = A2_DRAG.payload, onDrop = A2_DRAG.onDrop;
    a2DragCancel();
    if (dz && onDrop) onDrop(dz, payload);
  }
  function a2DragCancel(){
    if (A2_DRAG.ghost && A2_DRAG.ghost.parentNode) A2_DRAG.ghost.parentNode.removeChild(A2_DRAG.ghost);
    A2_DRAG.ghost = null;
    var prev = document.querySelector('.a2-drop-hover'); if (prev) prev.classList.remove('a2-drop-hover');
    A2_DRAG.payload = null; A2_DRAG.onDrop = null;
    document.removeEventListener('pointermove', _a2DragMove);
    document.removeEventListener('pointerup', _a2DragEnd);
    document.removeEventListener('pointercancel', _a2DragEnd);
  }

  // Standard game screen: topbar + body (+ tip line).
  function a2Shell(title, quitFn, bodyHtml, tip){
    if (typeof wgStopAll === 'function') wgStopAll();
    var v = a2View(); if (!v) return null;
    document.querySelectorAll('.view-container').forEach(function(x){ x.classList.remove('active'); });
    v.classList.add('active');
    v.innerHTML = '<div class="wond-board wond-game">' +
      (typeof agTopBar === 'function' ? agTopBar(title, quitFn) : '') +
      bodyHtml +
      (tip ? '<p class="wond-tip">' + tip + '</p>' : '') +
    '</div>';
    return v;
  }

  // Pay out for a finished run. frac 0..1 = performance; >=0.5 opens the gold chest overlay.
  function a2Reward(frac){
    frac = Math.max(0, Math.min(1, frac || 0));
    var loot = { gold: Math.round(1 + 3 * frac), silver: Math.round(2 + 4 * frac),
                 chips: (frac >= 0.99) ? { cpu: 1, energy_core: 2 } : { energy_core: 1 } };
    var cash = Math.round(20 + 80 * frac);
    if (typeof state === 'object' && state) state.coins = (state.coins || 0) + cash;
    if (typeof addMaterials === 'function') addMaterials(loot);
    if (typeof updateStats === 'function') updateStats();
    if (typeof saveGame === 'function') saveGame();
    if (frac >= 0.5 && typeof showVictoryChest === 'function') showVictoryChest(loot, cash);
    else if (typeof showToast === 'function') showToast('🎁 Prize: 💵' + cash + ' + materials — win for the gold chest!');
    return { loot: loot, cash: cash };
  }

  // Standard result screen. replayName = global launcher name (charged via wonderPlay).
  function a2Result(title, headline, detailHtml, frac, replayName){
    a2StopAll();
    var v = a2View(); if (!v) return;
    v.innerHTML = '<div class="wond-board">' +
      '<div class="wond-head"><h2 class="wond-title">' + headline + '</h2>' +
      '<p class="wond-sub">' + title + '</p></div>' +
      '<div class="wond-result-card"><div class="wond-result-label">' + detailHtml + '</div></div>' +
      '<div class="wond-footer">' +
        '<button type="button" class="btn btn-primary" onclick="wonderPlay(\'' + replayName + '\')">↻ Play again (1 🎟️)</button>' +
        '<button type="button" class="btn btn-ghost" onclick="openWonderland()">← Lobby</button>' +
      '</div></div>';
    a2Reward(frac);
  }

  // ===========================================================================
  // 📦 Cargo Bay & ❄️ Glacier Push — one Sokoban engine, two movement rules.
  //   # wall · o target · $ crate · @ player  (levels are small & hand-checked)
  // ===========================================================================
  var CARGO_LEVELS = [
    ['#######',
     '#.....#',
     '#.o$@.#',
     '#.....#',
     '#######'],
    ['#######',
     '#o....#',
     '#.#$..#',
     '#.#.@.#',
     '#.....#',
     '#######'],
    ['########',
     '#o..o..#',
     '#.$..$.#',
     '#..@...#',
     '#......#',
     '########']
  ];
  var GLACIER_LEVELS = [
    ['#######',
     '#o....#',
     '#.....#',
     '#..$..#',
     '#..@..#',
     '#######'],
    ['########',
     '#.#....#',
     '#.o....#',
     '#......#',
     '#.$....#',
     '#.@....#',
     '########'],
    ['########',
     '#..#...#',
     '#..o...#',
     '#......#',
     '#..$.@.#',
     '#......#',
     '########']
  ];

  var SOKO = { title: '', replay: '', slide: false, levels: [], idx: 0,
    walls: {}, targets: {}, crates: {}, px: 0, py: 0, W: 0, H: 0, moves: 0, done: false };

  function _skParse(rows){
    SOKO.walls = {}; SOKO.targets = {}; SOKO.crates = {};
    SOKO.H = rows.length; SOKO.W = rows[0].length; SOKO.moves = 0; SOKO.done = false;
    for (var y = 0; y < rows.length; y++){
      for (var x = 0; x < rows[y].length; x++){
        var c = rows[y].charAt(x), k = x + ',' + y;
        if (c === '#') SOKO.walls[k] = 1;
        if (c === 'o' || c === '*' || c === '+') SOKO.targets[k] = 1;
        if (c === '$' || c === '*') SOKO.crates[k] = 1;
        if (c === '@' || c === '+'){ SOKO.px = x; SOKO.py = y; }
      }
    }
  }

  function _skGridHtml(){
    var h = '<div class="a2-grid" style="grid-template-columns:repeat(' + SOKO.W + ',56px)">';
    for (var y = 0; y < SOKO.H; y++){
      for (var x = 0; x < SOKO.W; x++){
        var k = x + ',' + y, cls = 'a2-cell', body = '';
        if (SOKO.walls[k]) cls += ' a2-wall';
        else if (SOKO.targets[k]) cls += ' a2-target';
        if (SOKO.crates[k]) body = '<span class="a2-emoji' + (SOKO.targets[k] ? ' a2-glow' : '') + '">' + (SOKO.slide ? '🧊' : '📦') + '</span>';
        if (x === SOKO.px && y === SOKO.py) body = '<span class="a2-emoji">🤖</span>';
        h += '<div class="' + cls + '">' + body + '</div>';
      }
    }
    return h + '</div>';
  }

  function _skSolved(){ for (var k in SOKO.targets){ if (!SOKO.crates[k]) return false; } return true; }

  function _skRender(){
    var g = document.getElementById('skWrap'); if (!g) return;
    g.innerHTML = _skGridHtml();
    var hud = document.getElementById('skHud');
    if (hud) hud.innerHTML = '<span class="wond-chip">🗺️ Level <b>' + (SOKO.idx + 1) + ' / ' + SOKO.levels.length + '</b></span>' +
      '<span class="wond-chip">👣 Moves: <b>' + SOKO.moves + '</b></span>';
  }

  function sokoMove(dx, dy){
    if (SOKO.done || !a2Active()) return;
    var nx = SOKO.px + dx, ny = SOKO.py + dy, nk = nx + ',' + ny;
    if (SOKO.walls[nk]) return;
    if (SOKO.crates[nk]){
      var cx = nx, cy = ny;
      if (SOKO.slide){          // ice: the crate glides until it hits a wall or another crate
        while (true){
          var tx = cx + dx, ty = cy + dy, tk = tx + ',' + ty;
          if (SOKO.walls[tk] || SOKO.crates[tk]) break;
          cx = tx; cy = ty;
        }
        if (cx === nx && cy === ny) return;         // blocked flush — can't push
      } else {                  // classic: the crate moves one square
        cx = nx + dx; cy = ny + dy;
        var bk = cx + ',' + cy;
        if (SOKO.walls[bk] || SOKO.crates[bk]) return;
      }
      delete SOKO.crates[nk];
      SOKO.crates[cx + ',' + cy] = 1;
    }
    SOKO.px = nx; SOKO.py = ny; SOKO.moves++;
    if (typeof playSfx === 'function') playSfx('click');
    _skRender();
    if (_skSolved()){
      SOKO.done = true;
      if (typeof playSfx === 'function') playSfx('correct');
      if (SOKO.idx + 1 < SOKO.levels.length){
        if (typeof showToast === 'function') showToast('✅ Level ' + (SOKO.idx + 1) + ' clear!');
        a2Later(function(){ SOKO.idx++; _skLevel(); }, 800);
      } else {
        a2Later(function(){
          a2Result(SOKO.title, '🌟 ALL LEVELS CLEAR! 🌟',
            'You solved every puzzle in ' + SOKO.moves + ' moves this level. Brilliant pushing!',
            1, SOKO.replay);
        }, 800);
      }
    }
  }
  function sokoRestart(){ _skParse(SOKO.levels[SOKO.idx]); _skRender(); }

  function _skLevel(){
    _skParse(SOKO.levels[SOKO.idx]);
    var v = a2Shell(SOKO.title, 'openWonderland()',
      '<div class="wond-hud" id="skHud"></div>' + a2KeyLegend('Arrow keys or WASD move · R restart') +
      '<div class="a2-center" id="skWrap"></div>' +
      '<div class="a2-pad">' +
        '<button type="button" class="btn btn-secondary" onclick="sokoMove(0,-1)">▲</button>' +
        '<div><button type="button" class="btn btn-secondary" onclick="sokoMove(-1,0)">◀</button>' +
        '<button type="button" class="btn btn-secondary" onclick="sokoMove(0,1)">▼</button>' +
        '<button type="button" class="btn btn-secondary" onclick="sokoMove(1,0)">▶</button></div>' +
        '<button type="button" class="btn btn-ghost" onclick="sokoRestart()">↺ Restart level</button>' +
      '</div>',
      SOKO.slide ? 'Push the 🧊 ice — it SLIDES until it hits something! Park one on every ring.'
                 : 'Push every 📦 crate onto a ring. You can push, never pull!');
    if (!v) return;
    _skRender();
    a2Keys(function(e){
      var m = { ArrowUp: [0,-1], ArrowDown: [0,1], ArrowLeft: [-1,0], ArrowRight: [1,0],
                w: [0,-1], s: [0,1], a: [-1,0], d: [1,0] }[e.key];
      if (m){ e.preventDefault(); sokoMove(m[0], m[1]); }
      else if (e.key === 'r' || e.key === 'R') sokoRestart();
    });
  }

  function openCargo(){ SOKO.title = '📦 Cargo Bay'; SOKO.replay = 'openCargo'; SOKO.slide = false; SOKO.levels = CARGO_LEVELS; SOKO.idx = 0; _skLevel(); }
  function openGlacier(){ SOKO.title = '❄️ Glacier Push'; SOKO.replay = 'openGlacier'; SOKO.slide = true; SOKO.levels = GLACIER_LEVELS; SOKO.idx = 0; _skLevel(); }

  // ===========================================================================
  // 🔗 Circuit Loop — rotate wire tiles until the ⚡ core lights every 💡 bulb.
  // Board is a random spanning tree, then scrambled; dirs bitmask N1 E2 S4 W8.
  // ===========================================================================
  var CIRC = { N: 5, dirs: [], src: 12, moves: 0, done: false };
  var _CIRC_D = [ [0,-1,1,4], [1,0,2,8], [0,1,4,1], [-1,0,8,2] ];  // dx,dy,bit,oppositeBit

  function _circGen(){
    var N = CIRC.N, total = N * N;
    CIRC.dirs = []; for (var i = 0; i < total; i++) CIRC.dirs.push(0);
    CIRC.src = Math.floor(total / 2);
    var seen = {}; seen[CIRC.src] = 1;
    var stack = [CIRC.src];
    while (stack.length){
      var cur = stack[stack.length - 1];
      var cx = cur % N, cy = Math.floor(cur / N);
      var opts = [];
      for (var d = 0; d < 4; d++){
        var nx = cx + _CIRC_D[d][0], ny = cy + _CIRC_D[d][1];
        if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
        var ni = ny * N + nx;
        if (!seen[ni]) opts.push([d, ni]);
      }
      if (!opts.length){ stack.pop(); continue; }
      var pick = opts[rand(0, opts.length - 1)];
      CIRC.dirs[cur] |= _CIRC_D[pick[0]][2];
      CIRC.dirs[pick[1]] |= _CIRC_D[pick[0]][3];
      seen[pick[1]] = 1;
      stack.push(pick[1]);
    }
    // scramble (and make sure it isn't accidentally already solved)
    for (var s = 0; s < total; s++){ var r = rand(0, 3); for (var t = 0; t < r; t++) CIRC.dirs[s] = _circRot(CIRC.dirs[s]); }
    if (_circAllLit()) CIRC.dirs[0] = _circRot(CIRC.dirs[0]);
    CIRC.moves = 0; CIRC.done = false;
  }
  function _circRot(m){ return ((m << 1) & 15) | ((m & 8) ? 1 : 0); }

  function _circLitSet(){
    var N = CIRC.N, lit = {}, q = [CIRC.src]; lit[CIRC.src] = 1;
    while (q.length){
      var cur = q.shift(), cx = cur % N, cy = Math.floor(cur / N);
      for (var d = 0; d < 4; d++){
        if (!(CIRC.dirs[cur] & _CIRC_D[d][2])) continue;
        var nx = cx + _CIRC_D[d][0], ny = cy + _CIRC_D[d][1];
        if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
        var ni = ny * N + nx;
        if (!lit[ni] && (CIRC.dirs[ni] & _CIRC_D[d][3])){ lit[ni] = 1; q.push(ni); }
      }
    }
    return lit;
  }
  function _circAllLit(){ var lit = _circLitSet(); for (var i = 0; i < CIRC.N * CIRC.N; i++){ if (!lit[i]) return false; } return true; }

  function _circTileSvg(mask, isSrc, isBulb, lit){
    var col = lit ? '#ffd75e' : '#5a6c84';
    var s = '<svg viewBox="0 0 64 64" width="68" height="68">';
    if (mask & 1) s += '<line x1="32" y1="32" x2="32" y2="0" stroke="' + col + '" stroke-width="9" stroke-linecap="round"/>';
    if (mask & 2) s += '<line x1="32" y1="32" x2="64" y2="32" stroke="' + col + '" stroke-width="9" stroke-linecap="round"/>';
    if (mask & 4) s += '<line x1="32" y1="32" x2="32" y2="64" stroke="' + col + '" stroke-width="9" stroke-linecap="round"/>';
    if (mask & 8) s += '<line x1="32" y1="32" x2="0" y2="32" stroke="' + col + '" stroke-width="9" stroke-linecap="round"/>';
    if (isSrc) s += '<circle cx="32" cy="32" r="14" fill="#ffb300"/><text x="32" y="40" font-size="22" text-anchor="middle">⚡</text>';
    else if (isBulb) s += '<circle cx="32" cy="32" r="12" fill="' + (lit ? '#fff3b0' : '#2c3a4e') + '" stroke="' + col + '" stroke-width="4"/>';
    else s += '<circle cx="32" cy="32" r="6" fill="' + col + '"/>';
    return s + '</svg>';
  }

  function _circRender(){
    var g = document.getElementById('circWrap'); if (!g) return;
    var N = CIRC.N, lit = _circLitSet();
    var h = '<div class="a2-grid" style="grid-template-columns:repeat(' + N + ',72px)">';
    for (var i = 0; i < N * N; i++){
      var deg = 0; for (var d = 0; d < 4; d++){ if (CIRC.dirs[i] & _CIRC_D[d][2]) deg++; }
      h += '<button type="button" class="a2-cell a2-circ' + (lit[i] ? ' a2-lit' : '') + '" onclick="circRotate(' + i + ')">' +
        _circTileSvg(CIRC.dirs[i], i === CIRC.src, deg === 1, !!lit[i]) + '</button>';
    }
    g.innerHTML = h + '</div>';
    var hud = document.getElementById('circHud');
    var litCount = 0; for (var k in lit) litCount++;
    if (hud) hud.innerHTML = '<span class="wond-chip">💡 Lit: <b>' + litCount + ' / ' + (N * N) + '</b></span>' +
      '<span class="wond-chip">🔄 Turns: <b>' + CIRC.moves + '</b></span>';
  }

  function circRotate(i){
    if (CIRC.done || !a2Active()) return;
    CIRC.dirs[i] = _circRot(CIRC.dirs[i]);
    CIRC.moves++;
    if (typeof playSfx === 'function') playSfx('click');
    _circRender();
    if (_circAllLit()){
      CIRC.done = true;
      if (typeof playSfx === 'function') playSfx('victory');
      a2Later(function(){
        a2Result('🔗 Circuit Loop', '⚡ FULL POWER! ⚡',
          'Every bulb lit in ' + CIRC.moves + ' turns. The station hums back to life!',
          1, 'openCircuit');
      }, 700);
    }
  }

  function openCircuit(){
    _circGen();
    a2Shell('🔗 Circuit Loop', 'openWonderland()',
      '<div class="wond-hud" id="circHud"></div><div class="a2-center" id="circWrap"></div>',
      'Tap a tile to rotate it. Connect the wires so the ⚡ core lights EVERY bulb!');
    _circRender();
  }

  // ===========================================================================
  // 🗼 Sky Stacker — a block swings; drop it on the tower. Overhang is sliced off!
  // Levels vary the STARTING BLOCK WIDTH (narrower = harder to line up) and the
  // swing SPEED (faster = less time to react) — always unlocked, pick any level.
  // ===========================================================================
  var STK_LEVELS = [
    { name: 'Foundation',      startW: 170, speed: 0.85 },
    { name: 'Midrise',         startW: 140, speed: 1.05 },
    { name: 'Highrise',        startW: 110, speed: 1.30 },
    { name: 'Skyscraper',      startW: 85,  speed: 1.60 },
    { name: 'Space Elevator',  startW: 62,  speed: 2.00 }
  ];
  var STK = { W: 420, H: 580, blocks: [], cur: null, t: 0, speed: 1, floors: 0, over: false, flash: 0, levelIdx: 0, maxW: 170 };

  function openStacker(){
    a2StopAll();
    var view = a2View(); if (!view) return;
    var passes = (typeof state === 'object' && state) ? (state.wonderPasses || 0) : 0;
    var cards = STK_LEVELS.map(function(lv, i){
      return '<div class="wond-lvl-card">' +
        '<div class="wond-lvl-num">Level ' + (i + 1) + '</div>' +
        '<div class="wond-lvl-name">' + lv.name + '</div>' +
        '<div class="wond-lvl-meta">Block width ' + lv.startW + 'px · swing ×' + lv.speed.toFixed(2) + '</div>' +
        '<button type="button" class="btn btn-primary wond-lvl-play" onclick="stkStart(' + i + ')" data-tooltip="Costs 1 Wonderland Pass.">Play (1 🎟️)</button>' +
      '</div>';
    }).join('');
    view.innerHTML = '<div class="wond-board">' +
      (typeof agTopBar === 'function' ? agTopBar('🗼 Sky Stacker — Choose a Level', 'openWonderland()') : '') +
      '<p class="wond-sub" style="text-align:center;margin:0 0 4px">Narrower blocks + faster swings at higher levels. Line up the drop — the overhang gets sliced off!</p>' +
      '<p class="wond-sub" style="text-align:center;margin:0 0 12px">🎟️ Passes: <b>' + passes + '</b></p>' +
      '<div class="wond-lvl-grid">' + cards + '</div>' +
      '<div class="wond-footer"><button type="button" class="btn btn-ghost" onclick="openWonderland()">← Lobby</button></div>' +
    '</div>';
  }

  function stkStart(levelIdx){
    if (typeof wonderSpendPass === 'function' && !wonderSpendPass()) return;
    var lv = STK_LEVELS[levelIdx] || STK_LEVELS[0];
    STK.levelIdx = levelIdx; STK.maxW = lv.startW;
    STK.blocks = [{ x: (STK.W - lv.startW) / 2, w: lv.startW }];
    STK.cur = { x: 20, w: lv.startW };
    STK.t = 0; STK.speed = lv.speed; STK.floors = 0; STK.over = false; STK.flash = 0;
    a2Shell('🗼 Sky Stacker — ' + lv.name, 'openStacker()',
      '<div class="wond-hud" id="stkHud"></div>' + a2KeyLegend('Space or ⬆️ to drop') +
      '<div class="wond-canvas-wrap"><canvas id="stkCanvas" class="a2-canvas" width="' + STK.W + '" height="' + STK.H + '"></canvas></div>',
      'Click, tap, or press Space to drop the block. Line it up — the overhang gets sliced off!');
    var cv = document.getElementById('stkCanvas');
    if (cv) cv.addEventListener('pointerdown', function(e){ e.preventDefault(); stkDrop(); });
    a2Keys(function(e){ if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'ArrowUp'){ e.preventDefault(); stkDrop(); } });
    _stkHud();
    A2.raf = requestAnimationFrame(_stkLoop);
  }

  function _stkHud(){
    var hud = document.getElementById('stkHud');
    if (hud) hud.innerHTML = '<span class="wond-chip">🏗️ Floors: <b>' + STK.floors + '</b></span>' +
      '<span class="wond-chip">🎚️ Level ' + (STK.levelIdx + 1) + '</span>' +
      '<span class="wond-chip">🎁 Prize grows with height!</span>';
  }

  function stkDrop(){
    if (STK.over || !STK.cur) return;
    var below = STK.blocks[STK.blocks.length - 1];
    var left = Math.max(STK.cur.x, below.x);
    var right = Math.min(STK.cur.x + STK.cur.w, below.x + below.w);
    var overlap = right - left;
    if (overlap <= 6){
      STK.over = true;
      if (typeof playSfx === 'function') playSfx('wrong');
      a2Later(_stkGameOver, 600);
      return;
    }
    var perfect = Math.abs(STK.cur.x - below.x) < 5;
    var newW = perfect ? Math.min(STK.maxW, below.w + 6) : overlap;
    var newX = perfect ? below.x : left;
    STK.blocks.push({ x: newX, w: newW });
    STK.floors++;
    STK.speed *= 1.045;                 // faster and faster the taller the tower gets
    STK.flash = perfect ? 12 : 0;
    STK.cur = { x: 20, w: newW };
    STK.t = 0;
    if (typeof playSfx === 'function') playSfx(perfect ? 'correct' : 'click');
    _stkHud();
  }

  // Custom result screen (not the generic a2Result) — retry needs to pass the level index, and
  // stkStart() already charges its own pass, so the replay button must NOT also go through
  // wonderPlay() (that would double-charge).
  function _stkGameOver(){
    a2StopAll();
    var lv = STK_LEVELS[STK.levelIdx] || STK_LEVELS[0];
    var frac = Math.min(1, STK.floors / 14);
    var headline = STK.floors >= 12 ? '🌟 SKY-SCRAPER! 🌟' : '🏗️ Tower toppled!';
    var view = a2View(); if (!view) return;
    view.innerHTML = '<div class="wond-board">' +
      '<div class="wond-head"><h2 class="wond-title">' + headline + '</h2>' +
        '<p class="wond-sub">Level ' + (STK.levelIdx + 1) + ' · ' + lv.name + ' — stacked <b>' + STK.floors + '</b> floors' +
        (STK.floors >= 12 ? ' — amazing!' : '. 12+ floors = grand prize!') + '</p></div>' +
      '<div class="wond-result-card"><div class="wond-result-label">Your prizes</div><div class="wond-prizes" id="stkPrizes"></div></div>' +
      '<div class="wond-footer">' +
        '<button type="button" class="btn btn-primary" onclick="stkStart(' + STK.levelIdx + ')" data-tooltip="Costs 1 Wonderland Pass.">↻ Retry this level (1 🎟️)</button>' +
        '<button type="button" class="btn btn-ghost" onclick="openStacker()">🎚️ Level Select</button>' +
        '<button type="button" class="btn btn-ghost" onclick="openWonderland()">← Lobby</button>' +
      '</div></div>';
    var r = a2Reward(frac);
    var prizesEl = document.getElementById('stkPrizes');
    if (prizesEl && typeof chipsSummary === 'function'){
      prizesEl.innerHTML = '<span class="wond-chip wond-prize-chip">💵 Cash ×' + r.cash + '</span>' +
        '<span class="wond-chip wond-prize-chip">' + chipsSummary(r.loot.chips || {}) +
        (r.loot.gold ? ' 🥇' + r.loot.gold : '') + (r.loot.silver ? ' 🥈' + r.loot.silver : '') + '</span>';
    }
  }

  function _stkLoop(ts){
    if (!a2Active()){ a2StopAll(); return; }
    A2.raf = requestAnimationFrame(_stkLoop);
    var cv = document.getElementById('stkCanvas'); if (!cv) return;
    var c = cv.getContext('2d');
    STK.t += 0.03 * STK.speed;
    if (STK.cur && !STK.over){
      var range = (STK.W - STK.cur.w) / 2 - 8;
      STK.cur.x = (STK.W - STK.cur.w) / 2 + Math.sin(STK.t) * range;
    }
    // draw
    c.fillStyle = '#0b1626'; c.fillRect(0, 0, STK.W, STK.H);
    c.fillStyle = 'rgba(244,241,232,0.25)';
    for (var s = 0; s < 26; s++) c.fillRect((s * 97 + 31) % STK.W, (s * 53 + 11) % STK.H, 2, 2);
    var offY = Math.max(0, (STK.blocks.length - 10) * 30);
    var cols = ['#66e0ff', '#f2c14e', '#f0705e', '#7bd88f', '#c39bff'];
    for (var i = 0; i < STK.blocks.length; i++){
      var b = STK.blocks[i], y = STK.H - 40 - i * 30 + offY;
      if (y > STK.H || y < -40) continue;
      c.fillStyle = cols[i % cols.length];
      c.fillRect(b.x, y, b.w, 26);
      c.fillStyle = 'rgba(0,0,0,0.18)'; c.fillRect(b.x, y + 20, b.w, 6);
    }
    if (STK.cur && !STK.over){
      var cy = STK.H - 40 - STK.blocks.length * 30 + offY;
      c.fillStyle = STK.flash > 0 ? '#ffffff' : cols[STK.blocks.length % cols.length];
      c.fillRect(STK.cur.x, cy, STK.cur.w, 26);
      if (STK.flash > 0) STK.flash--;
    }
  }
