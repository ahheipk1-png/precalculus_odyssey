# Planets, Topics & Question Styles — Precalculus Odyssey

> **Source of truth:** generated from `game/config/curriculum.config.js` (`CURRICULUM`) + the authored
> generators in `game/js/28-arena-generators.js`. A star system = a math world; a planet = an arena
> (Planet 1 = the Sun). Regenerate this table from the live config after any change.

**187 planets** across **11 math worlds**, each planet a **real astronomical body** (a few clearly
marked *imagined* comets fill gaps). Every planet is **playable** with a verified, uniquely-correct
question. Kids learn astronomy while doing math from integers all the way to the idea of a derivative.

## The five question styles

| Style | What the player sees | How they answer |
|---|---|---|
| **Balance** | An equation on a balance scale (`3x + 5 = 20`) | Tap an operation, type an integer, Apply |
| **Rearrange** | A formula ("make `a` the subject") | Type a letter to move terms |
| **Choose&Morph** | An expression + 4 choices | Tap the correct transform; it morphs and continues |
| **Identify** | A question + 4 choices | One tap on the right answer |
| **Compute** | A question + one number box | Type one positive integer, Submit |

*Compute answers are always non-negative integers; anything negative or fractional uses Identify.*

## The 11 worlds

| # | World | Planets | Focus |
|---|---|---|---|
| I | Numbers | 1–24 | integers, primes, powers, roots, standard form |
| II | Expressions | 25–46 | words→algebra, like terms, brackets, change of subject |
| III | Equations | 47–68 | linear equations, inequalities, simultaneous |
| IV | Factoring | 69–90 | HCF, difference of squares, trinomials, factor theorem |
| V | Quadratics | 91–111 | roots, completing the square, discriminant, formula |
| VI | Functions | 112–133 | f(x), domain, graphs, families, exponentials |
| VII | Sequences | 134–144 | arithmetic & geometric sequences, patterns, series |
| VIII | Logarithms | 145–154 | meaning of logs, evaluating, log laws, solving |
| IX | Trigonometry | 155–166 | right-triangle ratios, Pythagoras, unit circle, identities |
| X | Coordinate Geometry | 167–176 | distance, midpoint, gradient, lines, circles, conics |
| XI | The Calculus Threshold | 177–187 | complex numbers, rates of change, limits (finale at Sagittarius A*) |

The ten original Worm Hole codes (`SEED … STAR`) are preserved on Planets 1–10; the rest are
auto-generated. All 187 codes are listed below.

---

## Curriculum — topics per star system → planet

### The Sol System · Numbers (Planets 1–24)
_The Sun (yellow dwarf) · 0 ly._ Our home system — planets, moons, dwarf planets and comets.

| Planet | Body | Topic | Style | Code |
|---|---|---|---|---|
| 1 | The Sun | Comparing & ordering integers on the number line | Identify | `SEED` |
| 2 | Mercury | Adding integers, including negatives | Identify | `GROW` |
| 3 | Venus | Subtracting integers (subtracting a negative) | Identify | `ROOT` |
| 4 | Earth | Multiplying & dividing integers (sign rules) | Identify | `WIND` |
| 5 | The Moon | One- & two-step equations with negative solutions | Balance | `LAKE` |
| 6 | Mars | Order of operations (BODMAS) — first step | Identify | `FIRE` |
| 7 | Phobos | Order of operations with brackets & powers | Compute | `SAND` |
| 8 | Deimos | Identifying prime numbers | Identify | `VOID` |
| 9 | Ceres | Factors of a number | Identify | `HERO` |
| 10 | Vesta | Multiples & common multiples | Compute | `STAR` |
| 11 | Jupiter | Prime factorization via a factor tree | Identify | `ABMX` |
| 12 | Io | Highest Common Factor (HCF) | Compute | `ABMY` |
| 13 | Europa | Lowest Common Multiple (LCM) — real-life | Compute | `ABMZ` |
| 14 | Ganymede | Powers as repeated multiplication | Compute | `ABNA` |
| 15 | Callisto | Index law — product rule | Compute | `ABNB` |
| 16 | Saturn | Index law — quotient rule | Compute | `ABNC` |
| 17 | Titan | Index law — power of a power | Compute | `ABND` |
| 18 | Enceladus | Zero & negative indices | Identify | `ABNE` |
| 19 | Uranus | Combining index laws (multi-step) | Compute | `ABNF` |
| 20 | Neptune | Square & cube roots (perfect) | Compute | `ABNG` |
| 21 | Triton | Simplifying radicals (surds) | Identify | `ABNH` |
| 22 | Pluto | Large numbers in standard form | Identify | `ABNI` |
| 23 | Eris | Small numbers in standard form | Identify | `ABNJ` |
| 24 | Halley's Comet | Multiplying in standard form | Identify | `ABNK` |

