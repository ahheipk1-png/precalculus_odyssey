  // ---------- Items, materials, loot & upgrade recipes (RPG Systems Expansion, phase R1) ----------
  // Loaded after 04-logic.js (needs the global `rand`) and before 05-render.js / 06-rpg-battle.js,
  // which call these helpers at runtime. Pure data + helpers; the only state touched is
  // `state.materials` (an id -> count map added in 01-data.js and persisted via 03-save.js).

  // The four materials. gem/gold/silver are the "precious things"; essence is the "part of the
  // body" every monster drops. cashValue is what they're worth when sold in the Trading Room (R2).
  var MATERIALS = {
    essence: { name: 'Monster Essence', icon: '🫀', cashValue: 10 },
    silver:  { name: 'Silver',          icon: '🥈', cashValue: 45 },
    gold:    { name: 'Gold',            icon: '🥇', cashValue: 90 },
    gem:     { name: 'Gem',             icon: '💎', cashValue: 180 }
  };
  var MATERIAL_ORDER = ['essence', 'silver', 'gold', 'gem'];

  // What a defeated monster drops. Fixed monster identity (per the "same for every player" rule),
  // but the loot ROLL is a per-kill reward — richer for higher ranks (1 Easy, 2 Elite, 3 Boss).
  // ---- Chip / currency economy (enemies are AI robots → drop AI chips + gold/silver) ----
  // Loot roll per kill — richer for higher ranks (1 Easy, 2 Elite, 3 Boss). See economy.config.js.
  // Drop table for one monster, derived from BOTH its rank (1 Easy / 2 Elite / 3 Boss) AND its
  // strength tier (arena 1-13 = tier 1 … arena 53-65 = tier 5). One source of truth: the same
  // spec drives the actual roll AND the "Drops:" preview on the monster card.
  // Each row: [chipId, min, max, chance%].
  function monsterDropSpec(monster){
    var r = monster.rank || 1;
    var t = 1 + Math.floor((((monster.room || 1) - 1)) / 13);      // strength tier 1..5
    var spec = [];
    spec.push(['energy_core', 1, r + t, 100]);
    spec.push(['robotic_alloy', 1, Math.max(1, r + t - 2), 40 + r * 10 + t * 5]);
    if (r >= 2 || t >= 2) spec.push(['cpu', 1, Math.max(1, Math.floor((r + t) / 2)), 45 + t * 5]);
    if ((r >= 2 && t >= 2) || t >= 3) spec.push(['gpu', 1, (t >= 4 ? 2 : 1), 30 + t * 5]);
    if (r >= 3 || t >= 3) spec.push(['neural_chip', 1, (t >= 3 ? 2 : 1), (r >= 3 ? 60 : 30)]);
    if ((r >= 3 && t >= 2) || t >= 4) spec.push(['quantum_chip', 1, 1, (r >= 3 ? 45 : 25)]);
    if (r >= 3 && t >= 4) spec.push(['alien_processor', 1, 1, (t >= 5 ? 100 : 35)]);
    return { spec: spec, tier: t, gold: [Math.max(0, t - 1), r + t - 1], silver: [1, r + t] };
  }

  function rollMonsterLoot(monster){
    var d = monsterDropSpec(monster);
    var loot = { chips: {}, gold: 0, silver: 0 };
    d.spec.forEach(function(s){
      if (rand(1, 100) <= s[3]){ var n = rand(s[1], s[2]); if (n > 0) loot.chips[s[0]] = n; }
    });
    loot.gold = rand(d.gold[0], d.gold[1]);
    loot.silver = rand(d.silver[0], d.silver[1]);
    return loot;
  }

  // Kid-facing "Drops: 🔋1–4 🖥️1–2? 🥇0–3 🥈1–4" line ("?" = not guaranteed).
  function monsterDropPreview(monster){
    var d = monsterDropSpec(monster);
    var parts = d.spec.map(function(s){
      var icon = (typeof CHIPS !== 'undefined' && CHIPS[s[0]]) ? CHIPS[s[0]].icon : '🧩';
      return icon + (s[1] === s[2] ? s[2] : (s[1] + '–' + s[2])) + (s[3] < 100 ? '?' : '');
    });
    parts.push('🥇' + d.gold[0] + '–' + d.gold[1]);
    parts.push('🥈' + d.silver[0] + '–' + d.silver[1]);
    return parts.join(' ');
  }

  // Chips needed to reach a given upgrade level (on TOP of the Cash cost). Better gear demands
  // more ADVANCED processors: common gear runs on cores/alloy, Legendary needs CPUs/GPUs, the
  // Archive/Stellar tiers need Neural + Quantum chips, and Rift/Odyssey gear wants Alien
  // Processors. Each recipe uses 1-3 chip types.
  var _RARITY_CHIP_TIER = { common: 1, legendary: 2, archive: 3, stellar: 3, rift: 4, odyssey: 4 };
  var _UPGRADE_RECIPES_BY_TIER = {
    1: { 1: { energy_core: 3 },
         2: { energy_core: 4, robotic_alloy: 2 },
         3: { robotic_alloy: 3, cpu: 1 } },
    2: { 1: { energy_core: 5, cpu: 1 },
         2: { cpu: 2, gpu: 1 },
         3: { cpu: 2, gpu: 2, neural_chip: 1 } },
    3: { 1: { cpu: 3, neural_chip: 1 },
         2: { neural_chip: 2, quantum_chip: 1 },
         3: { neural_chip: 2, quantum_chip: 2, alien_processor: 1 } },
    4: { 1: { neural_chip: 2, quantum_chip: 1 },
         2: { quantum_chip: 2, alien_processor: 1 },
         3: { quantum_chip: 3, alien_processor: 2, neural_chip: 2 } }
  };
  function getUpgradeRecipe(nextLevel, item){
    var tier = (item && _RARITY_CHIP_TIER[item.rarity]) || 1;
    var byLevel = _UPGRADE_RECIPES_BY_TIER[tier] || _UPGRADE_RECIPES_BY_TIER[1];
    if (byLevel[nextLevel]) return byLevel[nextLevel];
    // legacy fallback (economy.config.js) for any level outside 1-3
    return (typeof UPGRADE_CHIP_RECIPES !== 'undefined' && UPGRADE_CHIP_RECIPES[nextLevel])
      || byLevel[3] || { energy_core: 3 };
  }

  function chipTotal(){ var t = 0; for (var k in state.chips) t += (state.chips[k] || 0); return t; }
  function addChips(map){ if (!map) return; for (var k in map){ state.chips[k] = (state.chips[k] || 0) + map[k]; } }
  function hasChips(recipe){ return Object.keys(recipe).every(function(k){ return (state.chips[k] || 0) >= recipe[k]; }); }
  function spendChips(recipe){ Object.keys(recipe).forEach(function(k){ state.chips[k] = (state.chips[k] || 0) - recipe[k]; }); }
  function chipsSummary(map){
    return CHIP_ORDER.filter(function(k){ return map[k]; }).map(function(k){ return CHIPS[k].icon + map[k]; }).join(' ');
  }
  function addCurrency(gold, silver){
    if (!state.currencies) state.currencies = { gold: 0, silver: 0 };
    state.currencies.gold = (state.currencies.gold || 0) + (gold || 0);
    state.currencies.silver = (state.currencies.silver || 0) + (silver || 0);
  }
  // Compact loot/recipe string for chests & toasts: "💵12 🥈2 🔋3 🖥️1".
  function lootSummary(loot){
    var parts = [];
    if (loot.cash)   parts.push('💵' + loot.cash);
    if (loot.gold)   parts.push('🥇' + loot.gold);
    if (loot.silver) parts.push('🥈' + loot.silver);
    if (loot.chips)  { var s = chipsSummary(loot.chips); if (s) parts.push(s); }
    return parts.join(' ');
  }

  // --- Back-compat shims: old material calls now route to chips/currency ---
  function hasMaterials(recipe){ return hasChips(recipe); }
  function spendMaterials(recipe){ spendChips(recipe); }
  function addMaterials(loot){ // used to take {essence,silver,gold,gem}; now {chips,gold,silver}
    if (loot.chips) addChips(loot.chips);
    if (loot.gold || loot.silver) addCurrency(loot.gold, loot.silver);
  }

  // Cash · Gold · Silver · Chips chip-row (shop + Profile). "Chips" = AI components.
  function renderMaterialsBar(){
    if (!el.materialsBar) return;
    var c = state.currencies || { gold: 0, silver: 0 };
    var parts = [
      '<span class="mat-chip mat-cash" title="Cash">💵 ' + state.coins + '</span>',
      '<span class="mat-chip" title="Gold">🥇 ' + (c.gold || 0) + '</span>',
      '<span class="mat-chip" title="Silver">🥈 ' + (c.silver || 0) + '</span>'
    ];
    CHIP_ORDER.forEach(function(k){
      var n = state.chips[k] || 0;
      if (n > 0) parts.push('<span class="mat-chip" title="' + CHIPS[k].name + '">' + CHIPS[k].icon + ' ' + n + '</span>');
    });
    el.materialsBar.innerHTML = parts.join('');
  }

  // ---------- Consumables & ingredients (Item Store 🎒 / Alchemy Lab 🧪 / Farm 🌾) ----------
  // Counts live in state.inventory (id -> count, persisted). price 0 = not sold anywhere
  // (craft-only); feed/fertilizer are sold at the Farm's market, the rest at the Item Store.
  var ITEMS = {
    potion:         { name: 'Potion',         icon: '🧪', price: 30, desc: 'Restores 50 HP.' },
    ether:          { name: 'Ether',          icon: '💧', price: 25, desc: 'Restores 10 MP.' },
    moon_herb:      { name: 'Moon Herb',      icon: '🌿', price: 20, desc: 'Laboratory ingredient.' },
    star_dew:       { name: 'Star Dew',       icon: '✨', price: 35, desc: 'Laboratory ingredient.' },
    super_medicine: { name: 'Super Medicine', icon: '💊', price: 0,  desc: 'Fully restores HP & MP. Synthesized at the Laboratory.' },
    poison_vial:    { name: 'Acid Vial',      icon: '⚗️', price: 0,  desc: 'Douses the next monster in acid — it corrodes for 3 rounds. Synthesized at the Laboratory.' },
    feed:           { name: 'Animal Feed',    icon: '🌾', price: 15, desc: 'Feeds one farm animal so it can grow up.' },
    fertilizer:     { name: 'Fertilizer',     icon: '🪴', price: 15, desc: 'Fertilizes one crop so it matures after 1 planet of practice.' }
  };
  var ITEM_ORDER = ['potion', 'ether', 'moon_herb', 'star_dew', 'super_medicine', 'poison_vial', 'feed', 'fertilizer'];

  function countItem(id){ return state.inventory[id] || 0; }
  function addItem(id, n){ state.inventory[id] = (state.inventory[id] || 0) + (n || 1); }
  function spendItem(id, n){
    n = n || 1;
    if (countItem(id) < n) return false;
    state.inventory[id] -= n;
    return true;
  }

  // Use a consumable from the inventory. Returns { ok, msg }; the caller shows the toast.
  // feed/fertilizer are "used" by the Farm itself (18-farm.js spends them directly).
  function useItem(id){
    if (countItem(id) < 1) return { ok: false, msg: 'You don’t have any ' + (ITEMS[id] ? ITEMS[id].name : id) + '.' };
    switch (id) {
      case 'potion':
        if (state.playerHp >= state.playerMaxHp) return { ok: false, msg: 'HP is already full!' };
        spendItem(id);
        state.playerHp = Math.min(state.playerMaxHp, state.playerHp + 50);
        return { ok: true, msg: '🧪 +50 HP! (' + state.playerHp + '/' + state.playerMaxHp + ')' };
      case 'ether':
        if (state.playerMp >= state.playerMaxMp) return { ok: false, msg: 'MP is already full!' };
        spendItem(id);
        state.playerMp = Math.min(state.playerMaxMp, state.playerMp + 10);
        return { ok: true, msg: '💧 +10 MP! (' + state.playerMp + '/' + state.playerMaxMp + ')' };
      case 'super_medicine':
        if (state.playerHp >= state.playerMaxHp && state.playerMp >= state.playerMaxMp) return { ok: false, msg: 'HP & MP are already full!' };
        spendItem(id);
        state.playerHp = state.playerMaxHp;
        state.playerMp = state.playerMaxMp;
        return { ok: true, msg: '💊 Super Medicine — HP & MP fully restored!' };
      case 'poison_vial':
        if (state.poisonArmed) return { ok: false, msg: 'An Acid Vial is already prepared for the next battle.' };
        spendItem(id);
        state.poisonArmed = true;
        return { ok: true, msg: '⚗️ Acid prepared! The next monster you battle will corrode.' };
      default:
        return { ok: false, msg: (ITEMS[id] ? ITEMS[id].name : 'That') + ' is used at the Farm.' };
    }
  }

  // ---------- Wonderland pass economy ----------
  // Called from advanceToNextLevel with the level being COMPLETED (before level++).
  // First-ever completion of a planet: 5 passes, unconditional ("new planet" bonus).
  // Replays (via the Worm Hole) only pay out for PERFECT rooms (zero wrong answers),
  // on a diminishing schedule: 4 passes for the next 4 perfect clears, then 3 (×5),
  // then 2 (×6), then always 1. Non-perfect replays earn nothing.
  function awardWonderPasses(level, perfect){
    if (!state.passEarns) state.passEarns = {};
    var rec = state.passEarns[level] || { first: false, perfects: 0 };
    var earned = 0;
    if (!rec.first) {
      earned = 5;
      rec.first = true;
    } else if (perfect) {
      var p = rec.perfects;
      if (p < 4) earned = 4;
      else if (p < 9) earned = 3;
      else if (p < 15) earned = 2;
      else earned = 1;
      rec.perfects = p + 1;
    }
    state.passEarns[level] = rec;
    if (earned > 0) state.wonderPasses = (state.wonderPasses || 0) + earned;
    return earned;
  }
