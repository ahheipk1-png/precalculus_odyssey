# Gameplay (equation core, planets, progression)

← [docs orchestra](README.md)

## The learning loop

The player isolates `x` (or a formula's subject) by **applying the same operation to both sides**
until it stands alone — not by guessing a final numeric answer. The balance-scale visual reinforces
that an equation is *always* balanced; only an *invalid* operation visually upsets it.

## The five question styles (`modeRegistry` in `04-logic.js`)

Not every planet is an equation — each topic uses the style that fits it:

| Mode | Player sees | Input | Example |
|---|---|---|---|
| `numeric` (Balance) | equation on the balance scale | integer + op (+ − × ÷) to both sides | `2x + 3 = 11` |
| `bracket` (Choose&Morph) | expression + 4 choices | MC "expand" → morphs into numeric | `3(x − 6) = 18` |
| `formula` (Rearrange) | a formula to re-subject | type a **letter** to move a term | `V = IR → make I the subject` |
| `mcOnly` (Identify) | prompt + 4 choices | **one tap** on the right answer | "Which is prime? 9·15·**17**·21" |
| `directInput` (Compute) | prompt + one number box | type an integer + Submit | "What is 2⁵?" → `32` |
| `graph` (Graph) | a coordinate grid | **tap a lattice point**, or **tap two points on a line** | "Tap the MIDPOINT of A,B" / "Tap two points on y=2x+1" |

Plus `comingSoon`: a not-yet-authored planet shows its real topic + astronomy and a "🔭 Preview"
card (never a mismatched question). Modes are a registry (not if/else) so styles plug in; input stays
integer-only / letter / 4-way-tap / graph-lattice-tap (no free text) — keeps everything browser-testable.

**Coordinate-geometry graph — `js/31-graph.js` (`#graphPanel`).** A problem may carry a `graph` spec.
Two uses: (a) **static** — a Compute/Identify question also plots a grid (points, segments, a line,
a parabola, or a circle) alongside its normal answer box; used by the distance/gradient/vertex arenas
(167, 168, 170, 175, 176). (b) **interactive** (mode `graph`) — the grid IS the input:
`interactive:'point'` (tap the one correct lattice point — arena **169**, "tap the midpoint") or
`interactive:'line'` (tap two lattice points that lie on the target line — arena **171**, "tap two
points on y=mx+c"). `renderGraphPanel()` draws the SVG and wires clicks to `graphClick`/`graphClear`;
a correct tap calls `handleSolved`, a wrong one is exactly one `registerFail`. `buildGraphSVG` uses an
integer lattice so it stays tap-friendly and browser-testable. **Illustrative graphs (2026-07-14):**
`buildGraphSVG` also draws `polygons` (triangles, with an optional right-angle marker) and `ellipse`
(conics). Geometry/conic/quadratic arenas attach an illustration-only `.graph` via helpers in
28-arena-generators.js (`gTriangle`/`gCircle`/`gEllipse`/`gParab`/`withGraph`) — right-triangle arenas
(155-158) show the triangle, circle/conic arenas (162, 172, 174) show the circle/ellipse/parabola, and
quadratic-function/root arenas (77, 84, 87, 89, 91, 94-96, 101, 107, 109, 110, 116, 124, 129, 181)
show the parabola `y=ax²+bx+c` with its roots/vertex marked. The parabola's a,b,c and the triangle's
legs match the question exactly, so the graph is purely supplementary (never changes the answer). The
variety engine carries the seed's `.graph` onto same-instance derived styles (direct/mc/trueFalse/
errorAnalysis/estimate) but not compare/finale (which use two instances). **Layout:** the SVG (`.coord-graph`)
renders up to 500 px wide (`min(500px, 78vw)`) and is **centred** in the wide quest panel — its wrapper
`#graphPanel.graph-panel` is a full-width flex column, so `renderGraphPanel()` must set
`el0.style.display = 'flex'` (an inline `'block'` would beat the class's `display:flex` and left-align it).

**Question variety — `js/33-variety.js` (`buildArenaTrial(n)`).** To avoid an arena being 10 copies
of one template with new numbers, a per-arena **trial** of 10 questions is composed from several
distinct STYLES, each *derived from the arena's own native, already-verified problem* — so every
derived question is correct by construction (its answer is the arena's answer). Styles are expressed
as the existing render modes (`mcOnly`/`directInput`), so no renderer change was needed.
`loadProblem` pulls `state.trial[state.levelSolves]` (see `_varietyProblem`, 05-render.js), rebuilding
the trial when the arena changes; `VARIETY_ENABLED` gates it. Coverage (verified over all 187):
- **directInput arenas (~87):** full variety — 6–7 distinct styles (`direct`, `mc`, `trueFalse`,
  `errorAnalysis`, `compare`, `estimate`) + a two-step `finale` at Q10; ≤2–3 per style, ~0 consecutive.
- **mcOnly arenas (~89):** 3 styles (`direct`, `trueFalse`, `errorAnalysis`) — capped because they
  expose no numeric answer to derive `mc`/`compare`/`estimate` from; still mixes, ~0 consecutive.
- **numeric/bracket/formula/graph arenas (~11):** `buildArenaTrial` returns null → native generator
  (unchanged behaviour).
Every composed question is validated by `_validOk` (mirrors `tools/validate-arenas.js`) before use;
a full sweep found **0 invalid questions**. Q10 always carries `finale:true`.

**MC correctness invariants.** Every Identify (`mcOnly`) arena must have **exactly one** correct
choice. Two subtle bugs to guard against: (1) `_mc` dedupes distractors by exact *string*, so a
distractor that is the same *set* as the answer slips through — e.g. arena 94's roots `x=2 or x=−2`
vs `x=−2 or x=2` (fixed by forcing the two factors' numbers to differ). (2) `#mcChoices` has TWO click
handlers — the per-button `answerMcOnly` (`05-render.js`) and the bracket-morph delegated handler
(`07-main.js`); the latter now bails unless `state.mode==='bracket'`, or it fires on every Identify tap
and double-counts the fail. Both are covered by browser audits: an unordered-set dedup, a
numeric-equivalence check (evaluate expression choices at many x), and property checks on the
classification arenas (prime / factor / difference-of-squares / perfect-square / quadratic / roots) —
all confirm exactly-one-correct across hundreds of generations.

**Input-style rule (design principle).** A question may only ask the player for one of: a **tap** (one
of 4 MC choices), a **single non-negative integer** (Compute), a **single letter** (change-of-subject),
or the **balance-scale** manipulation. Anything whose answer is more complex (e.g. a factorised
expression like `3x(x+5)`) must be **multiple choice**, not free text. An on-screen audit of all 187
planets confirms every one is answerable this way — the factorise/expand/simplify/inverse/log-form
topics are already `mcOnly` (you tap the correct expression). The only planets using the balance /
change-of-subject / expand-then-solve manipulations are the 7 Equations-world arenas (5, 49–54).

## The 187-planet curriculum (`curriculum.config.js` + `js/28-arena-generators.js`)

`generateProblem(level)` (`04-logic.js`) looks up the arena in `CURRICULUM` and dispatches to its
authored generator (`ARENA_GENS[n]`) by question style. **All 187 planets are authored and playable**
(a `comingSoon` fallback exists but is never hit). The full map of **187 planets × topic × question
style × real star system × real body** is `curriculum.config.js`; the generators live in
`js/28-arena-generators.js` — see [ROOMS_AND_CODES.md](../ROOMS_AND_CODES.md) for the per-system tables.

**11 math worlds** span 1–187 (`state.maxLevel = 187`): Numbers, Expressions, Equations, Factoring,
Quadratics, Functions, Sequences, Logarithms, Trigonometry, Coordinate Geometry, and The Calculus
Threshold (finale at Sagittarius A*). Each arena's `mechanic` is stamped from what its generator
actually returns, so the Star Atlas labels always match. Correctness is verified by an in-browser
sweep: ~28k structural generations + a semantic pass that expands/evaluates the algebra arenas to
confirm each has exactly one correct answer, and that every Compute answer is a non-negative integer.

**Formula letters are case-insensitive** (`sameToken` in `04-logic.js` + input canonicalization in
`07-main.js`). This fixed the `V=IR` bug where typing `r` (lowercased) never matched `R`.

**Unit-coefficient display.** A coefficient of 1 is implicit: `generateProblem` runs every arena's
`prompt`/`choices` through `_stripUnitCoef` (`04-logic.js`), so `1x → x`, `x² + 1x → x² + x`, `−1x → −x`
(but `21x`, `10x`, and a bare constant `x + 1` are untouched). The balance/bracket/formula scale
renderers already emit `x` (not `1x`) for `coeff === 1`, so this only affects the MC/Compute strings.

**Panel-visibility (`updatePanelVisibility`, `05-render.js`) — the `hidden`-attribute trap.** Each
mode shows only its own input. The Identify (`mcOnly`) choices live in `#mcChoices` *inside*
`#expandPanel`, and `.expand-panel[hidden]{display:none}` (specificity 0,2,0) **beats** an inline
`style.display=''`. So `#expandPanel` must be shown by toggling its `hidden` **attribute** + an explicit
`display`, not just `style.display` — otherwise all 90 Identify planets render with **no visible
choices** (the choices are `display:grid` but their parent is collapsed to 0×0). An on-screen audit
(non-zero rect + real `offsetParent`) confirms every one of the 187 planets shows a usable input:
90 Identify (4 taps), 88 Compute (number box), 6 balance, 3 bracket.

## Star systems & planets

- Progress is a **flat `state.level`** counter (1..`maxLevel`). `getChapterForLevel(level)`
  (`01-data.js`) derives the chapter (= a **star system**) and planet-in-system from the `chapters`
  registry in `config/worlds.config.js`. (Internal identifiers still say "room" = planet.)
- Only **Chapter 1 "Balance Quest"** (planets 1–10, the Sol system, linear equations/formulas/
  brackets) has content today. Planet content (warp codes, titles, formula bank, scene captions) is
  in `config/rooms.config.js`; per-planet astronomy in `config/planets.config.js`.
- Planet difficulty widens with planet number; planets 6–10 mix in formula (change-of-subject)
  problems.
- **Worm Hole** (🌀 header button): a 4-letter code (`levelCodes`) jumps to a planet, with a
  swirling **warp FX** (`playWarpFx`); the planet switches mid-animation.

## Scoring, rewards & the solve clock

`handleSolved` (`05-render.js`): rating 3/2/1 by moves-vs-par → Cash + XP + score + streak; the
reward-scene animation advances; `state.solveClock++` (the Farm's growth clock, see
[world-and-hubs.md](world-and-hubs.md)). Boss Gate opens at 6 solves; 9 solves auto-advances the
planet.

## Lives, hints & game-over (this session)

- **Hints** (`💡 Hint`) are offered only on the **first 2 questions** of each planet.
- **5 wrong answers on a planet = Game Over → the planet restarts.** `registerFail()` fires only on
  a *genuine* error (invalid op, wrong bracket expansion, wrong MC choice, wrong formula letter) — a
  *legal-but-unproductive* balance move does **not** cost a life. UI: `#livesRow` (❤️/🖤),
  `#gameOverOverlay`, `restartRoom()` (also the **🔄 Restart Arena** button — leave/restart any time).
  The arena console is now **How to play · Hint · Restart Arena · Boss Gate** — the old "Back to Earth"
  button was removed (Earth is on the global header nav).

## Reward scenes

`renderSceneForLevel` (`05-render.js`) draws a per-planet hand-animated SVG that fills as the
planet's streak grows; captions per stage come from `sceneCaptions` (config). A slim **astronomy
card** at the top of the equation view shows the planet's real Sol body (see [story-astronomy.md](story-astronomy.md)).
