  // ============================================================================
  // Quantum Block Forge 🧩 (module 35) — an original block-placement puzzle.
  //
  // Turn-based (no timers/gravity): you're given a tray of 3 original "quantum
  // block" shapes; place each on the grid (click a shape, then a cell). A filled
  // row OR column clears; consecutive line-clearing placements build a combo
  // multiplier. Game over when no tray piece fits anywhere. High score persists
  // in state.miniGames.blockForge; Cash reward scaled by score (beat-your-best
  // bonus). Plugs into #wonderlandView; shares wg* helpers from 34-wonder-games.js.
  //
  // The core (canPlace / clearLines / anyPlaceable) is pure + console-testable.
  // ============================================================================
  var QBF_SIZES = { easy: 9, normal: 8, hard: 7 };

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

  var QBF = { active: false, size: 8, board: null, tray: [], sel: -1, score: 0, combo: 0, lines: 0, placed: 0, diff: 'normal' };

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

  // PURE: Cash reward for a run — modest rate (block scores accumulate) + best-beating bonus.
  function qbfReward(score, diff, newHigh){
    var rate = diff === 'hard' ? 0.14 : (diff === 'normal' ? 0.10 : 0.07);
    var r = { coins: Math.max(0, Math.round(score * rate)) };
    if (newHigh){ r.coins += 25; r.newHigh = true; }
    if (diff === 'hard' && newHigh && score >= 400){ r.chips = { cpu: 1 }; }
    return r;
  }

  // ---- lifecycle ----
  function openBlockForge(){
    wgStopAll();
    var view = wgShowView();
    if (!view) return;
    var m = wgMini('blockForge');
    view.innerHTML =
      '<div class="wond-board">' +
        '<div class="wond-head"><h2 class="wond-title"><span class="wond-wheel">🧩</span> Quantum Block Forge</h2>' +
          '<p class="wond-sub">Place blocks to fill rows &amp; columns — clear lines for big combos!</p></div>' +
        '<div class="wond-passrow"><span class="wond-passes">🏆 High score: <b>' + (m.highScore || 0) + '</b></span>' +
          '<span class="wond-hint">Free to play · click a block then a cell</span></div>' +
        '<div class="wg-diff-row">' +
          '<button type="button" class="btn btn-primary" onclick="qbfStart(\'easy\')" data-tooltip="Roomy 9×9 board.">🟢 Easy 9×9</button>' +
          '<button type="button" class="btn btn-primary" onclick="qbfStart(\'normal\')" data-tooltip="Classic 8×8 board.">🟡 Normal 8×8</button>' +
          '<button type="button" class="btn btn-primary" onclick="qbfStart(\'hard\')" data-tooltip="Tight 7×7 board — best Cash.">🔴 Hard 7×7</button>' +
        '</div>' +
        '<div class="wond-footer"><button type="button" class="btn btn-ghost" onclick="openWonderland()" data-tooltip="Back to the Wonderland lobby.">← Lobby</button></div>' +
      '</div>';
  }

  function qbfStart(diff){
    wgStopAll();
    var view = document.getElementById('wonderlandView');
    if (!view) return;
    QBF.active = true; QBF.diff = diff; QBF.size = QBF_SIZES[diff] || 8;
    QBF.board = qbfNewBoard(QBF.size);
    QBF.score = 0; QBF.combo = 0; QBF.lines = 0; QBF.placed = 0; QBF.sel = -1;
    QBF.best = wgMini('blockForge').highScore || 0;
    qbfRefillTray();
    view.innerHTML =
      '<div class="wond-board wond-game">' +
        '<div class="wond-game-top"><h2 class="wond-title wond-title-sm">🧩 Quantum Block Forge — ' + diff + '</h2>' +
          '<button type="button" class="btn btn-ghost" onclick="openBlockForge()" data-tooltip="Quit this run (score is not saved).">✕ Quit</button></div>' +
        '<div class="wond-hud" id="qbfHud"></div>' +
        '<div class="qbf-wrap"><div class="qbf-grid" id="qbfGrid"></div></div>' +
        '<div class="qbf-tray" id="qbfTray"></div>' +
        '<p class="wond-tip">Click a block below, then click the grid to place it. Fill a whole row or column to clear it!</p>' +
      '</div>';
    if (typeof playSfx === 'function') playSfx('ui-click');
    qbfRender();
  }

  function qbfRefillTray(){ QBF.tray = [qbfRandShape(), qbfRandShape(), qbfRandShape()]; QBF.sel = -1; }

  // Turn-based, so nothing to cancel — just mark inactive (called by wgStopAll on navigation).
  function qbfStop(){ QBF.active = false; }

  function qbfRender(){
    var grid = document.getElementById('qbfGrid');
    if (grid){
      grid.style.gridTemplateColumns = 'repeat(' + QBF.size + ', 1fr)';
      var html = '';
      for (var r = 0; r < QBF.size; r++) for (var c = 0; c < QBF.size; c++){
        var v = QBF.board[r][c];
        html += '<button type="button" class="qbf-cell' + (v ? ' qbf-fill' : '') + '" ' +
          (v ? 'style="background:' + v + '"' : '') + ' onclick="qbfCellClick(' + r + ',' + c + ')" aria-label="cell ' + r + ',' + c + '"></button>';
      }
      grid.innerHTML = html;
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
          'style="grid-template-columns:repeat(' + (maxC + 1) + ',14px)" data-tooltip="Select this block, then click the grid.">' + mini + '</button>';
      }).join('');
    }
    qbfUpdateHud();
  }

  function qbfUpdateHud(){
    var hud = document.getElementById('qbfHud');
    if (!hud) return;
    hud.innerHTML =
      '<span class="wond-chip">⭐ Score: <b>' + QBF.score + '</b></span>' +
      '<span class="wond-chip">🔥 Combo: <b>×' + Math.max(1, QBF.combo) + '</b></span>' +
      '<span class="wond-chip">🧹 Lines: <b>' + QBF.lines + '</b></span>' +
      '<span class="wond-chip">🏆 Best: <b>' + QBF.best + '</b></span>';
  }

  function qbfSelectPiece(i){ if (!QBF.active || !QBF.tray[i]) return; QBF.sel = i; qbfRender(); }

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
    if (!qbfAnyPlaceable(QBF.board, QBF.tray, QBF.size)) qbfEnd();
  }

  function qbfEnd(){
    QBF.active = false;
    var score = QBF.score, diff = QBF.diff, lines = QBF.lines;
    var newHigh = wgRecordScore('blockForge', score, diff);
    var r = qbfReward(score, diff, newHigh);
    wgPayReward(r);
    var view = document.getElementById('wonderlandView');
    if (!view) return;
    view.innerHTML =
      '<div class="wond-board">' +
        '<div class="wond-head"><h2 class="wond-title">' + (newHigh ? '🏆 NEW HIGH SCORE!' : '🧩 Board full!') + '</h2>' +
          '<p class="wond-sub">Score <b>' + score + '</b> · ' + lines + ' lines cleared · ' + diff + '</p></div>' +
        '<div class="wond-result-card"><div class="wond-result-label">Reward</div>' +
          '<div class="wond-prizes"><span class="wond-chip wond-prize-chip">💵 Cash ×' + (r.coins || 0) + '</span>' +
          (r.chips && r.chips.cpu ? '<span class="wond-chip wond-prize-chip">🖥️ CPU ×' + r.chips.cpu + '</span>' : '') + '</div></div>' +
        '<div class="wond-footer">' +
          '<button type="button" class="btn btn-primary" onclick="qbfStart(\'' + diff + '\')" data-tooltip="Play this difficulty again.">↻ Play again</button>' +
          '<button type="button" class="btn btn-ghost" onclick="openBlockForge()" data-tooltip="Change board size.">🧩 Difficulty</button>' +
          '<button type="button" class="btn btn-ghost" onclick="openWonderland()" data-tooltip="Back to the lobby.">← Lobby</button>' +
        '</div>' +
      '</div>';
  }
