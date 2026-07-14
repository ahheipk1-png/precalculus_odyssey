# Arena Playthrough Report — Precalculus Odyssey

Profile: **QA_ARENA_001** (normal player; not the `mitb` cheat). Date: 2026-07-14.
Environment: local static server (`:8791`) + Claude Browser. Audio muted.

## Method (honest disclosure)

Answers were submitted through the **real UI answer path** — the code dispatches genuine `click`
events on the rendered `.mc-btn` choice buttons and real `submit` events on the answer form (the same
handlers a human click/Enter triggers, i.e. `answerMcOnly` / `answerDirectInput`). Progress was
verified by requiring `state.levelSolves` to advance by exactly 1 per answer. **Arena navigation was
scripted** (set the level, then play), and question rendering between answers was advanced inline
because the browser pane throttles background timers (a full real-time wait per question was not
feasible here). **Screenshots could not be captured** — the screenshot tool times out in this
environment — so verification is by DOM/geometry inspection and console monitoring, not images.
This report does not claim image evidence it does not have.

## Results — full auto-playthrough (all 187 arenas)

| Metric | Result |
|---|---|
| Arenas fully played to the Boss Gate (10/10 via UI events) | **176 / 187** |
| Boss Gate opened at exactly 10 | 176 / 176 played |
| Real errors (no-advance / crash / bad control) | **0** |
| Arenas with a Q10 finale | 176 / 176 |
| Console errors during the whole sweep | **0** |

**11 arenas not auto-played** (native complex input modes the auto-player doesn't drive):
`5, 47, 48, 49, 50, 51, 52, 53, 54` (balance-equation solving — `numeric`/`formula`, needs the
operation-row UI across multiple steps) and `169, 171` (interactive coordinate graph — tap a point /
draw a line). All 11 were confirmed to **load and render their native controls cleanly with no console
errors** (balance op-row shown; graph SVG shown). These use the game's original, previously-tested
core mechanics; graph tap-to-answer was separately verified earlier this session (arena 169 midpoint
tap solves).

## Question variety observed during play (§4–7)

Style usage aggregated across the 176 auto-played arenas: `direct`, `mc`, `trueFalse`,
`errorAnalysis`, `compare`, `estimate`, and `finale` all exercised. Per-arena (verified separately in
the variety sweep): **87 arenas ≥6 distinct styles** (directInput topics), **89 arenas = 3 styles**
(mcOnly topics — capped, see below), finale on every diversified arena, consecutive-repeat rate
~0.17/arena. See `OVERNIGHT_WORK_LOG.md` Phase 1b and `docs/gameplay.md`.

## Correctness (§14)

Separate invariant sweep over all 187 arenas (30 iterations each) via `tools/validate-arenas.js`:
**0 real issues** — exactly-one-correct MC, no duplicate choices, valid numeric answers, valid graph
specs, no computed undefined/NaN. Every variety-derived question inherits the arena's own verified
answer, so correctness holds by construction (a full trial sweep also found 0 invalid questions).

## Layout (§8) — verified via DOM geometry

Answer panel stays in the right column with stable width across `numeric`/`mcOnly`/`directInput`/
`graph`/`bracket` at 1366×768 and 1024×768; the coordinate graph is centred and does not rearrange
panels; no horizontal overflow; Planet Info opens as a separate view (never replaces the panel).
Mobile (≤ breakpoint) stacks the panels — standard responsive reflow.

## Boss Gate (§3, §9)

Gate opens only after the 10th correct answer; leaving the boss room undefeated closes it and forces
re-earning 10; beating the boss records a persistent `bossDefeated[arena]`. Verified via state
simulation and the reset flow.

## Save / reload checkpoint (§13)

Saved QA_ARENA_001 mid-arena (level 30, 4/10, 777 Cash, 12 Gold, bossDefeated{12}) → re-applied the
persisted profile: **all preserved**; transient `bossGateUnlocked` forced false on load (temporary
gate access not wrongly preserved).

## Known limitations / follow-ups

- **mcOnly-native arenas (~89) cap at 3 styles.** They expose no numeric answer to derive
  mc/compare/estimate from, so the spec's "≥6 distinct styles" is met for the directInput half and
  partially for the mcOnly half. No incorrect content was fabricated to inflate variety. Reaching ≥6
  everywhere needs topic-specific authored styles (modeling/graph/word-problem packs) per world.
- **Balance (`numeric`/`formula`) and interactive `graph` arenas** were not auto-solved end-to-end by
  the scripted player (they need multi-step op-row interaction / graph taps). They load and render
  correctly; the balance mechanic is the game's original, previously-verified core.
- **Screenshots + true 4-resolution image capture** are not available in this environment (tool
  times out); layout was verified by geometry at 1366 and 1024, plus earlier mobile (375) overflow checks.
