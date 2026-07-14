  // ============================================================================
  // CONFIG · Wu Xing (五行) Five Elements — pure data. Logic in js/21-catalogue.js
  // area (elementMultiplier). Two real cycles, not a flat rock-paper-scissors.
  //   Generating (相生): Wood → Fire → Earth → Metal → Water → Wood  (ally boost)
  //   Overcoming (相克):  Wood → Earth → Water → Fire → Metal → Wood  (super-effective)
  // ============================================================================
  var ELEMENTS = {
    wood:  { name: 'Wood',  cn: '木', icon: '🌿', color: '#57b45a' },
    fire:  { name: 'Fire',  cn: '火', icon: '🔥', color: '#f0705e' },
    earth: { name: 'Earth', cn: '土', icon: '⛰️', color: '#e0b24a' },
    metal: { name: 'Metal', cn: '金', icon: '⚙️', color: '#c9d1d9' },
    water: { name: 'Water', cn: '水', icon: '💧', color: '#5aa9ff' }
  };
  var ELEMENT_ORDER = ['wood', 'fire', 'earth', 'metal', 'water'];

  // Generating cycle: key feeds value (an ally/support relationship).
  var WUXING_GENERATES = { wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood' };
  // Overcoming cycle: key overcomes value (super-effective against).
  var WUXING_OVERCOMES = { wood: 'earth', earth: 'water', water: 'fire', fire: 'metal', metal: 'wood' };

  // Damage multipliers used by combat (see elementMultiplier in js/21-catalogue.js):
  //   attacker overcomes defender → OVER (super effective)
  //   defender overcomes attacker → UNDER (resisted)
  //   attacker generates defender → slight bonus (SUPPORT)
  //   'all' element (Prism of the Five Phases) is neutral-strong vs everything.
  var WUXING_MULT = { over: 1.6, support: 1.15, neutral: 1.0, under: 0.66 };
