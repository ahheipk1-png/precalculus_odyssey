  // ============================================================================
  // Hoo Hey How 🎲 (Bầu Cua / Fish-Prawn-Crab) — a dice betting game inside
  // Wonderland (#hooHeyView). Bet Cash 💵 on symbols; three dice roll; each die
  // matching a bet pays 1:1 (plus your stake back). Cash-only, per the design.
  // Entrance: a card in the Wonderland lobby (openHooHey).
  // ============================================================================
  var HH_SYMBOLS = [
    { id: 'deer',    icon: '🦌', name: 'Deer' },
    { id: 'gourd',   icon: '🎏', name: 'Gourd' },
    { id: 'rooster', icon: '🐓', name: 'Rooster' },
    { id: 'fish',    icon: '🐟', name: 'Fish' },
    { id: 'crab',    icon: '🦀', name: 'Crab' },
    { id: 'shrimp',  icon: '🦐', name: 'Shrimp' }
  ];
  var _hhBets = {}, _hhDice = null, _hhResult = '';
  var _hhRolling = false, _hhRollTimer = null, _hhOutcome = '';   // outcome: 'win' | 'lose' | 'even'
  function _hhSym(id){ return HH_SYMBOLS.filter(function(x){ return x.id === id; })[0]; }

  function openHooHey(){
    document.querySelectorAll('.view-container').forEach(function(v){ v.classList.remove('active'); });
    var v = document.getElementById('hooHeyView');
    if (v) v.classList.add('active');
    renderHooHey();
    if (typeof playMusic === 'function') playMusic('arena');
  }
  function closeHooHey(){
    if (_hhRollTimer){ clearInterval(_hhRollTimer); _hhRollTimer = null; }
    _hhBets = {}; _hhDice = null; _hhResult = ''; _hhRolling = false; _hhOutcome = '';
    if (typeof openWonderland === 'function') openWonderland();
    else { document.querySelectorAll('.view-container.active').forEach(function(x){ x.classList.remove('active'); }); el.equationView.classList.add('active'); }
  }

  function _hhTotalBet(){ var t = 0; for (var k in _hhBets) t += _hhBets[k]; return t; }

  function renderHooHey(){
    var v = document.getElementById('hooHeyView');
    if (!v) return;
    var tiles = HH_SYMBOLS.map(function(s){
      var bet = _hhBets[s.id] || 0;
      var lit = _hhDice && _hhDice.indexOf(s.id) !== -1 ? ' hh-hit' : '';
      return '<div class="hh-tile' + lit + '">' +
        '<div class="hh-icon">' + s.icon + '</div><div class="hh-name">' + s.name + '</div>' +
        '<div class="hh-bet">Bet: 💵' + bet + '</div>' +
        '<div class="hh-betbtns">' +
          '<button class="shop-btn" onclick="hhBet(\'' + s.id + '\',10)">+10</button>' +
          '<button class="shop-btn" onclick="hhBet(\'' + s.id + '\',50)">+50</button>' +
          (bet > 0 ? '<button class="shop-btn shop-btn-sell" onclick="hhClear(\'' + s.id + '\')">✕</button>' : '') +
        '</div></div>';
    }).join('');
    var dice;
    if (_hhRolling){
      dice = '<div class="hh-dice hh-dice-rolling">' +
        '<span class="hh-die hh-die-rolling">🎲</span>' +
        '<span class="hh-die hh-die-rolling">🎲</span>' +
        '<span class="hh-die hh-die-rolling">🎲</span></div>';
    } else if (_hhDice){
      var cls = 'hh-dice' + (_hhOutcome ? ' hh-dice-' + _hhOutcome : '');
      dice = '<div class="' + cls + '">' + _hhDice.map(function(id){
        return '<span class="hh-die hh-die-land">' + _hhSym(id).icon + '</span>';
      }).join('') + '</div>';
    } else {
      dice = '<div class="hh-dice"><span class="hh-die">❔</span><span class="hh-die">❔</span><span class="hh-die">❔</span></div>';
    }
    v.innerHTML =
      '<div class="rpg-header"><h2 class="rpg-title">🎲 Hoo Hey How</h2>' +
      '<button class="btn btn-ghost" onclick="closeHooHey()">← Wonderland</button></div>' +
      '<div class="currency-bar" id="hhCurBar"></div>' +
      '<p class="hh-intro">Bet Cash 💵 on symbols. Three dice roll — every die that matches your bet pays you back your stake <b>plus</b> the same again!</p>' +
      dice +
      (_hhResult ? '<div class="hh-result' + (_hhOutcome ? ' hh-result-' + _hhOutcome : '') + '">' + _hhResult + '</div>' : '') +
      '<div class="hh-grid">' + tiles + '</div>' +
      '<div class="hh-roll-row"><span>Total bet: 💵' + _hhTotalBet() + '</span>' +
      '<button class="btn btn-primary"' + (_hhRolling ? ' disabled' : '') + ' onclick="hhRoll()">' +
      (_hhRolling ? '🎲 Rolling…' : '🎲 Roll the dice!') + '</button></div>';
    var bar = document.getElementById('hhCurBar');
    if (bar && typeof renderMaterialsBar === 'function'){ var save = el.materialsBar; el.materialsBar = bar; renderMaterialsBar(); el.materialsBar = save; }
  }

  function hhBet(id, amt){
    if (state.coins < amt){ showToast('Not enough Cash to bet.'); return; }
    _hhBets[id] = (_hhBets[id] || 0) + amt;
    _hhResult = ''; _hhDice = null;
    renderHooHey();
  }
  function hhClear(id){ delete _hhBets[id]; renderHooHey(); }

  function hhRoll(){
    if (_hhRolling) return;
    var total = _hhTotalBet();
    if (total <= 0){ showToast('Place a bet first!'); return; }
    if (state.coins < total){ showToast('Not enough Cash for that bet.'); return; }
    state.coins -= total;

    // Decide the final dice now; reveal them after the roll animation.
    var final = [HH_SYMBOLS[rand(0, 5)].id, HH_SYMBOLS[rand(0, 5)].id, HH_SYMBOLS[rand(0, 5)].id];
    _hhRolling = true; _hhResult = ''; _hhDice = null; _hhOutcome = '';
    if (typeof playSfx === 'function') playSfx('click');
    renderHooHey();

    // Tumble: cycle random symbols on each die while the shake animation plays.
    var faces = document.querySelectorAll('#hooHeyView .hh-die-rolling');
    if (_hhRollTimer) clearInterval(_hhRollTimer);
    _hhRollTimer = setInterval(function(){
      for (var i = 0; i < faces.length; i++){ faces[i].textContent = HH_SYMBOLS[rand(0, 5)].icon; }
    }, 90);

    setTimeout(function(){
      clearInterval(_hhRollTimer); _hhRollTimer = null;
      _hhRolling = false;
      _hhDice = final;
      var winnings = 0;
      for (var id in _hhBets){
        var matches = _hhDice.filter(function(d){ return d === id; }).length;
        if (matches > 0) winnings += _hhBets[id] * (1 + matches); // stake back + 1× per match
      }
      state.coins += winnings;
      var net = winnings - total;
      _hhOutcome = net > 0 ? 'win' : (net === 0 ? 'even' : 'lose');
      _hhResult = net > 0 ? ('🎉 You won 💵' + winnings + ' (net +' + net + ')!') : (net === 0 ? '➖ Broke even.' : '💸 You lost 💵' + Math.abs(net) + '. Try again!');
      if (typeof playSfx === 'function') playSfx(net > 0 ? 'victory' : 'wrong');
      if (typeof updateStats === 'function') updateStats();
      _hhBets = {};
      renderHooHey();
    }, 1150);
  }
