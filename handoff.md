# Handoff: Precalculus Odyssey (formerly "Balance Quest" / "Precalculus Quest")

> **📚 DOCS ARE NOW MODULAR — START AT [`docs/README.md`](docs/README.md) (the orchestrator).**
> Documentation was split (2026-07-12) into per-area module docs under `docs/`, coordinated by that
> index. **Update the relevant `docs/*.md` + the orchestra's status table on every code-changing
> turn.** This `handoff.md` is **retained as the detailed session-by-session history/archive** — the
> deepest record of *why* things are — but the `docs/` set is the current per-module reference.
> Module map: architecture · config (CONFIG_GUIDE.md) · gameplay · rpg-combat-economy · world-and-hubs
> · story-astronomy · save-and-audio · process-and-roadmap.
>
> **🪐 Terminology (2026-07-12):** the game now uses **star system** (= chapter) and **planet**
> (= level) everywhere the player looks. This archive and code identifiers (`roomCount`,
> `getRoomBoss`, `worlds.config.js`, …) keep the legacy **"world" (= star system)** and **"room"
> (= planet)** — read them accordingly. Canonical statement: `docs/README.md` → Terminology.

> **Keep docs in sync.** Any time the game changes (new feature, mechanic, state shape, or design
> decision), update the relevant `docs/*.md` module doc (and, for deep history, a note here) in the
> same turn. This drifted badly stale once already; the person explicitly asked for it to stay
> synchronized from now on.

