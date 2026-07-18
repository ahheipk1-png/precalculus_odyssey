  // ---------- Event handlers ----------

  el.opRow.addEventListener('click', function(ev){
    var btn = ev.target.closest('.op-btn');
    if (!btn) return;
    state.currentOp = btn.getAttribute('data-op');
    var all = el.opRow.querySelectorAll('.op-btn');
    for (var i = 0; i < all.length; i++){
      all[i].classList.remove('active');
      all[i].setAttribute('aria-pressed', 'false');
    }
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    el.numberInput.focus();
  });

  function getIntermediateHTML(eqBefore, op, n){
    var opSym = op === '*' ? '&times;' : (op === '/' ? '/' : op);

    if (state.mode === 'formula'){
      var subject = state.problem.subject;
      if (eqBefore.addToken && op === (eqBefore.addSign === 1 ? '-' : '+') && n === eqBefore.addToken){
        var vPart = (eqBefore.coeffToken || '') + subject;
        var originalSign = eqBefore.addSign === 1 ? '+' : '&minus;';
        var appliedSign = op === '+' ? '+' : '&minus;';
        return {
          left: `<span class="term">${vPart}</span><span class="term canceling-left"> &nbsp;${originalSign}&nbsp; ${eqBefore.addToken}</span><span class="term canceling-right"> &nbsp;${appliedSign}&nbsp; ${n}</span>`,
          right: `${exprToHTML(eqBefore.resultText)}<span class="term merging"> &nbsp;${appliedSign}&nbsp; ${n}</span>`
        };
      }
      if (!eqBefore.addToken && eqBefore.coeffToken && op === '/' && n === eqBefore.coeffToken){
        return {
          left: `<span class="term canceling-left">${eqBefore.coeffToken}</span><span class="term font-x">${subject}</span><span class="term canceling-right"> / ${n}</span>`,
          right: `${exprToHTML(eqBefore.resultText)}<span class="term merging"> / ${n}</span>`
        };
      }
      var leftStr = formatFormulaSideHTML(eqBefore, subject);
      if (op === '*' || op === '/'){
        leftStr = `<span class="term">(</span>${leftStr}<span class="term">)</span>`;
      }
      return {
        left: `${leftStr}<span class="term merging"> &nbsp;${opSym}&nbsp; ${n}</span>`,
        right: `${exprToHTML(eqBefore.resultText)}<span class="term merging"> &nbsp;${opSym}&nbsp; ${n}</span>`
      };
    } else {
      if (eqBefore.add !== 0 && ((op === '+' && eqBefore.add === -n) || (op === '-' && eqBefore.add === n))){
        var vPart = formatSideHTML({ coeff: eqBefore.coeff, denom: eqBefore.denom, add: 0 });
        var originalSign = eqBefore.add > 0 ? '+' : '&minus;';
        var appliedSign = op === '+' ? '+' : '&minus;';
        return {
          left: `${vPart}<span class="term canceling-left"> &nbsp;${originalSign}&nbsp; ${Math.abs(eqBefore.add)}</span><span class="term canceling-right"> &nbsp;${appliedSign}&nbsp; ${n}</span>`,
          right: `<span class="term">${fmt(eqBefore.result)}</span><span class="term merging"> &nbsp;${appliedSign}&nbsp; ${n}</span>`
        };
      }
      if (eqBefore.denom > 1 && op === '*' && n === eqBefore.denom){
        var vPart = eqBefore.coeff === 1 ? '<span class="term font-x">x</span>' : `<span class="term">${eqBefore.coeff}</span><span class="term font-x">x</span>`;
        var addPart = '';
        if (eqBefore.add > 0) addPart = `<span class="term"> &nbsp;+&nbsp; ${eqBefore.add}</span>`;
        else if (eqBefore.add < 0) addPart = `<span class="term"> &nbsp;&minus;&nbsp; ${Math.abs(eqBefore.add)}</span>`;
        return {
          left: `<span class="fraction-container"><span class="numerator">${vPart}</span><span class="denominator"><span class="term canceling-left">${eqBefore.denom}</span></span></span><span class="term canceling-right"> &nbsp;&times;&nbsp; ${n}</span>${addPart}`,
          right: `<span class="term">${fmt(eqBefore.result)}</span><span class="term merging"> &nbsp;&times;&nbsp; ${n}</span>`
        };
      }
      if (eqBefore.coeff > 1 && op === '/' && n === eqBefore.coeff){
        var vPart = `<span class="term font-x">x</span>`;
        var numHTML = `<span class="term canceling-left">${eqBefore.coeff}</span>${vPart}`;
        var addPart = '';
        if (eqBefore.add > 0) addPart = `<span class="term"> &nbsp;+&nbsp; ${eqBefore.add}</span>`;
        else if (eqBefore.add < 0) addPart = `<span class="term"> &nbsp;&minus;&nbsp; ${Math.abs(eqBefore.add)}</span>`;

        var main = eqBefore.denom > 1
          ? `<span class="fraction-container"><span class="numerator">${numHTML}</span><span class="denominator">${eqBefore.denom}</span></span>`
          : `${numHTML}`;

        return {
          left: `${main}<span class="term canceling-right"> / ${n}</span>${addPart}`,
          right: `<span class="term">${fmt(eqBefore.result)}</span><span class="term merging"> / ${n}</span>`
        };
      }
      var leftStr = formatSideHTML(eqBefore);
      if (op === '*' || op === '/'){
        leftStr = `<span class="term">(</span>${leftStr}<span class="term">)</span>`;
      }
      return {
        left: `${leftStr}<span class="term merging"> &nbsp;${opSym}&nbsp; ${n}</span>`,
        right: `<span class="term">${fmt(eqBefore.result)}</span><span class="term merging"> &nbsp;${opSym}&nbsp; ${n}</span>`
      };
    }
  }

  // Compute (directInput) style: type an integer + Submit.
  if (el.directAnswerPanel){
    el.directAnswerPanel.addEventListener('submit', function(ev){
      ev.preventDefault();
      if (typeof answerDirectInput === 'function') answerDirectInput();
    });
  }

  el.applyForm.addEventListener('submit', function(ev){
    ev.preventDefault();
    if (state.locked) return;

    var raw = el.numberInput.value.trim();

    if (state.mode === 'bracket') {
      if (state.currentOp !== '/' || parseInt(raw, 10) !== state.bracketEq.coeffA) {
        showMsg('To solve this, you can expand the brackets or divide both sides by ' + state.bracketEq.coeffA + '.', true);
        el.numberInput.classList.remove('shake');
        void el.numberInput.getBoundingClientRect();
        el.numberInput.classList.add('shake');
        wobbleBeam();
        registerFail();
        return;
      }
      
      state.locked = true;
      setControlsEnabled(false);
      
      var a = state.bracketEq.coeffA;
      var innerText = 'x ' + (state.bracketEq.innerK >= 0 ? ('+ ' + state.bracketEq.innerK) : ('− ' + Math.abs(state.bracketEq.innerK)));
      el.left.innerHTML = `<span class="term canceling-left">${a}(${innerText})</span><span class="term canceling-right"> / ${a}</span>`;
      el.right.innerHTML = `<span class="term">${state.bracketEq.rhs}</span><span class="term merging"> / ${a}</span>`;
      
      setTimeout(function(){
        var cl = el.left.querySelector('.canceling-left');
        var cr = el.left.querySelector('.canceling-right');
        if (cl) cl.classList.add('canceling');
        if (cr) cr.classList.add('canceling');
      }, 50);

      setTimeout(function(){
        state.mode = 'numeric';
        state.eq = {
          coeff: 1,
          denom: 1,
          add: state.bracketEq.innerK,
          result: state.bracketEq.rhs / state.bracketEq.coeffA
        };
        state.movesTaken++;
        el.movesInfo.textContent = 'Moves: ' + state.movesTaken;
        el.numberInput.value = '';
        renderEquation();
        updatePanelVisibility();
        state.locked = false;
        setControlsEnabled(true);
        showMsg('Divided both sides! Now solve for x.', false);
        el.numberInput.focus();
      }, 700);
      return;
    }
    var res;

    if (state.mode === 'numeric'){
      if (!/^[1-9][0-9]*$/.test(raw)){
        showMsg('Enter a positive whole number.', true);
        el.numberInput.classList.remove('shake');
        void el.numberInput.getBoundingClientRect();
        el.numberInput.classList.add('shake');
        wobbleBeam();
        return;
      }
      res = applyOp(state.eq, state.currentOp, parseInt(raw, 10));
    } else {
      if (!/^[a-zA-Z]$/.test(raw)){
        showMsg('Enter a single letter, like ' + (state.eq.addToken || state.eq.coeffToken) + '.', true);
        el.numberInput.classList.remove('shake');
        void el.numberInput.getBoundingClientRect();
        el.numberInput.classList.add('shake');
        wobbleBeam();
        return;
      }
      // Canonicalize the typed letter to the equation's own token, case-insensitively (typing
      // "r" for Ohm's-law R must work) — then the cancel animation & rendering show the exact
      // token. applyFormulaOp is itself case-insensitive too (see sameToken in 04-logic.js).
      [state.eq.addToken, state.eq.coeffToken].forEach(function(tok){
        if (tok && tok.toLowerCase() === raw.toLowerCase()) raw = tok;
      });
      res = applyFormulaOp(state.eq, state.currentOp, raw);
    }

    if (!res.ok){
      showMsg(res.message, true);
      el.numberInput.classList.remove('shake');
      void el.numberInput.getBoundingClientRect();
      el.numberInput.classList.add('shake');
      wobbleBeam();
      registerFail();
      return;
    }

    var eqBefore = state.eq;
    var op = state.currentOp;
    var val = state.mode === 'numeric' ? parseInt(raw, 10) : raw; // formula: already canonicalized above

    state.locked = true;
    setControlsEnabled(false);

    var inter = getIntermediateHTML(eqBefore, op, val);
    el.left.innerHTML = inter.left;
    el.right.innerHTML = inter.right;

    fitFont(el.left);
    fitFont(el.right);

    setTimeout(function(){
      el.left.querySelectorAll('.canceling-left, .canceling-right').forEach(function(node){
        node.classList.add('canceling');
      });
    }, 50);

    setTimeout(function(){
      state.eq = res.next;
      state.movesTaken++;
      el.movesInfo.textContent = 'Moves: ' + state.movesTaken;
      el.numberInput.value = '';
      renderEquation();

      var solved = state.mode === 'numeric'
        ? (res.next.coeff === 1 && res.next.denom === 1 && res.next.add === 0)
        : (!res.next.coeffToken && !res.next.addToken);

      state.locked = false;
      setControlsEnabled(true);

      if (solved){
        handleSolved();
      } else {
        showMsg('Nice \u2014 keep going!', false);
        if (state.hintLevel > 0) renderHintPanel();   // Equation Battle hint updates as the eq morphs
        el.numberInput.focus();
      }
    }, 700);
  });

  el.expandBtn.addEventListener('click', function(){
    var a = state.bracketEq.coeffA, k = state.bracketEq.innerK;
    var correctAdd = a * k;
    var correct = formatSide(a, correctAdd);
    var d1 = formatSide(a, k);
    var d2 = formatSide(a, -correctAdd);
    var d3 = formatSide(1, correctAdd);
    var opts = [correct, d1, d2, d3].filter(function(v, i, arr){ return arr.indexOf(v) === i; });
    var delta = 1;
    while (opts.length < 4){
      var filler = formatSide(a, correctAdd + delta);
      if (opts.indexOf(filler) === -1) opts.push(filler);
      delta = delta > 0 ? -delta : (-delta + 1);
    }
    shuffle(opts);
    state.bracketCorrect = correct;

    el.mcChoices.innerHTML = '';
    opts.forEach(function(text){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'mc-btn';
      b.textContent = text;
      el.mcChoices.appendChild(b);
    });
    el.expandBtn.hidden = true;
    // #mcChoices has a `.mc-choices[hidden]{display:none}` CSS rule, but updateProblemDisplay
    // also sets an inline style.display='none' when hiding it (05-render.js) — clearing just the
    // `hidden` attribute leaves that inline style in charge, so the buttons exist in the DOM but
    // never become visible. Must reset both, same as renderMcOnlyChoices() does.
    el.mcChoices.hidden = false;
    el.mcChoices.style.display = 'grid';
  });

  el.mcChoices.addEventListener('click', function(ev){
    var btn = ev.target.closest('.mc-btn');
    if (!btn || state.locked) return;
    // This handler is ONLY for the bracket-morph "choose the expansion" step. On Identify (mcOnly)
    // arenas the per-button answerMcOnly handler owns the click — bail here, or we'd show the wrong
    // message and double-count the fail (state.bracketCorrect is stale outside bracket mode).
    if (state.mode !== 'bracket') return;

    if (btn.textContent === state.bracketCorrect){
      state.mode = 'numeric';
      state.eq = {
        coeff: state.bracketEq.coeffA,
        denom: 1,
        add: state.bracketEq.coeffA * state.bracketEq.innerK,
        result: state.bracketEq.rhs
      };
      state.movesTaken++;
      el.movesInfo.textContent = 'Moves: ' + state.movesTaken;
      renderEquation();
      updatePanelVisibility();
      showMsg('Expanded! Now solve for x.', false);
      el.numberInput.focus();
    } else {
      btn.classList.remove('wrong');
      void btn.getBoundingClientRect();
      btn.classList.add('wrong');
      wobbleBeam();
      showMsg('Not quite \u2014 make sure both terms inside get multiplied.', true);
      registerFail();
    }
  });

  // Hint button: opens the progressive ladder at level 1 (or re-opens where it was).
  el.hintBtn.addEventListener('click', function(){
    if (!state.hintLevel || state.hintLevel < 1) state.hintLevel = 1;
    renderHintPanel();
  });
  if (el.hintNextBtn) el.hintNextBtn.addEventListener('click', function(){
    var ladder = (typeof getHintLadder === 'function') ? getHintLadder() : [];
    if (state.hintLevel < ladder.length) { state.hintLevel++; renderHintPanel(); }
  });
  if (el.hintPrevBtn) el.hintPrevBtn.addEventListener('click', function(){
    if (state.hintLevel > 1) { state.hintLevel--; renderHintPanel(); }
  });
  if (el.hintCloseBtn) el.hintCloseBtn.addEventListener('click', function(){ hideHintPanel(); });

  if (el.revealBtn) el.revealBtn.addEventListener('click', function(){
    if (state.locked) return;
    state.locked = true;

    if (state.mode === 'bracket'){
      state.mode = 'numeric';
      state.eq = {
        coeff: state.bracketEq.coeffA,
        denom: 1,
        add: state.bracketEq.coeffA * state.bracketEq.innerK,
        result: state.bracketEq.rhs
      };
      updatePanelVisibility();
    }

    if (state.mode === 'numeric'){
      state.eq = { coeff: 1, denom: 1, add: 0, result: state.problem.x };
      renderEquation();
      el.beamGroup.classList.add('balanced');
      showMsg('x = ' + fmt(state.problem.x) + ' \u2014 now you know! On to the next one.', false);
    } else {
      var final = solveFully(state.eq);
      state.eq = { coeffToken: null, addToken: null, addSign: 1, resultText: final };
      renderEquation();
      el.beamGroup.classList.add('balanced');
      showMsg(state.problem.subject + ' = ' + exprToText(final) + ' \u2014 now you know! On to the next one.', false);
    }

    state.streak = 0;
    state.levelSolves = 0;
    updateStats();
    updateLevelProgress();
    renderScene();
    setControlsEnabled(false);
    setTimeout(loadProblem, reduceMotion ? 150 : 1600);
  });

  if (el.resetBtn) el.resetBtn.addEventListener('click', function(){
    if (!state.resetPending){
      state.resetPending = true;
      el.resetBtn.textContent = 'Sure?';
      setTimeout(function(){
        state.resetPending = false;
        el.resetBtn.textContent = '\u21BA Reset';
      }, 3000);
      return;
    }
    state.resetPending = false;
    el.resetBtn.textContent = '↺ Reset';
    resetPlayerState();
    updateStats();
    loadProblem();
  });

  el.gateBattleBtn.addEventListener('click', openBattle);
  if (el.gateBackBtn) {
    el.gateBackBtn.addEventListener('click', function(){
      // Same behavior as "Train More (Equations)" button
      state.gatePending = false;
      el.levelGateActions.style.display = 'none';
      el.eqActions.style.display = 'flex';
      updatePanelVisibility();
      
      // Show glowing Boss Gate button so user can re-enter any time
      if (typeof setGateButton === 'function') setGateButton(true);
      
      setControlsEnabled(true);
      loadProblem();
    });
  }
  if (el.gateEnterBtn) {
    el.gateEnterBtn.addEventListener('click', showGateScreen);
  }
  el.shopBackBtn.addEventListener('click', closeShop);
  el.battleFleeBtn.addEventListener('click', function(){
    // Leaving the Boss Room. returnToArenaFromBoss closes the gate (redo ARENA_GOAL) unless the
    // arena's boss has already been beaten.
    if (typeof returnToArenaFromBoss === 'function') {
      returnToArenaFromBoss();
    } else {
      el.battleView.classList.remove('active');
      el.equationView.classList.add('active');
      el.levelGateActions.style.display = 'none';
      el.eqActions.style.display = 'flex';
      updatePanelVisibility();
      setControlsEnabled(true);
      loadProblem();
    }
  });
  if (el.battleShopBtn) {
    el.battleShopBtn.addEventListener('click', openShop);
  }
  el.startCombatBtn.addEventListener('click', executeCombatRound);
  if (el.openSpellsBtn) {
    el.openSpellsBtn.addEventListener('click', openSpellsMenu);
  }
  if (el.combatEscapeBtn) {
    // Escape is a speed-based gamble now (attemptEscape in 06-rpg-battle.js) — always available,
    // even mid-gauntlet, but a failed roll costs a free enemy hit.
    el.combatEscapeBtn.addEventListener('click', function() {
      if (typeof attemptEscape === 'function') attemptEscape();
    });
  }
  el.postCombatBtn.addEventListener('click', handlePostCombatRedirect);
  if (el.keepFightingBtn) {
    el.keepFightingBtn.addEventListener('click', handleKeepFighting);
  }
  if (el.arenaAdvanceBtn) {
    el.arenaAdvanceBtn.addEventListener('click', advanceToNextLevel);
  }

  // Worm Hole + 4-letter code system removed — the Star Atlas already lets players travel to any
  // planet directly, so the code jump was redundant. (arenaByCode/levelCodes remain in config,
  // now unused by the UI.)

  // ---------- Start screen: New Player (named) / Continue as a saved profile ----------
  function startGame(){
    gameStarted = true;
    // Test account (name is "admin", case-insensitive) → test mode. Derived from the
    // active profile name, so it works for both New Player and Continue without a save-schema
    // change, and turns off automatically for any normal player.
    state.testMode = TEST_NAMES.indexOf((activeProfileName || '').trim().toUpperCase()) !== -1;
    updatePlayerNameTag();
    updateStats();
    initDrawPaths();
    loadProblem();
    if (state.testMode) {
      showToast('🔓 TEST MODE — 1 question per planet, unlimited Cash & materials');
    }
  }

  // Wire chapter generators here (main.js) — the generator functions live in logic.js, which
  // loads before main.js, so they're defined by now. data.js declared them as null to avoid a
  // load-order dependency between the data module and the logic module.
  chapters[0].generator = generateBalanceQuestProblem;

  initMuteBtn();
  initLore();
  migrateLegacySave();
  renderSavedPlayersList();
  updateNewPlayerAvailability();

  if (el.newPlayerBtn) el.newPlayerBtn.addEventListener('click', function(){
    var name = (el.newPlayerNameInput ? el.newPlayerNameInput.value : '').trim();
    if (!name) {
      if (el.newPlayerError) {
        el.newPlayerError.hidden = false;
        el.newPlayerError.textContent = 'Please enter a name.';
      }
      return;
    }
    if (loadAllProfiles().length >= MAX_PROFILES) {
      updateNewPlayerAvailability();
      return;
    }
    resetPlayerState();
    activeProfileId = makeProfileId();
    activeProfileName = name;
    if (el.startScreen) el.startScreen.hidden = true;
    startGame();
    // New players see the opening story crawl (skippable). Returning players
    // (Continue) skip it — they can replay it any time from the Star Log.
    if (typeof showOpeningNarration === 'function' && !state.testMode) showOpeningNarration();
  });

  if (el.newPlayerNameInput) el.newPlayerNameInput.addEventListener('keydown', function(ev){
    if (ev.key === 'Enter') {
      ev.preventDefault();
      if (el.newPlayerBtn) el.newPlayerBtn.click();
    }
  });

  // Safety-net autosaves: the primary save happens inside updateStats(), but
  // beforeunload/visibilitychange catch a browser/tab close mid-action, and the
  // interval catches anything (rare) that mutates state without calling updateStats().
  window.addEventListener('beforeunload', function(){ saveGame(); });
  window.addEventListener('visibilitychange', function(){
    if (document.visibilityState === 'hidden') saveGame();
  });
  setInterval(saveGame, 20000);