### World II · Expressions (Planets 25–46)
Systems: **TRAPPIST-1** (25–31), **Tau Ceti** (32–35), **Proxima Centauri** (36–37), **Gliese 876** (38–41), **Upsilon Andromedae** (42–44), **Ross 128** (45), **Barnard's Star** (46).

| Planet | Body | Topic | Style | Code |
|---|---|---|---|---|
| 25 | TRAPPIST-1 b | Translate: one operation (add / more than) | Identify | `ABNL` |
| 26 | TRAPPIST-1 c | Translate: repeated groups (multiplication) | Identify | `ABNM` |
| 27 | TRAPPIST-1 d | Translate: two operations (rate + fixed) | Identify | `ABNN` |
| 28 | TRAPPIST-1 e | Translate: sharing / division | Identify | `ABNO` |
| 29 | TRAPPIST-1 f | Substitution into a one-term expression | Compute | `ABNP` |
| 30 | TRAPPIST-1 g | Substitution into a two-operation expression | Compute | `ABNQ` |
| 31 | TRAPPIST-1 h | Translate THEN evaluate | Compute | `ABNR` |
| 32 | Tau Ceti e | Collect like terms: single variable | Identify | `ABNS` |
| 33 | Tau Ceti f | Collect like terms: variable + constant | Identify | `ABNT` |
| 34 | Tau Ceti g | Collect like terms: two variables | Identify | `ABNU` |
| 35 | Tau Ceti h | Collect like terms THEN substitute | Compute | `ABNV` |
| 36 | Proxima b | Expand a single bracket | Identify | `ABNW` |
| 37 | Proxima d | Expand a single bracket (subtraction, coefficient) | Identify | `ABNX` |
| 38 | Gliese 876 b | Expand two brackets AND collect | Identify | `ABNY` |
| 39 | Gliese 876 c | Expand double brackets (FOIL), positive | Identify | `ABNZ` |
| 40 | Gliese 876 d | Expand double brackets (FOIL) with subtraction | Identify | `ABOA` |
| 41 | Gliese 876 e | Expand a squared bracket | Identify | `ABOB` |
| 42 | Upsilon And b | Change of subject: additive term | Identify | `ABOC` |
| 43 | Upsilon And c | Change of subject: multiplicative term | Identify | `ABOD` |
| 44 | Upsilon And d | Change of subject: two operations | Identify | `ABOE` |
| 45 | Ross 128 b | Change of subject: real-world formula | Identify | `ABOF` |
| 46 | Barnard b | Change of subject requiring expansion | Identify | `ABOG` |

### World III · Equations (Planets 47–68)
Systems: **Kepler-90** (47–54, Balance), **Kepler-11** (55–60), **HD 40307** (61–66), **Gliese 581** (67–68).