> **⭐ SOURCE OF TRUTH (2026-07-12): `Precalculus_Odyssey_AI_Agent_Instructions.txt`** at repo
> root is the user's master instruction set and OUTRANKS older design docs/plans. Priority order:
> (1) user's latest direct message, (2) that instructions file, (3) this handoff, (4) knowledge.md,
> (5) ROOMS_AND_CODES.md, (6) older design docs only where not conflicting. Key mandates from it
> (mostly NOT yet built — see its own phase list): enemies are AI robots and drop **AI chips /
> CPUs / GPUs / neural / quantum / alien processors / robotic alloy / energy cores** (retire
> "Monster Essence" via migration); **Earth** is the home hub (replaces any "Star Village"), with a
> global "Go Back to Earth" button; **Star Atlas** must be global and drill down star-system →
> planet (reuse the existing Star Log/astronomy, don't rebuild); a full **Profile + Inventory +
> Equipment** interface; a **Trading Room** (cash/gold/silver/gems, price history, review-to-
> refresh); a **large data-driven weapon catalogue** with SVG art (no emoji as final art); a full
> **Wu Xing** system (generating + overcoming cycles, not just a damage multiplier); a real
> **spell system** with turn-based freeze/poison/burn/etc. It also requires: **plan-before-code**
> (produce audit + nav map + data model + migration + acceptance tests and get approval first),
> keep the math screen uncluttered, preserve saves via migration, keep the modular classic-script
> architecture (file:// compatible), and verify on disk + in the live browser before claiming done.

> **⚠️ 2026-07-12 data-loss incident + recovery (read before trusting the FS tools):** during a
> session-limit interruption mid-workflow, the live `game/` folder AND `.git` were wiped (both
> Bash and PowerShell confirmed gone; the http server 404'd). Recovered by: (1) `Copy-Item` from
> `game_backup_before_map_farm_batch_*`, (2) re-extracting the 6 workflow-authored modules from the
> agent transcripts (`.claude/projects/…/subagents/workflows/wf_2023bc36-d2c/agent-*.jsonl`, each
> line JSON → `message.content[]` tool_use `Write` → `input.{file_path,content}`), (3) re-applying
> this turn's inline edits by hand. **Two gotchas:** you MUST read those transcripts as explicit
> UTF-8 (`[IO.File]::ReadAllLines($p,[Text.UTF8Encoding]::new($false))`) or every emoji/em-dash
> double-encodes into mojibake (`ðŸ'µ`, `â€"`); and **Git Bash currently has a stale/blind view of
> `game/`** (created by PowerShell) — it reports "No such file" while PowerShell + the browser see
> it fine. **Use PowerShell, not Bash, for `game/` filesystem operations.** Working state is backed
> up at `game_backup_after_map_farm_batch_20260712_231234`.

> **Name history:** the game was "Balance Quest," briefly retitled "Precalculus Quest," and is
> now **"Precalculus Odyssey — Master the Realm of Functions"** (the user's chosen name as of
> this session). "Balance Quest" survives only as the name of the opening chapter/world (linear
> equations). If you see "Precalculus Quest" anywhere, it's stale — update it to Odyssey.

> **In-progress multi-world expansion.** This game is mid-transformation from a 10-level
> linear-equation game into a **6-world, ~133-room** math-RPG spanning pre-algebra → precalc.
> Two design docs govern it:
> - The **approved architecture plan** at `C:\Users\Michael Cheng\.claude\plans\whimsical-churning-hopcroft.md`
>   (the chapter/mode-registry refactor + RPG-economy rebalance formulas). Phase A.1/A.2 of this
>   is built (see "Chapter registry" / "Mode registry" below).
> - The **curriculum + new-systems design doc** (published as an Artifact this session:
>   "Precalculus Odyssey" design doc, ~133 rooms across 6 worlds — Number Kingdom, Expression
>   Forest, Equation Valley, Factor Caverns, Quadratic Peaks, Function Observatory — plus three
>   proposed new systems: a **Lucky Den / Hoo Hey How gambling room**, a **collectible
>   materials/gems pocket** that gates weapon/shield upgrades, and **casino betting with
>   materials**). This doc is **awaiting the user's review/sign-off — NONE of the 6 worlds or 3
>   systems are built yet.** The source HTML for that doc was generated via a multi-agent
>   Workflow (`precalc-odyssey-design`) whose per-world/per-system output is in the workflow
>   journal under `.../subagents/workflows/wf_3156bdad-5de/journal.jsonl` if you need the full
>   room-by-room detail (gambling/casino/synthesis agents failed on a session limit and were
>   hand-authored into the doc instead).
>
> **read the relevant design doc before starting a new world/system session.**

## Config-driven architecture (2026-07-12 — Phase 0.5, in progress)

**All game content now moves into `game/config/*.config.js`** (pure-data classic scripts loaded
BEFORE `js/01-data.js`), so new content is added by editing config, not code. **Documented in
`CONFIG_GUIDE.md`.** Extracted so far (verified — game runs identically, harness green, zero console
errors): `worlds.config.js` (`chapters` + `STAR_SYSTEMS`), `rooms.config.js` (`levelCodes`,
`levelTitles`, `formulaBank`, `sceneCaptions`), `planets.config.js` (`BODIES`, `BODY_ORDER`),
`story.config.js` (`STORY`, `CHAPTER_LORE`). The corresponding `var` declarations were **removed**
from `01-data.js` / `05-render.js` / `14-lore.js` (logic reads the config globals now). **Still to
extract in later phases:** enemies, items/economy, and the gear/weapon catalogue (the last lands
with Phase 4's new catalogue). Rule: a config global is declared ONLY in its config file (never also
in a `js/` module, or the later copy shadows it). Backup before this pass:
`game_backup_before_config_20260712_232638`.

## Superseded requirements (do NOT rebuild these old forms)

Per `Precalculus_Odyssey_AI_Agent_Instructions.txt` (the source of truth) + the approved
`Precalculus_Odyssey_Master_Plan.md`:
- **Monster Essence 🫀 / biological drops** → **AI chips / components** (CPU/GPU/neural/quantum/alien
  processor/robotic alloy/energy core). Migrate old essence → a chip on load.
- **gold/silver/gems as *upgrade materials*** → **tradeable currencies**; chips become the upgrade
  input. **The interface must display: Cash · Gold · Silver · Chips** (internal var names free).
- **"Star Village" / "World Map hub" / old 6-world names (Number Kingdom, etc.)** → **Earth** home
  hub + a **Star Atlas** (star-system → planet drill-down) reusing the existing Star Log.
- **Flat Star Log atlas** → hierarchical Star Atlas; **5 text weapons** → the **30-item illustrated
  catalogue** (see the master plan Phase 4 + the user's reference image); **healing-only spells** →
  full **Wu Xing + status-effect spell system**. Old plan phases R2–R6 are folded into the master
  plan's Phases 1–7.

## What this is

An HTML/CSS/JS game, **"Precalculus Odyssey — Master the Realm of Functions"** (renamed from
"Balance Quest"; that name now labels only the opening chapter). The core loop teaches algebra
by having players apply the same operation to both sides of an equation until `x` (or a
formula's subject) is isolated — rather than just guessing a final numeric answer — plus an
**RPG progression layer** (hero leveling, coins, a weapon/shield shop, and monster battles) on
top. It's being restructured into **chapters/worlds** (see "Chapter registry" below); only the
opening chapter ("Balance Quest," rooms 1–10, linear equations/formulas/brackets) has real
content today — the other worlds are designed but not built (see the design docs referenced at
the top of this file). Chalkboard/wood-frame theme. **No build step**, no framework, no external
JS deps except two Google Fonts (Patrick Hand, Quicksand) loaded via `<link>`.

### Project layout (modularized this session — was one giant `Game_0.2.html`)

The game used to be a single ~5000-line, ~1.1MB `Game_0.2.html`. It is now split into a
`game/` folder. **`game/index.html` is the entry point.** Root `Game_0.2.html` is now just a
`<meta refresh>` **redirect** to `game/index.html` (so old shortcuts/double-clicks still work).

```
game/
  index.html                 ← entry point: markup only, links the CSS + ordered scripts
  css/styles.css             ← all styles (~64KB; was ~950KB before the bg image was extracted)
  assets/chalkboard-bg.jpg   ← the chalkboard background, extracted from a base64 data-URI
  js/                        ← the JS, split by concern into ORDERED classic scripts (NOT ES
                               modules — see "Module system" below). Load order matters:
    01-data.js       state object, chapters registry, formulaBank, sceneCaptions, levelTitles
    02-dom.js        the `el` id-cache + `reduceMotion`
    03-save.js       localStorage profiles: load/save/migrate/dedupe/render/reset
    04-logic.js      PURE LOGIC (Node/browser-testable): helpers, expr formatting, problem
                     generation, hints, modeRegistry, applyOp/applyFormulaOp/solveFully
    09-items.js      RPG economy: MATERIALS, loot tables, upgrade recipes, materials bar (R1)
    14-lore.js       Story/astronomy/Star Log: STORY, BODIES, CHAPTER_LORE, planetSVG,
                     codex + narration render/open/close, unlock helpers (loads before 05 so
                     render/battle can call it)
    05-render.js     economy helpers (levelCodes, upgrade costs, addHeroXp), updateStats,
                     renderEquation, panels, scene system, loadProblem, gate screens, handleSolved
    06-rpg-battle.js shop + upgrades + window.rpgActions + monsters + combat + spells
    13-audio.js      background music + SFX (placeholders); mute button (loads before 07)
    07-main.js       ALL event wiring + boot (must load last of the main scope); wires
                     `chapters[0].generator`, calls `initMuteBtn()` + `initLore()` here
    08-layout.js     the widescreen-dashboard DOM-reparenting IIFE (self-contained, still an IIFE)
```
Actual `<script>` order in `index.html`: 01, 02, 03, 04, 09, 14, 05, 06, 13, 07, 08.

- **Older/reference files in the repo root** (kept as history, per the backup-before-editing
  habit): `Game_0.1.html`, and `Game_0.2_backup_before_*.html` snapshots — the most recent being
  `Game_0.2_backup_before_odyssey_polish.html` and
  `Game_0.2_backup_before_modularization.html` (the last intact single-file monolith, right
  before the split — handy if you ever need to regenerate a single-file distributable).
- **Companion docs at repo root:** `handoff.md` (this file — architecture), `knowledge.md`
  (environment/gotchas/how-to), `ROOMS_AND_CODES.md` (room→topic→warp-code table for built +
  planned rooms).

### Module system: ordered classic scripts sharing one global scope (NOT ES modules)

The single main IIFE was **removed**; its contents now live across `01-data.js` … `07-main.js`
as plain top-level `var`/`function` declarations that become **globals** shared across the
files. `08-layout.js` stays its own IIFE. **This is deliberate — classic `<script src>` files
load fine over `file://` (double-click from disk), but ES-module `import`/`export` does NOT.**
Since the person opens the game by double-clicking, classic scripts are required. Consequence:
the JS is not encapsulated (everything is a window global) — that's fine for a standalone game,
but **watch load-order**:
- Files execute in the order listed in `index.html`. Function *bodies* that merely call other
  globals resolve fine at runtime regardless of order. The hazard is **top-level code that uses
  a function/value from a later-loading file at load time.** Two such couplings existed and were
  neutralized (keep them that way): (1) `chapters[0].generator` is `null` in `01-data.js` and
  **wired in `07-main.js`** (`chapters[0].generator = generateBalanceQuestProblem`), because the
  generator lives in `04-logic.js`; (2) `modeRegistry.formula.caption` is a lazy
  `function(){ updateFormulaCaption(); }` (not a bare reference) because `updateFormulaCaption`
  lives in `05-render.js`, which loads after `04-logic.js`. **If you add another top-level object
  that stores a function from a later file, wrap it lazily or wire it in `07-main.js`.**
- **Line numbers are meaningless now** — grep by function name across `game/js/*.js`. The split
  was produced by `sed`-slicing exact line ranges of the old monolith, then verified
  byte-identical (concatenating the modules reproduces the old IIFE body exactly).

To test, serve `game/` over the local http server and open `game/index.html` (the Claude Browser
tool can't open `file://`; the user's double-click can). See `knowledge.md` for the how.

## How the person likes to work (important for continuity)

- They iterate feature-by-feature, casually phrased, often with typos. Each message is
  usually "next level: add X." Treat each as a scoped feature addition, not a full redesign
  request, unless they say otherwise.
- They care about **correctness and thoroughness**, not just visual polish — e.g. they caught
  that the balance scale tilting for an "unsolved" equation was mathematically wrong (an
  equation is *always* balanced by definition; only an invalid operation should visually upset
  it). Expect this level of scrutiny — sanity-check the math/pedagogy of any new mechanic, not
  just whether the code runs.
- They explicitly do not want repetition/reuse across levels ("don't reuse any animation in
  any level... it is boring"). Keep chasing genuine per-level variety, not just parameter
  tweaks on the same asset.
- Before any nontrivial rebuild, back up first — historically a copy of the single file
  (`Game_0.2_backup_before_<change>.html`); now that the game is a `game/` folder, copy the
  folder (e.g. `cp -r game game_backup_before_<change>`) or at least the files you'll touch.
- **Always update this handoff.md when the game changes** — see the note at the top of this
  file. This was explicitly requested as a standing rule, not a one-off. Also update
  `knowledge.md` when you learn something non-obvious, and `ROOMS_AND_CODES.md` if room
  topics/numbers/warp-codes change.

## Verification approach — please continue this

**Neither Node nor Python is installed on this machine** (confirmed — both `node` and `python`
resolve to nothing/a Microsoft Store install stub). The `node test.js` instructions below are
the *conceptual* convention (keep following its shape), but the actual execution mechanism used
in practice is: run the exact same extracted logic inside the **Claude Browser tool's real JS
engine** instead of Node — same ES5/ES6 semantics, no DOM-availability difference that matters
(a loaded page's real `document`/`localStorage`/`window.matchMedia` all just work, so the
Node-specific `global.window` stub isn't even needed there). Practically: start a local static
file server for this directory (there's no `python -m http.server` either — use a tiny
PowerShell `System.Net.HttpListener` script instead, see any recent session's scratchpad for a
working example), navigate the Claude Browser pane to it, then use the `javascript_tool` to eval
the extracted band + a test harness in that page's context. This has been used successfully and
should be the default approach going forward, not "node test.js" literally.

**All pure logic is DOM-free by design** and should be regression tested on every change to the
algebra-solving core:

**Post-modularization this got much simpler — no more "extract the band."** Because the split
turned every function into a **global**, you just serve `game/` on the local http server, open
`game/index.html`, and call the logic directly in `javascript_tool`: `generateProblem(5)`,
`applyOp(eq,'-',4)`, `applyFormulaOp(...)`, `getChapterForLevel(8)`, read `chapters`, `state`,
`modeRegistry`, `formulaBank` — they're all on `window`. No extraction, no `updateFormulaCaption`
stub, no `matchMedia` stub needed (it's a real page). (The old extract-the-band-into-a-standalone-
script recipe still works if you ever want it Node-style, but it's unnecessary now.)

The harness itself: generate many problems per level for every level via `generateProblem(level)`
(exercises the chapter-dispatch path), plus every `formulaBank` entry, and mechanically "solve"
each using only `applyOp` / `applyFormulaOp` (pick the exact inverse each step) — assert the
solved value matches the generator's known answer AND moves-taken == stored `par`; assert
formulas reject dividing before the additive term is cleared; assert chapter-registry invariants
(`getChapterForLevel` round-trips every level, clamps beyond `state.maxLevel`). Check for zero
failures. **Latest run against the live modular build: 1132 assertions, 0 failures.** (A
byte-for-byte `diff` of the concatenated modules vs. the pre-split monolith body is an even
stronger check that a pure *refactor* changed no logic — use it after any structural move.)

**Do this again after any change to `generateNumericProblem`, `generateFormulaProblem`,
`generateProblem`/the chapter registry, `applyOp`, `applyFormulaOp`, or `solveFully`.** It has
already caught real bugs (brace mismatches from careless extraction, an earlier turn where a
feature was fully designed in reasoning but never actually written to disk — always verify the
file on disk matches what was described to the user, don't trust your own prior turn's summary).

For anything touching rendering/animation/DOM (the scene system, wobble, combat sprites, shop
lists, layout), there's no automated check — only structural sanity checks via regex (counting
scene groups, checking for duplicate ids, tag balance, function signatures), plus actually
driving the live page via the Claude Browser tool's `javascript_tool`/`read_page`/console-check
(click buttons via `document.getElementById(...).click()`, submit forms via
`.requestSubmit()`, inspect resulting DOM text — this is how Session 1's smoke test verified
numeric/bracket/formula solving and the bracket-expand morph all still worked end-to-end
post-refactor). Mention to the user that visual polish/animation timing may still need a human
look, but functional correctness (does clicking X actually produce the right result) can and
should be verified this way before claiming something works.

## Architecture

### Chapter registry (new — Phase A.1 of the Precalculus Quest plan)

`state.level` stays a **flat 1..N integer** — chapter is derived metadata, never stored on
`state` directly (see the plan file's Context section for why: `state.level` is already an
array index / scaling input in many places and is the literal field persisted in every
localStorage save profile; a `{chapter, room}` state shape would force a save migration for no
real benefit).

```js
var chapters = [
  { id: 'balance-quest', title: 'Balance Quest', subtitle: 'Foundations of Algebra',
    roomCount: 10, generator: generateBalanceQuestProblem }
  // Chapters 2-8 get appended here as they're built — see the plan file's roadmap table.
];
// startRoom/endRoom computed once at boot from roomCount, never hand-maintained:
(function computeChapterRoomRanges(){ ... })();
state.maxLevel = chapters[chapters.length - 1].endRoom;  // currently 10; grows automatically
                                                          // as chapters are appended

function getChapterForLevel(level){ ... }  // { chapter, roomInChapter } for any level, clamped
                                            // beyond maxLevel to the last chapter/room
```

`generateProblem(level)` (the sole problem-generation dispatch point, called from
`loadProblem()`) is now a **thin dispatcher**: `getChapterForLevel(level)` then calls that
chapter's own `generator(roomInChapter, level, chapter)`. `generateBalanceQuestProblem` is a
byte-for-byte rename of the pre-chapters `generateProblem` body — since Chapter 1 is rooms
1-10, `roomInChapter === level` there always, making the refactor a **provable no-op** for
existing content (verified: 1123-assertion regression harness, 0 failures — see Verification
approach above).

**When adding a new chapter:** append a descriptor to `chapters[]` with its own `generator`
function (following `generateBalanceQuestProblem`'s shape — takes `roomInChapter`, returns a
problem object with a `mode` field), plus per-chapter content tables the same way Chapter 1 has
them (its own monster-catalog rooms, its own weapon/shield shop tiers, its own reward-scene
theme). See the plan file's full per-chapter roadmap and the RPG-economy formulas (`chapterFactor`
etc.) for how those per-chapter tables should scale so the game doesn't trivialize or become
unwinnable as more chapters stack up.

### Mode registry (new — Phase A.2 of the Precalculus Quest plan)

Each problem `mode` (`state.mode`) now registers how to render/hint/answer itself in one place,
instead of every consumer (`renderEquation`, `updatePanelVisibility`, `getHint`, `handleSolved`'s
final-answer text) having its own hardcoded if/else chain over the mode names:

```js
var modeRegistry = {
  numeric: { controls: 'opInput', hint, caption: null, renderLeft, renderRight, describeAnswer },
  bracket: { controls: 'mcThenMorph', hint, caption: null, renderLeft, renderRight, describeAnswer: null },
  formula: { controls: 'opInput', hint, caption: updateFormulaCaption, renderLeft, renderRight, describeAnswer }
};
```

- `controls` drives `updatePanelVisibility()`: `'opInput'` = number/letter input + op row (used
  by both numeric and formula — they share the same input widget, just typed differently, per
  the existing "positive integer OR single letter, never signed/decimal" input constraint).
  `'mcThenMorph'` = the bracket-expand multiple-choice step that **morphs the problem into
  another mode** on a correct pick (bracket → numeric; this pattern is deliberate and reusable —
  see "Bracket mode" below).
- `bracket.describeAnswer` is `null` and never called — bracket always morphs into numeric
  before a solve completes, so it never itself produces a final answer.
- `formula.caption: updateFormulaCaption` is a **direct function reference**, not yet a fully
  generalized "any mode can register a caption" mechanism (that generalization — e.g. renaming
  `el.formulaCaption` to something mode-agnostic — is deferred until a second mode actually
  needs a caption, per the plan's per-chapter roadmap; building it now with only one consumer
  would be premature abstraction).
- This refactor is behavior-preserving for numeric/bracket/formula — confirmed via the same
  regression harness plus a live browser smoke test (numeric solve, bracket hint/expand/morph,
  formula hint/solve, all end-to-end through the UI, zero console errors).
- **Two more mode types are planned but not yet built** (`mcTerminal` — 4-choice MC that ends
  the problem directly, no morph; `directAnswer` — type one positive integer, press Submit, no
  op-row) — these land with Chapter 2 "Function Forest" per the plan's build order. When adding
  them: extend `modeRegistry`, extend `updatePanelVisibility()`'s `controls` switch, and add the
  new `#directAnswerPanel` HTML (the `mcOnly` control type can reuse the existing `#mcChoices`
  4-button grid that bracket-expand already uses).

### Named player profiles (up to 10) + autosave (localStorage)

The game opens behind a `#startScreen` overlay (absolute-positioned over `.board`, z-index 30)
with a name field + **🆕 Start** button, and — if any profiles exist — a **Saved Players
(n/10)** list below it, one card per profile (`renderSavedPlayersList()`), each with a
**Continue** button and a 🗑 delete button (delete uses the same "tap again to confirm →
'Sure?'" pattern as the Reset button, not a native `confirm()`). Neither `loadProblem()` nor
any state mutation runs until a profile is started/continued — the bootstrap
(`updateStats(); initDrawPaths(); loadProblem();`) lives in `startGame()`, called only from
the New Player handler and from `continueAsProfile()`.

**Why localStorage, not a real file in a folder:** the person originally asked for autosave to
a `C:\temp` folder, but a browser page cannot silently write to an arbitrary filesystem path —
that's blocked by browser security regardless of framing. What they actually needed was
"survive a computer restart, no server" — `localStorage` satisfies that (disk-backed by the
browser profile, persists across restarts, no server, no per-write prompts) even though it's
not literally a file the user can browse to in Explorer. If a *real, user-visible* file is ever
requested, the next step up is the File System Access API (`showDirectoryPicker` — one-time
permission grant, Chrome/Edge only) or a manual Export/Import-JSON button; don't silently swap
to either without asking, since both have real UX tradeoffs the person hasn't signed off on.

- **Storage shape:** `PROFILES_KEY = 'balanceQuestProfiles_v1'` holds a single JSON array of
  profile snapshots (`loadAllProfiles()` / `saveAllProfiles()`), each `{ id, name, level, score,
  coins, streak, levelSolves, equippedWeapon, equippedShield, heroLvl, heroXp, playerMaxHp,
  playerHp, playerMaxMp, playerMp, weapons, shields, defeatedMonsters, trophies, savedAt }`.
  `MAX_PROFILES = 10` is enforced both when creating a new player (button/input disabled,
  `newPlayerError` shown once at cap — see `updateNewPlayerAvailability()`) and is not
  bypassable from the UI; freeing a slot requires deleting an existing profile first.
- **Legacy migration:** `SAVE_KEY = 'balanceQuestSave_v1'` is the old single-slot format from
  before profiles existed. `migrateLegacySave()` runs once at startup: if that old key has data
  and there's room under the cap, it's converted into a profile named `'Player 1'` and the old
  key is deleted. Keep this migration in place — don't remove `SAVE_KEY` handling even though
  nothing writes to it anymore, or anyone who saved before this feature loses their progress.
- **Session identity:** `activeProfileId` / `activeProfileName` (plain closure vars, not on
  `state`) track which profile is currently being played; set in the New Player handler
  (`activeProfileId = makeProfileId()`) or in `continueAsProfile(snap)`. `getSaveSnapshot()`
  stamps `id`/`name` from these into every save. `updatePlayerNameTag()` reflects
  `activeProfileName` into the small `#playerNameTag` line under the title.
- Deliberately **not** persisted per-profile: `mode, problem, eq, bracketEq, bracketCorrect,
  movesTaken, currentOp, locked, resetPending, gatePending` — transient/regenerated by
  `loadProblem()` on resume, so a save taken mid-problem or mid-gate-screen resumes at a fresh
  problem in the same room rather than replaying that exact moment. Accepted simplification.
- `resetPlayerState()` is the single source of truth for "what does a blank player look like"
  — shared by the New Player flow and the existing in-game Reset button (`el.resetBtn`, still
  requires its own "Sure?" double-tap, and resets the *current* profile in place rather than
  creating a new one). Don't duplicate the reset field list again if you touch either flow.
- **Autosave triggers:** `saveGame()` looks up `activeProfileId` in the profiles array and
  upserts that one entry — it's called from inside `updateStats()`, which already runs after
  nearly every state-changing action (solve, shop buy/sell/upgrade, battle win/loss, level
  advance, warp), so most new features get autosave for free as long as they call
  `updateStats()`. The one exception found so far is `window.rpgActions.equip()`, which has its
  own explicit `saveGame()` call. **If you add a new state mutation that doesn't call
  `updateStats()`, add an explicit `saveGame()` call to it or it won't persist.** `saveGame()`
  also fires on `beforeunload`, on `visibilitychange` (tab hidden), and on a 20s `setInterval`,
  as belt-and-suspenders. It no-ops until both `gameStarted` and `activeProfileId` are set, so
  nothing writes before a profile is chosen.
- Profile names are free text rendered into the picker list — always through `escapeHtml()`
  (defined right before `renderSavedPlayersList()`), never raw `innerHTML`, since a name is
  user input and this is HTML injected into the page.
- **Robustness fixes (this session), after the user reported duplicate/"recycling" profiles:**
  (1) `loadAllProfiles()` now **dedupes by `id`**, keeping the most-recently-`savedAt` copy —
  so a historical duplicate-id twin (from an older build) can't reappear. (2) `deleteProfile()`
  now **nulls `activeProfileId` and sets `gameStarted=false` when you delete the profile you're
  currently playing** — otherwise a safety-net `saveGame()` (interval / beforeunload) would
  re-`push()` the just-deleted profile back into the list (that was the "recycle and they come
  back" bug). (3) Each profile card now shows a **last-saved relative time** (`formatRelativeTime()`,
  "5 mins ago" / "1 day ago" / "on <date>"), so two profiles that happen to share a name are
  distinguishable. All three verified in-browser (dedupe collapses same-id twins; delete
  persists across reload). NOTE: the user's bug screenshots showed the title "Balance Quest",
  i.e. they were running a **stale/older build** — the rename to "Precalculus Odyssey" (below)
  now lets them confirm at a glance they're on the current file.

### Cosmetic pass (this session)

- **Rebrand to "Precalculus Odyssey"** — `<title>`, start-screen `.start-screen-title`, and the
  header `h1.title`. "Balance Quest" remains only in the tagline + chapter registry as the
  opening chapter's name.
- **Blue welcome background** (user disliked the green): `.start-screen-overlay` gradient is now
  `radial-gradient(circle at 50% 28%, #1c3b66, #14294a, #0b1830)` instead of the old green.
- **Bigger buttons/text pass** — a readability override block lives at the **very end of
  `game/css/styles.css`** (so it wins on cascade order over the two earlier style layers). It
  bumps `.header-actions .reset-btn` (Full screen / Reset / Worm Hole), `.btn-ghost`, `.btn`,
  shop buttons/rows, combat readouts, monster-select cards, and the start-screen per-card
  buttons, with a `@media (max-width:900px)` step-down. If you need to resize buttons again, edit
  that trailing block rather than fighting the mid-file `!important` rules.

### Visual changes (latest session — all built & verified)

- **"Warp Door" → "Worm Hole"** (user-facing only; fits the coming solar-system theme). Changed:
  the header button (`🌀 Worm Hole`), the code-entry button (`Jump!`), and the two toasts in
  `07-main.js` ("Jumped through the worm hole to Room N! 🌀" / "Invalid worm hole code!").
  **Internal ids are unchanged** — `warpDoorBtn`, `warpPanel`, `warpInput`, `applyWarpBtn`,
  `executeWarp`, `levelCodes` all keep their names (rename was cosmetic).
- **Cinzel font on the equation expression** — added `Cinzel:wght@600;700` to the Google Fonts
  `<link>` in `index.html`, and a rule at the end of `styles.css` sets the balance-scale
  equation text (`.pan-text` and its `.term`/`.font-x`/`.fraction-container` children) to
  `font-family:"Cinzel",Georgia,serif; font-weight:700; letter-spacing:1px; font-size:clamp(26px,3vw,43px)`
  (all `!important` to beat the older `.pan-text` rules). Verified Cinzel actually loads
  (`document.fonts.check`).
- **New balance-question background** — the `.chalkboard-scale` background (the effective
  `!important` rule in `styles.css`, ~line 1798) now layers `url("../assets/balance-bg.jpg")` on
  top of the old `url("../assets/chalkboard-bg.jpg")` as a fallback. **`balance-bg.jpg` does not
  exist yet** — the user was asked to save their pasted scales-of-justice image there (I have no
  tool to write a pasted image to disk). Until they do, the old chalkboard shows (fallback). Once
  it's placed, the pan-text overlay position (`left-pan-text` ~28%, `right-pan-text` ~72%, top
  ~60–63%) may need a small tune to sit on the new image's pans — load it and adjust then.

### Secret test/dev account (built & verified)

Creating a player named **`mitb`** (case-insensitive; the old long spellings
`MICHAELISTHEBEST` / `MICHEALISTHEBEST` still work as aliases) turns on **test mode** — it's the
user's own cheat account for fast playtesting. Effects:
- **One question per room, then the room is DONE**: `handleSolved()` (in `05-render.js`) has a
  `state.testMode` branch at the top of its gate logic — after the *first* solve it calls
  `advanceToNextLevel(true)` to jump straight to the next room (instead of the normal
  `ARENA_GOAL`-solve gate). Blasts through the whole curriculum one question at a time.
- **Boss Gate always open**: since one question auto-advances (so the post-solve gate screen
  never fires), `loadProblem()` shows the persistent "⚔️ Boss Gate Open!" button
  (`gateEnterBtn`) on **every** room when `state.testMode` — clicking it opens the gate menu
  (Challenge Boss / Visit Shop / Keep Training) so the tester can drop into boss/shop/battle in
  any room, any time. (Normal players still only see it after earning the gate.)

> **Boss Gate requirement = `ARENA_GOAL` (currently 10), single source of truth** in `01-data.js`.
> Set 2026-07-14 (was 6). `handleSolved()` opens the gate (`gatePending = bossGateUnlocked = true`,
> `showGateScreen`) only when `levelSolves >= ARENA_GOAL`; the old "skip the boss at 9 solves"
> auto-advance was **removed** (the gate now opens only after the finale question). Progress shows
> `Arena Progress: N / ARENA_GOAL` via `updateLevelProgress()`; `#progressDots` has `ARENA_GOAL`
> dots. New state fields (`bossGateUnlocked`, `bossRoomEntered`, `bossDefeated{}`) are declared in
> `01-data.js` defaults; their reset-on-leave + persistence is Phase 3 (not yet wired).
- **Effectively-infinite coins & gems**: `updateStats()` re-pins `state.coins = state.gems =
  999999` on every refresh when `testMode`, so spending never runs them down. (Gems have no
  built system yet — the field is set for when the materials/trading-store system lands.)
- **How it's wired (no save-schema change):** `TEST_NAMES = ['MITB', ...aliases]` is a const in
  `01-data.js`; `state.testMode`/`state.gems` are new state fields; `startGame()` (in
  `07-main.js`, the single boot path for both New Player and Continue) sets
  `state.testMode = TEST_NAMES.indexOf((activeProfileName||'').trim().toUpperCase()) !== -1`. So
  it re-derives from the profile name every load — a normal player is never affected (verified:
  "Mia" →
  testMode false, coins 0). A 🔓 badge shows in the name tag and a toast announces it on start.

### RPG Systems Expansion — Phase R1 built & verified (Cash + Materials + Drops)

The user approved a big 9-feature RPG expansion (full plan in
`C:\Users\Michael Cheng\.claude\plans\whimsical-churning-hopcroft.md` → "RPG Systems Expansion",
phases R1–R6). **Phase R1 (economy foundation) is now built:**
- **New module `game/js/09-items.js`** (loaded after `04-logic.js`, before `05-render.js` — added
  to the `<script>` list in `index.html`). Holds `MATERIALS` (essence 🫀 / silver 🥈 / gold 🥇 /
  gem 💎, each with `name`/`icon`/`cashValue`), `MATERIAL_ORDER`, and the helpers `rollMonsterLoot`,
  `getUpgradeRecipe`, `hasMaterials`, `spendMaterials`, `addMaterials`, `materialsSummary`,
  `renderMaterialsBar`. It only touches `state.materials` at runtime (so `el`/`state`/`rand` from
  earlier modules are available).
- **`state.materials = {}`** (id→count) added in `01-data.js` and threaded through the 4-place
  persistence rule in `03-save.js` (`getSaveSnapshot`, `applySnapshotToState` with `||{}`,
  `resetPlayerState`). Test mode (`updateStats`) tops every material to 999.
- **Monster drops:** `handleBattleVictory` (`06-rpg-battle.js`) now calls `rollMonsterLoot` +
  `addMaterials` (richer for higher rank) and shows a "💰 +N Cash · Looted 🫀… " toast; bosses
  (rank 3) still push a keepsake trophy string. (The old cosmetic Ruby/Sapphire/Emerald gem
  strings were removed.)
- **Upgrades cost materials:** `rpgActions.upgrade` now needs Cash **and** the per-level recipe
  from `getUpgradeRecipe` (+1: 🫀2 🥈1 · +2: 🫀3 🥇1 · +3: 🫀5 💎1); blocked with a "Need
  materials: …" toast otherwise. `getUpgradeHint` shows the recipe; a **materials bar**
  (`#materialsBar`, styled `.materials-bar`/`.mat-chip` in `styles.css`) renders atop the shop
  via `renderMaterialsBar()` in `renderShopList`.
- **Currency relabelled "Cash 💵"** (internal field stays `state.coins` — no save migration): the
  header stat tile, all shop buttons (🪙→💵), the solve/victory toasts, "Not enough Cash", and
  the saved-player card. `state.gems` is now truly dead (superseded by `state.materials.gem`) —
  leave it or remove later.
- Verified in-browser: material-gated upgrade (blocked→allowed), real battle drop into the pouch,
  Cash label, and full reload persistence; zero console errors. Backup: `game_backup_before_R1_economy/`.

**Still pending: R2 (Trading Room), R3 (Profile + inventory + consumables + status effects),
R4 (longer weapon list + shop SVG art + upgrade animation), R5 (WuXing elements), R6 (speed/dodge/
shoes)** — see the plan file. The design-revisions notes below are partly superseded by that plan
(materials are now traded in the Trading Room, not a "pocket"; casino stays Cash-only).

### Story, Astronomy & Star Log — built & verified

The user pasted a full story bible ("Archive Minds" — ancient human-built AIs that preserved
knowledge, left the Solar System, and returned after a catastrophe erased humanity; they no
longer recognize modern humans and their guardians attack; math is the one shared language; the
player is a "Solver") and asked to add it. Two locked decisions drove the build: **chapters =
real nearby star systems, rooms = real planets/moons** (real names + real kid-friendly astronomy
facts, so kids learn astronomy too), with **hand-built stylized SVG planet art** (no real
photos); and **boss defeats reveal a memory fragment** ("many guardians were never evil"). Only
Chapter 1 exists in code, so it's themed as the **Sol System** (Room 1 Earth → Room 10 Neptune);
the full 9-chapter → star-system map + ending are recorded as canon in the plan file. This
**supersedes the old world names** (Number Kingdom / Expression Forest / … from the design doc).

- **New module `game/js/14-lore.js`** (loaded after `09-items.js`, before `05-render.js`; also
  before `07-main.js` which calls `initLore()`). Exports (all window globals):
  - `STORY` — verbatim opening narration (9 paras) + ending + tagline "Knowledge Is Humanity's
    Strongest Weapon."
  - `BODIES` (keyed by room 1–10) — each Sol body's `name`/`kind`/`accent`/`blurb`/`facts[]`/`fun`,
    with real astronomy (diameters, day/year lengths, moons, temps). `BODY_ORDER`.
  - `CHAPTER_LORE['balance-quest']` — chapter `intro`/`hook` + `memoryFragments` keyed by room
    (one per rank-3 boss, R1 Blackboard Behemoth … R10 Galaxy Final King).
  - `planetSVG(room, ctx)` / `starSVG(ctx)` + `PLANET_ART` — stylized SVG spheres (Earth oceans,
    Mars poles, Jupiter bands + red spot, Saturn ring, etc.); `ctx` namespaces gradient ids.
  - Codex: `openCodex(tab)`, `closeCodex()`, `setCodexTab()`, `renderCodex()` (+ `renderStoryTab`,
    `renderStarAtlas`); narration: `showOpeningNarration()`, `hideOpeningNarration()`; astronomy
    card: `updateAstroCard()`; unlocks: `unlockBody`, `unlockMemoryFragment`, `isBodyUnlocked`,
    `isFragmentUnlocked`, `ensureCodex`.
- **New saved state `state.codex = { bodies:{room:true}, fragments:{room:true} }`** — default in
  `01-data.js`, threaded through the 4-place rule in `03-save.js` (snapshot / apply with nested
  guard / reset). Unlocks are keyed by flat room number (Ch1: room === level).
- **Hooks:** `loadProblem` (`05-render.js`) calls `updateAstroCard()` — a slim `#astroCard` panel
  atop the equation view showing the room's body + 2 facts + art, unlocking that body. Boss
  victory in `handleBattleVictory` (`06-rpg-battle.js`, inside the existing `rank>=3` block) calls
  `unlockMemoryFragment(monster.room)` → combat-log + "📖 Memory fragment recovered" toast. New
  players get `showOpeningNarration()` after `startGame()` (skipped in test mode; replayable from
  the Star Log). `chapters[0]` gained `storyTitle`/`system` fields.
- **UI (index.html + styles.css):** `#narrationOverlay` (star-field crawl), `#codexView`
  view-container with Story/Star-Atlas tabs, a **📖 Star Log** header button (`onclick="openCodex()"`),
  the start-screen tagline, and `#astroCard`. New CSS block at the end of `styles.css`
  (`.astro-card`, `.narration-*`, `.codex-*`, `.frag-*`, `.atlas-*`, `.planet-art` float/pulse).
  DOM ids cached in `02-dom.js`. Header/tab/back/begin buttons use inline `onclick` (globals),
  so `initLore()` only ensures `state.codex` exists.
- Verified in-browser (served on the local http server): zero console errors; new-player narration
  (9 paras + tagline); astro card maps Earth→Neptune across all 10 rooms; Codex Story (10 frags,
  lock→unlock) + Star Atlas (Sun + real facts, visited-worlds gating); the real `handleBattleVictory`
  path unlocks a fragment without throwing; `state.codex` persists through a genuine page reload.
  `04-logic.js` (algebra core) untouched, so the 1132-assertion harness stays valid. Backup:
  `game_backup_before_story_*`.

### Hub / Farm / Wonderland batch + fixes — built & verified (2026-07-12)

A large feature batch, built partly by a 6-agent Workflow (`odyssey-feature-modules`). **Six new
self-contained modules** (each renders itself into an initially-empty `#…View` container via the
`openShop`-style view toggle; classic scripts; every cross-module call `typeof`-guarded):
- **`15-map.js` (`#mapView`)** — the walkable hub ("World Map"; the instructions file wants this
  reframed as **Earth**). Avatar walks the path to a building, then opens it: Practice Hall
  (`closeMapHub`→equation), Weapon Store (`openShop`), Item Store, Hotel (in-map panel: full HP/MP
  restore for `hotelCost()` = **15×level** Cash), Wonderland (shows pass count), Farm, Alchemy Lab.
  Globals: `openMapHub/closeMapHub/hotelCost/hotelSleep`. Entry: 🗺️ Map button in `#eqActions`.
- **`16-chest.js`** (overlay, no view) — `showVictoryChest(loot, cashReward)` after every battle.
  PURE PRESENTATION (caller already credited rewards); tap-to-open, sparkles, `playSfx('chest-open')`.
  Wired in `handleBattleVictory` (falls back to the old toast if absent). `chestRewardChips` is pure.
- **`17-wonderland.js` (`#wonderlandView`)** — carnival lobby + a **Tile Ball** (Breakout) canvas
  minigame costing 1 pass; `wonderRewardForScore(f)` (pure) pays materials+item by cleared fraction;
  `applyWonderReward` credits them. Loop is `cancelAnimationFrame`d on exit. Other minigames are
  "coming soon" cards. **Hoo Hey How is NOT built yet** (instructions want it here).
- **`18-farm.js` (`#farmView`)** — crops (apple/orange/rice/wheat/corn/coffee/sugarcane) + animals
  (chicken/duck/sheep/pig/cow) + houses. Growth is driven by **`state.solveClock`** (total solves;
  "1 room" = 9 solves), NOT wall-clock. `plots` is a fixed-length array (`null`=empty owned plot) +
  derived `plotCount`. Fertilizer → 9-solve crop, else 27; feed → animals grow 9 solves after
  feeding. "🛒 Go to Market" panel buys seeds(=plant)/animals/feed/fertilizer/plots/houses. Pure
  helpers `cropProgress/animalProgress`.
- **`19-alchemy.js` (`#alchemyView`)** — the "mixture room": `ALCHEMY_RECIPES` combine items +
  monster materials into **Super Medicine** (full HP/MP) and **Poison Vial** (arms next battle).
  `canCraft`/`craftRecipe` (validate-then-spend). Bubbling-cauldron CSS.
- **`20-item-store.js` (`#itemStoreView`)** — sells potion/ether/moon_herb/star_dew (from `ITEMS`);
  backpack "Use" section. `buyStoreItem(id,qty)`.

**`09-items.js`** gained `ITEMS`/`ITEM_ORDER` (consumables + ingredients + feed/fertilizer),
`countItem/addItem/spendItem/useItem`, and `awardWonderPasses(level, perfect)` (first clear = 5
passes; perfect replays 4→3→2→1 on a diminishing schedule; verified sequence
`5,4,4,4,4,3,3,3,3,3,2,2,2,2,2,2,1,0`). New **persisted** `state` fields (4-place rule):
`wonderPasses, passEarns, inventory, poisonArmed, solveClock, roomFails, farm`. Test mode also
tops up passes + every item.

**Combat/UX hooks (into 05/06/07/13):** `handleBattleVictory`→chest + `playSfx('victory')`;
poison **arms** in `startCombat` (from `state.poisonArmed`) and **ticks** as real per-round DoT in
`executeCombatRound`; arena/battle **music** + buy/upgrade/hit/victory/defeat SFX; `handleSolved`
increments `solveClock`.

**Fixes this turn (all verified live):**
- **`V=IR` bug** — formula letter checks were case-sensitive while input was lowercased, so
  "divide by R" (typed `r`) never matched. Fixed with `sameToken()` (case-insensitive) in
  `applyFormulaOp` + input canonicalization in `07-main.js`. Unit-tested both R and add-token paths.
- **Hints only on the first 2 questions** of each room (`el.hintBtn` hidden once `levelSolves ≥ 2`).
- **5 wrong answers = Game Over** → room restarts. `registerFail()` on genuine errors only (bad op,
  wrong bracket expand, wrong MC choice, wrong formula letter — a *legal-but-unproductive* balance
  move does NOT cost a life). `#livesRow` ❤️/🖤, `#gameOverOverlay`, `restartRoom()` (also the
  "🔄 Restart Room" button — the "exit/restart any time" request).
- **Worm-hole warp animation** — `playWarpFx()` spinning-tunnel overlay; the room switches mid-swirl.
- **`balance.png`** wired as the balance-board background (was the missing `balance-bg.jpg`).
- **Audio wiring finished** (was interrupted): music per context + all SFX, mute persists.

Verified live (served on the PowerShell http server, `mitb` test account): zero console errors
across all 20 scripts; every module opens/renders (no mojibake); farm plant→fertilize→harvest and
animal buy→feed→sell; alchemy craft; item-store buy/use; tile-ball canvas; hotel; chest overlay;
pass economy; the IR fix and fail/lives/solveClock through the real submit path. Backup:
`game_backup_after_map_farm_batch_20260712_231234`.

**Still missing vs the instructions file (biggest gaps):** Profile+Inventory UI, Trading Room,
large weapon catalogue + SVG art, Wu Xing, full spell system, Hoo Hey How, essence→AI-chip
migration, Star-Atlas star-system→planet drill-down, global "Go Back to Earth". See that file's
phase plan.

### Design revisions — captured from the user (R2–R6 pending; see plan file)

These revise the earlier design doc (the "Precalculus Odyssey" Artifact). R1 above is done; the
rest fold into the RPG plan's phases.

1. **Theme: "worlds" → solar systems.** Reframe the 6 worlds as **stars / solar systems**
   (starting with our own Sol system, then nearby real systems in rough order of distance), and
   **rooms as planets or their satellites**. Use real astronomy as flavor per node: star
   magnitude, distances (between stars, and between planets/satellites), temperature ranges,
   orbital periods, self-rotation periods. **Pick real stars that actually have enough
   planets+moons** to fill each world's room count. **The math curriculum is unchanged** — this
   is a naming/visual/flavor skin over the existing per-room topics in `ROOMS_AND_CODES.md`
   (World I → the Sol system, etc.). The 4-letter codes ("passwords") likely become
   worm-hole-jump codes per planet.
2. **Split the gambling economy into two rooms** (revises the earlier gambling/materials/casino
   design):
   - **Hoo Hey How = coins ("paper money") ONLY.** No materials/gems bet here anymore.
   - **A separate Trading Store** is where gems/bonus materials are **bought and sold**. It shows
     a **historical price chart per commodity** (iron, copper, gems, diamond, …).
   - **Prices only move when the player answers a review question correctly.** A **"Refresh
     Prices"** button poses a question whose scope scales with **how many rooms the player has
     completed so far** (i.e. spaced review of everything learned to date). Wrong answer → prices
     unchanged.
   - **Price model:** biased upward — *mostly slow steady rises*, with occasional *small downward
     dumps* and occasional *big upward jumps*. So farming materials + reviewing = appreciation;
     it rewards revisiting old material. (This supersedes "casino betting with materials"; the
     casino/Hoo Hey How is now coins-only, and materials are traded, not gambled.)
3. **Monster count & art:** with 133 rooms at **3 monsters/room = 399 monsters, plus one single
   final boss = 400 total.** Confirms the 3-per-room roster (Easy/Elite/Boss) and adds one
   ultimate end-of-game boss (after World VI / room 133). **Art approach** (agreed direction, not
   built): a **procedural SVG generator** — silhouettes × palettes × feature sets × ~16 distinct
   **attack behaviors** (lunge-chomp, fireball, ground-slam, soul-drain, eye-laser, poison-spit,
   frost-burst, lightning-zap, flame-breath, …) → hundreds of unique combinations scaled by
   depth, with the 400th a bespoke hand-crafted boss. NOT 400 hand-drawn images.
   **CONSTRAINT (user, important): monsters must be FIXED / deterministic — the same for every
   player.** The generator must be **seeded by the monster's id** (room+rank), never
   `Math.random()` per-render, so a given room always shows the same three monsters for everyone,
   across sessions/players. (The current `monsterCatalog` + `getMonsterArtMarkup` are already
   deterministic; keep that property when the generator replaces them.) Two proof-of-concept
   Artifacts were published this session to validate look/feel before building: **"Monster Lab"**
   (9 monsters, dramatic wind-up→lunge→impact attack animations) and **"Weapon Forge"** (below).
4. **Weapon (and shield) art with upgrade decorations** (user request; POC built, not yet wired
   into the game): each weapon is a small **SVG**, and a single `weaponSVG(id, level)` function
   draws the base blade + layers decorations by `upgradeLvl` (0–3): **+1 = a gem, +2 = gem +
   glow + rune, +3 = gem + aura + sparks**, with a use-animation (swing / fire / cast) that
   intensifies per level. The shop/combat already track `item.upgradeLvl`, so wiring this in
   means swapping the current text/emoji weapon display for `weaponSVG(id, lvl)` in
   `renderShopList()` and the combat sprite. Validated in the "Weapon Forge" Artifact (5 weapons
   × +0/+1/+2/+3). Shields get the identical treatment.
5. **Combat expansion** (user request; POC built as the "Combat Lab" Artifact, not yet wired
   into the game). Four connected additions to the currently-1v1 battle:
   - **More weapons** — beyond the current 5 (the Combat Lab shows Frost Glaive, Thunder Hammer,
     etc.); each is just another entry in `state.weapons` with a `weaponSVG` icon.
   - **Attack spells** — the in-game spell menu (`openSpellsMenu` / `castPlayerSpell`) currently
     has **heal spells only**; add offensive ones (Firebolt, Frost Spear, …) that spend MP and
     damage a target.
   - **Minions** — each room's monster can bring **1–2 small, weak minions** (low HP, tiny
     counter-poke — the user said "don't make them too strong"). This turns combat multi-target,
     which is the prerequisite for ↓.
   - **AoE "hit everything" spells** — Chain Lightning / Meteor Storm / a Starfall ultimate that
     damage **all** living enemies at once (only meaningful once minions exist).
   **Build impact:** this is the biggest of the pending items — `executeCombatRound` and the
   battle UI are built for a single enemy; adding minions means an enemies[] array, per-enemy HP
   bars, target selection, and AoE iteration. Do it as one coherent combat rework (the Combat
   Lab is the reference for the intended feel). Keep the "monsters are fixed/deterministic per
   player" rule — the minion roster per room must also be seeded by room id, not random.

### Where the code lives (post-modularization)

The old "two script IIFEs in one file" structure is gone — see "Project layout" and "Module
system" near the top of this doc. Quick map of which `game/js/*.js` file owns what:

- **`08-layout.js`** is the old `setupWidescreenDashboard` IIFE — a **DOM restructuring patch**
  that runs last, re-parenting existing elements (by id) into a `.hud-shell` /
  `.quest-main-panel` / `.quest-control-panel` widescreen layout and injecting the fullscreen
  toggle. It owns no game state, only moves DOM nodes. **If you add new top-level elements to
  `#equationView`, check whether this file's `mainIds` / id-list arrays need to include them**,
  or they'll land in the wrong panel.
- Everything else (state, generation, logic, rendering, save, shop, battle, events) is spread
  across `01-data.js`…`07-main.js` as described in the layout section. Almost all feature work
  happens in those.

### Global state object (`state`)

```js
state = {
  level, score, coins, streak, levelSolves, maxLevel(=10),
  mode,          // 'numeric' | 'formula' | 'bracket'
  problem,       // shape depends on mode, see below
  eq,            // shape depends on mode, see below (null when mode==='bracket' pre-expand)
  bracketEq,     // { coeffA, innerK, rhs } — only populated pre-expansion
  bracketCorrect,// cached correct MC answer string during an active expand challenge
  movesTaken, currentOp, locked, resetPending, gatePending,

  // RPG layer
  equippedWeapon, equippedShield,       // ids into weapons[] / shields[]
  heroLvl, heroXp, playerMaxHp, playerHp, playerMaxMp, playerMp,
  weapons: [ { id, name, power, cost, owned, upgradeLvl }, ... ],   // 5 tiers
  shields: [ { id, name, defense, cost, owned, upgradeLvl }, ... ], // 5 tiers
  defeatedMonsters: {},   // map of monsterKey -> defeated (drives trophies/bounty checklist)
  trophies: []
}
```

### The three equation-solving problem modes

(Unchanged core mechanic — still the heart of the game.)

**`numeric`** — plain linear equations in `x`, e.g. `2x + 3 = 11`.
`eq = { coeff, add, result }` meaning `coeff*x + add = result` (add can be negative).
Solved when `coeff===1 && add===0`.

**`bracket`** — equations with a distributable bracket, e.g. `3(x − 6) = 18`.
Pre-expansion state lives in `state.bracketEq = { coeffA, innerK, rhs }` (meaning
`coeffA*(x + innerK) = rhs`). Player must tap "Expand the brackets," which shows 4 multiple
choice options (correct expansion + 3 common-mistake distractors: forgot to multiply the
second term, sign flip, forgot the coefficient on x). On a correct pick, the problem **morphs
in place into `mode: 'numeric'`** with `eq = {coeff: coeffA, add: coeffA*innerK, result: rhs}`
— from that point on it's just a normal numeric problem and reuses all the same code. This
"morph into numeric" pattern is deliberate and load-bearing; don't reintroduce bracket-specific
solving logic.

**`formula`** — "change the subject of a formula" style, e.g. `y = mx + c`, solve for `x`.
`eq = { coeffToken, addToken, addSign, resultText }` where tokens are single letters (never
numbers, never multi-character). The player types a *letter* (not a number) matching the
term they want to cancel; `applyFormulaOp` enforces solving order (must clear the additive
term before dividing by the coefficient) with a friendly rejection message otherwise. The
RHS (`resultText`) grows as a string, e.g. `y` → `y − c` → `(y − c) / m`. `formulaBank` (10
entries) supplies real formulas (Ohm's law, `F=ma`, `v=u+at`, etc.) with a caption shown above
the scale.

### Level progression ("rooms") — drives which problem types appear AND gates the RPG layer

**Note:** everything in this section describes Chapter 1 ("Balance Quest") specifically —
`levelCodes`/`levelTitles`/the tier logic below are Chapter-1-scoped content tables, not
generic across all chapters. See "Chapter registry" above for how a new chapter supplies its
own equivalent tables. Levels are framed in-UI as **"Practice Rooms"** (see `#levelValue` /
"Practice Room" stat label), each with a themed 4-letter warp code (`levelCodes = ['SEED',
'GROW','ROOT','WIND','LAKE','FIRE','SAND','VOID','HERO','STAR']`, index = level - 1).

- Levels 1–2: one-step (`add`/`sub`)
- Level 2: `mul` type also unlocks
- Levels 3–5: `bracket` type mixed in alongside `twoStepAdd`/`twoStepSub`/`mul`
- Levels 6–10: `formula` problems increasingly replace numeric ones —
  `formulaChance = min(1, (level-5)*0.25)` — fully formula-only by level 9–10, but numeric/
  bracket types can still appear at any level ≥6 when the formula roll fails.
- `levelTitles` array (10 entries) labels each level in the UI, e.g. "Formula Novice" at 6.

**Room gating (new since the RPG layer was added):** `state.levelSolves` counts correct solves
within the *current* room (resets on level change/warp).
- At **6 solves** in a room (and level < maxLevel): `state.gatePending = true` and
  `showGateScreen()` fires — presents "⚔️ Challenge Room Boss" / "🛒 Visit Weapon Shop" /
  "📝 Keep Training" instead of the next problem. Choosing "Keep Training" calls
  `hideGateScreen()`, which clears `gatePending` (so it won't re-trigger) and leaves a
  persistent "⚔️ Boss Gate Open!" button (`el.gateEnterBtn`) so the player can return to the
  gate any time without re-earning it.
- At **9 solves** in a room (and level < maxLevel): auto-advances to the next room via
  `advanceToNextLevel(true)` regardless of gate status ("training mastery").
- A **Warp Door** (`#warpDoorBtn` / `#warpPanel`) lets the player jump directly to any room by
  typing its 4-letter code (`executeWarp()`), resetting `streak`/`levelSolves`/`gatePending`
  for that room. This is an intentional dev/player shortcut, not a bug.

`state.streak` (resets to 0 on `revealBtn`) still separately drives the reward-scene progress
UI (4-dot countdown), same mechanic as before, decoupled from the 6/9 gate thresholds above.
`revealBtn` (giving up on a problem) resets `streak` to 0 — a mild, non-punitive reset ("plant
a new seed"), not a fail state. There are no lives and no game-over screen by design.

### Scoring & rewards

`par` = minimum moves needed (computed at problem generation: 1 per nonzero term that needs
clearing, +1 for the expand step on bracket problems). On solve (`handleSolved()`):
- Star rating: 3 stars if `movesTaken <= par`, 2 if `par+1`, else 1.
- **Coins:** 15 / 10 / 5 for 3★ / 2★ / 1★ — spent in the weapon/shield shop.
- **Hero XP:** 30 / 20 / 10 for 3★ / 2★ / 1★ — via `addHeroXp()`, drives `state.heroLvl`.
- Wrong/invalid attempts (bad input, doesn't divide evenly, wrong order, wrong MC choice)
  **do not** count as moves and are not penalized — consistent with the "low-stress, encourage
  experimentation" philosophy.

### The reward scene system (10 unique per-level animations)

Unchanged in design from earlier versions:

- 10 `<g class="scene-group" data-scene="0..9">` groups inside one `<svg viewBox="0 0 320 120">`
  in the HTML, each `display:none` except the current level's (toggled via inline style in JS,
  not CSS classes — see `renderSceneForLevel`).
- Each scene contains 1–3 `<path class="draw-path">` elements. On load, `initDrawPaths()` reads
  each path's real length via `getTotalLength()` and sets `stroke-dasharray`/`stroke-dashoffset`
  to that length (fully hidden). As progress increases, `stroke-dashoffset` animates toward 0
  via CSS transition — the path "draws itself in" like chalk. With N paths in a scene, progress
  fraction `f` (0–1) is divided into N equal segments so paths draw in **sequentially**, not
  simultaneously.
- A `.scene-celebrate` sub-group (static shapes — circles, small triangles, no `getTotalLength`
  needed) pops in via a scale+opacity transition once `f >= 1` (flower bloom, flag, party hat,
  butterfly, fireworks burst, etc.).
- Level → scene index is a direct 1:1 mapping (`level - 1`, clamped), **no band/theme reuse**:
  1 seed→flower, 2 balloon, 3 bridge, 4 sandcastle, 5 rainbow, 6 monster→friend, 7 gift, 8
  caterpillar→butterfly, 9 fireworks, 10 rocket.
- `sceneCaptions[idx][stage]` (stage 0–4) gives the caption text under the scene.
- `renderScene()` (derives fraction from live `state.streak%4/4`) is used for normal re-renders;
  `renderSceneForLevel(oldLevel, forcedFraction)` is used at the solve-celebration instant —
  note it's now called with `Math.min(1, state.levelSolves / 6)` as the forced fraction (tied
  to the 6-solve gate threshold, not just streak%4). `state.level` may have already incremented
  by the time we render the completion frame — you must capture `oldLevel` **before**
  incrementing, or the celebration will render the wrong (new) scene at 100% instead of
  finishing the old one. This bug is easy to reintroduce; be careful with ordering in
  `handleSolved()`.

If asked to add more levels/rooms or change level count, this scene system needs new
hand-authored `<path>` geometry per new level — it does not procedurally generate art. (Same
applies to `levelCodes`, `levelTitles`, `monsterCatalog`, and `sceneCaptions` — all keyed by
level/room index, all need a new entry.)

### The balance scale (equation visualization, separate from the reward scene)

`#chalkboardScale` — the actual equation balance visualization above the controls. Current
(corrected) behavior, per explicit user feedback:

- **Always renders level (0deg rotation).** An equation is mathematically balanced at every
  valid state, so it should never tilt just because it's "unsolved."
- **Only ever wobbles** (`wobbleBeam()`, a one-shot CSS `tipWobble` keyframe animation via a
  `.wobble` class + forced reflow) as a brief negative reaction to an **invalid** move attempt
  — bad input format, uneven division, wrong term/order, wrong bracket-expand MC choice.
- The `.balanced` class (adds a yellow glow to the pans/text) is reserved for the *solved*
  celebration moment only, unrelated to rotation.
- **Do not reintroduce persistent tilt-on-load or tilt-while-unsolved** — this was deliberately
  removed. If you're tempted to add motion to indicate "not yet solved," reconsider; the person
  considers that mathematically incorrect framing.
- The chalkboard background image is set via CSS `background-image: url('balance_quest_empty_pans_...jpg')`
  in one rule and via an inlined base64 `data:image/jpeg;...` in a later, more specific
  (`!important`-heavy) override rule near the top of `<style>` — the base64 rule is what
  actually renders; the external `url('balance_quest_empty_pans_...jpg')` reference is dead/
  unused (that file isn't in this directory). Don't be confused by the two competing rules.

### The RPG progression layer (new — not present in earlier handoff versions)

This is a full sub-system layered on top of the algebra game, unlocked as the player progresses
through rooms. It has its own three "views" toggled via `.view-container.active` on
`#equationView` / `#shopView` / `#battleView` (only one visible at a time):

**Hero stats bar** (always visible above the equation) — shows hero level, XP bar
(`addHeroXp()` handles level-ups), HP/MP text+bars, and a trophies toggle.

**Shop (`#shopView`, opened via `openShop()`)** — two sections, Weapons and Shields, each a
fixed 5-tier list (`state.weapons` / `state.shields`, ids like `wood_sword` → `star_scepter`,
`leather_buckler` → `crystal_shield`). Each owned item can also be **upgraded** (cost scales via
`getUpgradeCostForLevel`) or **sold** (`getItemSellValue`) for partial refund. `getPlayerAp()` /
`getPlayerDp()` derive combat stats from the currently equipped weapon/shield + upgrade level.
`renderShopList()` rebuilds the DOM lists from state on every open/purchase. The `.shop-btn-upgrade`
button shows the *current* upgrade's price; the `.shop-upgrade-hint` line below it
(`getUpgradeHint()`) previews the outcome of buying it — stat before/after (`AP: 9 → 11 (+2)`
for weapons, `DP` for shields), what the *next* tier after this one will cost, and the resell
value post-upgrade. Keep both in sync if the upgrade formula (`getUpgradeCostForLevel`) or the
per-tier gain (currently hardcoded `+2 AP` / `+1 DP` per upgrade level) ever changes.

**Battle arena (`#battleView`, opened via `openBattle()`)** — two sub-screens toggled by inline
`display`:
- `#monsterSelectScreen` — a bounty checklist for the current room (`bountyChecklist`,
  driven by `state.defeatedMonsters`) plus a grid of monster cards (`renderMonsterChoices()`).
  Monsters come from `monsterCatalog` (fixed list, 6 per room × `rank` 1–6, rank 6 = room boss)
  combined with `monsterRanks` (difficulty tier → base hp/mp/attack/defense/reward) via
  `buildMonster()`, which scales stats by `entry.room`. A monster is locked
  (`getMonsterLockReason()`) until the room is reached AND `state.heroLvl` meets
  `requiredHeroLvl = room + floor((rank-1)/2)`. Defeating all 6 in a room reveals an "Advance to
  Room N" button (`#arenaAdvanceRow`).
- `#combatArenaScreen` — turn-based combat: player card vs. monster card, each with inline SVG
  character art (hero: purple mage; monsters: per-monster SVG, e.g. ice-elemental shown for
  early monsters — check `getMonsterArtMarkup()` for the difficulty→art mapping), HP/MP bars,
  AP/DP readout. `executeCombatRound()` runs one exchange (player attack/spell, monster
  counter), with `launchBattleProjectile()` / `battleImpactAt()` / `resetCombatPoses()` /
  `triggerFloatingDmg()` driving the attack-swing / hit-shake / floating-damage-number
  animations. `openSpellsMenu()` exposes 3 heal spells gated by hero level (Heal @ Lv1, Greater
  Heal @ Lv3, Elixir of Life @ Lv6), spent via `castPlayerSpell()`. `handleBattleVictory()` /
  `handleBattleDefeat()` resolve the round (rewards, trophy add, `defeatedMonsters` update, or a
  non-punitive defeat message) and `handlePostCombatRedirect()` / `handleKeepFighting()` decide
  what screen comes next.

**Trophies** — `state.trophies` + `#trophiesPanel` (toggled via `window.rpgActions.toggleTrophies()`,
attached as a global for the inline `onclick` in the HTML — this is the one place state is
reached from outside the main IIFE's closure) shows a running list of defeated-boss trophies.

If asked to add new rooms/levels, **all of these RPG tables need new entries too**:
`levelCodes`, `levelTitles`, `sceneCaptions`, and 6 new `monsterCatalog` entries for the new
room (plus scene `<path>` art, per the reward-scene section above).

## Known design decisions (don't relitigate without reason)

- No lives / no game-over screen — removed intentionally to avoid punishing experimentation.
  The RPG battle system's "defeat" state is likewise non-punitive (see `handleBattleDefeat()`).
- Numbers/tokens the player types must be **positive integers** (numeric mode) or a **single
  letter** (formula mode) — never negative numbers or multi-char tokens; sign/direction is
  encoded by which operation button (+/−/×/÷) is selected instead.
- Formula-mode solving order is enforced (must clear the additive term before dividing) —
  this is intentional scaffolding, not a bug, and mirrors how it's actually taught.
- Reset button requires a second confirming tap ("Sure?") rather than a native `confirm()`
  dialog, since native dialogs can behave oddly inside sandboxed/embedded environments.
- Google Fonts loaded via `<link>` (not a JS-library CDN) — this has been working fine.
- The Warp Door / level codes are an intentional player-facing shortcut (not a hidden dev
  cheat to be removed) — keep it working if you touch level-progression code.
- Coins and hero XP are two separate currencies with separate purposes (coins = shop
  purchases, XP = hero level which gates monster access and spells) — don't conflate them.
- Progress persists via `localStorage` as up to 10 named player profiles (key
  `balanceQuestProfiles_v1`), gated behind a New Player (name entry) / Continue-as-profile start
  screen — see "Named player profiles" above. The 10-profile cap is a hard UI limit (New Player
  disabled at cap); there is intentionally no auto-eviction of old profiles — the person should
  delete one manually via the 🗑 button, not have data silently discarded.

## Ideas not yet implemented (fair game for "next level" requests)

- Sound effects (currently silent).
- A real, user-visible save file (e.g. via File System Access API directory picker, or a manual
  Export/Import-JSON button) as an alternative/addition to the localStorage autosave — flagged
  as a future option when this was built, not yet requested.
- Raising/removing the 10-profile cap, or an explicit "rename profile" action (currently a name
  is fixed at creation).
- More formula-bank entries or a difficulty ramp within formula mode itself.
- Fractional/decimal answers (currently everything is guaranteed to resolve to clean integers
  by construction — solving the generator backwards from a chosen integer `x`).
- A settings/difficulty picker instead of the automatic level-based ramp.
- **Superseded by the Precalculus Quest plan, not a standalone idea anymore:** "rooms/levels
  beyond 10" — see the plan file for the full chapter-by-chapter roadmap (Function Forest,
  Polynomial Peaks, Rational Ridge, Exponential Kingdom, Trigonometry Temple, Conic Caverns, The
  Precalculus Trials) instead of just extending Chapter 1's own content further.

## If you're picking this up cold

1. Read this file.
2. **If continuing the Precalculus Quest expansion**, also read the plan file at
   `C:\Users\Michael Cheng\.claude\plans\whimsical-churning-hopcroft.md` — it has the full
   chapter roadmap, the RPG-economy rebalance formulas, and the recommended build order
   (currently: Session 1 — chapter/mode registry refactor — is done; Session 2 — economy
   formulas + per-chapter shop-tier scaffolding — is next).
3. Open [Game_0.2.html](Game_0.2.html) in this directory to see current state — don't trust
   this document's line numbers to stay accurate as the file changes; use `grep`/search for
   function names instead. Note the file is large (~1.1MB) due to an inlined base64 image on
   one line — read it in offset/limit chunks rather than all at once if using a tool with a
   size cap.
4. Before editing, back up the file (`Game_0.2_backup_before_<change>.html`).
5. After changing any pure-logic function (`generate*Problem`, `apply*Op`, `solveFully`, the
   chapter registry, the mode registry), rebuild and rerun the regression-test pattern described
   in "Verification approach" above (Claude Browser tool + `javascript_tool`, not literal
   `node test.js` — Node/Python aren't installed on this machine) before telling the person it
   works.
6. For anything visual (new scene art, animation timing, combat UI, shop layout), be upfront
   that it hasn't been rendered/previewed unless you've actually opened it in a browser tool
   this session — say so rather than asserting it looks right. Prefer actually driving the live
   page (click buttons, submit forms, read resulting DOM text via `javascript_tool`) over
   assuming a refactor is behavior-preserving just because it "looks right" on paper.
7. **Update this file** to reflect whatever you changed, before ending your turn.

---

## Cloud Save layer (Cloudflare Pages + D1) — code complete, awaiting user deploy

Added an **opt-in** cloud-save layer AROUND the existing localStorage save (localStorage stays the
local source of truth). Nothing fires until the player clicks **☁ Cloud → Enable Cloud Save**.

- **Client:** `game/js/cloud-save.js` (`window.Cloud`: account/recovery, debounced ~10s event-based
  sync, per-profile server `revision`, 409 conflict, offline retry + pending queue) and
  `game/js/cloud-ui.js` (the ☁ Cloud panel, header status chip, Export/Import JSON, conflict dialog,
  local-profile→cloud migration). `saveGame()` (`03-save.js`) now also calls `Cloud.queueSave()` (guarded).
- **Server (repo ROOT, deployed by Cloudflare Pages, NOT inside game/):** `functions/api/cloud/*`
  (`account.js`, `account/recover.js`, `profiles.js`, `profiles/[profileId].js`, `_shared.js`),
  `migrations/0001_cloud_saves.sql` (D1), `wrangler.toml` (static output = `game/`, binding `DB`),
  `tools/local-save-server.ps1` (optional C:\temp companion). Only SHA-256 hashes of codes/tokens in D1.
- **Verified locally** against a mock API: account creation + recovery-code, debounced sync with
  revision tracking, profile listing, and 409→conflict all work; the game/math is unaffected;
  `saveGame` still works; console clean. **Not yet deployed** — needs the user's Cloudflare + GitHub
  (see `CLOUD_SETUP.md` for the exact click-by-click steps). The live D1 round-trip must be tested
  after deploy (no Node/wrangler on this machine).
