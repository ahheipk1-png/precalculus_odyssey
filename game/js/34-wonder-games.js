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
    bullStop();
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
    bullStop();
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