| Planet | Body | Topic | Style | Code |
|---|---|---|---|---|
| 47 | Kepler-90 b | One-step linear equations (add / subtract) | Balance | `ABOH` |
| 48 | Kepler-90 c | One-step linear equations (multiply / divide) | Balance | `ABOI` |
| 49 | Kepler-90 d | Two-step linear equations | Balance | `ABOJ` |
| 50 | Kepler-90 e | Two-step with a divided variable | Balance | `ABOK` |
| 51 | Kepler-90 f | Brackets — expand, then solve | Choose&Morph | `ABOL` |
| 52 | Kepler-90 g | Multi-step: variables on both sides | Balance | `ABOM` |
| 53 | Kepler-90 h | Change of subject of a formula | Balance/Rearrange | `ABON` |
| 54 | Kepler-90 i | Boss: brackets + variables both sides | Balance | `ABOO` |
| 55 | Kepler-11 b | One-step inequalities (add / subtract) | Compute | `ABOP` |
| 56 | Kepler-11 c | One-step inequalities (multiply / divide) | Compute | `ABOQ` |
| 57 | Kepler-11 d | Two-step inequalities | Compute | `ABOR` |
| 58 | Kepler-11 e | Real-life to an inequality | Compute | `ABOS` |
| 59 | Kepler-11 f | The Flip Rule (concept) | Identify | `ABOT` |
| 60 | Kepler-11 g | Reading inequalities | Identify | `ABOU` |
| 61 | HD 40307 b | Boss: multi-step inequality with a flip | Identify | `ABOV` |
| 62 | HD 40307 c | What a solution to a system means | Identify | `ABOW` |
| 63 | HD 40307 d | Substitution — plug in | Compute | `ABOX` |
| 64 | HD 40307 e | Substitution — find both unknowns | Compute | `ABOY` |
| 65 | HD 40307 f | Elimination by adding | Compute | `ABOZ` |
| 66 | HD 40307 g | Elimination by subtracting | Compute | `ABPA` |
| 67 | Gliese 581 c | Elimination with scaling | Compute | `ABPB` |
| 68 | Gliese 581 e | Real-life system — boss | Compute | `ABPC` |

### World IV · Factoring (Planets 69–90)
Systems: **HD 10180** (69–74), **Kepler-80** (75–79), **Gliese 667C** (80–83, 90), **Kepler-62** (84–89).

| Planet | Body | Topic | Style | Code |
|---|---|---|---|---|
| 69 | HD 10180 c | HCF of two numbers | Compute | `ABPD` |
| 70 | HD 10180 d | Common factor of two algebraic terms | Identify | `ABPE` |
| 71 | HD 10180 e | Scalar common-factor extraction | Identify | `ABPF` |
| 72 | HD 10180 f | Common variable-factor extraction | Identify | `ABPG` |
| 73 | HD 10180 g | Extract the HCF (number AND variable) | Identify | `ABPH` |
| 74 | HD 10180 h | Recognize a difference of two squares | Identify | `ABPI` |
| 75 | Kepler-80 b | Factorize a simple difference of two squares | Identify | `ABPJ` |
| 76 | Kepler-80 c | Difference of squares with a leading coefficient | Identify | `ABPK` |
| 77 | Kepler-80 d | Factorize DOTS, then the positive solution | Compute | `ABPL` |
| 78 | Kepler-80 e | Factorization by grouping (a=1) | Identify | `ABPM` |
| 79 | Kepler-80 g | Factorization by grouping (a>1) | Identify | `ABPN` |
| 80 | Gliese 667Cb | Number pair for a monic trinomial | Identify | `ABPO` |
| 81 | Gliese 667Cc | Factorize a monic trinomial (all positive) | Identify | `ABPP` |
| 82 | Gliese 667Ce | Monic trinomial, negative middle | Identify | `ABPQ` |
| 83 | Gliese 667Cf | Monic trinomial, mixed-sign constant | Identify | `ABPR` |
| 84 | Kepler-62 b | Factorize, then give a root | Compute | `ABPS` |
| 85 | Kepler-62 c | Non-monic trinomial (split the middle) | Identify | `ABPT` |
| 86 | Kepler-62 d | Second non-monic trinomial (ac-method) | Identify | `ABPU` |
| 87 | Kepler-62 e | Evaluate a polynomial at a value | Compute | `ABPV` |
| 88 | Kepler-62 f | Apply the factor theorem | Identify | `ABPW` |
| 89 | Kepler-62 f II *(imagined)* | Factor theorem: find the integer root | Compute | `ABPX` |
| 90 | Gliese 667C h *(imagined)* | Boss: cubic factorization | Identify | `ABPY` |

