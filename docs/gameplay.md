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
and double-counts the fail. **2026-07-17 fix**: the bracket-morph's `expandBtn` click handler built
the 4 MC choices and cleared `#mcChoices`'s `hidden` attribute correctly, but never reset the
inline `style.display='none'` left over from `updateProblemDisplay` hiding the panel — so on a real
click the button vanished and NOTHING appeared (buttons existed in the DOM, just invisible). A
synthetic `.click()` + checking `.hidden` in the console missed this; only a real mouse click
through a screenshot caught it. Fixed by also setting `style.display='grid'` in the handler. Both are covered by browser audits: an unordered-set dedup, a
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

## The 65-arena Bible curriculum (`curriculum.config.js` + `config/generated/*.js`)

The curriculum was **rebuilt from the 59-phase Question Bible** (2026-07 overnight batch). There are
now **65 arenas**: 6 condensed pre-algebra warm-ups (integers → standard form) followed by the 59
Bible phases, **one arena per phase** (linear equations → inequalities → functions → … → conics /
vectors / complex numbers / final boss). `generateProblem(level)` (`04-logic.js`) dispatches by
mechanic — see the "Bible curriculum & learning support" section in
[architecture.md](architecture.md) for the full routing, distractor repair, and
hint/tutorial/Socratic wiring.

- **Equation Battle is preserved (locked requirement):** the linear-solving arenas
  (`numeric/formula/bracket`) use the native balance-scale solver; Bible templates flagged
  equation-battle-compatible route INTO it, never flattened to multiple choice.
- **Bible arenas** (those with a `phaseId`) serve authored `QUESTION_TEMPLATES` questions as
  multiple choice; `33-variety.js` returns `null` for them so they bypass the pre-algebra variety
  transforms. `28-arena-generators.js`'s atlas-stamping loop skips them so their config `mechanic`
  survives.
- **11 real star systems** span arenas 1–65 (`state.maxLevel = 65`, `CURRICULUM_MAX = 65`): Sol,
  TRAPPIST-1, Tau Ceti, Proxima Centauri, Gliese 876, Upsilon Andromedae, Ross 128, Barnard's Star,
  Kepler-90, Kepler-11, HD 40307. Each arena's astronomy body is pinned by slot number, so the
  rebuild never shifts a planet's photo/facts.

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
[world-and-hubs.md](world-and-hubs.md)). The **Boss Gate opens at `ARENA_GOAL` = 10 correct solves**
(`01-data.js`), setting `state.gatePending`/`state.bossGateUnlocked = true`.

**2026-07-16 — Boss Gate: a real modal notice + a persistent header button.** Previously the moment
the gate opened it auto-forced the WHOLE practice screen into a "Challenge Boss / Keep Training"
choice screen (`showGateScreen`, via a bare `showMsg` feedback line easy to miss), interrupting
practice. Now: `showBossGateNotice()` fires instead — a real, `position:fixed` (always on-screen
regardless of scroll, unlike the board-relative `#gameOverOverlay`) modal (`#bossGateOverlay`)
announcing the gate is open, dismissed only by clicking **OK** (`closeBossGateNotice()`); practice
continues underneath uninterrupted (`loadProblem()` still runs). Dismissing reveals a persistent,
pulsing **⚔️ Boss Gate Open!** button (`#gateEnterBtn`) — moved from a buried practice-screen action
row into the **header** (`.header-actions`, top of every screen, first button, gold via `--yellow`)
so it's visible from anywhere. Clicking it is what now calls `showGateScreen()` (the Challenge/Keep
Training choice, unchanged). The button is hidden explicitly the instant the player enters the boss
room (`openBattle()`) — it used to disappear "for free" by living inside the equation view that got
deactivated there, which no longer applies now that it's a persistent header element. Leaving the
boss undefeated (`returnToArenaFromBoss`) still closes the gate and hides the button, same as before.

**2026-07-16 — Boss Gate button: always visible, grey when closed (never `display:none`).** Every
call site that toggled `#gateEnterBtn`'s `style.display` now goes through one shared
`setGateButton(open)` (`05-render.js`), which never hides the button — instead it toggles a
`.gate-closed` CSS class (grey background, no glow/pulse, `disabled=true`, label `🔒 Boss Gate`) vs.
the open state (gold pulsing `⚔️ Boss Gate Open!`, enabled). `index.html`'s button now starts
`disabled` + `.gate-closed` by default instead of `style="display:none"`, so there's no flash of the
gold button before JS runs. A disabled `<button>` doesn't fire click events, so the closed state is
inert without needing an extra guard in the click handler.

**2026-07-16 — Boss Gate click now works from any screen.** Because the button lives in the always-
visible header, it can be clicked from Earth Hub / Space Atlas / shop / Wonderland / profile — but
`showGateScreen()` reveals `#levelGateActions`, which is nested inside `#equationView` (a
`.view-container` that is `display:none` unless active). Clicking off the practice screen therefore
toggled panels inside a hidden container and "nothing happened". Fix (`showGateScreen`, `05-render.js`):
first activate `#equationView` (mirrors `returnToArenaFromBoss`), then reveal the boss-choice, then
`scrollIntoView({block:'center'})` the actions (they render well below the fold on a tall page).

