  // ============================================================================
  // CONFIG · Spells — pure data. The turn-based status engine lives in
  // js/06-rpg-battle.js (castPlayerSpell + executeCombatRound). Freeze/poison/burn
  // are REAL multi-turn effects. targetType: 'enemy' | 'self'.
  // `cat` groups the in-combat spell menu (26-spells.js): 'attack' | 'control' |
  // 'recovery' — anything WITHOUT a cat lands in the ✨ Special tab automatically.
  // Add a spell = append an entry. See CONFIG_GUIDE.md.
  // ============================================================================
  var SPELL_CATS = [
    { key: 'attack',   label: '⚔️ Attack',   desc: 'Direct elemental damage' },
    { key: 'control',  label: '🌀 Control',  desc: 'Freeze, poison & debuffs' },
    { key: 'recovery', label: '💚 Recovery', desc: 'Heal yourself' },
    { key: 'special',  label: '✨ Special',  desc: 'Buffs & everything else' }
  ];
  var SPELLS = [
    // Elemental attacks (Wu Xing) — direct damage, respect element matchups
    { id: 'wood_strike',  name: 'Thorn Lash',    icon: '🌿', element: 'wood',  cat: 'attack',   manaCost: 6,  targetType: 'enemy', power: 22, statusEffect: null,        cooldown: 0, desc: 'A whip of living vine.' },
    { id: 'fire_strike',  name: 'Flame Burst',   icon: '🔥', element: 'fire',  cat: 'attack',   manaCost: 7,  targetType: 'enemy', power: 26, statusEffect: 'burn',      cooldown: 0, desc: 'Scorches and may set ablaze.' },
    { id: 'earth_strike', name: 'Stone Crush',   icon: '⛰️', element: 'earth', cat: 'attack',   manaCost: 8,  targetType: 'enemy', power: 30, statusEffect: null,        cooldown: 1, desc: 'A crushing boulder.' },
    { id: 'metal_strike', name: 'Blade Storm',   icon: '⚙️', element: 'metal', cat: 'attack',   manaCost: 7,  targetType: 'enemy', power: 27, statusEffect: 'armorbreak',cooldown: 1, desc: 'Whirling blades that shred armor.' },
    { id: 'water_strike', name: 'Tidal Lance',   icon: '💧', element: 'water', cat: 'attack',   manaCost: 7,  targetType: 'enemy', power: 25, statusEffect: null,        cooldown: 0, desc: 'A piercing jet of water.' },
    // Status / control
    { id: 'freeze',       name: 'Cryo Lock',     icon: '❄️', element: 'water', cat: 'control',  manaCost: 10, targetType: 'enemy', power: 8,  statusEffect: 'freeze',    duration: 2, cooldown: 2, desc: 'Freezes the enemy — it skips its turns.' },
    { id: 'poison',       name: 'Venom Cloud',   icon: '☠️', element: 'wood',  cat: 'control',  manaCost: 8,  targetType: 'enemy', power: 6,  statusEffect: 'poison',    duration: 3, cooldown: 1, desc: 'Poisons the enemy for several turns.' },
    { id: 'armor_break',  name: 'Armor Break',   icon: '💢', element: 'metal', cat: 'control',  manaCost: 9,  targetType: 'enemy', power: 10, statusEffect: 'armorbreak',duration: 3, cooldown: 2, desc: 'Lowers the enemy’s defense.' },
    { id: 'ai_hack',      name: 'AI Hack',       icon: '🖥️', element: 'metal', cat: 'control',  manaCost: 12, targetType: 'enemy', power: 18, statusEffect: 'stun',      duration: 1, cooldown: 3, desc: 'Hacks the robot — a big hit + brief stun.' },
    { id: 'chip_disrupt', name: 'Chip Disrupt',  icon: '⚡', element: 'metal', cat: 'control',  manaCost: 11, targetType: 'enemy', power: 14, statusEffect: 'weaken',    duration: 2, cooldown: 3, desc: 'Scrambles its chips — attack down.' },
    { id: 'accuracy_down',name: 'Static Veil',   icon: '🌫️', element: 'water', cat: 'control',  manaCost: 6,  targetType: 'enemy', power: 0,  statusEffect: 'blind',     duration: 2, cooldown: 2, desc: 'The enemy may miss.' },
    // Support (self)
    { id: 'heal',         name: 'Repair Wave',   icon: '💚', element: 'wood',  cat: 'recovery', manaCost: 8,  targetType: 'self',  power: 40, statusEffect: 'heal',      cooldown: 1, desc: 'Restores HP.' },
    // Unclassified (no cat) → ✨ Special tab
    { id: 'shield_up',    name: 'Aegis Field',   icon: '🛡️', element: 'earth', manaCost: 9,  targetType: 'self',  power: 0,  statusEffect: 'shield',    duration: 3, cooldown: 3, desc: 'A barrier — halves incoming damage.' },
    { id: 'speed_boost',  name: 'Overclock',     icon: '💨', element: 'metal', manaCost: 7,  targetType: 'self',  power: 0,  statusEffect: 'haste',     duration: 3, cooldown: 3, desc: 'Speeds you up — better dodge & crit.' }
  ];
