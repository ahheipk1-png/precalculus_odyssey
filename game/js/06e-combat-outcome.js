  // ============================================================================
  // Combat module 5/5: victory/defeat outcomes — handleBattleVictory, death
  // penalty, handleBattleDefeat, gauntlet continuation, post-combat redirect,
  // advanceToNextLevel, galaxyUnlocked, handleKeepFighting.
  // Split 2026-07-18 from 06-rpg-battle.js — see 06-gear-shop.js for the split note.
  // ============================================================================

  function handleBattleVictory() {
    el.playerSprite.classList.add('victory');
    el.monsterSprite.classList.add('defeated');
    appendCombatLog(`Victory! You defeated ${activeCombat.monster.name}!`, 'system');
    var monster = activeCombat.monster;
    var reward = monster.reward;
    // Loot: "part of the body and any precious thing" → real materials into the pouch (R1).
    var loot = rollMonsterLoot(monster);
    // XP scales with arena + rank (BAL.killXp) — the old flat 100 made hero level grow like
    // √kills and soft-locked the requiredHeroLvl gate around arena 40 (docs/balance-design.md).
    var victoryXp = monster.xp || 100;
    var isGauntlet = !!activeCombat.gauntletLocked;
    var moreToCome = isGauntlet && activeCombat.queue && activeCombat.queue.length > 0;

    burst(10);
    if (typeof playSfx === 'function') playSfx('victory');

    if (moreToCome) {
      // ATOMIC gauntlet: BANK this kill's rewards + a pending defeat, but commit NOTHING to state
      // yet. Escaping or dying before the final link forfeits the whole chain — nothing was
      // persisted, so re-entering starts over from the FIRST monster (user 2026-07-18). This also
      // blocks a "kill one → escape → repeat" reward farm, since rewards only land on completion.
      activeCombat.chainCash = (activeCombat.chainCash || 0) + reward;
      activeCombat.chainXp   = (activeCombat.chainXp || 0) + victoryXp;
      activeCombat.chainLoot = _mergeLoot(activeCombat.chainLoot, loot);
      activeCombat.chainKills = (activeCombat.chainKills || []).concat([monster]);
      appendCombatLog('Defeated ' + monster.name + '! (rewards bank until the whole chain is cleared)', 'system');
      if (typeof showToast === 'function') showToast('⚔️ ' + monster.name + ' down — on to the next!');
      el.startCombatBtn.style.display = 'none';
      if (el.openSpellsBtn) el.openSpellsBtn.style.display = 'none';
      if (el.openItemsBtn) el.openItemsBtn.style.display = 'none';
      if (el.combatEscapeBtn) el.combatEscapeBtn.style.display = 'none';
      if (el.spellsPanel) el.spellsPanel.style.display = 'none';
      if (el.combatItemsPanel) el.combatItemsPanel.style.display = 'none';
      el.battleFleeBtn.hidden = true;
      var nextFoe = activeCombat.queue[0];
      el.postCombatBtn.style.display = 'inline-block';
      el.postCombatBtn.textContent = '⚔️ Next: ' + nextFoe.name + ' →';
      if (el.keepFightingBtn) el.keepFightingBtn.style.display = 'none';
      return;
    }

    // Solo fight OR the FINAL link of a gauntlet → COMMIT everything at once (this kill + any
    // banked from earlier links).
    var kills = isGauntlet ? (activeCombat.chainKills || []).concat([monster]) : [monster];
    var totalCash = (isGauntlet ? (activeCombat.chainCash || 0) : 0) + reward;
    var totalXp   = (isGauntlet ? (activeCombat.chainXp || 0) : 0) + victoryXp;
    var totalLoot = isGauntlet ? _mergeLoot(activeCombat.chainLoot, loot) : loot;

    state.coins += totalCash;
    addMaterials(totalLoot);

    kills.forEach(function(m){
      state.defeatedMonsters[monsterKey(m)] = true;
      // Bosses (rank 3) leave a keepsake trophy + recover a story memory fragment (14-lore.js).
      if (m.rank >= 3) {
        var rewardTrophy = '👑 ' + m.name + '\'s Ancient Soul';
        state.trophies.push(rewardTrophy);
        appendCombatLog('Obtained Trophy: ' + rewardTrophy + '!', 'system');
        if (typeof unlockMemoryFragment === 'function') {
          var frag = unlockMemoryFragment(m.room);
          if (frag) {
            appendCombatLog('📖 Memory recovered — ' + frag.title + '. Read it in your Star Log.', 'system');
            showToast('📖 Memory fragment recovered! Open the Star Log.');
          }
        }
      }
    });

    addHeroXp(totalXp);
    updateStats();
    appendCombatLog('Gained ' + totalCash + ' 💵 Cash & +' + totalXp + ' XP!', 'system');
    appendCombatLog('Looted: ' + lootSummary(totalLoot), 'system');

    if (typeof showVictoryChest === 'function') {
      showVictoryChest(totalLoot, totalCash);
    } else {
      showToast('💰 +' + totalCash + ' Cash · Looted ' + lootSummary(totalLoot));
    }

    el.startCombatBtn.style.display = 'none';
    if (el.openSpellsBtn) el.openSpellsBtn.style.display = 'none';
    if (el.openItemsBtn) el.openItemsBtn.style.display = 'none';
    if (el.combatEscapeBtn) el.combatEscapeBtn.style.display = 'none';
    if (el.spellsPanel) el.spellsPanel.style.display = 'none';
    if (el.combatItemsPanel) el.combatItemsPanel.style.display = 'none';
    el.battleFleeBtn.hidden = true;

    // Giant Black Hole cleared — the true end of the Odyssey. No arena to advance to; the button
    // just returns to the (now-CLEARED) gauntlet screen, and nav is restored so you can travel out.
    if (isBlackHoleArena(state.level)) {
      appendCombatLog('🏆 THE SINGULARITY IS CONQUERED. You have beaten the whole galaxy.', 'system');
      if (typeof showToast === 'function') showToast('🏆 Galaxy Center conquered — you are a Precalculus Master!');
      el.postCombatBtn.style.display = 'inline-block';
      el.postCombatBtn.textContent = '🏆 Victory — Return';
      if (el.keepFightingBtn) el.keepFightingBtn.style.display = 'none';
      return;
    }

    // Show Advance button if we can advance (level is clear)
    var boss = getRoomBoss(state.level);
    var isLevelClear = boss && state.defeatedMonsters[monsterKey(boss)];
    if (isLevelClear && state.level < state.maxLevel) {
      el.postCombatBtn.style.display = 'inline-block';
      el.postCombatBtn.textContent = '🚀 Advance to Arena ' + (state.level + 1) + '!';
    } else if (isLevelClear && state.level >= state.maxLevel) {
      el.postCombatBtn.style.display = 'inline-block';
      el.postCombatBtn.textContent = 'Return to Quest';
    } else {
      el.postCombatBtn.style.display = 'inline-block';
      el.postCombatBtn.textContent = '⚔️ Continue Quest (Defeat Boss)';
    }

    // Show "Keep Fighting" button only if the level is clear
    if (isLevelClear && state.level < state.maxLevel) {
      if (el.keepFightingBtn) el.keepFightingBtn.style.display = 'inline-block';
    } else {
      if (el.keepFightingBtn) el.keepFightingBtn.style.display = 'none';
    }
  }

  // The Cash revival fee charged on death. Scales with progress so it stays meaningful.
  // (Tunable — bump the coefficients to make dying harsher / gentler.)
  function deathFee() { return 80 + (state.level || 1) * 40; }

  function _chipCashValue(k) {
    return (typeof CHIPS !== 'undefined' && CHIPS[k] && CHIPS[k].value) || 1;
  }

  // Charge the death fee: pay from Cash first, then liquidate Gold, Silver and Quantum Chips at
  // the current market spot to cover any shortfall. If total net worth can't cover the fee, the
  // player loses EVERYTHING (Cash, Gold, Silver and all chips → 0). Returns {fee, bankrupt}.
  function applyDeathPenalty() {
    var fee = deathFee();
    var cur = state.currencies || (state.currencies = { gold: 0, silver: 0 });
    if (!state.chips) state.chips = {};
    var spotG = (typeof currencySpot === 'function') ? currencySpot('gold') : 90;
    var spotS = (typeof currencySpot === 'function') ? currencySpot('silver') : 45;
    var k;

    var chipsWorth = 0;
    for (k in state.chips) chipsWorth += _chipCashValue(k) * (state.chips[k] || 0);
    var worth = state.coins
      + Math.round((cur.gold || 0) * spotG)
      + Math.round((cur.silver || 0) * spotS)
      + chipsWorth;

    if (worth < fee) {
      state.coins = 0; cur.gold = 0; cur.silver = 0;
      for (k in state.chips) state.chips[k] = 0;
      return { fee: fee, bankrupt: true };
    }

    var owed = fee;
    var payCash = Math.min(state.coins, owed);
    state.coins -= payCash; owed -= payCash;

    // Liquidate Gold then Silver (whole units at spot; overpay returns as Cash change).
    [['gold', spotG], ['silver', spotS]].forEach(function (pair) {
      if (owed <= 0) return;
      var field = pair[0], spot = Math.max(1, pair[1]), have = cur[field] || 0;
      var sell = Math.min(have, Math.ceil(owed / spot));
      cur[field] = have - sell;
      var raised = Math.round(sell * spot);
      if (raised >= owed) { state.coins += (raised - owed); owed = 0; } else { owed -= raised; }
    });

    // Last resort: liquidate chips, cheapest tier first (preserve the rare ones).
    if (owed > 0) {
      var order = (typeof CHIP_ORDER !== 'undefined') ? CHIP_ORDER.slice() : Object.keys(state.chips);
      order.sort(function (a, b) { return _chipCashValue(a) - _chipCashValue(b); });
      order.forEach(function (ck) {
        if (owed <= 0) return;
        var v = Math.max(1, _chipCashValue(ck)), have = state.chips[ck] || 0;
        var sell = Math.min(have, Math.ceil(owed / v));
        state.chips[ck] = have - sell;
        var raised = sell * v;
        if (raised >= owed) { state.coins += (raised - owed); owed = 0; } else { owed -= raised; }
      });
    }
    return { fee: fee, bankrupt: false };
  }

  function handleBattleDefeat() {
    if (typeof playSfx === 'function') playSfx('defeat');
    el.playerSprite.classList.add('defeated');
    el.monsterSprite.classList.add('victory');
    appendCombatLog(`Defeated! You were knocked out by ${activeCombat.monster.name}.`, 'system');

    // 💸 Death penalty — a revival fee, paid in Cash then liquidated Gold/Silver/Quantum Chips at
    // spot; if your whole net worth can't cover it, you lose everything. Then you're revived.
    var pen = applyDeathPenalty();
    if (pen.bankrupt) {
      appendCombatLog(`💀 Revival fee was 💵${pen.fee} — you couldn't pay it. Cash, Gold, Silver & Quantum Chips ALL lost!`, 'system');
      if (typeof showToast === 'function') showToast('💀 Wiped out! The 💵' + pen.fee + ' revival fee cost you everything.');
    } else {
      appendCombatLog(`💸 Paid a revival fee of 💵${pen.fee} (Cash first, then Gold/Silver/Quantum Chips at spot).`, 'system');
      if (typeof showToast === 'function') showToast('💸 Revival fee: 💵' + pen.fee + ' charged.');
    }

    // Revive to full so the hero can carry on (the fee was the real cost of dying).
    state.playerHp = state.playerMaxHp;
    state.playerMp = state.playerMaxMp;
    appendCombatLog(`⛑️ Medics revived you — HP & MP restored. Train or shop, then try again!`, 'system');
    if (typeof updateStats === 'function') updateStats();
    if (typeof saveGame === 'function') saveGame();

    el.startCombatBtn.style.display = 'none';
    if (el.openSpellsBtn) el.openSpellsBtn.style.display = 'none';
    if (el.openItemsBtn) el.openItemsBtn.style.display = 'none';
    if (el.combatEscapeBtn) el.combatEscapeBtn.style.display = 'none';
    if (el.spellsPanel) el.spellsPanel.style.display = 'none';
    if (el.combatItemsPanel) el.combatItemsPanel.style.display = 'none';
    el.postCombatBtn.style.display = 'inline-block';
    el.postCombatBtn.textContent = 'Return to Shop & Quest';
    if (el.keepFightingBtn) el.keepFightingBtn.style.display = 'none';
    el.battleFleeBtn.hidden = true;
  }

  // Mid-gauntlet: carry the survivor straight into the next queued foe (no monster-select, no
  // Flee/Shop/Escape exposure in between — that's what makes the chain "no chance to go to Hotel").
  function continueGauntlet() {
    if (!activeCombat || !activeCombat.queue || !activeCombat.queue.length) return;
    var q = activeCombat.queue;
    // startCombat below builds a FRESH activeCombat object — carry the running chain totals
    // forward so the final chest (handleBattleVictory) can sum every kill in the run, not just
    // the last one.
    var chainCash = activeCombat.chainCash || 0;
    var chainXp = activeCombat.chainXp || 0;
    var chainLoot = activeCombat.chainLoot || null;
    var chainKills = activeCombat.chainKills || [];
    startCombat(q[0], q.slice(1), true);
    activeCombat.chainCash = chainCash;
    activeCombat.chainXp = chainXp;
    activeCombat.chainLoot = chainLoot;
    activeCombat.chainKills = chainKills;
  }

  function handlePostCombatRedirect() {
    if (activeCombat && activeCombat.queue && activeCombat.queue.length > 0) {
      continueGauntlet();
      return;
    }
    var isVictory = el.playerSprite.classList.contains('victory');
    if (isVictory) {
      var boss = getRoomBoss(state.level);
      var isLevelClear = boss && state.defeatedMonsters[monsterKey(boss)];
      if (isLevelClear) {
        advanceToNextLevel();
      } else {
        // Return to monster selection screen
        el.combatArenaScreen.style.display = 'none';
        el.monsterSelectScreen.style.display = 'block';
        renderMonsterChoices();
        activeCombat = null;
        el.battleFleeBtn.hidden = false;
        if (el.battleShopBtn) el.battleShopBtn.hidden = false;
      }
    } else {
      // Returned to the arena after a LOSS — treat as leaving the boss undefeated.
      returnToArenaFromBoss();
    }
  }

  // Return to the arena from the Boss Room. If the arena's boss has NOT been beaten, revoke the
  // temporary Boss Gate access: reset the question counter so the player must earn ARENA_GOAL
  // correct answers again before the gate reopens (section 9 — leave undefeated → gate closes).
  function returnToArenaFromBoss() {
    setNavLockForCombat(false);
    el.battleView.classList.remove('active');
    el.shopView.classList.remove('active');
    el.equationView.classList.add('active');
    activeCombat = null;
    var beaten = !!(state.bossDefeated && state.bossDefeated[state.level]);
    if (!beaten) {
      state.gatePending = false;
      state.bossGateUnlocked = false;
      state.bossRoomEntered = false;
      state.levelSolves = 0;
      if (typeof setGateButton === 'function') setGateButton(false);
      if (typeof showToast === 'function') {
        showToast('🚪 You left the boss undefeated — the Boss Gate closed. Answer ' + ARENA_GOAL + ' questions again to reopen it.');
      }
      if (typeof saveGame === 'function') saveGame();
    }
    el.levelGateActions.style.display = 'none';
    el.eqActions.style.display = 'flex';
    if (typeof updateStats === 'function') updateStats();
    if (typeof updateLevelProgress === 'function') updateLevelProgress();
    if (typeof updatePanelVisibility === 'function') updatePanelVisibility();
    if (typeof setControlsEnabled === 'function') setControlsEnabled(true);
    loadProblem();
  }

  function advanceToNextLevel(byTraining) {
    // A whole planet is cleared here — play the longer completion celebration (distinct from the
    // short per-battle victory fanfare in handleBattleVictory).
    if (typeof playSfx === 'function') playSfx('planet-complete');
    // 🎟️ Wonderland passes are earned for the room being COMPLETED (must run before level++).
    // First-ever clear: 5 passes; replays only pay for PERFECT rooms (0 wrong answers), on the
    // diminishing schedule in awardWonderPasses (09-items.js).
    if (typeof awardWonderPasses === 'function') {
      var passesEarned = awardWonderPasses(state.level, (state.roomFails || 0) === 0);
      if (passesEarned > 0) {
        (function(n){
          setTimeout(function(){
            showToast('🎟️ +' + n + ' Wonderland Pass' + (n > 1 ? 'es' : '') + '! Spend them at the Wonderland.');
            if (typeof playSfx === 'function') playSfx('loot');
          }, 1900);
        })(passesEarned);
      }
    }
    // Perfect clear = beat this arena with ZERO wrong answers this visit → a green star on its
    // atlas card. All 65 stars reveal the hidden Galaxy Center (see galaxyUnlocked / 25-nav.js).
    if (!state.perfectArenas) state.perfectArenas = {};
    if ((state.roomFails || 0) === 0) state.perfectArenas[state.level] = true;

    state.roomFails = 0;
    var _paBefore = state.level;
    if (state.level < state.maxLevel) {
      state.level++;
      if (byTraining) {
        showToast('Arena ' + state.level + ' mastered through training! 🎓🎉');
      } else {
        showToast('Arena ' + state.level + ' unlocked! 🎉');
      }
    }
    // Permanently record that this arena's boss was beaten (clears the gate for good here) and
    // clear the per-visit boss-room flags.
    if (!state.bossDefeated) state.bossDefeated = {};
    state.bossDefeated[_paBefore] = true;
    state.bossGateUnlocked = false;
    state.bossRoomEntered = false;
    state.gatePending = false;
    state.levelSolves = 0;
    updateStats();
    updateLevelProgress(0);

    setNavLockForCombat(false);
    el.battleView.classList.remove('active');
    el.equationView.classList.add('active');
    el.levelGateActions.style.display = 'none';
    el.eqActions.style.display = 'flex';
    activeCombat = null;
    loadProblem();
    if (state.level !== _paBefore && typeof showPlanetArrival === 'function') showPlanetArrival(state.level);
  }

  // All 65 real arenas cleared with a perfect (0-fail) run → unlock the hidden Galaxy Center.
  // Admin/test mode always sees it. CURRICULUM_MAX is 65 (the linear cap); arena 66 (Giant Black
  // Hole) lives OUTSIDE that count so normal advancement never flows into it.
  function galaxyUnlocked(){
    if (state.testMode) return true;
    if (!state.perfectArenas) return false;
    var max = (typeof CURRICULUM_MAX === 'number') ? CURRICULUM_MAX : 65;
    for (var i = 1; i <= max; i++){ if (!state.perfectArenas[i]) return false; }
    return true;
  }

  function handleKeepFighting() {
    el.combatArenaScreen.style.display = 'none';
    el.monsterSelectScreen.style.display = 'block';
    renderMonsterChoices();
    activeCombat = null;
    el.battleFleeBtn.hidden = false;
    if (el.battleShopBtn) el.battleShopBtn.hidden = false;
    
    el.postCombatBtn.style.display = 'none';
    if (el.keepFightingBtn) el.keepFightingBtn.style.display = 'none';
  }

