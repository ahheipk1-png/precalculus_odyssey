  // ============================================================================
  // Combat module 4/5: the live combat round — startCombat, HP/MP bars, floating
  // damage/notes, dodge/crit rolls, escape, executeCombatRound, spell casting.
  // Split 2026-07-18 from 06-rpg-battle.js — see 06-gear-shop.js for the split note.
  // ============================================================================

  function startCombat(monster, queue, locked) {
    // Wounds persist between battles — only the Hotel (or a full-heal item) restores HP/MP.
    // A knocked-out hero must rest before fighting again.
    if (state.playerHp <= 0) {
      if (typeof showToast === 'function') showToast('❤️ You are knocked out! Rest at the Hotel to recover before fighting.');
      return;
    }
    el.monsterSelectScreen.style.display = 'none';
    el.combatArenaScreen.style.display = 'grid';
    setNavLockForCombat(true);   // no bailing to Earth/Practice mid-fight — Escape is the only exit
    resetCombatPoses();

    // Enter combat at the hero's CURRENT (possibly wounded) HP/MP, not full.
    activeCombat = {
      monster: monster,
      playerHp: Math.max(1, Math.min(state.playerHp, state.playerMaxHp)),
      playerMaxHp: state.playerMaxHp,
      playerMp: Math.max(0, Math.min(state.playerMp, state.playerMaxMp)),
      playerMaxMp: state.playerMaxMp,
      monsterHp: monster.maxHp,
      monsterMp: monster.maxMp,
      queue: queue || [],
      gauntletLocked: !!locked
    };

    var weaponEmojis = {
      wood_sword: '🪵',
      bronze_dagger: '🗡️',
      iron_broadsword: '⚔️'
    };
    var shieldEmojis = {
      leather_buckler: '🛡️',
      wood_shield: '🟫',
      iron_shield: '🛡️',
      aegis_shield: '🔱',
      crystal_shield: '💎'
    };
    el.playerWeaponSprite.textContent = weaponEmojis[state.equippedWeapon] || '⚔️';
    el.playerShieldSprite.textContent = shieldEmojis[state.equippedShield] || '🛡️';

    el.monsterNameText.textContent = monster.name;
    el.monsterSprite.innerHTML = getMonsterArtMarkup(monster);
    // Wu Xing badges on the battle main page (hero weapon element vs monster element).
    var _mb = document.getElementById('monsterElementBadge');
    if (_mb) _mb.innerHTML = elementBadgeHtml(monster.element);
    var _pb = document.getElementById('playerElementBadge');
    if (_pb) _pb.innerHTML = elementBadgeHtml(getPlayerElement());
    el.playerApVal.textContent = getPlayerAp();
    el.playerDpVal.textContent = getPlayerDp();
    el.monsterApVal.textContent = monster.attack;
    el.monsterDpVal.textContent = monster.defense;
    
    updateCombatHpBars();

    el.combatLog.innerHTML = '';
    appendCombatLog(`A wild ${monster.name} blocks your way!`, 'system');
    appendCombatLog(`Equipped AP: ${getPlayerAp()} (Upgrade to hit harder!), DP: ${getPlayerDp()}`, 'system');
    // Tell the player how their weapon's element fares against this monster (五行).
    var _wxNote = (typeof elementMatchupNote === 'function') ? elementMatchupNote(getPlayerElement(), monster.element) : '';
    if (_wxNote) appendCombatLog('☯️ ' + _wxNote, 'system');
    if (activeCombat.gauntletLocked) appendCombatLog('⚠️ Gauntlet fight — no retreat until the whole chain is cleared!', 'system');

    // ⚗️ Laboratory: a prepared Acid Vial corrodes THIS monster for 3 rounds.
    if (state.poisonArmed) {
      activeCombat.poisonTurns = 3;
      state.poisonArmed = false;
      appendCombatLog(`⚗️ Your Acid Vial takes effect — ${monster.name} is corroding for 3 rounds!`, 'system');
      saveGame();
    }
    if (typeof playMusic === 'function') playMusic('battle');

    el.startCombatBtn.style.display = 'inline-block';
    el.startCombatBtn.disabled = false;
    if (el.openSpellsBtn) {
      el.openSpellsBtn.style.display = 'inline-block';
      el.openSpellsBtn.disabled = false;
    }
    if (el.openItemsBtn) {
      el.openItemsBtn.style.display = 'inline-block';
      el.openItemsBtn.disabled = false;
    }
    if (el.combatEscapeBtn) {
      // Escape is ALWAYS available now (user 2026-07-18) — but success is a speed-based gamble
      // (attemptEscape), so gauntlet fights are no longer a guaranteed no-retreat wall; a slow hero
      // can still fail and eat a free hit. The lock note below explains the odds during gauntlets.
      el.combatEscapeBtn.style.display = 'inline-block';
      el.combatEscapeBtn.disabled = false;
    }
    if (el.gauntletLockNote) {
      el.gauntletLockNote.hidden = !activeCombat.gauntletLocked;
      if (activeCombat.gauntletLocked) el.gauntletLockNote.textContent =
        '⚠️ Gauntlet chain — escaping mid-chain is a speed-based gamble; failing costs a free hit.';
    }
    if (el.spellsPanel) el.spellsPanel.style.display = 'none';
    if (el.combatItemsPanel) el.combatItemsPanel.style.display = 'none';
    el.postCombatBtn.style.display = 'none';
    el.battleFleeBtn.hidden = true;
    if (el.battleShopBtn) el.battleShopBtn.hidden = true;
  }

  function updateCombatHpBars() {
    if (!activeCombat) return;
    // Wounds persist: mirror live combat HP/MP into the saved player state so damage carries
    // over after the battle (restored only by the Hotel / a full-heal item / on death-revival).
    state.playerHp = Math.max(0, Math.round(activeCombat.playerHp));
    state.playerMp = Math.max(0, Math.round(activeCombat.playerMp));
    el.playerHpText.textContent = activeCombat.playerHp + '/' + activeCombat.playerMaxHp;
    var pHpPct = Math.max(0, (activeCombat.playerHp / activeCombat.playerMaxHp) * 100);
    el.playerHpBar.style.width = pHpPct + '%';

    if (el.playerMpText) el.playerMpText.textContent = activeCombat.playerMp + '/' + activeCombat.playerMaxMp;
    if (el.playerMpBar) {
      var pMpPct = Math.max(0, (activeCombat.playerMp / activeCombat.playerMaxMp) * 100);
      el.playerMpBar.style.width = pMpPct + '%';
    }

    el.monsterHpText.textContent = activeCombat.monsterHp + '/' + activeCombat.monster.maxHp;
    var mHpPct = Math.max(0, (activeCombat.monsterHp / activeCombat.monster.maxHp) * 100);
    el.monsterHpBar.style.width = mHpPct + '%';

    el.monsterMpText.textContent = activeCombat.monsterMp + '/' + activeCombat.monster.maxMp;
    var mMpPct = Math.max(0, (activeCombat.monsterMp / activeCombat.monster.maxMp) * 100);
    el.monsterMpBar.style.width = mMpPct + '%';
  }

  function appendCombatLog(msg, type) {
    var row = document.createElement('div');
    row.className = 'combat-log-row ' + (type || '');
    row.textContent = msg;
    el.combatLog.appendChild(row);
    el.combatLog.scrollTop = el.combatLog.scrollHeight;
  }

  function triggerFloatingDmg(target, dmgVal, isBlock) {
    var wrap = target === 'player' ? el.playerSprite.parentNode : el.monsterSprite.parentNode;
    var pop = document.createElement('div');
    pop.className = 'floating-dmg ' + (isBlock ? 'block' : (target === 'player' ? 'player' : 'monster'));
    pop.textContent = isBlock ? 'Blocked!' : ('-' + dmgVal);
    wrap.appendChild(pop);
    setTimeout(function(){
      pop.remove();
    }, 700);
  }

  // Floating text without the '-' damage prefix — used for MISS! / POWER HIT! callouts.
  function triggerFloatingNote(target, text, cls) {
    var wrap = target === 'player' ? el.playerSprite.parentNode : el.monsterSprite.parentNode;
    var pop = document.createElement('div');
    pop.className = 'floating-dmg ' + (cls || 'note');
    pop.textContent = text;
    wrap.appendChild(pop);
    setTimeout(function(){ pop.remove(); }, 800);
  }

  // Equipped weapon's authored crit stat = the player's POWER HIT chance (%). This activates a
  // previously-dead config stat (docs/balance-design.md).
  function getPlayerCrit(){
    var w = (state.weapons || []).filter(function(it){ return it.id === state.equippedWeapon; })[0];
    return (w && w.crit) ? w.crit : 5;
  }

  // Speed-based dodge: defender's speed advantage raises the chance, clamped so it never
  // dominates. Shoes (and monster speed) are now real combat stats.
  function rollDodge(defSpd, atkSpd){
    var chance = Math.min(BAL.DODGE_MAX, Math.max(BAL.DODGE_MIN,
      BAL.DODGE_BASE + (defSpd - atkSpd) * BAL.DODGE_PER_SPD));
    return Math.random() * 100 < chance;
  }

  // Escape is a speed-based gamble (user 2026-07-18: always show the button, but success scales
  // with the hero's speed vs the monster's). 55% base, ±3.5%/speed-point, clamped 20–90 so it's
  // never a sure thing either way.
  function escapeSuccessChance(){
    var pSpd = (typeof getPlayerSpeed === 'function') ? getPlayerSpeed() : 5;
    var mSpd = (activeCombat && activeCombat.monster && activeCombat.monster.speed) || 5;
    return Math.round(Math.min(90, Math.max(20, 55 + (pSpd - mSpd) * 3.5)));
  }
  // One free enemy swing (the cost of a failed escape) — same ratio-damage formula + player-dodge
  // roll as the normal enemy turn, just standalone.
  function monsterFreeHit(){
    if (!activeCombat) return;
    var m = activeCombat.monster;
    var mAp = m.attack * ((typeof monsterAttackFactor === 'function') ? monsterAttackFactor() : 1);
    var pDef = getPlayerDp();
    var mwx = (typeof elementMultiplier === 'function' && typeof getShieldElement === 'function') ? elementMultiplier(m.element, getShieldElement()) : 1;
    var pInc = (typeof playerIncomingFactor === 'function') ? playerIncomingFactor() : 1;
    var pSpd = (typeof getPlayerSpeed === 'function') ? getPlayerSpeed() : 5;
    if (rollDodge(pSpd, m.speed || 5)){
      triggerFloatingNote('player', 'MISS 💨');
      appendCombatLog('💨 …but you dodge ' + m.name + '\'s parting blow!', 'p-attack');
    } else {
      var dmg = Math.max(1, Math.round(BAL.ENEMY_COEFF * mAp * mAp / (mAp + pDef) * mwx * pInc));
      activeCombat.playerHp = Math.max(0, activeCombat.playerHp - dmg);
      triggerFloatingDmg('player', dmg, false);
      showImpactEffect('player', '💥');
      battleImpactAt(el.playerSprite);
      el.playerSprite.classList.add('hit-shake');
      setTimeout(function(){ el.playerSprite.classList.remove('hit-shake'); }, 400);
      appendCombatLog(m.name + ' catches you for ' + dmg + ' damage as you try to flee!', 'm-attack');
    }
    updateCombatHpBars();
    if (activeCombat.playerHp <= 0) handleBattleDefeat();
  }
  // Attempt to flee: roll the speed-based chance. Success → back to monster select. Failure → the
  // monster gets a free hit and you stay in the fight. Fleeing a gauntlet FORFEITS the whole chain —
  // its rewards/defeats were only banked (never committed), so re-entering restarts from monster 1.
  function attemptEscape(){
    if (!activeCombat) return;
    if (el.startCombatBtn && el.startCombatBtn.disabled) return;   // mid-round animation; ignore
    var chance = escapeSuccessChance();
    if (Math.random() * 100 < chance){
      appendCombatLog('💨 You slipped away! (escape chance ' + chance + '%)', 'system');
      if (activeCombat.gauntletLocked && (activeCombat.chainKills && activeCombat.chainKills.length)){
        appendCombatLog('⚠️ You fled the gauntlet — banked rewards forfeit; the chain restarts from the first foe.', 'system');
      }
      if (typeof showToast === 'function') showToast('Escaped from combat! 🏃');
      if (typeof playSfx === 'function') playSfx('click');
      activeCombat = null;
      el.combatArenaScreen.style.display = 'none';
      el.monsterSelectScreen.style.display = 'block';
      renderMonsterChoices();
      el.battleFleeBtn.hidden = false;
      if (el.battleShopBtn) el.battleShopBtn.hidden = false;
    } else {
      appendCombatLog('❌ Escape failed! (only ' + chance + '% — too slow) ' + activeCombat.monster.name + ' blocks your retreat!', 'm-attack');
      if (typeof showToast === 'function') showToast('❌ Escape failed — too slow!');
      monsterFreeHit();
    }
  }

  function showImpactEffect(target, emoji) {
    var cardId = target === 'player' ? 'playerCombatCard' : 'monsterCombatCard';
    var card = document.getElementById(cardId);
    if (!card) return;
    var eff = document.createElement('div');
    eff.className = 'combat-impact';
    eff.textContent = emoji;
    card.appendChild(eff);
    setTimeout(function(){ eff.remove(); }, 500);
  }

  function executeCombatRound() {
    if (!activeCombat) return;
    el.startCombatBtn.disabled = true;
    el.battleFleeBtn.hidden = true;

    el.playerSprite.classList.add('attack-right');
    el.playerSprite.classList.add('casting');
    launchBattleProjectile('arcane', el.playerSprite, el.monsterSprite);
    el.playerWeaponSprite.classList.add('swing');
    setTimeout(function(){ el.playerWeaponSprite.classList.remove('swing'); }, 350);
    
    setTimeout(function(){
      var pAp = getPlayerAp();
      var mDef = activeCombat.monster.defense;
      // Wu Xing: weapon element vs enemy element scales the hit.
      var wx = (typeof elementMultiplier === 'function') ? elementMultiplier(getPlayerElement(), activeCombat.monster.element) : 1;
      var pSpd = (typeof getPlayerSpeed === 'function') ? getPlayerSpeed() : 5;
      // Order: DODGE roll first (a dodge deals NOTHING — no floor-1), then POWER HIT roll, then
      // the smooth ratio formula AP²/(AP+DEF) — no subtraction walls (docs/balance-design.md).
      if (rollDodge(activeCombat.monster.speed || 5, pSpd)) {
        el.monsterSprite.classList.add('dodge-slide');
        setTimeout(function(){ el.monsterSprite.classList.remove('dodge-slide'); }, 450);
        triggerFloatingNote('monster', 'MISS 💨');
        appendCombatLog(`💨 ${activeCombat.monster.name} dodges your attack!`, 'system');
        if (typeof playSfx === 'function') playSfx('click');
      } else {
        var dmgToMonster = Math.max(1, Math.round(pAp * pAp / (pAp + mDef) * wx));
        var powerHit = Math.random() * 100 < getPlayerCrit();
        if (powerHit) dmgToMonster = Math.round(dmgToMonster * BAL.POWER_HIT_MULT);
        if (wx !== 1 && typeof elementMatchupNote === 'function') {
          var note = elementMatchupNote(getPlayerElement(), activeCombat.monster.element);
          if (note) appendCombatLog('🔥 ' + note, wx > 1 ? 'p-attack' : 'system');
        }

        activeCombat.monsterHp = Math.max(0, activeCombat.monsterHp - dmgToMonster);
        updateCombatHpBars();

        if (powerHit) triggerFloatingNote('monster', '💥 POWER HIT!', 'power');
        triggerFloatingDmg('monster', dmgToMonster, false);
        showImpactEffect('monster', powerHit ? '💥💥' : '💥');
        battleImpactAt(el.monsterSprite);

        el.monsterSprite.classList.add('hit-shake');
        setTimeout(function(){ el.monsterSprite.classList.remove('hit-shake'); }, 400);

        appendCombatLog(powerHit
          ? `💥 POWER HIT! You smash ${activeCombat.monster.name} for ${dmgToMonster} damage!`
          : `You hit ${activeCombat.monster.name} for ${dmgToMonster} damage!`, 'p-attack');
        if (typeof playSfx === 'function') playSfx('battle-hit');
      }

      setTimeout(function(){ el.playerSprite.classList.remove('attack-right','casting'); }, 360);
    }, 250);

    setTimeout(function(){
      if (activeCombat.monsterHp <= 0) {
        handleBattleVictory();
        return;
      }

      // Status effects (poison/burn tick, freeze/stun skip) — unified engine in 26-spells.js.
      var pre = (typeof applyMonsterStatusPreTurn === 'function') ? applyMonsterStatusPreTurn() : { disabled: false, note: '' };
      if (activeCombat.monsterHp <= 0) { handleBattleVictory(); return; }
      // Heal costs a FRACTION of the monster's own MP pool (≈2 heals per fight at any arena) and
      // restores 20% — the old flat-20-MP cost let late bosses chain-heal (docs/balance-design.md).
      var healCost = Math.max(20, Math.round(activeCombat.monster.maxMp * BAL.HEAL_COST_FRAC));
      var isHealTurn = !pre.disabled && (activeCombat.monsterHp <= activeCombat.monster.maxHp * 0.35) && (activeCombat.monsterMp >= healCost);

      if (pre.disabled) {
        appendCombatLog(pre.note, 'system');
      } else if (isHealTurn) {
        el.monsterSprite.classList.add('hit-shake');
        setTimeout(function(){ el.monsterSprite.classList.remove('hit-shake'); }, 400);

        setTimeout(function(){
          activeCombat.monsterMp = Math.max(0, activeCombat.monsterMp - healCost);
          var healVal = Math.round(activeCombat.monster.maxHp * BAL.HEAL_FRAC) || 10;
          activeCombat.monsterHp = Math.min(activeCombat.monster.maxHp, activeCombat.monsterHp + healVal);
          updateCombatHpBars();

          el.monsterSprite.classList.add('casting');
          setTimeout(function(){ el.monsterSprite.classList.remove('casting'); }, 600);
          showImpactEffect('monster', '💚');
          appendCombatLog(`${activeCombat.monster.name} casts HEAL magic! Recovers +${healVal} HP!`, 'system');
        }, 250);
      } else {
        el.monsterSprite.classList.add('attack-left');
        el.monsterSprite.classList.add('casting');
        launchBattleProjectile('ice', el.monsterSprite, el.playerSprite);

        setTimeout(function(){
          var mAp = activeCombat.monster.attack * ((typeof monsterAttackFactor === 'function') ? monsterAttackFactor() : 1);
          var pDef = getPlayerDp();
          var mwx = (typeof elementMultiplier === 'function' && typeof getShieldElement === 'function') ? elementMultiplier(activeCombat.monster.element, getShieldElement()) : 1;
          var pInc = (typeof playerIncomingFactor === 'function') ? playerIncomingFactor() : 1;
          var pSpdD = (typeof getPlayerSpeed === 'function') ? getPlayerSpeed() : 5;
          // Player dodge roll first (shoes/speed finally matter!), then monster power-hit, then
          // ratio damage with the 0.75 enemy coefficient (docs/balance-design.md).
          if (rollDodge(pSpdD, activeCombat.monster.speed || 5)) {
            el.playerSprite.classList.add('dodge-slide');
            setTimeout(function(){ el.playerSprite.classList.remove('dodge-slide'); }, 450);
            triggerFloatingNote('player', 'MISS 💨');
            appendCombatLog(`💨 You dodge ${activeCombat.monster.name}'s attack!`, 'p-attack');
            if (typeof playSfx === 'function') playSfx('click');
          } else {
            var dmgToPlayer = Math.max(1, Math.round(BAL.ENEMY_COEFF * mAp * mAp / (mAp + pDef) * mwx * pInc));
            var mPower = Math.random() * 100 < (BAL.MONSTER_CRIT_BASE + 2 * activeCombat.monster.rank);
            if (mPower) dmgToPlayer = Math.round(dmgToPlayer * BAL.POWER_HIT_MULT);

            activeCombat.playerHp = Math.max(0, activeCombat.playerHp - dmgToPlayer);
            updateCombatHpBars();

            if (mPower) triggerFloatingNote('player', '💥 POWER HIT!', 'power');
            triggerFloatingDmg('player', dmgToPlayer, false);

            if (pDef > 0) {
              el.playerShieldSprite.classList.add('defend');
              setTimeout(function(){ el.playerShieldSprite.classList.remove('defend'); }, 400);
              showImpactEffect('player', '🛡️');
            } else {
              showImpactEffect('player', activeCombat.monster.rank >= 5 ? '❄️' : '💥');
            }

            battleImpactAt(el.playerSprite);
            el.playerSprite.classList.add('hit-shake');
            setTimeout(function(){ el.playerSprite.classList.remove('hit-shake'); }, 400);

            appendCombatLog(mPower
              ? `💥 POWER HIT! ${activeCombat.monster.name} smashes you for ${dmgToPlayer} damage!`
              : `${activeCombat.monster.name} attacks you for ${dmgToPlayer} damage!`, 'm-attack');
          }

          el.monsterSprite.classList.remove('attack-left','casting');
        }, 250);
      }

      setTimeout(function(){
        if (typeof tickPlayerStatuses === 'function') tickPlayerStatuses();
        if (activeCombat.playerHp <= 0) {
          handleBattleDefeat();
        } else {
          el.startCombatBtn.disabled = false;
          if (el.openSpellsBtn) el.openSpellsBtn.disabled = false;
          el.battleFleeBtn.hidden = true;
        }
      }, 600);

    }, 700);
  }

  function castPlayerSpell(spellName, mpCost, healVal) {
    if (!activeCombat) return;
    if (activeCombat.playerMp < mpCost) {
      showToast('Not enough MP!');
      return;
    }

    el.startCombatBtn.disabled = true;
    if (el.openSpellsBtn) el.openSpellsBtn.disabled = true;
    if (el.spellsPanel) el.spellsPanel.style.display = 'none';

    activeCombat.playerMp = Math.max(0, activeCombat.playerMp - mpCost);
    // Spell reliability (docs/balance-design.md): 70% full / 20% weak (half) / 10% fizzle (MP
    // spent, no effect) — spells are powerful but not a guaranteed button.
    var spellRoll = Math.random();
    el.playerSprite.classList.add('casting');
    setTimeout(function(){ el.playerSprite.classList.remove('casting'); }, 600);
    if (spellRoll >= BAL.SPELL_FULL + BAL.SPELL_WEAK) {
      triggerFloatingNote('player', 'FIZZLE 💨');
      showImpactEffect('player', '💨');
      appendCombatLog(`💨 ${spellName} fizzles out! The MP is spent but nothing happens…`, 'system');
    } else {
      var spellEff = (spellRoll >= BAL.SPELL_FULL) ? 0.5 : 1;
      var actualHeal = Math.max(1, Math.round(healVal * spellEff));
      activeCombat.playerHp = Math.min(activeCombat.playerMaxHp, activeCombat.playerHp + actualHeal);
      showImpactEffect('player', '💚');
      appendCombatLog(spellEff < 1
        ? `✨ ${spellName} fizzles — it only partly works! Recovered +${actualHeal} HP.`
        : `You cast ${spellName}! Recovered +${actualHeal} HP!`, 'system');
    }
    updateCombatHpBars();

    setTimeout(function() {
      if (activeCombat.monsterHp <= 0) {
        handleBattleVictory();
        return;
      }

      var counterHealCost = Math.max(20, Math.round(activeCombat.monster.maxMp * BAL.HEAL_COST_FRAC));
      var isHealTurn = (activeCombat.monsterHp <= activeCombat.monster.maxHp * 0.35) && (activeCombat.monsterMp >= counterHealCost);

      if (isHealTurn) {
        el.monsterSprite.classList.add('hit-shake');
        setTimeout(function(){ el.monsterSprite.classList.remove('hit-shake'); }, 400);

        setTimeout(function(){
          activeCombat.monsterMp = Math.max(0, activeCombat.monsterMp - counterHealCost);
          var monsterHealVal = Math.round(activeCombat.monster.maxHp * BAL.HEAL_FRAC) || 10;
          activeCombat.monsterHp = Math.min(activeCombat.monster.maxHp, activeCombat.monsterHp + monsterHealVal);
          updateCombatHpBars();

          el.monsterSprite.classList.add('casting');
          setTimeout(function(){ el.monsterSprite.classList.remove('casting'); }, 600);
          showImpactEffect('monster', '💚');
          appendCombatLog(`${activeCombat.monster.name} casts HEAL magic! Recovers +${monsterHealVal} HP!`, 'system');
        }, 250);
      } else {
        el.monsterSprite.classList.add('attack-left');
        el.monsterSprite.classList.add('casting');
        launchBattleProjectile('ice', el.monsterSprite, el.playerSprite);

        setTimeout(function(){
          var mAp = activeCombat.monster.attack * ((typeof monsterAttackFactor === 'function') ? monsterAttackFactor() : 1);
          var pDef = getPlayerDp();
          var mwx = (typeof elementMultiplier === 'function' && typeof getShieldElement === 'function') ? elementMultiplier(activeCombat.monster.element, getShieldElement()) : 1;
          var pInc = (typeof playerIncomingFactor === 'function') ? playerIncomingFactor() : 1;
          var pSpdD = (typeof getPlayerSpeed === 'function') ? getPlayerSpeed() : 5;
          // Player dodge roll first (shoes/speed finally matter!), then monster power-hit, then
          // ratio damage with the 0.75 enemy coefficient (docs/balance-design.md).
          if (rollDodge(pSpdD, activeCombat.monster.speed || 5)) {
            el.playerSprite.classList.add('dodge-slide');
            setTimeout(function(){ el.playerSprite.classList.remove('dodge-slide'); }, 450);
            triggerFloatingNote('player', 'MISS 💨');
            appendCombatLog(`💨 You dodge ${activeCombat.monster.name}'s attack!`, 'p-attack');
            if (typeof playSfx === 'function') playSfx('click');
          } else {
            var dmgToPlayer = Math.max(1, Math.round(BAL.ENEMY_COEFF * mAp * mAp / (mAp + pDef) * mwx * pInc));
            var mPower = Math.random() * 100 < (BAL.MONSTER_CRIT_BASE + 2 * activeCombat.monster.rank);
            if (mPower) dmgToPlayer = Math.round(dmgToPlayer * BAL.POWER_HIT_MULT);

            activeCombat.playerHp = Math.max(0, activeCombat.playerHp - dmgToPlayer);
            updateCombatHpBars();

            if (mPower) triggerFloatingNote('player', '💥 POWER HIT!', 'power');
            triggerFloatingDmg('player', dmgToPlayer, false);

            if (pDef > 0) {
              el.playerShieldSprite.classList.add('defend');
              setTimeout(function(){ el.playerShieldSprite.classList.remove('defend'); }, 400);
              showImpactEffect('player', '🛡️');
            } else {
              showImpactEffect('player', activeCombat.monster.rank >= 5 ? '❄️' : '💥');
            }

            battleImpactAt(el.playerSprite);
            el.playerSprite.classList.add('hit-shake');
            setTimeout(function(){ el.playerSprite.classList.remove('hit-shake'); }, 400);

            appendCombatLog(mPower
              ? `💥 POWER HIT! ${activeCombat.monster.name} smashes you for ${dmgToPlayer} damage!`
              : `${activeCombat.monster.name} attacks you for ${dmgToPlayer} damage!`, 'm-attack');
          }

          el.monsterSprite.classList.remove('attack-left','casting');
        }, 250);
      }

      setTimeout(function(){
        if (typeof tickPlayerStatuses === 'function') tickPlayerStatuses();
        if (activeCombat.playerHp <= 0) {
          handleBattleDefeat();
        } else {
          el.startCombatBtn.disabled = false;
          if (el.openSpellsBtn) el.openSpellsBtn.disabled = false;
          el.battleFleeBtn.hidden = true;
        }
      }, 600);

    }, 700);
  }

  function openSpellsMenu() {
    if (!el.spellsPanel) return;
    if (el.spellsPanel.style.display === 'flex') {
      el.spellsPanel.style.display = 'none';
      return;
    }
    
    el.spellsPanel.innerHTML = '';
    el.spellsPanel.style.display = 'flex';
    
    var spells = [
      { name: 'Heal', level: 1, mpCost: 15, healVal: 30, color: '#4caf50' },
      { name: 'Greater Heal', level: 3, mpCost: 30, healVal: 80, color: '#2196f3' },
      { name: 'Elixir of Life', level: 6, mpCost: 50, healVal: 200, color: '#e91e63' }
    ];
    
    spells.forEach(function(s) {
      if (state.heroLvl >= s.level) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'shop-btn';
        btn.style.background = s.color + '22';
        btn.style.borderColor = s.color;
        btn.style.color = s.color;
        btn.style.fontSize = '12px';
        btn.style.padding = '4px 8px';
        btn.style.minHeight = '30px';
        btn.innerHTML = `${s.name}<br><small style="font-size:9px;">HP +${s.healVal} (Cost: ${s.mpCost} MP)</small>`;
        btn.addEventListener('click', function() {
          castPlayerSpell(s.name, s.mpCost, s.healVal);
        });
        el.spellsPanel.appendChild(btn);
      }
    });
    
    var closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'shop-btn';
    closeBtn.style.background = 'rgba(255,255,255,0.08)';
    closeBtn.style.borderColor = 'rgba(255,255,255,0.2)';
    closeBtn.style.color = '#ccc';
    closeBtn.style.fontSize = '12px';
    closeBtn.style.padding = '4px 8px';
    closeBtn.style.minHeight = '30px';
    closeBtn.textContent = '❌ Close';
    closeBtn.addEventListener('click', function() {
      el.spellsPanel.style.display = 'none';
    });
    el.spellsPanel.appendChild(closeBtn);
  }

  // Combine two {chips:{...}, gold, silver} loot objects (gauntlet chest accumulation). Either
  // side may be null/undefined (the first kill in a chain has nothing to merge into yet).
  function _mergeLoot(a, b) {
    var out = { chips: {}, gold: 0, silver: 0 };
    [a, b].forEach(function(l){
      if (!l) return;
      out.gold += l.gold || 0;
      out.silver += l.silver || 0;
      for (var k in (l.chips || {})) out.chips[k] = (out.chips[k] || 0) + l.chips[k];
    });
    return out;
  }

