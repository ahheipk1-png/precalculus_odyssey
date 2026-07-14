  // ============================================================================
  // CONFIG · Spells — pure data. The turn-based status engine lives in
  // js/06-rpg-battle.js (castPlayerSpell + executeCombatRound). Freeze/poison/burn
  // are REAL multi-turn effects. targetType: 'enemy' | 'self'.
  // Add a spell = append an entry. See CONFIG_GUIDE.md.
  // ============================================================================
  var SPELLS = [
    // Elemental attacks (Wu Xing) — direct damage, respect element matchups
    { id: 'wood_strike',  name: 'Thorn Lash',    icon: '🌿', element: 'wood',  manaCost: 6,  targetType: 'enemy', power: 22, statusEffect: null,        cooldown: 0, desc: 'A whip of living vine.' },
    { id: 'fire_strike',  name: 'Flame Burst',   icon: '🔥', element: 'fire',  manaCost: 7,  targetType: 'enemy', power: 26, statusEffect: 'burn',      cooldown: 0, desc: 'Scorches and may set ablaze.' },
    { id: 'earth_strike', name: 'Stone Crush',   icon: '⛰️', element: 'earth', manaCost: 8,  targetType: 'enemy', power: 30, statusEffect: null,        cooldown: 1, desc: 'A crushing boulder.' },
    { id: 'metal_strike', name: 'Blade Storm',   icon: '⚙️', element: 'metal', manaCost: 7,  targetType: 'enemy', power: 27, statusEffect: 'armorbreak',cooldown: 1, desc: 'Whirling blades that shred armor.' },
    { id: 'water_strike', name: 'Tidal Lance',   icon: '💧', element: 'water', manaCost: 7,  targetType: 'enemy', power: 25, statusEffect: null,        cooldown: 0, desc: 'A piercing jet of water.' },
    // Status / control
    { id: 'freeze',       name: 'Cryo Lock',     icon: '❄️', element: 'water', manaCost: 10, targetType: 'enemy', power: 8,  statusEffect: 'freeze',    duration: 2, cooldown: 2, desc: 'Freezes the enemy — it skips its turns.' },
    { id: 'poison',       name: 'Venom Cloud',   icon: '☠️', element: 'wood',  manaCost: 8,  targetType: 'enemy', power: 6,  statusEffect: 'poison',    duration: 3, cooldown: 1, desc: 'Poisons the enemy for several turns.' },
    { id: 'armor_break',  name: 'Armor Break',   icon: '💢', element: 'metal', manaCost: 9,  targetType: 'enemy', power: 10, statusEffect: 'armorbreak',duration: 3, cooldown: 2, desc: 'Lowers the enemy’s defense.' },
    { id: 'ai_hack',      name: 'AI Hack',       icon: '🖥️', element: 'metal', manaCost: 12, targetType: 'enemy', power: 18, statusEffect: 'stun',      duration: 1, cooldown: 3, desc: 'Hacks the robot — a big hit + brief stun.' },
    { id: 'chip_disrupt', name: 'Chip Disrupt',  icon: '⚡', element: 'metal', manaCost: 11, targetType: 'enemy', power: 14, statusEffect: 'weaken',    duration: 2, cooldown: 3, desc: 'Scrambles its chips — attack down.' },
    // Support (self)
    { id: 'heal',         name: 'Repair Wave',   icon: '💚', element: 'wood',  manaCost: 8,  targetType: 'self',  power: 40, statusEffect: 'heal',      cooldown: 1, desc: 'Restores HP.' },
    { id: 'shield_up',    name: 'Aegis Field',   icon: '🛡️', element: 'earth', manaCost: 9,  targetType: 'self',  power: 0,  statusEffect: 'shield',    duration: 3, cooldown: 3, desc: 'A barrier — halves incoming damage.' },
    { id: 'speed_boost',  name: 'Overclock',     icon: '💨', element: 'metal', manaCost: 7,  targetType: 'self',  power: 0,  statusEffect: 'haste',     duration: 3, cooldown: 3, desc: 'Speeds you up — better dodge & crit.' },
    { id: 'accuracy_down',name: 'Static Veil',   icon: '🌫️', element: 'water', manaCost: 6,  targetType: 'enemy', power: 0,  statusEffect: 'blind',     duration: 2, cooldown: 2, desc: 'The enemy may miss.' }
  ];
