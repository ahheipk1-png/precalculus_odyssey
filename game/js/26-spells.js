  // ============================================================================
  // Spell system — reads config/spells.config.js (SPELLS). Real turn-based status
  // effects (freeze/poison/burn/armorbreak/weaken/blind/stun/shield/haste). Works
  // alongside 06-rpg-battle.js's combat (activeCombat is the shared global).
  //  - castSpell(spellId): player casts → damage/status/heal → monster counter-turn.
  //  - applyMonsterStatusPreTurn(): 06's basic strike calls this so statuses set by
  //    spells still matter on a plain attack turn. Returns { disabled, note }.
  //  - openSpellsMenu (overrides 06's): renders castable spells from config.
  // Status bags: activeCombat.mStatus / .pStatus = { effect: turnsRemaining }.
  // ============================================================================

  function spellById(id){ for (var i = 0; i < SPELLS.length; i++) if (SPELLS[i].id === id) return SPELLS[i]; return null; }

  function ensureStatusBags(){
    if (!activeCombat) return;
    if (!activeCombat.mStatus) activeCombat.mStatus = {};
    if (!activeCombat.pStatus) activeCombat.pStatus = {};
    // legacy poison flag → unified poison status
    if (activeCombat.poisonTurns > 0 && !activeCombat.mStatus.poison) { activeCombat.mStatus.poison = activeCombat.poisonTurns; activeCombat.poisonTurns = 0; }
  }

  // Effective monster defense after armor-break, and player incoming-damage factor after shield.
  function monsterEffDefense(){ var d = activeCombat.monster.defense; if (activeCombat.mStatus && activeCombat.mStatus.armorbreak > 0) d = Math.round(d * 0.5); return d; }
  function playerIncomingFactor(){ return (activeCombat.pStatus && activeCombat.pStatus.shield > 0) ? 0.5 : 1; }
  function monsterAttackFactor(){ return (activeCombat.mStatus && activeCombat.mStatus.weaken > 0) ? 0.6 : 1; }

  // Called by 06's executeCombatRound at the START of the monster's turn. Ticks
  // damage-over-time on the monster, and reports if the monster is disabled this turn.
  function applyMonsterStatusPreTurn(){
    ensureStatusBags();
    var ms = activeCombat.mStatus, out = { disabled: false, note: '' };
    // Damage over time
    ['poison', 'burn'].forEach(function(fx){
      if (ms[fx] > 0){
        var dmg = Math.max(2, Math.round(activeCombat.monster.maxHp * (fx === 'burn' ? 0.05 : 0.06)));
        activeCombat.monsterHp = Math.max(0, activeCombat.monsterHp - dmg);
        appendCombatLog((fx === 'burn' ? '🔥 Burn' : '⚗️ Corrosion') + ' deals ' + dmg + ' damage!', 'p-attack');
        showImpactEffect('monster', fx === 'burn' ? '🔥' : '⚗️');
        ms[fx]--;
      }
    });
    updateCombatHpBars();
    // Control effects skip the monster's action
    if (ms.freeze > 0){ ms.freeze--; out.disabled = true; out.note = '❄️ ' + activeCombat.monster.name + ' is frozen and cannot move!'; }
    else if (ms.stun > 0){ ms.stun--; out.disabled = true; out.note = '💫 ' + activeCombat.monster.name + ' is stunned!'; }
    // Tick down the debuffs that only modify numbers
    ['armorbreak', 'weaken', 'blind'].forEach(function(k){ if (ms[k] > 0) ms[k]--; });
    return out;
  }
  // Player self-buffs tick at the end of a full round.
  function tickPlayerStatuses(){
    ensureStatusBags();
    ['shield', 'haste'].forEach(function(k){ if (activeCombat.pStatus[k] > 0) activeCombat.pStatus[k]--; });
  }

  function applyMonsterStatus(fx, dur){
    if (!fx) return;
    ensureStatusBags();
    activeCombat.mStatus[fx] = Math.max(activeCombat.mStatus[fx] || 0, dur || 2);
  }
  function applyPlayerStatus(fx, dur){
    if (!fx) return;
    ensureStatusBags();
    activeCombat.pStatus[fx] = Math.max(activeCombat.pStatus[fx] || 0, dur || 3);
  }

  // ---- The caster ----
  function castSpell(spellId){
    if (!activeCombat) return;
    var sp = spellById(spellId);
    if (!sp) return;
    if (activeCombat.playerMp < sp.manaCost){ showToast('Not enough MP for ' + sp.name + '!'); return; }
    ensureStatusBags();
    activeCombat.playerMp -= sp.manaCost;
    if (el.spellsPanel) el.spellsPanel.style.display = 'none';
    el.startCombatBtn.disabled = true; if (el.openSpellsBtn) el.openSpellsBtn.disabled = true;

    el.playerSprite.classList.add('casting');
    setTimeout(function(){ el.playerSprite.classList.remove('casting'); }, 500);

    if (sp.targetType === 'self'){
      if (sp.statusEffect === 'heal'){
        var heal = sp.power;
        activeCombat.playerHp = Math.min(activeCombat.playerMaxHp, activeCombat.playerHp + heal);
        showImpactEffect('player', '💚'); appendCombatLog('You cast ' + sp.icon + ' ' + sp.name + ' — +' + heal + ' HP!', 'system');
      } else {
        applyPlayerStatus(sp.statusEffect, sp.duration || 3);
        showImpactEffect('player', sp.icon); appendCombatLog('You cast ' + sp.icon + ' ' + sp.name + '! ' + sp.desc, 'system');
      }
    } else {
      // enemy-target: damage (element-scaled) + status
      launchBattleProjectile('arcane', el.playerSprite, el.monsterSprite);
      var dmg = 0;
      if (sp.power > 0){
        var wx = (typeof elementMultiplier === 'function') ? elementMultiplier(sp.element, activeCombat.monster.element) : 1;
        dmg = Math.max(1, Math.round((sp.power + Math.round(getPlayerAp() * 0.3) - monsterEffDefense() * 0.3) * wx));
        activeCombat.monsterHp = Math.max(0, activeCombat.monsterHp - dmg);
        triggerFloatingDmg('monster', dmg, false); showImpactEffect('monster', sp.icon);
        appendCombatLog('You cast ' + sp.icon + ' ' + sp.name + ' for ' + dmg + ' damage!', 'p-attack');
        if (wx !== 1 && typeof elementMatchupNote === 'function'){ var n = elementMatchupNote(sp.element, activeCombat.monster.element); if (n) appendCombatLog('  ' + n, wx > 1 ? 'p-attack' : 'system'); }
      } else {
        appendCombatLog('You cast ' + sp.icon + ' ' + sp.name + '!', 'system');
      }
      if (sp.statusEffect) { applyMonsterStatus(sp.statusEffect, sp.duration || 2); appendCombatLog('  → ' + activeCombat.monster.name + ' is affected: ' + sp.statusEffect + '!', 'system'); }
    }
    updateCombatHpBars();
    if (typeof playSfx === 'function') playSfx(sp.targetType === 'self' ? 'upgrade' : 'battle-hit');

    setTimeout(function(){
      if (activeCombat.monsterHp <= 0){ handleBattleVictory(); return; }
      spellMonsterCounter();
    }, 650);
  }

  // Monster's counter-turn after a spell (mirrors 06's structure + statuses).
  function spellMonsterCounter(){
    var pre = applyMonsterStatusPreTurn();
    if (activeCombat.monsterHp <= 0){ handleBattleVictory(); return; }
    if (pre.disabled){
      appendCombatLog(pre.note, 'system');
      finishSpellRound();
      return;
    }
    // blind → chance to miss
    if (activeCombat.mStatus.blind > 0 && rand(1, 100) <= 45){
      appendCombatLog('🌫️ ' + activeCombat.monster.name + ' misses in the static veil!', 'system');
      finishSpellRound();
      return;
    }
    el.monsterSprite.classList.add('attack-left', 'casting');
    launchBattleProjectile('ice', el.monsterSprite, el.playerSprite);
    setTimeout(function(){
      var wx = (typeof elementMultiplier === 'function') ? elementMultiplier(activeCombat.monster.element, getShieldElement()) : 1;
      var raw = (activeCombat.monster.attack * monsterAttackFactor()) - getPlayerDp();
      var dmg = Math.max(1, Math.round(raw * wx * playerIncomingFactor()));
      activeCombat.playerHp = Math.max(0, activeCombat.playerHp - dmg);
      updateCombatHpBars();
      triggerFloatingDmg('player', dmg, false);
      showImpactEffect('player', activeCombat.pStatus.shield > 0 ? '🛡️' : '💥');
      appendCombatLog(activeCombat.monster.name + ' hits you for ' + dmg + ' damage!', 'm-attack');
      el.monsterSprite.classList.remove('attack-left', 'casting');
      finishSpellRound();
    }, 250);
  }
  function getShieldElement(){ var s = state.shields.find(function(x){ return x.id === state.equippedShield; }); return (s && s.element) || 'metal'; }

  function finishSpellRound(){
    tickPlayerStatuses();
    updateCombatHpBars();
    setTimeout(function(){
      if (activeCombat.playerHp <= 0){ handleBattleDefeat(); return; }
      el.startCombatBtn.disabled = false; if (el.openSpellsBtn) el.openSpellsBtn.disabled = false;
    }, 400);
  }

  // ---- Spell menu (overrides 06's openSpellsMenu; 06 wires the button to this name) ----
  function openSpellsMenu(){
    if (!el.spellsPanel) return;
    if (el.spellsPanel.style.display === 'flex'){ el.spellsPanel.style.display = 'none'; return; }
    el.spellsPanel.innerHTML = '';
    el.spellsPanel.style.display = 'flex';
    SPELLS.forEach(function(sp){
      var afford = activeCombat && activeCombat.playerMp >= sp.manaCost;
      var col = (typeof elementColor === 'function') ? elementColor(sp.element) : '#8ab';
      var btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'spell-btn';
      btn.disabled = !afford;
      btn.style.borderColor = col; btn.style.color = col;
      btn.innerHTML = sp.icon + ' ' + sp.name + '<small>' + sp.manaCost + ' MP</small>';
      btn.title = sp.desc + ' (' + sp.manaCost + ' MP)';
      btn.addEventListener('click', function(){ castSpell(sp.id); });
      el.spellsPanel.appendChild(btn);
    });
  }
