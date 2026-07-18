  // ===========================================================================
  // 🎳 Star Lanes Bowling — a real 10-frame game. Each throw is set by STOPPING
  // three moving markers yourself: ANGLE (aim), POWER (throw strength), SPIN
  // (curve). A strike pays an immediate +100 🪙 Gold bonus on top of the normal
  // end-of-game reward. One pass buys the whole 10-frame game.
  // ===========================================================================
  var BOWL_PIN_X = [0, -0.18, 0.18, -0.36, 0, 0.36, -0.54, -0.18, 0.18, 0.54];   // pins 1-10 (index 0-9)
  var BOWL_LANE_W = 320, BOWL_LANE_H = 460;
  var BOWL = {
    frame: 1, ballInFrame: 0, pins: [], rolls: [], frameScores: [],
    phase: 'aim',                          // aim -> power -> spin -> rolling -> result -> (next)
    angleT: 0, powerT: 0, spinT: 0,        // 0..1 oscillation trackers (triangle wave)
    angle: 0, power: 0, spin: 0,           // LOCKED values once each phase is stopped
    animT: 0, lastRollPins: 0, strikeGold: 0, over: false, lastTs: 0
  };

  // Triangle wave 0->1->0->1... driven by elapsed ms; `speed` = full cycles per second.
  function _bowlWave(tMs, speedHz){
    var p = (tMs * speedHz / 1000) % 1;
    return p < 0.5 ? p * 2 : 2 - p * 2;
  }
  function _bowlResetPins(){ BOWL.pins = [true,true,true,true,true,true,true,true,true,true]; }
  function _bowlStanding(){ var n = 0; for (var i = 0; i < 10; i++) if (BOWL.pins[i]) n++; return n; }

  // PURE: classic flat-rolls bowling scoring. rolls = per-ball pinfall (a strike is ONE entry
  // of value 10, not two). Returns an array of 10 entries — a running cumulative score once a
  // frame's bonus balls are known, or null while a frame's score isn't resolved yet.
  function bowlScoreFrames(rolls){
    var out = [], idx = 0, running = 0;
    for (var f = 0; f < 10; f++){
      if (idx >= rolls.length){ out.push(null); continue; }
      if (rolls[idx] === 10){                                   // strike
        if (idx + 2 < rolls.length){ running += 10 + rolls[idx + 1] + rolls[idx + 2]; out.push(running); }
        else { out.push(null); }
        idx += 1;
      } else if (idx + 1 < rolls.length && rolls[idx] + rolls[idx + 1] === 10){   // spare
        if (idx + 2 < rolls.length){ running += 10 + rolls[idx + 2]; out.push(running); }
        else { out.push(null); }
        idx += 2;
      } else if (idx + 1 < rolls.length){                       // open frame
        running += rolls[idx] + rolls[idx + 1]; out.push(running); idx += 2;
      } else { out.push(null); idx += 1; }                      // only 1 ball played, unresolved
    }
    return out;
  }

  // PURE: given where the ball crosses the pin deck (impactX, roughly -0.75..0.75) and how hard it
  // was thrown (power 0..1), decide which of the currently-STANDING pins (per `standing`, an array
  // of 10 booleans) get knocked down. Direct hits are pins within a power-scaled radius of impactX;
  // a single domino pass then gives immediate neighbours of a direct hit a power-scaled chance to
  // fall too (so a pocket hit at high power can clear the rack, but isn't guaranteed — same as real
  // bowling, where the 7/10 corner pins are the hardest to carry). `rand01` is injectable for tests.
  function bowlComputeKnockdown(impactX, power, standing, rand01){
    rand01 = rand01 || Math.random;
    if (Math.abs(impactX) > 0.72) return [];                    // gutter ball
    var radius = 0.10 + power * 0.20;
    var fallen = {};
    for (var i = 0; i < 10; i++){
      if (!standing[i]) continue;
      if (Math.abs(BOWL_PIN_X[i] - impactX) <= radius) fallen[i] = 1;
    }
    var directIdx = Object.keys(fallen).map(Number);
    var chainChance = 0.3 + power * 0.55;
    for (var d = 0; d < directIdx.length; d++){
      for (var j = 0; j < 10; j++){
        if (!standing[j] || fallen[j]) continue;
        if (Math.abs(BOWL_PIN_X[j] - BOWL_PIN_X[directIdx[d]]) <= 0.19 && rand01() < chainChance) fallen[j] = 1;
      }
    }
    return Object.keys(fallen).map(Number);
  }

  function _bowlHud(){
    var hud = document.getElementById('bowlHud'); if (!hud) return;
    var total = bowlScoreFrames(BOWL.rolls);
    var running = 0; for (var i = 0; i < 10; i++) if (total[i] != null) running = total[i];
    hud.innerHTML = '<span class="wond-chip">🎳 Frame <b>' + Math.min(BOWL.frame, 10) + ' / 10</b></span>' +
      '<span class="wond-chip">📊 Score: <b>' + running + '</b></span>' +
      '<span class="wond-chip">📌 Standing: <b>' + _bowlStanding() + '</b></span>' +
      (BOWL.strikeGold > 0 ? '<span class="wond-chip sl-jp-chip">🪙 Strike bonus: <b>' + BOWL.strikeGold + '</b></span>' : '');
  }

  function _bowlScorecardHtml(){
    var scores = bowlScoreFrames(BOWL.rolls);
    var cells = '';
    for (var f = 0; f < 10; f++){
      cells += '<div class="bowl-frame' + (f + 1 === BOWL.frame ? ' bowl-frame-cur' : '') + '">' +
        '<div class="bowl-frame-n">' + (f + 1) + '</div>' +
        '<div class="bowl-frame-score">' + (scores[f] != null ? scores[f] : '') + '</div></div>';
    }
    return '<div class="bowl-scorecard">' + cells + '</div>';
  }

  // Free to view (no pass charge) — the welcome screen's Play button charges via
  // wonderPlay('_bowlStartRun') and buys the WHOLE 10-frame game.
  function openBowling(){
    gameWelcome('bowling', '🎳', 'Star Lanes Bowling',
      'A full 10-frame game — stop the marker to set your aim, power &amp; spin. Strikes pay +100 Gold!',
      '_bowlStartRun');
  }

  function _bowlStartRun(){
    BOWL.frame = 1; BOWL.ballInFrame = 0; BOWL.rolls = []; BOWL.strikeGold = 0; BOWL.over = false; BOWL._f10 = 0;
    _bowlResetPins();
    a2Shell('🎳 Star Lanes Bowling', 'openWonderland()',
      '<div class="wond-hud" id="bowlHud"></div>' +
      '<div id="bowlScorecardWrap"></div>' +
      a2KeyLegend('Space (or tap) to stop the marker — aim, then power, then spin') +
      '<div class="wond-canvas-wrap"><canvas id="bowlCanvas" class="a2-canvas" style="--cw:' + BOWL_LANE_W + ';--ch:' + BOWL_LANE_H + '" width="' + BOWL_LANE_W + '" height="' + BOWL_LANE_H + '"></canvas></div>' +
      '<div class="a2-pad"><button type="button" class="btn btn-primary" id="bowlStopBtn" onclick="_bowlStop()">⏹ STOP</button></div>',
      'Hit ⏹ (or press Space) once to lock your AIM, again to lock your POWER, again to lock your SPIN — then watch the ball roll! A strike pays an instant +100 🪙 Gold.');
    _bowlHud();
    document.getElementById('bowlScorecardWrap').innerHTML = _bowlScorecardHtml();
    _bowlStartAim();
    a2Keys(function(e){ if (e.key === ' ' || e.key === 'Spacebar'){ e.preventDefault(); _bowlStop(); } });
    BOWL.lastTs = 0;
    A2.raf = requestAnimationFrame(_bowlLoop);
  }

  function _bowlStartAim(){ BOWL.phase = 'aim'; BOWL.angleT = 0; }

  // Advances the current phase: aim -> power -> spin -> (kicks off the roll animation).
  // The marker's CURRENT value is already live in BOWL.angle/power/spin — _bowlLoop updates it
  // every frame while that phase is active — so stopping just locks it in by moving to the next
  // phase (and freezes it, since _bowlLoop only writes that field while its phase is current).
  function _bowlStop(){
    if (!a2Active() || BOWL.over) return;
    if (BOWL.phase === 'aim'){ BOWL.phase = 'power'; BOWL.powerT = 0; }
    else if (BOWL.phase === 'power'){ BOWL.phase = 'spin'; BOWL.spinT = 0; }
    else if (BOWL.phase === 'spin'){ BOWL.phase = 'rolling'; BOWL.animT = 0; }
    else { return; }
    if (typeof playSfx === 'function') playSfx('click');
  }

  function _bowlLoop(ts){
    if (!a2Active()){ a2StopAll(); return; }
    A2.raf = requestAnimationFrame(_bowlLoop);
    if (!BOWL.lastTs) BOWL.lastTs = ts;
    var dt = ts - BOWL.lastTs; BOWL.lastTs = ts;

    if (BOWL.phase === 'aim'){ BOWL.angleT += dt; BOWL.angle = _bowlWave(BOWL.angleT, 0.55) * 2 - 1; }
    else if (BOWL.phase === 'power'){ BOWL.powerT += dt; BOWL.power = _bowlWave(BOWL.powerT, 0.7); }
    else if (BOWL.phase === 'spin'){ BOWL.spinT += dt; BOWL.spin = _bowlWave(BOWL.spinT, 0.65) * 2 - 1; }
    else if (BOWL.phase === 'rolling'){
      BOWL.animT += dt / 900;
      if (BOWL.animT >= 1){ BOWL.animT = 1; _bowlResolveRoll(); }
    }
    _bowlDraw();
  }

  function _bowlResolveRoll(){
    var impactX = Math.max(-0.9, Math.min(0.9, BOWL.angle * 0.55 + BOWL.spin * 0.35));
    var knocked = bowlComputeKnockdown(impactX, BOWL.power, BOWL.pins.slice());
    knocked.forEach(function(i){ BOWL.pins[i] = false; });
    var pinCount = knocked.length;
    BOWL.lastRollPins = pinCount;
    if (pinCount === 10 && typeof playSfx === 'function') playSfx('victory');
    else if (typeof playSfx === 'function') playSfx(pinCount > 0 ? 'click' : 'wrong');
    if (pinCount === 10){
      state.coins = (state.coins || 0) + 100;
      BOWL.strikeGold += 100;
      if (typeof showToast === 'function') showToast('🎳 STRIKE! +100 🪙 Gold bonus!');
      if (typeof updateStats === 'function') updateStats();
    }
    BOWL.rolls.push(pinCount);
    BOWL.phase = 'result';
    _bowlHud();
    document.getElementById('bowlScorecardWrap').innerHTML = _bowlScorecardHtml();
    a2Later(_bowlAdvance, 900);
  }

  // Standard 10th-frame rules: frames 1-9 get a 2nd ball unless ball 1 is a strike; frame 10 gets a
  // bonus ball on a strike or spare (with pins reset before any bonus ball after a strike).
  function _bowlAdvance(){
    if (BOWL.over || !a2Active()) return;
    var f = BOWL.frame, last = BOWL.rolls[BOWL.rolls.length - 1];
    if (f < 10){
      if (BOWL.ballInFrame === 0 && last === 10){ BOWL.frame++; BOWL.ballInFrame = 0; _bowlResetPins(); }
      else if (BOWL.ballInFrame === 0){ BOWL.ballInFrame = 1; }
      else { BOWL.frame++; BOWL.ballInFrame = 0; _bowlResetPins(); }
    } else {
      // Frame 10: track how many balls have been thrown THIS frame via a local counter on BOWL.
      BOWL._f10 = (BOWL._f10 || 0) + 1;
      var tail = BOWL.rolls.slice(-BOWL._f10);
      var ball1 = tail[0], ball2 = tail[1], ball3 = tail[2];
      var done = false;
      if (BOWL._f10 === 1){
        if (ball1 === 10) _bowlResetPins();          // strike on ball 1 → fresh rack for ball 2
      } else if (BOWL._f10 === 2){
        if (ball1 === 10 || ball1 + ball2 === 10) _bowlResetPins();   // strike or spare → bonus ball 3
        else done = true;                              // open 10th frame — game over after 2 balls
      } else if (BOWL._f10 === 3){
        done = true;
      }
      if (done){ BOWL.over = true; a2Later(_bowlGameOver, 400); return; }
    }
    if (BOWL.over) return;
    _bowlStartAim();
  }

  function _bowlGameOver(){
    a2StopAll();
    var scores = bowlScoreFrames(BOWL.rolls);
    var final = 0; for (var i = 0; i < 10; i++) if (scores[i] != null) final = scores[i];
    var frac = Math.max(0, Math.min(1, final / 200));   // 200+ ≈ a strong game; 300 = perfect
    var newHigh = (typeof wgRecordScore === 'function') ? wgRecordScore('bowling', final, 1) : false;
    var headline = final === 300 ? '🌟 PERFECT GAME! 🌟' : (final >= 200 ? '🎳 Great bowling!' : (final >= 100 ? '🎳 Nice game!' : '🎳 Game over!'));
    var view = a2View(); if (!view) return;
    view.innerHTML = '<div class="wond-board">' +
      '<div class="wond-head"><h2 class="wond-title">' + headline + (newHigh ? ' 🏆' : '') + '</h2>' +
      '<p class="wond-sub">Final score <b>' + final + '</b> / 300' + (BOWL.strikeGold > 0 ? ' · +' + BOWL.strikeGold + ' 🪙 Gold from strikes' : '') + '</p></div>' +
      _bowlScorecardHtml() +
      '<div class="wond-result-card"><div class="wond-result-label">Your prizes</div><div class="wond-prizes" id="bowlPrizes"></div></div>' +
      '<div class="wond-footer">' +
        '<button type="button" class="btn btn-primary" onclick="openBowling()" data-tooltip="Back to Star Lanes Bowling\'s welcome screen.">↻ Play Again</button>' +
        '<button type="button" class="btn btn-ghost" onclick="openWonderland()">← Lobby</button>' +
      '</div></div>';
    var r = a2Reward(frac);
    var prizes = document.getElementById('bowlPrizes');
    if (prizes && r){
      var chips = '<span class="wond-chip wond-prize-chip">💵 Cash ×' + (r.cash || 0) + '</span>';
      if (r.loot){
        if (r.loot.gold) chips += '<span class="wond-chip wond-prize-chip">🥇 Gold ×' + r.loot.gold + '</span>';
        if (r.loot.silver) chips += '<span class="wond-chip wond-prize-chip">🥈 Silver ×' + r.loot.silver + '</span>';
      }
      prizes.innerHTML = chips;
    }
  }

  function _bowlDraw(){
    var cv = document.getElementById('bowlCanvas'); if (!cv) return;
    var c = cv.getContext('2d'), W = BOWL_LANE_W, H = BOWL_LANE_H;
    c.fillStyle = '#2a1c10'; c.fillRect(0, 0, W, H);
    // lane
    var laneX0 = W * 0.18, laneX1 = W * 0.82;
    c.fillStyle = '#c9924f'; c.fillRect(laneX0, 20, laneX1 - laneX0, H - 90);
    c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 1;
    for (var g = 1; g < 8; g++){ var gx = laneX0 + (laneX1 - laneX0) * g / 8; c.beginPath(); c.moveTo(gx, 20); c.lineTo(gx, H - 70); c.stroke(); }
    // pins
    var pinCx = W / 2, pinCy = 70;
    for (var i = 0; i < 10; i++){
      var px = pinCx + BOWL_PIN_X[i] * (laneX1 - laneX0) * 0.62;
      var py = pinCy + Math.floor(i >= 6 ? 3 : (i >= 3 ? 2 : (i >= 1 ? 1 : 0))) * 26;
      if (!BOWL.pins[i]) continue;
      c.fillStyle = '#f4f1e8'; c.beginPath(); c.ellipse(px, py, 8, 13, 0, 0, 7); c.fill();
      c.strokeStyle = '#c0392b'; c.lineWidth = 2; c.beginPath(); c.moveTo(px - 6, py - 2); c.lineTo(px + 6, py - 2); c.stroke();
    }
    // ball + meters, drawn low on the lane (player's end)
    var meterY = H - 46;
    if (BOWL.phase === 'aim' || BOWL.phase === 'power' || BOWL.phase === 'spin'){
      c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(laneX0, meterY, laneX1 - laneX0, 14);
      if (BOWL.phase === 'aim'){
        var ax = laneX0 + (laneX1 - laneX0) * ((BOWL.angle + 1) / 2);
        c.fillStyle = '#5aa9ff'; c.fillRect(ax - 3, meterY - 4, 6, 22);
      } else if (BOWL.phase === 'power'){
        c.fillStyle = '#f0705e'; c.fillRect(laneX0, meterY, (laneX1 - laneX0) * BOWL.power, 14);
      } else {
        var sx = laneX0 + (laneX1 - laneX0) * ((BOWL.spin + 1) / 2);
        c.fillStyle = '#7bd88f'; c.fillRect(sx - 3, meterY - 4, 6, 22);
      }
    }
    // ball position: fixed x during aim/power/spin (center), animates up the lane during 'rolling'
    var ballX = pinCx, ballY = H - 30;
    if (BOWL.phase === 'rolling'){
      var impactX = Math.max(-0.9, Math.min(0.9, BOWL.angle * 0.55 + BOWL.spin * 0.35));
      var travelX = pinCx + impactX * (laneX1 - laneX0) * 0.62 * BOWL.animT;
      var startX = pinCx;
      ballX = startX + (travelX - startX);
      ballY = (H - 30) - (H - 100) * BOWL.animT;
    }
    c.fillStyle = '#1a2740'; c.beginPath(); c.arc(ballX, ballY, 9, 0, 7); c.fill();
    c.font = '13px sans-serif'; c.fillStyle = '#e8e8ea'; c.textAlign = 'center';
    var label = BOWL.phase === 'aim' ? 'AIM — stop the marker!' : BOWL.phase === 'power' ? 'POWER — stop the bar!' : BOWL.phase === 'spin' ? 'SPIN — stop the marker!' : BOWL.phase === 'result' ? (BOWL.lastRollPins + ' pin' + (BOWL.lastRollPins === 1 ? '' : 's') + '!') : '';
    if (label) c.fillText(label, W / 2, H - 8);
  }

