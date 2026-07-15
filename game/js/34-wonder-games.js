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

  // Stop every carnival-game loop/timer (called by Wonderland nav + each game's open/start).
  function wgStopAll(){
    if (typeof fishStop === 'function') fishStop();
    if (typeof qbfStop === 'function') qbfStop();
    if (typeof agStopAll === 'function') agStopAll();   // arcade games (36-arcade.js)
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
