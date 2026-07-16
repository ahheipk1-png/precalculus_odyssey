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
    if (typeof state !== 'object' || !state) return { highScore: 0, plays: 0, bestByDiff: {}, bestLevel: 0 };
    if (!state.miniGames) state.miniGames = {};
    var m = state.miniGames[id];
    if (!m || typeof m !== 'object'){ m = { highScore: 0, plays: 0, bestByDiff: {}, bestLevel: 0 }; state.miniGames[id] = m; }
    if (!m.bestByDiff) m.bestByDiff = {};
    if (!m.bestLevel) m.bestLevel = 0;
    return m;
  }
  // Record a run; returns true if it's a new personal best. Persists via saveGame. `level` is
  // whatever level/reach number that run achieved — snapshotted into m.bestLevel alongside
  // m.highScore whenever a new high score lands, so the global leaderboard can show "Lv X · score Y"
  // (see functions/api/cloud/leaderboard.js) without a separate tracked field per game.
  function wgRecordScore(id, score, level){
    var m = wgMini(id);
    m.plays = (m.plays || 0) + 1;
    var isHigh = score > (m.highScore || 0);
    if (isHigh){ m.highScore = score; m.bestLevel = level || 1; }
    if (level && score > (m.bestByDiff[level] || 0)) m.bestByDiff[level] = score;
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
  var FISH_MAX_LEVEL = 5;
  var FISH = { active: false, timer: 0, spawner: 0, score: 0, combo: 0, best: 0, rule: null, catches: 0, wrong: 0, seq: 0, level: 1, target: 0 };

  function fishConf(diff){
    if (diff === 'hard')   return { min: 1, max: 30, dur: 3.4, spawn: 560 };
    if (diff === 'normal') return { min: 1, max: 20, dur: 4.6, spawn: 720 };
    return { min: 1, max: 12, dur: 6.2, spawn: 900 };
  }
  // No more difficulty picker — the run itself ramps the difficulty tier as levels climb.
  function fishDiffForLevel(level){
    if (level >= 4) return 'hard';
    if (level >= 3) return 'normal';
    return 'easy';
  }
  // Level-based: each level you must catch `target` matching fish. Higher levels spawn faster fish
  // more often; the underlying difficulty tier also rises with the level (fishDiffForLevel).
  function fishLevelConf(level){
    var diff = fishDiffForLevel(level);
    var base = fishConf(diff), lv = Math.max(1, level);
    return { min: base.min, max: base.max,
      dur: Math.max(2.2, base.dur - (lv - 1) * 0.5),
      spawn: Math.max(320, base.spawn - (lv - 1) * 70),
      target: 4 + lv * 2 };   // 6, 8, 10, 12, 14 catches to clear levels 1-5
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

  // Free to view (no pass charge) — the welcome screen's Play button charges via
  // wonderPlay('fishStart'). No more easy/normal/hard picker: every run starts at level 1 and
  // the difficulty tier itself rises with the level (fishDiffForLevel).
  function openFishin(){
    wgStopAll();
    gameWelcome('fishin', '🎣', "Gone Fishin'",
      'Catch only the fish whose number matches the rule! ' + FISH_MAX_LEVEL + ' levels — fish get faster and rules trickier as you climb.',
      'fishStart');
  }

  function fishStart(){
    wgStopAll();
    var view = document.getElementById('wonderlandView');
    if (!view) return;
    FISH.active = true; FISH.score = 0; FISH.combo = 0;
    FISH.wrong = 0; FISH.seq = 0; FISH.level = 1;
    FISH.best = wgMini('fishin').highScore || 0;
    view.innerHTML =
      '<div class="wond-board wond-game">' +
        (typeof agTopBar === 'function' ? agTopBar('🎣 Gone Fishin’', 'openFishin()') : '') +
        '<div class="wond-hud" id="fishHud"></div>' +
        '<div class="fish-rule" id="fishRule"></div>' +
        '<div class="fish-pond" id="fishPond"></div>' +
        '<p class="wond-tip">Catch the target number of matching fish to clear each level. Right fish = points · wrong fish = combo lost.</p>' +
      '</div>';
    if (typeof playSfx === 'function') playSfx('ui-click');
    fishStartLevel(1);
  }

  // Sets up (or advances to) one level: fresh rule + target, faster spawns, resets the catch counter.
  function fishStartLevel(level){
    FISH.level = level;
    var lc = fishLevelConf(level);
    FISH.target = lc.target;
    FISH.catches = 0;
    FISH.rule = fishGenRule(fishDiffForLevel(level));
    fishUpdateRule();
    fishUpdateHud();
    if (FISH.spawner){ clearInterval(FISH.spawner); FISH.spawner = 0; }
    FISH.spawner = setInterval(fishSpawn, lc.spawn);
    fishSpawn();
  }

  function fishLevelUp(){
    if (FISH.level >= FISH_MAX_LEVEL){ fishEnd(true); return; }
    if (typeof showToast === 'function') showToast('🎣 Level ' + FISH.level + ' cleared!');
    if (typeof playSfx === 'function') playSfx('correct');
    var pond = document.getElementById('fishPond'); if (pond) pond.innerHTML = '';   // clear leftover fish
    fishStartLevel(FISH.level + 1);
  }

  function fishSpawn(){
    if (!FISH.active) return;
    var pond = document.getElementById('fishPond');
    if (!pond) return;
    var conf = fishLevelConf(FISH.level);
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
      fishUpdateHud();
      if (FISH.catches >= FISH.target) fishLevelUp();   // level cleared → advance (or finish)
      return;
    }
    FISH.combo = 0;
    FISH.wrong++;
    FISH.score = Math.max(0, FISH.score - 5);
    el.classList.add('fish-wrong');
    if (typeof playSfx === 'function') playSfx('wrong');
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
      '<span class="wond-chip">🎚️ Level: <b>' + FISH.level + ' / ' + FISH_MAX_LEVEL + '</b></span>' +
      '<span class="wond-chip">🐟 Caught: <b>' + FISH.catches + ' / ' + FISH.target + '</b></span>' +
      '<span class="wond-chip">⭐ Score: <b>' + FISH.score + '</b></span>' +
      '<span class="wond-chip">🔥 Combo: <b>' + FISH.combo + '</b></span>';
  }

  // Cash-only reward (mini-games aren't a gear farm), modelled on qbfReward. Rate scales with the
  // level reached — higher levels pay better, matching every other Wonderland game.
  function fishReward(score, level, newHigh){
    var rate = 0.07 + level * 0.014;
    var r = { coins: Math.max(0, Math.round(score * rate)) };
    if (newHigh){ r.coins += 25; r.newHigh = true; }
    if (level >= FISH_MAX_LEVEL && newHigh && score >= 400){ r.chips = { cpu: 1 }; }
    return r;
  }

  function fishStop(){
    FISH.active = false;
    if (FISH.timer){ clearInterval(FISH.timer); FISH.timer = 0; }
    if (FISH.spawner){ clearInterval(FISH.spawner); FISH.spawner = 0; }
  }

  function fishEnd(allCleared){
    var level = FISH.level;
    // Score gets a level bonus so clearing further pays more.
    var score = FISH.score + (allCleared ? 200 : level * 30);
    fishStop();
    var newHigh = wgRecordScore('fishin', score, level);
    var r = fishReward(score, level, newHigh);
    wgPayReward(r);
    var view = document.getElementById('wonderlandView');
    if (!view) return;
    view.innerHTML =
      '<div class="wond-board">' +
        '<div class="wond-head"><h2 class="wond-title">' + (allCleared ? '🌟 ALL LEVELS CLEARED!' : '🎣 Nice fishing!') + (newHigh ? ' 🏆' : '') + '</h2>' +
          '<p class="wond-sub">Cleared <b>' + (allCleared ? FISH_MAX_LEVEL : (level - 1)) + ' / ' + FISH_MAX_LEVEL + '</b> levels · score <b>' + score + '</b>' + (newHigh ? ' · new best!' : '') + '</p></div>' +
        '<div class="wond-result-card"><div class="wond-result-label">Reward</div>' +
          '<div class="wond-prizes"><span class="wond-chip wond-prize-chip">💵 Cash ×' + (r.coins || 0) + '</span>' +
          (r.chips && r.chips.cpu ? '<span class="wond-chip wond-prize-chip">🖥️ CPU ×' + r.chips.cpu + '</span>' : '') + '</div></div>' +
        '<div class="wond-footer">' +
          '<button type="button" class="btn btn-primary" onclick="openFishin()" data-tooltip="Back to Gone Fishin\'s welcome screen.">↻ Play Again</button>' +
          '<button type="button" class="btn btn-ghost" onclick="openWonderland()" data-tooltip="Back to the lobby.">← Lobby</button>' +
        '</div>' +
      '</div>';
  }