**2026-07-17 — Boss Gate click = a confirm popup, straight to the boss (supersedes the in-console
choice screen above).** The player found the "Choose your move / Challenge Planet Boss / Keep
Training" console swap confusing. Now clicking **⚔️ Boss Gate Open!** opens a modal
(`#bossLeaveOverlay` in `index.html`, same `gameover-overlay bossgate-overlay` styling as the
gate-open notice): *"Challenge the Planet Boss? Are you sure you want to leave the arena?…"* with
**⚔️ Yes — to the boss!** and **↩ Not yet**. `showGateScreen()` (`05-render.js`) now just shows the
overlay; the new `confirmBossLeave(yes)` hides it and, on yes, deactivates every `.view-container`
(the button is clickable from ANY view, and `openBattle` only deactivates equation/shop itself),
activates `#equationView`, then calls `openBattle()` — the gate-closes-if-you-flee rule is unchanged.
The **"Choose your move" `<h2>`** was removed from the console heading (`08-layout.js`; the kicker
"Algebra Console" + `#controlHint` remain). `#levelGateActions` (Challenge/Keep-Training buttons) is
now never shown — the markup + listeners stay because many code paths still call
`el.levelGateActions.style.display='none'` and `hideGateScreen()` (still used by `closeShop`);
removing the node would null those refs and break init. Verified in-browser: overlay pops on click,
No closes it with no state change, Yes fires `openBattle` (spy) with `#equationView` active.

**2026-07-17 — Real human-style playtest of arena-1 question quality (`docs/playtest-methodology.md`
has the reusable how-to).** Answered 10 real arena-1 questions through the actual UI (not the
console) as a fresh local profile, judging each MC choice the way a student would read it.
- **The hand-authored pre-algebra distractors (`ARENA_GENS`, arena 1) are genuinely well-designed** —
  every wrong choice traced to a plausible real mistake: sign errors on negative×negative (`(−1)×(−4)`
  offered `-4` — the classic "forgot two negatives make a positive"), doubling instead of multiplying
  (`8` for `4×1`), off-by-one arithmetic slips (`3` for `4×1`), squaring instead of multiplying two
  different numbers (`25` for `5×5`, i.e. `5²` used instead of the actual product). One softer example:
  `(−2)×(−5)=10` offered `15` as a distractor with no obvious derivation from 2 and 5 — not wrong or
  confusing, just less sharply "a real mistake" than its siblings. Minor, not a defect.
  **This was only arena 1** (pre-algebra, hand-authored) — the Bible-template phases (7-65, the
  `_perturbDistractors`/`_exprVariants`/`_siblingDistractors` fallback machinery documented in
  `04-logic.js`) were NOT sampled this session; that curriculum's question quality is still unverified
  by a human-style pass — see the open item this leaves in `AiAgentReadMe.md`.
- **The 3-strikes-then-reveal flow works correctly**: deliberately failed one question 3× — chances
  correctly counted down (`3 tries left` → `2 chances left` → reveal), the reveal-then-advance loaded
  a fresh question WITHOUT crediting arena progress (stayed at `8/10` through the failure, only moved
  forward once actually answered correctly) — so a player cannot brute-force through a question by
  losing on purpose. `state.streak` (labeled "🔥 solved" in the HUD) did **not** visibly drop during
  the deliberate-fail sequence — it tracked in lockstep with Arena Progress throughout (8→8→8→10 across
  both correct and failed attempts, same as Arena Progress), suggesting the HUD "Streak" label may
  really be a per-arena solve counter rather than a true consecutive-no-miss streak despite the name;
  not confirmed against source this session (only observed via play) — worth a source check.
- **Correct-answer rewards matched the documented formula exactly**: every fast correct solve paid
  `+15 Cash / +30 XP` (rating-3, `movesTaken <= par`), consistent with `05-render.js`'s
  `handleSolved` formula the whole run.

**2026-07-16 — Exponent placeholder `2^?` renders as a superscript.** The `mathPrettyBasic` superscript
regex (`04-logic.js`) matched `^` only before a digit, an ASCII-signed digit, or a single letter — so
in "2⁸ ÷ 2² = 2^?" the first two became superscripts but the `?` placeholder stayed a raw caret. The
regex now also accepts `?` and the Unicode minus (`^−4`), so laws-of-indices "find the power" prompts
render `2` with a raised `?` (equivalent to `$2^{?}$`). It's display-only — the answer comparison never
sees the rendered HTML — and fixes every generator/MC-choice/hint that flows through `mathPretty` at once.

## Lives, hints & game-over (this session)

- **Hints** (`💡 Hint`) are now available on **every question** via a 6-level progressive ladder
  (see architecture.md). A `📖 How to play` tutorial and a `🦉 Ask the tutor` Socratic chat sit
  beside it. Bodies with no real photo show a **🎨 Artist's impression** caption.
