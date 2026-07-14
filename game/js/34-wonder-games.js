  // ============================================================================
  // Wonderland carnival games (module 34) — original games that plug into the
  // existing #wonderlandView (same render/cleanup pattern as 17-wonderland.js).
  //
  // All-original names/art/theme (emoji + CSS/DOM, no external assets). Games are
  // FREE to play (skill games) but reward **Cash only**, scaled by score with a
  // beat-your-best bonus, so they can be replayed for fun without becoming a farm
  // for rare gear. High scores persist in state.miniGames (see 03-save.js).
  //
  //   • Bullseye Numbers 🎯 — a timed mental-maths dartboard (this file).
  //   • Gone Fishin' 🎣 and Merry Math-Go-Round 🎠 are added next, same pattern.
  // ============================================================================

  // ---------- shared mini-game helpers ----------
  function wgMini(id){
    if (typeof state !== 'object' || !state) return { highScore: 0, plays: 0, bestByDiff: {} };
    if (!state.miniGames) state.miniGames = {};
    var m = state.miniGames[id];
    if (!m || typeof m !== 'object'){ m = { highScore: 0, plays: 0, bestByDiff: {} }; state.miniGames[id] = m; }
    if (!m.bestByDiff) m.bestByDiff = {};
    return m;
  }
  // Record a run; returns true if it's a new personal best. Persists via saveGame.
  function wgRecordScore(id, score, diff){
    var m = wgMini(id);
    m.plays = (m.plays || 0) + 1;
    var isHigh = score > (m.highScore || 0);
    if (isHigh) m.highScore = score;
    if (diff && score > (m.bestByDiff[diff] || 0)) m.bestByDiff[diff] = score;
    if (typeof saveGame === 'function') saveGame();
    return isHigh;
  }
  // Pay a Cash reward (+ optional chip); Cash keeps mini-games off the rare-gear farm.
  function wgPayReward(r){
    if (!r) return;
    if (r.coins && typeof state === 'object'){ state.coins = (state.coins || 0) + r.coins; }
    if (r.chips && typeof addChips === 'function') addChips(r.chips);
    if (typeof updateStats === 'function') updateStats();
    if (typeof playSfx === 'function') playSfx(r.newHigh ? 'victory' : 'loot');
  }
  function wgShowView(){
    document.querySelectorAll('.view-container').forEach(function(v){ v.classList.remove('active'); });
    var view = document.getElementById('wonderlandView');
    if (view) view.classList.add('active');
    return view;
  }

  // ===========================================================================
  // Bullseye Numbers 🎯
  // ===========================================================================
  var BULL_TIME = 45;                                // seconds per run
  var BULL = { active: false, timer: 0, score: 0, combo: 0, best: 0, timeLeft: 0, diff: 'easy', round: null, hits: 0, misses: 0 };

  // PURE: a maths question + 4 numeric targets (exactly one correct). Correct by construction.
  function bullGen(diff){
    var a, b, ans, text;
    if (diff === 'easy'){
      if (rand(0, 1)){ a = rand(1, 12); b = rand(1, 12); ans = a + b; text = a + ' + ' + b; }
      else { a = rand(2, 12); b = rand(1, a); ans = a - b; text = a + ' − ' + b; }
    } else if (diff === 'normal'){
      var t = rand(0, 2);
      if (t === 0){ a = rand(2, 9); b = rand(2, 9); ans = a * b; text = a + ' × ' + b; }
      else if (t === 1){ b = rand(2, 9); ans = rand(2, 9); a = b * ans; text = a + ' ÷ ' + b; }
      else { a = rand(10, 40); b = rand(5, 30); ans = a + b; text = a + ' + ' + b; }
    } else {                                          // hard
      var h = rand(0, 3);
      if (h === 0){ a = rand(3, 12); b = rand(3, 12); ans = a * b; text = a + ' × ' + b; }
      else if (h === 1){ a = rand(2, 15); ans = a * a; text = a + '²'; }
      else if (h === 2){ b = rand(3, 12); ans = rand(3, 12); a = b * ans; text = a + ' ÷ ' + b; }
      else { a = rand(30, 90); b = rand(10, 50); ans = (a - b < 0) ? a + b : a - b; text = (a - b < 0) ? (a + ' + ' + b) : (a + ' − ' + b); }
    }
    var opts = [ans], guard = 0, spread = Math.max(3, Math.round(Math.abs(ans) * 0.2) + 2);
    while (opts.length < 4 && guard++ < 60){
      var d = ans + (rand(0, 1) ? 1 : -1) * rand(1, spread);
      if (d >= 0 && opts.indexOf(d) === -1) opts.push(d);
    }
    var fill = ans + 1;
    while (opts.length < 4){ if (opts.indexOf(fill) === -1 && fill >= 0) opts.push(fill); fill++; }
    shuffle(opts);
    return { text: text, ans: ans, opts: opts, correctIdx: opts.indexOf(ans) };
  }

  // PURE: reward for a finished run — Cash scaled by score + difficulty, with a best-beating bonus.
  function bullReward(score, diff, newHigh){
    var rate = diff === 'hard' ? 0.55 : (diff === 'normal' ? 0.38 : 0.24);
    var r = { coins: Math.max(0, Math.round(score * rate)) };
    if (newHigh){ r.coins += 20; r.newHigh = true; }
    if (diff === 'hard' && newHigh && score >= 220){ r.chips = { cpu: 1 }; }   // top hard runs only
    return r;
  }

  function openBullseye(){
    wgStopAll();
    var view = wgShowView();
    if (!view) return;
    var m = wgMini('bullseye');
    view.innerHTML =
      '<div class="wond-board">' +
        '<div class="wond-head"><h2 class="wond-title"><span class="wond-wheel">🎯</span> Bullseye Numbers</h2>' +
          '<p class="wond-sub">Hit the target that answers each maths question before time runs out!</p></div>' +
        '<div class="wond-passrow"><span class="wond-passes">🏆 High score: <b>' + (m.highScore || 0) + '</b></span>' +
          '<span class="wond-hint">Free to play · keys 1-4 or tap · ' + BULL_TIME + 's</span></div>' +
        '<div class="wg-diff-row">' +
          '<button type="button" class="btn btn-primary" onclick="bullStart(\'easy\')" data-tooltip="+ and − with small numbers.">🟢 Easy</button>' +
          '<button type="button" class="btn btn-primary" onclick="bullStart(\'normal\')" data-tooltip="×, ÷ and bigger sums.">🟡 Normal</button>' +
          '<button type="button" class="btn btn-primary" onclick="bullStart(\'hard\')" data-tooltip="Squares, big ×/÷ — best Cash.">🔴 Hard</button>' +
        '</div>' +
        '<div class="wond-footer"><button type="button" class="btn btn-ghost" onclick="openWonderland()" data-tooltip="Back to the Wonderland lobby.">← Lobby</button></div>' +
      '</div>';
  }

  function bullStart(diff){
    wgStopAll();
    var view = document.getElementById('wonderlandView');
    if (!view) return;
    BULL.active = true; BULL.diff = diff; BULL.score = 0; BULL.combo = 0;
    BULL.timeLeft = BULL_TIME; BULL.hits = 0; BULL.misses = 0;
    BULL.best = wgMini('bullseye').highScore || 0;
    view.innerHTML =
      '<div class="wond-board wond-game">' +
        '<div class="wond-game-top"><h2 class="wond-title wond-title-sm">🎯 Bullseye — ' + diff.charAt(0).toUpperCase() + diff.slice(1) + '</h2>' +
          '<button type="button" class="btn btn-ghost" onclick="openBullseye()" data-tooltip="Quit this run (score is not saved).">✕ Quit</button></div>' +
        '<div class="wond-hud" id="bullHud"></div>' +
        '<div class="bull-question" id="bullQ">Get ready…</div>' +
        '<div class="bull-board" id="bullBoard"></div>' +
        '<p class="wond-tip">Tap a target or press 1-4. Right = points + combo · Wrong = combo lost & −2s.</p>' +
      '</div>';
    bullBindKeys();
    bullNextRound();
    bullUpdateHud();
    if (typeof playSfx === 'function') playSfx('ui-click');
    // 1-second countdown timer (module-global so bullStop can clear it).
    BULL.timer = setInterval(bullTick, 1000);
  }

  function bullTick(){
    if (!BULL.active) return;
    // Safety net: if the player navigated away (view no longer active or the HUD is gone),
    // stop the run rather than tick a game nobody can see.
    var view = document.getElementById('wonderlandView');
    if (!view || !view.classList.contains('active') || !document.getElementById('bullHud')){ bullStop(); return; }
    BULL.timeLeft--;
    bullUpdateHud();
    if (BULL.timeLeft <= 0) bullEnd();
  }

  function bullNextRound(){
    if (!BULL.active) return;
    BULL.round = bullGen(BULL.diff);
    var q = document.getElementById('bullQ');
    if (q) q.innerHTML = 'What is <b>' + BULL.round.text + '</b> ?';
    var board = document.getElementById('bullBoard');
    if (!board) return;
    board.innerHTML = BULL.round.opts.map(function(v, i){
      return '<button type="button" class="bull-target" data-idx="' + i + '" onclick="bullPick(' + i + ')">' +
        '<span class="bull-ring"></span><span class="bull-num">' + v + '</span>' +
        '<span class="bull-key">' + (i + 1) + '</span></button>';
    }).join('');
  }

  function bullPick(idx){
    if (!BULL.active || !BULL.round) return;
    var board = document.getElementById('bullBoard');
    if (idx === BULL.round.correctIdx){
      BULL.combo++;
      BULL.hits++;
      var gain = 10 + Math.min(BULL.combo - 1, 10) * 2;         // combo bonus, capped
      BULL.score += gain;
      if (typeof playSfx === 'function') playSfx('solve-correct');
      var btn = board && board.querySelector('[data-idx="' + idx + '"]');
      if (btn) btn.classList.add('bull-hit');
      bullUpdateHud();
      bullNextRound();
    } else {
      BULL.combo = 0;
      BULL.misses++;
      BULL.timeLeft = Math.max(0, BULL.timeLeft - 2);           // small time penalty
      if (typeof playSfx === 'function') playSfx('wrong');
      var wb = board && board.querySelector('[data-idx="' + idx + '"]');
      if (wb) wb.classList.add('bull-wrong');
      bullUpdateHud();
      if (BULL.timeLeft <= 0){ bullEnd(); return; }
      // brief pause so the red flash reads, then a fresh round
      setTimeout(function(){ if (BULL.active) bullNextRound(); }, 260);
    }
  }

  function bullUpdateHud(){
    var hud = document.getElementById('bullHud');
    if (!hud) return;
    hud.innerHTML =
      '<span class="wond-chip">⭐ Score: <b>' + BULL.score + '</b></span>' +
      '<span class="wond-chip">🔥 Combo: <b>' + BULL.combo + '</b></span>' +
      '<span class="wond-chip">⏱️ Time: <b>' + BULL.timeLeft + 's</b></span>' +
      '<span class="wond-chip">🏆 Best: <b>' + BULL.best + '</b></span>';
  }

  function bullStop(){
    BULL.active = false;
    if (BULL.timer){ clearInterval(BULL.timer); BULL.timer = 0; }
    bullUnbindKeys();
  }

  function bullEnd(){
    if (!BULL.active && !BULL.timer) { /* already ended */ }
    var score = BULL.score, diff = BULL.diff, hits = BULL.hits, misses = BULL.misses;
    bullStop();
    var newHigh = wgRecordScore('bullseye', score, diff);
    var r = bullReward(score, diff, newHigh);
    wgPayReward(r);
    var acc = (hits + misses) > 0 ? Math.round(hits / (hits + misses) * 100) : 0;
    var view = document.getElementById('wonderlandView');
    if (!view) return;
    view.innerHTML =
      '<div class="wond-board">' +
        '<div class="wond-head"><h2 class="wond-title">' + (newHigh ? '🏆 NEW HIGH SCORE!' : '🎯 Time!') + '</h2>' +
          '<p class="wond-sub">Score <b>' + score + '</b> · ' + hits + ' hits · ' + acc + '% accuracy · ' + diff + '</p></div>' +
        '<div class="wond-result-card"><div class="wond-result-label">Reward</div>' +
          '<div class="wond-prizes"><span class="wond-chip wond-prize-chip">💵 Cash ×' + (r.coins || 0) + '</span>' +
          (r.chips && r.chips.cpu ? '<span class="wond-chip wond-prize-chip">🖥️ CPU ×' + r.chips.cpu + '</span>' : '') + '</div></div>' +
        '<div class="wond-footer">' +
          '<button type="button" class="btn btn-primary" onclick="bullStart(\'' + diff + '\')" data-tooltip="Play this difficulty again.">↻ Play again</button>' +
          '<button type="button" class="btn btn-ghost" onclick="openBullseye()" data-tooltip="Change difficulty.">🎯 Difficulty</button>' +
          '<button type="button" class="btn btn-ghost" onclick="openWonderland()" data-tooltip="Back to the lobby.">← Lobby</button>' +
        '</div>' +
      '</div>';
  }

  // Keyboard 1-4 selects a target.
  function bullBindKeys(){
    bullUnbindKeys();
    BULL._kd = function(e){
      if (!BULL.active) return;
      var n = parseInt(e.key, 10);
      if (n >= 1 && n <= 4){ e.preventDefault(); bullPick(n - 1); }
    };
    document.addEventListener('keydown', BULL._kd);
  }
  function bullUnbindKeys(){ if (BULL._kd){ document.removeEventListener('keydown', BULL._kd); BULL._kd = null; } }

  // Stop every carnival-game loop/timer (called by Wonderland nav + each game's open/start).
  function wgStopAll(){
    if (typeof bullStop === 'function') bullStop();
    if (typeof fishStop === 'function') fishStop();
    if (typeof mgrStop === 'function') mgrStop();
  }

  // ===========================================================================
  // Merry Math-Go-Round 🎠 — a rotating carousel of numbered horses; click the
  // horse whose number answers the question in the middle.
  // ===========================================================================
  var MGR_TIME = 45, MGR_HORSES = 6;
  var MGR = { active: false, timer: 0, score: 0, combo: 0, best: 0, timeLeft: 0, diff: 'easy', round: null, hits: 0, misses: 0 };

  function mgrSpinDur(diff){ return diff === 'hard' ? 5.5 : (diff === 'normal' ? 8 : 12); }  // seconds/rev

  // PURE: a question + MGR_HORSES numeric options (one correct), reusing bullGen and padding out.
  function mgrGen(diff){
    var g = bullGen(diff), opts = g.opts.slice(), guard = 0;
    while (opts.length < MGR_HORSES && guard++ < 40){
      var d = g.ans + (rand(0, 1) ? 1 : -1) * rand(1, 10);
      if (d >= 0 && opts.indexOf(d) === -1) opts.push(d);
    }
    var fill = g.ans + opts.length;
    while (opts.length < MGR_HORSES){ if (opts.indexOf(fill) === -1 && fill >= 0) opts.push(fill); fill++; }
    shuffle(opts);
    return { text: g.text, ans: g.ans, opts: opts, correctIdx: opts.indexOf(g.ans) };
  }

  function openCarousel(){
    wgStopAll();
    var view = wgShowView();
    if (!view) return;
    var m = wgMini('carousel');
    view.innerHTML =
      '<div class="wond-board">' +
        '<div class="wond-head"><h2 class="wond-title"><span class="wond-wheel">🎠</span> Merry Math-Go-Round</h2>' +
          '<p class="wond-sub">Ride the carousel — click the horse whose number answers the sum!</p></div>' +
        '<div class="wond-passrow"><span class="wond-passes">🏆 High score: <b>' + (m.highScore || 0) + '</b></span>' +
          '<span class="wond-hint">Free to play · tap a horse · ' + MGR_TIME + 's</span></div>' +
        '<div class="wg-diff-row">' +
          '<button type="button" class="btn btn-primary" onclick="mgrStart(\'easy\')" data-tooltip="Slow spin, simple sums.">🟢 Easy</button>' +
          '<button type="button" class="btn btn-primary" onclick="mgrStart(\'normal\')" data-tooltip="Faster spin, ×/÷.">🟡 Normal</button>' +
          '<button type="button" class="btn btn-primary" onclick="mgrStart(\'hard\')" data-tooltip="Fast spin — best Cash.">🔴 Hard</button>' +
        '</div>' +
        '<div class="wond-footer"><button type="button" class="btn btn-ghost" onclick="openWonderland()" data-tooltip="Back to the Wonderland lobby.">← Lobby</button></div>' +
      '</div>';
  }

  function mgrStart(diff){
    wgStopAll();
    var view = document.getElementById('wonderlandView');
    if (!view) return;
    MGR.active = true; MGR.diff = diff; MGR.score = 0; MGR.combo = 0;
    MGR.timeLeft = MGR_TIME; MGR.hits = 0; MGR.misses = 0;
    MGR.best = wgMini('carousel').highScore || 0;
    view.innerHTML =
      '<div class="wond-board wond-game">' +
        '<div class="wond-game-top"><h2 class="wond-title wond-title-sm">🎠 Merry Math-Go-Round — ' + diff.charAt(0).toUpperCase() + diff.slice(1) + '</h2>' +
          '<button type="button" class="btn btn-ghost" onclick="openCarousel()" data-tooltip="Quit this run (score is not saved).">✕ Quit</button></div>' +
        '<div class="wond-hud" id="mgrHud"></div>' +
        '<div class="mgr-stage"><div class="mgr-ring" id="mgrRing"></div>' +
          '<div class="mgr-center" id="mgrCenter">🎠</div></div>' +
        '<p class="wond-tip">The horse with the right answer wins points. Wrong horse = combo lost.</p>' +
      '</div>';
    mgrNextRound();
    mgrUpdateHud();
    if (typeof playSfx === 'function') playSfx('ui-click');
    MGR.timer = setInterval(mgrTick, 1000);
  }

  function mgrTick(){
    if (!MGR.active) return;
    var view = document.getElementById('wonderlandView');
    if (!view || !view.classList.contains('active') || !document.getElementById('mgrHud')){ mgrStop(); return; }
    MGR.timeLeft--;
    mgrUpdateHud();
    if (MGR.timeLeft <= 0) mgrEnd();
  }

  function mgrNextRound(){
    if (!MGR.active) return;
    MGR.round = mgrGen(MGR.diff);
    var center = document.getElementById('mgrCenter');
    if (center) center.innerHTML = '<span class="mgr-q">' + MGR.round.text + '<span class="mgr-eq">= ?</span></span>';
    var ring = document.getElementById('mgrRing');
    if (!ring) return;
    var dur = mgrSpinDur(MGR.diff);
    ring.style.animationDuration = dur + 's';
    var N = MGR.round.opts.length, R = 40;                       // orbit radius (% of stage)
    ring.innerHTML = MGR.round.opts.map(function(v, i){
      var ang = -Math.PI / 2 + i * (2 * Math.PI / N);
      var x = 50 + R * Math.cos(ang), y = 50 + R * Math.sin(ang);
      return '<div class="mgr-slot" style="left:' + x + '%;top:' + y + '%">' +
        '<button type="button" class="mgr-horse" style="animation-duration:' + dur + 's" onclick="mgrPick(' + i + ')" data-idx="' + i + '">' +
          '<span class="mgr-horse-icon">🐎</span><span class="mgr-horse-num">' + v + '</span>' +
        '</button></div>';
    }).join('');
  }

  function mgrPick(idx){
    if (!MGR.active || !MGR.round) return;
    var ring = document.getElementById('mgrRing');
    var btn = ring && ring.querySelector('[data-idx="' + idx + '"]');
    if (idx === MGR.round.correctIdx){
      MGR.combo++; MGR.hits++;
      MGR.score += 10 + Math.min(MGR.combo - 1, 10) * 2;
      if (btn) btn.classList.add('mgr-hit');
      if (typeof playSfx === 'function') playSfx('solve-correct');
      mgrUpdateHud();
      mgrNextRound();
    } else {
      MGR.combo = 0; MGR.misses++;
      MGR.timeLeft = Math.max(0, MGR.timeLeft - 2);
      if (btn) btn.classList.add('mgr-wrong');
      if (typeof playSfx === 'function') playSfx('wrong');
      mgrUpdateHud();
      if (MGR.timeLeft <= 0){ mgrEnd(); return; }
      setTimeout(function(){ if (MGR.active) mgrNextRound(); }, 260);
    }
  }

  function mgrUpdateHud(){
    var hud = document.getElementById('mgrHud');
    if (!hud) return;
    hud.innerHTML =
      '<span class="wond-chip">⭐ Score: <b>' + MGR.score + '</b></span>' +
      '<span class="wond-chip">🔥 Combo: <b>' + MGR.combo + '</b></span>' +
      '<span class="wond-chip">⏱️ Time: <b>' + MGR.timeLeft + 's</b></span>' +
      '<span class="wond-chip">🏆 Best: <b>' + MGR.best + '</b></span>';
  }

  function mgrStop(){
    MGR.active = false;
    if (MGR.timer){ clearInterval(MGR.timer); MGR.timer = 0; }
  }

  function mgrEnd(){
    var score = MGR.score, diff = MGR.diff, hits = MGR.hits, misses = MGR.misses;
    mgrStop();
    var newHigh = wgRecordScore('carousel', score, diff);
    var r = bullReward(score, diff, newHigh);
    wgPayReward(r);
    var acc = (hits + misses) > 0 ? Math.round(hits / (hits + misses) * 100) : 0;
    var view = document.getElementById('wonderlandView');
    if (!view) return;
    view.innerHTML =
      '<div class="wond-board">' +
        '<div class="wond-head"><h2 class="wond-title">' + (newHigh ? '🏆 NEW HIGH SCORE!' : '🎠 Ride over!') + '</h2>' +
          '<p class="wond-sub">Score <b>' + score + '</b> · ' + hits + ' correct · ' + acc + '% accuracy · ' + diff + '</p></div>' +
        '<div class="wond-result-card"><div class="wond-result-label">Reward</div>' +
          '<div class="wond-prizes"><span class="wond-chip wond-prize-chip">💵 Cash ×' + (r.coins || 0) + '</span>' +
          (r.chips && r.chips.cpu ? '<span class="wond-chip wond-prize-chip">🖥️ CPU ×' + r.chips.cpu + '</span>' : '') + '</div></div>' +
        '<div class="wond-footer">' +
          '<button type="button" class="btn btn-primary" onclick="mgrStart(\'' + diff + '\')" data-tooltip="Play this difficulty again.">↻ Play again</button>' +
          '<button type="button" class="btn btn-ghost" onclick="openCarousel()" data-tooltip="Change difficulty.">🎠 Difficulty</button>' +
          '<button type="button" class="btn btn-ghost" onclick="openWonderland()" data-tooltip="Back to the lobby.">← Lobby</button>' +
        '</div>' +
      '</div>';
  }

  // ===========================================================================
  // Gone Fishin' 🎣 — catch the fish whose number matches the rule.
  // ===========================================================================
  var FISH_TIME = 40;
  var FISH = { active: false, timer: 0, spawner: 0, score: 0, combo: 0, best: 0, timeLeft: 0, diff: 'easy', rule: null, ruleTimer: 0, catches: 0, wrong: 0, seq: 0 };

  function fishConf(diff){
    if (diff === 'hard')   return { min: 1, max: 30, dur: 3.4, spawn: 560 };
    if (diff === 'normal') return { min: 1, max: 20, dur: 4.6, spawn: 720 };
    return { min: 1, max: 12, dur: 6.2, spawn: 900 };
  }

  // PURE: a catch rule + its label.
  function fishGenRule(diff){
    var conf = fishConf(diff), kinds;
    if (diff === 'easy') kinds = ['exact', 'even', 'odd', 'greater'];
    else kinds = ['exact', 'even', 'odd', 'multiple', 'greater', 'less'];
    var kind = kinds[rand(0, kinds.length - 1)];
    if (kind === 'exact'){ var v = rand(conf.min + 1, conf.max); return { kind: kind, val: v, label: 'Catch fish showing <b>' + v + '</b>' }; }
    if (kind === 'even')  return { kind: kind, label: 'Catch <b>EVEN</b> fish' };
    if (kind === 'odd')   return { kind: kind, label: 'Catch <b>ODD</b> fish' };
    if (kind === 'multiple'){ var k = rand(2, 5); return { kind: kind, val: k, label: 'Catch <b>multiples of ' + k + '</b>' }; }
    if (kind === 'greater'){ var g = rand(conf.min + 2, conf.max - 2); return { kind: kind, val: g, label: 'Catch fish <b>greater than ' + g + '</b>' }; }
    var l = rand(conf.min + 3, conf.max - 1); return { kind: 'less', val: l, label: 'Catch fish <b>less than ' + l + '</b>' };
  }

  // PURE: does number n satisfy the rule?
  function fishRuleMatch(rule, n){
    if (!rule) return false;
    switch (rule.kind){
      case 'exact': return n === rule.val;
      case 'even': return n % 2 === 0;
      case 'odd': return n % 2 !== 0;
      case 'multiple': return n % rule.val === 0;
      case 'greater': return n > rule.val;
      case 'less': return n < rule.val;
    }
    return false;
  }

  // A fish number — biased so matching fish appear often enough to be catchable.
  function fishNumber(rule, conf){
    if (rule && rand(0, 9) < 4){
      switch (rule.kind){
        case 'exact': return rule.val;
        case 'even': { var e = rand(Math.ceil(conf.min / 2), Math.floor(conf.max / 2)) * 2; return Math.min(conf.max, Math.max(2, e)); }
        case 'odd': { var o = rand(0, Math.floor((conf.max - 1) / 2)) * 2 + 1; return Math.min(conf.max, Math.max(1, o)); }
        case 'multiple': { var mx = Math.floor(conf.max / rule.val); return rule.val * rand(1, Math.max(1, mx)); }
        case 'greater': return rand(rule.val + 1, conf.max);
        case 'less': return rand(conf.min, Math.max(conf.min, rule.val - 1));
      }
    }
    return rand(conf.min, conf.max);
  }

  function openFishin(){
    wgStopAll();
    var view = wgShowView();
    if (!view) return;
    var m = wgMini('fishin');
    view.innerHTML =
      '<div class="wond-board">' +
        '<div class="wond-head"><h2 class="wond-title"><span class="wond-wheel">🎣</span> Gone Fishin’</h2>' +
          '<p class="wond-sub">Catch only the fish whose number matches the rule!</p></div>' +
        '<div class="wond-passrow"><span class="wond-passes">🏆 High score: <b>' + (m.highScore || 0) + '</b></span>' +
          '<span class="wond-hint">Free to play · tap fish · ' + FISH_TIME + 's</span></div>' +
        '<div class="wg-diff-row">' +
          '<button type="button" class="btn btn-primary" onclick="fishStart(\'easy\')" data-tooltip="Slow fish, simple rules.">🟢 Easy</button>' +
          '<button type="button" class="btn btn-primary" onclick="fishStart(\'normal\')" data-tooltip="Faster fish, more rules.">🟡 Normal</button>' +
          '<button type="button" class="btn btn-primary" onclick="fishStart(\'hard\')" data-tooltip="Fast shoals — best Cash.">🔴 Hard</button>' +
        '</div>' +
        '<div class="wond-footer"><button type="button" class="btn btn-ghost" onclick="openWonderland()" data-tooltip="Back to the Wonderland lobby.">← Lobby</button></div>' +
      '</div>';
  }

  function fishStart(diff){
    wgStopAll();
    var view = document.getElementById('wonderlandView');
    if (!view) return;
    FISH.active = true; FISH.diff = diff; FISH.score = 0; FISH.combo = 0;
    FISH.timeLeft = FISH_TIME; FISH.catches = 0; FISH.wrong = 0; FISH.seq = 0; FISH.ruleTimer = 0;
    FISH.best = wgMini('fishin').highScore || 0;
    FISH.rule = fishGenRule(diff);
    view.innerHTML =
      '<div class="wond-board wond-game">' +
        '<div class="wond-game-top"><h2 class="wond-title wond-title-sm">🎣 Gone Fishin’ — ' + diff.charAt(0).toUpperCase() + diff.slice(1) + '</h2>' +
          '<button type="button" class="btn btn-ghost" onclick="openFishin()" data-tooltip="Quit this run (score is not saved).">✕ Quit</button></div>' +
        '<div class="wond-hud" id="fishHud"></div>' +
        '<div class="fish-rule" id="fishRule"></div>' +
        '<div class="fish-pond" id="fishPond"></div>' +
        '<p class="wond-tip">Tap a fish that matches the rule. Right fish = points · wrong fish = combo lost.</p>' +
      '</div>';
    fishUpdateRule();
    fishUpdateHud();
    if (typeof playSfx === 'function') playSfx('ui-click');
    var conf = fishConf(diff);
    FISH.spawner = setInterval(fishSpawn, conf.spawn);
    FISH.timer = setInterval(fishTick, 1000);
    fishSpawn();
  }

  function fishTick(){
    if (!FISH.active) return;
    var view = document.getElementById('wonderlandView');
    if (!view || !view.classList.contains('active') || !document.getElementById('fishPond')){ fishStop(); return; }
    FISH.timeLeft--;
    FISH.ruleTimer++;
    if (FISH.ruleTimer >= 8){ FISH.ruleTimer = 0; FISH.rule = fishGenRule(FISH.diff); fishUpdateRule(); }  // rotate the rule
    fishUpdateHud();
    if (FISH.timeLeft <= 0) fishEnd();
  }

  function fishSpawn(){
    if (!FISH.active) return;
    var pond = document.getElementById('fishPond');
    if (!pond) return;
    var conf = fishConf(FISH.diff);
    var n = fishNumber(FISH.rule, conf);
    var id = 'fish' + (FISH.seq++);
    var top = 8 + Math.floor(Math.random() * 72);              // % of pond height
    var el = document.createElement('button');
    el.type = 'button';
    el.className = 'fish';
    el.id = id;
    el.style.top = top + '%';
    el.style.animationDuration = conf.dur + 's';
    el.innerHTML = '<span class="fish-body">🐟</span><span class="fish-num">' + n + '</span>';
    el.setAttribute('data-n', n);
    el.onclick = function(){ fishCatch(el, n); };
    el.addEventListener('animationend', function(){ if (el.parentNode) el.parentNode.removeChild(el); });
    pond.appendChild(el);
  }

  function fishCatch(el, n){
    if (!FISH.active || !el || el.classList.contains('fish-caught')) return;
    if (fishRuleMatch(FISH.rule, n)){
      FISH.combo++;
      FISH.catches++;
      FISH.score += 12 + Math.min(FISH.combo - 1, 12) * 2;
      el.classList.add('fish-caught');
      if (typeof playSfx === 'function') playSfx('solve-correct');
      setTimeout(function(){ if (el.parentNode) el.parentNode.removeChild(el); }, 240);
    } else {
      FISH.combo = 0;
      FISH.wrong++;
      FISH.score = Math.max(0, FISH.score - 5);
      el.classList.add('fish-wrong');
      if (typeof playSfx === 'function') playSfx('wrong');
    }
    fishUpdateHud();
  }

  function fishUpdateRule(){
    var r = document.getElementById('fishRule');
    if (r && FISH.rule) r.innerHTML = '🎣 ' + FISH.rule.label;
  }
  function fishUpdateHud(){
    var hud = document.getElementById('fishHud');
    if (!hud) return;
    hud.innerHTML =
      '<span class="wond-chip">⭐ Score: <b>' + FISH.score + '</b></span>' +
      '<span class="wond-chip">🔥 Combo: <b>' + FISH.combo + '</b></span>' +
      '<span class="wond-chip">⏱️ Time: <b>' + FISH.timeLeft + 's</b></span>' +
      '<span class="wond-chip">🏆 Best: <b>' + FISH.best + '</b></span>';
  }

  function fishStop(){
    FISH.active = false;
    if (FISH.timer){ clearInterval(FISH.timer); FISH.timer = 0; }
    if (FISH.spawner){ clearInterval(FISH.spawner); FISH.spawner = 0; }
  }

  function fishEnd(){
    var score = FISH.score, diff = FISH.diff, catches = FISH.catches, wrong = FISH.wrong;
    fishStop();
    var newHigh = wgRecordScore('fishin', score, diff);
    var r = bullReward(score, diff, newHigh);                  // same Cash-scaling model
    wgPayReward(r);
    var acc = (catches + wrong) > 0 ? Math.round(catches / (catches + wrong) * 100) : 0;
    var view = document.getElementById('wonderlandView');
    if (!view) return;
    view.innerHTML =
      '<div class="wond-board">' +
        '<div class="wond-head"><h2 class="wond-title">' + (newHigh ? '🏆 NEW HIGH SCORE!' : '🎣 Time’s up!') + '</h2>' +
          '<p class="wond-sub">Score <b>' + score + '</b> · ' + catches + ' catches · ' + acc + '% accuracy · ' + diff + '</p></div>' +
        '<div class="wond-result-card"><div class="wond-result-label">Reward</div>' +
          '<div class="wond-prizes"><span class="wond-chip wond-prize-chip">💵 Cash ×' + (r.coins || 0) + '</span>' +
          (r.chips && r.chips.cpu ? '<span class="wond-chip wond-prize-chip">🖥️ CPU ×' + r.chips.cpu + '</span>' : '') + '</div></div>' +
        '<div class="wond-footer">' +
          '<button type="button" class="btn btn-primary" onclick="fishStart(\'' + diff + '\')" data-tooltip="Play this difficulty again.">↻ Play again</button>' +
          '<button type="button" class="btn btn-ghost" onclick="openFishin()" data-tooltip="Change difficulty.">🎣 Difficulty</button>' +
          '<button type="button" class="btn btn-ghost" onclick="openWonderland()" data-tooltip="Back to the lobby.">← Lobby</button>' +
        '</div>' +
      '</div>';
  }
