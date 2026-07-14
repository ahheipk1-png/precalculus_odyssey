  // ============================================================================
  // CONFIG · Star Systems & the Chapter registry   (pure data, no behavior)
  // ----------------------------------------------------------------------------
  // Loaded BEFORE the logic modules. The 187-arena curriculum (curriculum.config.js,
  // loaded right after this) groups every planet into ONE region per math world and
  // stamps arenaStart/arenaEnd/planets onto each STAR_SYSTEMS entry at load. Each
  // region is anchored by a real lead star; the individual planets are real bodies
  // (with a few clearly-marked imagined stations/comets). See CONFIG_GUIDE.md.
  // ============================================================================

  // Gameplay chapter registry = the eleven math WORLDS. roomCount comes from the
  // curriculum; startRoom/endRoom (computed in 01-data.js) span the full 1..187 range.
  var chapters = [
    { id: 'numbers',     worldId: 'numbers',     title: 'Numbers',     subtitle: 'Integers, Primes & Powers',       storyTitle: 'The Ruins of Balance',    system: 'The Sol System',        roomCount: 24, generator: null },
    { id: 'expressions', worldId: 'expressions', title: 'Expressions', subtitle: 'Words into Algebra',              storyTitle: 'The Function Forest',     system: 'The Expression Reach',  roomCount: 22, generator: null },
    { id: 'equations',   worldId: 'equations',   title: 'Equations',   subtitle: 'Balance, Inequalities & Systems', storyTitle: 'The Ruins of Balance',    system: 'The Equation Fields',   roomCount: 22, generator: null },
    { id: 'factoring',   worldId: 'factoring',   title: 'Factoring',   subtitle: 'Splitting the Crystals',          storyTitle: 'The Polynomial Forge',    system: 'The Factor Caverns',    roomCount: 22, generator: null },
    { id: 'quadratics',  worldId: 'quadratics',  title: 'Quadratics',  subtitle: 'Curves, Roots & the Formula',     storyTitle: 'The Conic Gateways',      system: 'The Quadratic Peaks',   roomCount: 21, generator: null },
    { id: 'functions',   worldId: 'functions',   title: 'Functions',   subtitle: 'Inputs, Graphs & Growth',         storyTitle: 'The Function Observatory',system: 'The Function Observatory',roomCount: 22, generator: null },
    { id: 'sequences',   worldId: 'sequences',   title: 'Sequences',   subtitle: 'Patterns, Terms & Series',        storyTitle: 'The Sequence Engine',     system: 'The Sequence Engine',   roomCount: 11, generator: null },
    { id: 'logarithms',  worldId: 'logarithms',  title: 'Logarithms',  subtitle: 'The Inverse of Powers',           storyTitle: 'The Exponential Wastes',  system: 'The Logarithm Wastes',  roomCount: 10, generator: null },
    { id: 'trigonometry',worldId: 'trigonometry',title: 'Trigonometry',subtitle: 'Angles, Ratios & the Circle',     storyTitle: 'The Trig Observatory',    system: 'The Trigonometry Temple',roomCount: 12, generator: null },
    { id: 'conics',      worldId: 'conics',      title: 'Coordinate Geometry', subtitle: 'Lines, Circles & Conics', storyTitle: 'The Conic Gateways',      system: 'The Conic Gateways',    roomCount: 10, generator: null },
    { id: 'calculus',    worldId: 'calculus',    title: 'The Calculus Threshold', subtitle: 'Complex Numbers & Limits', storyTitle: 'The Calculus Threshold',system: 'The Calculus Threshold',roomCount: 11, generator: null }
  ];

  // ONE region per world (fewer atlas cards). Each region is anchored by a real lead
  // star; its planets are real bodies gathered from nearby systems. `id` matches the
  // per-world systemId set in curriculum.config. Only Sol is unlocked by default;
  // TEST MODE (mitb) unlocks all (see 25-nav.js).
  var STAR_SYSTEMS = [
    { id: 'sol',          name: 'The Sol System',          worldId: 'numbers',     distanceLy: 0,  star: 'The Sun (yellow dwarf)',                 superEarth: null,                              fact: 'Our home system — planets, moons, dwarf planets and comets.',                 unlocked: true },
    { id: 'expressions',  name: 'The Expression Reach',    worldId: 'expressions', distanceLy: 12, star: 'TRAPPIST-1, Tau Ceti, Proxima & nearby red dwarfs', superEarth: 'TRAPPIST-1 & Tau Ceti worlds', fact: 'A cluster of the closest real exoplanet systems — TRAPPIST-1’s seven Earth-size worlds and more.', unlocked: false },
    { id: 'equations',    name: 'The Equation Fields',     worldId: 'equations',   distanceLy: 42, star: 'Kepler-90, Kepler-11 & HD 40307',        superEarth: 'HD 40307 g',                      fact: 'Rich multi-planet systems, including Kepler-90’s eight worlds.',               unlocked: false },
    { id: 'factoring',    name: 'The Factor Caverns',      worldId: 'factoring',   distanceLy: 23, star: 'HD 10180, Kepler-80, Gliese 667C & Kepler-62', superEarth: 'Gliese 667Cc',              fact: 'Tightly-packed systems, some with three suns in the sky.',                    unlocked: false },
    { id: 'quadratics',   name: 'The Quadratic Peaks',     worldId: 'quadratics',  distanceLy: 41, star: '55 Cancri, K2-138, Kepler-20 & TOI-700', superEarth: '55 Cnc e — the "diamond world"',  fact: 'Home to a scorching carbon super-Earth that may sparkle like diamond.',       unlocked: false },
    { id: 'functions',    name: 'The Function Observatory',worldId: 'functions',   distanceLy: 205,star: 'TOI-178, Kepler-186, HD 34445 & Kepler-296', superEarth: null,                        fact: 'Includes the first Earth-size planet found in a habitable zone.',             unlocked: false },
    { id: 'sequences',    name: 'The Sequence Engine',     worldId: 'sequences',   distanceLy: 14, star: 'HD 219134, Wolf 1061 & Gliese 163',      superEarth: 'HD 219134 b',                     fact: 'Hosts the nearest transiting exoplanet to Earth.',                            unlocked: false },
    { id: 'logarithms',   name: 'The Logarithm Wastes',    worldId: 'logarithms',  distanceLy: 218,star: 'Kepler-102 & Kepler-138',                superEarth: 'Kepler-102 e',                    fact: 'Home to some of the lightest, wateriest planets known.',                      unlocked: false },
    { id: 'trigonometry', name: 'The Trigonometry Temple', worldId: 'trigonometry',distanceLy: 12, star: 'YZ Ceti, Teegarden, Luyten & Gliese 1002',superEarth: 'Luyten b',                        fact: 'A cluster of the closest red dwarfs and their temperate worlds.',             unlocked: false },
    { id: 'conics',       name: 'The Conic Gateways',      worldId: 'conics',      distanceLy: 50, star: '51 Pegasi & the Kepler habitable worlds', superEarth: 'Kepler-442 b',                    fact: 'Anchored by 51 Peg b — the first planet found around a Sun-like star.',       unlocked: false },
    { id: 'calculus',     name: 'The Calculus Threshold',  worldId: 'calculus',    distanceLy: 8.6,star: 'Sirius, Procyon & famous stars → Sagittarius A*', superEarth: null,                     fact: 'A voyage past the brightest stars to the black hole at the galaxy’s heart.',  unlocked: false }
  ];
