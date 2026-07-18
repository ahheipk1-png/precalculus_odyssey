  // ============================================================================
  // CONFIG · Star Systems & the Chapter registry   (pure data, no behavior)
  // ----------------------------------------------------------------------------
  // Loaded BEFORE curriculum.config.js. The 65-arena Bible curriculum groups every
  // planet by its REAL star system; curriculum.config.js stamps arenaStart/arenaEnd/
  // planets + roomCount onto each entry below at load. Ids MUST match the systemId
  // column in curriculum.config.js. Only Sol is unlocked by default; TEST MODE
  // (admin) unlocks all (see 25-nav.js). The maths flows in Bible order across the
  // systems — each system is a leg of the journey, not a separate math topic.
  // ============================================================================

  // Gameplay chapter registry = the eleven real star systems (roomCount/startArena/
  // endArena are recomputed in curriculum.config.js).
  var chapters = [
    { id: 'sol',                 worldId: 'sol',                 title: 'The Sol System',      subtitle: 'Foundations → Linear Equations & Functions', storyTitle: 'The Ruins of Balance',     system: 'The Sol System',        roomCount: 24, generator: null },
    { id: 'trappist-1',          worldId: 'trappist-1',          title: 'TRAPPIST-1',          subtitle: 'Functions & the First Quadratics',           storyTitle: 'The Seven Worlds',         system: 'TRAPPIST-1',            roomCount: 7,  generator: null },
    { id: 'tau-ceti',            worldId: 'tau-ceti',            title: 'Tau Ceti',            subtitle: 'Quadratic Graphs & Polynomials',             storyTitle: 'The Polynomial Reach',     system: 'Tau Ceti',              roomCount: 4,  generator: null },
    { id: 'proxima-centauri',    worldId: 'proxima-centauri',    title: 'Proxima Centauri',    subtitle: 'Polynomial Division',                        storyTitle: 'The Nearest Star',         system: 'Proxima Centauri',      roomCount: 2,  generator: null },
    { id: 'gliese-876',          worldId: 'gliese-876',          title: 'Gliese 876',          subtitle: 'The Factor Theorem & Rational Functions',    storyTitle: 'The Factor Caverns',       system: 'Gliese 876',            roomCount: 4,  generator: null },
    { id: 'upsilon-andromedae',  worldId: 'upsilon-andromedae',  title: 'Upsilon Andromedae',  subtitle: 'Exponentials & Compound Interest',           storyTitle: 'The Exponential Wastes',   system: 'Upsilon Andromedae',    roomCount: 3,  generator: null },
    { id: 'ross-128',            worldId: 'ross-128',            title: 'Ross 128',            subtitle: 'Logarithms Begin',                           storyTitle: 'The Logarithm Wastes',     system: 'Ross 128',              roomCount: 1,  generator: null },
    { id: 'barnards-star',       worldId: 'barnards-star',       title: "Barnard's Star",      subtitle: 'Logarithm Laws',                             storyTitle: 'The Logarithm Wastes',     system: "Barnard's Star",        roomCount: 1,  generator: null },
    { id: 'kepler-90',           worldId: 'kepler-90',           title: 'Kepler-90',           subtitle: 'Log Equations → Trigonometry',               storyTitle: 'The Trig Observatory',     system: 'Kepler-90',             roomCount: 8,  generator: null },
    { id: 'kepler-11',           worldId: 'kepler-11',           title: 'Kepler-11',           subtitle: 'Trig Identities, Sequences & Series',         storyTitle: 'The Sequence Engine',      system: 'Kepler-11',             roomCount: 6,  generator: null },
    { id: 'hd-40307',            worldId: 'hd-40307',            title: 'HD 40307',            subtitle: 'Conics, Vectors, Complex Numbers & the Final Boss', storyTitle: 'The Calculus Threshold', system: 'HD 40307',            roomCount: 5,  generator: null }
  ];

  // One region per real star system. `id` matches the systemId column in
  // curriculum.config.js. arenaStart/arenaEnd/planets are stamped at curriculum load.
  var STAR_SYSTEMS = [
    { id: 'sol',                name: 'The Sol System',        worldId: 'sol',                distanceLy: 0,    star: 'The Sun (yellow dwarf)',            fact: 'Our home system — planets, moons, dwarf planets and a comet. Every early world here has a real photograph.', unlocked: true },
    { id: 'trappist-1',         name: 'TRAPPIST-1',            worldId: 'trappist-1',         distanceLy: 39.5, star: 'TRAPPIST-1 (ultra-cool red dwarf)',  fact: 'Seven Earth-size worlds circling a single tiny red star, 39 light-years away.', unlocked: false },
    { id: 'tau-ceti',           name: 'Tau Ceti',              worldId: 'tau-ceti',           distanceLy: 11.9, star: 'Tau Ceti (Sun-like star)',           fact: 'A close Sun-like star with a family of super-Earths, 12 light-years away.', unlocked: false },
    { id: 'proxima-centauri',   name: 'Proxima Centauri',      worldId: 'proxima-centauri',   distanceLy: 4.2,  star: 'Proxima Centauri (red dwarf)',       fact: 'The nearest star to the Sun — home to the closest known exoplanet.', unlocked: false },
    { id: 'gliese-876',         name: 'Gliese 876',            worldId: 'gliese-876',         distanceLy: 15.2, star: 'Gliese 876 (red dwarf)',             fact: 'A nearby red dwarf with gas giants locked in an orbital dance.', unlocked: false },
    { id: 'upsilon-andromedae', name: 'Upsilon Andromedae',    worldId: 'upsilon-andromedae', distanceLy: 44,   star: 'Upsilon Andromedae (bright star)',   fact: 'One of the first multi-planet systems ever found around a Sun-like star.', unlocked: false },
    { id: 'ross-128',           name: 'Ross 128',              worldId: 'ross-128',           distanceLy: 11,   star: 'Ross 128 (quiet red dwarf)',         fact: 'A calm nearby red dwarf with a temperate Earth-mass world.', unlocked: false },
    { id: 'barnards-star',      name: "Barnard's Star",        worldId: 'barnards-star',      distanceLy: 6,    star: "Barnard's Star (red dwarf)",         fact: 'The second-closest star system to the Sun — a fast-moving red dwarf.', unlocked: false },
    { id: 'kepler-90',          name: 'Kepler-90',             worldId: 'kepler-90',          distanceLy: 2800, star: 'Kepler-90 (Sun-like star)',          fact: 'An eight-planet system — as many planets as our own Sun, 2,800 light-years away.', unlocked: false },
    { id: 'kepler-11',          name: 'Kepler-11',             worldId: 'kepler-11',          distanceLy: 2100, star: 'Kepler-11 (Sun-like star)',          fact: 'Six low-density planets packed closer to their star than Mercury is to ours.', unlocked: false },
    { id: 'hd-40307',           name: 'HD 40307',              worldId: 'hd-40307',           distanceLy: 42,   star: 'HD 40307 (orange dwarf)',            fact: 'A chain of super-Earths, one in the habitable zone — the Odyssey’s final frontier.', unlocked: false },
    // HIDDEN endgame system — only shows in the atlas once ALL 65 arenas have a perfect (0-mistake)
    // green star (galaxyUnlocked() in 06e-combat-outcome.js). Holds the "Giant Black Hole" arena
    // (999) always, plus the "Second Chance" comeback trial (888) once its own arena-level
    // condition is met (comebackUnlocked() — losing the black hole gauntlet) — both arenas share
    // this ONE system so their atlas cards sit side by side (25-nav.js's _arenaVisible filters the
    // planet grid per-arena; see js/52-comeback-arena.js).
    { id: 'galaxy-center',      name: 'Galaxy Center',         worldId: 'galaxy-center',      distanceLy: 26000, star: 'Sagittarius A* (supermassive black hole)', fact: 'The 4-million-solar-mass monster at the heart of the Milky Way — the Odyssey’s ultimate trial.', unlocked: false, hidden: true }
  ];
