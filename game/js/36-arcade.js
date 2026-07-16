  // ============================================================================
  // Wonderland arcade games (module 36) — original puzzle games that plug into
  // the existing #wonderlandView, sharing the wg* score/reward helpers from
  // 34-wonder-games.js. Each game runs in FOCUSED PLAY MODE: while #wonderlandView
  // is the active view, wonderland.css hides the whole app chrome so the game gets
  // the full screen; every game renders its own top bar (agTopBar) with a ← Back
  // button + compact player info (Cash / Passes).
  //
  // Games in this module (added in waves):
  //   • Star Match  🃏  — a memory / concentration pairs game.
  //   • Mini Sudoku 🔢  — a 4×4 Latin-square (2×2 boxes, digits 1–4) puzzle.
  //
  // All names/art are original (emoji + CSS/DOM, no external assets). Free to play,
  // reward Cash scaled by skill with a beat-your-best bonus; high scores persist in
  // state.miniGames (see 03-save.js).
  // ============================================================================

  // ---------- shared helpers ----------
  function agShowView(){
    document.querySelectorAll('.view-container').forEach(function(v){ v.classList.remove('active'); });
    var view = document.getElementById('wonderlandView');
    if (view) view.classList.add('active');
    return view;
  }
  function agCash(){ return (typeof state === 'object' && state) ? (state.coins || 0) : 0; }
  function agPasses(){ return (typeof state === 'object' && state) ? (state.wonderPasses || 0) : 0; }
  function agPlayerChips(){
    return '<span class="wond-chip">💵 <b>' + agCash() + '</b></span>' +
           '<span class="wond-chip">🎟️ <b>' + agPasses() + '</b></span>';
  }
  // Top bar: ← Back + title + player info (the only chrome shown in a game room).
  function agTopBar(title, backCall){
    return '<div class="wg-topbar">' +
      '<div class="wg-topbar-left">' +
        '<button type="button" class="btn btn-ghost wg-back" onclick="' + backCall + '" data-tooltip="Leave this game.">← Back</button>' +
        '<h2>' + title + '</h2>' +
      '</div>' +
      '<div class="wg-pinfo">' + agPlayerChips() + '</div>' +
    '</div>';
  }
  // Stop every arcade-game timer (called by wgStopAll on navigation).
  function agStopAll(){
    if (typeof memStop === 'function') memStop();
    if (typeof sudStop === 'function') sudStop();
    if (typeof popStop === 'function') popStop();
  }

  // ===========================================================================
  // Star Match 🃏 — flip two cards at a time and match every pair. Sequential
  // levels (no difficulty picker): grid size grows and preview time shrinks
  // as you advance, matching every other Wonderland game's pattern.
  // ===========================================================================
  var MEM_SYMBOLS = ['🚀','🪐','⭐','☄️','🌙','👽','🛸','🔭','🌌','⚡','🔥','💎'];
  var MEM_LEVELS = [
    { cols: 4, rows: 3, previewSecs: 5 },
    { cols: 4, rows: 4, previewSecs: 4 },
    { cols: 4, rows: 4, previewSecs: 3 },
    { cols: 5, rows: 4, previewSecs: 3 },
    { cols: 5, rows: 4, previewSecs: 2 }
  ];
  var MEM = { active: false, level: 0, cards: [], first: -1, matched: 0, moves: 0, lock: false, _t: null, _pt: null, previewLeft: 0, totalScore: 0 };

  function memPairs(level){ var c = MEM_LEVELS[level] || MEM_LEVELS[0]; return c.cols * c.rows / 2; }

  // Free to view (no pass charge) — the welcome screen's Play button charges via
  // wonderPlay('_memStartRun').
  function openMemory(){
    gameWelcome('memory', '🃏', 'Star Match',
      'Memorise the board, then match every cosmic pair! ' + MEM_LEVELS.length + ' levels, less preview time each round.',
      '_memStartRun');
  }

  function _memStartRun(){
    MEM.level = 0; MEM.totalScore = 0;
    _memSetup();
  }

  function _memSetup(){
    if (typeof wgStopAll === 'function') wgStopAll();
    var view = document.getElementById('wonderlandView'); if (!view) return;
    var conf = MEM_LEVELS[MEM.level] || MEM_LEVELS[MEM_LEVELS.length - 1];
    var pairs = conf.cols * conf.rows / 2;
    var syms = MEM_SYMBOLS.slice(0, pairs);
    var deck = syms.concat(syms).map(function(s){ return { sym: s, up: false, done: false }; });
    shuffle(deck);
    MEM.active = true; MEM.cards = deck; MEM.first = -1; MEM.matched = 0; MEM.moves = 0; MEM.lock = false;
    view.innerHTML =
      '<div class="wond-board wond-game">' +
        agTopBar('🃏 Star Match — Level ' + (MEM.level + 1) + ' / ' + MEM_LEVELS.length, 'openWonderland()') +
        '<div class="wond-hud" id="memHud"></div>' +
        '<div class="mem-grid" id="memGrid" style="grid-template-columns:repeat(' + conf.cols + ',1fr)"></div>' +
        '<p class="wond-tip">Click a card to flip it. Match all ' + pairs + ' pairs — fewer moves = more Cash!</p>' +
      '</div>';
    if (typeof playSfx === 'function') playSfx('ui-click');
    // Preview: reveal every card first, then hide them — later levels get less time to memorise.
    MEM.lock = true;
    MEM.previewLeft = conf.previewSecs;
    MEM.cards.forEach(function(c){ c.up = true; });
    memRender();
    if (MEM._pt) clearInterval(MEM._pt);
    MEM._pt = setInterval(function(){
      MEM.previewLeft--;
      if (MEM.previewLeft <= 0){
        clearInterval(MEM._pt); MEM._pt = null; MEM.previewLeft = 0;
        MEM.cards.forEach(function(c){ if (!c.done) c.up = false; });
        MEM.lock = false;
        memRender();
        if (typeof playSfx === 'function') playSfx('ui-click');
      } else { memHud(); }
    }, 1000);
  }

  function memHud(){
    var h = document.getElementById('memHud'); if (!h) return;
    if (MEM.previewLeft > 0){
      h.innerHTML = '<span class="wond-chip wond-chip-hot">👀 Memorise the board! <b>' + MEM.previewLeft + 's</b></span>';
      return;
    }
    h.innerHTML = '<span class="wond-chip">🎚️ Level <b>' + (MEM.level + 1) + ' / ' + MEM_LEVELS.length + '</b></span>' +
      '<span class="wond-chip">🃏 Pairs: <b>' + MEM.matched + ' / ' + memPairs(MEM.level) + '</b></span>' +
      '<span class="wond-chip">🔄 Moves: <b>' + MEM.moves + '</b></span>';
  }

  function memRender(){
    var g = document.getElementById('memGrid'); if (!g) return;
    g.innerHTML = MEM.cards.map(function(c, i){
      var cls = 'mem-card' + ((c.up || c.done) ? ' mem-up' : '') + (c.done ? ' mem-done' : '');
      return '<button type="button" class="' + cls + '" onclick="memFlip(' + i + ')"' + (c.done ? ' disabled' : '') + '>' +
        '<span class="mem-face">' + ((c.up || c.done) ? c.sym : '✦') + '</span></button>';
    }).join('');
    memHud();
  }

  function memFlip(i){
    if (!MEM.active || MEM.lock) return;
    var c = MEM.cards[i]; if (!c || c.up || c.done) return;
    c.up = true; memRender();
    if (typeof playSfx === 'function') playSfx('ui-click');
    if (MEM.first === -1){ MEM.first = i; return; }
    if (MEM.first === i) return;                              // ignore double-click same card
    MEM.moves++; memHud();
    var a = MEM.cards[MEM.first], b = c;
    if (a.sym === b.sym){
      a.done = b.done = true; MEM.matched++; MEM.first = -1;
      if (typeof playSfx === 'function') playSfx('solve-correct');
      memRender();
      if (MEM.matched >= memPairs(MEM.level)) memWin();
    } else {
      MEM.lock = true;
      if (typeof playSfx === 'function') playSfx('wrong');
      MEM._t = setTimeout(function(){ a.up = false; b.up = false; MEM.first = -1; MEM.lock = false; MEM._t = null; memRender(); }, 750);
    }
  }

  function memStop(){ MEM.active = false; if (MEM._t){ clearTimeout(MEM._t); MEM._t = null; } if (MEM._pt){ clearInterval(MEM._pt); MEM._pt = null; } MEM.previewLeft = 0; }

  // Cleared this level's pairs — advance to the next level for FREE (fresh shuffled board), or
  // end the run if that was the last level (matching the other Wonderland games' pattern).
  function memWin(){
    var pairs = memPairs(MEM.level), moves = MEM.moves;
    MEM.active = false;
    var extra = Math.max(0, moves - pairs);                  // wasted flips beyond a perfect run
    var levelScore = Math.max(20, pairs * 40 - extra * 6);
    MEM.totalScore += levelScore;
    if (MEM.level + 1 >= MEM_LEVELS.length){ _memGameOver(true); return; }
    if (typeof playSfx === 'function') playSfx('victory');
    if (typeof showToast === 'function') showToast('🌟 Level ' + (MEM.level + 1) + ' clear in ' + moves + ' moves! Next up!');
    MEM.level++;
    if (typeof a2Later === 'function') a2Later(_memSetup, 900); else setTimeout(_memSetup, 900);
  }

  function _memGameOver(wonAll){
    var total = MEM.totalScore, level = MEM.level;
    var newHigh = wgRecordScore('memory', total, level + 1);
    var coins = Math.round(total * 0.25) + (newHigh ? 20 : 0);
    wgPayReward({ coins: coins, newHigh: newHigh });
    var view = document.getElementById('wonderlandView'); if (!view) return;
    view.innerHTML =
      '<div class="wond-board wond-game">' +
        agTopBar('🃏 Star Match', 'openWonderland()') +
        '<div class="wond-head"><h2 class="wond-title">' + (wonAll ? '🌟 ALL LEVELS MATCHED! 🌟' : (newHigh ? '🏆 NEW BEST!' : '🎉 All matched!')) + '</h2>' +
          '<p class="wond-sub">Reached level <b>' + (level + 1) + ' / ' + MEM_LEVELS.length + '</b> · total score ' + total + '</p></div>' +
        '<div class="wond-result-card"><div class="wond-result-label">Reward</div>' +
          '<div class="wond-prizes"><span class="wond-chip wond-prize-chip">💵 Cash ×' + coins + '</span></div></div>' +
        '<div class="wond-footer" style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">' +
          '<button type="button" class="btn btn-primary" onclick="openMemory()" data-tooltip="Back to Star Match\'s welcome screen.">↻ Play Again</button>' +
          '<button type="button" class="btn btn-ghost" onclick="openWonderland()" data-tooltip="Back to the lobby.">← Lobby</button>' +
        '</div>' +
      '</div>';
  }

  // ===========================================================================
  // Mini Sudoku 🔢 — an N×N grid (k×k boxes, digits 1–N). Fill so every row,
  // column and box has 1–N exactly once. Win is validated by the RULES (not a
  // single fixed solution), so any valid completion counts. Sequential levels
  // (no difficulty picker): early levels are 4×4, later levels graduate to a
  // full 9×9 board for real high-difficulty play (SUD_LEVELS).
  // ===========================================================================
  var SUD_LEVELS = [
    { N: 4, k: 2, clues: 10 },
    { N: 4, k: 2, clues: 8 },
    { N: 4, k: 2, clues: 6 },
    { N: 9, k: 3, clues: 36 },
    { N: 9, k: 3, clues: 30 },
    { N: 9, k: 3, clues: 24 }
  ];
  var SUD = { active: false, level: 0, N: 4, k: 2, cells: [], given: [], startTs: 0, totalScore: 0, sel: 0 };

  // A random valid N×N Sudoku solution (box size k, N=k*k): start from the standard base grid
  // `(k*(r%k) + floor(r/k) + c) % N`, then relabel digits and apply validity-preserving shuffles —
  // rows/cols shuffled WITHIN their band/stack, whole bands/stacks reordered, optional transpose.
  // Generalizes the old hand-written 4×4-only swap logic to any box size.
  function sudGenSolution(N, k){
    var base = [];
    for (var r = 0; r < N; r++){
      var row = [];
      for (var c = 0; c < N; c++) row.push((k * (r % k) + Math.floor(r / k) + c) % N);
      base.push(row);
    }
    var perm = []; for (var d = 0; d < N; d++) perm.push(d); shuffle(perm);
    var grid = base.map(function(row){ return row.map(function(v){ return perm[v]; }); });

    function shuffledGroupOrder(){
      var groupOrder = []; for (var g = 0; g < k; g++) groupOrder.push(g); shuffle(groupOrder);
      var order = [];
      groupOrder.forEach(function(g){
        var within = []; for (var i = 0; i < k; i++) within.push(g * k + i); shuffle(within);
        order = order.concat(within);
      });
      return order;
    }
    var rowOrder = shuffledGroupOrder();
    grid = rowOrder.map(function(r){ return grid[r]; });
    var colOrder = shuffledGroupOrder();
    grid = grid.map(function(row){ return colOrder.map(function(c){ return row[c]; }); });

    if (rand(0, 1)){
      var t = [];
      for (var r2 = 0; r2 < N; r2++){ var row2 = []; for (var c2 = 0; c2 < N; c2++) row2.push(grid[c2][r2]); t.push(row2); }
      grid = t;
    }
    var flat = []; grid.forEach(function(row){ row.forEach(function(v){ flat.push(v + 1); }); });
    return flat;
  }

  // Indices that clash (same value seen twice in a row/col/box) — used to flag conflicts live.
  function sudConflicts(cells, N, k){
    var bad = {}, groups = [], r, c;
    for (r = 0; r < N; r++){ var g = []; for (c = 0; c < N; c++) g.push(r*N+c); groups.push(g); }
    for (c = 0; c < N; c++){ var g2 = []; for (r = 0; r < N; r++) g2.push(r*N+c); groups.push(g2); }
    for (var br = 0; br < k; br++) for (var bc = 0; bc < k; bc++){
      var g3 = [];
      for (var i = 0; i < k; i++) for (var j = 0; j < k; j++) g3.push((br*k+i)*N + (bc*k+j));
      groups.push(g3);
    }
    groups.forEach(function(g){
      for (var i = 0; i < g.length; i++) for (var j = i + 1; j < g.length; j++){
        var vi = cells[g[i]], vj = cells[g[j]];
        if (vi && vj && vi === vj){ bad[g[i]] = true; bad[g[j]] = true; }
      }
    });
    return bad;
  }

  // Free to view (no pass charge) — the welcome screen's Play button charges via
  // wonderPlay('_sudStartRun').
  function openSudoku(){
    gameWelcome('sudoku', '🔢', 'Mini Sudoku',
      'Drag numbered tiles so every row, column &amp; box is complete. ' + SUD_LEVELS.length + ' levels — grows from a 4×4 warm-up to a full 9×9!',
      '_sudStartRun');
  }

  function _sudStartRun(){
    SUD.level = 0; SUD.totalScore = 0;
    _sudSetup();
  }

  function _sudSetup(){
    if (typeof wgStopAll === 'function') wgStopAll();
    var view = document.getElementById('wonderlandView'); if (!view) return;
    var lv = SUD_LEVELS[SUD.level] || SUD_LEVELS[SUD_LEVELS.length - 1];
    var N = lv.N, k = lv.k, total = N * N;
    var sol = sudGenSolution(N, k);
    var idx = []; for (var i = 0; i < total; i++) idx.push(i); shuffle(idx);
    var given = []; for (var j = 0; j < total; j++) given[j] = false;
    for (var g = 0; g < lv.clues; g++) given[idx[g]] = true;
    var cells = []; for (var c = 0; c < total; c++) cells[c] = given[c] ? sol[c] : 0;
    SUD.active = true; SUD.N = N; SUD.k = k; SUD.cells = cells; SUD.given = given; SUD.startTs = (new Date()).getTime();
    view.innerHTML =
      '<div class="wond-board wond-game">' +
        agTopBar('🔢 Mini Sudoku — Level ' + (SUD.level + 1) + ' / ' + SUD_LEVELS.length, 'openWonderland()') +
        '<div class="wond-hud" id="sudHud"></div>' +
        '<div class="sud-grid" id="sudGrid"></div>' +
        '<div class="sud-tray" id="sudTray"></div>' +
        '<p class="wond-tip">DRAG a number tile into an empty cell — or tap a tile, then tap cells to stamp it. 🧽 erases. Fill every row, column and ' + k + '×' + k + ' box with 1–' + N + '.</p>' +
      '</div>';
    SUD.sel = 0;
    if (typeof playSfx === 'function') playSfx('ui-click');
    sudRender();
  }

  function sudRender(){
    var g = document.getElementById('sudGrid'); if (!g) return;
    var N = SUD.N, k = SUD.k;
    g.style.gridTemplateColumns = 'repeat(' + N + ', 1fr)';
    g.style.setProperty('--sud-font', N > 6 ? 'clamp(14px,3.2vw,22px)' : 'clamp(28px,7vw,46px)');
    var bad = sudConflicts(SUD.cells, N, k);
    g.innerHTML = SUD.cells.map(function(v, i){
      var r = Math.floor(i / N), c = i % N;
      var cls = 'sud-cell' + (SUD.given[i] ? ' sud-given' : '') + (bad[i] ? ' sud-bad' : '') +
        ((c % k === k - 1 && c < N - 1) ? ' sud-redge' : '') + ((r % k === k - 1 && r < N - 1) ? ' sud-bedge' : '');
      var dz = SUD.given[i] ? '' : ' data-dropzone="1" data-cell="' + i + '"';
      return '<button type="button" class="' + cls + '" onclick="sudTap(' + i + ')"' + (SUD.given[i] ? ' disabled' : '') + dz + '>' + (v || '') + '</button>';
    }).join('');
    // --sud-cell = the real rendered cell size, set on <html> (not just the grid) because the
    // drag ghost is appended straight to document.body — without a root-level copy the ghost
    // would fall back to its default size and look smaller than the cell it came from.
    var firstSudCell = g.querySelector('.sud-cell');
    if (firstSudCell) document.documentElement.style.setProperty('--sud-cell', firstSudCell.getBoundingClientRect().width + 'px');
    // Draggable 1-N tiles + eraser (POINTER-based — works on touch too). Click selects
    // (stamp mode); drag drops straight into a cell.
    var tray = document.getElementById('sudTray');
    if (tray){
      var nums = []; for (var n = 1; n <= N; n++) nums.push(n);
      var tiles = nums.map(function(n){
        return '<button type="button" class="sud-tile' + (SUD.sel === n ? ' sud-sel' : '') + '"' +
          ' onpointerdown="sudPointerDown(event,' + n + ')" onclick="sudPick(' + n + ')">' + n + '</button>';
      }).join('');
      tiles += '<button type="button" class="sud-tile sud-eraser' + (SUD.sel === -1 ? ' sud-sel' : '') + '"' +
        ' onpointerdown="sudPointerDown(event,-1)" onclick="sudPick(-1)" title="Eraser">🧽</button>';
      tray.innerHTML = tiles;
    }
    sudHud();
  }

  function sudPick(n){
    SUD.sel = (SUD.sel === n) ? 0 : n;                        // tap again to deselect
    if (typeof playSfx === 'function') playSfx('ui-click');
    sudRender();
  }
  function sudPointerDown(ev, n){
    if (!SUD.active) return;
    var ghost = '<div class="sud-drag-ghost-inner">' + (n === -1 ? '🧽' : n) + '</div>';
    a2DragStart(ev, n, ghost, function(dz, val){
      var i = parseInt(dz.getAttribute('data-cell'), 10);
      if (isNaN(i) || SUD.given[i]) return;
      SUD.cells[i] = (val === -1) ? 0 : val;
      if (typeof playSfx === 'function') playSfx('ui-click');
      sudRender();
      sudCheckWin();
    });
  }
  function sudCheckWin(){
    if (SUD.active && SUD.cells.every(function(v){ return v > 0; }) && Object.keys(sudConflicts(SUD.cells, SUD.N, SUD.k)).length === 0) sudWin();
  }

  function sudHud(){
    var h = document.getElementById('sudHud'); if (!h) return;
    var filled = SUD.cells.filter(function(v){ return v; }).length;
    h.innerHTML = '<span class="wond-chip">🎚️ Level <b>' + (SUD.level + 1) + ' / ' + SUD_LEVELS.length + '</b></span>' +
      '<span class="wond-chip">▦ Filled: <b>' + filled + ' / ' + (SUD.N * SUD.N) + '</b></span>';
  }

  function sudTap(i){
    if (!SUD.active || SUD.given[i]) return;
    if (SUD.sel){                                             // stamp mode: place the selected tile
      SUD.cells[i] = (SUD.sel === -1) ? 0 : SUD.sel;
    } else {
      SUD.cells[i] = (SUD.cells[i] + 1) % (SUD.N + 1);        // no tile selected: cycle 1→2→…→N→empty
    }
    if (typeof playSfx === 'function') playSfx('ui-click');
    sudRender();
    sudCheckWin();
  }

  function sudStop(){ SUD.active = false; if (typeof a2DragCancel === 'function') a2DragCancel(); }

  // Solved this level's puzzle — advance to the next level for FREE (fresh puzzle), or end the
  // run if that was the last level (matching Block Forge / Cosmic Rhythm's sequential pattern).
  function sudWin(){
    SUD.active = false;
    var secs = Math.round(((new Date()).getTime() - SUD.startTs) / 1000);
    var base = 50 + SUD.level * 20;
    var levelScore = base + Math.max(0, 180 - secs);          // faster solve → higher score
    SUD.totalScore += levelScore;
    if (SUD.level + 1 >= SUD_LEVELS.length){ _sudGameOver(true); return; }
    if (typeof playSfx === 'function') playSfx('victory');
    if (typeof showToast === 'function') showToast('🌟 Level ' + (SUD.level + 1) + ' clear in ' + secs + 's! Next up!');
    SUD.level++;
    if (typeof a2Later === 'function') a2Later(_sudSetup, 900); else setTimeout(_sudSetup, 900);
  }

  function _sudGameOver(wonAll){
    var total = SUD.totalScore, level = SUD.level;
    var newHigh = wgRecordScore('sudoku', total, level + 1);
    var coins = Math.round(total * 0.3) + (newHigh ? 20 : 0);
    wgPayReward({ coins: coins, newHigh: newHigh });
    if (typeof playSfx === 'function') playSfx('victory');
    var view = document.getElementById('wonderlandView'); if (!view) return;
    view.innerHTML =
      '<div class="wond-board wond-game">' +
        agTopBar('🔢 Mini Sudoku', 'openWonderland()') +
        '<div class="wond-head"><h2 class="wond-title">' + (wonAll ? '🌟 ALL LEVELS SOLVED! 🌟' : (newHigh ? '🏆 NEW BEST!' : '🎉 Solved!')) + '</h2>' +
          '<p class="wond-sub">Reached level <b>' + (level + 1) + ' / ' + SUD_LEVELS.length + '</b> · total score ' + total + '</p></div>' +
        '<div class="wond-result-card"><div class="wond-result-label">Reward</div>' +
          '<div class="wond-prizes"><span class="wond-chip wond-prize-chip">💵 Cash ×' + coins + '</span></div></div>' +
        '<div class="wond-footer" style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">' +
          '<button type="button" class="btn btn-primary" onclick="openSudoku()" data-tooltip="Back to Mini Sudoku\'s welcome screen.">↻ Play Again</button>' +
          '<button type="button" class="btn btn-ghost" onclick="openWonderland()" data-tooltip="Back to the lobby.">← Lobby</button>' +
        '</div>' +
      '</div>';
  }

  // ===========================================================================
  // 🎯 Pop-a-Tic-Tac-Toe — a redemption-cabinet ball-lock game, NOT adversarial
  // tic-tac-toe. Bet, then ROLL: 4 balls tumble and settle into 4 of the 9 cells.
  // After each roll you may FIX (hold) any of the settled balls, then roll again —
  // only the unfixed balls re-roll. You get 3 rolls per round (or bank early with
  // "Score Now"). The FINAL 4-cell pattern is paid out: Four Corners is the
  // jackpot, a 2×2 block or a complete tic-tac-toe line pay well, holding the
  // centre pays a small consolation.
  // ===========================================================================
  var POP_CELLS = 9, POP_BALLS = 4, POP_MAX_ROLLS = 3;
  var POP_CORNERS = [0, 2, 6, 8];
  var POP_LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  var POP_BLOCKS = [[0,1,3,4],[1,2,4,5],[3,4,6,7],[4,5,7,8]];
  var POP_PAYTABLE = [
    { tier: 'jackpot', label: '🎆 FOUR CORNERS!',     mult: 50 },
    { tier: 'big',     label: '🟦 SQUARE BLOCK!',     mult: 20 },
    { tier: 'win',     label: '✨ THREE IN A LINE!',  mult: 10 },
    { tier: 'small',   label: '⭐ Centre held!',       mult: 2 },
    { tier: 'none',    label: 'No pattern this round.', mult: 0 }
  ];
  var POP = { active: false, bet: 10, balls: [], fixed: [false,false,false,false],
              rollsLeft: POP_MAX_ROLLS, rolling: false, over: false, spent: 0 };

  // PURE: best-matching pattern for 4 occupied cells (0-8, no duplicates). Checked in payout order
  // so a hand only ever scores its single BEST tier, never stacked.
  function popEvaluate(cells){
    var set = {}; cells.forEach(function(c){ set[c] = 1; });
    if (POP_CORNERS.every(function(c){ return set[c]; }) && Object.keys(set).length === 4) return POP_PAYTABLE[0];
    for (var b = 0; b < POP_BLOCKS.length; b++){
      if (POP_BLOCKS[b].every(function(c){ return set[c]; })) return POP_PAYTABLE[1];
    }
    for (var L = 0; L < POP_LINES.length; L++){
      if (POP_LINES[L].every(function(c){ return set[c]; })) return POP_PAYTABLE[2];
    }
    if (set[4]) return POP_PAYTABLE[3];
    return POP_PAYTABLE[4];
  }

  function _popTotalBet(){ return POP.bet; }

  function openPopTicTacToe(){
    if (typeof wgStopAll === 'function') wgStopAll();
    var view = agShowView(); if (!view) return;
    POP.active = true; POP.bet = 10; POP.balls = []; POP.fixed = [false,false,false,false];
    POP.rollsLeft = POP_MAX_ROLLS; POP.rolling = false; POP.over = false;
    var payRows = POP_PAYTABLE.filter(function(p){ return p.mult > 0; }).map(function(p){
      return '<span class="wond-chip">' + p.label + ' ×<b>' + p.mult + '</b></span>';
    }).join('');
    view.innerHTML =
      '<div class="wond-board wond-game">' +
        agTopBar('🎯 Pop-a-Tic-Tac-Toe', 'openWonderland()') +
        '<div class="wond-hud" id="popHud"></div>' +
        '<div class="pop-grid" id="popGrid"></div>' +
        '<div class="sl-banner" id="popBanner">Click ROLL to pop 4 balls onto the board!</div>' +
        '<div class="sl-controls">' +
          '<div class="sl-row"><span class="sl-row-label">💵 Bet:</span>' +
            [10, 50, 100].map(function(n){ return '<button type="button" class="btn btn-secondary sl-opt sl-bet" data-n="' + n + '" onclick="popSetBet(' + n + ')">💵' + n + '</button>'; }).join('') +
          '</div>' +
          '<div class="sl-row">' +
            '<button type="button" class="btn btn-primary" id="popRollBtn" onclick="popRoll()">🎲 ROLL</button>' +
            '<button type="button" class="btn btn-secondary" id="popScoreBtn" onclick="popScoreNow()" disabled>✅ Score Now</button>' +
          '</div>' +
        '</div>' +
        '<div class="sl-paytable"><span class="wond-chip">Tap a settled ball to FIX it before your next roll · ' + POP_MAX_ROLLS + ' rolls per round</span>' + payRows + '</div>' +
      '</div>';
    popSetBet(10);
    _popRenderGrid();
    _popHud();
  }

  function popStop(){ POP.active = false; if (POP._tumble) { clearInterval(POP._tumble); POP._tumble = 0; } }

  function popSetBet(n){
    if (POP.rolling || (POP.balls.length && !POP.over)) return;   // no bet changes mid-round
    POP.bet = n;
    var btns = document.querySelectorAll('.sl-bet');
    for (var i = 0; i < btns.length; i++) btns[i].classList.toggle('sl-opt-on', +btns[i].getAttribute('data-n') === n);
  }

  function _popHud(){
    var hud = document.getElementById('popHud'); if (!hud) return;
    hud.innerHTML = '<span class="wond-chip">💵 Cash: <b>' + ((state && state.coins) || 0) + '</b></span>' +
      '<span class="wond-chip">🎯 Bet: <b>💵' + POP.bet + '</b></span>' +
      '<span class="wond-chip">🎲 Rolls left: <b>' + POP.rollsLeft + '</b></span>';
  }

  function _popRenderGrid(){
    var g = document.getElementById('popGrid'); if (!g) return;
    var ballAt = {};   // cell -> ball index
    POP.balls.forEach(function(c, i){ ballAt[c] = i; });
    var html = '';
    for (var c = 0; c < POP_CELLS; c++){
      var i = ballAt[c];
      var has = i !== undefined && POP.balls[i] >= 0;   // exclude the -1..-4 pre-first-tumble placeholders
      var cls = 'pop-cell' + (has && POP.fixed[i] ? ' pop-cell-fixed' : '');
      var dis = (!has || POP.rolling || POP.over) ? ' disabled' : '';
      html += '<button type="button" class="' + cls + '" onclick="popToggleFix(' + c + ')"' + dis + '>' +
        (has ? '🔴' : '') + '</button>';
    }
    g.innerHTML = html;
  }

  // Toggle FIX on the ball currently sitting in cell `c` (only between rolls, never mid-round-over).
  function popToggleFix(c){
    if (!POP.active || POP.rolling || POP.over || !POP.balls.length || POP.rollsLeft <= 0) return;
    var i = POP.balls.indexOf(c);
    if (i === -1) return;
    POP.fixed[i] = !POP.fixed[i];
    if (typeof playSfx === 'function') playSfx('click');
    _popRenderGrid();
  }

  function popRoll(){
    if (!POP.active || POP.rolling || POP.over) return;
    var firstRoll = POP.balls.length === 0;
    if (firstRoll){
      var bet = _popTotalBet();
      if (!state || (state.coins || 0) < bet){
        if (typeof showToast === 'function') showToast('Not enough Cash for that bet!');
        if (typeof playSfx === 'function') playSfx('wrong');
        return;
      }
      state.coins -= bet;
      if (typeof updateStats === 'function') updateStats();
      POP.balls = [-1, -2, -3, -4];   // placeholders, all "unfixed" until the first settle
      POP.fixed = [false, false, false, false];
    }
    if (POP.rollsLeft <= 0) return;
    POP.rolling = true;
    var rollBtn = document.getElementById('popRollBtn'); if (rollBtn) rollBtn.disabled = true;
    var scoreBtn = document.getElementById('popScoreBtn'); if (scoreBtn) scoreBtn.disabled = true;
    var banner = document.getElementById('popBanner'); if (banner){ banner.textContent = 'Rolling…'; banner.className = 'sl-banner'; }
    if (typeof playSfx === 'function') playSfx('click');
    // Visual shuffle: reassign unfixed balls to random free cells rapidly, then settle for real.
    POP._tumble = a2Every(function(){ _popShuffleUnfixed(); _popRenderGrid(); }, 80);
    a2Later(function(){
      if (POP._tumble){ clearInterval(POP._tumble); POP._tumble = 0; }
      _popShuffleUnfixed();
      POP.rollsLeft--;
      POP.rolling = false;
      _popRenderGrid();
      _popHud();
      if (typeof playSfx === 'function') playSfx('click');
      var rb = document.getElementById('popRollBtn'), sb = document.getElementById('popScoreBtn');
      if (POP.rollsLeft <= 0){
        _popSettle();
      } else {
        if (rb) rb.disabled = false;
        if (sb) sb.disabled = false;
        var bn = document.getElementById('popBanner'); if (bn) bn.textContent = 'Fix any balls you want to keep, then roll again.';
      }
    }, 650);
  }

  // Assigns every UNFIXED ball a fresh random cell, distinct from every ball's (fixed or not) cell.
  function _popShuffleUnfixed(){
    var occupied = {};
    POP.balls.forEach(function(c, i){ if (POP.fixed[i] && c >= 0) occupied[c] = 1; });
    for (var i = 0; i < POP_BALLS; i++){
      if (POP.fixed[i]) continue;
      var c;
      do { c = rand(0, POP_CELLS - 1); } while (occupied[c]);
      POP.balls[i] = c;
      occupied[c] = 1;
    }
  }

  // Bank the CURRENT pattern immediately instead of using remaining rolls.
  function popScoreNow(){
    if (!POP.active || POP.rolling || POP.over || !POP.balls.length || POP.balls[0] < 0) return;
    POP.rollsLeft = 0;
    _popSettle();
  }

  function _popSettle(){
    POP.over = true;
    var result = popEvaluate(POP.balls);
    var win = Math.round(_popTotalBet() * result.mult);
    var banner = document.getElementById('popBanner'), cls = 'sl-banner';
    var msg;
    if (win > 0){
      msg = result.label + ' +💵' + win + '!';
      cls += result.tier === 'jackpot' ? ' sl-win sl-jackpot' : ' sl-win';
      state.coins = (state.coins || 0) + win;
      if (typeof playSfx === 'function') playSfx(result.tier === 'jackpot' ? 'victory' : 'loot');
    } else {
      msg = '💫 ' + result.label + ' Try again!';
      if (typeof playSfx === 'function') playSfx('wrong');
    }
    if (typeof updateStats === 'function') updateStats();
    if (typeof saveGame === 'function') saveGame();
    if (banner){ banner.textContent = msg; banner.className = cls; }
    if (result.mult > 0){
      var cells = document.querySelectorAll('#popGrid .pop-cell');
      POP.balls.forEach(function(c){ if (cells[c]) cells[c].classList.add('pop-cell-win'); });
    }
    var rb = document.getElementById('popRollBtn'), sb = document.getElementById('popScoreBtn');
    if (rb){ rb.disabled = false; rb.textContent = '🎲 New Round'; }
    if (sb) sb.disabled = true;
    // Reset state for the NEXT round now (safe — the win highlight lives in the grid buttons'
    // CSS classes, already painted, and isn't touched again until the next roll's tumble redraws
    // the grid). Doing this synchronously avoids a delayed-reset race with a fast double-click.
    POP.balls = []; POP.fixed = [false,false,false,false]; POP.rollsLeft = POP_MAX_ROLLS; POP.over = false;
    _popHud();
  }
