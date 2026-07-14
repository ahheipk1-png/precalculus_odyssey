  // ============================================================================
  // CONFIG · Planet content — Worm Hole codes, planet titles, formula bank, scenes
  // Pure data, loaded before the logic modules. (File named rooms.config.js for
  // history; "room" === "planet".) See CONFIG_GUIDE.md.
  // ============================================================================

  // Worm Hole passwords, one per planet (indexed by planet number - 1).
  var levelCodes = ['SEED', 'GROW', 'ROOT', 'WIND', 'LAKE', 'FIRE', 'SAND', 'VOID', 'HERO', 'STAR'];

  // Planet title shown in the HUD (indexed by planet number - 1).
  var levelTitles = ['Apprentice','Explorer','Scholar','Champion','Master','Formula Novice','Formula Adept','Formula Expert','Formula Master','Grand Master'];

  // Change-of-subject formula problems (used by the formula mode, planets 6-10).
  var formulaBank = [
    { label: 'Motion: final velocity', original: 'v = u + at', subject: 'a', coeff: 't', add: 'u', addSign: 1, result: 'v' },
    { label: 'Newton’s second law', original: 'F = ma', subject: 'a', coeff: 'm', add: null, addSign: 1, result: 'F' },
    { label: 'Straight line graph', original: 'y = mx + c', subject: 'x', coeff: 'm', add: 'c', addSign: 1, result: 'y' },
    { label: 'Rectangle area', original: 'A = lw', subject: 'l', coeff: 'w', add: null, addSign: 1, result: 'A' },
    { label: 'Ohm’s law', original: 'V = IR', subject: 'I', coeff: 'R', add: null, addSign: 1, result: 'V' },
    { label: 'Work done', original: 'W = Fd', subject: 'F', coeff: 'd', add: null, addSign: 1, result: 'W' },
    { label: 'Simple sum', original: 'z = x + y', subject: 'x', coeff: null, add: 'y', addSign: 1, result: 'z' },
    { label: 'Simple difference', original: 'n = p − q', subject: 'p', coeff: null, add: 'q', addSign: -1, result: 'n' },
    { label: 'Cost line', original: 'y = mx − c', subject: 'x', coeff: 'm', add: 'c', addSign: -1, result: 'y' },
    { label: 'Distance, speed, time', original: 'd = rt', subject: 'r', coeff: 't', add: null, addSign: 1, result: 'd' }
  ];

  // Reward-scene captions per planet, one string per growth stage (indexed by planet number - 1).
  var sceneCaptions = [
    ['A tiny seed is planted...','A sprout appears!','Leaves unfurl...','A bud is forming...','It bloomed! 🌼'],
    ['Tying the balloon...','A little air...','Filling up...','Almost full!','Away it floats! 🎈'],
    ['Laying the foundation...','First pillar rises!','Second pillar rises!','The deck goes in!','Bridge complete! 🎉'],
    ['Marking out the sand...','Base block built!','Tower rising!','Almost there!','Castle complete! 🏰'],
    ['Clouds are gathering...','First arc of color!','More colors appear!','Almost a full arc!','Rainbow complete! 🌈'],
    ['A wild monster appears...','It looks curious...','Ears perk up...','It’s warming up to you!','New friend made! 👋'],
    ['Wrapping paper ready...','The box takes shape...','Ribbon going on...','Almost wrapped!','Gift complete! 🎁'],
    ['A caterpillar inches along...','Munching along...','Antennae wiggle...','Almost time...','A butterfly emerges! 🦋'],
    ['Fuses are lit...','First spark flies!','More sparks fly...','Building up...','Fireworks burst! 🎆'],
    ['Fueling the rocket...','Engines rumble...','Liftoff begins...','Climbing higher...','Blast off! 🚀']
  ];
