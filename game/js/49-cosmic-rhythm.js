  // ===========================================================================
  // 🎵 Cosmic Rhythm — a 4-lane falling-note rhythm game. Press 1 2 9 0 (or tap
  // the lane buttons) exactly when a note crosses the hit line. Entered via
  // wonderPlay('openRhythm') (1 Wonderland Pass); levels increase in speed/
  // density sequentially (no difficulty picker — see _rhySetup/RHY_LEVELS).
  // Cash-only reward via wgPayReward, like the other carnival games.
  // ===========================================================================
  var RHY_LANES = 4;
  var RHY_KEYS = ['1', '2', '9', '0'];   // outer-left/inner-left/inner-right/outer-right, left to right
  var RHY_KEY_LABEL = ['1', '2', '9', '0'];
  var RHY_LANE_COL = ['#f0705e', '#f2c14e', '#7bd88f', '#5aa9ff'];
  var RHY_BEAT_MS = 500;          // 120 BPM
  var RHY_LEAD_MS = 2000;         // ms a note takes to fall from spawn to the hit line
  // Five judgment tiers by timing error. The overall hit window is unchanged (±180ms) — the old
  // 2-tier perfect/good split is just sliced finer so the side comments have real meaning.
  var RHY_PERFECT_MS = 45, RHY_EXCELLENT_MS = 90, RHY_GOOD_MS = 135, RHY_POOR_MS = 180;
  var RHY_JUDGE_STYLE = {
    perfect:   { text: 'PERFECT!!',  col: '#f2c14e' },
    excellent: { text: 'EXCELLENT!', col: '#66e0ff' },
    good:      { text: 'GOOD',       col: '#7bd88f' },
    poor:      { text: 'POOR…',      col: '#ffb45e' },
    miss:      { text: 'MISSED',     col: '#f0705e' }
  };
  // Sequential levels (no difficulty picker) — everyone starts at level 1; each song gets longer,
  // denser and chordier. RHY_CLEAR_ACC% accuracy on a level advances to the next for free; falling
  // short (or finishing the last level) ends the run.
  var RHY_LEVELS = [
    { beats: 40, density: 0.45, doubleChance: 0.02 },
    { beats: 48, density: 0.55, doubleChance: 0.06 },
    { beats: 56, density: 0.68, doubleChance: 0.12 },
    { beats: 64, density: 0.80, doubleChance: 0.20 },
    { beats: 72, density: 0.92, doubleChance: 0.30 }
  ];
  var RHY_CLEAR_ACC = 50;
  var RHY = { active: false, level: 0, chart: [], t: 0, lastTs: 0, ended: false,
              score: 0, totalScore: 0, combo: 0, maxCombo: 0,
              perfect: 0, excellent: 0, good: 0, poor: 0, miss: 0,
              judge: null, laneFlash: [0, 0, 0, 0] };

  // PURE: builds a beatmap for a level config. Every note is { t (ms), lane (0-3), judged }.
  // A "double" occasionally adds a 2nd note on the SAME beat in a different lane (a chord).
  function rhyGenChart(cfg){
    var chart = [];
    for (var b = 0; b < cfg.beats; b++){
      if (Math.random() >= cfg.density) continue;
      var t = b * RHY_BEAT_MS, lane = rand(0, RHY_LANES - 1);
      chart.push({ t: t, lane: lane, judged: false });
      if (Math.random() < cfg.doubleChance){
        var lane2 = rand(0, RHY_LANES - 1);
        if (lane2 !== lane) chart.push({ t: t, lane: lane2, judged: false });
      }
    }
    chart.sort(function(a, b2){ return a.t - b2.t; });
    return chart;
  }

  // Free to view (no pass charge) — the welcome screen's Play button charges via
  // wonderPlay('_rhyStartRun').
  function openRhythm(){
    gameWelcome('rhythm', '🎵', 'Cosmic Rhythm',
      'Hit the falling notes on the beat — ' + RHY_LEVELS.length + ' levels, faster and denser as you climb!',
      '_rhyStartRun');
  }

  function _rhyStartRun(){
    RHY.level = 0; RHY.totalScore = 0;
    _rhySetup();
  }

  function _rhySetup(){
    if (typeof wgStopAll === 'function') wgStopAll();
    var v = document.getElementById('wonderlandView'); if (!v) return;
    var cfg = RHY_LEVELS[RHY.level] || RHY_LEVELS[RHY_LEVELS.length - 1];
    RHY.active = true; RHY.chart = rhyGenChart(cfg);
    RHY.t = 0; RHY.lastTs = 0; RHY.ended = false;
    RHY.score = 0; RHY.combo = 0; RHY.maxCombo = 0;
    RHY.perfect = 0; RHY.excellent = 0; RHY.good = 0; RHY.poor = 0; RHY.miss = 0;
    RHY.judge = null; RHY.laneFlash = [0, 0, 0, 0];
    var W = 320, H = 460;
    v.innerHTML = '<div class="wond-board wond-game">' +
      (typeof agTopBar === 'function' ? agTopBar('🎵 Cosmic Rhythm — Level ' + (RHY.level + 1) + ' / ' + RHY_LEVELS.length, 'openWonderland()') : '') +
      '<div class="wond-hud" id="rhyHud"></div>' +
      a2KeyLegend('1 2 9 0 to hit each lane') +
      '<div class="wond-canvas-wrap"><canvas id="rhyCanvas" class="a2-canvas" style="--cw:' + W + ';--ch:' + H + '" width="' + W + '" height="' + H + '"></canvas></div>' +
      '<div class="a2-pad">' + RHY_KEY_LABEL.map(function(lb, i){
        return '<button type="button" class="btn btn-secondary" onclick="rhyHitLane(' + i + ')">' + lb + '</button>';
      }).join('') + '</div>' +
    '</div>';
    if (typeof playSfx === 'function') playSfx('ui-click');
    _rhyHud();
    a2Keys(function(e){
      var idx = RHY_KEYS.indexOf(e.key.toLowerCase());
      if (idx !== -1){ e.preventDefault(); rhyHitLane(idx); }
    });
    A2.raf = requestAnimationFrame(_rhyLoop);
  }

  function _rhyHud(){
    var hud = document.getElementById('rhyHud'); if (!hud) return;
    hud.innerHTML = '<span class="wond-chip">🎚️ Level <b>' + (RHY.level + 1) + ' / ' + RHY_LEVELS.length + '</b></span>' +
      '<span class="wond-chip">⭐ Score: <b>' + RHY.score + '</b></span>' +
      '<span class="wond-chip">🔥 Combo: <b>' + RHY.combo + '</b></span>' +
      '<span class="wond-chip">🎯 Perfect: <b>' + RHY.perfect + '</b></span>' +
      '<span class="wond-chip">✨ Excellent: <b>' + RHY.excellent + '</b></span>' +
      '<span class="wond-chip">👍 Good: <b>' + RHY.good + '</b></span>' +
      '<span class="wond-chip">😬 Poor: <b>' + RHY.poor + '</b></span>' +
      '<span class="wond-chip">💢 Miss: <b>' + RHY.miss + '</b></span>';
  }

  // Judge whichever unjudged note in `lane` is closest to "now" — PERFECT/GOOD/(too far = ignored,
  // no penalty for an early stray tap since there's nothing in range to judge against).
  function rhyHitLane(lane){
    if (!RHY.active) return;
    RHY.laneFlash[lane] = 160;
    var best = null, bestDiff = Infinity;
    for (var i = 0; i < RHY.chart.length; i++){
      var n = RHY.chart[i];
      if (n.lane !== lane || n.judged) continue;
      var d = Math.abs(RHY.t - n.t);
      if (d < bestDiff){ bestDiff = d; best = n; }
    }
    if (best && bestDiff <= RHY_POOR_MS){
      best.judged = true;
      _rhyJudge(bestDiff <= RHY_PERFECT_MS ? 'perfect' :
                bestDiff <= RHY_EXCELLENT_MS ? 'excellent' :
                bestDiff <= RHY_GOOD_MS ? 'good' : 'poor');
    }
  }

  function _rhyJudge(kind){
    if (kind === 'perfect'){ RHY.perfect++; RHY.combo++; RHY.score += 100 + Math.min(RHY.combo, 20) * 5; if (typeof playSfx === 'function') playSfx('solve-correct'); }
    else if (kind === 'excellent'){ RHY.excellent++; RHY.combo++; RHY.score += 75 + Math.min(RHY.combo, 20) * 4; if (typeof playSfx === 'function') playSfx('solve-correct'); }
    else if (kind === 'good'){ RHY.good++; RHY.combo++; RHY.score += 50 + Math.min(RHY.combo, 20) * 2; if (typeof playSfx === 'function') playSfx('ui-click'); }
    else if (kind === 'poor'){ RHY.poor++; RHY.combo = 0; RHY.score += 15; if (typeof playSfx === 'function') playSfx('ui-click'); }
    else { RHY.miss++; RHY.combo = 0; if (typeof playSfx === 'function') playSfx('wrong'); }
    if (RHY.combo > RHY.maxCombo) RHY.maxCombo = RHY.combo;
    RHY.judge = { kind: kind, born: RHY.t };    // floating side comment, drawn by _rhyDraw
    _rhyHud();
  }

  function _rhyLoop(ts){
    if (!a2Active()){ a2StopAll(); return; }
    A2.raf = requestAnimationFrame(_rhyLoop);
    if (!RHY.lastTs) RHY.lastTs = ts;
    RHY.t += ts - RHY.lastTs; RHY.lastTs = ts;
    for (var i = 0; i < RHY.chart.length; i++){
      var n = RHY.chart[i];
      if (!n.judged && RHY.t > n.t + RHY_POOR_MS){ n.judged = true; _rhyJudge('miss'); }
    }
    for (var L = 0; L < RHY_LANES; L++){ if (RHY.laneFlash[L] > 0) RHY.laneFlash[L] -= (ts - RHY.lastTs) || 16; }
    var lastT = RHY.chart.length ? RHY.chart[RHY.chart.length - 1].t : 0;
    if (!RHY.ended && RHY.t > lastT + RHY_POOR_MS + 500){
      RHY.ended = true; RHY.active = false;
      a2Later(_rhyEnd, 200);
    }
    _rhyDraw();
  }

  function _rhyDraw(){
    var cv = document.getElementById('rhyCanvas'); if (!cv) return;
    var c = cv.getContext('2d'), W = cv.width, H = cv.height;
    var hitY = H - 60, laneW = W / RHY_LANES;
    c.fillStyle = '#0b1626'; c.fillRect(0, 0, W, H);
    for (var L = 0; L < RHY_LANES; L++){
      c.fillStyle = RHY.laneFlash[L] > 0 ? 'rgba(255,255,255,.08)' : 'rgba(255,255,255,.02)';
      c.fillRect(L * laneW, 0, laneW, H);
      c.strokeStyle = 'rgba(255,255,255,.08)'; c.beginPath(); c.moveTo(L * laneW, 0); c.lineTo(L * laneW, H); c.stroke();
    }
    c.strokeStyle = '#f2c14e'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, hitY); c.lineTo(W, hitY); c.stroke();
    c.font = 'bold 20px sans-serif'; c.textAlign = 'center'; c.fillStyle = 'rgba(255,255,255,.5)';
    for (var K = 0; K < RHY_LANES; K++) c.fillText(RHY_KEY_LABEL[K], K * laneW + laneW / 2, hitY + 26);
    for (var i = 0; i < RHY.chart.length; i++){
      var n = RHY.chart[i];
      if (n.judged) continue;
      var y = hitY - ((n.t - RHY.t) / RHY_LEAD_MS) * hitY;
      if (y < -20 || y > H + 20) continue;
      var cx = n.lane * laneW + laneW / 2;
      c.fillStyle = RHY_LANE_COL[n.lane];
      c.beginPath(); c.arc(cx, y, 15, 0, 7); c.fill();
      c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 2; c.stroke();
    }
    // Floating judgment comment at the right side, above the hit line — pops big, drifts up and
    // fades over ~700ms of GAME time (RHY.t), so it freezes cleanly if the run ends.
    if (RHY.judge){
      var age = RHY.t - RHY.judge.born;
      if (age > 700 || age < 0){ RHY.judge = null; }
      else {
        var st = RHY_JUDGE_STYLE[RHY.judge.kind];
        c.save();
        c.globalAlpha = age < 100 ? 1 : Math.max(0, 1 - (age - 100) / 600);
        c.font = 'bold ' + (age < 80 ? 26 : 22) + 'px sans-serif';
        c.textAlign = 'right';
        c.lineJoin = 'round'; c.lineWidth = 4; c.strokeStyle = 'rgba(0,0,0,.6)';
        var jy = hitY - 70 - age * 0.05;
        c.strokeText(st.text, W - 8, jy);
        c.fillStyle = st.col;
        c.fillText(st.text, W - 8, jy);
        c.restore();
      }
    }
  }

  function _rhyEnd(){
    a2StopAll();
    // Weighted accuracy across the 5 tiers — roughly matches the old (perfect + good*0.5) scale so
    // RHY_CLEAR_ACC (the advance threshold) keeps the same meaning.
    var total = RHY.perfect + RHY.excellent + RHY.good + RHY.poor + RHY.miss;
    var acc = total > 0 ? Math.round(((RHY.perfect + RHY.excellent * 0.85 + RHY.good * 0.6 + RHY.poor * 0.3) / total) * 100) : 0;
    RHY.totalScore += RHY.score;
    var cleared = acc >= RHY_CLEAR_ACC;
    var lastLevel = RHY.level + 1 >= RHY_LEVELS.length;
    if (cleared && !lastLevel){
      // Level cleared — advance for FREE, no re-charge, matching Sky Stacker/Blast Bot.
      if (typeof playSfx === 'function') playSfx('victory');
      if (typeof showToast === 'function') showToast('🌟 Level ' + (RHY.level + 1) + ' clear! (' + acc + '% accuracy) — next up!');
      RHY.level++;
      a2Later(_rhySetup, 900);
      return;
    }
    _rhyGameOver(acc, cleared && lastLevel);
  }

  function _rhyGameOver(acc, wonAll){
    var newHigh = (typeof wgRecordScore === 'function') ? wgRecordScore('rhythm', RHY.totalScore, RHY.level + 1) : false;
    var rate = 0.05 + RHY.level * 0.02;   // later levels pay a better rate
    var coins = Math.max(0, Math.round(RHY.totalScore * rate)) + (newHigh ? 20 : 0);
    if (coins > 0 && typeof wgPayReward === 'function') wgPayReward({ coins: coins, newHigh: newHigh });
    if (typeof playSfx === 'function') playSfx(wonAll ? 'victory' : (acc >= 50 ? 'ui-click' : 'wrong'));
    var view = document.getElementById('wonderlandView'); if (!view) return;
    var headline = wonAll ? '🌟 ALL LEVELS CLEARED! 🌟' : (acc >= RHY_CLEAR_ACC ? '🎵 Great rhythm!' : '🎵 Off-beat!');
    view.innerHTML = '<div class="wond-board wond-game">' +
      (typeof agTopBar === 'function' ? agTopBar('🎵 Cosmic Rhythm', 'openWonderland()') : '') +
      '<div class="wond-head"><h2 class="wond-title">' + headline + (newHigh ? ' 🏆' : '') + '</h2>' +
      '<p class="wond-sub">Reached level <b>' + (RHY.level + 1) + ' / ' + RHY_LEVELS.length + '</b> · total score <b>' + RHY.totalScore + '</b> · ' + acc + '% accuracy on that level</p>' +
      '<p class="wond-sub">🎯 ' + RHY.perfect + ' Perfect · ✨ ' + RHY.excellent + ' Excellent · 👍 ' + RHY.good + ' Good · 😬 ' + RHY.poor + ' Poor · 💢 ' + RHY.miss + ' Missed (last level)</p></div>' +
      '<div class="wond-result-card"><div class="wond-result-label">Reward</div>' +
        '<div class="wond-prizes"><span class="wond-chip wond-prize-chip">💵 Cash ×' + coins + '</span></div></div>' +
      '<div class="wond-footer" style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">' +
        '<button type="button" class="btn btn-primary" onclick="openRhythm()" data-tooltip="Back to Cosmic Rhythm\'s welcome screen.">↻ Play Again</button>' +
        '<button type="button" class="btn btn-ghost" onclick="openWonderland()" data-tooltip="Back to the lobby.">← Lobby</button>' +
      '</div>' +
    '</div>';
  }

