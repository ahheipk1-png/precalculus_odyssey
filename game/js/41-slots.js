  // ============================================================================
  // 🎰 Star Slots (module 41; uses the A2 shell from 39-a2-shell.js)
  // A 3-row × 5-column reel machine. Entry costs 1 Wonderland Pass (wonderPlay);
  // one pass buys SL_MAX_SPINS (5) spins, then the pass is spent — play again to
  // buy another 5. Reels spin FOREVER (no auto-stop) until the player stops them,
  // one at a time (⏹1-⏹5) or all at once (STOP ALL) — pure skill-stop, no waiting.
  // Buy 1/3/5 paylines (rows + zig-zags, drawn as translucent coloured lines over
  // the grid) and a bet per line (max total bet SL_MAX_BET = 1000), then SPIN. A
  // line pays on 2+ MATCHING symbols from the LEFT (small — ×0.5), scaling up for
  // 3/4/5 (×1/×4/×15). Two special SHAPES — the four corners, or the full centre
  // cross — pay a big JACKPOT on top. The reel is weighted with cheap fruit
  // fillers so it's still beatable, not a money printer, but wins land often
  // enough to feel fair (2026-07-16: was 3+-only, which was too rare; later same
  // day: dropped 🚀 and 🪐 from 9→7 symbol types — fewer distinct symbols means
  // more matches — and rebalanced the jackpot multipliers down since fewer types
  // ALSO makes the 4-corner/full-cross patterns much easier to hit; verified by
  // Monte Carlo simulation, not just hand math — see docs).
  // ============================================================================
  var SL = { spinning: false, bet: 10, lineCount: 3, grid: [], finalGrid: null, stopped: [], tumble: 0, spinsLeft: 5 };
  var SL_ROWS = 3, SL_COLS = 5;
  var SL_MAX_SPINS = 5, SL_MAX_BET = 1000;
  // Weighted bag: cheap fruit fillers are common, premium symbols rare → most spins don't line up.
  var SL_REEL = ['🍒','🍒','🍒','🍒','🍒','🍒','🍋','🍋','🍋','🍋','🍋','🔔','🔔','🔔','🔔','⭐','⭐','👽','💎','7️⃣'];
  var SL_PAY = { '🍒': 2, '🍋': 3, '🔔': 4, '⭐': 8, '👽': 20, '💎': 40, '7️⃣': 100 };
  var SL_RUN_MULT = { 2: 0.5, 3: 1, 4: 4, 5: 15 };   // multiplier for a 2/3/4/5-long run from the left
  // Jackpot multipliers — tuned by Monte Carlo simulation (200k+ spins), not hand math: the OLD
  // ×250/×1000 values were already a severe money-printer even at 9 symbol types (corner alone
  // ≈181% EV — a 4-corner match is way more common than "jackpot" pay implies), and dropping to
  // 7 types makes 4/7-cell matches easier still. ×4/×150 lands combined RTP (line wins + both
  // jackpots) at a stable ~88-90% across every bet/line-count combination — generous, not broken.
  var SL_JP_CORNER = 4, SL_JP_CROSS = 150;    // jackpot payouts = multiplier × total bet
  var SL_LINES = [
    { id: 'r0', label: 'Top',    cells: [[0,0],[0,1],[0,2],[0,3],[0,4]] },
    { id: 'r1', label: 'Middle', cells: [[1,0],[1,1],[1,2],[1,3],[1,4]] },
    { id: 'r2', label: 'Bottom', cells: [[2,0],[2,1],[2,2],[2,3],[2,4]] },
    { id: 'd1', label: 'V',      cells: [[0,0],[1,1],[2,2],[1,3],[0,4]] },   // 3-row zig-zag ˅
    { id: 'd2', label: '^',      cells: [[2,0],[1,1],[0,2],[1,3],[2,4]] }    // 3-row zig-zag ˄
  ];
  var SL_LINE_PRESETS = {
    1: ['r1'],
    3: ['r0', 'r1', 'r2'],
    5: ['r0', 'r1', 'r2', 'd1', 'd2']
  };
  var SL_CROSS_CELLS = [[1,0],[1,1],[1,2],[1,3],[1,4],[0,2],[2,2]];   // centre row + centre column
  var SL_CORNER_CELLS = [[0,0],[0,4],[2,0],[2,4]];

  function _slPick(){ return SL_REEL[rand(0, SL_REEL.length - 1)]; }
  function _slNewGrid(){ var g = []; for (var r = 0; r < SL_ROWS; r++){ var row = []; for (var c = 0; c < SL_COLS; c++) row.push(_slPick()); g.push(row); } return g; }
  function _slActiveLines(){ return (SL_LINE_PRESETS[SL.lineCount] || SL_LINE_PRESETS[3]).map(function(id){ return SL_LINES.filter(function(l){ return l.id === id; })[0]; }).filter(Boolean); }
  function _slTotalBet(){ return SL.bet * SL.lineCount; }

  function openSlots(){
    SL.spinning = false; SL.bet = 10; SL.lineCount = 3; SL.grid = _slNewGrid(); SL.stopped = [false, false, false, false, false];
    SL.spinsLeft = SL_MAX_SPINS;   // one Wonderland Pass buys SL_MAX_SPINS spins; "Play Again" buys SL_MAX_SPINS more
    var payRows = ['7️⃣', '💎', '👽', '⭐', '🔔', '🍋', '🍒'].map(function(s){
      return '<span class="wond-chip">' + s + s + s + ' ×<b>' + SL_PAY[s] + '</b></span>';
    }).join('');
    a2Shell('🎰 Star Slots', 'openWonderland()',
      '<div class="wond-hud" id="slHud"></div>' +
      '<div class="sl-grid-wrap"><div class="sl-grid" id="slGrid"></div><svg class="sl-line-svg" id="slLineSvg"></svg></div>' +
      '<div class="sl-reel-stops" id="slReelStops">' +
        [0, 1, 2, 3, 4].map(function(c){ return '<button type="button" class="btn btn-secondary sl-reel-stop" id="slReelStop' + c + '" onclick="slStopOne(' + c + ')" disabled>⏹' + (c + 1) + '</button>'; }).join('') +
      '</div>' +
      '<div class="sl-banner" id="slBanner">Buy your lines, set a bet, then spin!</div>' +
      '<div class="sl-controls">' +
        '<div class="sl-row"><span class="sl-row-label">🎟️ Lines:</span>' +
          [1, 3, 5].map(function(n){ return '<button type="button" class="btn btn-secondary sl-opt sl-line" data-n="' + n + '" onclick="slSetLines(' + n + ')">' + n + '</button>'; }).join('') +
        '</div>' +
        '<div class="sl-row"><span class="sl-row-label">💵 Bet/line:</span>' +
          [10, 50, 100, 200].map(function(n){ return '<button type="button" class="btn btn-secondary sl-opt sl-bet" data-n="' + n + '" onclick="slSetBet(' + n + ')">💵' + n + '</button>'; }).join('') +
        '</div>' +
        '<div class="sl-row">' +
          '<button type="button" class="btn btn-primary sl-spin" id="slSpinBtn" onclick="slSpin()">🎰 SPIN!</button>' +
          '<button type="button" class="btn btn-secondary sl-stop" id="slStopBtn" onclick="slStop()" disabled>⏹ STOP ALL</button>' +
        '</div>' +
        '<div class="sl-row" id="slPlayAgainRow" style="display:none">' +
          '<button type="button" class="btn btn-primary" onclick="wonderPlay(\'openSlots\')" data-tooltip="Buy ' + SL_MAX_SPINS + ' more spins for 1 Wonderland Pass.">🔁 Play Again (1 🎟️ · ' + SL_MAX_SPINS + ' spins)</button>' +
        '</div>' +
      '</div>' +
      '<div class="sl-paytable"><span class="wond-chip">2+ from the left pays a little · 3+ pays more · ×4 for 4 · ×15 for 5</span>' + payRows +
        '<span class="wond-chip sl-jp-chip">🎆 4 corners = JACKPOT ×' + SL_JP_CORNER + ' bet</span>' +
        '<span class="wond-chip sl-jp-chip">✨ full cross = MEGA ×' + SL_JP_CROSS + ' bet</span></div>',
      'Buy lines (drawn as coloured lines on the grid), set a bet (max total 💵' + SL_MAX_BET + '), then SPIN — the reels spin until YOU stop them: tap ⏹1-⏹5 to stop one reel at a time (skill-stop) or STOP ALL to lock in every reel at once. ' + SL_MAX_SPINS + ' spins per Wonderland Pass.');
    slSetLines(3);
    slSetBet(10);
    _slRenderGrid();
    _slHud();
    if (typeof a2Later === 'function') a2Later(_slDrawLines, 60);   // redraw once the grid has laid out
  }

  function _slHud(){
    var hud = document.getElementById('slHud');
    if (hud) hud.innerHTML = '<span class="wond-chip">💵 Cash: <b>' + ((state && state.coins) || 0) + '</b></span>' +
      '<span class="wond-chip">🎯 Total bet: <b>💵' + _slTotalBet() + '</b></span>' +
      '<span class="wond-chip">🎰 Spins left: <b>' + Math.max(0, SL.spinsLeft) + ' / ' + SL_MAX_SPINS + '</b></span>' +
      '<span class="wond-chip sl-jp-chip">🎆 Mega jackpot: <b>💵' + (_slTotalBet() * SL_JP_CROSS) + '</b></span>';
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

  // Draw the 15 cells; cells on a currently-bought payline get a highlighted tint.
  function _slRenderGrid(){
    var g = document.getElementById('slGrid'); if (!g) return;
    var onLine = {};
    _slActiveLines().forEach(function(line){ line.cells.forEach(function(rc){ onLine[rc[0] + ',' + rc[1]] = true; }); });
    var html = '';
    for (var r = 0; r < SL_ROWS; r++) for (var c = 0; c < SL_COLS; c++){
      html += '<div class="sl-cell' + (onLine[r + ',' + c] ? ' sl-on-line' : '') + '" id="slC' + r + '_' + c + '">' + SL.grid[r][c] + '</div>';
    }
    g.innerHTML = html;
    _slDrawLines();
  }

  // Overlay the active paylines as translucent coloured polylines connecting cell centres, so the
  // player can SEE which lines they bought.
  function _slDrawLines(){
    var svg = document.getElementById('slLineSvg'); if (!svg) return;
    var wrap = svg.parentNode; if (!wrap) return;
    var wr = wrap.getBoundingClientRect();
    if (!wr.width){ return; }
    svg.setAttribute('viewBox', '0 0 ' + Math.round(wr.width) + ' ' + Math.round(wr.height));
    var hues = ['#f2c14e', '#5aa9ff', '#f0705e', '#57b45a', '#c39bff'];
    var parts = '';
    _slActiveLines().forEach(function(line, li){
      var pts = line.cells.map(function(rc){
        var cell = document.getElementById('slC' + rc[0] + '_' + rc[1]); if (!cell) return null;
        var cr = cell.getBoundingClientRect();
        return (cr.left + cr.width / 2 - wr.left).toFixed(1) + ',' + (cr.top + cr.height / 2 - wr.top).toFixed(1);
      }).filter(Boolean).join(' ');
      if (pts) parts += '<polyline points="' + pts + '" fill="none" stroke="' + hues[li % hues.length] +
        '" stroke-width="4" stroke-opacity="0.5" stroke-linejoin="round" stroke-linecap="round"/>';
    });
    svg.innerHTML = parts;
  }

  function slSpin(){
    if (SL.spinning || !a2Active()) return;
    if (SL.spinsLeft <= 0){
      if (typeof showToast === 'function') showToast('Out of spins for this pass — Play Again for ' + SL_MAX_SPINS + ' more!');
      return;
    }
    var total = _slTotalBet();
    if (total > SL_MAX_BET){   // defensive — the bet/line + line-count UI options can't reach this, but stay safe
      if (typeof showToast === 'function') showToast('Max total bet is 💵' + SL_MAX_BET + '!');
      if (typeof playSfx === 'function') playSfx('wrong');
      return;
    }
    if (!state || (state.coins || 0) < total){
      if (typeof showToast === 'function') showToast('Not enough Cash for that bet!');
      if (typeof playSfx === 'function') playSfx('wrong');
      return;
    }
    state.coins -= total;
    SL.spinsLeft--;
    if (typeof updateStats === 'function') updateStats();
    SL.spinning = true;
    SL.stopped = [false, false, false, false, false];
    SL.finalGrid = _slNewGrid();
    document.querySelectorAll('.sl-cell').forEach(function(el){ el.classList.remove('sl-cell-win', 'sl-cell-jackpot', 'sl-stop-flash'); });
    var banner = document.getElementById('slBanner');
    if (banner){ banner.textContent = 'Spinning… tap ⏹ to stop each reel!'; banner.className = 'sl-banner'; }
    var spinBtn = document.getElementById('slSpinBtn'); if (spinBtn) spinBtn.disabled = true;
    var stopBtn = document.getElementById('slStopBtn'); if (stopBtn) stopBtn.disabled = false;
    for (var rc = 0; rc < SL_COLS; rc++){
      var rb = document.getElementById('slReelStop' + rc);
      if (rb){ rb.disabled = false; rb.classList.remove('sl-reel-stopped'); }
    }
    if (typeof playSfx === 'function') playSfx('click');
    // Tumbles FOREVER — no auto-stop timers. The reels only lock in when the player calls
    // slStopOne(col) or slStop(), a pure skill-stop with no "wait it out" option.
    SL.tumble = a2Every(function(){
      for (var c = 0; c < SL_COLS; c++){
        if (SL.stopped[c]) continue;
        for (var r = 0; r < SL_ROWS; r++){
          var cell = document.getElementById('slC' + r + '_' + c);
          if (cell) cell.textContent = _slPick();
        }
      }
    }, 80);
    _slHud();
  }

  function _slStopColumn(col){
    if (SL.stopped[col]) return;
    SL.stopped[col] = true;
    for (var r = 0; r < SL_ROWS; r++){
      SL.grid[r][col] = SL.finalGrid[r][col];
      var cell = document.getElementById('slC' + r + '_' + col);
      if (cell){ cell.textContent = SL.grid[r][col]; cell.classList.add('sl-stop-flash'); }
    }
    var rb = document.getElementById('slReelStop' + col);
    if (rb){ rb.disabled = true; rb.classList.add('sl-reel-stopped'); }
    if (typeof playSfx === 'function') playSfx('click');
    if (SL.stopped[0] && SL.stopped[1] && SL.stopped[2] && SL.stopped[3] && SL.stopped[4]){
      if (SL.tumble){ clearInterval(SL.tumble); SL.tumble = 0; }
      var stopBtn = document.getElementById('slStopBtn'); if (stopBtn) stopBtn.disabled = true;
      a2Later(_slSettle, 300);
    }
  }

  // Skill-stop ONE reel — the reels never auto-stop, so this (or slStop below) is the ONLY way a
  // column ever locks in. Lets the player time each of the 5 reels individually.
  function slStopOne(col){
    if (!SL.spinning || SL.stopped[col]) return;
    _slStopColumn(col);
  }

  // Manual skill-stop: immediately finalize every column still spinning.
  function slStop(){
    if (!SL.spinning) return;
    for (var c = 0; c < SL_COLS; c++){ if (!SL.stopped[c]) _slStopColumn(c); }
  }

  // A line pays when 2+ identical symbols run from the LEFT (classic slot rule; 2026-07-16: was
  // 3+-only — too rare to feel fair, see SL_RUN_MULT for the tiered payout).
  function _slLineMatch(line){
    var syms = line.cells.map(function(rc){ return SL.grid[rc[0]][rc[1]]; });
    var first = syms[0], run = 1;
    for (var i = 1; i < syms.length; i++){ if (syms[i] === first) run++; else break; }
    if (run >= 2) return { sym: first, count: run };
    return null;
  }
  function _slCheckJackpots(){
    var corners = SL_CORNER_CELLS.map(function(rc){ return SL.grid[rc[0]][rc[1]]; });
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
        var w = Math.round(SL.bet * (SL_PAY[m.sym] || 2) * (SL_RUN_MULT[m.count] || 1));
        totalWin += w;
        wins.push({ line: line, m: m, win: w });
      }
    });
    var jp = _slCheckJackpots(), jackpotWin = 0, jackpotMsgs = [];
    if (jp.corner){ jackpotWin += _slTotalBet() * SL_JP_CORNER; jackpotMsgs.push('🎆 FOUR CORNERS JACKPOT!'); }
    if (jp.cross){ jackpotWin += _slTotalBet() * SL_JP_CROSS; jackpotMsgs.push('✨ CENTER CROSS MEGA JACKPOT!'); }
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
    // Highlight only the matched run of each winning line.
    wins.forEach(function(w){
      for (var i = 0; i < w.m.count; i++){
        var rc = w.line.cells[i], cell = document.getElementById('slC' + rc[0] + '_' + rc[1]);
        if (cell) cell.classList.add('sl-cell-win');
      }
    });
    if (jackpotWin > 0){
      var jpCells = [].concat(jp.corner ? SL_CORNER_CELLS : [], jp.cross ? SL_CROSS_CELLS : []);
      jpCells.forEach(function(rc){ var cell = document.getElementById('slC' + rc[0] + '_' + rc[1]); if (cell) cell.classList.add('sl-cell-jackpot'); });
    }
    // Show the calculation ~500ms later so the line/jackpot cell highlights are visible first
    // (user: "pop up the cash you earn or lose with the calculation... press ok to leave").
    if (typeof showCasinoResult === 'function'){
      var calcLines = [];
      wins.forEach(function(w){
        calcLines.push({ label: w.line.label + ': ' + w.m.sym.repeat(w.m.count) + ' × 💵' + SL.bet + ' × ' + (SL_PAY[w.m.sym] || 2) + ' × ' + (SL_RUN_MULT[w.m.count] || 1),
          value: '+💵' + w.win });
      });
      if (jp.corner) calcLines.push({ label: '🎆 4 Corners: 💵' + _slTotalBet() + ' bet × ' + SL_JP_CORNER, value: '+💵' + (_slTotalBet() * SL_JP_CORNER) });
      if (jp.cross) calcLines.push({ label: '✨ Center Cross: 💵' + _slTotalBet() + ' bet × ' + SL_JP_CROSS, value: '+💵' + (_slTotalBet() * SL_JP_CROSS) });
      if (!calcLines.length) calcLines.push({ label: 'No matching lines this spin', value: '−💵' + _slTotalBet() });
      calcLines.push({ label: 'Total', value: totalWin > 0 ? ('+💵' + totalWin) : ('−💵' + _slTotalBet()), total: true });
      setTimeout(function(){
        showCasinoResult({
          icon: jackpotWin > 0 ? '🎆' : (totalWin > 0 ? '🎉' : '💫'),
          headline: totalWin > 0 ? ('+💵' + totalWin) : ('−💵' + _slTotalBet()),
          lines: calcLines
        });
      }, 500);
    }
    SL.spinning = false;
    var spinBtn = document.getElementById('slSpinBtn');
    var stopBtn = document.getElementById('slStopBtn'); if (stopBtn) stopBtn.disabled = true;
    var againRow = document.getElementById('slPlayAgainRow');
    if (SL.spinsLeft <= 0){
      // Pass exhausted — lock SPIN and surface the Play Again flow instead.
      if (spinBtn) spinBtn.disabled = true;
      if (againRow) againRow.style.display = '';
    } else {
      if (spinBtn) spinBtn.disabled = false;
      if (againRow) againRow.style.display = 'none';
    }
    _slHud();
  }