- **Chances per QUESTION (not per arena) — `MAX_ROOM_FAILS`, `05-render.js`.** `registerFail()` /
  `gradeAnswer()`'s wrong branch fire only on a *genuine* error (invalid op, wrong bracket expansion,
  wrong MC choice, wrong formula letter) — a *legal-but-unproductive* balance move does **not** cost
  a chance. UI: `#livesRow` (❤️/🖤), `flashWrongLight()` (a brief red glow on the lives row on every
  wrong attempt). `restartRoom()` is also the **🔄 Restart Arena** button — leave/restart any time.
  The arena console is **How to play · Hint · Restart Arena · Boss Gate** — the old "Back to Earth"
  button was removed (Earth is on the global header nav).
  - History: originally 5 wrong answers *anywhere in the whole arena* = Game Over (this doc's old
    text). That was softened to 3 chances *per question*, reveal-and-continue, no game over at all
    (`05-render.js` comment: "the old ... game-over is gone — no scary resets"). **2026-07-21,
    reverted toward stricter again** (user: "should reduce to 2 chances per questions ... if more
    than 2 wrong, need to kick out from the arena"): `MAX_ROOM_FAILS` is now **2** per question, and
    exhausting both no longer silently reveals-and-advances — it shows a blocking modal
    (`#arenaKickOverlay`, reusing the `.gameover-overlay`/`.bossgate-overlay` shell) stating the
    correct answer and that the arena must restart; pressing OK calls `restartRoom(true)` (reusing
    its pre-existing `fromGameOver` toast wording, which had been sitting unused since the "no scary
    resets" change). So today's change is per-QUESTION-exhaustion → arena restart, not the original
    per-ARENA wrong-answer-count → game over; a different axis than the original mechanic this
    replaced the doc text for.

## Reward scenes

`renderSceneForLevel` (`05-render.js`) draws a per-planet hand-animated SVG that fills as the
planet's streak grows; captions per stage come from `sceneCaptions` (config). A slim **astronomy
card** at the top of the equation view shows the planet's real Sol body (see [story-astronomy.md](story-astronomy.md)).

## Arena Infinity — endless mixed-recall practice (`js/38-infinity.js`)

Free-to-enter reward source: a round of `INF.target` (10) self-contained (mcOnly / directInput)
questions drawn from cleared arenas, paying XP + Wonderland Passes + Cash + a materials chest scaled by
accuracy. `_infPick` draws a random arena `n` in `[minN, maxN]`, generates its problem, and re-rolls
(≤60 tries) until it lands a self-contained question (equation-battle arenas are skipped).

**2026-07-15 difficulty fix.** Previously `_infPick` drew from a **fixed floor of 1**, so a level-30
player still got trivial Arena-1 questions ("5 × 1"). Now `_infMinArena(maxN)` computes a **rising
floor**: `floor(maxN·0.45)` (trivial arenas drop out as you clear more) + a within-round ramp keyed on
`INF.asked` + a small `INF.streak` bonus, capped at `floor(maxN·0.7)` and `maxN-1` so the draw band
stays wide enough (the picker skips some arenas). The fallback (when 60 draws fail) now scans **down
from the middle of the band** instead of hard-returning Arena 1. Net: a level-30 player draws arenas
~13-30, never Arena 1. `maxN` is still capped at the player's cleared level (`_infMaxArena`).

**2026-08-01 exploit fix — 2-chances-per-question, out-of-chances fails the WHOLE round (no reward).**
Previously each question was ONE attempt: right or wrong, `infGrade()` immediately advanced via
`infNextQuestion()`, and `infFinish()` paid the round's fixed Pass reward (see `INF_ROUNDS`) purely
for reaching `INF.target` questions **asked** — accuracy only scaled XP/Cash/chest, never the Passes.
That meant mashing any wrong answer through an entire round still "finished" it and paid the full
fixed Pass reward with zero correct answers (user: "even if you failure to answer any questions in
arena infinity...you can still get the ticket's...please make it the small rule as normal arena" —
referencing the normal arena's `MAX_ROOM_FAILS = 2` chances-per-question rule, `05-render.js`).
Fixed by giving Arena Infinity the same 2-chances-per-question rule (`INF.qChances`, reusing
`MAX_ROOM_FAILS` directly rather than a second hardcoded constant): a wrong answer with a chance
left just re-renders the SAME question for another try (doesn't count toward `INF.asked` yet,
matching hearts UI added to `.inf-hud`); a second wrong answer on that question now calls
`infRoundFail()` instead of continuing — the round ends immediately with **zero** rewards (no
Passes/Cash/chest), mirroring a normal arena's out-of-chances kick (`showArenaKickModal`/
`restartRoom`, which resets that arena's progress and pays nothing until genuinely re-cleared).
Per-question XP already banked on questions answered correctly before the failure is NOT clawed
back (same as a normal arena not undoing prior real solves) — only the round-completion payout is
gated. Verified live: 2 wrong answers on Q1 of a 3-question round left `state.wonderPasses`/`coins`
unchanged and showed the round-failed screen; a clean 3/3 correct run still paid normally
(+1 Pass, +30 XP, +45 Cash, chest, for the 3-question round).
