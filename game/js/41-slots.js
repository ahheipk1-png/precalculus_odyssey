  // ============================================================================
  // 🎰 Star Slots (module 41; uses the A2 shell from 39-puzzles.js)
  // Entry costs 1 Wonderland Pass (wonderPlay); each SPIN bets Cash. Three
  // matching symbols pay the table below; any pair pays 1.5x. Weighted reels
  // give ~97% return, so it's fun but never a money printer.
  // ============================================================================
  var SL = { spinning: false, bet: 10, final: null };
  var SL_REEL = ['🚀','🚀','🚀','🚀','🚀','⭐','⭐','⭐','⭐','🪐','🪐','🪐','👽','👽','💎','7️⃣'];
  var SL_PAY = { '🚀': 3, '⭐': 4, '🪐': 6, '👽': 10, '💎': 20, '7️⃣': 50 };

  function openSlots(){
    SL.spinning = false; SL.bet = 10; SL.final = null;
    var payRows = Object.keys(SL_PAY).map(function(s){
      return '<span class="wond-chip">' + s + s + s + ' ×<b>' + SL_PAY[s] + '</b></span>';
    }).join('');
    a2Shell('🎰 Star Slots', 'openWonderland()',
      '<div class="wond-hud" id="slHud"></div>' +
      '<div class="sl-machine">' +
        '<div class="sl-reel" id="slR0">❔</div>' +
        '<div class="sl-reel" id="slR1">❔</div>' +
        '<div class="sl-reel" id="slR2">❔</div>' +
      '</div>' +
      '<div class="sl-banner" id="slBanner">Pick a bet and pull the lever!</div>' +
      '<div class="sl-bets" id="slBets">' +
        '<button type="button" class="btn btn-secondary sl-bet" onclick="slSetBet(10)">💵10</button>' +
        '<button type="button" class="btn btn-secondary sl-bet" onclick="slSetBet(50)">💵50</button>' +
        '<button type="button" class="btn btn-secondary sl-bet" onclick="slSetBet(100)">💵100</button>' +
        '<button type="button" class="btn btn-primary sl-spin" id="slSpinBtn" onclick="slSpin()">🎰 SPIN!</button>' +
      '</div>' +
      '<div class="sl-paytable">' + payRows + '<span class="wond-chip">any pair ×<b>1.5</b></span></div>',
      'Match all three symbols for the big multipliers — three 7️⃣ pays 50× your bet!');
    slSetBet(10);
    _slHud();
  }
  function _slHud(){
    var hud = document.getElementById('slHud');
    if (hud) hud.innerHTML = '<span class="wond-chip">💵 Cash: <b>' + ((state && state.coins) || 0) + '</b></span>' +
      '<span class="wond-chip">🎯 Bet: <b>💵' + SL.bet + '</b></span>';
  }
  function slSetBet(n){
    if (SL.spinning) return;
    SL.bet = n;
    var btns = document.querySelectorAll('.sl-bet');
    for (var i = 0; i < btns.length; i++) btns[i].classList.toggle('sl-bet-on', btns[i].textContent === '💵' + n);
    _slHud();
  }
  function _slPick(){ return SL_REEL[rand(0, SL_REEL.length - 1)]; }
  function slSpin(){
    if (SL.spinning || !a2Active()) return;
    if (!state || (state.coins || 0) < SL.bet){
      if (typeof showToast === 'function') showToast('Not enough Cash for that bet!');
      if (typeof playSfx === 'function') playSfx('wrong');
      return;
    }
    state.coins -= SL.bet;
    if (typeof updateStats === 'function') updateStats();
    SL.spinning = true;
    SL.final = [_slPick(), _slPick(), _slPick()];
    var banner = document.getElementById('slBanner');
    if (banner){ banner.textContent = 'Spinning…'; banner.className = 'sl-banner'; }
    var spinBtn = document.getElementById('slSpinBtn'); if (spinBtn) spinBtn.disabled = true;
    if (typeof playSfx === 'function') playSfx('click');
    var reels = [document.getElementById('slR0'), document.getElementById('slR1'), document.getElementById('slR2')];
    var tumble = a2Every(function(){
      for (var i = 0; i < 3; i++){ if (reels[i] && !reels[i].dataset.stopped) reels[i].textContent = _slPick(); }
    }, 70);
    [800, 1350, 1900].forEach(function(ms, idx){
      a2Later(function(){
        var r = reels[idx];
        if (r){ r.textContent = SL.final[idx]; r.dataset.stopped = '1'; r.classList.add('sl-stop'); }
        if (typeof playSfx === 'function') playSfx('click');
        if (idx === 2){
          clearInterval(tumble);
          a2Later(_slSettle, 250);
        }
      }, ms);
    });
  }
  function _slSettle(){
    var f = SL.final, banner = document.getElementById('slBanner');
    var win = 0, msg, cls = 'sl-banner';
    if (f[0] === f[1] && f[1] === f[2]){
      win = SL.bet * SL_PAY[f[0]];
      msg = (f[0] === '7️⃣' ? '🎆 JACKPOT!!! ' : '🌟 TRIPLE! ') + f[0] + f[0] + f[0] + ' pays 💵' + win + '!';
      cls += ' sl-win';
      if (typeof playSfx === 'function') playSfx('victory');
    } else if (f[0] === f[1] || f[1] === f[2] || f[0] === f[2]){
      win = Math.floor(SL.bet * 1.5);
      msg = '✨ A pair! You win 💵' + win + '.';
      cls += ' sl-win';
      if (typeof playSfx === 'function') playSfx('loot');
    } else {
      msg = '💫 No match — spin again!';
      if (typeof playSfx === 'function') playSfx('wrong');
    }
    if (win > 0) state.coins = (state.coins || 0) + win;
    if (typeof updateStats === 'function') updateStats();
    if (typeof saveGame === 'function') saveGame();
    if (banner){ banner.textContent = msg; banner.className = cls; }
    var reels = document.querySelectorAll('.sl-reel');
    for (var i = 0; i < reels.length; i++){ delete reels[i].dataset.stopped; reels[i].classList.remove('sl-stop'); }
    var spinBtn = document.getElementById('slSpinBtn'); if (spinBtn) spinBtn.disabled = false;
    SL.spinning = false;
    _slHud();
  }
