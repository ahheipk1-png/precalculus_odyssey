  // ============================================================================
  // Combat module 1/5: hero stat helpers + the Weapon Store (was part of the single
  // 06-rpg-battle.js — split 2026-07-18 for maintainability; classic-script global
  // scope, so load order among 06/06b/06c/06d/06e only needs to precede 06d/06e's
  // callers, which happens naturally since all 5 load before any user interaction).
  // Siblings: 06b-monster-roster.js, 06c-monster-select.js, 06d-combat-round.js,
  // 06e-combat-outcome.js.
  // ============================================================================

  // Hero-level base stats: every level past 1 grants +2 AP and +1 DP; every 2 levels +1 Speed.
  // Derived from heroLvl (not stored), so old saves get their bonus automatically.
  function heroStatBonus(kind){
    var lv = Math.max(1, (state && state.heroLvl) || 1) - 1;
    if (kind === 'power') return lv * 2;
    if (kind === 'defense') return lv;
    if (kind === 'speed') return Math.floor(lv / 2);
    return 0;
  }
  function getPlayerAp() {
    var w = state.weapons.find(function(x){ return x.id === state.equippedWeapon; }) || state.weapons[0];
    var base = effectiveGearStat(w.power, w.upgradeLvl);   // base × ×2/×3/×5 upgrade multiplier
    return base + heroStatBonus('power') + (typeof socketBonusTotal === 'function' ? socketBonusTotal('power') : 0) +
      (typeof specialStoreBonus === 'function' ? specialStoreBonus('ap') : 0);
  }
  function getPlayerDp() {
    var s = state.shields.find(function(x){ return x.id === state.equippedShield; }) || state.shields[0];
    var base = effectiveGearStat(s.defense, s.upgradeLvl);
    var armor = (typeof getArmorDefense === 'function') ? getArmorDefense() : 0;
    return base + armor + heroStatBonus('defense') + (typeof socketBonusTotal === 'function' ? socketBonusTotal('defense') : 0) +
      (typeof specialStoreBonus === 'function' ? specialStoreBonus('dp') : 0);
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
    // Category-aware: read the label + current stat from the gear group itself so shoes
    // show "SPD: 2 → 4", shields "DP", armor "DEF" — instead of the old "AP: NaN → NaN".
    var g = gearGroup(type) || gearGroup('weapon');
    // Multiplicative upgrades: the next-level gain is just next-level effective stat minus current
    // (works for every family). g.stat reads the item's primary stat × its upgrade multiplier.
    var curStat = g.stat(item);
    var clone = {}; for (var _k in item) clone[_k] = item[_k]; clone.upgradeLvl = item.upgradeLvl + 1;
    var nextStat = g.stat(clone);
    var gain = nextStat - curStat;
    var afterUpgradeLvl = item.upgradeLvl + 1;
    var recipe = getUpgradeRecipe(afterUpgradeLvl, item);
    var need = hasMaterials(recipe);
    return g.label + ': ' + curStat + ' → ' + nextStat + ' (+' + gain + ') · needs ' +
      chipsSummary(recipe) + (need ? '' : ' ⚠️ (short on chips)') +
      ' · resell after: ' + getItemSellValue(item, afterUpgradeLvl) + ' 💵';
  }

  // Gear "type" descriptor — one place that maps the 4 gear kinds to their state.
  function gearGroup(type){
    if (type === 'weapon') return { arr: state.weapons, eq: 'equippedWeapon', def: 'wood_sword',      label: 'AP',  up: 'weapon', stat: function(it){ return effectiveGearStat(it.power, it.upgradeLvl); } };
    if (type === 'shield') return { arr: state.shields, eq: 'equippedShield', def: 'leather_buckler', label: 'DP',  up: 'shield', stat: function(it){ return effectiveGearStat(it.defense, it.upgradeLvl); } };
    if (type === 'armor')  return { arr: state.armor,   eq: 'equippedArmor',  def: 'cloth_tunic',     label: 'DEF', up: 'shield', stat: function(it){ return effectiveGearStat(it.defense || 0, it.upgradeLvl); } };
    if (type === 'shoes')  return { arr: state.shoes,   eq: 'equippedShoes',  def: 'basic_boots',     label: 'SPD', up: 'shoes',  stat: function(it){ return effectiveGearStat(it.speed || 0, it.upgradeLvl); } };
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
        a += '<button class="shop-btn shop-btn-equip" disabled title="Already equipped and in use">Equipped</button>';
        if (item.cost > 0) a += '<button class="shop-btn shop-btn-sell" title="Sell back for coins — resets upgrades to +0" onclick="window.rpgActions.sell(\'' + type + '\',\'' + item.id + '\')">Resell: ' + getItemSellValue(item) + ' 💵</button>';
      } else if (item.owned) {
        a += '<button class="shop-btn shop-btn-equip" title="Make this your active gear" onclick="window.rpgActions.equip(\'' + type + '\',\'' + item.id + '\')">Equip</button>';
        if (item.cost > 0) a += '<button class="shop-btn shop-btn-sell" title="Sell back for coins — resets upgrades to +0" onclick="window.rpgActions.sell(\'' + type + '\',\'' + item.id + '\')">Resell: ' + getItemSellValue(item) + ' 💵</button>';
      } else {
        a += '<button class="shop-btn shop-btn-buy" title="Purchase and automatically equip this item" onclick="window.rpgActions.buy(\'' + type + '\',\'' + item.id + '\')">Buy: ' + item.cost + ' 💵</button>';
      }
      if (item.owned) {
        a += (item.upgradeLvl >= maxUpgradeLevel)
          ? '<button class="shop-btn shop-btn-upgrade" disabled title="Fully upgraded — no further upgrades possible">Max +3</button>'
          : '<button class="shop-btn shop-btn-upgrade" title="Spend coins and AI chips for a stat boost" onclick="window.rpgActions.upgrade(\'' + type + '\',\'' + item.id + '\')">Upgrade: ' + upgCost + ' 💵</button>';
      }
      var elIcon = (typeof elementIcon === 'function') ? elementIcon(item.element) : '';
      var elName = (typeof ELEMENTS === 'object' && ELEMENTS[item.element]) ? ELEMENTS[item.element].name : (item.element || '');
      var rar = (typeof rarityLabel === 'function') ? rarityLabel(item) : '';
      var sockets = item.chipSlots ? ('<span class="gear-sockets" title="AI-chip sockets">' + new Array(item.chipSlots + 1).join('◈') + '</span>') : '';
      var statDesc = { AP: 'Attack Power — damage dealt in combat', DP: 'Defense Power — damage blocked in combat', DEF: 'Defense — extra damage reduction', SPD: 'Speed — determines turn order in battle' };
      div.innerHTML =
        '<div class="shop-item-art">' + ((typeof gearArtSVG === 'function') ? gearArtSVG(item, type) : '') + '</div>' +
        '<div class="shop-item-info">' +
          '<span class="shop-item-name">' + item.name + (item.upgradeLvl > 0 ? (' +' + item.upgradeLvl) : '') + ' <span class="gear-el" title="Element: ' + elName + ' — affects combat matchups">' + elIcon + '</span></span>' +
          '<span class="gear-rarity" title="Item rarity — higher tiers boost stats and looks">' + rar + ' ' + sockets + '</span>' +
          '<span class="shop-item-stat" title="' + (statDesc[g.label] || g.label) + '">' + g.label + ': ' + g.stat(item) + '</span>' +
          '<span class="shop-upgrade-hint">' + getUpgradeHint(type, item) + '</span>' +
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
      var recipe = getUpgradeRecipe(item.upgradeLvl + 1, item);
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
