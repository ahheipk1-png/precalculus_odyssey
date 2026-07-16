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
  // Star Match 🃏 — flip two cards at a time and match every pair.
  // ===========================================================================
  var MEM_SYMBOLS = ['🚀','🪐','⭐','☄️','🌙','👽','🛸','🔭','🌌','⚡','🔥','💎'];
  var MEM_CONF = { easy: { cols: 4, rows: 3, name: 'Easy' }, normal: { cols: 4, rows: 4, name: 'Normal' }, hard: { cols: 5, rows: 4, name: 'Hard' } };
  var MEM = { active: false, diff: 'easy', cards: [], first: -1, matched: 0, moves: 0, lock: false, _t: null, _pt: null, previewLeft: 0 };

  function memPairs(diff){ var c = MEM_CONF[diff] || MEM_CONF.easy; return c.cols * c.rows / 2; }

  function openMemory(){
    if (typeof wgStopAll === 'function') wgStopAll();
    var view = agShowView(); if (!view) return;
    var m = wgMini('memory');
    view.innerHTML =
      '<div class="wond-board wond-game">' +
        agTopBar('🃏 Star Match', 'openWonderland()') +
        '<p class="wond-sub" style="text-align:center;margin-bottom:14px">Flip two cards at a time — match every pair in as few moves as you can!</p>' +
        '<div class="wg-diff-row" style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
          '<button type="button" class="btn btn-primary" onclick="memStart(\'easy\')" data-tooltip="6 pairs · 4×3 grid.">🟢 Easy · 6 pairs</button>' +
          '<button type="button" class="btn btn-primary" onclick="memStart(\'normal\')" data-tooltip="8 pairs · 4×4 grid.">🟡 Normal · 8 pairs</button>' +
          '<button type="button" class="btn btn-primary" onclick="memStart(\'hard\')" data-tooltip="10 pairs · 5×4 grid. Best Cash.">🔴 Hard · 10 pairs</button>' +
        '</div>' +
        '<p class="wond-sub" style="text-align:center;margin-top:18px">🏆 Best score: <b>' + (m.highScore || 0) + '</b></p>' +
      '</div>';
  }

  function memStart(diff){
    if (typeof wgStopAll === 'function') wgStopAll();
    var view = document.getElementById('wonderlandView'); if (!view) return;
    var conf = MEM_CONF[diff] || MEM_CONF.easy;
    var pairs = conf.cols * conf.rows / 2;
    var syms = MEM_SYMBOLS.slice(0, pairs);
    var deck = syms.concat(syms).map(function(s){ return { sym: s, up: false, done: false }; });
    shuffle(deck);
    MEM.active = true; MEM.diff = diff; MEM.cards = deck; MEM.first = -1; MEM.matched = 0; MEM.moves = 0; MEM.lock = false;
    view.innerHTML =
      '<div class="wond-board wond-game">' +
        agTopBar('🃏 Star Match · ' + conf.name, 'openMemory()') +
        '<div class="wond-hud" id="memHud"></div>' +
        '<div class="mem-grid" id="memGrid" style="grid-template-columns:repeat(' + conf.cols + ',1fr)"></div>' +
        '<p class="wond-tip">Click a card to flip it. Match all ' + pairs + ' pairs — fewer moves = more Cash!</p>' +
      '</div>';
    if (typeof playSfx === 'function') playSfx('ui-click');
    // Preview: reveal every card first — 5s easy, 3s normal, 2s hard — then hide them.
    var previewSecs = diff === 'hard' ? 2 : (diff === 'normal' ? 3 : 5);
    MEM.lock = true;
    MEM.previewLeft = previewSecs;
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
    h.innerHTML = '<span class="wond-chip">🃏 Pairs: <b>' + MEM.matched + ' / ' + memPairs(MEM.diff) + '</b></span>' +
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
      if (MEM.matched >= memPairs(MEM.diff)) memWin();
    } else {
      MEM.lock = true;
      if (typeof playSfx === 'function') playSfx('wrong');
      MEM._t = setTimeout(function(){ a.up = false; b.up = false; MEM.first = -1; MEM.lock = false; MEM._t = null; memRender(); }, 750);
    }
  }

  function memStop(){ MEM.active = false; if (MEM._t){ clearTimeout(MEM._t); MEM._t = null; } if (MEM._pt){ clearInterval(MEM._pt); MEM._pt = null; } MEM.previewLeft = 0; }

  function memWin(){
    var pairs = memPairs(MEM.diff), moves = MEM.moves, diff = MEM.diff;
    MEM.active = false;
    var extra = Math.max(0, moves - pairs);                  // wasted flips beyond a perfect run
    var score = Math.max(20, pairs * 40 - extra * 6);
    var newHigh = wgRecordScore('memory', score, diff);
    var coins = Math.round(score * 0.25) + (newHigh ? 20 : 0);
    wgPayReward({ coins: coins, newHigh: newHigh });
    var view = document.getElementById('wonderlandView'); if (!view) return;
    view.innerHTML =
      '<div class="wond-board wond-game">' +
        agTopBar('🃏 Star Match', 'openMemory()') +
        '<div class="wond-head"><h2 class="wond-title">' + (newHigh ? '🏆 NEW BEST!' : '🎉 All matched!') + '</h2>' +
          '<p class="wond-sub">' + pairs + ' pairs in <b>' + moves + '</b> moves · score ' + score + '</p></div>' +
        '<div class="wond-result-card"><div class="wond-result-label">Reward</div>' +
          '<div class="wond-prizes"><span class="wond-chip wond-prize-chip">💵 Cash ×' + coins + '</span></div></div>' +
        '<div class="wond-footer" style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">' +
          '<button type="button" class="btn btn-primary" onclick="memStart(\'' + diff + '\')" data-tooltip="Play this difficulty again.">↻ Play again</button>' +
          '<button type="button" class="btn btn-ghost" onclick="openMemory()" data-tooltip="Change difficulty.">🎚️ Difficulty</button>' +
          '<button type="button" class="btn btn-ghost" onclick="openWonderland()" data-tooltip="Back to the lobby.">← Lobby</button>' +
        '</div>' +
      '</div>';
  }

  // ===========================================================================
  // Mini Sudoku 🔢 — a 4×4 grid (2×2 boxes, digits 1–4). Fill so every row,
  // column and box has 1–4 exactly once. Win is validated by the RULES (not a
  // single fixed solution), so any valid completion counts.
  // ===========================================================================
  var SUD_CONF = { easy: { clues: 10, name: 'Easy' }, normal: { clues: 8, name: 'Normal' }, hard: { clues: 6, name: 'Hard' } };
  var SUD_BOXES = [[0,1,4,5],[2,3,6,7],[8,9,12,13],[10,11,14,15]];
  var SUD = { active: false, diff: 'easy', cells: [], given: [], startTs: 0 };

  // A random valid 4×4 solution: relabel + validity-preserving row/col/band/stack swaps + transpose.
  function sudGenSolution(){
    var grid = [1,2,3,4, 3,4,1,2, 2,1,4,3, 4,3,2,1];
    var perm = [1,2,3,4]; shuffle(perm);
    grid = grid.map(function(v){ return perm[v - 1]; });
    function swapRows(a, b){ for (var c = 0; c < 4; c++){ var t = grid[a*4+c]; grid[a*4+c] = grid[b*4+c]; grid[b*4+c] = t; } }
    function swapCols(a, b){ for (var r = 0; r < 4; r++){ var t = grid[r*4+a]; grid[r*4+a] = grid[r*4+b]; grid[r*4+b] = t; } }
    if (rand(0,1)) swapRows(0,1);
    if (rand(0,1)) swapRows(2,3);
    if (rand(0,1)) swapCols(0,1);
    if (rand(0,1)) swapCols(2,3);
    if (rand(0,1)){ swapRows(0,2); swapRows(1,3); }          // swap the two horizontal bands
    if (rand(0,1)){ swapCols(0,2); swapCols(1,3); }          // swap the two vertical stacks
    if (rand(0,1)){ var t = grid.slice(); for (var r = 0; r < 4; r++) for (var c = 0; c < 4; c++) grid[c*4+r] = t[r*4+c]; }  // transpose
    return grid;
  }

  // Indices that clash (same value seen twice in a row/col/box) — used to flag conflicts live.
  function sudConflicts(cells){
    var bad = {}, groups = [], r, c;
    for (r = 0; r < 4; r++){ var g = []; for (c = 0; c < 4; c++) g.push(r*4+c); groups.push(g); }
    for (c = 0; c < 4; c++){ var g2 = []; for (r = 0; r < 4; r++) g2.push(r*4+c); groups.push(g2); }
    SUD_BOXES.forEach(function(b){ groups.push(b); });
    groups.forEach(function(g){
      for (var i = 0; i < g.length; i++) for (var j = i + 1; j < g.length; j++){
        var vi = cells[g[i]], vj = cells[g[j]];
        if (vi && vj && vi === vj){ bad[g[i]] = true; bad[g[j]] = true; }
      }
    });
    return bad;
  }

  function openSudoku(){
    if (typeof wgStopAll === 'function') wgStopAll();
    var view = agShowView(); if (!view) return;
    var m = wgMini('sudoku');
    view.innerHTML =
      '<div class="wond-board wond-game">' +
        agTopBar('🔢 Mini Sudoku', 'openWonderland()') +
        '<p class="wond-sub" style="text-align:center;margin-bottom:14px">Fill the 4×4 grid so every row, column and 2×2 box has 1, 2, 3 and 4.</p>' +
        '<div class="wg-diff-row" style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
          '<button type="button" class="btn btn-primary" onclick="sudStart(\'easy\')" data-tooltip="10 given numbers.">🟢 Easy</button>' +
          '<button type="button" class="btn btn-primary" onclick="sudStart(\'normal\')" data-tooltip="8 given numbers.">🟡 Normal</button>' +
          '<button type="button" class="btn btn-primary" onclick="sudStart(\'hard\')" data-tooltip="6 given numbers. Best Cash.">🔴 Hard</button>' +
        '</div>' +
        '<p class="wond-sub" style="text-align:center;margin-top:18px">🏆 Best score: <b>' + (m.highScore || 0) + '</b></p>' +
      '</div>';
  }

  function sudStart(diff){
    if (typeof wgStopAll === 'function') wgStopAll();
    var view = document.getElementById('wonderlandView'); if (!view) return;
    var conf = SUD_CONF[diff] || SUD_CONF.easy;
    var sol = sudGenSolution();
    var idx = []; for (var i = 0; i < 16; i++) idx.push(i); shuffle(idx);
    var given = []; for (var j = 0; j < 16; j++) given[j] = false;
    for (var k = 0; k < conf.clues; k++) given[idx[k]] = true;
    var cells = []; for (var c = 0; c < 16; c++) cells[c] = given[c] ? sol[c] : 0;
    SUD.active = true; SUD.diff = diff; SUD.cells = cells; SUD.given = given; SUD.startTs = (new Date()).getTime();
    view.innerHTML =
      '<div class="wond-board wond-game">' +
        agTopBar('🔢 Mini Sudoku · ' + conf.name, 'openSudoku()') +
        '<div class="wond-hud" id="sudHud"></div>' +
        '<div class="sud-grid" id="sudGrid"></div>' +
        '<div class="sud-tray" id="sudTray"></div>' +
        '<p class="wond-tip">DRAG a number tile into an empty cell — or tap a tile, then tap cells to stamp it. 🧽 erases.</p>' +
      '</div>';
    SUD.sel = 0;
    if (typeof playSfx === 'function') playSfx('ui-click');
    sudRender();
  }

  function sudRender(){
    var g = document.getElementById('sudGrid'); if (!g) return;
    var bad = sudConflicts(SUD.cells);
    g.innerHTML = SUD.cells.map(function(v, i){
      var r = Math.floor(i / 4), c = i % 4;
      var cls = 'sud-cell' + (SUD.given[i] ? ' sud-given' : '') + (bad[i] ? ' sud-bad' : '') + (c === 1 ? ' sud-redge' : '') + (r === 1 ? ' sud-bedge' : '');
      var dz = SUD.given[i] ? '' : ' data-dropzone="1" data-cell="' + i + '"';
      return '<button type="button" class="' + cls + '" onclick="sudTap(' + i + ')"' + (SUD.given[i] ? ' disabled' : '') + dz + '>' + (v || '') + '</button>';
    }).join('');
    // Draggable 1-4 tiles + eraser (POINTER-based — works on touch too). Click selects
    // (stamp mode); drag drops straight into a cell.
    var tray = document.getElementById('sudTray');
    if (tray){
      var tiles = [1, 2, 3, 4].map(function(n){
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
    if (SUD.active && SUD.cells.every(function(v){ return v > 0; }) && Object.keys(sudConflicts(SUD.cells)).length === 0) sudWin();
  }

  function sudHud(){
    var h = document.getElementById('sudHud'); if (!h) return;
    var filled = SUD.cells.filter(function(v){ return v; }).length;
    h.innerHTML = '<span class="wond-chip">▦ Filled: <b>' + filled + ' / 16</b></span>';
  }

  function sudTap(i){
    if (!SUD.active || SUD.given[i]) return;
    if (SUD.sel){                                             // stamp mode: place the selected tile
      SUD.cells[i] = (SUD.sel === -1) ? 0 : SUD.sel;
    } else {
      SUD.cells[i] = (SUD.cells[i] + 1) % 5;                  // no tile selected: cycle 1→2→3→4→empty
    }
    if (typeof playSfx === 'function') playSfx('ui-click');
    sudRender();
    sudCheckWin();
  }

  function sudStop(){ SUD.active = false; if (typeof a2DragCancel === 'function') a2DragCancel(); }

  function sudWin(){
    var diff = SUD.diff; SUD.active = false;
    var secs = Math.round(((new Date()).getTime() - SUD.startTs) / 1000);
    var base = { easy: 60, normal: 100, hard: 160 }[diff] || 60;
    var score = base + Math.max(0, 180 - secs);              // faster solve → higher score
    var newHigh = wgRecordScore('sudoku', score, diff);
    var coins = Math.round(score * 0.3) + (newHigh ? 20 : 0);
    wgPayReward({ coins: coins, newHigh: newHigh });
    if (typeof playSfx === 'function') playSfx('victory');
    var view = document.getElementById('wonderlandView'); if (!view) return;
    view.innerHTML =
      '<div class="wond-board wond-game">' +
        agTopBar('🔢 Mini Sudoku', 'openSudoku()') +
        '<div class="wond-head"><h2 class="wond-title">' + (newHigh ? '🏆 NEW BEST!' : '🎉 Solved!') + '</h2>' +
          '<p class="wond-sub">Solved in <b>' + secs + 's</b> · score ' + score + '</p></div>' +
        '<div class="wond-result-card"><div class="wond-result-label">Reward</div>' +
          '<div class="wond-prizes"><span class="wond-chip wond-prize-chip">💵 Cash ×' + coins + '</span></div></div>' +
        '<div class="wond-footer" style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">' +
          '<button type="button" class="btn btn-primary" onclick="sudStart(\'' + diff + '\')" data-tooltip="New puzzle, same difficulty.">↻ New puzzle</button>' +
          '<button type="button" class="btn btn-ghost" onclick="openSudoku()" data-tooltip="Change difficulty.">🎚️ Difficulty</button>' +
          '<button type="button" class="btn btn-ghost" onclick="openWonderland()" data-tooltip="Back to the lobby.">← Lobby</button>' +
        '</div>' +
      '</div>';
  }

  // ===========================================================================
  // 🎯 Pop-a-Tic-Tac-Toe — pop your ball (🔴) to make three-in-a-row before the
  // CPU (🔵). Inspired by the redemption cabinet. Difficulty sets the CPU's smarts
  // (easy = random, normal = win/block, hard = perfect minimax). You always go first.
  // ===========================================================================
  var POP = { active: false, diff: 'normal', board: [], turn: 'X', over: false, moves: 0 };
  var POP_WINLINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  var POP_MARK = { X: '🔴', O: '🔵' };

  function openPopTicTacToe(){
    if (typeof wgStopAll === 'function') wgStopAll();
    var view = agShowView(); if (!view) return;
    var m = wgMini('poptictactoe');
    view.innerHTML =
      '<div class="wond-board wond-game">' +
        agTopBar('🎯 Pop-a-Tic-Tac-Toe', 'openWonderland()') +
        '<p class="wond-sub" style="text-align:center;margin-bottom:14px">Pop your 🔴 ball into three in a row before the 🔵 CPU does — you go first!</p>' +
        '<div class="wg-diff-row" style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
          '<button type="button" class="btn btn-primary" onclick="popStart(\'easy\')" data-tooltip="CPU plays randomly.">🟢 Easy</button>' +
          '<button type="button" class="btn btn-primary" onclick="popStart(\'normal\')" data-tooltip="CPU takes wins and blocks.">🟡 Normal</button>' +
          '<button type="button" class="btn btn-primary" onclick="popStart(\'hard\')" data-tooltip="CPU plays perfectly. Best Cash.">🔴 Hard</button>' +
        '</div>' +
        '<p class="wond-sub" style="text-align:center;margin-top:18px">🏆 Best score: <b>' + (m.highScore || 0) + '</b></p>' +
      '</div>';
  }

  function popStop(){ POP.active = false; }

  function popStart(diff){
    if (typeof wgStopAll === 'function') wgStopAll();
    var view = document.getElementById('wonderlandView'); if (!view) return;
    POP.active = true; POP.diff = diff; POP.board = ['', '', '', '', '', '', '', '', ''];
    POP.turn = 'X'; POP.over = false; POP.moves = 0;
    var name = { easy: 'Easy', normal: 'Normal', hard: 'Hard' }[diff] || 'Normal';
    view.innerHTML =
      '<div class="wond-board wond-game">' +
        agTopBar('🎯 Pop-a-Tic-Tac-Toe · ' + name, 'openPopTicTacToe()') +
        '<div class="wond-hud" id="popHud"></div>' +
        '<div class="pop-grid" id="popGrid"></div>' +
        '<p class="wond-tip">Tap an empty square to pop your 🔴 ball in. Line up three to win!</p>' +
      '</div>';
    if (typeof playSfx === 'function') playSfx('ui-click');
    popRender();
  }

  function _popHud(){
    var hud = document.getElementById('popHud'); if (!hud) return;
    var msg = POP.over ? 'Game over' : (POP.turn === 'X' ? 'Your turn — pop a 🔴' : 'CPU is thinking…');
    hud.innerHTML = '<span class="wond-chip">🔴 You</span><span class="wond-chip">🔵 CPU</span>' +
      '<span class="wond-chip">' + msg + '</span>';
  }

  function popRender(){
    var g = document.getElementById('popGrid'); if (!g) return;
    g.innerHTML = POP.board.map(function(v, i){
      return '<button type="button" class="pop-cell' + (v ? ' pop-cell-' + (v === 'X' ? 'x' : 'o') : '') + '" onclick="popTap(' + i + ')"' +
        ((v || POP.over) ? ' disabled' : '') + '>' + (v ? POP_MARK[v] : '') + '</button>';
    }).join('');
    _popHud();
  }

  function _popWinner(b){
    for (var i = 0; i < POP_WINLINES.length; i++){
      var L = POP_WINLINES[i];
      if (b[L[0]] && b[L[0]] === b[L[1]] && b[L[1]] === b[L[2]]) return { who: b[L[0]], line: L };
    }
    return null;
  }
  function _popEmpty(b){ var e = []; for (var i = 0; i < 9; i++) if (!b[i]) e.push(i); return e; }

  function popTap(i){
    if (!POP.active || POP.over || POP.turn !== 'X' || POP.board[i]) return;
    POP.board[i] = 'X'; POP.moves++;
    if (typeof playSfx === 'function') playSfx('click');
    if (_popResolve()) return;                   // popEnd already rendered + highlighted
    POP.turn = 'O';
    popRender();
    if (typeof a2Later === 'function') a2Later(_popCpuMove, 350); else _popCpuMove();
  }

  function _popCpuMove(){
    if (!POP.active || POP.over || POP.turn !== 'O') return;
    var i = _popCpuPick(POP.board, POP.diff);
    if (i == null) return;
    POP.board[i] = 'O'; POP.moves++;
    if (typeof playSfx === 'function') playSfx('click');
    if (_popResolve()) return;
    POP.turn = 'X';
    popRender();
  }

  // Ends the game if there's a winner or a draw; returns true if it did.
  function _popResolve(){
    var w = _popWinner(POP.board);
    if (w){ popEnd(w.who === 'X' ? 'win' : 'lose', w.line); return true; }
    if (_popEmpty(POP.board).length === 0){ popEnd('draw', null); return true; }
    return false;
  }

  function _popCpuPick(b, diff){
    var empty = _popEmpty(b); if (!empty.length) return null;
    if (diff === 'easy') return empty[rand(0, empty.length - 1)];
    var win = _popFindLine(b, 'O'); if (win != null) return win;      // take the win
    var block = _popFindLine(b, 'X'); if (block != null) return block; // block the player
    if (diff === 'hard') return _popMinimax(b, 'O').idx;              // perfect play
    if (!b[4]) return 4;                                              // normal: prefer centre
    var corners = [0, 2, 6, 8].filter(function(i){ return !b[i]; });
    if (corners.length) return corners[rand(0, corners.length - 1)];
    return empty[rand(0, empty.length - 1)];
  }
  // A cell that completes a line for `who` (2 of `who` + 1 empty), else null.
  function _popFindLine(b, who){
    for (var i = 0; i < POP_WINLINES.length; i++){
      var L = POP_WINLINES[i], mine = 0, empty = -1, bad = false;
      for (var j = 0; j < 3; j++){
        var v = b[L[j]];
        if (v === who) mine++; else if (!v) empty = L[j]; else bad = true;
      }
      if (!bad && mine === 2 && empty >= 0) return empty;
    }
    return null;
  }
  // Minimax (O maximizes) — 3×3 is tiny so a full search is instant.
  function _popMinimax(b, player){
    var w = _popWinner(b);
    if (w) return { score: w.who === 'O' ? 10 : -10, idx: -1 };
    var empty = _popEmpty(b);
    if (!empty.length) return { score: 0, idx: -1 };
    var best = { score: player === 'O' ? -999 : 999, idx: empty[0] };
    for (var k = 0; k < empty.length; k++){
      var i = empty[k];
      b[i] = player;
      var res = _popMinimax(b, player === 'O' ? 'X' : 'O');
      b[i] = '';
      if (player === 'O'){ if (res.score > best.score) best = { score: res.score, idx: i }; }
      else { if (res.score < best.score) best = { score: res.score, idx: i }; }
    }
    return best;
  }

  function popEnd(result, line){
    POP.over = true; POP.active = false;
    var diff = POP.diff;
    var base = { easy: 40, normal: 80, hard: 140 }[diff] || 40;
    var score = result === 'win' ? base + Math.max(0, 9 - POP.moves) * 6 : (result === 'draw' ? Math.round(base / 3) : 0);
    var newHigh = score > 0 ? wgRecordScore('poptictactoe', score, diff) : false;
    var coins = score > 0 ? Math.round(score * 0.3) + (newHigh ? 20 : 0) : 0;
    if (coins > 0) wgPayReward({ coins: coins, newHigh: newHigh });
    if (typeof playSfx === 'function') playSfx(result === 'win' ? 'victory' : (result === 'draw' ? 'ui-click' : 'wrong'));
    popRender();   // final board (cells disabled)
    if (line){ var cells = document.querySelectorAll('#popGrid .pop-cell'); line.forEach(function(i){ if (cells[i]) cells[i].classList.add('pop-cell-win'); }); }
    var showResult = function(){
      var view = document.getElementById('wonderlandView'); if (!view) return;
      view.innerHTML =
        '<div class="wond-board wond-game">' +
          agTopBar('🎯 Pop-a-Tic-Tac-Toe', 'openPopTicTacToe()') +
          '<div class="wond-head"><h2 class="wond-title">' +
            (result === 'win' ? (newHigh ? '🏆 YOU POPPED IT — NEW BEST!' : '🎉 Three in a row — you win!') : (result === 'draw' ? '🤝 It’s a draw!' : '🔵 The CPU got three first!')) +
          '</h2>' +
            '<p class="wond-sub">' + diff.charAt(0).toUpperCase() + diff.slice(1) + ' · ' + (result === 'win' ? 'score ' + score : (result === 'draw' ? 'a hard-fought tie' : 'try again!')) + '</p></div>' +
          '<div class="wond-result-card"><div class="wond-result-label">Reward</div>' +
            '<div class="wond-prizes"><span class="wond-chip wond-prize-chip">💵 Cash ×' + coins + '</span></div></div>' +
          '<div class="wond-footer" style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">' +
            '<button type="button" class="btn btn-primary" onclick="popStart(\'' + diff + '\')" data-tooltip="Play again, same difficulty.">↻ Rematch</button>' +
            '<button type="button" class="btn btn-ghost" onclick="openPopTicTacToe()" data-tooltip="Change difficulty.">🎚️ Difficulty</button>' +
            '<button type="button" class="btn btn-ghost" onclick="openWonderland()" data-tooltip="Back to the lobby.">← Lobby</button>' +
          '</div>' +
        '</div>';
    };
    if (typeof a2Later === 'function') a2Later(showResult, line ? 1100 : 650); else showResult();
  }
