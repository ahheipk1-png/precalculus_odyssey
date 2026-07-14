  function getPlayerAp() {
    var w = state.weapons.find(function(x){ return x.id === state.equippedWeapon; }) || state.weapons[0];
    var base = w.power + w.upgradeLvl * getUpgradeGain(w, 'weapon');
    return base + (typeof socketBonusTotal === 'function' ? socketBonusTotal('power') : 0);
  }
  function getPlayerDp() {
    var s = state.shields.find(function(x){ return x.id === state.equippedShield; }) || state.shields[0];
    var base = s.defense + s.upgradeLvl * getUpgradeGain(s, 'shield');
    var armor = (typeof getArmorDefense === 'function') ? getArmorDefense() : 0;
    return base + armor + (typeof socketBonusTotal === 'function' ? socketBonusTotal('defense') : 0);
  }
  // Equipped weapon's Wu Xing element (used for combat matchups).
  function getPlayerElement() {
    var w = state.weapons.find(function(x){ return x.id === state.equippedWeapon; });
    return (w && w.element) || 'metal';
  }
  function getEffectiveMaxHp() {
    return state.playerMaxHp + (typeof getArmorHpBonus === 'function' ? getArmorHpBonus() : 0) +
      (typeof socketBonusTotal === 'function' ? socketBonusTotal('hp') : 0);
  }

  // Shop controllers
  function openShop() {
    el.equationView.classList.remove('active');
    el.battleView.classList.remove('active');
    el.shopView.classList.add('active');
    renderShopList();
    playMusic('shop');
  }

  function closeShop() {
    el.shopView.classList.remove('active');
    // The Weapon Store lives on Earth → return to the Earth hub, not the equation.
    if (typeof openMapHub === 'function') { openMapHub(); return; }
    el.equationView.classList.add('active');
    hideGateScreen();
    playMusic('practice');
  }

  function getUpgradeCost(item) {
    return getUpgradeCostForLevel(item, item.upgradeLvl);
  }

  function getUpgradeHint(type, item) {
    if (item.upgradeLvl >= maxUpgradeLevel) {
      return 'Upgrade maxed (+3). Resell value: ' + getItemSellValue(item) + ' 💵';
    }
    var gain = getUpgradeGain(item, type);
    var statLabel = type === 'weapon' ? 'AP' : 'DP';
    var curStat = (type === 'weapon' ? item.power : item.defense) + item.upgradeLvl * gain;
    var nextStat = curStat + gain;
    var afterUpgradeLvl = item.upgradeLvl + 1;
    var recipe = getUpgradeRecipe(afterUpgradeLvl);
    var need = hasMaterials(recipe);
    return statLabel + ': ' + curStat + ' → ' + nextStat + ' (+' + gain + ') · needs ' +
      chipsSummary(recipe) + (need ? '' : ' ⚠️ (short on chips)') +
      ' · resell after: ' + getItemSellValue(item, afterUpgradeLvl) + ' 💵';
  }

  // Gear "type" descriptor — one place that maps the 4 gear kinds to their state.
  function gearGroup(type){
    if (type === 'weapon') return { arr: state.weapons, eq: 'equippedWeapon', def: 'wood_sword',      label: 'AP',  up: 'weapon', stat: function(it){ return it.power + it.upgradeLvl * getUpgradeGain(it, 'weapon'); } };
    if (type === 'shield') return { arr: state.shields, eq: 'equippedShield', def: 'leather_buckler', label: 'DP',  up: 'shield', stat: function(it){ return it.defense + it.upgradeLvl * getUpgradeGain(it, 'shield'); } };
    if (type === 'armor')  return { arr: state.armor,   eq: 'equippedArmor',  def: 'cloth_tunic',     label: 'DEF', up: 'shield', stat: function(it){ return (it.defense || 0) + it.upgradeLvl * getUpgradeGain(it, 'shield'); } };
    if (type === 'shoes')  return { arr: state.shoes,   eq: 'equippedShoes',  def: 'basic_boots',     label: 'SPD', up: 'weapon', stat: function(it){ return (it.speed || 0) + it.upgradeLvl * 2; } };
    return null;
  }

  function renderGearList(type, container){
    if (!container) return;
    var g = gearGroup(type); if (!g) return;
    container.innerHTML = '';
    g.arr.forEach(function(item){
      var equipped = state[g.eq] === item.id;
      var div = document.createElement('div');
      div.className = 'shop-item ' + (typeof rarityFrameClass === 'function' ? rarityFrameClass(item) : '') + (equipped ? ' equipped' : '');
      var upgCost = getUpgradeCost(item);
      var a = '';
      if (equipped) {
        a += '<button class="shop-btn shop-btn-equip" disabled>Equipped</button>';
        if (item.cost > 0) a += '<button class="shop-btn shop-btn-sell" onclick="window.rpgActions.sell(\'' + type + '\',\'' + item.id + '\')">Resell: ' + getItemSellValue(item) + ' 💵</button>';
      } else if (item.owned) {
        a += '<button class="shop-btn shop-btn-equip" onclick="window.rpgActions.equip(\'' + type + '\',\'' + item.id + '\')">Equip</button>';
        if (item.cost > 0) a += '<button class="shop-btn shop-btn-sell" onclick="window.rpgActions.sell(\'' + type + '\',\'' + item.id + '\')">Resell: ' + getItemSellValue(item) + ' 💵</button>';
      } else {
        a += '<button class="shop-btn shop-btn-buy" onclick="window.rpgActions.buy(\'' + type + '\',\'' + item.id + '\')">Buy: ' + item.cost + ' 💵</button>';
      }
      if (item.owned) {
        a += (item.upgradeLvl >= maxUpgradeLevel)
          ? '<button class="shop-btn shop-btn-upgrade" disabled>Max +3</button>'
          : '<button class="shop-btn shop-btn-upgrade" onclick="window.rpgActions.upgrade(\'' + type + '\',\'' + item.id + '\')">Upgrade: ' + upgCost + ' 💵</button>';
      }
      var elIcon = (typeof elementIcon === 'function') ? elementIcon(item.element) : '';
      var rar = (typeof rarityLabel === 'function') ? rarityLabel(item) : '';
      var sockets = item.chipSlots ? ('<span class="gear-sockets" title="AI-chip sockets">' + new Array(item.chipSlots + 1).join('◈') + '</span>') : '';
      div.innerHTML =
        '<div class="shop-item-art">' + ((typeof gearArtSVG === 'function') ? gearArtSVG(item, type) : '') + '</div>' +
        '<div class="shop-item-info">' +
          '<span class="shop-item-name">' + item.name + (item.upgradeLvl > 0 ? (' +' + item.upgradeLvl) : '') + ' <span class="gear-el">' + elIcon + '</span></span>' +
          '<span class="gear-rarity">' + rar + ' ' + sockets + '</span>' +
          '<span class="shop-item-stat">' + g.label + ': ' + g.stat(item) + '</span>' +
          '<span class="shop-upgrade-hint">' + getUpgradeHint(g.up, item) + '</span>' +
        '</div>' +
        '<div class="shop-item-actions">' + a + '</div>';
      container.appendChild(div);
    });
  }

  function renderShopList() {
    renderMaterialsBar();
    renderGearList('weapon', el.weaponsList);
    renderGearList('shield', el.shieldsList);
    renderGearList('armor', el.armorList);
    renderGearList('shoes', el.shoesList);
  }

  window.rpgActions = {
    equip: function(type, id) {
      var g = gearGroup(type); if (!g) return;
      state[g.eq] = id;
      var it = g.arr.find(function(x){ return x.id === id; });
      if (typeof playEquipSfx === 'function') playEquipSfx(it);
      showToast('Equipped!');
      updateStats(); renderShopList(); saveGame();
    },
    sell: function(type, id) {
      var g = gearGroup(type); if (!g) return;
      var item = g.arr.find(function(x){ return x.id === id; });
      if (!item || !item.owned) return;
      if (item.cost === 0) { showToast('Starter gear cannot be resold.'); return; }
      if (state[g.eq] === id) state[g.eq] = g.def;
      var v = getItemSellValue(item);
      state.coins += v; item.owned = false; item.upgradeLvl = 0;
      showToast('Resold for +' + v + ' 💵!');
      updateStats(); renderShopList();
    },
    buy: function(type, id) {
      var g = gearGroup(type); if (!g) return;
      var item = g.arr.find(function(x){ return x.id === id; });
      if (state.coins >= item.cost) {
        state.coins -= item.cost; item.owned = true; state[g.eq] = id;
        updateStats(); showToast('Purchased & Equipped!');
        if (typeof playEquipSfx === 'function') playEquipSfx(item);
        else if (typeof playSfx === 'function') playSfx('buy');
        renderShopList(); burst(6);
      } else {
        showToast('Not enough Cash! Resell old gear or earn more.');
      }
    },
    upgrade: function(type, id) {
      var g = gearGroup(type); if (!g) return;
      var item = g.arr.find(function(x){ return x.id === id; });
      if (item.upgradeLvl >= maxUpgradeLevel) { showToast('Already maxed at +3!'); renderShopList(); return; }
      var upgCost = getUpgradeCost(item);
      var recipe = getUpgradeRecipe(item.upgradeLvl + 1);
      if (state.coins < upgCost) { showToast('Not enough Cash for upgrade!'); return; }
      if (!hasChips(recipe)) { showToast('Need AI chips: ' + chipsSummary(recipe)); return; }
      state.coins -= upgCost; spendChips(recipe); item.upgradeLvl++;
      updateStats(); showToast('⚒️ Upgraded to +' + item.upgradeLvl + '!');
      if (typeof playSfx === 'function') playSfx('weapon-upgrade');
      renderShopList(); burst(6);
    },
    toggleTrophies: function() {
      if (!el.trophiesPanel) return;
      if (el.trophiesPanel.style.display === 'none') {
        el.trophiesPanel.style.display = 'block';
        updateTrophiesUI();
      } else {
        el.trophiesPanel.style.display = 'none';
      }
    }
  };


  var HERO_ART_MARKUP = document.querySelector('#playerSprite .hero-character') ? document.querySelector('#playerSprite .hero-character').outerHTML : '';
  var ICE_MONSTER_ART_MARKUP = document.querySelector('#monsterSprite .ice-character') ? document.querySelector('#monsterSprite .ice-character').outerHTML : '';

  var monsterArtSerial = 0;
  function getMonsterArtMarkup(difficulty) {
    var tint = difficulty === 'Easy' ? 'hue-rotate(32deg) saturate(.86)' : (difficulty === 'Scout' ? 'hue-rotate(22deg) saturate(.95)' : (difficulty === 'Medium' ? 'hue-rotate(8deg) saturate(1.05)' : (difficulty === 'Boss' ? 'hue-rotate(-38deg) saturate(1.35) contrast(1.12)' : 'saturate(1.2) contrast(1.05)')));
    var suffix = 'mq' + (++monsterArtSerial);
    var markup = ICE_MONSTER_ART_MARKUP;
    ['iceBody','iceDark','iceCore','iceGlow'].forEach(function(id){
      var unique = id + '_' + suffix;
      markup = markup.split('id="' + id + '"').join('id="' + unique + '"');
      markup = markup.split('url(#' + id + ')').join('url(#' + unique + ')');
    });
    return '<div class="monster-art-tint" style="filter:' + tint + '">' + markup + '</div>';
  }

  function launchBattleProjectile(kind, fromEl, toEl) {
    var arena = document.querySelector('.arena-combatants');
    if (!arena || !fromEl || !toEl || reduceMotion) return;
    var a = arena.getBoundingClientRect();
    var f = fromEl.getBoundingClientRect();
    var t = toEl.getBoundingClientRect();
    var sx = f.left + f.width * .55 - a.left;
    var sy = f.top + f.height * .44 - a.top;
    var tx = t.left + t.width * .48 - a.left;
    var ty = t.top + t.height * .42 - a.top;
    var projectile = document.createElement('div');
    projectile.className = 'battle-projectile ' + kind;
    projectile.style.setProperty('--sx', sx + 'px');
    projectile.style.setProperty('--sy', sy + 'px');
    projectile.style.setProperty('--dx', (tx - sx) + 'px');
    projectile.style.setProperty('--dy', (ty - sy) + 'px');
    arena.appendChild(projectile);
    setTimeout(function(){ projectile.remove(); }, 560);
  }

  function battleImpactAt(targetEl) {
    var arena = document.querySelector('.arena-combatants');
    if (!arena || !targetEl || reduceMotion) return;
    var a = arena.getBoundingClientRect();
    var t = targetEl.getBoundingClientRect();
    var ring = document.createElement('div');
    ring.className = 'impact-ring';
    ring.style.left = (t.left + t.width * .5 - a.left) + 'px';
    ring.style.top = (t.top + t.height * .43 - a.top) + 'px';
    arena.appendChild(ring);
    arena.classList.remove('screen-shake');
    void arena.offsetWidth;
    arena.classList.add('screen-shake');
    setTimeout(function(){ ring.remove(); arena.classList.remove('screen-shake'); }, 520);
  }

  function resetCombatPoses() {
    ['attack-right','attack-left','hit-shake','casting','victory','defeated'].forEach(function(cls){
      el.playerSprite.classList.remove(cls);
      el.monsterSprite.classList.remove(cls);
    });
  }

  // Monster / Arena controllers
  // 3 monsters per room (Easy / Elite / Boss) — trimmed down from an earlier 6-tier roster
  // so a room's roster is a quick clear, not a grind, and content stays sustainable as more
  // rooms/topics get added.
  var monsterRanks = [
    { difficulty: 'Easy', hp: 15, mp: 20, attack: 2, defense: 1, reward: 20 },
    { difficulty: 'Elite', hp: 55, mp: 50, attack: 6, defense: 5, reward: 75 },
    { difficulty: 'Boss', hp: 110, mp: 80, attack: 11, defense: 9, reward: 140 }
  ];

  var monsterCatalog = [
    { id: 'r1_1', room: 1, rank: 1, name: 'Spooky Slime' },
    { id: 'r1_2', room: 1, rank: 2, name: 'Pencil Imp' },
    { id: 'r1_3', room: 1, rank: 3, name: 'Blackboard Behemoth' },
    { id: 'r2_1', room: 2, rank: 1, name: 'Cave Beetle' },
    { id: 'r2_2', room: 2, rank: 2, name: 'Crystal Mole' },
    { id: 'r2_3', room: 2, rank: 3, name: 'Granite Titan' },
    { id: 'r3_1', room: 3, rank: 1, name: 'Skeleton Sentry' },
    { id: 'r3_2', room: 3, rank: 2, name: 'Bone Alchemist' },
    { id: 'r3_3', room: 3, rank: 3, name: 'Crypt Overlord' },
    { id: 'r4_1', room: 4, rank: 1, name: 'Sand Devil' },
    { id: 'r4_2', room: 4, rank: 2, name: 'Mirage Mage' },
    { id: 'r4_3', room: 4, rank: 3, name: 'Pharaoh Warden' },
    { id: 'r5_1', room: 5, rank: 1, name: 'Abyssal Jellyfish' },
    { id: 'r5_2', room: 5, rank: 2, name: 'Tidal Knight' },
    { id: 'r5_3', room: 5, rank: 3, name: 'Leviathan Sage' },
    { id: 'r6_1', room: 6, rank: 1, name: 'Volt Eagle' },
    { id: 'r6_2', room: 6, rank: 2, name: 'Storm Caller' },
    { id: 'r6_3', room: 6, rank: 3, name: 'Cyclone Emperor' },
    { id: 'r7_1', room: 7, rank: 1, name: 'Fire Imp' },
    { id: 'r7_2', room: 7, rank: 2, name: 'Ash Witch' },
    { id: 'r7_3', room: 7, rank: 3, name: 'Inferno Monarch' },
    { id: 'r8_1', room: 8, rank: 1, name: 'Shadow Fiend' },
    { id: 'r8_2', room: 8, rank: 2, name: 'Moonlit Reaper' },
    { id: 'r8_3', room: 8, rank: 3, name: 'Eclipse Sovereign' },
    { id: 'r9_1', room: 9, rank: 1, name: 'Hellfire Hound' },
    { id: 'r9_2', room: 9, rank: 2, name: 'Lava Sentinel' },
    { id: 'r9_3', room: 9, rank: 3, name: 'Doomfire Regent' },
    { id: 'r10_1', room: 10, rank: 1, name: 'Star Wisp' },
    { id: 'r10_2', room: 10, rank: 2, name: 'Orbit Knight' },
    { id: 'r10_3', room: 10, rank: 3, name: 'Galaxy Final King' }
  ];

  function buildMonster(entry) {
    var rank = monsterRanks[entry.rank - 1];
    return {
      id: entry.id,
      room: entry.room,
      rank: entry.rank,
      name: entry.name,
      maxHp: entry.room * rank.hp,
      maxMp: rank.mp + entry.room * 5,
      attack: entry.room * rank.attack,
      defense: Math.round(entry.room * rank.defense),
      reward: entry.room * rank.reward,
      difficulty: rank.difficulty,
      element: getMonsterElement(entry),
      requiredHeroLvl: entry.room + (entry.rank - 1)
    };
  }
  // Deterministic Wu Xing element per enemy robot (same for every player).
  function getMonsterElement(entry){
    if (typeof ELEMENT_ORDER === 'undefined') return 'metal';
    return ELEMENT_ORDER[(entry.room + entry.rank) % ELEMENT_ORDER.length];
  }

  function monsterKey(monster) {
    return monster.id;
  }

  function getRoomMonsters(room) {
    return monsterCatalog.filter(function(m){ return m.room === room; }).map(buildMonster);
  }

  function getRoomBoss(room) {
    return getRoomMonsters(room).find(function(m){ return m.rank === 3; });
  }

  function getMonsterLockReason(monster) {
    if (monster.room > state.level) return 'Reach Arena ' + monster.room;
    if (state.heroLvl < monster.requiredHeroLvl) return 'Hero Lv. ' + monster.requiredHeroLvl;
    return '';
  }

  function openBattle() {
    // Stepping into the Boss Room. If the player now leaves without beating the arena's boss,
    // the Boss Gate closes and the ARENA_GOAL requirement must be earned again (section 9).
    state.bossRoomEntered = true;
    el.equationView.classList.remove('active');
    el.shopView.classList.remove('active');
    el.battleView.classList.add('active');

    el.monsterSelectScreen.style.display = 'block';
    el.combatArenaScreen.style.display = 'none';
    el.battleFleeBtn.hidden = false;
    if (el.battleShopBtn) el.battleShopBtn.hidden = false;
    renderMonsterChoices();
    if (typeof playMusic === 'function') playMusic('arena');
  }

  function renderMonsterChoicesLegacy() {
    return renderMonsterChoices();
    el.monsterChoices.innerHTML = '';
    if (el.bountyLvlText) el.bountyLvlText.textContent = state.level;
    
    var m1 = {
      name: pool[0],
      maxHp: state.level * 15,
      maxMp: 20,
      attack: state.level * 2,
      defense: Math.round(state.level * 1),
      reward: state.level * 20,
      difficulty: 'Easy',
      sprite: '🟢'
    };
    var m2 = {
      name: pool[1],
      maxHp: state.level * 35,
      maxMp: 40,
      attack: state.level * 4,
      defense: Math.round(state.level * 3.5),
      reward: state.level * 50,
      difficulty: 'Medium',
      sprite: '👺'
    };
    var m3 = {
      name: pool[2],
      maxHp: state.level * 75,
      maxMp: 60,
      attack: state.level * 8,
      defense: Math.round(state.level * 7),
      reward: state.level * 100,
      difficulty: 'Hard',
      sprite: '🐉'
    };

    if (el.bountyChecklist) {
      var bHTML = '';
      [m1, m2, m3].forEach(function(m) {
        var isDefeated = state.defeatedMonsters[state.level + '_' + m.difficulty];
        var checkSymbol = isDefeated ? '☑️' : '⬜';
        var textColor = isDefeated ? 'var(--chalk-dim)' : 'var(--chalk)';
        var textStyle = isDefeated ? 'text-decoration: line-through; opacity: 0.65;' : '';
        bHTML += `<div style="display:flex; align-items:center; gap:6px; color:${textColor}; ${textStyle}">${checkSymbol} <strong>${m.name}</strong> (${m.difficulty})</div>`;
      });
      el.bountyChecklist.innerHTML = bHTML;
    }

    [m1, m2, m3].forEach(function(m){
      var isDefeated = state.defeatedMonsters[state.level + '_' + m.difficulty];
      var card = document.createElement('div');
      card.className = 'monster-card-select' + (isDefeated ? ' defeated' : '');
      if (isDefeated) {
        card.style.opacity = '0.4';
        card.style.pointerEvents = 'none';
        card.style.borderStyle = 'dotted';
      }
      card.innerHTML = `
        <div class="monster-card-art">${getMonsterArtMarkup(m.difficulty)}</div>
        <div class="monster-select-name">${m.name} ${isDefeated ? '💀' : ''}</div>
        <div class="monster-select-stat" style="color:var(--yellow)">${m.difficulty}</div>
        <div class="monster-select-stat">${isDefeated ? '☠️ DEFEATED (Gone Forever)' : ('HP: ' + m.maxHp)}</div>
        <div class="monster-select-stat">ATK: ${m.attack} &nbsp;|&nbsp; DEF: ${m.defense}</div>
        <div class="monster-select-reward">Reward: ${m.reward} 💵</div>
      `;
      if (!isDefeated) {
        card.addEventListener('click', function(){
          startCombat(m);
        });
      }
      el.monsterChoices.appendChild(card);
    });

    // Check if the level is clear (Hard boss defeated)
    var isLevelClear = false;
    if (isLevelClear && state.level < state.maxLevel) {
      if (el.arenaAdvanceRow) el.arenaAdvanceRow.style.display = 'block';
      if (el.advanceLvlText) el.advanceLvlText.textContent = state.level + 1;
    } else {
      if (el.arenaAdvanceRow) el.arenaAdvanceRow.style.display = 'none';
    }
  }

  function renderMonsterChoices() {
    el.monsterChoices.innerHTML = '';
    if (el.bountyLvlText) el.bountyLvlText.textContent = state.level;

    var currentRoomMonsters = getRoomMonsters(state.level);
    var allMonsters = monsterCatalog.map(buildMonster);

    if (el.bountyChecklist) {
      var bHTML = '';
      currentRoomMonsters.forEach(function(m) {
        var lockReason = getMonsterLockReason(m);
        var isDefeated = state.defeatedMonsters[monsterKey(m)];
        var checkSymbol = isDefeated ? '☑️' : (lockReason ? '🔒' : '⬜');
        var textColor = isDefeated ? 'var(--chalk-dim)' : 'var(--chalk)';
        var textStyle = isDefeated ? 'text-decoration: line-through; opacity: 0.65;' : '';
        bHTML += `<div style="display:flex; align-items:center; gap:6px; color:${textColor}; ${textStyle}">${checkSymbol} <strong>${m.name}</strong> (${m.difficulty}${lockReason ? ', ' + lockReason : ''})</div>`;
      });
      el.bountyChecklist.innerHTML = bHTML;
    }

    allMonsters.forEach(function(m){
      var lockReason = getMonsterLockReason(m);
      var isLocked = !!lockReason;
      var isDefeated = state.defeatedMonsters[monsterKey(m)];
      var card = document.createElement('div');
      card.className = 'monster-card-select' + (isDefeated ? ' defeated' : '') + (isLocked ? ' locked' : '');
      if (isDefeated) {
        card.style.opacity = '0.4';
        card.style.pointerEvents = 'none';
        card.style.borderStyle = 'dotted';
      }
      card.innerHTML = `
        <div class="monster-card-art">${getMonsterArtMarkup(m.difficulty)}</div>
        <div class="monster-select-name">${m.name} ${isDefeated ? '💀' : ''}</div>
        <div class="monster-select-stat" style="color:var(--yellow)">Arena ${m.room} · ${m.difficulty}</div>
        <div class="monster-select-stat">${isDefeated ? '☠️ DEFEATED (Gone Forever)' : ('HP: ' + m.maxHp + ' · MP: ' + m.maxMp)}</div>
        <div class="monster-select-stat">ATK: ${m.attack} &nbsp;|&nbsp; DEF: ${m.defense}</div>
        <div class="monster-select-stat">Needs Hero Lv. ${m.requiredHeroLvl}</div>
        <div class="monster-select-reward">Reward: ${m.reward} 💵</div>
        ${isLocked ? `<div class="monster-lock-note">🔒 Locked: ${lockReason}</div>` : ''}
      `;
      if (!isDefeated && !isLocked) {
        card.addEventListener('click', function(){
          startCombat(m);
        });
      }
      el.monsterChoices.appendChild(card);
    });

    var boss = getRoomBoss(state.level);
    var isLevelClear = boss && state.defeatedMonsters[monsterKey(boss)];
    if (isLevelClear && state.level < state.maxLevel) {
      if (el.arenaAdvanceRow) el.arenaAdvanceRow.style.display = 'block';
      if (el.advanceLvlText) el.advanceLvlText.textContent = state.level + 1;
    } else {
      if (el.arenaAdvanceRow) el.arenaAdvanceRow.style.display = 'none';
    }
  }

  var activeCombat = null;

  function startCombat(monster) {
    // Wounds persist between battles — only the Hotel (or a full-heal item) restores HP/MP.
    // A knocked-out hero must rest before fighting again.
    if (state.playerHp <= 0) {
      if (typeof showToast === 'function') showToast('❤️ You are knocked out! Rest at the Hotel to recover before fighting.');
      return;
    }
    el.monsterSelectScreen.style.display = 'none';
    el.combatArenaScreen.style.display = 'grid';
    resetCombatPoses();

    // Enter combat at the hero's CURRENT (possibly wounded) HP/MP, not full.
    activeCombat = {
      monster: monster,
      playerHp: Math.max(1, Math.min(state.playerHp, state.playerMaxHp)),
      playerMaxHp: state.playerMaxHp,
      playerMp: Math.max(0, Math.min(state.playerMp, state.playerMaxMp)),
      playerMaxMp: state.playerMaxMp,
      monsterHp: monster.maxHp,
      monsterMp: monster.maxMp
    };

    var weaponEmojis = {
      wood_sword: '🪵',
      bronze_dagger: '🗡️',
      iron_broadsword: '⚔️',
      flame_bow: '🏹',
      star_scepter: '🪄'
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
    el.monsterSprite.innerHTML = getMonsterArtMarkup(monster.difficulty);
    el.playerApVal.textContent = getPlayerAp();
    el.playerDpVal.textContent = getPlayerDp();
    el.monsterApVal.textContent = monster.attack;
    el.monsterDpVal.textContent = monster.defense;
    
    updateCombatHpBars();

    el.combatLog.innerHTML = '';
    appendCombatLog(`A wild ${monster.name} blocks your way!`, 'system');
    appendCombatLog(`Equipped AP: ${getPlayerAp()} (Upgrade to hit harder!), DP: ${getPlayerDp()}`, 'system');

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
    if (el.combatEscapeBtn) {
      el.combatEscapeBtn.style.display = 'inline-block';
      el.combatEscapeBtn.disabled = false;
    }
    if (el.spellsPanel) el.spellsPanel.style.display = 'none';
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
      var dmgToMonster = Math.max(1, Math.round((pAp - mDef) * wx));
      if (wx !== 1 && typeof elementMatchupNote === 'function') {
        var note = elementMatchupNote(getPlayerElement(), activeCombat.monster.element);
        if (note) appendCombatLog('🔥 ' + note, wx > 1 ? 'p-attack' : 'system');
      }

      activeCombat.monsterHp = Math.max(0, activeCombat.monsterHp - dmgToMonster);
      updateCombatHpBars();

      triggerFloatingDmg('monster', dmgToMonster, false);
      showImpactEffect('monster', '💥');
      battleImpactAt(el.monsterSprite);
      
      el.monsterSprite.classList.add('hit-shake');
      setTimeout(function(){ el.monsterSprite.classList.remove('hit-shake'); }, 400);

      appendCombatLog(`You hit ${activeCombat.monster.name} for ${dmgToMonster} damage!`, 'p-attack');
      if (typeof playSfx === 'function') playSfx('battle-hit');

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
      var isHealTurn = !pre.disabled && (activeCombat.monsterHp <= activeCombat.monster.maxHp * 0.35) && (activeCombat.monsterMp >= 20);

      if (pre.disabled) {
        appendCombatLog(pre.note, 'system');
      } else if (isHealTurn) {
        el.monsterSprite.classList.add('hit-shake');
        setTimeout(function(){ el.monsterSprite.classList.remove('hit-shake'); }, 400);

        setTimeout(function(){
          activeCombat.monsterMp = Math.max(0, activeCombat.monsterMp - 20);
          var healVal = Math.round(activeCombat.monster.maxHp * 0.35) || 10;
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
          var dmgToPlayer = Math.max(1, Math.round((mAp - pDef) * mwx * pInc));

          activeCombat.playerHp = Math.max(0, activeCombat.playerHp - dmgToPlayer);
          updateCombatHpBars();

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

          appendCombatLog(`${activeCombat.monster.name} attacks you for ${dmgToPlayer} damage!`, 'm-attack');
          
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
    activeCombat.playerHp = Math.min(activeCombat.playerMaxHp, activeCombat.playerHp + healVal);
    updateCombatHpBars();

    el.playerSprite.classList.add('casting');
    setTimeout(function(){ el.playerSprite.classList.remove('casting'); }, 600);
    showImpactEffect('player', '💚');
    appendCombatLog(`You cast ${spellName}! Recovered +${healVal} HP!`, 'system');

    setTimeout(function() {
      if (activeCombat.monsterHp <= 0) {
        handleBattleVictory();
        return;
      }

      var isHealTurn = (activeCombat.monsterHp <= activeCombat.monster.maxHp * 0.35) && (activeCombat.monsterMp >= 20);

      if (isHealTurn) {
        el.monsterSprite.classList.add('hit-shake');
        setTimeout(function(){ el.monsterSprite.classList.remove('hit-shake'); }, 400);

        setTimeout(function(){
          activeCombat.monsterMp = Math.max(0, activeCombat.monsterMp - 20);
          var monsterHealVal = Math.round(activeCombat.monster.maxHp * 0.35) || 10;
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
          var dmgToPlayer = Math.max(1, Math.round((mAp - pDef) * mwx * pInc));

          activeCombat.playerHp = Math.max(0, activeCombat.playerHp - dmgToPlayer);
          updateCombatHpBars();

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

          appendCombatLog(`${activeCombat.monster.name} attacks you for ${dmgToPlayer} damage!`, 'm-attack');
          
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

  function handleBattleVictory() {
    el.playerSprite.classList.add('victory');
    el.monsterSprite.classList.add('defeated');
    appendCombatLog(`Victory! You defeated ${activeCombat.monster.name}!`, 'system');
    var reward = activeCombat.monster.reward;
    state.coins += reward;

    state.defeatedMonsters[monsterKey(activeCombat.monster)] = true;

    // Loot: "part of the body and any precious thing" → real materials into the pouch (R1).
    var loot = rollMonsterLoot(activeCombat.monster);
    addMaterials(loot);
    var lootStr = lootSummary(loot);

    // Bosses (rank 3) still leave a keepsake trophy.
    if (activeCombat.monster.rank >= 3) {
      var rewardTrophy = `👑 ${activeCombat.monster.name}'s Ancient Soul`;
      state.trophies.push(rewardTrophy);
      appendCombatLog(`Obtained Trophy: ${rewardTrophy}!`, 'system');

      // Story: defeating a room boss recovers its memory fragment (14-lore.js).
      // Many guardians were never evil — the fragment reveals why.
      if (typeof unlockMemoryFragment === 'function') {
        var frag = unlockMemoryFragment(activeCombat.monster.room);
        if (frag) {
          appendCombatLog(`📖 Memory recovered — ${frag.title}. Read it in your Star Log.`, 'system');
          showToast('📖 Memory fragment recovered! Open the Star Log.');
        }
      }
    }

    var victoryXp = 100;
    addHeroXp(victoryXp);

    updateStats();
    appendCombatLog(`Gained ${reward} 💵 Cash & +${victoryXp} XP!`, 'system');
    appendCombatLog(`Looted: ${lootStr}`, 'system');
    burst(10);
    if (typeof playSfx === 'function') playSfx('victory');
    // 🧰 Treasure chest: the loot/cash are already credited above — the chest overlay
    // (16-chest.js) is pure celebration. Falls back to the plain toast if absent.
    if (typeof showVictoryChest === 'function') {
      showVictoryChest(loot, reward);
    } else {
      showToast(`💰 +${reward} Cash · Looted ${lootStr}`);
    }

    el.startCombatBtn.style.display = 'none';
    if (el.openSpellsBtn) el.openSpellsBtn.style.display = 'none';
    if (el.combatEscapeBtn) el.combatEscapeBtn.style.display = 'none';
    if (el.spellsPanel) el.spellsPanel.style.display = 'none';
    el.battleFleeBtn.hidden = true;

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
    if (el.combatEscapeBtn) el.combatEscapeBtn.style.display = 'none';
    if (el.spellsPanel) el.spellsPanel.style.display = 'none';
    el.postCombatBtn.style.display = 'inline-block';
    el.postCombatBtn.textContent = 'Return to Shop & Quest';
    if (el.keepFightingBtn) el.keepFightingBtn.style.display = 'none';
    el.battleFleeBtn.hidden = true;
  }

  function handlePostCombatRedirect() {
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
      if (el.gateEnterBtn) el.gateEnterBtn.style.display = 'none';
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

    el.battleView.classList.remove('active');
    el.equationView.classList.add('active');
    el.levelGateActions.style.display = 'none';
    el.eqActions.style.display = 'flex';
    activeCombat = null;
    loadProblem();
    if (state.level !== _paBefore && typeof showPlanetArrival === 'function') showPlanetArrival(state.level);
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