### World V · Quadratics (Planets 91–111)
Systems: **55 Cancri** (91–95), **K2-138** (96–101), **Kepler-20** (102–106), **TOI-700** (107–111).

| Planet | Body | Topic | Style | Code |
|---|---|---|---|---|
| 91 | 55 Cancri b | Recognise a quadratic expression | Identify | `ABPZ` |
| 92 | 55 Cancri c | Identify coefficients a, b, c | Compute | `ABQA` |
| 93 | 55 Cancri d | Factor out a common monomial | Identify | `ABQB` |
| 94 | 55 Cancri e ⭐diamond | Zero product property — roots | Identify | `ABQC` |
| 95 | 55 Cancri f | Solve a fully factored equation | Compute | `ABQD` |
| 96 | K2-138 b | Factor a monic trinomial, read its roots | Compute | `ABQE` |
| 97 | K2-138 c | Real-life: garden area | Compute | `ABQF` |
| 98 | K2-138 d | Recognise a perfect-square trinomial | Identify | `ABQG` |
| 99 | K2-138 e | Completing the square — the constant | Compute | `ABQH` |
| 100 | K2-138 f | Perfect-square trinomial as a squared bracket | Identify | `ABQI` |
| 101 | K2-138 g | Roots via square roots (x² = k) | Compute | `ABQJ` |
| 102 | Kepler-20 b | Completing the square — transform | Compute | `ABQK` |
| 103 | Kepler-20 c | Solve by completing the square | Compute | `ABQL` |
| 104 | Kepler-20 d | Projectile max height (vertex form) | Identify | `ABQM` |
| 105 | Kepler-20 e | Read a, b, c from an equation | Compute | `ABQN` |
| 106 | Kepler-20 f | Compute the discriminant | Compute | `ABQO` |
| 107 | TOI-700 b | Nature of roots from the discriminant | Identify | `ABQP` |
| 108 | TOI-700 c | Determine nature for a specific equation | Identify | `ABQQ` |
| 109 | TOI-700 d | Quadratic formula — a root | Compute | `ABQR` |
| 110 | TOI-700 e | Full quadratic-formula flow | Compute | `ABQS` |
| 111 | TOI-700 f *(imagined)* | Boss: projectile timing | Compute | `ABQT` |

### World VI · Functions (Planets 112–133)
Systems: **TOI-178** (112–117), **Kepler-186** (118–122), **HD 34445** (123–128), **Kepler-296** (129–133).

