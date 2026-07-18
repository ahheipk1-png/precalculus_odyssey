  // Needs the shared A2 shell from 39-a2-shell.js (a2Shell/a2Result/a2Keys/etc.), which loads first.
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

  // 10-tier difficulty ramp — `barriers` = mandatory gate pairs the panda must clear to reach the
  // exit (board width = 3*barriers+4, drawn with responsive cells). `decoys` = unique-colour red
  // herrings. `mirrors` = SAME-COLOUR decoys: extra tiles that share a real gate pair's colour, so
  // the player sees several identical-looking blocks and must push the RIGHT one to open the door —
  // exactly the misdirection the player asked for. Mirrors are placed off the gate rows so they can
  // never sit in a gate tile's slide path (which would break the guaranteed solution).
  // 2026-07-17: ramp shifted UP ("very easy" feedback, twice) — no more 1-gate warm-up: L1 starts
  // at 2 gates with a same-colour mirror decoy already in play, and the top end is 6 gates on an
  // 11-tall palace with 4 unique decoys + 6 mirrors. Label budget: 6 gates + 4 decoys = 10 of the
  // 13 SHIK_TILE types (mirrors reuse gate labels), so no exhaustion.
  // 2026-07-18: MUCH more confusing per user ("add 5× more tiles"). Barriers set the board width
  // (=3·barriers+4) and the label budget, so they stay in range; the ~5× extra tiles come from
  // `mirrors` — same-colour decoys placed OFF the gate rows (they never block the guaranteed
  // solution), which is exactly the "which identical block do I push?" confusion. Taller boards (H)
  // give the swarm of mirrors somewhere to live. Gates(≤6)+decoys(≤7)=13 = the full SHIK_TILE budget.
  var SHIK_DIFFS = [
    { barriers: 2, H: 9,  decoys: 2, mirrors: 5 },
    { barriers: 2, H: 9,  decoys: 3, mirrors: 7 },
    { barriers: 3, H: 10, decoys: 3, mirrors: 9 },
    { barriers: 3, H: 10, decoys: 4, mirrors: 11 },
    { barriers: 4, H: 11, decoys: 4, mirrors: 13 },
    { barriers: 4, H: 11, decoys: 5, mirrors: 15 },
    { barriers: 5, H: 12, decoys: 5, mirrors: 18 },
    { barriers: 5, H: 12, decoys: 6, mirrors: 21 },
    { barriers: 6, H: 13, decoys: 6, mirrors: 24 },
    { barriers: 6, H: 13, decoys: 7, mirrors: 28 }
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

  function _shikConstruct(board, decoys, mirrors){
    var W = board.W, H = board.H, walls = board.walls, exit = board.exit, gates = board.gates;
    var tiles = {}, rev = [], player = exit.slice(), li = 0, gateLabels = [];
    var gateRows = {}; for (var gi = 0; gi < gates.length; gi++) gateRows[gates[gi][1]] = 1;
    function key(p){ return p[0] + ',' + p[1]; }
    function open(x, y){ return !walls[x + ',' + y]; }
    function shuffle(a){ for (var s = a.length - 1; s > 0; s--){ var j = rand(0, s); var t = a[s]; a[s] = a[j]; a[j] = t; } return a; }
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
      tiles[key(gate)] = label; tiles[key(stationary)] = label; gateLabels.push(label);
      player = behind.slice();
      rev.push('L');                                       // forward: push the gate tile LEFT into its twin
    }
    // Reposition the panda deeper into the rightmost chamber so it doesn't start on a gate.
    var finalGateX = gates[gates.length - 1][0], reach = _shikReachSet(W, H, walls, tiles, player), far = [];
    for (var rk in reach){ var rp = rk.split(','); if (+rp[0] > finalGateX) far.push([+rp[0], +rp[1]]); }
    if (far.length) walkTo(far[rand(0, far.length - 1)]);
    // Extra tiles. Any bad placement (blocking the panda's walk) is caught by the replay check in
    // _shikGenerateOne, which just retries. `mirrors` (same colour as a real gate pair) go ONLY in
    // non-gate rows so they can never sit in a gate tile's horizontal slide path.
    var occ = {}; for (var tkk in tiles) occ[tkk] = 1; occ[key(player)] = 1; occ[key(exit)] = 1;
    var anyCells = [], offRow = [];
    for (var y = 1; y < H - 1; y++) for (var x = 1; x < W - 1; x++){
      var ck = x + ',' + y; if (walls[ck] || occ[ck]) continue;
      anyCells.push([x, y]); if (!gateRows[y]) offRow.push([x, y]);
    }
    shuffle(offRow);
    // Same-colour MIRROR decoys first (off the gate rows) — the player sees several identical tiles
    // and must push the correct gate tile to open the door.
    for (var m = 0; m < (mirrors || 0) && gateLabels.length && offRow.length; m++){
      var mc = offRow.pop(); occ[key(mc)] = 1;
      tiles[key(mc)] = gateLabels[rand(0, gateLabels.length - 1)];
    }
    // Unique-colour decoys in any remaining free cell.
    shuffle(anyCells);
    for (var d = 0; d < (decoys || 0) && li < _SHIK_LABELS.length; d++){
      while (anyCells.length && occ[key(anyCells[anyCells.length - 1])]) anyCells.pop();
      if (!anyCells.length) break;
      var dc = anyCells.pop(); occ[key(dc)] = 1; tiles[key(dc)] = _SHIK_LABELS[li++];
    }
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
    for (var attempt = 0; attempt < 40; attempt++){
      var board = _shikMakeBoard(diff.H, diff.barriers);
      var ent = _shikConstruct(board, diff.decoys || 0, diff.mirrors || 0);
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
    // Grey out Undo when there's nothing to take back (parity with Cargo/Glacier/Block Forge).
    var ub = document.getElementById('shikUndoBtn');
    if (ub) ub.disabled = SHIK.done || !SHIK.hist.length;
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
        '<button type="button" class="btn btn-ghost" id="shikUndoBtn" onclick="shikUndo()" data-tooltip="Take back your last move.">↶ Undo</button>' +
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

