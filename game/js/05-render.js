  // ---------- Rendering ----------

  // levelCodes moved to game/config/rooms.config.js (loaded before this module).
  var maxUpgradeLevel = 3;

  // Upgrading is deliberately the better economic choice over buying the next tier:
  // gain scales with the item's own stat (25% of base per level), cost is cheap (15% of
  // item.cost + a small flat step per level, floor 8). Fully maxing an item (+3) lands its
  // stat close to the next tier's base for well under the price of buying that tier outright.
  function getUpgradeGain(item, type) {
    var base = type === 'weapon' ? item.power : item.defense;
    return Math.max(1, Math.round(base * 0.25));
  }

  function getUpgradeCostForLevel(item, upgradeLevel) {
    return Math.max(8, Math.round(item.cost * 0.15) + upgradeLevel * 8);
  }

  function getItemSellValue(item, upgradeLevel) {
    if (item.cost === 0) return 0;
    var lvl = typeof upgradeLevel === 'number' ? upgradeLevel : item.upgradeLvl;
    var baseSell = Math.round(item.cost * 0.6);
    var upgradeSell = 0;
    for (var i = 0; i < lvl; i++) {
      upgradeSell += Math.round(getUpgradeCostForLevel(item, i) * 0.75);
    }
    return baseSell + upgradeSell;
  }

  function addHeroXp(amount) {
    state.heroXp += amount;
    var xpNeeded = state.heroLvl * 100;
    var leveledUp = false;
    while (state.heroXp >= xpNeeded) {
      state.heroXp -= xpNeeded;
      state.heroLvl++;
      state.playerMaxHp += 20;
      state.playerMaxMp += 10;
      // Gain the new HP/MP capacity, but existing wounds persist (rest at the Hotel to heal).
      state.playerHp = Math.min(state.playerMaxHp, state.playerHp + 20);
      state.playerMp = Math.min(state.playerMaxMp, state.playerMp + 10);
      xpNeeded = state.heroLvl * 100;
      leveledUp = true;
    }
    updateHeroStatsDisplay();
    if (leveledUp) {
      showToast(`🎉 HERO LEVEL UP! Reached Lv. ${state.heroLvl}! Max HP/MP increased!`);
      burst(15);
      if (state.heroLvl === 3) {
        setTimeout(function(){ showToast('✨ Learned Spells: GREATER HEAL (80 HP, 30 MP)!'); }, 2000);
      } else if (state.heroLvl === 6) {
        setTimeout(function(){ showToast('✨ Learned Spells: ELIXIR OF LIFE (200 HP, 50 MP)!'); }, 2000);
      }
    }
  }

  function updateHeroStatsDisplay() {
    var xpNeeded = state.heroLvl * 100;
    if (el.heroLvlText) el.heroLvlText.textContent = 'Lv. ' + state.heroLvl;
    if (el.heroXpText) el.heroXpText.textContent = state.heroXp + '/' + xpNeeded;
    if (el.heroXpBar) {
      var pct = Math.min(100, (state.heroXp / xpNeeded) * 100);
      el.heroXpBar.style.width = pct + '%';
    }
    if (el.heroHpText) el.heroHpText.textContent = state.playerHp + '/' + state.playerMaxHp;
    if (el.heroMpText) el.heroMpText.textContent = state.playerMp + '/' + state.playerMaxMp;
  }

  function updateTrophiesUI() {
    if (el.trophiesCount) el.trophiesCount.textContent = state.trophies.length;
    if (el.trophiesList) {
      if (state.trophies.length === 0) {
        el.trophiesList.innerHTML = `<em style="color:var(--chalk-dim);">No trophies collected yet. Defeat arena monsters!</em>`;
      } else {
        el.trophiesList.innerHTML = state.trophies.map(function(t) {
          return `<span style="background:rgba(255,210,0,0.12); border:1px solid rgba(255,210,0,0.4); padding:3px 8px; border-radius:6px; margin:2px 0; color:#ffd200; font-family:'Patrick Hand', cursive; font-size:14px; display:inline-block;">${t}</span>`;
        }).join(' ');
      }
    }
  }

  function updateStats(){
    // Secret test account: keep coins (and gems, once the materials system exists) topped up so
    // the tester can buy/upgrade anything freely. Re-pinned on every stats refresh, so spending
    // never actually runs it down.
    if (state.testMode) {
      state.coins = 999999;
      state.gems = 999999;
      // top up every currency + chip so the tester can buy/upgrade/craft freely
      if (!state.currencies) state.currencies = { gold: 0, silver: 0 };
      if ((state.currencies.gold || 0) < 999) state.currencies.gold = 999;
      if ((state.currencies.silver || 0) < 999) state.currencies.silver = 999;
      if (typeof CHIP_ORDER !== 'undefined') {
        CHIP_ORDER.forEach(function(k){ if ((state.chips[k] || 0) < 999) state.chips[k] = 999; });
      }
      // …and Wonderland passes + every consumable/ingredient (minigames, alchemy, farm)
      if ((state.wonderPasses || 0) < 999) state.wonderPasses = 999;
      if (typeof ITEM_ORDER !== 'undefined') {
        ITEM_ORDER.forEach(function(k){ if ((state.inventory[k] || 0) < 99) state.inventory[k] = 99; });
      }
    }
    if (el.level) el.level.textContent = state.level;
    // Planet tile: show the real body name + its star system (tap opens the star map).
    if (el.planetName || el.planetSystem) {
      var _ar = (typeof getArena === 'function') ? getArena(state.level) : null;
      if (el.planetName) el.planetName.textContent = (_ar && _ar.body) ? _ar.body.name : ('Arena ' + state.level);
      // Show the math TOPIC next to the arena number (the star system lives in the "About" info).
      if (el.planetSystem) el.planetSystem.textContent = _ar ? _ar.topic : '';
      // Header tagline reflects the current maths WORLD (not a hardcoded "Balance Quest").
      var _tag = document.getElementById('gameTagline');
      if (_tag && _ar){
        var _w = (typeof MATH_WORLDS !== 'undefined') ? MATH_WORLDS.filter(function(w){ return w.id === _ar.worldId; })[0] : null;
        _tag.innerHTML = _w
          ? '🌌 <span class="x-emph">' + _w.title + '</span> · Arena ' + state.level + ' of ' + (state.maxLevel || 187)
          : 'A maths voyage across the galaxy — solve planets to explore the stars.';
      }
    }
    if (el.passValue) el.passValue.textContent = state.wonderPasses || 0;
    if (el.streakValue) el.streakValue.textContent = state.streak;
    if (el.levelCodeVal) {
      var _ar = (typeof getArena === 'function') ? getArena(state.level) : null;
      el.levelCodeVal.textContent = _ar ? _ar.code : (levelCodes[Math.min(state.level - 1, levelCodes.length - 1)] || 'STAR');
    }
    updateHeroStatsDisplay();
    updateTrophiesUI();
    updateCurrencyBar();
    saveGame();
  }

  // Cash · Gold · Silver · Chips HUD strip (user-required currency display).
  function updateCurrencyBar(){
    var cb = document.getElementById('currencyBar');
    if (!cb) return;
    var c = state.currencies || { gold: 0, silver: 0 };
    var chips = (typeof chipTotal === 'function') ? chipTotal() : 0;
    cb.innerHTML =
      '<span class="cur-chip cur-cash" title="Cash — earned by solving arenas, spent in shops">💵 <b>' + state.coins + '</b> Cash</span>' +
      '<span class="cur-chip" title="Gold — premium currency from bosses and trading">🥇 <b>' + (c.gold || 0) + '</b> Gold</span>' +
      '<span class="cur-chip" title="Silver — mid-tier currency from bosses and trading">🥈 <b>' + (c.silver || 0) + '</b> Silver</span>' +
      '<span class="cur-chip" title="AI chips — spend them to upgrade gear">🧩 <b>' + chips + '</b> Chips</span>';
  }

  function updateLevelProgress(forceFilled){
    var filled = (typeof forceFilled === 'number') ? forceFilled : Math.min(6, state.levelSolves);
    var dots = el.progressDots.querySelectorAll('.progress-dot');
    for (var i = 0; i < dots.length; i++){
      dots[i].classList.toggle('filled', i < filled);
    }
    if (state.level >= state.maxLevel) {
      el.levelProgressText.textContent = 'Max planet! Keep the streak going \uD83D\uDD25';
    } else if (state.levelSolves < 6) {
      var toGo = 6 - state.levelSolves;
      el.levelProgressText.textContent = toGo + ' more to open Boss Gate!';
    } else {
      var extraToGo = 9 - state.levelSolves;
      el.levelProgressText.textContent = 'Boss Gate Open! Solve ' + extraToGo + ' more to skip Boss!';
    }
  }

  function showMsg(text, isWarn){
    el.feedback.textContent = text;
    el.feedback.className = 'feedback' + (isWarn ? ' bad' : '');
  }

  // The Algebra Console hint names the variable actually being isolated: `x` for
  // numeric/bracket problems, or the formula's subject letter (e.g. `I` in V=IR).
  function updateControlHint(){
    var p = document.getElementById('controlHint');
    if (!p) return;
    if (state.mode === 'mcOnly'){ p.innerHTML = 'Read the question and <strong>tap</strong> the answer you think is correct.'; return; }
    if (state.mode === 'directInput'){ p.innerHTML = 'Work out the value, <strong>type</strong> it, then press Submit.'; return; }
    if (state.mode === 'comingSoon'){ p.innerHTML = 'This planet is not charted yet — its puzzles are on the way.'; return; }
    if (state.mode === 'graph'){
      p.innerHTML = (state.problem && state.problem.graph && state.problem.graph.interactive === 'line')
        ? 'Tap <strong>two points</strong> on the grid that the line passes through.'
        : 'Tap the correct <strong>point</strong> on the grid.';
      return;
    }
    var subj = (state.mode === 'formula' && state.problem && state.problem.subject) ? state.problem.subject : 'x';
    p.innerHTML = 'Use the same operation on both sides. Keep the balance steady until <strong>' + subj + '</strong> stands alone.';
  }

  function renderEquation(){
    el.beamGroup.classList.remove('balanced');
    el.left.innerHTML = modeRegistry[state.mode].renderLeft();
    el.right.innerHTML = modeRegistry[state.mode].renderRight();
    fitFont(el.left);
    fitFont(el.right);
    [el.left, el.right].forEach(function(t){
      t.classList.remove('pop');
      void t.getBoundingClientRect();
      t.classList.add('pop');
    });
  }

  function updatePanelVisibility(){
    var controls = modeRegistry[state.mode].controls;
    var pending = controls === 'mcThenMorph';
    var isBalance = (controls === 'opInput' || controls === 'mcThenMorph');
    var isNew = (controls === 'mcOnly' || controls === 'directInput' || controls === 'comingSoon' || controls === 'graph');

    // Scale (balance) vs. a plain question prompt.
    // IMPORTANT: toggle style.display, NOT the `hidden` attribute — several of these
    // elements have a CSS `display` rule (grid/flex) that overrides `[hidden]`, which
    // caused the balance controls to leak onto Compute/Identify arenas (and vice-versa).
    var sh = function(elm, on){ if (elm) elm.style.display = on ? '' : 'none'; };
    sh(el.scaleWrap, !isNew);
    sh(el.questionPrompt, isNew);

    // Balance-only controls (scale equation solving).
    sh(el.moveLabel, isBalance);
    sh(el.opRow, isBalance);
    sh(el.applyForm, isBalance);

    // Expand panel is shared: bracket-morph (with the Expand button) OR mcOnly (choices only).
    // It holds #mcChoices and has `.expand-panel[hidden]{display:none}` — a rule that BEATS an
    // inline `style.display=''`. So toggle the `hidden` ATTRIBUTE + an explicit display, or the
    // Identify (mcOnly) choices stay invisible (0×0) even though #mcChoices itself is shown.
    var showExpand = pending || controls === 'mcOnly';
    el.expandPanel.hidden = !showExpand;
    el.expandPanel.style.display = showExpand ? 'block' : 'none';
    sh(el.directAnswerPanel, controls === 'directInput');
    // #mcChoices has a `.mc-choices[hidden]{display:none}` rule, so toggle the attribute
    // (not just style) — renderMcOnlyChoices re-shows it for the Identify style.
    el.mcChoices.hidden = true; el.mcChoices.style.display = 'none';

    if (pending){
      el.moveLabel.textContent = 'Choose: Expand the brackets OR divide both sides first';
      el.expandBtn.hidden = false;
      el.mcChoices.innerHTML = '';
    } else if (controls === 'opInput'){
      el.moveLabel.textContent = 'Pick a move, then apply it to both sides';
    }

    // New question styles: fill the prompt + choices/input.
    if (controls === 'mcOnly'){
      el.expandBtn.hidden = true;
      if (el.questionPrompt) el.questionPrompt.innerHTML = '<div class="qp-text">' + (state.problem.prompt || '') + '</div>';
      renderMcOnlyChoices();
    } else if (controls === 'directInput'){
      if (el.questionPrompt) el.questionPrompt.innerHTML = '<div class="qp-text">' + (state.problem.prompt || '') + '</div>';
      if (el.directInput) el.directInput.value = '';
    } else if (controls === 'comingSoon'){
      if (el.questionPrompt) el.questionPrompt.innerHTML =
        '<div class="qp-soon">🔒 Puzzles coming soon</div>' +
        '<div class="qp-text">' + (state.problem.prompt || '') + '</div>' +
        '<div class="qp-hint">This planet’s challenges are still being forged — explore its astronomy, or travel on.</div>';
    } else if (controls === 'graph'){
      if (el.questionPrompt) el.questionPrompt.innerHTML = '<div class="qp-text">' + (state.problem.prompt || '') + '</div>';
    }

    // Coordinate graph: static plot (alongside a Compute/Identify answer) OR the interactive input.
    if (typeof renderGraphPanel === 'function') renderGraphPanel();
  }

  // Build the four Identify (mcOnly) choice buttons and wire their taps.
  function renderMcOnlyChoices(){
    el.mcChoices.hidden = false;
    el.mcChoices.style.display = 'grid';
    el.mcChoices.innerHTML = state.problem.choices.map(function(c, i){
      return '<button type="button" class="mc-btn" data-idx="' + i + '">' + c + '</button>';
    }).join('');
    var btns = el.mcChoices.querySelectorAll('.mc-btn');
    for (var i = 0; i < btns.length; i++){
      (function(b){ b.addEventListener('click', function(){ answerMcOnly(parseInt(b.getAttribute('data-idx'), 10)); }); })(btns[i]);
    }
  }

  // Identify: a correct tap ends the arena; a wrong one costs a life.
  function answerMcOnly(idx){
    if (state.locked) return;
    if (idx === state.problem.correctIndex){
      state.movesTaken = 0; state.locked = true;
      handleSolved();
    } else {
      wobbleBeam(); showMsg('Not quite — try again!', true);
      if (typeof registerFail === 'function') registerFail();
    }
  }

  // Compute: type one integer and Submit.
  function answerDirectInput(){
    if (state.locked) return;
    var raw = (el.directInput && el.directInput.value || '').trim();
    var v = parseInt(raw, 10);
    if (!Number.isInteger(v)){ showMsg('Type a whole number.', true); return; }
    if (v === state.problem.answer){
      state.movesTaken = 0; state.locked = true;
      handleSolved();
    } else {
      wobbleBeam(); showMsg('Not quite — try again!', true);
      if (typeof registerFail === 'function') registerFail();
    }
  }

  function updateFormulaCaption(){
    if (state.mode === 'formula'){
      el.formulaCaption.hidden = false;
      el.formulaCaption.textContent = state.problem.label + ': ' + state.problem.original + ' \u2014 make ' + state.problem.subject + ' the subject.';
    } else {
      el.formulaCaption.hidden = true;
    }
  }

  function setControlsEnabled(enabled){
    el.numberInput.disabled = !enabled;
    el.applyBtn.disabled = !enabled;
    var opBtns = el.opRow.querySelectorAll('.op-btn');
    for (var i = 0; i < opBtns.length; i++) opBtns[i].disabled = !enabled;
    el.hintBtn.disabled = !enabled;
    if (el.revealBtn) el.revealBtn.disabled = !enabled;
    el.expandBtn.disabled = !enabled;
    var mcBtns = el.mcChoices.querySelectorAll('.mc-btn');
    for (var j = 0; j < mcBtns.length; j++) mcBtns[j].disabled = !enabled;
    if (el.directInput) el.directInput.disabled = !enabled;
    if (el.directSubmitBtn) el.directSubmitBtn.disabled = !enabled;
  }

  // ---------- Scene (reward animation) ----------

  function initDrawPaths(){
    document.querySelectorAll('.draw-path').forEach(function(p){
      var len = p.getTotalLength();
      p.dataset.len = len;
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
    });
  }

  function renderSceneForLevel(level, forceFraction){
    var idx = Math.min(level - 1, el.sceneGroups.length - 1);
    for (var g = 0; g < el.sceneGroups.length; g++){
      el.sceneGroups[g].style.display = (g === idx) ? '' : 'none';
    }
    var group = el.sceneGroups[idx];
    var f = (typeof forceFraction === 'number') ? forceFraction : ((state.streak % 4) / 4);
    var paths = group.querySelectorAll('.draw-path');
    var n = paths.length;
    paths.forEach(function(p, i){
      var segStart = i / n, segEnd = (i + 1) / n;
      var localF = (f - segStart) / (segEnd - segStart);
      if (localF < 0) localF = 0;
      if (localF > 1) localF = 1;
      var len = parseFloat(p.dataset.len || '0');
      p.style.strokeDashoffset = (len * (1 - localF)) + 'px';
    });
    var celebrate = group.querySelector('.scene-celebrate');
    if (celebrate){
      var done = f >= 1;
      celebrate.style.opacity = done ? 1 : 0;
      celebrate.style.transform = done ? 'scale(1)' : 'scale(0.4)';
      if (done) pop(celebrate);
    }
    var stageIdx = Math.max(0, Math.min(4, Math.round(f * 4)));
    el.sceneCaption.textContent = sceneCaptions[idx][stageIdx];
  }

  function renderScene(){
    renderSceneForLevel(state.level);
  }

  // ---------- Problem loading ----------

  function loadProblem(){
    var p = generateProblem(state.level);
    state.mode = p.mode;

    // Remember the last few arenas the player actually played — the Trading Room
    // draws its "Refresh Prices" review question from these.
    if (!state.recentLevels) state.recentLevels = [];
    var _rl = state.recentLevels.filter(function(n){ return n !== state.level; });
    _rl.push(state.level);
    while (_rl.length > 5) _rl.shift();
    state.recentLevels = _rl;

    if (p.mode === 'numeric'){
      state.problem = { x: p.x, par: p.par };
      state.eq = { coeff: p.coeff, denom: p.denom, add: p.add, result: p.result };
      state.bracketEq = null;
    } else if (p.mode === 'bracket'){
      state.problem = { x: p.x, par: p.par };
      state.bracketEq = { coeffA: p.coeffA, innerK: p.innerK, rhs: p.rhs };
      state.eq = null;
    } else if (p.mode === 'formula'){
      state.problem = { par: p.par, subject: p.subject, label: p.label, original: p.original };
      state.eq = { coeffToken: p.coeffToken, addToken: p.addToken, addSign: p.addSign, resultText: p.resultText };
      state.bracketEq = null;
    } else {
      // New question styles (mcOnly / directInput) and comingSoon — store the whole problem.
      state.problem = p;
      state.eq = null;
      state.bracketEq = null;
    }

    state.movesTaken = 0;
    state.locked = false;

    renderEquation();
    updatePanelVisibility();
    updateFormulaCaption();
    updateLevelProgress();
    renderScene();
    el.hintText.hidden = true;
    el.hintText.textContent = '';
    showMsg('', false);
    el.movesInfo.textContent = 'Moves: 0';
    el.numberInput.value = '';
    setControlsEnabled(true);
    // Hints are a beginner aid — offered only on the FIRST 2 questions of each room.
    el.hintBtn.style.display = (state.levelSolves < 2) ? '' : 'none';
    // (The arena "Back to Earth" button was removed — Earth is on the global header nav.)
    renderLives();
    if (state.mode === 'directInput'){ if (el.directInput) el.directInput.focus(); }
    else if (state.mode === 'numeric' || state.mode === 'formula'){ el.numberInput.focus(); }
    playMusic('practice');
    if (typeof updateAstroCard === 'function') updateAstroCard(); // room = a real Sol body (14-lore.js)
    updateControlHint();

    // Test account: the Boss Gate is ALWAYS open — the "⚔️ Boss Gate Open!" button stays
    // visible on every room so the tester can drop into the boss / shop / battle at will
    // (normally it only appears once the room's gate has been earned).
    if (state.gatePending || state.testMode) {
      if (el.gateEnterBtn) el.gateEnterBtn.style.display = 'inline-block';
    } else {
      if (el.gateEnterBtn) el.gateEnterBtn.style.display = 'none';
    }
  }

  function burst(perPanCount){
    if (reduceMotion) return;
    var points = [ { x: 30, y: 44 }, { x: 70, y: 44 } ];
    var colors = [
      getComputedStyle(document.documentElement).getPropertyValue('--yellow').trim(),
      getComputedStyle(document.documentElement).getPropertyValue('--sky').trim(),
      getComputedStyle(document.documentElement).getPropertyValue('--chalk').trim()
    ];
    points.forEach(function(p){
      for (var i = 0; i < perPanCount; i++){
        var dust = document.createElement('div');
        dust.className = 'dust';
        dust.style.left = p.x + '%';
        dust.style.top = p.y + '%';
        dust.style.background = colors[rand(0, 2)];
        var dx = rand(-40, 40);
        var dy = rand(-60, -10);
        dust.style.setProperty('--dx', dx + 'px');
        dust.style.setProperty('--dy', dy + 'px');
        el.particles.appendChild(dust);
        (function(node){ setTimeout(function(){ node.remove(); }, 950); })(dust);
      }
    });
  }

  function showToast(msg){
    el.toast.textContent = msg;
    el.toast.classList.add('show');
    setTimeout(function(){ el.toast.classList.remove('show'); }, 1800);
  }

  // ---------- Room lives: 5 wrong answers in one room = game over (the room restarts) ----------
  var MAX_ROOM_FAILS = 5;

  function renderLives(){
    var row = document.getElementById('livesRow');
    if (!row) return;
    var left = Math.max(0, MAX_ROOM_FAILS - (state.roomFails || 0));
    var s = '';
    for (var i = 0; i < MAX_ROOM_FAILS; i++) s += (i < left) ? '❤️' : '🖤';
    row.textContent = s;
    row.title = left + ' tr' + (left === 1 ? 'y' : 'ies') + ' left on this planet';
  }

  // Called on every genuinely WRONG answer (bad operation, wrong bracket expansion, wrong MC
  // choice) — input-format slips (letters in a number box) don't count.
  function registerFail(){
    state.roomFails = (state.roomFails || 0) + 1;
    renderLives();
    if (state.roomFails >= MAX_ROOM_FAILS) {
      setTimeout(showGameOver, 450);
    } else if (state.roomFails === MAX_ROOM_FAILS - 1) {
      showToast('⚠️ Careful — only 1 try left on this planet!');
    }
    saveGame();
  }

  function showGameOver(){
    var ov = document.getElementById('gameOverOverlay');
    if (ov) ov.hidden = false;
    if (typeof playSfx === 'function') playSfx('defeat');
    setControlsEnabled(false);
  }

  function restartAfterGameOver(){
    var ov = document.getElementById('gameOverOverlay');
    if (ov) ov.hidden = true;
    restartRoom(true);
  }

  // Restart the CURRENT planet from zero progress (also the "🔄 Restart Planet" button).
  function restartRoom(fromGameOver){
    state.levelSolves = 0;
    state.roomFails = 0;
    state.streak = 0;
    state.gatePending = false;
    el.levelGateActions.style.display = 'none';
    el.eqActions.style.display = 'flex';
    updateStats();
    updateLevelProgress(0);
    setControlsEnabled(true);
    loadProblem();
    showToast(fromGameOver ? 'Arena ' + state.level + ' restarts — you can do it! 💪' : '🔄 Arena ' + state.level + ' restarted.');
  }

  // 🌀 Worm-hole jump: swirling tunnel overlay; the room actually switches mid-swirl.
  function playWarpFx(midCb){
    if (typeof playSfx === 'function') playSfx('warp');
    if (reduceMotion) { midCb(); return; }
    var fx = document.createElement('div');
    fx.className = 'warp-fx';
    fx.innerHTML = '<div class="warp-tunnel"></div><div class="warp-tunnel warp-tunnel2"></div>' +
      '<div class="warp-label">🌀 Entering the worm hole…</div>';
    document.querySelector('.board').appendChild(fx);
    setTimeout(midCb, 650);
    setTimeout(function(){ fx.classList.add('warp-out'); }, 950);
    setTimeout(function(){ fx.remove(); }, 1450);
  }

  function showGateScreen() {
    showMsg('Planet Boss Gate is open! Challenge the boss, visit the shop, or keep training!', false);
    el.levelGateActions.style.display = 'flex';
    el.eqActions.style.display = 'none';
    el.moveLabel.style.display = 'none';
    el.opRow.style.display = 'none';
    el.applyForm.style.display = 'none';
    el.expandPanel.style.display = 'none';
    if (el.directAnswerPanel) el.directAnswerPanel.style.display = 'none';
    if (el.mcChoices) el.mcChoices.style.display = 'none';
    if (el.questionPrompt) el.questionPrompt.style.display = 'none';
  }

  function hideGateScreen() {
    el.levelGateActions.style.display = 'none';
    el.eqActions.style.display = 'flex';
    
    // User chose Keep Training — clear gatePending so it won't re-trigger
    state.gatePending = false;
    
    // Update individual panel visibility based on equation state
    updatePanelVisibility();
    
    // Show the glowing "Boss Gate Open!" button so user can re-enter any time
    if (el.gateEnterBtn) el.gateEnterBtn.style.display = 'inline-block';
  }

  function handleSolved(){
    var oldLevel = state.level;
    var rating = state.movesTaken <= state.problem.par
      ? 3
      : (state.movesTaken === state.problem.par + 1 ? 2 : 1);

    var coinsEarned = rating === 3 ? 15 : (rating === 2 ? 10 : 5);
    var xpEarned = rating === 3 ? 30 : (rating === 2 ? 20 : 10);
    state.coins += coinsEarned;
    state.score += 10 * rating;
    state.streak++;
    state.levelSolves++;
    state.solveClock = (state.solveClock || 0) + 1; // the Farm's growth clock (18-farm.js)
    
    // Gate logic moved to the end of handleSolved

    addHeroXp(xpEarned);
    updateStats();
    updateLevelProgress();
    renderSceneForLevel(oldLevel, Math.min(1, state.levelSolves / 6));

    el.beamGroup.classList.add('balanced');
    burst(8);

    var finalAnswer = modeRegistry[state.mode].describeAnswer();
    showMsg('Solved! +' + coinsEarned + ' 💵 Cash & +' + xpEarned + ' XP! ' + finalAnswer + '  ' + starString(rating), false);
    playSfx('solve-correct');

    setControlsEnabled(false);

    if (state.testMode && state.level < state.maxLevel) {
      // Secret test account: ONE question and the room is DONE — auto-advance to the next room.
      setTimeout(function() {
        advanceToNextLevel(true);
      }, reduceMotion ? 150 : 900);
    } else if (state.levelSolves >= 9 && state.level < state.maxLevel) {
      // Training mastery: solved 9 on this room, auto-advance
      setTimeout(function() {
        advanceToNextLevel(true);
      }, reduceMotion ? 150 : 1300);
    } else if (state.levelSolves === 6 && state.level < state.maxLevel) {
      // Exactly 6 solves — trigger the gate screen once
      state.gatePending = true;
      setTimeout(showGateScreen, reduceMotion ? 150 : 1300);
    } else {
      setTimeout(loadProblem, reduceMotion ? 150 : 1300);
    }
  }

