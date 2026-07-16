  // ============================================================================
  // Quantum Block Forge 🧩 (module 35) — an original block-placement puzzle.
  //
  // Turn-based (no timers/gravity): you're given a tray of 3 original "quantum
  // block" shapes; place each on the grid (click a shape, then a cell). A filled
  // row OR column clears; consecutive line-clearing placements build a combo
  // multiplier. Sequential levels (no difficulty picker) — everyone starts at
  // level 1 on a roomy 9×9 board; each level shrinks the board and raises the
  // score goal, resetting to a fresh empty board on advance. Game over when no
  // tray piece fits anywhere, or the run ends after the last level. High score
  // persists in state.miniGames.blockForge; Cash reward scaled by total score
  // (beat-your-best bonus). Plugs into #wonderlandView; shares wg* helpers.
  //
  // The core (canPlace / clearLines / anyPlaceable) is pure + console-testable.
  // ============================================================================
  var QBF_LEVELS = [
    { size: 9, goal: 150 },
    { size: 9, goal: 220 },
    { size: 8, goal: 250 },
    { size: 8, goal: 320 },
    { size: 7, goal: 400 }
  ];

  // Original shapes — each an array of [row,col] offsets from a top-left anchor.
  var QBF_SHAPES = [
    [[0,0]],
    [[0,0],[0,1]], [[0,0],[1,0]],
    [[0,0],[0,1],[0,2]], [[0,0],[1,0],[2,0]],
    [[0,0],[0,1],[0,2],[0,3]], [[0,0],[1,0],[2,0],[3,0]],
    [[0,0],[0,1],[0,2],[0,3],[0,4]], [[0,0],[1,0],[2,0],[3,0],[4,0]],
    [[0,0],[0,1],[1,0],[1,1]],                                   // 2x2 square
    [[0,0],[0,1],[1,0]], [[0,0],[0,1],[1,1]], [[0,0],[1,0],[1,1]], [[0,1],[1,0],[1,1]], // L-trominoes
    [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2]]                        // 2x3 slab
  ];
  var QBF_COLORS = ['#6EC1E4', '#F2C14E', '#F0705E', '#7bd88f', '#9a6cff', '#66e0ff'];

  var QBF = { active: false, level: 0, size: 8, board: null, tray: [], sel: -1, score: 0, totalScore: 0, combo: 0, lines: 0, placed: 0 };

  // ---- pure core ----
  function qbfNewBoard(size){ var b = []; for (var r = 0; r < size; r++){ b.push([]); for (var c = 0; c < size; c++) b[r].push(0); } return b; }
  function qbfCanPlace(board, cells, r, c, size){
    for (var i = 0; i < cells.length; i++){
      var rr = r + cells[i][0], cc = c + cells[i][1];
      if (rr < 0 || cc < 0 || rr >= size || cc >= size) return false;
      if (board[rr][cc]) return false;
    }
    return true;
  }
  function qbfPlaceCells(board, cells, r, c, color){
    for (var i = 0; i < cells.length; i++){ board[r + cells[i][0]][c + cells[i][1]] = color || 1; }
  }
  // Clear any full rows + full columns simultaneously; returns the number of lines cleared.
  function qbfClearLines(board, size){
    var fullRows = [], fullCols = [], r, c, full;
    for (r = 0; r < size; r++){ full = true; for (c = 0; c < size; c++){ if (!board[r][c]){ full = false; break; } } if (full) fullRows.push(r); }
    for (c = 0; c < size; c++){ full = true; for (r = 0; r < size; r++){ if (!board[r][c]){ full = false; break; } } if (full) fullCols.push(c); }
    fullRows.forEach(function(rr){ for (var cc = 0; cc < size; cc++) board[rr][cc] = 0; });
    fullCols.forEach(function(cc){ for (var rr = 0; rr < size; rr++) board[rr][cc] = 0; });
    return fullRows.length + fullCols.length;
  }
  // Can ANY of the tray shapes be placed somewhere?
  function qbfAnyPlaceable(board, tray, size){
    for (var t = 0; t < tray.length; t++){
      var p = tray[t];
      if (!p) continue;
      for (var r = 0; r < size; r++) for (var c = 0; c < size; c++){ if (qbfCanPlace(board, p.cells, r, c, size)) return true; }
    }
    return false;
  }
  function qbfRandShape(){
    var cells = QBF_SHAPES[rand(0, QBF_SHAPES.length - 1)];
    return { cells: cells, color: QBF_COLORS[rand(0, QBF_COLORS.length - 1)] };
  }

  // PURE: Cash reward for a whole run — modest rate (block scores accumulate) + best-beating bonus.
  function qbfReward(totalScore, level, newHigh){
    var rate = 0.07 + level * 0.015;   // later levels pay a better rate
    var r = { coins: Math.max(0, Math.round(totalScore * rate)) };
    if (newHigh){ r.coins += 25; r.newHigh = true; }
    if (level >= QBF_LEVELS.length - 1 && newHigh && totalScore >= 400){ r.chips = { cpu: 1 }; }
    return r;
  }

  // ---- lifecycle ----
  function openBlockForge(){
    QBF.level = 0; QBF.totalScore = 0;
    _qbfSetup();
  }

  function _qbfSetup(){
    wgStopAll();
    var view = document.getElementById('wonderlandView');
    if (!view) return;
    var lv = QBF_LEVELS[QBF.level] || QBF_LEVELS[QBF_LEVELS.length - 1];
    QBF.active = true; QBF.size = lv.size;
    QBF.board = qbfNewBoard(QBF.size);
    QBF.score = 0; QBF.combo = 0; QBF.lines = 0; QBF.placed = 0; QBF.sel = -1;
    QBF.goal = lv.goal;   // reach it to clear this level
    QBF.best = wgMini('blockForge').highScore || 0;
    qbfRefillTray();
    view.innerHTML =
      '<div class="wond-board wond-game">' +
        '<div class="wond-game-top"><h2 class="wond-title wond-title-sm">🧩 Quantum Block Forge — Level ' + (QBF.level + 1) + ' / ' + QBF_LEVELS.length + '</h2>' +
          '<button type="button" class="btn btn-ghost" onclick="openWonderland()" data-tooltip="Quit this run (score is not saved).">✕ Quit</button></div>' +
        '<div class="wond-hud" id="qbfHud"></div>' +
        '<div class="qbf-wrap"><div class="qbf-grid" id="qbfGrid"></div><div class="qbf-tray" id="qbfTray"></div></div>' +
        '<p class="wond-tip">DRAG a block onto the grid (or click it, then click the grid). Fill a row or column to clear it — reach the 🎯 goal score to clear this level!</p>' +
      '</div>';
    if (typeof playSfx === 'function') playSfx('ui-click');
    qbfRender();
  }

  function qbfRefillTray(){ QBF.tray = [qbfRandShape(), qbfRandShape(), qbfRandShape()]; QBF.sel = -1; }

  // Turn-based, so nothing to cancel — just mark inactive (called by wgStopAll on navigation).
  function qbfStop(){ QBF.active = false; if (typeof a2DragCancel === 'function') a2DragCancel(); }

  function qbfRender(){
    var grid = document.getElementById('qbfGrid');
    if (grid){
      grid.style.gridTemplateColumns = 'repeat(' + QBF.size + ', 1fr)';
      var html = '';
      for (var r = 0; r < QBF.size; r++) for (var c = 0; c < QBF.size; c++){
        var v = QBF.board[r][c];
        html += '<button type="button" class="qbf-cell' + (v ? ' qbf-fill' : '') + '" ' +
          (v ? 'style="background:' + v + '"' : '') + ' onclick="qbfCellClick(' + r + ',' + c + ')"' +
          ' data-dropzone="1" data-r="' + r + '" data-c="' + c + '" aria-label="cell ' + r + ',' + c + '"></button>';
      }
      grid.innerHTML = html;
      // Tray pieces are drawn at this SAME size (--qbf-cell, read by .qbf-mini/.qbf-piece-used in
      // CSS) so a tray block never looks smaller than the board it's about to be dropped onto.
      var wrap = grid.closest('.qbf-wrap'), firstCell = grid.querySelector('.qbf-cell');
      if (wrap && firstCell) wrap.style.setProperty('--qbf-cell', firstCell.getBoundingClientRect().width + 'px');
    }
    var tray = document.getElementById('qbfTray');
    if (tray){
      tray.innerHTML = QBF.tray.map(function(p, i){
        if (!p) return '<div class="qbf-piece qbf-piece-used"></div>';
        var maxR = 0, maxC = 0;
        p.cells.forEach(function(o){ if (o[0] > maxR) maxR = o[0]; if (o[1] > maxC) maxC = o[1]; });
        var mini = '';
        for (var rr = 0; rr <= maxR; rr++) for (var cc = 0; cc <= maxC; cc++){
          var on = p.cells.some(function(o){ return o[0] === rr && o[1] === cc; });
          mini += '<span class="qbf-mini' + (on ? ' on' : '') + '"' + (on ? ' style="background:' + p.color + '"' : '') + '></span>';
        }
        return '<button type="button" class="qbf-piece' + (QBF.sel === i ? ' qbf-sel' : '') + '" onclick="qbfSelectPiece(' + i + ')" ' +
          'onpointerdown="qbfPointerDown(event,' + i + ')" ' +
          'style="grid-template-columns:repeat(' + (maxC + 1) + ',var(--qbf-cell,14px))" data-tooltip="Drag this block onto the grid (or click it, then click the grid).">' + mini + '</button>';
      }).join('');
    }
    qbfUpdateHud();
  }

  function qbfUpdateHud(){
    var hud = document.getElementById('qbfHud');
    if (!hud) return;
    hud.innerHTML =
      '<span class="wond-chip">🎚️ Level <b>' + (QBF.level + 1) + ' / ' + QBF_LEVELS.length + '</b></span>' +
      '<span class="wond-chip">⭐ Score: <b>' + QBF.score + '</b></span>' +
      '<span class="wond-chip' + (QBF.score >= QBF.goal ? ' wond-chip-hot' : '') + '">🎯 Goal: <b>' + QBF.score + ' / ' + QBF.goal + '</b></span>' +
      '<span class="wond-chip">🔥 Combo: <b>×' + Math.max(1, QBF.combo) + '</b></span>' +
      '<span class="wond-chip">🧹 Lines: <b>' + QBF.lines + '</b></span>' +
      '<span class="wond-chip">🏆 Best: <b>' + QBF.best + '</b></span>';
  }

  function qbfSelectPiece(i){ if (!QBF.active || !QBF.tray[i]) return; QBF.sel = i; qbfRender(); }

  // Drag-and-drop placement (POINTER-based — works on mouse AND touch; native HTML5 drag does
  // not fire on touch devices, which is why this felt broken before). Drag a tray piece onto
  // the grid (anchor = the piece's top-left cell); still falls back to click-select + click-place.
  function qbfPointerDown(ev, i){
    if (!QBF.active || !QBF.tray[i]) return;
    QBF.sel = i; qbfRender();
    var p = QBF.tray[i];
    var maxR = 0, maxC = 0;
    p.cells.forEach(function(o){ if (o[0] > maxR) maxR = o[0]; if (o[1] > maxC) maxC = o[1]; });
    var mini = '';
    for (var rr = 0; rr <= maxR; rr++) for (var cc = 0; cc <= maxC; cc++){
      var on = p.cells.some(function(o){ return o[0] === rr && o[1] === cc; });
      mini += '<span class="qbf-mini' + (on ? ' on' : '') + '"' + (on ? ' style="background:' + p.color + '"' : '') + '></span>';
    }
    var ghost = '<div class="qbf-piece qbf-drag-ghost-inner" style="grid-template-columns:repeat(' + (maxC + 1) + ',18px)">' + mini + '</div>';
    a2DragStart(ev, i, ghost, function(dz, idx){
      var r = parseInt(dz.getAttribute('data-r'), 10), c = parseInt(dz.getAttribute('data-c'), 10);
      if (isNaN(r) || isNaN(c) || !QBF.tray[idx]) return;
      QBF.sel = idx;
      qbfCellClick(r, c);
    });
  }

  function qbfCellClick(r, c){
    if (!QBF.active || QBF.sel < 0) return;
    var p = QBF.tray[QBF.sel];
    if (!p) return;
    if (!qbfCanPlace(QBF.board, p.cells, r, c, QBF.size)){
      if (typeof playSfx === 'function') playSfx('wrong');
      return;
    }
    qbfPlaceCells(QBF.board, p.cells, r, c, p.color);
    QBF.score += p.cells.length;                                 // 1 point per cell placed
    QBF.placed++;
    QBF.tray[QBF.sel] = null;
    QBF.sel = -1;
    if (typeof playSfx === 'function') playSfx('ui-click');
    var cleared = qbfClearLines(QBF.board, QBF.size);
    if (cleared > 0){
      QBF.combo = Math.max(1, QBF.combo) + 1;                    // grow combo on consecutive clears
      QBF.lines += cleared;
      QBF.score += cleared * QBF.size * QBF.combo;               // line bonus × combo
      if (typeof playSfx === 'function') playSfx('solve-correct');
    } else {
      QBF.combo = 0;                                             // no clear breaks the combo
    }
    if (QBF.tray.every(function(x){ return !x; })) qbfRefillTray();  // new tray when all placed
    qbfRender();
    if (QBF.score >= QBF.goal){ _qbfLevelClear(); return; }          // 🎯 goal reached — advance!
    if (!qbfAnyPlaceable(QBF.board, QBF.tray, QBF.size)) qbfEnd(false);
  }

  // Goal reached — advance to the next level for FREE (fresh board), or end the run if that was
  // the last one (matching Sky Stacker / Blast Bot's sequential-level pattern).
  function _qbfLevelClear(){
    QBF.active = false;
    QBF.totalScore += QBF.score;
    if (QBF.level + 1 >= QBF_LEVELS.length){ qbfEnd(true); return; }
    if (typeof playSfx === 'function') playSfx('victory');
    if (typeof showToast === 'function') showToast('🌟 Level ' + (QBF.level + 1) + ' clear! Score ' + QBF.score + ' — next up!');
    QBF.level++;
    if (typeof a2Later === 'function') a2Later(_qbfSetup, 900); else setTimeout(_qbfSetup, 900);
  }

  function qbfEnd(won){
    QBF.active = false;
    if (won) QBF.totalScore += QBF.score;   // final level's score wasn't folded in yet
    var total = QBF.totalScore, level = QBF.level, lines = QBF.lines;
    var newHigh = wgRecordScore('blockForge', total, level + 1);
    var r = qbfReward(total, level, newHigh);
    wgPayReward(r);
    // Mastering the forge (clearing every level) also opens the gold treasure chest.
    if (won && typeof a2Reward === 'function') a2Reward(1);
    var view = document.getElementById('wonderlandView');
    if (!view) return;
    view.innerHTML =
      '<div class="wond-board">' +
        '<div class="wond-head"><h2 class="wond-title">' + (won ? '🌟 FORGE MASTERED! 🎯' : (newHigh ? '🏆 NEW HIGH SCORE!' : '🧩 Board full!')) + '</h2>' +
          '<p class="wond-sub">Reached level <b>' + (level + 1) + ' / ' + QBF_LEVELS.length + '</b> · total score <b>' + total + '</b> · ' + lines + ' lines cleared (last level)</p></div>' +
        '<div class="wond-result-card"><div class="wond-result-label">Reward</div>' +
          '<div class="wond-prizes"><span class="wond-chip wond-prize-chip">💵 Cash ×' + (r.coins || 0) + '</span>' +
          (r.chips && r.chips.cpu ? '<span class="wond-chip wond-prize-chip">🖥️ CPU ×' + r.chips.cpu + '</span>' : '') + '</div></div>' +
        '<div class="wond-footer">' +
          '<button type="button" class="btn btn-primary" onclick="wonderPlay(\'openBlockForge\')" data-tooltip="Costs 1 Wonderland Pass — starts back at level 1.">↻ Play again (1 🎟️)</button>' +
          '<button type="button" class="btn btn-ghost" onclick="openWonderland()" data-tooltip="Back to the lobby.">← Lobby</button>' +
        '</div>' +
      '</div>';
  }
