  // ============================================================================
  // CONFIG · Economy — currencies + AI chips/components + upgrade recipes + trading
  // Pure data. The interface shows Cash · Gold · Silver · Chips (user requirement).
  // ============================================================================

  // Spendable + tradeable currencies. Cash is state.coins; gold/silver live in
  // state.currencies. (Gems retired → migrated to gold + a quantum chip.)
  var CURRENCIES = {
    cash:   { name: 'Cash',   icon: '💵', field: 'coins' },
    gold:   { name: 'Gold',   icon: '🥇', field: 'currencies.gold' },
    silver: { name: 'Silver', icon: '🥈', field: 'currencies.silver' }
  };

  // AI chips / components — dropped by enemy robots, spent to upgrade gear.
  // tier drives drop rarity + trade value. "Chips" is the 4th headline resource.
  var CHIPS = {
    energy_core:     { name: 'Energy Core',     icon: '🔋', tier: 1, value: 12 },
    robotic_alloy:   { name: 'Robotic Alloy',   icon: '🔩', tier: 1, value: 16 },
    cpu:             { name: 'CPU',             icon: '🖥️', tier: 2, value: 40 },
    gpu:             { name: 'GPU',             icon: '🎮', tier: 2, value: 55 },
    neural_chip:     { name: 'Neural Processor', icon: '🧠', tier: 3, value: 90 },
    quantum_chip:    { name: 'Quantum Chip',    icon: '🔮', tier: 4, value: 160 },
    alien_processor: { name: 'Alien Processor', icon: '👾', tier: 5, value: 300 }
  };
  var CHIP_ORDER = ['energy_core', 'robotic_alloy', 'cpu', 'gpu', 'neural_chip', 'quantum_chip', 'alien_processor'];

  // Chips needed to reach a given upgrade level (on top of the Cash cost). Higher
  // gear rarity is handled by the Cash cost; chips scale with the target level.
  var UPGRADE_CHIP_RECIPES = {
    1: { energy_core: 3, robotic_alloy: 2 },
    2: { cpu: 2, gpu: 1 },
    3: { neural_chip: 2, quantum_chip: 1 }
  };

  // Gear upgrades MULTIPLY the item's base stat rather than adding a flat amount:
  //   +1 → ×2, +2 → ×3, +3 → ×5 the base (indexed by upgradeLvl; 0 = un-upgraded).
  // ONE ladder for every gear family (weapon power, shield/armor DEF, armor HP, shoe SPD) so a
  // fully-upgraded item is 5× its base. With gear tiers spaced ~2.5× apart (gear.config.js), a
  // maxed item (5×) beats the NEXT tier's base (2.5×) but stays under the tier-after-that (6.25×):
  // upgrading what you own is the smart mid-game play, yet buying up two tiers still matters.
  var UPGRADE_MULT = [1, 2, 3, 5];
  var GEAR_UPGRADE_MAX = 3;

  // Cash cost of each upgrade as a fraction of the item's own price, indexed by the CURRENT level
  // (0→reach +1, 1→reach +2, 2→reach +3). Totals 1.75× the item price for a full +3 — steep enough
  // that ×5 is a real investment, yet still cheaper than buying the next tier (≈2× the price, but
  // only 2.5× power un-upgraded). Chips are additionally required per UPGRADE_CHIP_RECIPES.
  var UPGRADE_COST_FRAC = [0.25, 0.5, 1.0];

  // Chip installed in a gear socket → flat stat bonus (Phase 4 socketing).
  var CHIP_BONUS = {
    energy_core:     { hp: 15 },
    robotic_alloy:   { defense: 4 },
    cpu:             { power: 8 },
    gpu:             { crit: 6 },
    neural_chip:     { power: 14, mp: 8 },
    quantum_chip:    { power: 22, speed: 4 },
    alien_processor: { power: 30, defense: 10, speed: 5 }
  };

  // Trading Room — base prices (Cash per unit) + volatility for gold/silver.
  var TRADING = {
    goods: ['gold', 'silver'],
    base:  { gold: 90, silver: 45 },
    minMult: 0.6, maxMult: 1.8, drift: 0.12
  };

  // ============================================================================
  // BAL — 2026-07-17 combat/economy balance curves. THE numbers live in
  // docs/balance-design.md — change them THERE first, then mirror here.
  // Everything derives from one designer table (AP_STAR = expected on-curve
  // total player AP per arena) + a solved boss-ATK table, piecewise-linear
  // interpolated. Damage is RATIO-based (C·AP·AP/(AP+DP)) — no subtraction walls.
  // ============================================================================
  function _balLerp(table, r){
    if (r <= table[0][0]) return table[0][1];
    for (var i = 1; i < table.length; i++){
      if (r <= table[i][0]){
        var a = table[i - 1], b = table[i];
        return a[1] + (b[1] - a[1]) * (r - a[0]) / (b[0] - a[0]);
      }
    }
    return table[table.length - 1][1];
  }
  var BAL = {
    AP_STAR: [[1,12],[5,30],[10,70],[15,115],[20,175],[25,265],[30,400],
              [35,600],[40,950],[45,1400],[50,1950],[55,2600],[60,3700],[65,5200]],
    BOSS_ATK: [[1,24],[5,38],[10,57],[15,75],[20,95],[25,118],[30,145],
               [35,177],[40,219],[45,266],[50,316],[55,370],[60,444],[65,530]],
    // rank index 0=Easy, 1=Elite, 2=Boss
    RANK_MULT: [
      { hp: 0.18, atk: 0.55, def: 0.50, cash: 0.15 },
      { hp: 0.45, atk: 0.80, def: 0.80, cash: 0.50 },
      { hp: 1.00, atk: 1.00, def: 1.00, cash: 1.00 }
    ],
    apStar:   function(r){ return Math.round(_balLerp(BAL.AP_STAR, r)); },
    bossHp:   function(r){ return Math.round(6.0 * _balLerp(BAL.AP_STAR, r)); },
    bossAtk:  function(r){ return Math.round(_balLerp(BAL.BOSS_ATK, r)); },
    bossDef:  function(r){ return Math.round(_balLerp(BAL.AP_STAR, r) / 3); },
    bossCash: function(r){ return Math.round(40 + 3 * _balLerp(BAL.AP_STAR, r)); },
    monsterSpeed: function(r){ return Math.round(2 + 0.6 * r); },
    killXp:   function(r, rank){ return (20 + 8 * r) * rank; },
    problemCash: function(r, rating){ return rating * (3 + Math.ceil(r / 2)); },
    ENEMY_COEFF: 0.75,        // monsters hit with C=0.75 (impressive stats, controlled damage)
    POWER_HIT_MULT: 1.5,      // "power hit" (crit) damage multiplier
    MONSTER_CRIT_BASE: 4,     // monster power-hit chance = base + 2×rank (%)
    DODGE_BASE: 5,            // dodge chance = clamp(base + (defSpd−atkSpd)×PER_SPD, MIN, MAX) %
    DODGE_PER_SPD: 0.8,
    DODGE_MIN: 2, DODGE_MAX: 25,
    HEAL_FRAC: 0.20,          // boss self-heal = 20% of maxHp…
    HEAL_COST_FRAC: 0.35,     // …costing 35% of maxMp (≈2 heals per fight at any arena)
    SPELL_FULL: 0.70, SPELL_WEAK: 0.20   // remaining 10% = total fizzle (MP spent, no effect)
  };
