  // ============================================================================
  // CONFIG · Gear catalogue — weapons, shields, armor, shoes (pure data)
  // Attack weapons are SWORDS ONLY (per the user's request — no bows/spears/staves/heavy).
  // The 5 legendary swords + 5 legendary shoes each carry a Wu Xing element, a rarity
  // tier, and 3 AI-chip sockets. Starter gear is kept so existing saves keep their
  // progression. Stylized SVG art is generated in js/21-catalogue.js.
  // Add a sword = append one _wpn(...,'sword',...) line. See CONFIG_GUIDE.md.
  // ============================================================================

  // Rarity → stat multiplier + frame color + lore (from the image's rarity tiers).
  var GEAR_RARITY = {
    common:    { mult: 1.00, color: '#9fb0c0', label: 'Common' },
    legendary: { mult: 1.55, color: '#f2c14e', label: 'Legendary' },        // gold — endgame
    archive:   { mult: 1.95, color: '#b56cff', label: 'Archive Legendary' }, // purple — ancient human AI
    stellar:   { mult: 2.35, color: '#5aa9ff', label: 'Stellar Legendary' }, // blue — interstellar AI
    rift:      { mult: 2.80, color: '#ff5a5a', label: 'Rift Legendary' },    // red — other-universe tech
    odyssey:   { mult: 3.40, color: '#ff9e3d', label: 'Odyssey Legendary' }  // orange — unique story weapon
  };
  var RARITY_ORDER = ['common', 'legendary', 'archive', 'stellar', 'rift', 'odyssey'];

  // Per-category base stats + display icon.
  var WEAPON_CATS = {
    sword: { atk: 42, spd: 5, icon: '⚔️' }
  };

  // Sword prices per rarity. The gaps WIDEN ≈2× at each tier so that fully UPGRADING your current
  // sword (see UPGRADE_COST_FRAC in economy.config.js — ~1.75× the item's price for a full ×5) is
  // the sensible, cheaper bridge while you save for the next, far pricier tier. Buying the next
  // tier costs ~2× MORE than your current item yet only grants 2.5× power un-upgraded, whereas
  // maxing your current item grants 5× — so upgrading is the mid-game value play.
  var WEAPON_COST = { common: 150, legendary: 700, archive: 1600, stellar: 3200, rift: 6000, odyssey: 10000 };

  // Sword ATTACK POWER per rarity — its own table (not GEAR_RARITY.mult), tiers spaced ≈2.5× apart.
  // Upgrades MULTIPLY this base (×2/×3/×5 at +1/+2/+3, see economy.config.js UPGRADE_MULT), so a
  // fully-upgraded sword (×5) lands at 2× the NEXT tier's base but stays under the tier-after-that:
  // upgrading beats buying one tier up, yet buying up two tiers still matters. Bases are anchored
  // low (legendary 30) BECAUSE the ×5 ceiling does the heavy lifting; a freshly-bought higher tier
  // is intentionally weaker than your maxed current sword until you re-upgrade it.
  var WEAPON_POWER = { common: 12, legendary: 30, archive: 75, stellar: 188, rift: 470, odyssey: 1175 };

  // Defensive / utility gear uses the SAME ×2/×3/×5 multiplicative upgrade and the SAME ~2.5×
  // tier spacing for its PRIMARY stat (shield DEF, armor DEF). Secondary pools grow gentler so
  // they don't balloon: armor's HP bonus steps ~2×, shoe SPEED ~1.5× (speed is a minor turn-order
  // stat). Every stat still multiplies by UPGRADE_MULT on upgrade, unifying shop display & combat.
  // Speed is a COSMETIC stat (shown in the profile only — combat never reads it), so its ladder is
  // kept small; the ×2/×3/×5 upgrade still applies for display consistency.
  var SHOE_SPEED  = { legendary: 8,   archive: 14,   stellar: 22,   rift: 34,   odyssey: 52 };
  var SHOE_COST   = { legendary: 500, archive: 1200, stellar: 2400, rift: 4400, odyssey: 7000 };
  // DEF is a FLAT damage-subtraction, so with the ×5 upgrade its bases are anchored deliberately
  // LOW (well under weapon power) — un-upgraded defence still takes real damage, and only heavy
  // investment (+2/+3) makes you tanky (a reward, not a wall). Tiers stay ~2.5× apart.
  var SHIELD_DEF  = { legendary: 8,   archive: 20,   stellar: 50,   rift: 125,  odyssey: 312 };
  var SHIELD_COST = { legendary: 600, archive: 1400, stellar: 2800, rift: 5200, odyssey: 8000 };
  var ARMOR_DEF   = { legendary: 5,   archive: 13,   stellar: 32,   rift: 80,   odyssey: 200 };
  var ARMOR_HP    = { legendary: 30,  archive: 60,   stellar: 120,  rift: 240,  odyssey: 480 };
  var ARMOR_COST  = { legendary: 650, archive: 1500, stellar: 3000, rift: 5600, odyssey: 8500 };

  // Compact weapon builder → full def (pure data assembly at load).
  function _wpn(id, name, cat, el, rar) {
    var c = WEAPON_CATS[cat], r = GEAR_RARITY[rar];
    return {
      id: id, name: name, category: cat, element: el, rarity: rar,
      power: WEAPON_POWER[rar] || Math.round(c.atk * r.mult),
      speed: c.spd,
      crit: 5 + Math.round((r.mult - 1) * 8),
      cost: WEAPON_COST[rar] || Math.round(650 * r.mult),
      chipSlots: 3, uniqueAnim: true,
      owned: false, upgradeLvl: 0,
      desc: name + ' — a ' + r.label + ' ' + cat + ' of ' + el + '.'
    };
  }

  var STARTER_WEAPONS = [
    { id: 'wood_sword',     name: 'Wooden Sword',   category: 'sword', element: 'wood',  rarity: 'common', power: 2,  speed: 3, crit: 2, cost: 0,   chipSlots: 0, owned: true,  upgradeLvl: 0, desc: 'A humble training sword.' },
    { id: 'bronze_dagger',  name: 'Bronze Dagger',  category: 'sword', element: 'metal', rarity: 'common', power: 8,  speed: 6, crit: 7, cost: 60,  chipSlots: 0, owned: false, upgradeLvl: 0, desc: 'Quick and light.' },
    { id: 'iron_broadsword',name: 'Iron Broadsword',category: 'sword', element: 'metal', rarity: 'common', power: 20, speed: 3, crit: 4, cost: 220, chipSlots: 0, owned: false, upgradeLvl: 0, desc: 'Heavy and reliable.' }
  ];

  // ---- The 5 legendary swords (one per Wu Xing element) ----
  var LEGENDARY_WEAPONS = [
    // Swords — all five elements are represented so Wu Xing matchups stay meaningful.
    _wpn('axiom_blade',        'Axiom Blade',          'sword', 'metal', 'legendary'),
    _wpn('solar_meridian',     'Solar Meridian',       'sword', 'fire',  'rift'),
    _wpn('tidal_paradox',      'Tidal Paradox',        'sword', 'water', 'stellar'),
    _wpn('verdant_recursion',  'Verdant Recursion',    'sword', 'wood',  'legendary'),
    _wpn('gravity_keystone',   'Gravity Keystone',     'sword', 'earth', 'archive')
  ];
  var WEAPONS = STARTER_WEAPONS.concat(LEGENDARY_WEAPONS);

  // ---- Shoes (speed gear): starter + the 5 legendary shoes from the image ----
  function _shoe(id, name, el, rar) {
    var r = GEAR_RARITY[rar];
    return { id: id, name: name, category: 'shoes', element: el, rarity: rar,
      speed: SHOE_SPEED[rar] || Math.round(6 * r.mult), cost: SHOE_COST[rar] || Math.round(400 * r.mult),
      chipSlots: 2, owned: false, upgradeLvl: 0,
      desc: name + ' — ' + r.label + ' boots of ' + el + ' (+speed).' };
  }
  var SHOES = [
    { id: 'basic_boots', name: 'Traveler Boots', category: 'shoes', element: 'earth', rarity: 'common', speed: 2, cost: 0, chipSlots: 0, owned: true, upgradeLvl: 0, desc: 'Simple boots. A little faster.' },
    _shoe('swift_equation_boots','Swift Equation Boots','metal','legendary'),
    _shoe('cloud_strider_treads','Cloud Strider Treads','wood', 'stellar'),
    _shoe('tidal_surfer_greaves','Tidal Surfer Greaves','water','stellar'),
    _shoe('inferno_dashers',     'Inferno Dashers',     'fire', 'rift'),
    _shoe('stonewall_stompers',  'Stonewall Stompers',  'earth','archive')
  ];

  // ---- Shields: starter + one legendary per element ----
  function _shield(id, name, el, rar) {
    var r = GEAR_RARITY[rar];
    return { id: id, name: name, category: 'shield', element: el, rarity: rar,
      defense: SHIELD_DEF[rar] || Math.round(24 * r.mult), cost: SHIELD_COST[rar] || Math.round(500 * r.mult),
      chipSlots: 2, owned: false, upgradeLvl: 0,
      desc: name + ' — ' + r.label + ' shield of ' + el + '.' };
  }
  var SHIELDS = [
    { id: 'leather_buckler', name: 'Leather Buckler', category: 'shield', element: 'wood',  rarity: 'common', defense: 0,  cost: 0,   chipSlots: 0, owned: true,  upgradeLvl: 0, desc: 'Basic starter shield.' },
    { id: 'wood_shield',     name: 'Wooden Shield',   category: 'shield', element: 'wood',  rarity: 'common', defense: 2,  cost: 30,  chipSlots: 0, owned: false, upgradeLvl: 0, desc: 'Light wooden guard.' },
    { id: 'iron_shield',     name: 'Iron Kite Shield',category: 'shield', element: 'metal', rarity: 'common', defense: 5,  cost: 80,  chipSlots: 0, owned: false, upgradeLvl: 0, desc: 'Sturdy iron kite.' },
    { id: 'aegis_shield',    name: "Knight's Aegis",  category: 'shield', element: 'metal', rarity: 'common', defense: 11, cost: 180, chipSlots: 1, owned: false, upgradeLvl: 0, desc: 'A knight’s pride.' },
    { id: 'crystal_shield',  name: 'Crystal Shield',  category: 'shield', element: 'water', rarity: 'common', defense: 25, cost: 380, chipSlots: 1, owned: false, upgradeLvl: 0, desc: 'Shimmering crystal.' },
    _shield('aegis_of_sol',   'Aegis of Sol',        'fire',  'legendary'),
    _shield('tide_bulwark',   'Tide Bulwark',        'water', 'archive'),
    _shield('grove_rampart',  'Grove Rampart',       'wood',  'legendary'),
    _shield('tectonic_wall',  'Tectonic Wall',       'earth', 'stellar'),
    _shield('mirror_paradox', 'Mirror Paradox',      'metal', 'rift')
  ];

  // ---- Armor (new gear slot): starter + one legendary per element ----
  function _armor(id, name, el, rar) {
    var r = GEAR_RARITY[rar];
    return { id: id, name: name, category: 'armor', element: el, rarity: rar,
      defense: ARMOR_DEF[rar] || Math.round(16 * r.mult), hp: ARMOR_HP[rar] || Math.round(30 * r.mult), cost: ARMOR_COST[rar] || Math.round(450 * r.mult),
      chipSlots: 2, owned: false, upgradeLvl: 0,
      desc: name + ' — ' + r.label + ' armor of ' + el + ' (+DEF & max HP).' };
  }
  var ARMOR = [
    { id: 'cloth_tunic', name: 'Cloth Tunic', category: 'armor', element: 'wood', rarity: 'common', defense: 0, hp: 0, cost: 0, chipSlots: 0, owned: true, upgradeLvl: 0, desc: 'Simple cloth. No protection to speak of.' },
    _armor('solar_carapace', 'Solar Carapace',  'fire',  'legendary'),
    _armor('abyssal_plate',  'Abyssal Plate',   'water', 'archive'),
    _armor('bramble_mail',   'Bramble Mail',    'wood',  'legendary'),
    _armor('bedrock_aegis',  'Bedrock Aegis',   'earth', 'stellar'),
    _armor('chrome_exosuit', 'Chrome Exosuit',  'metal', 'rift')
  ];