| Planet | Body | Topic | Style | Code |
|---|---|---|---|---|
| 112 | TOI-178 b | Reading function notation f(x) | Identify | `ABQU` |
| 113 | TOI-178 c | Evaluate a one-step linear function | Compute | `ABQV` |
| 114 | TOI-178 d | Evaluate a two-step linear function | Compute | `ABQW` |
| 115 | TOI-178 e | Evaluate with subtraction | Compute | `ABQX` |
| 116 | TOI-178 f | Evaluate a quadratic | Compute | `ABQY` |
| 117 | TOI-178 g | Find the input given the output (f(x)=k) | Compute | `ABQZ` |
| 118 | Kepler-186 b | Inverse function intro | Identify | `ABRA` |
| 119 | Kepler-186 c | Composite evaluation g(f(x)) | Compute | `ABRB` |
| 120 | Kepler-186 d | Domain of a linear/polynomial function | Identify | `ABRC` |
| 121 | Kepler-186 e | Domain of a rational function (concept) | Identify | `ABRD` |
| 122 | Kepler-186 f | Excluded value of a rational function | Compute | `ABRE` |
| 123 | HD 34445 b | Read a value off a graph, f(a) | Compute | `ABRF` |
| 124 | HD 34445 c | Range from a graph | Identify | `ABRG` |
| 125 | HD 34445 d | Read an intercept | Compute | `ABRH` |
| 126 | HD 34445 e | Increasing vs decreasing | Identify | `ABRI` |
| 127 | HD 34445 f | Classify the function family | Identify | `ABRJ` |
| 128 | HD 34445 g | Evaluate a higher-degree polynomial | Compute | `ABRK` |
| 129 | Kepler-296 b | Polynomial degree / max crossings | Identify | `ABRL` |
| 130 | Kepler-296 c | Rational function vertical asymptote | Compute | `ABRM` |
| 131 | Kepler-296 d | Evaluate an exponential function | Compute | `ABRN` |
| 132 | Kepler-296 e | Solve an exponential by matching bases | Compute | `ABRO` |
| 133 | Kepler-296 f | Real-life exponential growth | Compute | `ABRP` |

### World VII · Sequences & Series (Planets 134–144)
Systems: **HD 219134** (134–139), **Wolf 1061** (140–142), **Gliese 163** (143–144).

| Planet | Body | Topic | Style | Code |
|---|---|---|---|---|
| 134 | HD 219134 b | Next term of an arithmetic sequence | Compute | `ABRQ` |
| 135 | HD 219134 c | Common difference | Compute | `ABRR` |
| 136 | HD 219134 d | k-th term of an arithmetic sequence | Compute | `ABRS` |
| 137 | HD 219134 f | Arithmetic or geometric? | Identify | `ABRT` |
| 138 | HD 219134 g | Common ratio | Compute | `ABRU` |
| 139 | HD 219134 h | Next term of a geometric sequence | Compute | `ABRV` |
| 140 | Wolf 1061 b | k-th term of a geometric sequence | Compute | `ABRW` |
| 141 | Wolf 1061 c | Sum the first n terms (arithmetic) | Compute | `ABRX` |
| 142 | Wolf 1061 d | Triangular / square number pattern | Compute | `ABRY` |
| 143 | Gliese 163 b | Next Fibonacci number | Compute | `ABRZ` |
| 144 | Gliese 163 c | Sum a short geometric series | Compute | `ABSA` |

### World VIII · Logarithms (Planets 145–154)
Systems: **Kepler-102** (145–149), **Kepler-138** (150–154).

| Planet | Body | Topic | Style | Code |
|---|---|---|---|---|
| 145 | Kepler-102 b | What a logarithm means | Identify | `ABSB` |
| 146 | Kepler-102 c | Evaluate log₂ | Compute | `ABSC` |
| 147 | Kepler-102 d | Evaluate log₁₀ | Compute | `ABSD` |
| 148 | Kepler-102 e | Evaluate a base-b logarithm | Compute | `ABSE` |
| 149 | Kepler-102 f | logₐ(1) | Identify | `ABSF` |
| 150 | Kepler-138 b | logₐ(a) | Identify | `ABSG` |
| 151 | Kepler-138 c | The product law | Identify | `ABSH` |
| 152 | Kepler-138 d | Solve log₂ x = k | Compute | `ABSI` |
| 153 | Kepler-138 e | Rewrite an exponential in log form | Identify | `ABSJ` |
| 154 | Kepler-138 f *(imagined)* | Evaluate logₐ(aᵏ) | Compute | `ABSK` |

### World IX · Trigonometry (Planets 155–166)
Systems: **YZ Ceti** (155–157), **Teegarden's Star** (158–159, 166), **Luyten's Star** (160–161, 164), **Gliese 1002** (162–163), **Gliese 163** (165).

