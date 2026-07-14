  // ============================================================================
  // CONFIG · Curriculum — the full 133-arena precalculus map (single source of truth)
  // ----------------------------------------------------------------------------
  // Pure data, loaded BEFORE the logic modules (see index.html). Each arena is a
  // planet: a math TOPIC + a QUESTION STYLE (mechanic) + a REAL astronomical body.
  //
  //   mechanic ∈  numeric | formula | mcThenMorph | mcOnly | directInput
  //     numeric      = balance-scale equation solving (type integer + op)      [built]
  //     formula      = change-of-subject, type a letter to move terms          [built]
  //     mcThenMorph  = pick the right transform, expression morphs, continue   [built]
  //     mcOnly       = one tap on the right answer ends the arena (NEW)
  //     directInput  = type one positive integer + Submit (NEW)
  //
  //   gen = id of the authored problem generator (04-logic.js). Arenas WITHOUT a
  //         gen show "🔒 Coming soon" (topic + astronomy visible) — they are never
  //         served an unrelated question. Generators are authored world by world.
  //
  // ASTRONOMY RULE: every body is REAL first (real:true). Imaginary comets/rogue
  // planets (real:false) are a LAST RESORT only where no real body is left.
  // Add/adjust an arena = edit one row here; nothing else changes. See CONFIG_GUIDE.md.
  // ============================================================================

  // The six math bands (worlds). arena ranges are computed from the rows below.
  var MATH_WORLDS = [
    { id: 'numbers',     title: 'Numbers',     blurb: 'Integers, primes, powers, roots & standard form.' },
    { id: 'expressions', title: 'Expressions', blurb: 'Words → algebra, like terms, brackets, change of subject.' },
    { id: 'equations',   title: 'Equations',   blurb: 'Linear equations, inequalities & simultaneous systems.' },
    { id: 'factoring',   title: 'Factoring',   blurb: 'Common factors, difference of squares, trinomials, factor theorem.' },
    { id: 'quadratics',  title: 'Quadratics',  blurb: 'Roots, completing the square, discriminant & the formula.' },
    { id: 'functions',   title: 'Functions',   blurb: 'f(x) notation, domain, graphs, families & exponential growth.' },
    { id: 'sequences',   title: 'Sequences',   blurb: 'Arithmetic & geometric sequences, patterns and series.' },
    { id: 'logarithms',  title: 'Logarithms',  blurb: 'What logs mean, evaluating them, log laws and solving.' },
    { id: 'trigonometry',title: 'Trigonometry',blurb: 'Right-triangle ratios, Pythagoras, the unit circle & identities.' },
    { id: 'conics',      title: 'Coordinate Geometry', blurb: 'Distance, midpoint, gradient, lines, circles & conics.' },
    { id: 'calculus',    title: 'The Calculus Threshold', blurb: 'Complex numbers, rates of change & the idea of a limit.' }
  ];

  // Per-arena rows: [ topic, mechanic, systemId, bodyName, bodyKind, realBool, fact ]
  // realBool defaults true (omit for real). fact is a short kid-friendly line.

  // ---- World I · Numbers → the Sol System (24 real bodies) ----
  var _W_NUMBERS = [
    ['Comparing & ordering integers on the number line', 'mcOnly', 'sol', 'The Sun', 'Our Star', true, 'The Sun holds 99.8% of all the mass in the Solar System.'],
    ['Adding integers, including negatives', 'mcOnly', 'sol', 'Mercury', 'Smallest Planet', true, 'A year on Mercury is just 88 Earth days.'],
    ['Subtracting integers (subtracting a negative)', 'mcOnly', 'sol', 'Venus', 'The Hottest Planet', true, 'A day on Venus is longer than its year.'],
    ['Multiplying & dividing integers (sign rules)', 'mcOnly', 'sol', 'Earth', 'Home Planet', true, 'The only planet we know of with life.'],
    ['One- & two-step equations with negative solutions', 'numeric', 'sol', 'The Moon', 'Earth’s Moon', true, 'You could jump six times higher on the Moon.'],
    ['Order of operations (BODMAS) — choose the first step', 'mcThenMorph', 'sol', 'Mars', 'The Red Planet', true, 'Mars has Olympus Mons, the tallest volcano in the Solar System.'],
    ['Order of operations with brackets & powers', 'mcThenMorph', 'sol', 'Phobos', 'Moon of Mars', true, 'Phobos orbits Mars faster than Mars spins.'],
    ['Identifying prime numbers', 'mcOnly', 'sol', 'Deimos', 'Moon of Mars', true, 'Deimos is only about 12 km across.'],
    ['Factors of a number', 'mcOnly', 'sol', 'Ceres', 'Dwarf Planet (Asteroid Belt)', true, 'Ceres is the largest object in the asteroid belt.'],
    ['Multiples & common multiples', 'directInput', 'sol', 'Vesta', 'Giant Asteroid', true, 'Vesta is bright enough to see without a telescope.'],
    ['Prime factorization via a factor tree', 'mcThenMorph', 'sol', 'Jupiter', 'The Largest Planet', true, 'The Great Red Spot is a storm wider than Earth.'],
    ['Highest Common Factor (HCF)', 'directInput', 'sol', 'Io', 'Moon of Jupiter', true, 'Io is the most volcanically active place in the Solar System.'],
    ['Lowest Common Multiple (LCM) — real-life scenario', 'mcThenMorph', 'sol', 'Europa', 'Icy Moon of Jupiter', true, 'Europa may hide twice as much water as all Earth’s oceans.'],
    ['Powers as repeated multiplication', 'directInput', 'sol', 'Ganymede', 'Largest Moon in the Solar System', true, 'Ganymede is bigger than the planet Mercury.'],
    ['Index law — product rule (same base)', 'directInput', 'sol', 'Callisto', 'Moon of Jupiter', true, 'Callisto is one of the most cratered worlds known.'],
    ['Index law — quotient rule', 'directInput', 'sol', 'Saturn', 'The Ringed Planet', true, 'Saturn is so light it would float in water.'],
    ['Index law — power of a power', 'directInput', 'sol', 'Titan', 'Giant Moon of Saturn', true, 'Titan has lakes and rivers of liquid methane.'],
    ['Zero & negative indices', 'mcOnly', 'sol', 'Enceladus', 'Icy Moon of Saturn', true, 'Enceladus shoots geysers of water ice into space.'],
    ['Combining index laws (multi-step)', 'mcThenMorph', 'sol', 'Uranus', 'The Tilted Planet', true, 'Uranus spins on its side, rolling around the Sun.'],
    ['Square & cube roots (perfect)', 'directInput', 'sol', 'Neptune', 'The Windiest Planet', true, 'Neptune has the fastest winds in the Solar System.'],
    ['Simplifying radicals (surds)', 'mcThenMorph', 'sol', 'Triton', 'Moon of Neptune', true, 'Triton orbits backwards compared to Neptune’s spin.'],
    ['Writing large numbers in standard form', 'mcOnly', 'sol', 'Pluto', 'Dwarf Planet', true, 'Pluto has a heart-shaped plain of frozen nitrogen.'],
    ['Writing small numbers in standard form (negative powers)', 'mcOnly', 'sol', 'Eris', 'Distant Dwarf Planet', true, 'Eris is so far its year lasts about 558 Earth years.'],
    ['Multiplying in standard form — real-life scale', 'mcThenMorph', 'sol', 'Halley’s Comet', 'Famous Comet', true, 'Halley’s Comet returns near Earth about every 76 years.']
  ];

  // ---- World II · Expressions → TRAPPIST-1 + Tau Ceti + nearby real systems ----
  var _W_EXPRESSIONS = [
    ['Translate real life → algebra: one operation (add / more than)', 'mcOnly', 'trappist-1', 'TRAPPIST-1 b', 'Rocky Planet', true, 'The innermost of seven Earth-size worlds.'],
    ['Translate real life → algebra: repeated groups (multiplication)', 'mcOnly', 'trappist-1', 'TRAPPIST-1 c', 'Rocky Planet', true, 'A hot rocky world close to its red-dwarf star.'],
    ['Translate real life → algebra: two operations (rate + fixed amount)', 'mcOnly', 'trappist-1', 'TRAPPIST-1 d', 'Rocky Planet', true, 'Lighter than Earth and possibly watery.'],
    ['Translate real life → algebra: sharing / division', 'mcOnly', 'trappist-1', 'TRAPPIST-1 e', 'Rocky Planet', true, 'Sits in the habitable zone — could hold liquid water.'],
    ['Substitution / evaluation into a one-term expression', 'directInput', 'trappist-1', 'TRAPPIST-1 f', 'Rocky Planet', true, 'One of the most Earth-like of the seven.'],
    ['Substitution / evaluation into a two-operation expression', 'directInput', 'trappist-1', 'TRAPPIST-1 g', 'Rocky Planet', true, 'The largest planet in the TRAPPIST-1 family.'],
    ['Translate THEN evaluate (word → expression → substitute)', 'mcThenMorph', 'trappist-1', 'TRAPPIST-1 h', 'Cold Outer Planet', true, 'The coldest, outermost of the seven worlds.'],
    ['Collect like terms: single variable', 'mcOnly', 'tau-ceti', 'Tau Ceti e', 'Super-Earth', true, 'A super-Earth orbiting a Sun-like star 12 light-years away.'],
    ['Collect like terms: variable terms plus a constant', 'mcOnly', 'tau-ceti', 'Tau Ceti f', 'Super-Earth', true, 'Orbits in Tau Ceti’s habitable zone.'],
    ['Collect like terms: two different variables', 'mcOnly', 'tau-ceti', 'Tau Ceti g', 'Super-Earth', true, 'One of several super-Earths around Tau Ceti.'],
    ['Collect like terms THEN substitute', 'mcThenMorph', 'tau-ceti', 'Tau Ceti h', 'Super-Earth', true, 'A close-in world orbiting a nearby Sun-like star.'],
    ['Expand a single bracket (distribution)', 'mcOnly', 'proxima-centauri', 'Proxima b', 'Nearest Exoplanet', true, 'The closest exoplanet to Earth — 4.2 light-years away.'],
    ['Expand a single bracket with subtraction and a coefficient on x', 'mcOnly', 'proxima-centauri', 'Proxima d', 'Tiny Inner Planet', true, 'A lightweight world hugging its red-dwarf star.'],
    ['Expand two single brackets AND collect like terms', 'mcThenMorph', 'gliese-876', 'Gliese 876 b', 'Gas Giant', true, 'A Jupiter-like planet around a nearby red dwarf.'],
    ['Expand double brackets (FOIL), positive terms', 'mcThenMorph', 'gliese-876', 'Gliese 876 c', 'Gas Giant', true, 'Locked in an orbital dance with planet b.'],
    ['Expand double brackets (FOIL) with a subtraction', 'mcThenMorph', 'gliese-876', 'Gliese 876 d', 'Super-Earth', true, 'A scorching super-Earth with a very short year.'],
    ['Expand a squared bracket (FOIL boss)', 'mcThenMorph', 'gliese-876', 'Gliese 876 e', 'Ice Giant', true, 'The outermost known world of the Gliese 876 system.'],
    ['Change of subject: single additive term', 'formula', 'upsilon-andromedae', 'Upsilon And b', 'Hot Jupiter', true, 'A gas giant whose star has multiple planets.'],
    ['Change of subject: single multiplicative term', 'formula', 'upsilon-andromedae', 'Upsilon And c', 'Gas Giant', true, 'Orbits a star brighter than our Sun.'],
    ['Change of subject: two operations (clear add before divide)', 'formula', 'upsilon-andromedae', 'Upsilon And d', 'Gas Giant', true, 'One of the first multi-planet systems ever found.'],
    ['Change of subject: real-world formula', 'formula', 'ross-128', 'Ross 128 b', 'Nearby Exoplanet', true, 'A temperate world around a quiet red dwarf 11 ly away.'],
    ['Change of subject requiring expansion first (boss)', 'formula', 'barnards-star', 'Barnard b', 'Super-Earth', true, 'Orbits the second-closest star system to the Sun.']
  ];

  // ---- World III · Equations → Kepler-90 + Kepler-11 + HD 40307 (absorbs Balance Quest) ----
  var _W_EQUATIONS = [
    ['One-step linear equations (add / subtract)', 'numeric', 'kepler-90', 'Kepler-90 b', 'Rocky Planet', true, 'Part of an eight-planet system like our own.'],
    ['One-step linear equations (multiply / divide)', 'numeric', 'kepler-90', 'Kepler-90 c', 'Rocky Planet', true, 'Kepler-90 has as many planets as the Solar System.'],
    ['Two-step linear equations (coefficient + constant)', 'numeric', 'kepler-90', 'Kepler-90 d', 'Warm Planet', true, 'Orbits a Sun-like star 2,800 light-years away.'],
    ['Two-step with a divided variable', 'numeric', 'kepler-90', 'Kepler-90 e', 'Warm Planet', true, 'Found by AI sifting through telescope data.'],
    ['Brackets — expand, then solve', 'numeric', 'kepler-90', 'Kepler-90 f', 'Warm Planet', true, 'The middle of eight known planets.'],
    ['Multi-step: variables on both sides', 'numeric', 'kepler-90', 'Kepler-90 g', 'Gas Giant', true, 'A puffy gas planet in a crowded system.'],
    ['Change of subject of a formula', 'formula', 'kepler-90', 'Kepler-90 h', 'Gas Giant', true, 'The largest planet of the Kepler-90 family.'],
    ['Boss review — brackets + variables both sides', 'numeric', 'kepler-90', 'Kepler-90 i', 'Hot Rocky Planet', true, 'The eighth planet, discovered by machine learning.'],
    ['One-step inequalities (add / subtract)', 'numeric', 'kepler-11', 'Kepler-11 b', 'Low-Density Planet', true, 'One of six planets packed close to their star.'],
    ['One-step inequalities (positive multiply / divide)', 'numeric', 'kepler-11', 'Kepler-11 c', 'Low-Density Planet', true, 'A fluffy world less dense than water.'],
    ['Two-step inequalities (positive coefficient)', 'numeric', 'kepler-11', 'Kepler-11 d', 'Sub-Neptune', true, 'Kepler-11’s planets orbit closer than Mercury does.'],
    ['Real-life to an inequality (model, then solve)', 'numeric', 'kepler-11', 'Kepler-11 e', 'Sub-Neptune', true, 'A light, gassy planet in a tidy flat system.'],
    ['The Flip Rule — dividing by a negative (concept)', 'mcOnly', 'kepler-11', 'Kepler-11 f', 'Small Gas Planet', true, 'One of the first flat, packed systems found.'],
    ['Reading inequalities on a number line', 'mcOnly', 'kepler-11', 'Kepler-11 g', 'Outer Planet', true, 'The outermost of the six Kepler-11 worlds.'],
    ['Boss — multi-step inequality with a flip', 'mcThenMorph', 'hd-40307', 'HD 40307 b', 'Super-Earth', true, 'A super-Earth around a nearby orange dwarf.'],
    ['What a solution to a system means', 'mcOnly', 'hd-40307', 'HD 40307 c', 'Super-Earth', true, 'One of a family of super-Earths 42 light-years away.'],
    ['Substitution — plug one equation into the other', 'numeric', 'hd-40307', 'HD 40307 d', 'Super-Earth', true, 'Orbits closer than Mercury, warm and rocky.'],
    ['Substitution — find BOTH unknowns', 'numeric', 'hd-40307', 'HD 40307 e', 'Super-Earth', true, 'Part of a smooth, resonant chain of planets.'],
    ['Elimination by adding equations', 'numeric', 'hd-40307', 'HD 40307 f', 'Super-Earth', true, 'A warm super-Earth around a Sun-like orange star.'],
    ['Elimination by subtracting equations', 'numeric', 'hd-40307', 'HD 40307 g', 'Habitable-zone Super-Earth', true, 'Sits in the habitable zone — could hold liquid water.'],
    ['Elimination with scaling (multiply first)', 'numeric', 'gliese-581', 'Gliese 581 c', 'Super-Earth', true, 'One of the first habitable-zone super-Earths found.'],
    ['Real-life system — boss', 'numeric', 'gliese-581', 'Gliese 581 e', 'Small Super-Earth', true, 'One of the lightest exoplanets found around a red dwarf.']
  ];

  // ---- World IV · Factoring → HD 10180 + Kepler-80 + Gliese 667C + Kepler-62 ----
  var _W_FACTORING = [
    ['Highest common factor of two numbers (warm-up)', 'directInput', 'hd-10180', 'HD 10180 c', 'Hot Super-Earth', true, 'One of up to nine planets around a Sun-like star.'],
    ['Identify the common factor of two algebraic terms', 'mcOnly', 'hd-10180', 'HD 10180 d', 'Warm Planet', true, 'HD 10180 may have more planets than our own Sun.'],
    ['Scalar (numeric) common-factor extraction, two terms', 'mcOnly', 'hd-10180', 'HD 10180 e', 'Warm Planet', true, 'A tidy, evenly-spaced planetary system.'],
    ['Common variable-factor extraction, two terms', 'mcOnly', 'hd-10180', 'HD 10180 f', 'Neptune-like Planet', true, 'Orbits 127 light-years away in Hydrus.'],
    ['Extract the HCF (number AND variable), confirm the bracket', 'mcThenMorph', 'hd-10180', 'HD 10180 g', 'Cool Planet', true, 'One of the outer worlds of a rich system.'],
    ['Recognize a difference of two squares (concept)', 'mcOnly', 'hd-10180', 'HD 10180 h', 'Cold Outer Planet', true, 'The most distant confirmed planet of HD 10180.'],
    ['Factorize a simple difference of two squares', 'mcOnly', 'kepler-80', 'Kepler-80 b', 'Sub-Neptune', true, 'One of a chain of resonant, drumbeat-timed planets.'],
    ['Difference of two squares with a leading coefficient', 'mcOnly', 'kepler-80', 'Kepler-80 c', 'Sub-Neptune', true, 'Its planets tug each other into a musical rhythm.'],
    ['Factorize a difference of squares, then read the positive solution', 'mcThenMorph', 'kepler-80', 'Kepler-80 d', 'Warm Planet', true, 'Part of a tightly-linked five-planet dance.'],
    ['Factorization by grouping (pre-grouped four terms), a=1', 'mcThenMorph', 'kepler-80', 'Kepler-80 e', 'Rocky Planet', true, 'The planets keep near-perfect orbital time.'],
    ['Factorization by grouping with a>1', 'mcThenMorph', 'kepler-80', 'Kepler-80 g', 'Outer Planet', true, 'A newer-found member of the Kepler-80 chain.'],
    ['Find the number pair for a monic trinomial (product & sum)', 'mcOnly', 'gliese-667c', 'Gliese 667Cb', 'Super-Earth', true, 'Orbits a red dwarf in a triple-star system.'],
    ['Factorize a monic trinomial x²+bx+c, all positive', 'mcOnly', 'gliese-667c', 'Gliese 667Cc', 'Habitable-zone Super-Earth', true, 'A prime candidate for liquid water on its surface.'],
    ['Monic trinomial with a negative middle term', 'mcOnly', 'gliese-667c', 'Gliese 667Ce', 'Super-Earth', true, 'From its sky you could see three suns.'],
    ['Monic trinomial with a mixed-sign constant', 'mcOnly', 'gliese-667c', 'Gliese 667Cf', 'Super-Earth', true, 'One of several super-Earths around a cool star.'],
    ['Factorize a monic trinomial equation, then give a root', 'mcThenMorph', 'kepler-62', 'Kepler-62 b', 'Hot Super-Earth', true, 'Part of a five-planet system 1,200 light-years away.'],
    ['Non-monic trinomial (a>1) by splitting the middle term', 'mcThenMorph', 'kepler-62', 'Kepler-62 c', 'Tiny Mars-size Planet', true, 'One of the smallest planets Kepler ever found.'],
    ['Second non-monic trinomial (a>1) to cement the ac-method', 'mcThenMorph', 'kepler-62', 'Kepler-62 d', 'Super-Earth', true, 'A warm world orbiting an orange dwarf star.'],
    ['Evaluate a polynomial at a value (factor-theorem foundation)', 'directInput', 'kepler-62', 'Kepler-62 e', 'Habitable-zone Super-Earth', true, 'Might be a water world in the habitable zone.'],
    ['Apply the factor theorem to test a candidate factor', 'mcOnly', 'kepler-62', 'Kepler-62 f', 'Habitable-zone Super-Earth', true, 'Another possible ocean world of Kepler-62.'],
    ['Use the factor theorem to find the integer root', 'directInput', 'kepler-62', 'Kepler-62 f II', 'Outer Companion', false, 'An imaginary companion beacon used to fill the depths.'],
    ['BOSS — full cubic factorization via the factor theorem', 'mcThenMorph', 'gliese-667c', 'Gliese 667C h', 'Outer Guardian', false, 'A lore guardian station orbiting the triple star.']
  ];

  // ---- World V · Quadratics → 55 Cancri + K2-138 + Kepler-20 + TOI-700 ----
  var _W_QUADRATICS = [
    ['Recognising a quadratic expression (has an x² term)', 'mcOnly', '55-cancri', '55 Cancri b', 'Gas Giant', true, 'One of five planets around a Sun-like star 41 ly away.'],
    ['Identifying coefficients a, b, c in ax² + bx + c', 'directInput', '55-cancri', '55 Cancri c', 'Gas Giant', true, 'A Saturn-mass world in a busy planetary system.'],
    ['Factoring out a common monomial factor', 'mcOnly', '55-cancri', '55 Cancri d', 'Cold Gas Giant', true, 'A distant Jupiter-like planet of 55 Cancri.'],
    ['Zero product property — reading roots from factored form', 'mcOnly', '55-cancri', '55 Cancri e', 'Diamond Super-Earth', true, 'So hot it may have a surface rich in carbon — a "diamond world".'],
    ['Solving a fully factored equation, entering a specific root', 'directInput', '55-cancri', '55 Cancri f', 'Habitable-zone Planet', true, 'Orbits in the star’s warm, life-friendly zone.'],
    ['Factoring a monic trinomial, then reading its roots', 'mcThenMorph', 'k2-138', 'K2-138 b', 'Super-Earth', true, 'Innermost of a resonant chain found by citizen scientists.'],
    ['Real-life to algebra: garden area (factor then solve)', 'mcThenMorph', 'k2-138', 'K2-138 c', 'Super-Earth', true, 'The planets orbit in a neat mathematical rhythm.'],
    ['Recognising a perfect-square trinomial', 'mcOnly', 'k2-138', 'K2-138 d', 'Sub-Neptune', true, 'Each planet’s year is a simple ratio of the next.'],
    ['Completing the square — the constant to add (½b, squared)', 'directInput', 'k2-138', 'K2-138 e', 'Sub-Neptune', true, 'Discovered by volunteers combing telescope data.'],
    ['Writing a perfect-square trinomial as a squared bracket', 'mcOnly', 'k2-138', 'K2-138 f', 'Sub-Neptune', true, 'Part of a five-planet resonant chain.'],
    ['Roots via square roots: solving the x² = k form', 'directInput', 'k2-138', 'K2-138 g', 'Outer Planet', true, 'The outer world of the K2-138 chain.'],
    ['Completing the square on a full equation (transform step)', 'mcOnly', 'kepler-20', 'Kepler-20 b', 'Hot Super-Earth', true, 'A system mixing big and Earth-size planets.'],
    ['Solving by completing the square, all the way to a root', 'mcThenMorph', 'kepler-20', 'Kepler-20 c', 'Sub-Neptune', true, 'Orbits a Sun-like star about 929 light-years away.'],
    ['Real-life: projectile max height from vertex form (boss)', 'mcOnly', 'kepler-20', 'Kepler-20 d', 'Cool Planet', true, 'One of the outer planets of Kepler-20.'],
    ['Reading a, b, c straight from an equation', 'mcOnly', 'kepler-20', 'Kepler-20 e', 'Earth-size Planet', true, 'One of the first Earth-size planets ever found.'],
    ['Computing the discriminant b² − 4ac', 'directInput', 'kepler-20', 'Kepler-20 f', 'Earth-size Planet', true, 'About the size of Earth but far too hot for life.'],
    ['Nature of the roots from the sign of the discriminant', 'mcOnly', 'toi-700', 'TOI-700 b', 'Rocky Planet', true, 'A small rocky world found by NASA’s TESS telescope.'],
    ['Determine the nature of roots for a specific equation', 'mcThenMorph', 'toi-700', 'TOI-700 c', 'Sub-Neptune', true, 'A gassy planet 100 light-years away.'],
    ['Solving with the quadratic formula and entering a root', 'directInput', 'toi-700', 'TOI-700 d', 'Habitable-zone Planet', true, 'An Earth-size world in the habitable zone.'],
    ['Full quadratic-formula flow: discriminant, then root', 'mcThenMorph', 'toi-700', 'TOI-700 e', 'Habitable-zone Planet', true, 'A second possibly-habitable world in the same system.'],
    ['Real-life: projectile timing via the formula (world boss)', 'mcThenMorph', 'toi-700', 'TOI-700 f', 'Comet Guardian', false, 'An imaginary comet-guardian marking the summit.']
  ];

  // ---- World VI · Functions → TOI-178 + Kepler-186 + HD 34445 ----
  var _W_FUNCTIONS = [
    ['Reading function notation f(x)', 'mcOnly', 'toi-178', 'TOI-178 b', 'Rocky Planet', true, 'Innermost of six planets orbiting in near-perfect rhythm.'],
    ['Evaluating a one-step linear function', 'directInput', 'toi-178', 'TOI-178 c', 'Sub-Neptune', true, 'The planets circle in a musical resonance chain.'],
    ['Evaluating a two-step linear function', 'directInput', 'toi-178', 'TOI-178 d', 'Sub-Neptune', true, 'Their orbits beat out a steady cosmic rhythm.'],
    ['Evaluating with subtraction (positive output)', 'directInput', 'toi-178', 'TOI-178 e', 'Sub-Neptune', true, 'Part of a chain locked in orbital harmony.'],
    ['Evaluating a quadratic (light polynomial preview)', 'directInput', 'toi-178', 'TOI-178 f', 'Puffy Planet', true, 'A low-density world about 200 light-years away.'],
    ['Finding the input given the output (solving f(x)=k)', 'numeric', 'toi-178', 'TOI-178 g', 'Outer Planet', true, 'The outermost of the resonant six.'],
    ['Rearranging a function rule / inverse intro', 'formula', 'kepler-186', 'Kepler-186 b', 'Rocky Planet', true, 'An inner rocky planet of a red-dwarf system.'],
    ['Composite evaluation g(f(x)) (capstone notation)', 'mcThenMorph', 'kepler-186', 'Kepler-186 c', 'Rocky Planet', true, 'One of five worlds around a cool red dwarf.'],
    ['Domain of a linear / polynomial function (all reals)', 'mcOnly', 'kepler-186', 'Kepler-186 d', 'Rocky Planet', true, 'A warm rocky planet 580 light-years away.'],
    ['Domain of a rational function (excluded value, concept)', 'mcOnly', 'kepler-186', 'Kepler-186 e', 'Rocky Planet', true, 'Orbits just inside the habitable zone.'],
    ['Finding the excluded value of a rational function', 'directInput', 'kepler-186', 'Kepler-186 f', 'Earth-size Habitable Planet', true, 'The first Earth-size planet found in the habitable zone.'],
    ['Reading a value off a graph, f(a)', 'directInput', 'hd-34445', 'HD 34445 b', 'Gas Giant', true, 'A Jupiter-like planet around a Sun-like star.'],
    ['Range from a graph', 'mcOnly', 'hd-34445', 'HD 34445 c', 'Gas Giant', true, 'One of at least six planets in this rich system.'],
    ['Reading an intercept from a graph', 'directInput', 'hd-34445', 'HD 34445 d', 'Neptune-like Planet', true, 'Orbits 150 light-years away in Ophiuchus.'],
    ['Increasing vs decreasing behavior of a graph', 'mcOnly', 'hd-34445', 'HD 34445 e', 'Warm Planet', true, 'A mid-system world of the HD 34445 family.'],
    ['Classifying the function family', 'mcOnly', 'hd-34445', 'HD 34445 f', 'Cool Planet', true, 'One of the outer planets found by radial velocity.'],
    ['Evaluating a higher-degree polynomial', 'directInput', 'hd-34445', 'HD 34445 g', 'Cold Outer Planet', true, 'The most distant known planet of HD 34445.'],
    ['Polynomial degree / maximum x-axis crossings', 'mcOnly', 'kepler-296', 'Kepler-296 b', 'Super-Earth', true, 'Part of a five-planet system around a red-dwarf pair.'],
    ['Rational function vertical asymptote', 'directInput', 'kepler-296', 'Kepler-296 c', 'Super-Earth', true, 'Orbits one star of a close binary.'],
    ['Evaluating an exponential function', 'directInput', 'kepler-296', 'Kepler-296 d', 'Super-Earth', true, 'A warm world in a two-star system.'],
    ['Solving an exponential by matching bases', 'mcThenMorph', 'kepler-296', 'Kepler-296 e', 'Habitable-zone Super-Earth', true, 'Sits in the habitable zone of its dim red star.'],
    ['Real-life exponential growth (doubling scenario)', 'directInput', 'kepler-296', 'Kepler-296 f', 'Habitable-zone Super-Earth', true, 'A possible ocean world ending the Odyssey’s outward climb.']
  ];

  // ---- World VII · Sequences & Series → HD 219134 + Wolf 1061 + Gliese 163 ----
  var _W_SEQUENCES = [
    ['Find the next term of an arithmetic sequence', 'directInput', 'hd-219134', 'HD 219134 b', 'Hot Super-Earth', true, 'The nearest transiting exoplanet to Earth, 21 ly away.'],
    ['Find the common difference of an arithmetic sequence', 'directInput', 'hd-219134', 'HD 219134 c', 'Super-Earth', true, 'A rocky world in a rich six-planet system.'],
    ['Find the k-th term of an arithmetic sequence', 'directInput', 'hd-219134', 'HD 219134 d', 'Warm Planet', true, 'One of several planets around a bright nearby star.'],
    ['Is this sequence arithmetic or geometric?', 'mcOnly', 'hd-219134', 'HD 219134 f', 'Warm Planet', true, 'Part of a tidy, closely-spaced planetary family.'],
    ['Find the common ratio of a geometric sequence', 'directInput', 'hd-219134', 'HD 219134 g', 'Cool Planet', true, 'An outer world of the HD 219134 system.'],
    ['Find the next term of a geometric sequence', 'directInput', 'hd-219134', 'HD 219134 h', 'Cold Gas Giant', true, 'The most distant known planet of HD 219134.'],
    ['Find the k-th term of a geometric sequence', 'directInput', 'wolf-1061', 'Wolf 1061 b', 'Super-Earth', true, 'Orbits one of the closest red dwarfs, 14 ly away.'],
    ['Sum the first n terms of an arithmetic sequence', 'directInput', 'wolf-1061', 'Wolf 1061 c', 'Habitable-zone Super-Earth', true, 'Sits in the star’s habitable zone.'],
    ['Continue a triangular / square number pattern', 'directInput', 'wolf-1061', 'Wolf 1061 d', 'Cold Super-Earth', true, 'The outer world of the Wolf 1061 system.'],
    ['Find the next Fibonacci number', 'directInput', 'gliese-163', 'Gliese 163 b', 'Warm Super-Earth', true, 'Orbits a red dwarf 49 ly away in Dorado.'],
    ['Sum a short geometric series', 'directInput', 'gliese-163', 'Gliese 163 c', 'Habitable-zone Super-Earth', true, 'A possible ocean world in the habitable zone.']
  ];

  // ---- World VIII · Logarithms → Kepler-102 + Kepler-138 ----
  var _W_LOGARITHMS = [
    ['What a logarithm means: logₐ(x) = y ⇔ aʸ = x', 'mcOnly', 'kepler-102', 'Kepler-102 b', 'Small Rocky Planet', true, 'One of five planets around a Sun-like star.'],
    ['Evaluate a base-2 logarithm (log₂ 8)', 'directInput', 'kepler-102', 'Kepler-102 c', 'Rocky Planet', true, 'A tightly-packed inner world of Kepler-102.'],
    ['Evaluate a base-10 logarithm (log 1000)', 'directInput', 'kepler-102', 'Kepler-102 d', 'Super-Earth', true, 'A warm super-Earth 350 ly away.'],
    ['Evaluate a logarithm with base b (log₃ 27)', 'directInput', 'kepler-102', 'Kepler-102 e', 'Super-Earth', true, 'One of the denser known super-Earths.'],
    ['What is logₐ(1)?', 'mcOnly', 'kepler-102', 'Kepler-102 f', 'Rocky Planet', true, 'The outermost of the five Kepler-102 planets.'],
    ['What is logₐ(a)?', 'mcOnly', 'kepler-138', 'Kepler-138 b', 'Mars-mass Planet', true, 'One of the lightest exoplanets ever measured.'],
    ['The product law: log(ab) = log a + log b', 'mcOnly', 'kepler-138', 'Kepler-138 c', 'Water World', true, 'May be up to half water by volume.'],
    ['Solve log₂ x = k  (x = 2ᵏ)', 'directInput', 'kepler-138', 'Kepler-138 d', 'Water World', true, 'A low-density world that could be an ocean planet.'],
    ['Rewrite an exponential in logarithm form', 'mcOnly', 'kepler-138', 'Kepler-138 e', 'Habitable-zone Planet', true, 'Orbits in the habitable zone of its red dwarf.'],
    ['Evaluate logₐ(aᵏ)', 'directInput', 'kepler-138', 'Kepler-138 f', 'Outer Companion', false, 'A lore beacon marking the edge of the Kepler-138 system.']
  ];

  // ---- World IX · Trigonometry → YZ Ceti + Teegarden + Luyten's Star + Gliese 1002 ----
  var _W_TRIGONOMETRY = [
    ['Label a right triangle: opposite, adjacent, hypotenuse', 'mcOnly', 'yz-ceti', 'YZ Ceti b', 'Rocky Planet', true, 'One of three planets around a nearby red dwarf, 12 ly away.'],
    ['Which ratio is sin θ? (opp / hyp)', 'mcOnly', 'yz-ceti', 'YZ Ceti c', 'Rocky Planet', true, 'A close-in world of the YZ Ceti system.'],
    ['Pythagoras: find the hypotenuse', 'directInput', 'yz-ceti', 'YZ Ceti d', 'Rocky Planet', true, 'The outermost of YZ Ceti’s three planets.'],
    ['Pythagoras: find a missing leg', 'directInput', 'teegarden', "Teegarden's b", 'Earth-mass Planet', true, 'Around one of the smallest, oldest nearby stars, 12 ly away.'],
    ['Value of sin 30°', 'mcOnly', 'teegarden', "Teegarden's c", 'Earth-mass Planet', true, 'A temperate world that could hold liquid water.'],
    ['Value of cos 60°', 'mcOnly', 'luytens-star', 'Luyten b', 'Habitable-zone Super-Earth', true, 'A promising nearby world only 12 ly away.'],
    ['Value of tan 45°', 'mcOnly', 'luytens-star', 'Luyten c', 'Super-Earth', true, 'A companion planet of Luyten’s Star.'],
    ['Unit circle: value of sin 90°', 'mcOnly', 'gliese-1002', 'Gliese 1002 b', 'Habitable-zone Planet', true, 'Orbits a very quiet red dwarf 16 ly away.'],
    ['Degrees in a straight line / full turn', 'directInput', 'gliese-1002', 'Gliese 1002 c', 'Habitable-zone Planet', true, 'A second temperate world of Gliese 1002.'],
    ['The Pythagorean identity sin²θ + cos²θ = 1', 'mcOnly', 'luytens-star', 'Luyten d', 'Inner Planet', true, 'A small inner world of the GJ 273 system.'],
    ['Find the angle from a simple ratio (tan θ = 1)', 'directInput', 'gliese-163', 'Gliese 163 d', 'Outer Planet', true, 'A distant candidate planet of Gliese 163.'],
    ['How many degrees are in a right angle?', 'directInput', 'teegarden', "Teegarden's d", 'Outer Companion', false, 'A lore waypoint beyond Teegarden’s two worlds.']
  ];

  // ---- World X · Coordinate Geometry & Conics → 51 Pegasi + Kepler-160/442/1649/452 ----
  var _W_CONICS = [
    ['Distance between two points on a horizontal line', 'directInput', '51-pegasi', '51 Pegasi b', 'Hot Jupiter', true, 'The first planet ever found orbiting a Sun-like star.'],
    ['Distance between two points (Pythagoras)', 'directInput', 'kepler-160', 'Kepler-160 b', 'Hot Super-Earth', true, 'Orbits a star remarkably similar to our Sun.'],
    ['Midpoint of two points (x-coordinate)', 'directInput', 'kepler-160', 'Kepler-160 c', 'Warm Planet', true, 'A middle world of the Kepler-160 system.'],
    ['Gradient (slope) of a line through two points', 'directInput', 'kepler-160', 'Kepler-160 d', 'Earth-like Candidate', true, 'A possible Earth-like planet in the habitable zone.'],
    ['Read the y-intercept from y = mx + c', 'mcOnly', 'kepler-442', 'Kepler-442 b', 'Habitable-zone Super-Earth', true, 'One of the most Earth-like planets known.'],
    ['Circle x² + y² = r²: find the radius', 'directInput', 'kepler-1649', 'Kepler-1649 b', 'Venus-like Planet', true, 'A hot rocky world near an Earth-size sibling.'],
    ['Circle (x−a)² + (y−b)² = r²: identify the centre', 'mcOnly', 'kepler-1649', 'Kepler-1649 c', 'Earth-size Habitable Planet', true, 'An Earth-size planet in its star’s habitable zone.'],
    ['Identify the conic from its equation (circle/parabola/ellipse)', 'mcOnly', 'kepler-452', 'Kepler-452 b', "Earth's Cousin", true, 'A super-Earth orbiting a Sun-like star — "Earth 2.0".'],
    ['Parabola y = x²: where is its vertex?', 'mcOnly', 'kepler-22', 'Kepler-22 b', 'Ocean-World Candidate', true, 'The first confirmed planet in a Sun-like star’s habitable zone.'],
    ['Distance from the origin to a point', 'directInput', 'kepler-1229', 'Kepler-1229 b', 'Habitable-zone Super-Earth', true, 'A potentially rocky world in the habitable zone.']
  ];

  // ---- World XI · The Calculus Threshold → Sirius + Procyon + famous stars → Sagittarius A* ----
  var _W_CALCULUS = [
    ['The imaginary unit: what is i²?', 'mcOnly', 'sirius', 'Sirius A', 'Brightest Night Star', true, 'The brightest star in Earth’s night sky, 8.6 ly away.'],
    ['Powers of i: evaluate i⁴', 'directInput', 'sirius', 'Sirius B', 'White Dwarf', true, 'A dense white dwarf — a Sun crushed to Earth size.'],
    ['Add complex numbers: the real part of (a+bi) + (c+di)', 'directInput', 'procyon', 'Procyon A', 'Bright Nearby Star', true, 'The eighth-brightest star, 11.5 ly away.'],
    ['Identify the complex conjugate of a + bi', 'mcOnly', 'procyon', 'Procyon B', 'White Dwarf', true, 'The faint white-dwarf companion of Procyon.'],
    ['A negative discriminant: how many REAL roots?', 'mcOnly', 'vega', 'Vega', 'Blue-White Star', true, 'Once the northern pole star; a bright blue-white sun.'],
    ['Modulus of a complex number: |3 + 4i|', 'directInput', 'altair', 'Altair', 'Fast-Spinning Star', true, 'Spins so fast it is flattened into an oval.'],
    ['Average rate of change of f over [a, b]', 'directInput', 'polaris', 'Polaris', 'The North Star', true, 'A pulsing star that marks north for travellers.'],
    ['Slope of a secant (chord) between two points', 'directInput', 'betelgeuse', 'Betelgeuse', 'Red Supergiant', true, 'A giant star that will one day explode as a supernova.'],
    ['Estimate a limit of a continuous function: lim(x→a) f(x)', 'directInput', 'rigel', 'Rigel', 'Blue Supergiant', true, 'A brilliant blue supergiant in Orion.'],
    ['Read what a graph approaches (its limiting value)', 'mcOnly', 'sagittarius-a', 'Sagittarius A* (approach)', 'Galactic Centre', true, 'The supermassive black hole at the heart of our galaxy.'],
    ['Finale — the derivative as the limit of the secant slope', 'mcOnly', 'sagittarius-a', 'Sagittarius A* (core)', 'The Archive Core', true, 'Where the Odyssey ends — knowledge, not violence.']
  ];

  // ---- Assemble the flat arena list ----------------------------------------
  var _WORLD_ROWS = [
    ['numbers', _W_NUMBERS], ['expressions', _W_EXPRESSIONS], ['equations', _W_EQUATIONS],
    ['factoring', _W_FACTORING], ['quadratics', _W_QUADRATICS], ['functions', _W_FUNCTIONS],
    ['sequences', _W_SEQUENCES], ['logarithms', _W_LOGARITHMS], ['trigonometry', _W_TRIGONOMETRY],
    ['conics', _W_CONICS], ['calculus', _W_CALCULUS]
  ];

  // Deterministic unique 4-letter Worm Hole code from arena number (overridden below
  // for the 10 classic codes). n+1000 guarantees 4 base-26 letters, unique per n.
  function _genCode(n){
    var v = n + 1000, s = '';
    for (var i = 0; i < 4; i++){ s = String.fromCharCode(65 + (v % 26)) + s; v = Math.floor(v / 26); }
    return s;
  }

  var CURRICULUM = [];
  (function(){
    var n = 1;
    _WORLD_ROWS.forEach(function(w){
      var worldId = w[0];
      w[1].forEach(function(row){
        CURRICULUM.push({
          n: n, worldId: worldId,
          // Systems are grouped into ONE region per world (fewer atlas cards). The real
          // star each body belongs to is kept in `origSystem` for reference/facts.
          systemId: (worldId === 'numbers') ? 'sol' : worldId,
          origSystem: row[2],
          topic: row[0], mechanic: row[1], code: _genCode(n),
          gen: null,   // set when a per-topic generator is authored (else "Coming soon")
          body: { name: row[3], kind: row[4], real: row[5] !== false, fact: row[6] || '' }
        });
        n++;
      });
    });
    // Preserve the 10 classic Worm Hole codes on arenas 1–10.
    ['SEED','GROW','ROOT','WIND','LAKE','FIRE','SAND','VOID','HERO','STAR'].forEach(function(c, i){
      if (CURRICULUM[i]) CURRICULUM[i].code = c;
    });
    // Stamp each world with its arena range (for the atlas / docs).
    MATH_WORLDS.forEach(function(mw){
      var rows = CURRICULUM.filter(function(a){ return a.worldId === mw.id; });
      mw.startArena = rows.length ? rows[0].n : 0;
      mw.endArena   = rows.length ? rows[rows.length - 1].n : 0;
    });
    // Stamp each real star system (worlds.config.js, loaded before this) with the run of
    // arenas it hosts, so the Star Atlas and docs can show "which planets live here".
    if (typeof STAR_SYSTEMS !== 'undefined'){
      STAR_SYSTEMS.forEach(function(sys){
        var rows = CURRICULUM.filter(function(a){ return a.systemId === sys.id; });
        sys.planets   = rows.length;
        sys.arenaStart = rows.length ? rows[0].n : null;
        sys.arenaEnd   = rows.length ? rows[rows.length - 1].n : null;
      });
    }
  })();

  // ---- Lookups ----------------------------------------------------------------
  function getArena(n){ return CURRICULUM[n - 1] || null; }
  function arenasForSystem(id){ return CURRICULUM.filter(function(a){ return a.systemId === id; }); }
  function arenasForWorld(id){ return CURRICULUM.filter(function(a){ return a.worldId === id; }); }
  function arenaByCode(code){
    var up = (code || '').toUpperCase();
    for (var i = 0; i < CURRICULUM.length; i++) if (CURRICULUM[i].code === up) return CURRICULUM[i];
    return null;
  }
  var CURRICULUM_MAX = CURRICULUM.length;   // 133
