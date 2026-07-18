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
    if (el.combatItemsPanel) el.combatItemsPanel.style.display = 'none';
    el.startCombatBtn.disabled = true; if (el.openSpellsBtn) el.openSpellsBtn.disabled = true;
    if (el.openItemsBtn) el.openItemsBtn.disabled = true;

    el.playerSprite.classList.add('casting');
    setTimeout(function(){ el.playerSprite.classList.remove('casting'); }, 500);

    // Spell reliability (docs/balance-design.md): 70% full / 20% weak (half effect + half
    // duration) / 10% total fizzle (MP spent, nothing happens). Rolled ONCE per cast.
    var spellRoll = Math.random();
    if (spellRoll >= BAL.SPELL_FULL + BAL.SPELL_WEAK){
      triggerFloatingNote('player', 'FIZZLE 💨');
      showImpactEffect('player', '💨');
      appendCombatLog('💨 ' + sp.icon + ' ' + sp.name + ' fizzles out! The MP is spent but nothing happens…', 'system');
      updateCombatHpBars();
      if (typeof playSfx === 'function') playSfx('click');
      setTimeout(function(){
        if (activeCombat.monsterHp <= 0){ handleBattleVictory(); return; }
        spellMonsterCounter();
      }, 650);
      return;
    }
    var spellEff = (spellRoll >= BAL.SPELL_FULL) ? 0.5 : 1;
    if (spellEff < 1) appendCombatLog('✨ ' + sp.icon + ' ' + sp.name + ' fizzles — it only partly works!', 'system');

    if (sp.targetType === 'self'){
      if (sp.statusEffect === 'heal'){
        var heal = Math.max(1, Math.round(sp.power * spellEff));
        activeCombat.playerHp = Math.min(activeCombat.playerMaxHp, activeCombat.playerHp + heal);
        showImpactEffect('player', '💚'); appendCombatLog('You cast ' + sp.icon + ' ' + sp.name + ' — +' + heal + ' HP!', 'system');
      } else {
        applyPlayerStatus(sp.statusEffect, Math.max(1, Math.round((sp.duration || 3) * spellEff)));
        showImpactEffect('player', sp.icon); appendCombatLog('You cast ' + sp.icon + ' ' + sp.name + '! ' + sp.desc, 'system');
      }
    } else {
      // enemy-target: damage (element-scaled) + status
      launchBattleProjectile('arcane', el.playerSprite, el.monsterSprite);
      var dmg = 0;
      if (sp.power > 0){
        var wx = (typeof elementMultiplier === 'function') ? elementMultiplier(sp.element, activeCombat.monster.element) : 1;
        dmg = Math.max(1, Math.round((sp.power + Math.round(getPlayerAp() * 0.3) - monsterEffDefense() * 0.3) * wx * spellEff));
        activeCombat.monsterHp = Math.max(0, activeCombat.monsterHp - dmg);
        triggerFloatingDmg('monster', dmg, false); showImpactEffect('monster', sp.icon);
        appendCombatLog('You cast ' + sp.icon + ' ' + sp.name + ' for ' + dmg + ' damage!', 'p-attack');
        if (wx !== 1 && typeof elementMatchupNote === 'function'){ var n = elementMatchupNote(sp.element, activeCombat.monster.element); if (n) appendCombatLog('  ' + n, wx > 1 ? 'p-attack' : 'system'); }
      } else {
        appendCombatLog('You cast ' + sp.icon + ' ' + sp.name + '!', 'system');
      }
      if (sp.statusEffect) { applyMonsterStatus(sp.statusEffect, Math.max(1, Math.round((sp.duration || 2) * spellEff))); appendCombatLog('  → ' + activeCombat.monster.name + ' is affected: ' + sp.statusEffect + '!', 'system'); }
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
      var eff = activeCombat.monster.attack * monsterAttackFactor();
      var pDef = getPlayerDp();
      var pSpd = (typeof getPlayerSpeed === 'function') ? getPlayerSpeed() : 5;
      // Same dodge → power-hit → ratio-damage order as 06's main round (docs/balance-design.md).
      if (rollDodge(pSpd, activeCombat.monster.speed || 5)) {
        el.playerSprite.classList.add('dodge-slide');
        setTimeout(function(){ el.playerSprite.classList.remove('dodge-slide'); }, 450);
        triggerFloatingNote('player', 'MISS 💨');
        appendCombatLog('💨 You dodge ' + activeCombat.monster.name + "'s attack!", 'p-attack');
      } else {
        var dmg = Math.max(1, Math.round(BAL.ENEMY_COEFF * eff * eff / (eff + pDef) * wx * playerIncomingFactor()));
        var mPower = Math.random() * 100 < (BAL.MONSTER_CRIT_BASE + 2 * activeCombat.monster.rank);
        if (mPower) dmg = Math.round(dmg * BAL.POWER_HIT_MULT);
        activeCombat.playerHp = Math.max(0, activeCombat.playerHp - dmg);
        updateCombatHpBars();
        if (mPower) triggerFloatingNote('player', '💥 POWER HIT!', 'power');
        triggerFloatingDmg('player', dmg, false);
        showImpactEffect('player', activeCombat.pStatus.shield > 0 ? '🛡️' : '💥');
        appendCombatLog((mPower ? '💥 POWER HIT! ' : '') + activeCombat.monster.name + ' hits you for ' + dmg + ' damage!', 'm-attack');
      }
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
      if (el.openItemsBtn) el.openItemsBtn.disabled = false;
    }, 400);
  }

  // ---- Spell menu (overrides 06's openSpellsMenu; 06 wires the button to this name) ----
  // Spells are grouped by category (user 2026-07-18): tab buttons on top (⚔️ Attack / 🌀 Control /
  // 💚 Recovery / ✨ Special from SPELL_CATS in spells.config.js); clicking a tab lists just that
  // category's spells. Spells with no `cat` land in Special automatically. Last tab is remembered
  // for the session so re-opening the menu doesn't reset to Attack.
  var _spellTab = 'attack';
  function _spellCatOf(sp){ return sp.cat || 'special'; }
  function openSpellsMenu(){
    if (!el.spellsPanel) return;
    if (el.spellsPanel.style.display === 'flex'){ el.spellsPanel.style.display = 'none'; return; }
    if (el.combatItemsPanel) el.combatItemsPanel.style.display = 'none';   // one panel at a time
    el.spellsPanel.style.display = 'flex';
    renderSpellsMenu();
  }
  function renderSpellsMenu(){
    if (!el.spellsPanel) return;
    el.spellsPanel.innerHTML = '';
    var cats = (typeof SPELL_CATS !== 'undefined') ? SPELL_CATS
      : [{ key: 'special', label: '✨ Spells', desc: '' }];
    // Tab row
    var tabRow = document.createElement('div');
    tabRow.className = 'spell-cat-row';
    cats.forEach(function(cat){
      var n = SPELLS.filter(function(sp){ return _spellCatOf(sp) === cat.key; }).length;
      if (!n) return;                                    // hide empty categories
      var tb = document.createElement('button');
      tb.type = 'button';
      tb.className = 'spell-cat-btn' + (_spellTab === cat.key ? ' active' : '');
      tb.textContent = cat.label + ' (' + n + ')';
      tb.title = cat.desc;
      tb.addEventListener('click', function(){ _spellTab = cat.key; renderSpellsMenu(); });
      tabRow.appendChild(tb);
    });
    el.spellsPanel.appendChild(tabRow);
    // Spells of the active tab
    SPELLS.forEach(function(sp){
      if (_spellCatOf(sp) !== _spellTab) return;
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

  // ---- Combat items (🎒 Use Item) ------------------------------------------------------------
  // Consumables usable MID-FIGHT so the Item Store actually matters in battle (user 2026-07-18).
  // Using an item takes your turn: the effect lands, then the monster gets its counter-turn via
  // the same spellMonsterCounter() path spells use (dodge/power-hit/status rules all apply).
  // Effects write activeCombat.playerHp/Mp — updateCombatHpBars() mirrors them into state, so
  // "wounds persist" bookkeeping stays in one place.
  var COMBAT_ITEM_IDS = ['potion', 'ether', 'super_medicine', 'poison_vial'];
  function openItemsMenu(){
    if (!el.combatItemsPanel) return;
    if (el.combatItemsPanel.style.display === 'flex'){ el.combatItemsPanel.style.display = 'none'; return; }
    if (el.spellsPanel) el.spellsPanel.style.display = 'none';             // one panel at a time
    el.combatItemsPanel.style.display = 'flex';
    renderItemsMenu();
  }
  function renderItemsMenu(){
    if (!el.combatItemsPanel) return;
    el.combatItemsPanel.innerHTML = '';
    var any = false;
    COMBAT_ITEM_IDS.forEach(function(id){
      var meta = (typeof ITEMS !== 'undefined') ? ITEMS[id] : null;
      if (!meta) return;
      var n = (typeof countItem === 'function') ? countItem(id) : 0;
      var btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'spell-btn';
      btn.disabled = n < 1;
      btn.innerHTML = meta.icon + ' ' + meta.name + '<small>×' + n + '</small>';
      btn.title = meta.desc + (n < 1 ? ' — none left! Buy more at the Item Store.' : '');
      btn.addEventListener('click', function(){ useCombatItem(id); });
      el.combatItemsPanel.appendChild(btn);
      if (n > 0) any = true;
    });
    if (!any){
      var note = document.createElement('div');
      note.className = 'combat-items-empty';
      note.textContent = '🎒 No usable items — stock up at the 🏪 Item Store on Earth!';
      el.combatItemsPanel.appendChild(note);
    }
  }
  function useCombatItem(id){
    if (!activeCombat) return;
    if (el.startCombatBtn && el.startCombatBtn.disabled) return;   // mid-round animation; ignore
    if (typeof countItem !== 'function' || countItem(id) < 1) return;
    var meta = ITEMS[id];
    // No-op uses don't consume the item OR your turn — just explain why.
    if (id === 'potion' && activeCombat.playerHp >= activeCombat.playerMaxHp){ showToast('HP is already full!'); return; }
    if (id === 'ether' && activeCombat.playerMp >= activeCombat.playerMaxMp){ showToast('MP is already full!'); return; }
    if (id === 'super_medicine' && activeCombat.playerHp >= activeCombat.playerMaxHp && activeCombat.playerMp >= activeCombat.playerMaxMp){ showToast('HP & MP are already full!'); return; }
    ensureStatusBags();
    spendItem(id);
    if (el.combatItemsPanel) el.combatItemsPanel.style.display = 'none';
    el.startCombatBtn.disabled = true;
    if (el.openSpellsBtn) el.openSpellsBtn.disabled = true;
    if (el.openItemsBtn) el.openItemsBtn.disabled = true;
    switch (id){
      case 'potion':
        activeCombat.playerHp = Math.min(activeCombat.playerMaxHp, activeCombat.playerHp + 50);
        triggerFloatingNote('player', '+50 HP 🧪');
        appendCombatLog('🧪 Potion! +50 HP (' + activeCombat.playerHp + '/' + activeCombat.playerMaxHp + ')', 'p-attack');
        break;
      case 'ether':
        activeCombat.playerMp = Math.min(activeCombat.playerMaxMp, activeCombat.playerMp + 10);
        triggerFloatingNote('player', '+10 MP 💧');
        appendCombatLog('💧 Ether! +10 MP (' + activeCombat.playerMp + '/' + activeCombat.playerMaxMp + ')', 'p-attack');
        break;
      case 'super_medicine':
        activeCombat.playerHp = activeCombat.playerMaxHp;
        activeCombat.playerMp = activeCombat.playerMaxMp;
        triggerFloatingNote('player', 'FULL RESTORE 💊');
        appendCombatLog('💊 Super Medicine — HP & MP fully restored!', 'p-attack');
        break;
      case 'poison_vial':
        applyMonsterStatus('poison', 3);
        showImpactEffect('monster', '⚗️');
        appendCombatLog('⚗️ Acid Vial splashes ' + activeCombat.monster.name + ' — it corrodes for 3 rounds!', 'p-attack');
        break;
    }
    updateCombatHpBars();
    if (typeof updateStats === 'function') updateStats();
    if (typeof playSfx === 'function') playSfx('click');
    // Using an item takes the turn — the monster answers (same path as after a spell).
    setTimeout(function(){
      if (!activeCombat) return;
      if (activeCombat.monsterHp <= 0){ handleBattleVictory(); return; }
      spellMonsterCounter();
    }, 650);
  }