| Planet | Body | Topic | Style | Code |
|---|---|---|---|---|
| 155 | YZ Ceti b | Label a right triangle | Identify | `ABSL` |
| 156 | YZ Ceti c | Which ratio is sin θ? | Identify | `ABSM` |
| 157 | YZ Ceti d | Pythagoras: find the hypotenuse | Compute | `ABSN` |
| 158 | Teegarden's b | Pythagoras: find a leg | Compute | `ABSO` |
| 159 | Teegarden's c | Value of sin 30° | Identify | `ABSP` |
| 160 | Luyten b | Value of cos 60° | Identify | `ABSQ` |
| 161 | Luyten c | Value of tan 45° | Identify | `ABSR` |
| 162 | Gliese 1002 b | Unit circle: sin 90° | Identify | `ABSS` |
| 163 | Gliese 1002 c | Degrees in a straight line / full turn | Compute | `ABST` |
| 164 | Luyten d | Pythagorean identity | Identify | `ABSU` |
| 165 | Gliese 163 d | Angle from a simple ratio (tan θ = 1) | Compute | `ABSV` |
| 166 | Teegarden's d *(imagined)* | Degrees in a right angle | Compute | `ABSW` |

### World X · Coordinate Geometry & Conics (Planets 167–176)
Systems: **51 Pegasi** (167), **Kepler-160** (168–170), **Kepler-442** (171), **Kepler-1649** (172–173), **Kepler-452** (174), **Kepler-22** (175), **Kepler-1229** (176).

| Planet | Body | Topic | Style | Code |
|---|---|---|---|---|
| 167 | 51 Pegasi b | Distance on a horizontal line | Compute | `ABSX` |
| 168 | Kepler-160 b | Distance (Pythagoras) | Compute | `ABSY` |
| 169 | Kepler-160 c | Midpoint (x-coordinate) | Compute | `ABSZ` |
| 170 | Kepler-160 d | Gradient of a line | Compute | `ABTA` |
| 171 | Kepler-442 b | y-intercept from y = mx + c | Identify | `ABTB` |
| 172 | Kepler-1649 b | Circle x²+y²=r²: the radius | Compute | `ABTC` |
| 173 | Kepler-1649 c | Circle centre (x−a)²+(y−b)²=r² | Identify | `ABTD` |
| 174 | Kepler-452 b | Identify the conic | Identify | `ABTE` |
| 175 | Kepler-22 b | Parabola y=x²: the vertex | Identify | `ABTF` |
| 176 | Kepler-1229 b | Distance from the origin | Compute | `ABTG` |

### World XI · The Calculus Threshold (Planets 177–187)
Systems: **Sirius** (177–178), **Procyon** (179–180), **Vega** (181), **Altair** (182), **Polaris** (183), **Betelgeuse** (184), **Rigel** (185), **Sagittarius A\*** (186–187, the finale).

| Planet | Body | Topic | Style | Code |
|---|---|---|---|---|
| 177 | Sirius A | The imaginary unit: i² | Identify | `ABTH` |
| 178 | Sirius B | Powers of i: i⁴ | Compute | `ABTI` |
| 179 | Procyon A | Add complex numbers: real part | Compute | `ABTJ` |
| 180 | Procyon B | Complex conjugate | Identify | `ABTK` |
| 181 | Vega | Negative discriminant: real roots? | Identify | `ABTL` |
| 182 | Altair | Modulus of a complex number | Compute | `ABTM` |
| 183 | Polaris | Average rate of change | Compute | `ABTN` |
| 184 | Betelgeuse | Slope of a secant | Compute | `ABTO` |
| 185 | Rigel | Estimate a limit | Compute | `ABTP` |
| 186 | Sagittarius A* (approach) | What a graph approaches | Identify | `ABTQ` |
| 187 | Sagittarius A* (core) | Finale — the derivative as a limit | Identify | `ABTR` |

---

_Generated from the live config. Keep `docs/` in sync (start at `docs/README.md`)._
