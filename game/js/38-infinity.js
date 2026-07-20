  // ============================================================================
  // Arena Infinity (module 38) — endless mixed-recall practice drawing from EVERY
  // arena the player has already cleared, to sharpen precision. FREE to enter; it
  // is a reward SOURCE: each round of 10 grants XP, Wonderland Passes, Cash, and a
  // gold chest of materials scaled by accuracy. Classic script, one global scope.
  // Only serves mcOnly / directInput questions (skips the equation-battle arenas,
  // which need the balance UI). Globals, no IIFE.
  // ============================================================================
  var INF = { active: false, q: null, arena: 0, asked: 0, correct: 0, streak: 0, best: 0, target: 10, locked: false, _t: null };
  // Player picks the round length up front — each length pays a FIXED pass reward for finishing
  // it (not scaled by accuracy), with the longest round paying better than straight-line so going
  // the distance is worth it (player: "3 questions...1 pass; 6 questions...2 passes; 10
  // questions...5 passes...add those buttons to choose").
  var INF_ROUNDS = [
    { target: 3, passes: 1 },
    { target: 6, passes: 2 },
    { target: 10, passes: 5 }
  ];

  function _infMaxArena(){
    var cap = (typeof CURRICULUM_MAX === 'number' && CURRICULUM_MAX > 0) ? CURRICULUM_MAX : 65;
    var lvl = (typeof state === 'object' && state && state.level) ? state.level : 1;
    return Math.max(1, Math.min(lvl, cap));
  }
  function _infRand(a, b){ return (typeof rand === 'function') ? rand(a, b) : (a + Math.floor(Math.random() * (b - a + 1))); }
  function _infPretty(s){ return (typeof mathPretty === 'function') ? mathPretty(s) : String(s == null ? '' : s); }

  // The RISING FLOOR — trivial early arenas drop out of the pool as the player advances,
  // and difficulty also climbs across the 10-question round and with a hot streak. This is
  // why a level-30 player no longer gets "5 × 1" from Arena 1. Kept well below maxN so the
  // draw band always stays wide (the picker skips equation-battle arenas, so a narrow band
  // could exhaust its retries).
  function _infMinArena(maxN){
    if (maxN <= 3) return 1;                                   // early game: use the whole range
    var progressFloor = Math.floor(maxN * 0.45);              // the further you've cleared, the higher the floor
    var asked = (INF && INF.asked) || 0;
    var roundRamp = Math.floor((asked / (INF.target || 10)) * maxN * 0.35);  // climbs during the round
    var streakBonus = Math.min((INF && INF.streak) || 0, 6);  // reward a hot streak with harder questions
    var minN = progressFloor + roundRamp + streakBonus;
    return Math.max(1, Math.min(minN, Math.floor(maxN * 0.7), maxN - 1));    // keep a wide band to draw from
  }

  function _infView(){
    var v = document.getElementById('infinityView');
    if (!v){ v = document.createElement('div'); v.id = 'infinityView'; v.className = 'inf-overlay'; document.body.appendChild(v); }
    return v;
  }

  // Pick a self-contained (mcOnly / directInput) question from a random cleared arena.
  function _infPick(){
    var maxN = _infMaxArena();
    var minN = _infMinArena(maxN);
    for (var t = 0; t < 60; t++){
      var n = _infRand(minN, maxN);
      var p;
      try { p = generateProblem(n); } catch (e){ continue; }
      if (p && (p.mode === 'mcOnly' || p.mode === 'directInput') && (p.prompt || p.choices)){ p._arena = n; return p; }
    }
    // Fallback: don't dump the player back to trivial Arena 1 — scan DOWN from the middle of
    // the band for the first self-contained question, only bottoming out at Arena 1 if nothing
    // higher works.
    for (var m = Math.max(minN, Math.round((minN + maxN) / 2)); m >= 1; m--){
      var q; try { q = generateProblem(m); } catch (e){ continue; }
      if (q && (q.mode === 'mcOnly' || q.mode === 'directInput') && (q.prompt || q.choices)){ q._arena = m; return q; }
    }
    var f = generateProblem(1); if (f) f._arena = 1; return f;
  }

  function openArenaInfinity(){
    INF.active = false;   // not counting as "in a round" until a length is actually picked
    if (INF._t){ clearTimeout(INF._t); INF._t = null; }
    document.querySelectorAll('.view-container.active').forEach(function(x){ x.classList.remove('active'); });
    _infView().classList.add('open');
    if (typeof playMusic === 'function') playMusic('practice');
    infRenderPicker();
  }

  function infRenderPicker(){
    var v = document.getElementById('infinityView'); if (!v) return;
    v.innerHTML =
      '<div class="inf-card">' +
        '<button class="inf-close" onclick="closeArenaInfinity()" title="Leave Arena Infinity">✕</button>' +
        '<div class="inf-kicker">♾️ Arena Infinity</div>' +
        '<div class="inf-headline">Choose a round</div>' +
        '<div class="inf-topic">Mixed-review questions from arenas you\'ve already cleared. Finish the whole round to collect the passes — leaving early pays nothing.</div>' +
        '<div class="inf-rounds">' + INF_ROUNDS.map(function(r){
          return '<button type="button" class="inf-choice inf-round-btn" onclick="infStartRound(' + r.target + ')">' +
            '<span class="inf-round-n">' + r.target + ' Questions</span>' +
            '<span class="inf-round-pay">🎟️ ' + r.passes + ' Pass' + (r.passes > 1 ? 'es' : '') + '</span></button>';
        }).join('') +
        '</div>' +
      '</div>';
  }

  function infStartRound(target){
    var round = INF_ROUNDS.filter(function(r){ return r.target === target; })[0] || INF_ROUNDS[INF_ROUNDS.length - 1];
    INF.active = true; INF.asked = 0; INF.correct = 0; INF.streak = 0; INF.best = 0; INF.locked = false;
    INF.target = round.target;
    infNextQuestion();
  }

  function closeArenaInfinity(){
    INF.active = false;
    if (INF._t){ clearTimeout(INF._t); INF._t = null; }
    var v = document.getElementById('infinityView'); if (v) v.classList.remove('open');
    if (typeof openMapHub === 'function') { openMapHub(); return; }
    var eq = document.getElementById('equationView'); if (eq) eq.classList.add('active');
  }

  function infNextQuestion(){
    if (INF._t){ clearTimeout(INF._t); INF._t = null; }
    if (INF.asked >= INF.target){ infFinish(); return; }
    INF.locked = false;
    INF.q = _infPick();
    INF.arena = INF.q ? INF.q._arena : 1;
    infRender(null);
  }

  function infRender(feedback){
    var v = document.getElementById('infinityView'); if (!v) return;
    var q = INF.q; if (!q) return;
    var arena = (typeof getArena === 'function') ? getArena(INF.arena) : null;
    var topic = arena ? arena.topic : '';
    var body;
    if (q.mode === 'mcOnly'){
      body = '<div class="inf-choices">' + (q.choices || []).map(function(c, i){
        return '<button type="button" class="inf-choice"' + (INF.locked ? ' disabled' : '') + ' onclick="infAnswerMc(' + i + ')">' + _infPretty(c) + '</button>';
      }).join('') + '</div>';
    } else {
      body = '<form class="inf-input-row" onsubmit="return infAnswerInput();">' +
        '<input type="text" id="infInput" class="inf-input" inputmode="numeric" autocomplete="off" placeholder="type your answer"' + (INF.locked ? ' disabled' : '') + ' />' +
        '<button type="submit" class="btn btn-primary"' + (INF.locked ? ' disabled' : '') + '>Submit ✓</button></form>';
    }
    v.innerHTML =
      '<div class="inf-card">' +
        '<button class="inf-close" onclick="closeArenaInfinity()" title="Leave Arena Infinity">✕</button>' +
        '<div class="inf-kicker">♾️ Arena Infinity</div>' +
        '<div class="inf-hud"><span>Q <b>' + (Math.min(INF.asked + 1, INF.target)) + '</b> / ' + INF.target + '</span>' +
          '<span>✅ <b>' + INF.correct + '</b></span><span>🔥 <b>' + INF.streak + '</b></span></div>' +
        '<div class="inf-topic">From Arena ' + INF.arena + (topic ? ' · ' + topic : '') + '</div>' +
        '<div class="inf-q">' + _infPretty(q.prompt || '') + '</div>' +
        body +
        (feedback ? '<div class="inf-feedback ' + feedback.cls + '">' + feedback.msg + '</div>' : '<div class="inf-feedback"></div>') +
      '</div>';
    var inp = document.getElementById('infInput'); if (inp && !INF.locked){ try { inp.focus(); } catch (e){} }
  }

  function infAnswerMc(i){
    if (INF.locked || !INF.q) return;
    INF.locked = true;
    var ok = (i === INF.q.correctIndex);
    infGrade(ok, 'Answer: ' + _infPretty(INF.q.choices[INF.q.correctIndex]));
  }
  function infAnswerInput(){
    if (INF.locked || !INF.q) return false;
    var inp = document.getElementById('infInput'); if (!inp) return false;
    var val = inp.value.trim();
    if (val === '') return false;
    INF.locked = true;
    var ans = INF.q.answer;
    var ok = (String(val) === String(ans)) || (val !== '' && parseFloat(val) === parseFloat(ans));
    infGrade(ok, 'Answer: ' + _infPretty(String(ans)));
    return false;
  }
  function infGrade(ok, revealMsg){
    INF.asked++;
    if (ok){
      INF.correct++; INF.streak++; if (INF.streak > INF.best) INF.best = INF.streak;
      if (typeof addHeroXp === 'function') addHeroXp(4);
      if (typeof playSfx === 'function') playSfx('correct');
    } else {
      INF.streak = 0;
      if (typeof playSfx === 'function') playSfx('wrong');
    }
    if (typeof updateStats === 'function') updateStats();
    infRender({ cls: ok ? 'inf-ok' : 'inf-bad', msg: (ok ? '✅ Correct! ' : '❌ Not quite. ') + revealMsg });
    INF._t = setTimeout(infNextQuestion, 1400);
  }

  function infFinish(){
    var correct = INF.correct, target = INF.target;
    var xp = correct * 10;
    // Passes are a FIXED reward for the chosen round length (INF_ROUNDS), not scaled by
    // accuracy — finishing the round is what counts, per the same table shown on the picker.
    var round = INF_ROUNDS.filter(function(r){ return r.target === target; })[0];
    var passes = round ? round.passes : Math.max(1, Math.floor(correct / 3));
    var cash = correct * 15;
    var loot = { gold: Math.ceil(correct / 4), silver: Math.ceil(correct / 2), chips: { energy_core: Math.max(1, Math.ceil(correct / 3)) } };
    if (typeof addHeroXp === 'function') addHeroXp(xp);
    if (typeof state === 'object' && state){ state.wonderPasses = (state.wonderPasses || 0) + passes; state.coins = (state.coins || 0) + cash; }
    if (typeof addMaterials === 'function') addMaterials(loot);
    if (typeof updateStats === 'function') updateStats();
    if (typeof saveGame === 'function') saveGame();
    var v = document.getElementById('infinityView'); if (!v) return;
    var pct = Math.round((correct / target) * 100);
    var headline = pct >= 90 ? '🌟 Sharpshooter!' : (pct >= 60 ? '🎉 Nice round!' : '💪 Keep practising!');
    v.innerHTML =
      '<div class="inf-card inf-result">' +
        '<button class="inf-close" onclick="closeArenaInfinity()" title="Leave Arena Infinity">✕</button>' +
        '<div class="inf-kicker">♾️ Arena Infinity</div>' +
        '<div class="inf-headline">' + headline + '</div>' +
        '<div class="inf-score">' + correct + ' / ' + target + ' correct</div>' +
        '<div class="inf-rewards">🎁 +' + xp + ' XP · +' + passes + ' 🎟️ Passes · 💵' + cash + ' Cash · a gold chest of materials</div>' +
        '<div class="inf-actions">' +
          '<button class="btn btn-primary" onclick="openArenaInfinity()">♾️ Play again</button>' +
          '<button class="btn btn-ghost" onclick="closeArenaInfinity()">← Back to Earth</button>' +
        '</div>' +
      '</div>';
    if (typeof showVictoryChest === 'function') showVictoryChest(loot, cash);
  }
