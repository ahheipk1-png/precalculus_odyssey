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
