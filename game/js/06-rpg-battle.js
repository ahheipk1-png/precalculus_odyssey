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
    return base + heroStatBonus('power') + (typeof socketBonusTotal === 'function' ? socketBonusTotal('power') : 0);
  }
  function getPlayerDp() {
    var s = state.shields.find(function(x){ return x.id === state.equippedShield; }) || state.shields[0];
    var base = effectiveGearStat(s.defense, s.upgradeLvl);
    var armor = (typeof getArmorDefense === 'function') ? getArmorDefense() : 0;
    return base + armor + heroStatBonus('defense') + (typeof socketBonusTotal === 'function' ? socketBonusTotal('defense') : 0);
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


  var HERO_ART_MARKUP = document.querySelector('#playerSprite .hero-character') ? document.querySelector('#playerSprite .hero-character').outerHTML : '';
  var ICE_MONSTER_ART_MARKUP = document.querySelector('#monsterSprite .ice-character') ? document.querySelector('#monsterSprite .ice-character').outerHTML : '';

  // Distinct art per monster. Every one of the 30 base monsters (rooms 1-10 × 3 ranks) gets its
  // own emoji creature; higher arenas reuse them by base id, so a fight always shows art that
  // matches the monster's identity — no more one-ice-creature-for-everyone.
  var MONSTER_ART = {
    r1_1: '👻', r1_2: '👺', r1_3: '👹',
    r2_1: '🪲', r2_2: '🐹', r2_3: '🗿',
    r3_1: '💀', r3_2: '☠️', r3_3: '🧛',
    r4_1: '🌪️', r4_2: '🧞', r4_3: '🏺',
    r5_1: '🪼', r5_2: '🦑', r5_3: '🐙',
    r6_1: '🦅', r6_2: '⛈️', r6_3: '🌀',
    r7_1: '👿', r7_2: '🧙', r7_3: '🐲',
    r8_1: '🥷', r8_2: '🦇', r8_3: '🦉',
    r9_1: '🐺', r9_2: '🌋', r9_3: '😈',
    r10_1: '💫', r10_2: '🪐', r10_3: '👑',
    // Gauntlet sub-bosses (module: 2-boss / 3-boss chained fights) — one pair per room, distinct
    // from the regular Easy/Elite/Boss art above so a chain never shows a repeated portrait.
    r1_g1: '🎃', r1_g2: '🧟',
    r2_g1: '🦂', r2_g2: '⛏️',
    r3_g1: '⚰️', r3_g2: '🧟‍♂️',
    r4_g1: '🐪', r4_g2: '🏜️',
    r5_g1: '🦈', r5_g2: '🐋',
    r6_g1: '⚡', r6_g2: '🌩️',
    r7_g1: '🔥', r7_g2: '🧨',
    r8_g1: '🌑', r8_g2: '🕷️',
    r9_g1: '🌡️', r9_g2: '☄️',
    r10_g1: '🌟', r10_g2: '🛸'
  };
  function _monsterBaseId(m){
    var room = Math.max(1, Number(m && m.room) || 1);
    var base = ((room - 1) % 10) + 1;                 // rooms 11-65 cycle the base 1-10 roster
    if (m && m.gauntletSlot) return 'r' + base + '_g' + m.gauntletSlot;
    return 'r' + base + '_' + ((m && m.rank) || 1);
  }
  // Now takes the monster OBJECT (was: difficulty string) so it can pick distinct art + tint
  // by the monster's Wu Xing element. Bosses/elites render larger.
  function getMonsterArtMarkup(monster) {
    var m = monster || {};
    var emoji = MONSTER_ART[_monsterBaseId(m)] || '👾';
    var col = (typeof elementColor === 'function') ? elementColor(m.element || 'metal') : '#8fd6ff';
    var big = m.difficulty === 'Boss' ? 120 : (m.difficulty === 'Elite' ? 98 : 84);
    return '<div class="monster-emoji-art" style="--elcol:' + col + '">' +
             '<span class="monster-emoji-aura"></span>' +
             '<span class="monster-emoji-face" style="font-size:' + big + 'px">' + emoji + '</span>' +
           '</div>';
  }

  // Small Wu Xing element badge (icon + 中文 + name) used on the battle page and monster cards.
  function elementBadgeHtml(el){
    if (!el) return '';
    var col = (typeof elementColor === 'function') ? elementColor(el) : '#8fd6ff';
    var icon = (typeof elementIcon === 'function') ? elementIcon(el) : '';
    var cn = (typeof elementCn === 'function') ? elementCn(el) : '';
    var nm = (typeof ELEMENTS === 'object' && ELEMENTS[el]) ? ELEMENTS[el].name : el;
    return '<span class="el-badge" style="border-color:' + col + ';color:' + col + '">' +
      icon + ' ' + cn + ' ' + nm + '</span>';
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
  // Per-arena stat COEFFICIENTS (buildMonster multiplies each by the arena number). Retuned for the
  // multiplicative-gear economy (2026-07-16): the old boss DEF of arena×9 out-scaled weapon power so
  // even a maxed weapon did 1 damage to a late boss — a pre-existing softlock. DEF now scales gently
  // (boss arena×3.5) so a tier-appropriate weapon at +2 clears a boss in ~4-10 hits, an un-upgraded
  // one is a slog (upgrade incentive), and a maxed one is quick but never a one-shot. Verified by
  // simulation across arenas 3-65 (see rpg-combat-economy.md).
  var monsterRanks = [
    { difficulty: 'Easy',  hp: 10, mp: 20, attack: 2, defense: 0.6, reward: 20 },
    { difficulty: 'Elite', hp: 32, mp: 50, attack: 4, defense: 2,   reward: 75 },
    { difficulty: 'Boss',  hp: 70, mp: 80, attack: 7, defense: 3.5, reward: 140 }
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

  // Stats come from the BAL designer curves (economy.config.js / docs/balance-design.md):
  // one shared power curve drives boss HP/DEF/Cash, a solved table drives boss ATK, and rank
  // multipliers scale Easy/Elite down from the boss line. XP scales with arena so hero level
  // keeps pace with the requiredHeroLvl gate all the way to arena 65 (old flat-100 XP soft-locked
  // straight-through players around arena 40). Speed feeds the new dodge roll.
  function buildMonster(entry) {
    var rank = monsterRanks[entry.rank - 1];
    var m = BAL.RANK_MULT[entry.rank - 1];
    var r = entry.room;
    return {
      id: entry.id,
      room: r,
      rank: entry.rank,
      name: entry.name,
      maxHp: Math.max(5, Math.round(BAL.bossHp(r) * m.hp)),
      maxMp: rank.mp + r * 2,
      attack: Math.max(1, Math.round(BAL.bossAtk(r) * m.atk)),
      defense: Math.max(0, Math.round(BAL.bossDef(r) * m.def)),
      speed: BAL.monsterSpeed(r),
      reward: Math.max(5, Math.round(BAL.bossCash(r) * m.cash)),
      xp: BAL.killXp(r, entry.rank),
      difficulty: rank.difficulty,
      element: getMonsterElement(entry),
      // Grows at half the arena pace so late arenas stay reachable without endless grinding.
      requiredHeroLvl: Math.ceil(entry.room / 2) + (entry.rank - 1)
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

  // The 30-name catalog covers rooms 1-10; higher arenas CYCLE the roster with an
  // era suffix, and every stat/loot scales with the REAL arena number (65 arenas total).
  var MONSTER_ERAS = ['', ' Elite', ' Mega', ' Ultra', ' Cosmic', ' Omega', ' Astral'];
  function getRoomMonsters(room) {
    var base = ((room - 1) % 10) + 1;
    var eraIdx = Math.floor((room - 1) / 10);
    var era = (eraIdx < MONSTER_ERAS.length) ? MONSTER_ERAS[eraIdx] : ' Astral';   // '' is a valid era (rooms 1-10)
    return monsterCatalog.filter(function(m){ return m.room === base; }).map(function(entry){
      return buildMonster({
        id: 'r' + room + '_' + entry.rank,      // rooms 1-10 keep their original save keys
        room: room, rank: entry.rank,
        name: entry.name + era
      });
    });
  }

  function getRoomBoss(room) {
    return getRoomMonsters(room).find(function(m){ return m.rank === 3; });
  }

  // ---- Gauntlet sub-bosses: 2 brand-new monsters per room, fought back-to-back with no Hotel
  // access in between (module: monster-select "2-Boss"/"3-Boss Gauntlet" cards). They use the
  // already-verified Elite BAL curve (rank 2) so this adds new CONTENT without inventing a new,
  // unverified stat tier. Wu Xing element offsets (+4, +5≡+0) fall outside Easy/Elite/Boss's
  // (+1/+2/+3), so every arena's 5 monsters (Easy, Elite, Boss, 2 sub-bosses) cover all 5 elements
  // exactly once. rank:2 means they do NOT trigger the rank>=3 trophy/lore-fragment branch in
  // handleBattleVictory — only the real Boss (the 3rd link of the 3-chain) still does that, so the
  // arena-advance gate, trophies, and Star Log fragments are completely untouched by this feature.
  var gauntletCatalog = [
    { room: 1,  slot: 1, name: 'Chalk Wraith' },      { room: 1,  slot: 2, name: 'Detention Golem' },
    { room: 2,  slot: 1, name: 'Fossil Scorpion' },   { room: 2,  slot: 2, name: "Miner's Ghost" },
    { room: 3,  slot: 1, name: 'Grave Warden' },      { room: 3,  slot: 2, name: 'Plague Revenant' },
    { room: 4,  slot: 1, name: 'Dune Marauder' },     { room: 4,  slot: 2, name: 'Sphinx Riddler' },
    { room: 5,  slot: 1, name: 'Reef Shark King' },   { room: 5,  slot: 2, name: 'Whalebone Colossus' },
    { room: 6,  slot: 1, name: 'Thunder Wraith' },    { room: 6,  slot: 2, name: 'Squall Djinn' },
    { room: 7,  slot: 1, name: 'Ember Berserker' },   { room: 7,  slot: 2, name: 'Powderkeg Fiend' },
    { room: 8,  slot: 1, name: 'Umbral Stalker' },    { room: 8,  slot: 2, name: 'Widow Assassin' },
    { room: 9,  slot: 1, name: 'Magma Brute' },       { room: 9,  slot: 2, name: 'Meteor Warlord' },
    { room: 10, slot: 1, name: 'Nova Sentinel' },     { room: 10, slot: 2, name: 'Void Cruiser' }
  ];
  function buildSubBoss(entry) {
    var m = BAL.GAUNTLET_SUB_MULT;   // full Boss-tier — see economy.config.js for why
    var r = entry.room;
    return {
      id: 'r' + r + '_g' + entry.slot,
      room: r,
      rank: 2,   // stays 2 so handleBattleVictory's trophy/lore-fragment branch (rank>=3) fires
                 // only for the real Boss finale, not these — even though stats are Boss-tier.
      gauntletSlot: entry.slot,
      name: entry.name,
      maxHp: Math.max(5, Math.round(BAL.bossHp(r) * m.hp)),
      maxMp: monsterRanks[2].mp + r * 2,
      attack: Math.max(1, Math.round(BAL.bossAtk(r) * m.atk)),
      defense: Math.max(0, Math.round(BAL.bossDef(r) * m.def)),
      speed: BAL.monsterSpeed(r),
      reward: Math.max(5, Math.round(BAL.bossCash(r) * m.cash)),
      xp: BAL.killXp(r, 3),                     // full Boss XP payout — matches the stat tier
      difficulty: monsterRanks[2].difficulty,   // 'Boss' — bigger art, matches the real threat level
      element: ELEMENT_ORDER[(r + 3 + entry.slot) % ELEMENT_ORDER.length],
      requiredHeroLvl: Math.ceil(r / 2) + 2      // matches the real Boss's own gate formula
    };
  }
  function getGauntletSubBosses(room) {
    var base = ((room - 1) % 10) + 1;
    var eraIdx = Math.floor((room - 1) / 10);
    var era = (eraIdx < MONSTER_ERAS.length) ? MONSTER_ERAS[eraIdx] : ' Astral';
    return gauntletCatalog.filter(function(g){ return g.room === base; })
      .map(function(entry){ return buildSubBoss({ room: room, slot: entry.slot, name: entry.name + era }); })
      .sort(function(a, b){ return a.gauntletSlot - b.gauntletSlot; });
  }
  // size 2 = the two sub-bosses only; size 3 = sub-bosses + the arena's real Boss as the finale.
  function getGauntletChain(room, size) {
    var subs = getGauntletSubBosses(room);
    if (size === 2) return subs;
    var boss = getRoomBoss(room);
    return boss ? subs.concat([boss]) : subs;
  }

  function getMonsterLockReason(monster) {
    if (state.testMode) return '';   // admin/test account: every monster is unlocked (non-persistent, re-derived each session)
    if (monster.room > state.level) return 'Reach Arena ' + monster.room;
    if (state.heroLvl < monster.requiredHeroLvl) return 'Hero Lv. ' + monster.requiredHeroLvl;
    return '';
  }
  // The admin/test account can also RE-FIGHT any monster (the normal "defeated = gone forever" rule
  // is a per-save progression gate; for testing we ignore it). Pure read of state.testMode + the
  // defeated map — never persists anything, always false for real players.
  function isMonsterDefeated(key) {
    if (state.testMode) return false;
    return !!(state.defeatedMonsters && state.defeatedMonsters[key]);
  }

  function openBattle() {
    // Stepping into the Boss Room. If the player now leaves without beating the arena's boss,
    // the Boss Gate closes and the ARENA_GOAL requirement must be earned again (section 9).
    state.bossRoomEntered = true;
    el.equationView.classList.remove('active');
    el.shopView.classList.remove('active');
    el.battleView.classList.add('active');
    // The gate button now lives in the persistent header (visible across every view), so it's set to
    // its closed/grey state explicitly on entry — the player is already inside the boss room, so
    // there's nothing to re-enter. It reappears open via updatePanelVisibility if the player leaves
    // undefeated (gate re-earns) or on the next arena's own gate.
    if (typeof setGateButton === 'function') setGateButton(false);

    el.monsterSelectScreen.style.display = 'block';
    el.combatArenaScreen.style.display = 'none';
    el.battleFleeBtn.hidden = false;
    if (el.battleShopBtn) el.battleShopBtn.hidden = false;
    renderMonsterChoices();
    if (typeof playMusic === 'function') playMusic('arena');
  }

  // Aggregate lock reason for a gauntlet card: same-room check once, hero-level check against
  // the STRONGEST member (clearing the gate for the hardest link clears it for the whole chain).
  // `bonus` pushes the requirement ABOVE what the members alone would need — the 3-Boss card uses
  // this deliberately so it's not clearable just by meeting the normal arena-boss gate: reaching it
  // for real requires extra hero levels, i.e. Arena Infinity grinding (the only repeatable combat-XP
  // source, since regular monster kills are one-time) and/or Cash for early gear upgrades.
  function cardLockReason(members, bonus) {
    if (!members.length) return '';
    if (state.testMode) return '';
    if (members[0].room > state.level) return 'Reach Arena ' + members[0].room;
    var maxLvl = 0;
    members.forEach(function(m){ if (m.requiredHeroLvl > maxLvl) maxLvl = m.requiredHeroLvl; });
    maxLvl += (bonus || 0);
    if (state.heroLvl < maxLvl) return 'Hero Lv. ' + maxLvl;
    return '';
  }
  function gauntletMembersHtml(members) {
    return members.map(function(m, i){
      var dead = isMonsterDefeated(monsterKey(m));
      return '<div class="gauntlet-member' + (dead ? ' defeated' : '') + '">' +
          '<div class="gauntlet-member-art">' + getMonsterArtMarkup(m) + '</div>' +
          '<div class="gauntlet-member-name">' + m.name + (dead ? ' 💀' : '') + '</div>' +
          '<div class="gauntlet-member-el">' + elementBadgeHtml(m.element) + '</div>' +
          '<div class="gauntlet-member-stat">HP ' + m.maxHp + ' · ATK ' + m.attack + ' · DEF ' + m.defense + '</div>' +
        '</div>' +
        (i < members.length - 1 ? '<div class="gauntlet-arrow">→</div>' : '');
    }).join('');
  }
  function buildGauntletCard(members, label, icon, bonus) {
    var lockReason = cardLockReason(members, bonus);
    var isLocked = !!lockReason;
    var deadCount = members.filter(function(m){ return isMonsterDefeated(monsterKey(m)); }).length;
    var fullyCleared = deadCount === members.length;
    var card = document.createElement('div');
    card.className = 'monster-card-select gauntlet-card' + (fullyCleared ? ' defeated' : '') + (isLocked ? ' locked' : '');
    if (fullyCleared) {
      card.style.opacity = '0.45'; card.style.pointerEvents = 'none'; card.style.borderStyle = 'dotted'; card.style.filter = 'grayscale(0.6)';
    }
    card.innerHTML =
      '<div class="gauntlet-card-title">' + icon + ' ' + label + (fullyCleared ? ' ✅' : '') + '</div>' +
      (fullyCleared ? '<div class="gauntlet-cleared-banner">☑️ CLEARED</div>' : '') +
      '<div class="gauntlet-row">' + gauntletMembersHtml(members) + '</div>' +
      (deadCount > 0 && !fullyCleared ? '<div class="monster-select-stat gauntlet-progress">⏳ ' + deadCount + '/' + members.length + ' defeated — resume from here</div>' : '') +
      (isLocked ? ('<div class="monster-lock-note">🔒 Locked: ' + lockReason +
        (bonus ? ' — ♾️ grind Arena Infinity for extra hero XP to reach it' : '') + '</div>') : '');
    if (!fullyCleared && !isLocked) {
      card.addEventListener('click', function(){ startGauntletCard(members); });
    }
    return card;
  }
  // Entry point for the 2-Boss / 3-Boss cards: resume from the first not-yet-defeated member
  // (a prior mid-chain death already marked earlier members defeated via the normal kill flow).
  function startGauntletCard(members) {
    var remaining = members.filter(function(m){ return !isMonsterDefeated(monsterKey(m)); });
    if (!remaining.length) return;
    startCombat(remaining[0], remaining.slice(1), true);
  }

  // Builds the solo Easy-fight card for a given monster (unchanged behavior/markup either way).
  function buildEasyCard(easy) {
    var lockReason = getMonsterLockReason(easy);
    var isLocked = !!lockReason;
    var isDefeated = isMonsterDefeated(monsterKey(easy));
    var card = document.createElement('div');
    card.className = 'monster-card-select' + (isDefeated ? ' defeated' : '') + (isLocked ? ' locked' : '');
    if (isDefeated) {
      card.style.opacity = '0.4';
      card.style.pointerEvents = 'none';
      card.style.borderStyle = 'dotted';
    }
    card.innerHTML = `
      <div class="monster-card-art">${getMonsterArtMarkup(easy)}</div>
      <div class="monster-select-name">${easy.name} ${isDefeated ? '💀' : ''}</div>
      <div class="monster-select-el">${elementBadgeHtml(easy.element)}</div>
      ${isDefeated ? `<div class="monster-select-stat">☠️ DEFEATED (Gone Forever)</div>` : ''}
      ${isLocked ? `<div class="monster-lock-note">🔒 Locked: ${lockReason}</div>` : ''}
    `;
    if (!isDefeated && !isLocked) {
      card.addEventListener('click', function(){ startCombat(easy); });
    }
    return card;
  }

  // One arena's full row: an "Arena N" header + its 3 cards (Easy / 2-Boss / 3-Boss). Reusable so
  // every past arena can show its own live, clickable cards — not just the current one.
  function buildArenaCardRow(ar) {
    var roomMonsters = getRoomMonsters(ar);
    var easy = roomMonsters.find(function(m){ return m.rank === 1; });
    var chain2 = getGauntletChain(ar, 2);
    var chain3 = getGauntletChain(ar, 3);

    var wrap = document.createElement('div');
    wrap.className = 'arena-card-row';

    var header = document.createElement('div');
    header.className = 'arena-row-header';
    var topic = (typeof getArena === 'function') ? getArena(ar) : null;
    header.textContent = 'Arena ' + ar + (topic && topic.topic ? ' · ' + topic.topic : '');
    wrap.appendChild(header);

    var grid = document.createElement('div');
    grid.className = 'monster-choices-grid';
    if (easy) grid.appendChild(buildEasyCard(easy));
    grid.appendChild(buildGauntletCard(chain2, '2-Boss Gauntlet', '⚔️⚔️', 2));
    grid.appendChild(buildGauntletCard(chain3, '3-Boss Gauntlet', '⚔️⚔️⚔️', 5));
    wrap.appendChild(grid);

    return wrap;
  }

  function renderMonsterChoices() {
    el.monsterChoices.innerHTML = '';
    // The old checklist just listed monster names as read-only text — not actionable, and
    // superseded now that every past arena renders its own live, clickable cards below.
    var bountyBox = document.getElementById('bountyListContainer');
    if (bountyBox) bountyBox.style.display = 'none';

    // Every arena from the current one down to Arena 1 gets its own row of 3 real, clickable
    // cards — not just a summary. Most recent first so the arena you're actually in isn't buried
    // under 64 rows of history.
    for (var ar = state.level; ar >= 1; ar--) {
      el.monsterChoices.appendChild(buildArenaCardRow(ar));
    }

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

  // queue = remaining monsters to fight after this one (2-Boss/3-Boss gauntlets); locked = true
  // disables Escape for the whole chain (not just while queue is non-empty — the LAST fight in a
  // gauntlet has an empty queue but must stay locked, or fleeing it would still buy a free heal).
  function startCombat(monster, queue, locked) {
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
    if (el.combatEscapeBtn) {
      // Gauntlet fights disable Escape entirely — that's the "no chance to go to Hotel" rule;
      // letting the player flee mid-chain would just buy a free heal before resuming.
      el.combatEscapeBtn.style.display = activeCombat.gauntletLocked ? 'none' : 'inline-block';
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

    // XP scales with arena + rank (BAL.killXp) — the old flat 100 made hero level grow like
    // √kills and soft-locked the requiredHeroLvl gate around arena 40 (docs/balance-design.md).
    var victoryXp = (activeCombat && activeCombat.monster && activeCombat.monster.xp) ? activeCombat.monster.xp : 100;
    addHeroXp(victoryXp);

    updateStats();
    appendCombatLog(`Gained ${reward} 💵 Cash & +${victoryXp} XP!`, 'system');
    appendCombatLog(`Looted: ${lootStr}`, 'system');
    burst(10);
    if (typeof playSfx === 'function') playSfx('victory');

    // Gauntlet fights: the loot/cash are already credited above (every kill counts), but only
    // ONE combined chest shows — at the very end of the chain, not after each individual kill,
    // so a 2/3-Boss run feels like one continuous fight instead of a chest popup every link.
    if (activeCombat.gauntletLocked) {
      activeCombat.chainCash = (activeCombat.chainCash || 0) + reward;
      activeCombat.chainLoot = _mergeLoot(activeCombat.chainLoot, loot);
      if (activeCombat.queue && activeCombat.queue.length > 0) {
        // Mid-chain: no chest, just a quick toast so the kill still feels acknowledged.
        if (typeof showToast === 'function') showToast(`💰 +${reward} 💵 · Looted ${lootStr}`);
      } else if (typeof showVictoryChest === 'function') {
        showVictoryChest(activeCombat.chainLoot, activeCombat.chainCash);
      } else {
        showToast(`💰 +${activeCombat.chainCash} Cash · Looted ${lootSummary(activeCombat.chainLoot)}`);
      }
    } else if (typeof showVictoryChest === 'function') {
      showVictoryChest(loot, reward);
    } else {
      showToast(`💰 +${reward} Cash · Looted ${lootStr}`);
    }

    el.startCombatBtn.style.display = 'none';
    if (el.openSpellsBtn) el.openSpellsBtn.style.display = 'none';
    if (el.combatEscapeBtn) el.combatEscapeBtn.style.display = 'none';
    if (el.spellsPanel) el.spellsPanel.style.display = 'none';
    el.battleFleeBtn.hidden = true;

    // Mid-gauntlet victory: more foes queued in this chain — go straight to the next one, no
    // Advance/Return/Keep-Fighting options yet (those only apply once the whole chain is clear).
    if (activeCombat.queue && activeCombat.queue.length > 0) {
      var nextFoe = activeCombat.queue[0];
      el.postCombatBtn.style.display = 'inline-block';
      el.postCombatBtn.textContent = '⚔️ Next: ' + nextFoe.name + ' →';
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
    if (el.combatEscapeBtn) el.combatEscapeBtn.style.display = 'none';
    if (el.spellsPanel) el.spellsPanel.style.display = 'none';
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
    var chainLoot = activeCombat.chainLoot || null;
    startCombat(q[0], q.slice(1), true);
    activeCombat.chainCash = chainCash;
    activeCombat.chainLoot = chainLoot;
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

