  // ============================================================================
  // Arena 888 "The Second Chance" — appears once the Giant Black Hole gauntlet (Arena 999) has
  // been LOST (state.comebackUnlocked, set in 06e-combat-outcome.js's handleBattleDefeat). It's a
  // pure 10-question multiple-choice quiz (COMEBACK_QUESTIONS, comeback.config.js) served through
  // the STANDARD practice pipeline via generateProblem's special==='comeback' branch (04-logic.js)
  // — no combat, no Boss Gate. Reaching ARENA_GOAL routes to handleComebackComplete() below
  // (hooked from handleSolved, 05-render.js) instead of the normal gate-opening.
  //
  // A PERFECT run (state.roomFails === 0 — the same "0 mistakes" bar the rest of the game already
  // uses for perfectArenas/the green star) grants COMEBACK_REWARD_LEVELS hero levels, but ONLY the
  // FIRST time ever (state.comebackCleared) — anti-farming, matching the Wonderland repeat-clear
  // convention (wondLevelReward halves repeat full-clears). The trial stays replayable for
  // practice afterward; it just never pays out the level reward twice.
  // ============================================================================

  function handleComebackComplete(){
    var perfect = (state.roomFails || 0) === 0;
    var alreadyClaimed = !!state.comebackCleared;
    if (el.levelGateActions) el.levelGateActions.style.display = 'none';
    if (el.eqActions) el.eqActions.style.display = 'flex';

    if (perfect && !alreadyClaimed) {
      state.comebackCleared = true;
      if (typeof grantHeroLevels === 'function') grantHeroLevels(typeof COMEBACK_REWARD_LEVELS === 'number' ? COMEBACK_REWARD_LEVELS : 10);
      showComebackResult('win');
    } else if (perfect && alreadyClaimed) {
      showComebackResult('repeat');
    } else {
      showComebackResult('miss');
    }

    // Reset so the trial is immediately replayable — it never re-locks like a normal arena's gate.
    state.levelSolves = 0;
    state.roomFails = 0;
    state._comebackOrder = null;
    if (typeof updateStats === 'function') updateStats();
    if (typeof updateLevelProgress === 'function') updateLevelProgress(0);
    if (typeof saveGame === 'function') saveGame();
  }

  // kind: 'win' (first-ever perfect clear — reward just granted), 'repeat' (perfect, but the
  // one-time reward was already claimed on an earlier run), 'miss' (at least one wrong answer
  // this run — no reward). Reuses the shared .gameover-overlay/.gameover-card modal shell (same
  // pattern as specialStoreMaybeAnnounce, 42-special-store.js) rather than a bespoke element.
  function showComebackResult(kind){
    var old = document.getElementById('comebackResultOverlay');
    if (old && old.parentNode) old.parentNode.removeChild(old);
    var rewardN = typeof COMEBACK_REWARD_LEVELS === 'number' ? COMEBACK_REWARD_LEVELS : 10;
    var emoji, title, text, sfx;
    if (kind === 'win') {
      emoji = '🌟🎉'; title = 'SECOND CHANCE CLEARED!';
      text = 'All 10 answered correctly! The universe grants you <b>+' + rewardN + ' hero levels</b> at once!';
      sfx = 'victory';
    } else if (kind === 'repeat') {
      emoji = '⭐'; title = 'Perfect again!';
      text = 'Flawless run! You already claimed the +' + rewardN + '-level reward once, though — it’s a one-time gift. Great practice all the same!';
      sfx = 'loot';
    } else {
      emoji = '💫'; title = 'So close!';
      text = 'A slip crept in this run — no reward this time. The Second Chance never closes, though: come back and try for a flawless 10 whenever you’re ready.';
      sfx = 'wrong';
    }
    var ov = document.createElement('div');
    ov.id = 'comebackResultOverlay';
    ov.className = 'gameover-overlay comeback-overlay';
    ov.innerHTML =
      '<div class="gameover-card comeback-card comeback-' + kind + '">' +
        '<div class="gameover-emoji comeback-emoji">' + emoji + '</div>' +
        '<h2 class="gameover-title comeback-title">' + title + '</h2>' +
        '<p class="gameover-text comeback-text">' + text + '</p>' +
        '<button class="btn btn-primary" type="button" onclick="closeComebackResult()">' + (kind === 'win' ? 'Incredible! 🎉' : 'OK') + '</button>' +
      '</div>';
    ov.addEventListener('click', function(e){ if (e.target === ov) closeComebackResult(); });
    document.body.appendChild(ov);
    if (typeof playSfx === 'function') playSfx(sfx);
    if (kind === 'win' && typeof burst === 'function') burst(30);
  }

  function closeComebackResult(){
    var o = document.getElementById('comebackResultOverlay');
    if (o && o.parentNode) o.parentNode.removeChild(o);
  }
