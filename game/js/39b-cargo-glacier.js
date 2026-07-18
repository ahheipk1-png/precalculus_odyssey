  // Needs the shared A2 shell from 39-a2-shell.js (a2Shell/a2Result/a2Keys/etc.), which loads first.
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
  // 10-tier ramp. `carves` = interior walls/pillars scattered through the board (the main obstacle
  // lever the player asked for) — sliding ice needs backstops, so denser walls = tighter, harder
  // routing. Crates capped at 4 (BFS-verified; 4-crate ice states blow up), so late difficulty comes
  // from board size + wall density + scramble depth.
  // Difficulty rises via WALL DENSITY (carves, the lever the player asked for) + scramble depth. Ice
  // crates are held at MAX 3 on purpose: 4-crate slide states blow the verifying BFS up (seconds per
  // level, often unsolvable-by-construction) — proven by simulation. So late levels lean on denser
  // pillar mazes and deeper scrambles, not a 4th crate.
  // 2026-07-17: ramp shifted UP after the player again called it "very easy" — L1 now starts at
  // 3 crates on a 9×8 (the old L5) and the top end grows to an 11×11 board with 10 pillars and an
  // 18-deep scramble. Crates stay capped at 3 (see the cap note above) — late difficulty comes from
  // board size + wall density + scramble depth, which the backstop-aware reverse construction
  // handles reliably.
  // 2026-07-18: harder per user — MORE ice cubes (3 → ramp to 5) and much deeper scrambles (8→30);
  // _skGenerateOne also now rejects any level that starts with a cube already on a target. Ice is
  // BFS-verified (10k→18k state cap, 24 attempts) so unmakeable candidates fall back to a preset.
  // Ice is BFS-verified and the state space explodes fast, so cube count stays at 3 to keep
  // generation snappy (>3 pushed the top tier to multi-second hangs). Difficulty ramps via deeper
  // scrambles (10→24, up from 8→18), bigger/denser boards, the icy look, and the new no-cube-starts-
  // on-a-target rule — a harder Glacier without the freeze risk of more cubes.
  var GLACIER_DIFFS = [
    { W: 9,  H: 8,  carves: 4,  crates: 3, scramble: 10 },
    { W: 9,  H: 8,  carves: 5,  crates: 3, scramble: 12 },
    { W: 9,  H: 9,  carves: 5,  crates: 3, scramble: 14 },
    { W: 10, H: 9,  carves: 6,  crates: 3, scramble: 16 },
    { W: 10, H: 9,  carves: 6,  crates: 3, scramble: 17 },
    { W: 10, H: 10, carves: 7,  crates: 3, scramble: 18 },
    { W: 10, H: 10, carves: 8,  crates: 3, scramble: 20 },
    { W: 11, H: 10, carves: 8,  crates: 3, scramble: 21 },
    { W: 11, H: 10, carves: 9,  crates: 3, scramble: 22 },
    { W: 11, H: 11, carves: 10, crates: 3, scramble: 24 }
  ];
  // Classic PUSH Sokoban (Cargo Bay). Push is guaranteed-solvable by the reverse-pull (no BFS), so
  // wall density can go much higher than Glacier — dense pillars + deep scrambles are the difficulty.
  // 2026-07-17: the player cleared the old ramp and still called it "very easy", twice — so the
  // whole ramp shifted UP: L1 starts where the old L4 was (3 crates in a pillar maze) and the top
  // end pushes to 8 crates / 26 walls / 46-deep scrambles. Push is replay-proven solvable and cheap
  // to generate, so this is safe; board width stays ≤11 (fixed 56px cells must fit the panel).
  // 2026-07-18: harder per user — MORE boxes (3 → ramp to 10) and deeper scrambles (12→62). Push is
  // guaranteed-solvable by the reverse-pull + replay proof (cheap, no BFS freeze), and _skGenerateOne
  // now rejects any level that starts with a box already on a target, so every run is a real puzzle.
  // crates cap 5: the no-pre-solved guard (every box must START off its ring) plus dense pillar mazes
  // makes 6+ fall back to a preset, so difficulty ramps via wall density + deep scrambles (16→54)
  // instead of raw box count. Push generation is cheap (guaranteed-solvable by replay, no BFS).
  var CARGO_DIFFS = [
    { W: 8,  H: 8,  carves: 8,  crates: 4, scramble: 16 },
    { W: 9,  H: 8,  carves: 10, crates: 4, scramble: 20 },
    { W: 9,  H: 9,  carves: 12, crates: 4, scramble: 24 },
    { W: 10, H: 9,  carves: 14, crates: 5, scramble: 28 },
    { W: 10, H: 10, carves: 16, crates: 5, scramble: 32 },
    { W: 10, H: 10, carves: 18, crates: 5, scramble: 36 },
    { W: 11, H: 10, carves: 20, crates: 5, scramble: 42 },
    { W: 11, H: 11, carves: 22, crates: 5, scramble: 44 },
    { W: 11, H: 11, carves: 23, crates: 5, scramble: 46 },
    { W: 11, H: 11, carves: 24, crates: 5, scramble: 48 }
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
  // Floor cells that touch at least one wall cell — the growth frontier for clustering new walls
  // onto existing ones instead of scattering them as isolated singletons.
  function _glWallAdjacentFloor(grid, W, H){
    var dirs = [[1,0],[-1,0],[0,1],[0,-1]], cand = [];
    for (var y = 1; y < H - 1; y++) for (var x = 1; x < W - 1; x++){
      if (!grid[y][x]) continue;
      for (var d = 0; d < 4; d++){
        var nx = x + dirs[d][0], ny = y + dirs[d][1];
        if (nx >= 0 && ny >= 0 && nx < W && ny < H && !grid[ny][nx]){ cand.push([x, y]); break; }
      }
    }
    return cand;
  }

  function _glCarveRegion(W, H, carves, minFloorFrac){
    var grid = [];
    for (var y = 0; y < H; y++){
      var row = [];
      for (var x = 0; x < W; x++) row.push(x > 0 && y > 0 && x < W - 1 && y < H - 1);
      grid.push(row);
    }
    // How much interior floor must survive. PUSH (Cargo) tolerates dense pillar mazes (low frac);
    // ICE (Glacier) does NOT — sliding crates need open lanes to reach a backstop, so a dense board
    // is usually unsolvable AND makes the verifying BFS crawl. Caller passes the right fraction.
    var minFloor = Math.max(9, Math.floor((W - 2) * (H - 2) * (minFloorFrac || 0.46)));
    var made = 0, attempts = carves * 12;
    // Player-requested: cluster new wall cells onto EXISTING wall cells most of the time, so carves
    // form short contiguous barriers/mazes (real detours) instead of scattered single-cell pillars
    // (which a crate/tile just slides around). ~78% of picks extend a cluster; the rest seed a fresh
    // one elsewhere, so a board still ends up with a handful of distinct clusters, not one blob.
    while (made < carves && attempts-- > 0){
      // Explicit reset, NOT just `var x, y;` — the grid-building loop above also used `x`/`y` (var is
      // function-scoped, not block-scoped), so a bare declaration here is a no-op and leaves x/y at
      // their post-loop values (W, H) on the very first iteration: an out-of-bounds grid[H][W] read,
      // 100% reproducible, every call. This one-line reset is the actual fix.
      var x = undefined, y = undefined;
      if (made > 0 && Math.random() < 0.78){
        var cand = _glWallAdjacentFloor(grid, W, H);
        if (cand.length){ var pick = cand[rand(0, cand.length - 1)]; x = pick[0]; y = pick[1]; }
      }
      if (x === undefined){ x = rand(1, W - 2); y = rand(1, H - 2); }
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
      var occ = {}; crates.forEach(function(c, i2){ if (i2 !== ci) occ[c[0] + ',' + c[1]] = 1; });
      // Choose the FORWARD push direction `d` — but ONLY a direction with a BACKSTOP just past the
      // crate's current cell (a wall or another crate at O+d). This is the whole ballgame for ice:
      // when the crate is later pushed forward in `d` it glides until it hits something, and it must
      // come to rest EXACTLY back on this origin cell (its target). Without a backstop it overshoots,
      // the target is never covered, and the level is unsolvable — which is why picking `d` at random
      // produced ~95% dead levels that silently fell back to a preset.
      var okDirs = [];
      for (var dd = 0; dd < 4; dd++){
        var bx = cx + dirs[dd][0], by = cy + dirs[dd][1], bk = bx + ',' + by;
        if (bx < 0 || by < 0 || bx >= W || by >= H || !grid[by][bx] || occ[bk]) okDirs.push(dirs[dd]);
      }
      if (!okDirs.length) continue;
      var d = okDirs[rand(0, okDirs.length - 1)];
      // Slide backwards (opposite `d`) from the crate's current cell as far as legal.
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
    // Ice (slide) states fan out further than one-cell push. Measured: a genuinely-solvable
    // reverse-constructed level here is confirmed in at most ~3.3k states (p90 ~1.5k), so a 10k cap
    // confirms every good level with margin while letting a genuinely-UNsolvable candidate bail ~6×
    // sooner than a huge cap would — keeping per-level generation snappy. Push confirms via
    // _skReplayPush and never reaches this BFS, so its cap can stay small.
    var q = [{ crates: crates, norm: r0.min }], iter = 0, CAP = slide ? 7000 : 5000;
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
    // Push levels are cheap to generate (guaranteed solvable by reverse-pull) and dense boards fail
    // more often, so give them a big retry budget. Ice levels are BFS-verified (each attempt costs
    // real time) but are tuned sparse enough to hit on the first few tries, so a smaller budget keeps
    // worst-case generation snappy.
    var maxAttempts = slide ? 12 : 420, minFloorFrac = slide ? 0.60 : 0.46;
    for (var attempt = 0; attempt < maxAttempts; attempt++){
      var grid = _glCarveRegion(diff.W, diff.H, diff.carves, minFloorFrac);
      var targets = _glPickTargets(grid, diff.W, diff.H, diff.crates, slide);
      if (!targets) continue;
      var ent = slide ? _glReversePlace(grid, diff.W, diff.H, targets, diff.scramble)
                      : _skReversePull(grid, diff.W, diff.H, targets, diff.scramble);
      if (!ent || !_glLooksSane(grid, diff.W, diff.H, ent)) continue;
      // NO crate/cube may START on a target (user 2026-07-18: "no box/ice cube should already be in
      // the target at the beginning") — every one must be pushed there. Rejecting any pre-covered
      // target also guarantees it's not already (partly) solved.
      var targetSet = {}; targets.forEach(function(t){ targetSet[t[0] + ',' + t[1]] = 1; });
      var noPreSolved = ent.crates.every(function(c){ return !targetSet[c[0] + ',' + c[1]]; });
      if (!noPreSolved) continue;
      var rows = _glToRows(grid, diff.W, diff.H, ent);
      // Slide: BFS-verify (multi-crate ice isn't guaranteed solvable by construction). Push: replay
      // the reverse-pull's OWN recorded solution — an actual proof this exact level is solvable.
      if (slide ? _glSolvable(rows, true) : _skReplayPush(rows, ent.solution)) return rows;
    }
    return fallback;
  }


  var SOKO = { title: '', replay: '', gameId: '', slide: false, levels: [], idx: 0, total: 0,
    diffs: null, fallbacks: null,
    walls: {}, targets: {}, crates: {}, px: 0, py: 0, W: 0, H: 0, moves: 0, totalMoves: 0, done: false, hist: [] };

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
    SOKO.H = rows.length; SOKO.W = rows[0].length; SOKO.moves = 0; SOKO.done = false; SOKO.hist = [];
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
    var h = '<div class="a2-grid' + (SOKO.slide ? ' soko-ice' : '') + '" style="grid-template-columns:repeat(' + SOKO.W + ',56px)">';
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
    // Grey out Undo when there's nothing to take back (parity with Block Forge's qbfUndoBtn).
    var ub = document.getElementById('skUndoBtn');
    if (ub) ub.disabled = SOKO.done || !SOKO.hist.length;
  }

  function sokoMove(dx, dy){
    if (SOKO.done || !a2Active()) return;
    var nx = SOKO.px + dx, ny = SOKO.py + dy, nk = nx + ',' + ny;
    if (SOKO.walls[nk]) return;
    // Snapshot the pre-move state; only committed to the undo stack once the move is certain to
    // happen (past the blocked-push early returns below), so a bumped-into-wall never records a step.
    var snap = { crates: JSON.stringify(SOKO.crates), px: SOKO.px, py: SOKO.py, moves: SOKO.moves };
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
    SOKO.hist.push(snap);
    if (SOKO.hist.length > 300) SOKO.hist.shift();
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
  function sokoUndo(){
    if (SOKO.done || !a2Active() || !SOKO.hist.length) return;
    var s = SOKO.hist.pop();
    SOKO.crates = JSON.parse(s.crates); SOKO.px = s.px; SOKO.py = s.py; SOKO.moves = s.moves;
    if (typeof playSfx === 'function') playSfx('click');
    _skRender();
  }
  function sokoRestart(){ _skParse(_skEnsureLevel(SOKO.idx)); _skRender(); }

  function _skLevel(){
    _skParse(_skEnsureLevel(SOKO.idx));
    var v = a2Shell(SOKO.title, 'openWonderland()',
      '<div class="wond-hud" id="skHud"></div>' + a2KeyLegend('Arrows / WASD move · Z undo · R restart') +
      '<div class="a2-center" id="skWrap"></div>' +
      '<div class="a2-pad">' +
        '<button type="button" class="btn btn-secondary" onclick="sokoMove(0,-1)">▲</button>' +
        '<div><button type="button" class="btn btn-secondary" onclick="sokoMove(-1,0)">◀</button>' +
        '<button type="button" class="btn btn-secondary" onclick="sokoMove(0,1)">▼</button>' +
        '<button type="button" class="btn btn-secondary" onclick="sokoMove(1,0)">▶</button></div>' +
        '<button type="button" class="btn btn-ghost" id="skUndoBtn" onclick="sokoUndo()" data-tooltip="Take back your last move.">↶ Undo</button>' +
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
      else if (e.key === 'z' || e.key === 'Z') sokoUndo();
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

  // A freshly generated (BFS-verified) set of GLACIER_DIFFS.length levels every run.
  function openGlacier(){
    gameWelcome('glacier', '❄️', 'Glacier Push',
      'Ice blocks SLIDE until they hit something. Plan your pushes! ' + GLACIER_DIFFS.length + ' fresh levels every run, harder and harder.',
      '_glacierStartRun');
  }
  function _glacierStartRun(){ SOKO.title = '❄️ Glacier Push'; SOKO.replay = 'openGlacier'; SOKO.gameId = 'glacier'; SOKO.slide = true; SOKO.diffs = GLACIER_DIFFS; SOKO.fallbacks = GLACIER_FALLBACK_LEVELS; SOKO.total = GLACIER_DIFFS.length; SOKO.levels = []; SOKO.idx = 0; SOKO.totalMoves = 0; _skLevel(); }

