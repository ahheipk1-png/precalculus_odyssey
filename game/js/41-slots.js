  // ============================================================================
  // 🎰 Star Slots (module 41; uses the A2 shell from 39-puzzles.js)
  // A 5×5 symbol grid. Entry costs 1 Wonderland Pass (wonderPlay). Choose how
  // many paylines to buy (1/3/5/7 — rows + diagonals) and a bet per line, then
  // SPIN; a manual STOP button hurries any still-spinning columns. A matched
  // payline pays its symbol's multiplier; two special SHAPES — the four
  // corners, or the full center cross — pay a JACKPOT bonus on top, regardless
  // of which lines were bought. Weighted reels keep it fun without being a
  // money printer.
  // ============================================================================
  var SL = { spinning: false, bet: 10, lineCount: 3, grid: [], finalGrid: null, stopped: [], tumble: 0, stopTimers: [] };
  var SL_REEL = ['🚀','🚀','🚀','🚀','🚀','⭐','⭐','⭐','⭐','🪐','🪐','🪐','👽','👽','💎','7️⃣'];
  var SL_PAY = { '🚀': 3, '⭐': 4, '🪐': 6, '👽': 10, '💎': 20, '7️⃣': 50 };
  var SL_LINES = [
    { id: 'r0', label: 'Row 1',     cells: [[0,0],[0,1],[0,2],[0,3],[0,4]] },
    { id: 'r1', label: 'Row 2',     cells: [[1,0],[1,1],[1,2],[1,3],[1,4]] },
    { id: 'r2', label: 'Row 3',     cells: [[2,0],[2,1],[2,2],[2,3],[2,4]] },
    { id: 'r3', label: 'Row 4',     cells: [[3,0],[3,1],[3,2],[3,3],[3,4]] },
    { id: 'r4', label: 'Row 5',     cells: [[4,0],[4,1],[4,2],[4,3],[4,4]] },
    { id: 'd1', label: 'Diagonal ↘', cells: [[0,0],[1,1],[2,2],[3,3],[4,4]] },
    { id: 'd2', label: 'Diagonal ↙', cells: [[0,4],[1,3],[2,2],[3,1],[4,0]] }
  ];
  var SL_LINE_PRESETS = {
    1: ['r2'],
    3: ['r1', 'r2', 'r3'],
    5: ['r0', 'r1', 'r2', 'r3', 'r4'],
    7: ['r0', 'r1', 'r2', 'r3', 'r4', 'd1', 'd2']
  };
  var SL_CROSS_CELLS = [[2,0],[2,1],[2,2],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]];   // center row + center col

  function _slPick(){ return SL_REEL[rand(0, SL_REEL.length - 1)]; }
  function _slNewGrid(){ var g = []; for (var r = 0; r < 5; r++){ var row = []; for (var c = 0; c < 5; c++) row.push(_slPick()); g.push(row); } return g; }
  function _slActiveLines(){ return (SL_LINE_PRESETS[SL.lineCount] || SL_LINE_PRESETS[3]).map(function(id){ return SL_LINES.filter(function(l){ return l.id === id; })[0]; }); }
  function _slTotalBet(){ return SL.bet * SL.lineCount; }

  function openSlots(){
    SL.spinning = false; SL.bet = 10; SL.lineCount = 3; SL.grid = _slNewGrid(); SL.stopped = [false, false, false, false, false];
    var payRows = Object.keys(SL_PAY).map(function(s){
      return '<span class="wond-chip">' + s + s + s + s + s + ' ×<b>' + SL_PAY[s] + '</b></span>';
    }).join('');
    a2Shell('🎰 Star Slots', 'openWonderland()',
      '<div class="wond-hud" id="slHud"></div>' +
      '<div class="sl-grid-wrap"><div class="sl-grid" id="slGrid"></div></div>' +
      '<div class="sl-banner" id="slBanner">Buy your lines, set a bet, then spin!</div>' +
      '<div class="sl-controls">' +
        '<div class="sl-row"><span class="sl-row-label">🎟️ Lines:</span>' +
          [1, 3, 5, 7].map(function(n){ return '<button type="button" class="btn btn-secondary sl-opt sl-line" data-n="' + n + '" onclick="slSetLines(' + n + ')">' + n + '</button>'; }).join('') +
        '</div>' +
        '<div class="sl-row"><span class="sl-row-label">💵 Bet/line:</span>' +
          [10, 50, 100].map(function(n){ return '<button type="button" class="btn btn-secondary sl-opt sl-bet" data-n="' + n + '" onclick="slSetBet(' + n + ')">💵' + n + '</button>'; }).join('') +
        '</div>' +
        '<div class="sl-row">' +
          '<button type="button" class="btn btn-primary sl-spin" id="slSpinBtn" onclick="slSpin()">🎰 SPIN!</button>' +
          '<button type="button" class="btn btn-secondary sl-stop" id="slStopBtn" onclick="slStop()" disabled>⏹ STOP</button>' +
        '</div>' +
      '</div>' +
      '<div class="sl-paytable">' + payRows + '<span class="wond-chip">any pair on a line ×<b>1.5</b></span>' +
        '<span class="wond-chip sl-jp-chip">🎆 4 corners match = JACKPOT ×50 total bet</span>' +
        '<span class="wond-chip sl-jp-chip">✨ full cross match = MEGA JACKPOT ×150 total bet</span></div>',
      'Pick lines + bet, SPIN, then tap STOP any time to hurry the reels.');
    slSetLines(3);
    slSetBet(10);
    _slRenderGrid();
    _slHud();
  }

  function _slHud(){
    var hud = document.getElementById('slHud');
    if (hud) hud.innerHTML = '<span class="wond-chip">💵 Cash: <b>' + ((state && state.coins) || 0) + '</b></span>' +
      '<span class="wond-chip">🎯 Total bet: <b>💵' + _slTotalBet() + '</b></span>';
  }

  function slSetLines(n){
    if (SL.spinning) return;
    SL.lineCount = n;
    var btns = document.querySelectorAll('.sl-line');
    for (var i = 0; i < btns.length; i++) btns[i].classList.toggle('sl-opt-on', +btns[i].getAttribute('data-n') === n);
    _slHud(); _slRenderGrid();
  }
  function slSetBet(n){
    if (SL.spinning) return;
    SL.bet = n;
    var btns = document.querySelectorAll('.sl-bet');
    for (var i = 0; i < btns.length; i++) btns[i].classList.toggle('sl-opt-on', +btns[i].getAttribute('data-n') === n);
    _slHud();
  }

  // Draw the 25 cells; cells on a currently-bought payline get a highlighted ring.
  function _slRenderGrid(){
    var g = document.getElementById('slGrid'); if (!g) return;
    var onLine = {};
    _slActiveLines().forEach(function(line){ line.cells.forEach(function(rc){ onLine[rc[0] + ',' + rc[1]] = true; }); });
    var html = '';
    for (var r = 0; r < 5; r++) for (var c = 0; c < 5; c++){
      html += '<div class="sl-cell' + (onLine[r + ',' + c] ? ' sl-on-line' : '') + '" id="slC' + r + '_' + c + '">' + SL.grid[r][c] + '</div>';
    }
    g.innerHTML = html;
  }

  function slSpin(){
    if (SL.spinning || !a2Active()) return;
    var total = _slTotalBet();
    if (!state || (state.coins || 0) < total){
      if (typeof showToast === 'function') showToast('Not enough Cash for that bet!');
      if (typeof playSfx === 'function') playSfx('wrong');
      return;
    }
    state.coins -= total;
    if (typeof updateStats === 'function') updateStats();
    SL.spinning = true;
    SL.stopped = [false, false, false, false, false];
    SL.finalGrid = _slNewGrid();
    document.querySelectorAll('.sl-cell').forEach(function(el){ el.classList.remove('sl-cell-win', 'sl-stop-flash'); });
    var banner = document.getElementById('slBanner');
    if (banner){ banner.textContent = 'Spinning…'; banner.className = 'sl-banner'; }
    var spinBtn = document.getElementById('slSpinBtn'); if (spinBtn) spinBtn.disabled = true;
    var stopBtn = document.getElementById('slStopBtn'); if (stopBtn) stopBtn.disabled = false;
    if (typeof playSfx === 'function') playSfx('click');
    SL.tumble = a2Every(function(){
      for (var c = 0; c < 5; c++){
        if (SL.stopped[c]) continue;
        for (var r = 0; r < 5; r++){
          var cell = document.getElementById('slC' + r + '_' + c);
          if (cell) cell.textContent = _slPick();
        }
      }
    }, 80);
    SL.stopTimers = [];
    [700, 1050, 1400, 1750, 2100].forEach(function(ms, col){
      SL.stopTimers.push(a2Later(function(){ _slStopColumn(col); }, ms));
    });
  }

  function _slStopColumn(col){
    if (SL.stopped[col]) return;
    SL.stopped[col] = true;
    for (var r = 0; r < 5; r++){
      SL.grid[r][col] = SL.finalGrid[r][col];
      var cell = document.getElementById('slC' + r + '_' + col);
      if (cell){ cell.textContent = SL.grid[r][col]; cell.classList.add('sl-stop-flash'); }
    }
    if (typeof playSfx === 'function') playSfx('click');
    if (SL.stopped[0] && SL.stopped[1] && SL.stopped[2] && SL.stopped[3] && SL.stopped[4]){
      if (SL.tumble){ clearInterval(SL.tumble); SL.tumble = 0; }
      var stopBtn = document.getElementById('slStopBtn'); if (stopBtn) stopBtn.disabled = true;
      a2Later(_slSettle, 300);
    }
  }

  // Manual skill-stop: immediately finalize every column still spinning.
  function slStop(){
    if (!SL.spinning) return;
    SL.stopTimers.forEach(function(id){ clearTimeout(id); });
    SL.stopTimers = [];
    for (var c = 0; c < 5; c++){ if (!SL.stopped[c]) _slStopColumn(c); }
  }

  function _slLineMatch(line){
    var syms = line.cells.map(function(rc){ return SL.grid[rc[0]][rc[1]]; });
    if (syms.every(function(s){ return s === syms[0]; })) return { type: 'triple', sym: syms[0] };
    var counts = {};
    syms.forEach(function(s){ counts[s] = (counts[s] || 0) + 1; });
    if (Object.keys(counts).some(function(k){ return counts[k] >= 2; })) return { type: 'pair' };
    return null;
  }
  function _slCheckJackpots(){
    var corners = [SL.grid[0][0], SL.grid[0][4], SL.grid[4][0], SL.grid[4][4]];
    var crossSyms = SL_CROSS_CELLS.map(function(rc){ return SL.grid[rc[0]][rc[1]]; });
    return {
      corner: corners.every(function(s){ return s === corners[0]; }),
      cross: crossSyms.every(function(s){ return s === crossSyms[0]; })
    };
  }

  function _slSettle(){
    var lines = _slActiveLines(), totalWin = 0, wins = [];
    lines.forEach(function(line){
      var m = _slLineMatch(line);
      if (m){
        var w = m.type === 'triple' ? SL.bet * (SL_PAY[m.sym] || 3) : Math.floor(SL.bet * 1.5);
        totalWin += w;
        wins.push({ line: line, m: m, win: w });
      }
    });
    var jp = _slCheckJackpots(), jackpotWin = 0, jackpotMsgs = [];
    if (jp.corner){ jackpotWin += _slTotalBet() * 50; jackpotMsgs.push('🎆 FOUR CORNERS JACKPOT!'); }
    if (jp.cross){ jackpotWin += _slTotalBet() * 150; jackpotMsgs.push('✨ CENTER CROSS MEGA JACKPOT!'); }
    totalWin += jackpotWin;

    var banner = document.getElementById('slBanner'), msg, cls = 'sl-banner';
    if (jackpotWin > 0){
      msg = jackpotMsgs.join(' ') + ' +💵' + totalWin + '!';
      cls += ' sl-win sl-jackpot';
      if (typeof playSfx === 'function') playSfx('victory');
    } else if (totalWin > 0){
      msg = '✨ ' + wins.length + ' winning line' + (wins.length > 1 ? 's' : '') + '! +💵' + totalWin + '.';
      cls += ' sl-win';
      if (typeof playSfx === 'function') playSfx('loot');
    } else {
      msg = '💫 No match this spin — try again!';
      if (typeof playSfx === 'function') playSfx('wrong');
    }
    if (totalWin > 0) state.coins = (state.coins || 0) + totalWin;
    if (typeof updateStats === 'function') updateStats();
    if (typeof saveGame === 'function') saveGame();
    if (banner){ banner.textContent = msg; banner.className = cls; }
    wins.forEach(function(w){
      w.line.cells.forEach(function(rc){ var cell = document.getElementById('slC' + rc[0] + '_' + rc[1]); if (cell) cell.classList.add('sl-cell-win'); });
    });
    if (jackpotWin > 0 && (jp.corner ? [[0,0],[0,4],[4,0],[4,4]] : SL_CROSS_CELLS)){
      var jpCells = [].concat(jp.corner ? [[0,0],[0,4],[4,0],[4,4]] : [], jp.cross ? SL_CROSS_CELLS : []);
      jpCells.forEach(function(rc){ var cell = document.getElementById('slC' + rc[0] + '_' + rc[1]); if (cell) cell.classList.add('sl-cell-jackpot'); });
    }
    SL.spinning = false;
    var spinBtn = document.getElementById('slSpinBtn'); if (spinBtn) spinBtn.disabled = false;
    var stopBtn = document.getElementById('slStopBtn'); if (stopBtn) stopBtn.disabled = true;
  }
