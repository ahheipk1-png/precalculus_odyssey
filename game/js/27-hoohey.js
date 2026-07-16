  // ============================================================================
  // Hoo Hey How 🎲 (Bầu Cua / Fish-Prawn-Crab) — a dice betting game inside
  // Wonderland (#hooHeyView). Bet Cash 💵 on symbols; three dice tumble in the
  // open FOREVER — no auto-stop — until the player stops them, one at a time
  // (⏹1/⏹2/⏹3, pure skill-stop) or all at once (Stop All); each die matching a
  // bet pays 1:1 (plus your stake back). Cash-only, per the design.
  //
  // Entrance: wonderPlay('openHooHey') from the Wonderland lobby, 1 Wonderland
  // Pass = HH_MAX_ROLLS (3) rolls; once exhausted, Play Again buys 3 more (same
  // pattern as Star Slots). Total bet across all 6 symbols is capped at
  // HH_MAX_BET (1000). A persistent, scrollable history panel records the last
  // rolls (dice, winning symbols, bets, amount, net).
  // ============================================================================
  var HH_SYMBOLS = [
    { id: 'deer',    icon: '🦌', name: 'Deer' },
    { id: 'gourd',   icon: '🎏', name: 'Gourd' },
    { id: 'rooster', icon: '🐓', name: 'Rooster' },
    { id: 'fish',    icon: '🐟', name: 'Fish' },
    { id: 'crab',    icon: '🦀', name: 'Crab' },
    { id: 'shrimp',  icon: '🦐', name: 'Shrimp' }
  ];
  var HH_MAX_ROLLS = 3, HH_MAX_BET = 1000;

  var _hhBets = {}, _hhDice = null, _hhResult = '';
  var _hhRolling = false, _hhRollTimer = null, _hhOutcome = '';   // outcome: 'win' | 'lose' | 'even'
  var _hhPhaseTimers = [];
  // Per-die skill-stop state — each of the 3 dice can be stopped individually, like the slot reels.
  var _hhDieStopped = [false, false, false];
  var _hhRollsLeft = HH_MAX_ROLLS;   // one Wonderland Pass buys HH_MAX_ROLLS rolls; Play Again buys 3 more
  var _hhFinal = null, _hhBetsSnapshot = null, _hhTotal = 0;   // decided up front; used once all 3 stop
  var HH_HIST_KEY = 'poHooHeyHistory';
  var _hhHistory = _hhLoadHistory();     // newest first; capped at 60

  function _hhSym(id){ return HH_SYMBOLS.filter(function(x){ return x.id === id; })[0]; }
  function _hhLoadHistory(){ try { return JSON.parse(localStorage.getItem(HH_HIST_KEY)) || []; } catch (e) { return []; } }
  function _hhSaveHistory(){ try { localStorage.setItem(HH_HIST_KEY, JSON.stringify(_hhHistory.slice(0, 60))); } catch (e) {} }
  function _hhClearTimers(){
    _hhPhaseTimers.forEach(function(t){ clearTimeout(t); }); _hhPhaseTimers = [];
    if (_hhRollTimer){ clearInterval(_hhRollTimer); _hhRollTimer = null; }
  }

  function openHooHey(){
    _hhClearTimers();
    _hhBets = {}; _hhDice = null; _hhResult = ''; _hhRolling = false; _hhOutcome = '';
    _hhDieStopped = [false, false, false];
    _hhRollsLeft = HH_MAX_ROLLS;   // fresh 3 rolls per Wonderland Pass (first entry or Play Again)
    document.querySelectorAll('.view-container').forEach(function(v){ v.classList.remove('active'); });
    var v = document.getElementById('hooHeyView');
    if (v) v.classList.add('active');
    renderHooHey();
    if (typeof playMusic === 'function') playMusic('arena');
  }
  function closeHooHey(){
    _hhClearTimers();
    _hhBets = {}; _hhDice = null; _hhResult = ''; _hhRolling = false; _hhOutcome = '';
    if (typeof openWonderland === 'function') openWonderland();
    else { document.querySelectorAll('.view-container.active').forEach(function(x){ x.classList.remove('active'); }); el.equationView.classList.add('active'); }
  }

  function _hhTotalBet(){ var t = 0; for (var k in _hhBets) t += _hhBets[k]; return t; }

  // The dice stage: either idle placeholders, the rolling bowl (covering the dice),
  // or the landed dice.
  function _hhDiceStageHtml(){
    if (_hhRolling){
      // No bowl — the three dice tumble in the open. Each has its OWN skill-stop button so the
      // player can lock in one die at a time instead of only a single stop-all.
      var dice = '', stops = '';
      for (var i = 0; i < 3; i++){
        var stopped = _hhDieStopped[i];
        dice += '<span class="hh-die hh-die-rolling' + (stopped ? ' hh-die-locked' : '') + '" id="hhDie' + i + '">' +
          (stopped ? _hhSym(_hhFinal[i]).icon : '🎲') + '</span>';
        stops += '<button type="button" class="btn btn-ghost hh-die-stop" id="hhDieStop' + i + '"' +
          (stopped ? ' disabled' : '') + ' onclick="hhStopDie(' + i + ')" data-tooltip="Stop die ' + (i + 1) + ' now.">⏹' + (i + 1) + '</button>';
      }
      var rolling = '<div class="hh-dice hh-dice-tumbling">' + dice + '</div><div class="hh-die-stops">' + stops + '</div>';
      return '<div class="hh-dice-stage">' + rolling + '</div>';
    }
    if (_hhDice){
      var cls = 'hh-dice' + (_hhOutcome ? ' hh-dice-' + _hhOutcome : '');
      return '<div class="hh-dice-stage"><div class="' + cls + '">' + _hhDice.map(function(id){
        return '<span class="hh-die hh-die-land">' + _hhSym(id).icon + '</span>';
      }).join('') + '</div></div>';
    }
    return '<div class="hh-dice-stage"><div class="hh-dice">' +
      '<span class="hh-die">❔</span><span class="hh-die">❔</span><span class="hh-die">❔</span></div></div>';
  }

  function _hhHistoryHtml(){
    var rows;
    if (!_hhHistory.length){
      rows = '<div class="hh-hist-empty">No rolls yet. Place a bet and roll!</div>';
    } else {
      rows = _hhHistory.map(function(h){
        var faces = h.dice.map(function(id){ return _hhSym(id).icon; }).join(' ');
        var betTxt = Object.keys(h.bets).map(function(id){ return _hhSym(id).icon + '💵' + h.bets[id]; }).join(' ');
        var netCls = h.net > 0 ? 'hh-hist-win' : (h.net < 0 ? 'hh-hist-lose' : 'hh-hist-even');
        var netTxt = h.net > 0 ? ('+💵' + h.net) : (h.net < 0 ? ('−💵' + Math.abs(h.net)) : '±0');
        return '<div class="hh-hist-row">' +
          '<span class="hh-hist-n">#' + h.n + '</span>' +
          '<span class="hh-hist-dice">' + faces + '</span>' +
          '<span class="hh-hist-bet">' + (betTxt || '—') + '</span>' +
          '<span class="hh-hist-net ' + netCls + '">' + netTxt + '</span>' +
        '</div>';
      }).join('');
    }
    return '<aside class="hh-history">' +
      '<div class="hh-hist-head"><h3>📜 History</h3>' +
        (_hhHistory.length ? '<button class="btn btn-ghost hh-hist-clear" onclick="hhClearHistory()" data-tooltip="Clear the roll history for this device.">Clear</button>' : '') +
      '</div>' +
      '<div class="hh-hist-list">' + rows + '</div>' +
    '</aside>';
  }

  function renderHooHey(){
    var v = document.getElementById('hooHeyView');
    if (!v) return;
    var outOfRolls = _hhRollsLeft <= 0;
    var tiles = HH_SYMBOLS.map(function(s){
      var bet = _hhBets[s.id] || 0;
      var lit = _hhDice && _hhDice.indexOf(s.id) !== -1 ? ' hh-hit' : '';
      var dis = (_hhRolling || outOfRolls) ? ' disabled' : '';
      return '<div class="hh-tile' + lit + '">' +
        '<div class="hh-icon">' + s.icon + '</div><div class="hh-name">' + s.name + '</div>' +
        '<div class="hh-bet">Bet: 💵' + bet + '</div>' +
        '<div class="hh-betbtns">' +
          '<button class="shop-btn"' + dis + ' onclick="hhBet(\'' + s.id + '\',10)" data-tooltip="Bet 10 Cash on ' + s.name + '.">+10</button>' +
          '<button class="shop-btn"' + dis + ' onclick="hhBet(\'' + s.id + '\',50)" data-tooltip="Bet 50 Cash on ' + s.name + '.">+50</button>' +
          '<button class="shop-btn"' + dis + ' onclick="hhBet(\'' + s.id + '\',100)" data-tooltip="Bet 100 Cash on ' + s.name + '.">+100</button>' +
          (bet > 0 ? '<button class="shop-btn shop-btn-sell"' + dis + ' onclick="hhClear(\'' + s.id + '\')" data-tooltip="Remove your bet on ' + s.name + '.">✕</button>' : '') +
        '</div></div>';
    }).join('');
    v.innerHTML =
      '<div class="rpg-header"><h2 class="rpg-title">🎲 Hoo Hey How</h2>' +
      '<button class="btn btn-ghost" onclick="closeHooHey()" data-tooltip="Return to the Wonderland lobby.">← Wonderland</button></div>' +
      '<div class="currency-bar" id="hhCurBar"></div>' +
      '<div class="wond-hud" id="hhHud"><span class="wond-chip">🎲 Rolls left: <b>' + Math.max(0, _hhRollsLeft) + ' / ' + HH_MAX_ROLLS + '</b></span>' +
        '<span class="wond-chip">🎯 Max bet: <b>💵' + HH_MAX_BET + '</b></span></div>' +
      '<p class="hh-intro">Bet Cash 💵 on symbols, then roll — dice tumble forever until YOU stop them: tap ⏹1/⏹2/⏹3 to stop each die yourself (skill-stop), or ⏹ Stop All to lock in every die at once. Every die that matches your bet pays your stake back <b>plus</b> the same again! ' + HH_MAX_ROLLS + ' rolls per Wonderland Pass.</p>' +
      '<div class="hh-layout">' +
        '<div class="hh-main">' +
          _hhDiceStageHtml() +
          (_hhResult ? '<div class="hh-result' + (_hhOutcome ? ' hh-result-' + _hhOutcome : '') + '">' + _hhResult + '</div>' : '') +
          '<div class="hh-grid">' + tiles + '</div>' +
          '<div class="hh-roll-row"><span class="hh-totalbet">Total bet: 💵' + _hhTotalBet() + '</span>' +
          (outOfRolls ?
            '<button type="button" class="btn btn-primary" onclick="wonderPlay(\'openHooHey\')" data-tooltip="Buy 3 more rolls for 1 Wonderland Pass.">🔁 Play Again (1 🎟️ · 3 rolls)</button>' :
            '<button class="btn btn-primary hh-roll-btn"' + (_hhRolling ? ' disabled' : '') + ' onclick="hhRoll()" data-tooltip="Roll the three dice. Every die matching a bet pays your stake back plus the same again.">' +
            (_hhRolling ? '🎲 Rolling…' : '🎲 Roll the dice!') + '</button>' +
            (_hhRolling ? '<button class="btn btn-ghost hh-stop-btn" onclick="hhStop()" data-tooltip="Stop every die at once and reveal the result now.">⏹ Stop All</button>' : '')
          ) +
          '</div>' +
        '</div>' +
        _hhHistoryHtml() +
      '</div>';
    var bar = document.getElementById('hhCurBar');
    if (bar && typeof renderMaterialsBar === 'function'){ var save = el.materialsBar; el.materialsBar = bar; renderMaterialsBar(); el.materialsBar = save; }
  }

  function hhBet(id, amt){
    if (_hhRolling) return;
    if (_hhRollsLeft <= 0){ if (typeof showToast === 'function') showToast('Out of rolls for this pass — Play Again for 3 more!'); return; }
    if (state.coins < amt){ showToast('Not enough Cash to bet.'); return; }
    if (_hhTotalBet() + amt > HH_MAX_BET){
      if (typeof showToast === 'function') showToast('Max total bet is 💵' + HH_MAX_BET + '!');
      if (typeof playSfx === 'function') playSfx('wrong');
      return;
    }
    _hhBets[id] = (_hhBets[id] || 0) + amt;
    _hhResult = ''; _hhDice = null; _hhOutcome = '';
    renderHooHey();
  }
  function hhClear(id){ if (_hhRolling) return; delete _hhBets[id]; renderHooHey(); }

  function hhClearHistory(){
    if (!_hhHistory.length) return;
    if (typeof window.confirm === 'function' && !window.confirm('Clear all Hoo Hey How roll history?')) return;
    _hhHistory = [];
    _hhSaveHistory();
    renderHooHey();
    if (typeof showToast === 'function') showToast('🧹 History cleared.');
  }

  function hhRoll(){
    if (_hhRolling) return;
    if (_hhRollsLeft <= 0){ if (typeof showToast === 'function') showToast('Out of rolls for this pass — Play Again for 3 more!'); return; }
    var total = _hhTotalBet();
    if (total <= 0){ showToast('Place a bet first!'); return; }
    if (total > HH_MAX_BET){   // defensive — hhBet()'s cap already prevents reaching this, but stay safe
      if (typeof showToast === 'function') showToast('Max total bet is 💵' + HH_MAX_BET + '!');
      if (typeof playSfx === 'function') playSfx('wrong');
      return;
    }
    if (state.coins < total){ showToast('Not enough Cash for that bet.'); return; }
    state.coins -= total;
    _hhRollsLeft--;

    // Decide the final dice now; each die reveals only once the player stops it.
    _hhFinal = [HH_SYMBOLS[rand(0, 5)].id, HH_SYMBOLS[rand(0, 5)].id, HH_SYMBOLS[rand(0, 5)].id];
    _hhBetsSnapshot = {}; for (var k in _hhBets) _hhBetsSnapshot[k] = _hhBets[k];
    _hhTotal = total;
    _hhRolling = true; _hhResult = ''; _hhDice = null; _hhOutcome = '';
    _hhDieStopped = [false, false, false];
    if (typeof updateStats === 'function') updateStats();  // reflect the deducted stake
    renderHooHey();

    _hhClearTimers();

    // Tumbles FOREVER — no auto-stop. Each die's face flips through random symbols until the
    // player calls hhStopDie(i) or hhStop(), a pure skill-stop with no "wait it out" option.
    _hhRollTimer = setInterval(function(){
      for (var i = 0; i < 3; i++){
        if (_hhDieStopped[i]) continue;
        var f = document.getElementById('hhDie' + i);
        if (f) f.textContent = HH_SYMBOLS[rand(0, 5)].icon;
      }
    }, 90);
    if (typeof playSfx === 'function') playSfx('click');
  }

  // Locks ONE die to its decided face now (auto-timer or manual tap both funnel through here).
  // Once all 3 are stopped, pauses briefly then runs the payout.
  function _hhStopDie(i){
    if (!_hhRolling || _hhDieStopped[i]) return;
    _hhDieStopped[i] = true;
    var f = document.getElementById('hhDie' + i);
    if (f){ f.textContent = _hhSym(_hhFinal[i]).icon; f.classList.add('hh-die-locked'); }
    var btn = document.getElementById('hhDieStop' + i);
    if (btn) btn.disabled = true;
    if (typeof playSfx === 'function') playSfx('click');
    if (_hhDieStopped[0] && _hhDieStopped[1] && _hhDieStopped[2]){
      if (_hhRollTimer){ clearInterval(_hhRollTimer); _hhRollTimer = null; }
      _hhPhaseTimers.push(setTimeout(_hhFinishRoll, 300));
    }
  }

  // Public: skill-stop a single die (called by its ⏹ button).
  function hhStopDie(i){ _hhStopDie(i); }

  // Public: stop ALL dice still spinning at once (convenience, same as before).
  function hhStop(){
    if (!_hhRolling) return;
    for (var i = 0; i < 3; i++){ if (!_hhDieStopped[i]) _hhStopDie(i); }
  }

  function _hhFinishRoll(){
    _hhRolling = false;
    _hhDice = _hhFinal;
    var winnings = 0;
    for (var id in _hhBetsSnapshot){
      var matches = _hhDice.filter(function(d){ return d === id; }).length;
      if (matches > 0) winnings += _hhBetsSnapshot[id] * (1 + matches); // stake back + 1× per match
    }
    state.coins += winnings;
    var net = winnings - _hhTotal;
    _hhOutcome = net > 0 ? 'win' : (net === 0 ? 'even' : 'lose');
    _hhResult = net > 0 ? ('🎉 You won 💵' + winnings + ' (net +' + net + ')!') : (net === 0 ? '➖ Broke even.' : '💸 You lost 💵' + Math.abs(net) + '. Try again!');
    if (typeof playSfx === 'function') playSfx(net > 0 ? 'victory' : 'wrong');
    if (typeof updateStats === 'function') updateStats();
    // Record history (newest first) and persist.
    var nextN = (_hhHistory[0] ? _hhHistory[0].n : 0) + 1;
    _hhHistory.unshift({ n: nextN, dice: _hhFinal.slice(), bets: _hhBetsSnapshot, totalBet: _hhTotal, winnings: winnings, net: net });
    if (_hhHistory.length > 60) _hhHistory.length = 60;
    _hhSaveHistory();
    _hhBets = {};
    renderHooHey();
  }
