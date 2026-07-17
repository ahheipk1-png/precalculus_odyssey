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
  // `replayName` is that game's own FREE welcome-screen opener (gameWelcome-based) — calling it
  // directly (not through wonderPlay) means "Play Again" never double-charges; the pass is only
  // spent when the player clicks Play on the welcome screen itself. Every a2Result caller's
  // openX() must be a welcome screen for this to be correct — see docs/world-and-hubs.md.
  function a2Result(title, headline, detailHtml, frac, replayName){
    a2StopAll();
    var v = a2View(); if (!v) return;
    v.innerHTML = '<div class="wond-board">' +
      '<div class="wond-head"><h2 class="wond-title">' + headline + '</h2>' +
      '<p class="wond-sub">' + title + '</p></div>' +
      '<div class="wond-result-card"><div class="wond-result-label">' + detailHtml + '</div></div>' +
      '<div class="wond-footer">' +
        '<button type="button" class="btn btn-primary" onclick="' + replayName + '()">↻ Play Again</button>' +
        '<button type="button" class="btn btn-ghost" onclick="openWonderland()">← Lobby</button>' +
      '</div></div>';
    a2Reward(frac);
  }

  // ===========================================================================
  // 📦 Cargo Bay & ❄️ Glacier Push — one Sokoban engine, two movement rules.
  //   # wall · o target · $ crate · @ player  (levels are small & hand-checked)
  // ===========================================================================
  var CARGO_LEVELS = [
    // 1 — three crates, push them down onto the rings.
    ['#######',
     '#.@...#',
     '#.$$$.#',
     '#.ooo.#',
     '#.....#',
     '#######'],
    // 2 — three crates, push up (reposition between each).
    ['#######',
     '#.ooo.#',
     '#.$$$.#',
     '#..@..#',
     '#.....#',
     '#######'],
    // 3 — four crates at the corners.
    ['########',
     '#o....o#',
     '#$....$#',
     '#..@...#',
     '#$....$#',
     '#o....o#',
     '########'],
    // 4 — three crates up a walled aisle (two pushes each).
    ['########',
     '#o.o.o.#',
     '#.#.#..#',
     '#$.$.$.#',
     '#..@...#',
     '#......#',
     '########'],
    // 5 — five crates, split top-and-bottom.
    ['########',
     '#.ooo..#',
     '#.$$$..#',
     '#..@...#',
     '#.$$...#',
     '#.oo...#',
     '########'],
    // 6 — four crates, converge from the corners.
    ['########',
     '#.o..o.#',
     '#.$..$.#',
     '#......#',
     '#.$..$.#',
     '#.o..o.#',
     '#..@...#',
     '########'],
    // 7 — five in a row.
    ['#########',
     '#.ooooo.#',
     '#.$$$$$.#',
     '#...@...#',
     '#.......#',
     '#########'],
    // 8 — the depot: five crates, mixed directions.
    ['#########',
     '#o..o..o#',
     '#$..$..$#',
     '#...@...#',
     '#.$...$.#',
     '#.o...o.#',
     '#########']
  ];
  // Ice-slide levels — a crate GLIDES until it hits a wall or another crate, so a target must
  // sit against a backstop. Every level below is BFS-verified solvable (easy → hard).
  // Safety net ONLY — used if the procedural generator below ever fails to find a solvable level
  // within its attempt budget (shouldn't happen, but a player must never hit a broken puzzle).
  var GLACIER_FALLBACK_LEVELS = [
    // 1 — slide the crate into the far wall so it stops on the ring.
    ['#######',
     '#.$..o#',
     '#.....#',
     '#.....#',
     '#..@..#',
     '#######'],
    // 2 — bounce it into the corner (two glides).
    ['#######',
     '#....o#',
     '#.....#',
     '#.$...#',
     '#.@...#',
     '#######'],
    // 3 — two crates, opposite corners.
    ['#######',
     '#o...o#',
     '#.....#',
     '#.$.$.#',
     '#..@..#',
     '#######'],
    // 4 — two crates, top rings.
    ['########',
     '#o....o#',
     '#.$..$.#',
     '#......#',
     '#......#',
     '#..@...#',
     '########'],
    // 5 — two crates, a wider rink.
    ['########',
     '#o....o#',
     '#......#',
     '#.$..$.#',
     '#......#',
     '#..@...#',
     '########'],
    // 6 — three crates straight up.
    ['########',
     '#o.o.o.#',
     '#......#',
     '#$.$.$.#',
     '#......#',
     '#..@...#',
     '########'],
    // 7 — three crates, staggered rings.
    ['#########',
     '#o..o..o#',
     '#.......#',
     '#.$.$.$.#',
     '#.......#',
     '#...@...#',
     '#########'],
    // 8 — the freezer: four crates, four corners.
    ['########',
     '#o....o#',
     '#......#',
     '#.$..$.#',
     '#.$..$.#',
     '#......#',
     '#o.@..o#',
     '########']
  ];

  // ===========================================================================
  // Glacier Push level GENERATOR — hand-authored levels get repetitive on replay,
  // so every session builds a fresh set of 8 ice-slide puzzles: a non-rectangular
  // playable region (randomly carved out of a rectangle, always kept connected),
  // a few internal wall obstacles, then crates + targets on random floor cells.
  // Every generated level is BFS-verified solvable (using the SAME ice-slide push
  // rule as the real game) before the player ever sees it; a level that fails to
  // generate within its attempt budget falls back to a hand-authored one instead
  // of ever handing the player a broken puzzle.
  // ===========================================================================
  // Difficulty rises mainly through CRATE COUNT (the real driver of puzzle difficulty); carve
  // count is kept modest (2-5) so the region stays irregular WITHOUT tanking the solver's hit
  // rate — an aggressively-carved maze with 3-4 crates is often unsolvable by pure random
  // placement, which meant those slots kept exhausting their attempt budget and silently
  // falling back to the plain rectangular hand-authored level (defeating the point).
  // 10-tier difficulty ramp (was 8, gentler). Slide levels are BFS-verified at generation time, and
  // 4-crate ice states blow up fast, so crates are capped at 4 and scramble at 12 to keep generation
  // snappy (a rejected candidate must bail quickly); the ramp grows board size + scramble depth.
  var GLACIER_DIFFS = [
    { W: 7,  H: 6,  carves: 2, crates: 2, scramble: 3 },
    { W: 7,  H: 7,  carves: 3, crates: 2, scramble: 4 },
    { W: 8,  H: 7,  carves: 3, crates: 2, scramble: 6 },
    { W: 8,  H: 8,  carves: 3, crates: 3, scramble: 6 },
    { W: 9,  H: 8,  carves: 4, crates: 3, scramble: 8 },
    { W: 9,  H: 8,  carves: 4, crates: 3, scramble: 9 },
    { W: 9,  H: 9,  carves: 5, crates: 3, scramble: 10 },
    { W: 10, H: 9,  carves: 5, crates: 3, scramble: 11 },
    { W: 10, H: 9,  carves: 6, crates: 3, scramble: 12 },
    { W: 10, H: 10, carves: 6, crates: 3, scramble: 13 }
  ];
  // Classic PUSH Sokoban (Cargo Bay) difficulty ramp — deeper reverse-pull scrambles than Glacier
  // (push demands exact positioning, so depth is the main lever) and up to 6 crates on the big boards.
  var CARGO_DIFFS = [
    { W: 7,  H: 6,  carves: 1, crates: 2, scramble: 5 },
    { W: 7,  H: 7,  carves: 2, crates: 2, scramble: 7 },
    { W: 8,  H: 7,  carves: 2, crates: 3, scramble: 9 },
    { W: 8,  H: 8,  carves: 3, crates: 3, scramble: 12 },
    { W: 9,  H: 8,  carves: 3, crates: 4, scramble: 15 },
    { W: 9,  H: 8,  carves: 4, crates: 4, scramble: 18 },
    { W: 10, H: 9,  carves: 4, crates: 5, scramble: 21 },
    { W: 10, H: 9,  carves: 5, crates: 5, scramble: 24 },
    { W: 11, H: 9,  carves: 5, crates: 6, scramble: 28 },
    { W: 11, H: 10, carves: 6, crates: 6, scramble: 32 }
  ];

  function _glFloorCount(grid, W, H){ var n = 0; for (var y = 0; y < H; y++) for (var x = 0; x < W; x++) if (grid[y][x]) n++; return n; }

  // Flood-fill from the first floor cell; the region is connected iff every floor cell was reached.
  function _glConnected(grid, W, H){
    var start = null;
    for (var y = 0; y < H && !start; y++) for (var x = 0; x < W; x++) if (grid[y][x]){ start = [x, y]; break; }
    if (!start) return false;
    var seen = {}, stack = [start], total = 0, dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    seen[start[0] + ',' + start[1]] = 1;
    while (stack.length){
      var c = stack.pop(); total++;
      for (var i = 0; i < 4; i++){
        var nx = c[0] + dirs[i][0], ny = c[1] + dirs[i][1], k = nx + ',' + ny;
        if (nx < 0 || ny < 0 || nx >= W || ny >= H || seen[k] || !grid[ny][nx]) continue;
        seen[k] = 1; stack.push([nx, ny]);
      }
    }
    return total === _glFloorCount(grid, W, H);
  }

  // Starts as a full rectangle (border = wall) and randomly converts interior floor cells to wall
  // — a "carve" — keeping the change ONLY if the region stays a single connected blob with enough
  // floor left. Repeating this a random number of times produces an irregular, non-rectangular
  // silhouette instead of an open box every time.
  function _glCarveRegion(W, H, carves){
    var grid = [];
    for (var y = 0; y < H; y++){
      var row = [];
      for (var x = 0; x < W; x++) row.push(x > 0 && y > 0 && x < W - 1 && y < H - 1);
      grid.push(row);
    }
    var minFloor = Math.max(9, Math.floor((W - 2) * (H - 2) * 0.55));
    var made = 0, attempts = carves * 8;
    while (made < carves && attempts-- > 0){
      var x = rand(1, W - 2), y = rand(1, H - 2);
      if (!grid[y][x]) continue;
      grid[y][x] = false;
      if (_glFloorCount(grid, W, H) < minFloor || !_glConnected(grid, W, H)) grid[y][x] = true;
      else made++;
    }
    return grid;
  }

  // Picks N distinct random floor cells to be the TARGETS. Ice-slide crates only ever come to
  // rest against a backstop (a wall, or another crate) — a target dropped in the open interior is
  // usually impossible to slide onto, which is why naive fully-random placement barely ever
  // produced a solvable level. Restricting targets to wall-adjacent cells at least gives every
  // target ONE legal backstop direction to be pushed into.
  // requireBackstop=true (slide/ice): targets MUST be wall-adjacent so a sliding crate has a
  // backstop to rest against. requireBackstop=false (classic push): any interior floor cell works.
  function _glPickTargets(grid, W, H, numCrates, requireBackstop){
    var dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    var pool = [];
    for (var y = 0; y < H; y++) for (var x = 0; x < W; x++){
      if (!grid[y][x]) continue;
      if (!requireBackstop){ pool.push([x, y]); continue; }
      for (var d = 0; d < 4; d++){
        var nx = x + dirs[d][0], ny = y + dirs[d][1];
        if (nx < 0 || ny < 0 || nx >= W || ny >= H || !grid[ny][nx]){ pool.push([x, y]); break; }
      }
    }
    if (pool.length < numCrates) return null;
    for (var i = pool.length - 1; i > 0; i--){ var j = rand(0, i); var t = pool[i]; pool[i] = pool[j]; pool[j] = t; }
    return pool.slice(0, numCrates);
  }

  // REVERSE CONSTRUCTION: places crates ON their targets (the solved state), then plays K random
  // valid ice-slide moves BACKWARDS to scramble them — so a forward solution is guaranteed to exist
  // by construction (just replay the scramble in reverse), instead of hoping a random placement
  // happens to be solvable. A "reverse slide": pick a crate + a direction `d` it will eventually be
  // PUSHED in (forward); simulate it sliding from its current cell in the OPPOSITE direction as far
  // as legal, then park it at a RANDOM cell along that path — from there, pushing forward in
  // direction `d` glides it back through the now-clear path to exactly where it started. The player
  // is tracked backwards too: to make that forward push, they must stand one cell behind the crate's
  // new position (opposite `d`), which is the free-walk exit point for the PRIOR (earlier-in-time)
  // reverse step.
  function _glReversePlace(grid, W, H, targets, scrambleSteps){
    var dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    var crates = targets.map(function(t){ return t.slice(); });
    var player = null;
    for (var step = 0; step < scrambleSteps; step++){
      var ci = rand(0, crates.length - 1);
      var cx = crates[ci][0], cy = crates[ci][1];
      var d = dirs[rand(0, 3)];                        // the FORWARD push direction for this crate
      // Slide backwards (opposite `d`) from the crate's current cell as far as legal.
      var occ = {}; crates.forEach(function(c, i2){ if (i2 !== ci) occ[c[0] + ',' + c[1]] = 1; });
      var path = [], gx = cx, gy = cy;
      while (true){
        var tx = gx - d[0], ty = gy - d[1], tk = tx + ',' + ty;
        if (tx < 0 || ty < 0 || tx >= W || ty >= H || !grid[ty][tx] || occ[tk]) break;
        gx = tx; gy = ty; path.push([gx, gy]);
      }
      if (!path.length) continue;                      // this crate can't move this way — skip the step
      var pick = path[rand(0, path.length - 1)];
      crates[ci] = pick;
      var behind = [pick[0] - d[0], pick[1] - d[1]];    // where the player must stand to push it forward later
      if (behind[0] >= 0 && behind[1] >= 0 && behind[0] < W && behind[1] < H && grid[behind[1]][behind[0]]) player = behind;
    }
    if (!player){
      // No reverse step ever placed the player (e.g. scrambleSteps=0, or every attempt was skipped)
      // — fall back to any free floor cell not under a crate.
      var occAll = {}; crates.forEach(function(c){ occAll[c[0] + ',' + c[1]] = 1; });
      for (var y = 0; y < H && !player; y++) for (var x = 0; x < W; x++){
        if (grid[y][x] && !occAll[x + ',' + y]){ player = [x, y]; break; }
      }
    }
    if (!player) return null;
    return { player: player, crates: crates, targets: targets };
  }

  function _glToRows(grid, W, H, ent){
    var rows = [];
    for (var y = 0; y < H; y++){
      var row = '';
      for (var x = 0; x < W; x++){
        if (!grid[y][x]){ row += '#'; continue; }
        var isP = ent.player[0] === x && ent.player[1] === y;
        var isC = ent.crates.some(function(c){ return c[0] === x && c[1] === y; });
        var isT = ent.targets.some(function(t){ return t[0] === x && t[1] === y; });
        // A crate can land on ANY target's cell during reverse-scrambling, not just its own — must
        // use the combined '*'/'+' markers (which _skParse already understands) or the overlapping
        // target silently vanishes from the level (shown as bare '$', so it's never registered as
        // a target at all, corrupting the goal condition).
        row += (isP && isT) ? '+' : (isC && isT) ? '*' : isP ? '@' : isC ? '$' : isT ? 'o' : '.';
      }
      rows.push(row);
    }
    return rows;
  }

  // BFS-verify a generated level using the SAME ice-slide push rule as sokoMove(): a pushed crate
  // glides from its own cell until it hits a wall or another crate; the player ends up standing
  // where the crate STARTED (not where it slid to). States are normalized by (sorted crate set +
  // the player's reachable-region's lexicographically-smallest cell) so pushes that only differ by
  // idle player wandering collapse to the same state. Small grids/crate counts here keep this fast.
  // slide=true → ice glide (Glacier); slide=false → classic one-cell push (Cargo Bay).
  function _glSolvable(rows, slide){
    var W = rows[0].length, H = rows.length, walls = {}, targets = [], crates = [], px = 0, py = 0;
    for (var y = 0; y < H; y++) for (var x = 0; x < W; x++){
      var c = rows[y].charAt(x), k = x + ',' + y;
      if (c === '#') walls[k] = 1;
      if (c === 'o' || c === '*' || c === '+') targets.push(k);
      if (c === '$' || c === '*') crates.push(k);
      if (c === '@' || c === '+'){ px = x; py = y; }
    }
    crates.sort();
    var dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    function setOf(a){ var s = {}; for (var i = 0; i < a.length; i++) s[a[i]] = 1; return s; }
    function reach(cs, sx, sy){
      var seen = {}, stack = [[sx, sy]], min = sx + ',' + sy; seen[min] = 1;
      while (stack.length){
        var c2 = stack.pop(), cx = c2[0], cy = c2[1];
        for (var i = 0; i < 4; i++){
          var nx = cx + dirs[i][0], ny = cy + dirs[i][1], k2 = nx + ',' + ny;
          if (nx < 0 || ny < 0 || nx >= W || ny >= H || seen[k2] || walls[k2] || cs[k2]) continue;
          seen[k2] = 1; if (k2 < min) min = k2; stack.push([nx, ny]);
        }
      }
      return { seen: seen, min: min };
    }
    function goal(a){ for (var i = 0; i < targets.length; i++) if (a.indexOf(targets[i]) === -1) return false; return true; }
    var r0 = reach(setOf(crates), px, py);
    var visited = {}; visited[crates.join('|') + '#' + r0.min] = 1;
    // State cap kept low so a hard/unsolvable candidate is rejected FAST (generation stays snappy) —
    // legit reverse-constructed levels solve in well under this; deeper ones fall back to a preset.
    // Levels are generated LAZILY (one at a time, see _skLevel), so this cost is spread out and never
    // freezes the game at run-start.
    // We only need to know IF the level is solvable (not the shortest path), so this is a DFS with a
    // visited-set: q.pop() dequeues in O(1). (A BFS with q.shift() is O(n) per dequeue → O(states²)
    // overall, which froze generation on the harder profiles.)
    var q = [{ crates: crates, norm: r0.min }], iter = 0, CAP = 5000;
    while (q.length){
      if (iter++ > CAP) return false;
      var cur = q.pop();
      if (goal(cur.crates)) return true;
      var cs = setOf(cur.crates), np = cur.norm.split(','), rr = reach(cs, +np[0], +np[1]);
      for (var ci = 0; ci < cur.crates.length; ci++){
        var cc = cur.crates[ci].split(','), cx = +cc[0], cy = +cc[1];
        for (var di = 0; di < 4; di++){
          var d = dirs[di], gx = cx, gy = cy;
          if (slide){
            while (true){
              var tx = gx + d[0], ty = gy + d[1], tk = tx + ',' + ty;
              if (walls[tk] || cs[tk]) break;
              gx = tx; gy = ty;
            }
          } else {                                   // classic push: crate advances exactly one cell
            var tx1 = cx + d[0], ty1 = cy + d[1], tk1 = tx1 + ',' + ty1;
            if (!walls[tk1] && !cs[tk1]){ gx = tx1; gy = ty1; }
          }
          if (gx === cx && gy === cy) continue;
          var pushFrom = (cx - d[0]) + ',' + (cy - d[1]);
          if (!rr.seen[pushFrom]) continue;
          var nc = cur.crates.slice(); nc[ci] = gx + ',' + gy; nc.sort();
          var nr = reach(setOf(nc), cx, cy);
          var key = nc.join('|') + '#' + nr.min;
          if (visited[key]) continue;
          visited[key] = 1;
          q.push({ crates: nc, norm: nr.min });
        }
      }
    }
    return false;
  }

  // Cheap O(crates) reject: a crate boxed in on all 4 sides (wall or another crate) can NEVER be
  // pushed, so the layout is trivially unsolvable — skip the expensive BFS for these.
  function _glLooksSane(grid, W, H, ent){
    var occ = {}; ent.crates.forEach(function(c){ occ[c[0] + ',' + c[1]] = 1; });
    for (var i = 0; i < ent.crates.length; i++){
      var cx = ent.crates[i][0], cy = ent.crates[i][1], free = false;
      var dirs = [[1,0],[-1,0],[0,1],[0,-1]];
      for (var d = 0; d < 4; d++){
        var nx = cx + dirs[d][0], ny = cy + dirs[d][1];
        if (nx >= 0 && ny >= 0 && nx < W && ny < H && grid[ny][nx] && !occ[nx + ',' + ny]){ free = true; break; }
      }
      if (!free) return false;
    }
    return true;
  }

  var _SK_DIRS = [[1,0],[-1,0],[0,1],[0,-1]];
  var _SK_DIRCH = ['r','l','d','u'], _SK_OPP = ['l','r','u','d'];   // by index into _SK_DIRS

  // PUSH-mode reverse-scramble (Cargo Bay): start crates ON the targets (the solved state), then
  // PULL them backwards K times — a pull = the player, standing next to a crate with an open cell
  // behind, drags it one step (crate follows into the player's old cell; the player steps back).
  // It also RECORDS the exact forward solution (reverse each step: a reverse-pull in dir d → a
  // forward PUSH in dir d [uppercase]; a reverse-walk → a walk the opposite way; then reverse the
  // whole list). `_skGenerateOne` replays that solution to PROVE each shipped level is solvable —
  // the same "replay the supplied solution" guarantee the reference uses.
  function _skReversePull(grid, W, H, targets, steps){
    function fl(x, y){ return x >= 0 && y >= 0 && x < W && y < H && grid[y][x]; }
    var crateSet = {}; targets.forEach(function(t){ crateSet[t[0] + ',' + t[1]] = 1; });
    var free = [];
    for (var y = 0; y < H; y++) for (var x = 0; x < W; x++) if (grid[y][x] && !crateSet[x + ',' + y]) free.push([x, y]);
    if (!free.length) return null;
    var player = free[rand(0, free.length - 1)], pulls = 0, tries = 0, maxTries = steps * 30 + 80;
    var rev = [];   // reverse-time forward actions (see comment); solution = reverse(rev)
    while (pulls < steps && tries++ < maxTries){
      var pullOpts = [], walkOpts = [];
      for (var i = 0; i < 4; i++){
        var d = _SK_DIRS[i];
        var ax = player[0] + d[0], ay = player[1] + d[1], ak = ax + ',' + ay;   // cell ahead (a crate?)
        var bx = player[0] - d[0], by = player[1] - d[1], bk = bx + ',' + by;   // cell behind (drag into?)
        if (crateSet[ak] && fl(bx, by) && !crateSet[bk]) pullOpts.push({ i: i, crate: ax + ',' + ay, np: [bx, by] });
        if (fl(ax, ay) && !crateSet[ak]) walkOpts.push({ i: i, np: [ax, ay] });
      }
      var doPull = pullOpts.length && (Math.random() < 0.72 || !walkOpts.length);
      if (doPull){
        var o = pullOpts[rand(0, pullOpts.length - 1)];
        delete crateSet[o.crate];
        crateSet[player[0] + ',' + player[1]] = 1;       // crate follows into the player's old cell
        player = o.np;
        rev.push(_SK_DIRCH[o.i].toUpperCase());          // forward: a PUSH in this direction
        pulls++;
      } else if (walkOpts.length){
        var w = walkOpts[rand(0, walkOpts.length - 1)];
        player = w.np;
        rev.push(_SK_OPP[w.i]);                          // forward: walk the opposite way
      } else break;
    }
    if (pulls < Math.max(1, Math.floor(steps / 2))) return null;
    var crates = Object.keys(crateSet).map(function(k){ var p = k.split(','); return [+p[0], +p[1]]; });
    var solution = rev.reverse().join('');
    return { player: player, crates: crates, targets: targets, solution: solution };
  }

  // Replay a push solution ("R"/"L"/"U"/"D" push, "r"/"l"/"u"/"d" walk — case ignored on replay)
  // on a rendered level and return true iff every target ends covered. Proves a Cargo level solvable.
  function _skReplayPush(rows, sol){
    var W = rows[0].length, H = rows.length, walls = {}, targets = [], crates = {}, px = 0, py = 0;
    for (var y = 0; y < H; y++) for (var x = 0; x < W; x++){
      var c = rows[y].charAt(x), k = x + ',' + y;
      if (c === '#') walls[k] = 1;
      if (c === 'o' || c === '*' || c === '+') targets.push(k);
      if (c === '$' || c === '*') crates[k] = 1;
      if (c === '@' || c === '+'){ px = x; py = y; }
    }
    var DMAP = { u: [0,-1], d: [0,1], l: [-1,0], r: [1,0] };
    for (var i = 0; i < sol.length; i++){
      var d = DMAP[sol.charAt(i).toLowerCase()];
      if (!d) return false;
      var nx = px + d[0], ny = py + d[1], nk = nx + ',' + ny;
      if (walls[nk]) return false;
      if (crates[nk]){
        var bx = nx + d[0], by = ny + d[1], bk = bx + ',' + by;
        if (walls[bk] || crates[bk]) return false;
        delete crates[nk]; crates[bk] = 1;
      }
      px = nx; py = ny;
    }
    for (var t = 0; t < targets.length; t++) if (!crates[targets[t]]) return false;
    return true;
  }

  // Generates ONE level for a difficulty tier via reverse-construction. SLIDE (Glacier): multi-crate
  // solvability isn't guaranteed by construction, so BFS-verify each candidate. PUSH (Cargo): the
  // reverse-pull's forward replay is a guaranteed solution, so ship it directly (no BFS → no freeze
  // risk on big boards). Retries on a skipped/degenerate scramble; falls back to a hand-authored
  // level only if generation somehow never succeeds, so the player is never handed a broken puzzle.
  function _skGenerateOne(diff, slide, fallback){
    for (var attempt = 0; attempt < 10; attempt++){
      var grid = _glCarveRegion(diff.W, diff.H, diff.carves);
      var targets = _glPickTargets(grid, diff.W, diff.H, diff.crates, slide);
      if (!targets) continue;
      var ent = slide ? _glReversePlace(grid, diff.W, diff.H, targets, diff.scramble)
                      : _skReversePull(grid, diff.W, diff.H, targets, diff.scramble);
      if (!ent || !_glLooksSane(grid, diff.W, diff.H, ent)) continue;
      // Already-solved (every TARGET already covered — crates are interchangeable, so compare SETS,
      // not same-index pairs) isn't a real puzzle.
      var crateSet = {}; ent.crates.forEach(function(c){ crateSet[c[0] + ',' + c[1]] = 1; });
      var moved = targets.some(function(t){ return !crateSet[t[0] + ',' + t[1]]; });
      if (!moved) continue;
      var rows = _glToRows(grid, diff.W, diff.H, ent);
      // Slide: BFS-verify (multi-crate ice isn't guaranteed solvable by construction). Push: replay
      // the reverse-pull's OWN recorded solution — an actual proof this exact level is solvable.
      if (slide ? _glSolvable(rows, true) : _skReplayPush(rows, ent.solution)) return rows;
    }
    return fallback;
  }


  var SOKO = { title: '', replay: '', gameId: '', slide: false, levels: [], idx: 0, total: 0,
    diffs: null, fallbacks: null,
    walls: {}, targets: {}, crates: {}, px: 0, py: 0, W: 0, H: 0, moves: 0, totalMoves: 0, done: false };

  // Lazily generate + cache the level for the given index (one at a time — see the comment in
  // _skGenerateOne). Cargo/Glacier both set SOKO.diffs + SOKO.fallbacks in their start functions.
  function _skEnsureLevel(idx){
    if (!SOKO.levels[idx]){
      var diff = SOKO.diffs[Math.min(idx, SOKO.diffs.length - 1)];
      var fb = SOKO.fallbacks[Math.min(idx, SOKO.fallbacks.length - 1)];
      SOKO.levels[idx] = _skGenerateOne(diff, SOKO.slide, fb);
    }
    return SOKO.levels[idx];
  }

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
    if (hud) hud.innerHTML = '<span class="wond-chip">🗺️ Level <b>' + (SOKO.idx + 1) + ' / ' + SOKO.total + '</b></span>' +
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
      SOKO.totalMoves += SOKO.moves;
      if (typeof playSfx === 'function') playSfx('correct');
      if (SOKO.idx + 1 < SOKO.total){
        if (typeof showToast === 'function') showToast('✅ Level ' + (SOKO.idx + 1) + ' clear!');
        a2Later(function(){ SOKO.idx++; _skLevel(); }, 800);
      } else {
        var score = Math.max(100, 3000 - SOKO.totalMoves * 10);
        var newHigh = (typeof wgRecordScore === 'function' && SOKO.gameId) ? wgRecordScore(SOKO.gameId, score, SOKO.total) : false;
        a2Later(function(){
          a2Result(SOKO.title, '🌟 ALL LEVELS CLEAR! 🌟' + (newHigh ? ' 🏆' : ''),
            'You solved every puzzle in ' + SOKO.totalMoves + ' total moves. Brilliant pushing!',
            1, SOKO.replay);
        }, 800);
      }
    }
  }
  function sokoRestart(){ _skParse(_skEnsureLevel(SOKO.idx)); _skRender(); }

  function _skLevel(){
    _skParse(_skEnsureLevel(SOKO.idx));
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

  // Free to view (no pass charge) — the welcome screen's Play button does the actual charge +
  // level-1 start.
  function openCargo(){
    gameWelcome('cargo', '📦', 'Cargo Bay',
      'Push every crate onto its ring — classic warehouse puzzling! ' + CARGO_DIFFS.length + ' freshly-generated levels that get harder and harder.',
      '_cargoStartRun');
  }
  function _cargoStartRun(){ SOKO.title = '📦 Cargo Bay'; SOKO.replay = 'openCargo'; SOKO.gameId = 'cargo'; SOKO.slide = false; SOKO.diffs = CARGO_DIFFS; SOKO.fallbacks = CARGO_LEVELS; SOKO.total = CARGO_DIFFS.length; SOKO.levels = []; SOKO.idx = 0; SOKO.totalMoves = 0; _skLevel(); }

  // A freshly generated (BFS-verified) set of 8 levels every time — see _glGenerateLevels above.
  function openGlacier(){
    gameWelcome('glacier', '❄️', 'Glacier Push',
      'Ice blocks SLIDE until they hit something. Plan your pushes! ' + GLACIER_DIFFS.length + ' fresh levels every run, harder and harder.',
      '_glacierStartRun');
  }
  function _glacierStartRun(){ SOKO.title = '❄️ Glacier Push'; SOKO.replay = 'openGlacier'; SOKO.gameId = 'glacier'; SOKO.slide = true; SOKO.diffs = GLACIER_DIFFS; SOKO.fallbacks = GLACIER_FALLBACK_LEVELS; SOKO.total = GLACIER_DIFFS.length; SOKO.levels = []; SOKO.idx = 0; SOKO.totalMoves = 0; _skLevel(); }

  // ===========================================================================
  // 🏯 Forbidden City (Shikinjou / 紫禁城) — a 1991 Sunsoft-style tile puzzle.
  // Walk the palace and PUSH a spirit tile: it SLIDES across the floor until it hits
  // a wall or another tile. If it slides INTO a tile of the same kind, both cancel &
  // vanish — that's how you open a route to the 🚪 exit. A tile shoved flush against a
  // wall with no match is stuck, so pick your direction carefully.
  //   #=wall  @=you  E=exit  1-6=matching tile types  .=floor
  // ===========================================================================
  // Enough distinct tile types that every matching pair (and every unmatched decoy) at the hardest
  // difficulty gets its OWN type — so tiles only ever cancel with their intended partner.
  var SHIK_TILE = { '1': '🟥', '2': '🟩', '3': '🟦', '4': '🟨', '5': '🟪', '6': '🟧',
                    '7': '🟫', '8': '🔴', '9': '🔵', 'A': '🟢', 'B': '🟠', 'C': '🟣', 'D': '🔶' };
  var _SHIK_LABELS = ['1','2','3','4','5','6','7','8','9','A','B','C','D'];   // keys of SHIK_TILE

  // 10-tier difficulty ramp — `barriers` (mandatory gate pairs the panda must clear to reach the
  // exit) is the main lever, so each run gets steadily harder; board width = 3*barriers+4 (rendered
  // with responsive cells so wide boards still fit). optional pairs + decoys add red herrings.
  var SHIK_DIFFS = [
    { barriers: 1, H: 7,  optional: 0, decoys: 0 },
    { barriers: 1, H: 7,  optional: 0, decoys: 1 },
    { barriers: 2, H: 7,  optional: 0, decoys: 1 },
    { barriers: 2, H: 8,  optional: 1, decoys: 1 },
    { barriers: 3, H: 8,  optional: 1, decoys: 2 },
    { barriers: 3, H: 8,  optional: 1, decoys: 2 },
    { barriers: 4, H: 9,  optional: 1, decoys: 2 },
    { barriers: 4, H: 9,  optional: 2, decoys: 3 },
    { barriers: 5, H: 9,  optional: 2, decoys: 3 },
    { barriers: 6, H: 10, optional: 2, decoys: 3 }
  ];
  var SHIK_LEVELS = [
    // 1 — slide one tile across the gap into its twin to open the way out.
    ['#######',
     '#@1.1E#',
     '#######'],
    // 2 — a long slide: shove the tile all the way down the row to clear the exit shaft.
    ['#######',
     '#@1..1#',
     '#####.#',
     '#....E#',
     '#######'],
    // 3 — two slides and an S-shaped path.
    ['########',
     '#@.1.1.#',
     '######.#',
     '#E.2.2.#',
     '########'],
    // 4 — a two-gate descent: clear each pair to fall through.
    ['#######',
     '#@....#',
     '###1###',
     '#..1..#',
     '###5###',
     '#..5.E#',
     '#######'],
    // 5 — the gauntlet: three gates in a row.
    ['#######',
     '#@....#',
     '###1###',
     '#..1..#',
     '###2###',
     '#..2..#',
     '###3###',
     '#..3.E#',
     '#######']
  ];
  var SHIK = { walls: {}, tiles: {}, exit: '', px: 0, py: 0, W: 0, H: 0, moves: 0, totalMoves: 0, idx: 0,
    total: 0, diffs: null, fallbacks: null, levels: [], done: false, hist: [] };

  // Lazily generate + cache the chamber for the given index (one at a time, so no run-start freeze).
  function _shikEnsureLevel(idx){
    if (!SHIK.levels[idx]){
      var diff = SHIK.diffs[Math.min(idx, SHIK.diffs.length - 1)];
      var fb = SHIK.fallbacks[Math.min(idx, SHIK.fallbacks.length - 1)];
      SHIK.levels[idx] = _shikGenerateOne(diff, fb);
    }
    return SHIK.levels[idx];
  }

  function _shikParse(rows){
    SHIK.walls = {}; SHIK.tiles = {}; SHIK.exit = '';
    SHIK.H = rows.length; SHIK.W = rows[0].length; SHIK.moves = 0; SHIK.done = false; SHIK.hist = [];
    for (var y = 0; y < rows.length; y++){
      for (var x = 0; x < rows[y].length; x++){
        var c = rows[y].charAt(x), k = x + ',' + y;
        if (c === '#') SHIK.walls[k] = 1;
        else if (c === '@'){ SHIK.px = x; SHIK.py = y; }
        else if (c === 'E') SHIK.exit = k;
        else if (SHIK_TILE[c]) SHIK.tiles[k] = c;
      }
    }
  }

  function _shikTileCount(){ var n = 0; for (var k in SHIK.tiles) n++; return n; }

  // ===== Forbidden City procedural generator (chamber-gate reverse-construction, solver-verified) =====
  // Ported from the user's solver-backed reference: a chain of chambers separated by 1-cell gates,
  // exit in the leftmost chamber, panda in the rightmost. Each divider gets one MANDATORY matching
  // pair placed by REVERSING a known solution — so a forward solution is guaranteed, and every gate is
  // a real route constraint. The recorded solution is then REPLAYED through _shikStep to prove the
  // exact level is solvable before it ships (rejecting the rare bad decoy placement).
  var _SHIK_DIRCH = { r: [1,0], l: [-1,0], d: [0,1], u: [0,-1] };
  var _SHIK_OPP = { r: 'l', l: 'r', u: 'd', d: 'u' };

  function _shikMakeBoard(H, barriers){
    var W = 3 * barriers + 4, walls = {};
    for (var x = 0; x < W; x++){ walls[x + ',0'] = 1; walls[x + ',' + (H - 1)] = 1; }
    for (var y = 0; y < H; y++){ walls['0,' + y] = 1; walls[(W - 1) + ',' + y] = 1; }
    var gates = [];
    for (var i = 0; i < barriers; i++){
      var dx = 3 + 3 * i, gy = rand(2, H - 3);
      for (var yy = 1; yy < H - 1; yy++) if (yy !== gy) walls[dx + ',' + yy] = 1;
      gates.push([dx, gy]);
    }
    var exitRows = [];
    for (var y2 = 1; y2 < H - 1; y2++) if (y2 !== gates[0][1]) exitRows.push(y2);
    var exit = [1, exitRows.length ? exitRows[rand(0, exitRows.length - 1)] : 1];
    return { W: W, H: H, walls: walls, exit: exit, gates: gates };
  }

  // BFS shortest walk (avoiding walls + tiles), returns a lowercase move string or null.
  function _shikWalk(W, H, walls, tiles, from, to){
    var fk = from[0] + ',' + from[1], tgt = to[0] + ',' + to[1];
    if (fk === tgt) return '';
    var q = [from], seen = {}, par = {}; seen[fk] = 1;
    var dirs = [['r',1,0],['l',-1,0],['d',0,1],['u',0,-1]];
    while (q.length){
      var c = q.shift();
      for (var i = 0; i < 4; i++){
        var nx = c[0] + dirs[i][1], ny = c[1] + dirs[i][2], k = nx + ',' + ny;
        if (nx < 0 || ny < 0 || nx >= W || ny >= H || seen[k] || walls[k] || tiles[k]) continue;
        seen[k] = 1; par[k] = { p: c[0] + ',' + c[1], ch: dirs[i][0] };
        if (k === tgt){ var out = [], cur = k; while (cur !== fk){ var e = par[cur]; out.push(e.ch); cur = e.p; } return out.reverse().join(''); }
        q.push([nx, ny]);
      }
    }
    return null;
  }
  function _shikReachSet(W, H, walls, tiles, from){
    var q = [from], seen = {}; seen[from[0] + ',' + from[1]] = 1;
    var dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    while (q.length){ var c = q.shift(); for (var i = 0; i < 4; i++){ var nx = c[0]+dirs[i][0], ny = c[1]+dirs[i][1], k = nx+','+ny; if (nx<0||ny<0||nx>=W||ny>=H||seen[k]||walls[k]||tiles[k]) continue; seen[k]=1; q.push([nx,ny]); } }
    return seen;
  }

  function _shikConstruct(board, decoys){
    var W = board.W, H = board.H, walls = board.walls, exit = board.exit, gates = board.gates;
    var tiles = {}, rev = [], player = exit.slice(), li = 0;
    function key(p){ return p[0] + ',' + p[1]; }
    function open(x, y){ return !walls[x + ',' + y]; }
    function walkTo(target){
      var path = _shikWalk(W, H, walls, tiles, player, target);
      if (path === null) return false;
      for (var i = 0; i < path.length; i++) rev.push(_SHIK_OPP[path[i]]);   // forward = walk back
      player = target.slice();
      return true;
    }
    for (var g = 0; g < gates.length; g++){
      var gate = gates[g];
      if (!walkTo(gate)) return null;
      var label = _SHIK_LABELS[li++]; if (!label) return null;
      var stationary = [gate[0] - 2, gate[1]], behind = [gate[0] + 1, gate[1]];
      if (!open(stationary[0], stationary[1]) || !open(behind[0], behind[1]) ||
          tiles[key(stationary)] || tiles[key(gate)] ||
          (stationary[0] === exit[0] && stationary[1] === exit[1])) return null;
      tiles[key(gate)] = label; tiles[key(stationary)] = label;
      player = behind.slice();
      rev.push('L');                                       // forward: push the gate tile LEFT into its twin
    }
    // Reposition the panda deeper into the rightmost chamber so it doesn't start on a gate.
    var finalGateX = gates[gates.length - 1][0], reach = _shikReachSet(W, H, walls, tiles, player), far = [];
    for (var rk in reach){ var rp = rk.split(','); if (+rp[0] > finalGateX) far.push([+rp[0], +rp[1]]); }
    if (far.length) walkTo(far[rand(0, far.length - 1)]);
    // Unmatched DECOY tiles (each its own unused type → they never cancel; a bad placement that blocks
    // the solution is caught by the replay check in _shikGenerateOne).
    var occ = {}; for (var tkk in tiles) occ[tkk] = 1; occ[key(player)] = 1; occ[key(exit)] = 1;
    var cells = [];
    for (var y = 1; y < H - 1; y++) for (var x = 1; x < W - 1; x++){ var ck = x + ',' + y; if (!walls[ck] && !occ[ck]) cells.push([x, y]); }
    for (var s = cells.length - 1; s > 0; s--){ var j = rand(0, s); var t = cells[s]; cells[s] = cells[j]; cells[j] = t; }
    for (var d = 0; d < decoys && li < _SHIK_LABELS.length && d < cells.length; d++) tiles[key(cells[d])] = _SHIK_LABELS[li++];
    return { player: player, tiles: tiles, solution: rev.slice().reverse().join('') };
  }

  function _shikToRows(board, ent){
    var rows = [];
    for (var y = 0; y < board.H; y++){
      var row = '';
      for (var x = 0; x < board.W; x++){
        var k = x + ',' + y;
        if (board.walls[k]) row += '#';
        else if (ent.player[0] === x && ent.player[1] === y) row += '@';
        else if (ent.tiles[k]) row += ent.tiles[k];
        else if (board.exit[0] === x && board.exit[1] === y) row += 'E';
        else row += ' ';
      }
      rows.push(row);
    }
    return rows;
  }

  // Replay a solution through the REAL move core (_shikStep) and return true iff the panda reaches E.
  function _shikReplay(rows, sol){
    var W = rows[0].length, H = rows.length, st = { walls: {}, tiles: {}, exit: '', px: 0, py: 0 };
    for (var y = 0; y < H; y++) for (var x = 0; x < W; x++){
      var c = rows[y].charAt(x), k = x + ',' + y;
      if (c === '#') st.walls[k] = 1;
      else if (c === '@'){ st.px = x; st.py = y; }
      else if (c === 'E') st.exit = k;
      else if (SHIK_TILE[c]) st.tiles[k] = c;
    }
    for (var i = 0; i < sol.length; i++){
      var d = _SHIK_DIRCH[sol.charAt(i).toLowerCase()];
      if (!d) return false;
      var ns = _shikStep(st, d[0], d[1]);
      if (!ns) return false;
      st.tiles = ns.tiles; st.px = ns.px; st.py = ns.py;
      if ((st.px + ',' + st.py) === st.exit) return true;
    }
    return (st.px + ',' + st.py) === st.exit;
  }

  function _shikGenerateOne(diff, fallback){
    for (var attempt = 0; attempt < 25; attempt++){
      var board = _shikMakeBoard(diff.H, diff.barriers);
      var ent = _shikConstruct(board, diff.decoys || 0);
      if (!ent) continue;
      // Reject a trivial level (panda can already WALK to the exit without clearing any gate).
      var reach = _shikReachSet(board.W, board.H, board.walls, ent.tiles, ent.player);
      if (reach[board.exit[0] + ',' + board.exit[1]]) continue;
      var rows = _shikToRows(board, ent);
      if (_shikReplay(rows, ent.solution)) return rows;    // proven solvable — ship it
    }
    return fallback;
  }

  function _shikGridHtml(){
    // Responsive cell + gap size — wide chamber boards (up to 22 cols) shrink to fit the viewport
    // width (accounting for the inter-cell gap) so they never overflow off-screen.
    var gap = SHIK.W > 12 ? 2 : 4;
    var avail = Math.min(560, ((typeof window !== 'undefined' && window.innerWidth) ? window.innerWidth : 420) * 0.94);
    var cell = Math.max(14, Math.min(56, Math.floor((avail - (SHIK.W - 1) * gap) / SHIK.W)));
    var h = '<div class="a2-grid" style="gap:' + gap + 'px;grid-template-columns:repeat(' + SHIK.W + ',' + cell + 'px)">';
    var fs = ' style="font-size:' + Math.floor(cell * 0.62) + 'px"';
    for (var y = 0; y < SHIK.H; y++){
      for (var x = 0; x < SHIK.W; x++){
        var k = x + ',' + y, cls = 'a2-cell', body = '';
        if (SHIK.walls[k]) cls += ' a2-wall';
        else if (SHIK.exit === k) cls += ' a2-target';
        if (SHIK.tiles[k]) body = '<span class="a2-emoji"' + fs + '>' + SHIK_TILE[SHIK.tiles[k]] + '</span>';
        else if (SHIK.exit === k && !(x === SHIK.px && y === SHIK.py)) body = '<span class="a2-emoji"' + fs + '>🚪</span>';
        if (x === SHIK.px && y === SHIK.py) body = '<span class="a2-emoji"' + fs + '>🐼</span>';
        h += '<div class="' + cls + '" style="width:' + cell + 'px;height:' + cell + 'px">' + body + '</div>';
      }
    }
    return h + '</div>';
  }

  function _shikRender(){
    var g = document.getElementById('shikWrap'); if (!g) return;
    g.innerHTML = _shikGridHtml();
    var hud = document.getElementById('shikHud');
    if (hud) hud.innerHTML = '<span class="wond-chip">🏯 Chamber <b>' + (SHIK.idx + 1) + ' / ' + SHIK.total + '</b></span>' +
      '<span class="wond-chip">👣 Moves: <b>' + SHIK.moves + '</b></span>' +
      '<span class="wond-chip">🧩 Tiles: <b>' + _shikTileCount() + '</b></span>';
  }

  // Pure move core — shared by the game AND the in-code solver/generator that verify levels.
  // st = { walls, tiles, exit, px, py }. Returns a NEW state (with .canceled), or null if the move
  // is illegal. Authentic Shikinjou rules (matched to the solver-backed reference generator):
  //   • A pushed tile SLIDES until it meets a wall or another tile.
  //   • ZERO-DISTANCE pushes are ILLEGAL — the cell directly ahead of the tile must be open floor,
  //     so a tile must travel ≥1 cell (you can't cancel two *touching* tiles by nudging them).
  //   • Hitting a same-kind tile cancels BOTH; a different tile stops it one cell before.
  //   • The exit is ordinary floor: tiles slide over it, and the player wins by stepping onto it.
  function _shikStep(st, dx, dy){
    var nx = st.px + dx, ny = st.py + dy, nk = nx + ',' + ny;
    if (st.walls[nk]) return null;                       // walk into a wall — no move
    if (st.tiles[nk]){
      var type = st.tiles[nk];
      var fx = nx + dx, fy = ny + dy, fk = fx + ',' + fy;
      if (st.walls[fk] || st.tiles[fk]) return null;     // zero-distance push — illegal
      var cx = nx, cy = ny, canceled = false;
      while (true){                                      // slide the tile until it hits something
        var tx = cx + dx, ty = cy + dy, tk = tx + ',' + ty;
        if (st.walls[tk]) break;                         // wall stops the slide (rest at cx,cy)
        if (st.tiles[tk]){ if (st.tiles[tk] === type) canceled = true; break; }
        cx = tx; cy = ty;
      }
      var nt = {}; for (var k in st.tiles) nt[k] = st.tiles[k];
      delete nt[nk];
      if (canceled) delete nt[(cx + dx) + ',' + (cy + dy)];   // the matching tile it slid into
      else nt[cx + ',' + cy] = type;                          // it rests here
      return { walls: st.walls, tiles: nt, exit: st.exit, px: nx, py: ny, canceled: canceled };
    }
    return { walls: st.walls, tiles: st.tiles, exit: st.exit, px: nx, py: ny, canceled: false };
  }

  function shikMove(dx, dy){
    if (SHIK.done || !a2Active()) return;
    var ns = _shikStep({ walls: SHIK.walls, tiles: SHIK.tiles, exit: SHIK.exit, px: SHIK.px, py: SHIK.py }, dx, dy);
    if (!ns) return;
    SHIK.hist.push({ tiles: JSON.stringify(SHIK.tiles), px: SHIK.px, py: SHIK.py, moves: SHIK.moves });
    if (SHIK.hist.length > 200) SHIK.hist.shift();
    SHIK.tiles = ns.tiles; SHIK.px = ns.px; SHIK.py = ns.py; SHIK.moves++;
    if (typeof playSfx === 'function') playSfx(ns.canceled ? 'correct' : 'click');
    _shikRender();
    if ((SHIK.px + ',' + SHIK.py) === SHIK.exit){
      SHIK.done = true;
      SHIK.totalMoves += SHIK.moves;
      if (typeof playSfx === 'function') playSfx('victory');
      if (SHIK.idx + 1 < SHIK.total){
        if (typeof showToast === 'function') showToast('✅ Chamber ' + (SHIK.idx + 1) + ' cleared!');
        a2Later(function(){ SHIK.idx++; _shikLevel(); }, 800);
      } else {
        var score = Math.max(100, 3000 - SHIK.totalMoves * 10);
        var newHigh = (typeof wgRecordScore === 'function') ? wgRecordScore('shikinjou', score, SHIK.total) : false;
        a2Later(function(){
          a2Result('🏯 Forbidden City', '🌟 EVERY CHAMBER CLEARED! 🌟' + (newHigh ? ' 🏆' : ''),
            'You matched the spirit tiles and escaped the palace in ' + SHIK.totalMoves + ' total moves. Masterful!',
            1, 'openShikinjou');
        }, 800);
      }
    }
  }

  function shikUndo(){
    if (SHIK.done || !a2Active() || !SHIK.hist.length) return;
    var s = SHIK.hist.pop();
    SHIK.tiles = JSON.parse(s.tiles); SHIK.px = s.px; SHIK.py = s.py; SHIK.moves = s.moves;
    _shikRender();
  }
  function shikRestart(){ _shikParse(_shikEnsureLevel(SHIK.idx)); _shikRender(); }

  function _shikLevel(){
    _shikParse(_shikEnsureLevel(SHIK.idx));
    var v = a2Shell('🏯 Forbidden City', 'openWonderland()',
      '<div class="wond-hud" id="shikHud"></div>' + a2KeyLegend('Arrows / WASD move · Z undo · R restart') +
      '<div class="a2-center" id="shikWrap" style="overflow-x:auto;max-width:100%"></div>' +
      '<div class="a2-pad">' +
        '<button type="button" class="btn btn-secondary" onclick="shikMove(0,-1)">▲</button>' +
        '<div><button type="button" class="btn btn-secondary" onclick="shikMove(-1,0)">◀</button>' +
        '<button type="button" class="btn btn-secondary" onclick="shikMove(0,1)">▼</button>' +
        '<button type="button" class="btn btn-secondary" onclick="shikMove(1,0)">▶</button></div>' +
        '<button type="button" class="btn btn-ghost" onclick="shikUndo()">↶ Undo</button>' +
        '<button type="button" class="btn btn-ghost" onclick="shikRestart()">↺ Restart</button>' +
      '</div>',
      'Shove a tile and it SLIDES until it hits something. Slide it into a matching tile (🟥→🟥) to cancel both and clear a path to the 🚪 exit. A tile stuck against a wall with no match is stranded — plan your pushes!');
    if (!v) return;
    _shikRender();
    a2Keys(function(e){
      var m = { ArrowUp: [0,-1], ArrowDown: [0,1], ArrowLeft: [-1,0], ArrowRight: [1,0],
                w: [0,-1], s: [0,1], a: [-1,0], d: [1,0] }[e.key];
      if (m){ e.preventDefault(); shikMove(m[0], m[1]); }
      else if (e.key === 'z' || e.key === 'Z') shikUndo();
      else if (e.key === 'r' || e.key === 'R') shikRestart();
    });
  }

  // Free to view (no pass charge) — the welcome screen's Play button charges via
  // wonderPlay('_shikStartRun').
  function openShikinjou(){
    gameWelcome('shikinjou', '🏯', 'Forbidden City',
      'Slide a spirit tile — it glides until it hits a wall or tile. Slide one into its matching twin to cancel both and open the gate to the 🚪 exit! ' + SHIK_DIFFS.length + ' freshly-generated chambers, harder and harder.',
      '_shikStartRun');
  }
  function _shikStartRun(){ SHIK.title = '🏯 Forbidden City'; SHIK.diffs = SHIK_DIFFS; SHIK.fallbacks = SHIK_LEVELS; SHIK.total = SHIK_DIFFS.length; SHIK.levels = []; SHIK.idx = 0; SHIK.totalMoves = 0; _shikLevel(); }

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
      var score = Math.max(100, 1000 - CIRC.moves * 10);
      var newHigh = (typeof wgRecordScore === 'function') ? wgRecordScore('circuit', score, 1) : false;
      a2Later(function(){
        a2Result('🔗 Circuit Loop', '⚡ FULL POWER! ⚡' + (newHigh ? ' 🏆' : ''),
          'Every bulb lit in ' + CIRC.moves + ' turns. The station hums back to life!',
          1, 'openCircuit');
      }, 700);
    }
  }

  // Free to view (no pass charge) — the welcome screen's Play button charges via
  // wonderPlay('_circuitStartRun').
  function openCircuit(){
    gameWelcome('circuit', '🔗', 'Circuit Loop',
      'Rotate the wires so the power core lights every bulb!',
      '_circuitStartRun');
  }

  function _circuitStartRun(){
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
  // target = floors you must stack to clear the level and advance to the next (harder) one.
  var STK_LEVELS = [
    { name: 'Foundation',      startW: 170, speed: 0.85, target: 6  },
    { name: 'Midrise',         startW: 140, speed: 1.05, target: 8  },
    { name: 'Highrise',        startW: 110, speed: 1.30, target: 10 },
    { name: 'Skyscraper',      startW: 85,  speed: 1.60, target: 12 },
    { name: 'Space Elevator',  startW: 62,  speed: 2.00, target: 14 }
  ];
  var STK = { W: 420, H: 580, blocks: [], cur: null, t: 0, speed: 1, floors: 0, over: false, flash: 0, levelIdx: 0, maxW: 170, runFloors: 0 };

  // One pass buys a whole RUN — start at level 1 and climb through all 5 in sequence (no level-select).
  // Free to view (no pass charge) — the welcome screen's Play button charges via
  // wonderPlay('_stkStartRun').
  function openStacker(){
    gameWelcome('skyStacker', '🗼', 'Sky Stacker',
      'Stack the swinging blocks! Clear all ' + STK_LEVELS.length + ' levels one by one — each tower taller than the last.',
      '_stkStartRun');
  }
  function _stkStartRun(){
    STK.runFloors = 0;
    stkStart(0);
  }

  // Sets up ONE level. Called by openStacker (level 0, already charged) and by the level-clear
  // handoff (free). It must NOT charge a pass itself.
  function stkStart(levelIdx){
    var lv = STK_LEVELS[levelIdx] || STK_LEVELS[0];
    STK.levelIdx = levelIdx; STK.maxW = lv.startW;
    STK.blocks = [{ x: (STK.W - lv.startW) / 2, w: lv.startW }];
    STK.cur = { x: 20, w: lv.startW };
    STK.t = 0; STK.speed = lv.speed; STK.floors = 0; STK.over = false; STK.flash = 0;
    a2Shell('🗼 Sky Stacker — L' + (levelIdx + 1) + ' ' + lv.name, 'openWonderland()',
      '<div class="wond-hud" id="stkHud"></div>' + a2KeyLegend('Space or ⬆️ to drop') +
      '<div class="wond-canvas-wrap"><canvas id="stkCanvas" class="a2-canvas" style="--cw:' + STK.W + ';--ch:' + STK.H + '" width="' + STK.W + '" height="' + STK.H + '"></canvas></div>',
      'Click, tap, or press Space to drop the block. Line it up — the overhang gets sliced off!');
    var cv = document.getElementById('stkCanvas');
    if (cv) cv.addEventListener('pointerdown', function(e){ e.preventDefault(); stkDrop(); });
    a2Keys(function(e){ if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'ArrowUp'){ e.preventDefault(); stkDrop(); } });
    _stkHud();
    A2.raf = requestAnimationFrame(_stkLoop);
  }

  function _stkHud(){
    var hud = document.getElementById('stkHud');
    var lv = STK_LEVELS[STK.levelIdx] || STK_LEVELS[0];
    if (hud) hud.innerHTML = '<span class="wond-chip">🎚️ Level <b>' + (STK.levelIdx + 1) + ' / ' + STK_LEVELS.length + '</b></span>' +
      '<span class="wond-chip">🏗️ Floors: <b>' + STK.floors + ' / ' + lv.target + '</b></span>' +
      '<span class="wond-chip">🗼 Run total: <b>' + (STK.runFloors || 0) + '</b></span>';
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
    STK.runFloors = (STK.runFloors || 0) + 1;
    _stkHud();
    // Sequential levels: reaching this level's target height clears it and hands off to the next
    // (harder) level for FREE — or ends the run after the last level.
    var lv = STK_LEVELS[STK.levelIdx];
    if (lv && STK.floors >= lv.target){
      STK.over = true;
      if (typeof playSfx === 'function') playSfx('correct');
      if (STK.levelIdx + 1 < STK_LEVELS.length){
        if (typeof showToast === 'function') showToast('✅ Level ' + (STK.levelIdx + 1) + ' cleared!');
        var nxt = STK.levelIdx + 1;
        a2Later(function(){ stkStart(nxt); }, 750);
      } else {
        a2Later(_stkGameOver, 750);
      }
    }
  }

  // Result screen for the whole RUN (reached on a miss, or after clearing the last level).
  // "Play again" re-charges one pass via openStacker (which restarts at level 1).
  function _stkGameOver(){
    a2StopAll();
    var lastIdx = STK_LEVELS.length - 1;
    var clearedAll = STK.levelIdx >= lastIdx && STK.floors >= (STK_LEVELS[lastIdx].target || 14);
    var totalTargets = STK_LEVELS.reduce(function(s, l){ return s + l.target; }, 0);
    var runFloors = STK.runFloors || STK.floors;
    var frac = clearedAll ? 1 : Math.min(1, runFloors / totalTargets);
    var newHigh = (typeof wgRecordScore === 'function') ? wgRecordScore('skyStacker', runFloors * 20, STK.levelIdx + 1) : false;
    var headline = (clearedAll ? '🌟 ALL LEVELS CLEARED! 🌟' : '🏗️ Tower toppled!') + (newHigh ? ' 🏆' : '');
    var view = a2View(); if (!view) return;
    view.innerHTML = '<div class="wond-board">' +
      '<div class="wond-head"><h2 class="wond-title">' + headline + '</h2>' +
        '<p class="wond-sub">Reached Level <b>' + (STK.levelIdx + 1) + ' / ' + STK_LEVELS.length + '</b> · stacked <b>' + runFloors + '</b> floors this run' +
        (clearedAll ? ' — you topped out the sky!' : '. Clear all 5 levels for the grand prize!') + '</p></div>' +
      '<div class="wond-result-card"><div class="wond-result-label">Your prizes</div><div class="wond-prizes" id="stkPrizes"></div></div>' +
      '<div class="wond-footer">' +
        '<button type="button" class="btn btn-primary" onclick="openStacker()" data-tooltip="Back to Sky Stacker\'s welcome screen.">↻ Play Again</button>' +
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
