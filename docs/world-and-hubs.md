# Star-System Map & Hub Destinations

← [docs orchestra](README.md)

The walkable hub + its destinations. Each is a self-contained module that renders into an
initially-empty `#…View` container and toggles views the `openShop`-style way. Every cross-module
call is `typeof`-guarded. (The master plan reframes this hub as **"Earth"** with a global "Go Back
to Earth" button — Phase 1.)

## Map / Earth hub — `js/15-map.js` (`#mapView`)

An avatar walks the path to a clicked building, then it opens: **Practice Hall** (back to the
equation), **Weapon Store** (`openShop`), **Item Store**, **Hotel**, **Wonderland**, **Farm**,
**Laboratory**, **Trading Room**. Each building's `WMAP_SPOTS` entry carries a `desc`, rendered as a
hover `title` (+ `aria-label`). The Star Atlas was removed from the hub (still on the global header
nav). Entry: the **🗺️ Map** button in the equation view. `openMapHub`/`closeMapHub`.
**Hotel:** a full HP+MP restore for `hotelCost()` = **15 × level** Cash (`hotelSleep`) — now the main
way to heal, since combat wounds persist (see rpg-combat-economy.md).

## Victory chest — `js/16-chest.js` (overlay)

`showVictoryChest(loot, cashReward)` after every battle — tap-to-open, sparkles, reward chips. Pure
presentation (rewards already credited by the caller); re-entrant; reduced-motion aware.

## Wonderland — `js/17-wonderland.js` (`#wonderlandView`)

Carnival lobby showing **🎟️ Wonderland Passes** + a playable **Tile Ball** (Breakout) canvas game
costing 1 pass, plus **Hoo Hey How** and three carnival cards. `wonderRewardForScore(f)` (pure) pays
materials + an item by cleared fraction; `applyWonderReward` credits them. The rAF loop is cancelled on exit.

**Tile Ball has 5 difficulty levels** (`WOND_LEVELS`, Warm-Up→Singularity): rising grid size + ball
speed + fewer balls, `checker` gap patterns and 2-hit `armoured` tiles (`tile.hp`). The lobby card
opens a **level-select** (`wondOpenTileLevels`) with locked/cleared badges + best %. Clearing every
tile unlocks the next level and offers a Next-Level button; progress lives in
`state.miniGames.tileBall` = `{unlockedCount, firstCleared{idx}, best{idx:frac}, plays}` (persisted in
`03-save.js` under `state.miniGames`, default `{}`). `wondLevelReward(levelIdx, f, firstClear)` scales
the base tier by level (1.0×→2.4×), adds a **first-clear bonus**, and **halves repeat clears**
(anti-farming); the 1-pass cost is the throttle. `state.miniGames` is the shared save bucket for all
Wonderland mini-games.

**Carnival games — `js/34-wonder-games.js`.** Math-flavoured games built on shared helpers
`wgMini`/`wgRecordScore`/`wgPayReward` (`wgStopAll` stops every carnival timer and is called by all
Wonderland nav exits). ⚠️ Despite the name, these are **not free** in the current lobby — every card in
`wondLobbyHtml` (including this one) is wired through `_wondCard(...)` → `wonderPlay(launcher)`, which
charges 1 🎟️ Wonderland Pass on entry; only *replaying* inside a game (its own Replay/Difficulty
buttons call the start function directly, bypassing `wonderPlay`) is free until you back out to the
lobby. Bullseye Numbers and Merry Math-Go-Round were removed from the lobby grid; only:
- **Gone Fishin' 🎣** (`openFishin` → `fishStart(diff)`) remains, and was reworked **2026-07-16 from
  timed-score to LEVEL-BASED**: each of `FISH_MAX_LEVEL` (5) levels has a `target` catch count
  (`fishLevelConf`, 6/8/10/12/14 fish) that scales spawn speed up each level; catching `target` matching
  fish (`fishLevelUp`) advances to a faster, harder level; clearing all 5 pays a completion bonus.
  Ends on `fishEnd(allCleared)`. (This also fixed a latent bug: the old code called a since-deleted
  `bullReward`, which would have thrown; replaced with a local `fishReward`.)
Pay **Cash only**, scaled by score+difficulty with a beat-your-best bonus (rare CPU chip only on top
Hard runs) — replayable for score, never a rare-gear farm. Keyboard + touch; tooltips.

**Hoo Hey How** (`js/27-hoohey.js`, `#hooHeyView`) — Bầu Cua dice betting for Cash. Bet on the six
symbols, then three dice roll: each match pays your stake back **plus** the same again. The roll is
**animated with a bowl** (Phase 5) — `hhRoll` decides the final faces up front, deducts the stake,
sets `_hhRolling`, and runs a phase-timer sequence (`_hhPhaseTimers`) that toggles the bowl classes:
`.hh-bowl-cover` (drop over dice, 200 ms) → `.hh-bowl-shake` (wobble + shake sound, 1500 ms; the
cover class stays so the bowl holds down) → pause (300 ms) → `.hh-bowl-lift` (400 ms) → reveal the
final dice (`.hh-die-land`) tagged `.hh-dice-{win|lose|even}` + the `.hh-result-{…}` line. Roll (and
bet/clear) are disabled during the animation; reduced-motion skips to a short quiet reveal.
**History:** each roll is recorded newest-first (`_hhHistory`, capped 60) — roll #, the three dice,
the bets, and net win/loss — rendered in a scrollable right sidebar (`.hh-history`) and **persisted
to localStorage** (`poHooHeyHistory`) so it survives reloads; a confirmed **Clear** button
(`hhClearHistory`) empties it. `closeHooHey` clears all timers so navigation mid-roll can't strand
them. Controls were enlarged (shared `--font-ui-*` tokens, 44px touch targets). CSS lives in
`systems.css` (`.hh-bowl*` + `hhBowlShake`, `.hh-die*`, `.hh-hist-*`, `.hh-layout`, reduced-motion aware).

**Pass economy** (`awardWonderPasses` in `09-items.js`, called from `advanceToNextLevel`): first-ever
clear of a planet = **5 passes**; perfect replays (0 wrong) pay on a diminishing schedule **4 (×4) →
3 (×5) → 2 (×6) → 1** thereafter; non-perfect replays earn nothing. State: `wonderPasses`,
`passEarns`.

**2026-07-15 — Forbidden City (Shikinjou) + Virus Lab preview.**
- **🏯 Forbidden City** (`openShikinjou` in `39-puzzles.js`, lobby card in `17-wonderland.js`) — a new
  1-pass Shikinjou/紫禁城 tile puzzle built on the shared A2 shell. You walk a 🐼 around the palace and
  **shove spirit tiles** (`SHIK_TILE` colour map): a pushed tile **SLIDES** across the floor until it
  hits a wall, the exit, or another tile — and if it slides into a tile of the **same kind, both cancel**
  (authentic Shikinjou, fixed 2026-07-15 from the earlier push-one-cell version). The exit is a slide
  stopper so a tile can never cover it. Win by reaching the 🚪 exit. The move logic lives in a pure core
  `_shikStep(state, dx, dy)` shared by the game and the in-code BFS solver used to verify levels. 5
  hand-authored chambers (`SHIK_LEVELS`) — **every one BFS-verified solvable AND to genuinely require a
  match** (not walk-around-able). **Undo** (JSON snapshot stack), **Restart**, arrow/WASD + button pad.
  `wonderPlay('openShikinjou')` (no self-charging → no double-charge); win pays via `a2Result`.
- **📦 Cargo Bay difficulty bump (2026-07-15).** `CARGO_LEVELS` went from 3 trivial 1-2-crate boards to
  an **8-level, 3→5-crate progression** (corners, walled aisles, split top/bottom, a 5-in-a-row, and a
  mixed-direction depot). All 8 are **BFS-verified solvable** by a normalized Sokoban solver. (Glacier
  Push, the ice-slide variant, got its own harder set the next day — see below.)
- **💊 Virus Lab now shows the next two capsules.** Added a look-ahead queue (`VL.queue`, seeded in
  `openVirusLab`, advanced in `_vlSpawn` via `_vlRoll`); `_vlHud` renders a "💊 Next:" preview of the
  upcoming two pills as colour swatches (`_vlPillSwatch`, indexing `VL_COLS`).

**2026-07-16 batch — Comet Muncher fix, Virus Lab hard-drop, Glacier levels, skill-stop reels/dice,
sequential level systems on 3 more games, and 3 new games (Bowling, Cosmic Rhythm, Pop-a-Tic-Tac-Toe).**

- **👾 Comet Muncher fix (`js/40-action.js`).** Arrow keys appeared dead: `_cmAtCenter` used
  `|x-cx| < spd`, but an entity that had just stepped exactly `spd` off-centre reads as still-centred
  (float rounding), so it re-snapped every frame and never left its tile. Threshold is now `0.75·spd`.
- **💊 Virus Lab: Space is now an immediate HARD DROP** (was a one-step soft drop); `ArrowDown` still
  soft-drops. Key legend updated.
- **❄️ Glacier Push: `GLACIER_LEVELS` expanded to an 8-level, 1→4-crate ice-slide progression**, all
  BFS-verified solvable by the ice-slide solver (crates glide until they hit something — `SOKO.slide`).
  Stays sequential, no level-select.
- **🎰 Star Slots: skill-stop ONE REEL AT A TIME.** `SL.stopTimers` is now indexed per-column (was one
  flat array cleared all-at-once); `slStopOne(col)` cancels just that column's auto-stop timer and
  locks it in immediately, leaving the other 4 reels spinning. 5 new `.sl-reel-stop` buttons
  (`#slReelStop0..4`) sit above the grid; `slStop()` remains as a stop-ALL convenience. Also (same day):
  3×5 grid (was 5×5), reworked odds (3+ matching from the left only — the old "any pair" rule was
  removed, so the machine can genuinely lose), bigger jackpots (`SL_JP_CORNER`/`SL_JP_CROSS`), the
  jackpot amount shown live in the HUD, and the bought paylines drawn as translucent SVG polylines
  (`_slDrawLines`) over the grid so the player can see what they bought.
- **🎲 Hoo Hey How: skill-stop ONE DIE AT A TIME (`js/27-hoohey.js`).** Previously one "Stop" button
  jumped straight to the payout. Now each of the 3 dice has its own state (`_hhDieStopped[i]`), its own
  auto-stop fallback timer (`_hhDieTimers[i]`), and its own ⏹ button; `_hhStopDie(i)` locks that die's
  face immediately (writing straight to its `#hhDie{i}` DOM node — no full re-render mid-roll, so the
  other two keep tumbling), and once all 3 are stopped `_hhFinishRoll()` runs the payout (same math as
  before, now reading `_hhFinal`/`_hhBetsSnapshot`/`_hhTotal` instead of a closure). `hhStop()` remains
  as "Stop All" (stops whichever dice aren't stopped yet, one by one).
- **🗼 Sky Stacker: level-select REMOVED — plays sequentially.** `openStacker()` now spends the pass
  itself and starts straight at level 1 (`stkStart(0)`); each `STK_LEVELS[i]` has a `target` floor count
  (6/8/10/12/14) — reach it to advance for FREE to the next (narrower block, faster swing) level;
  missing ends the whole run. `STK.runFloors` tracks the run total for the reward `frac` and the result
  screen. Custom result screen (`_stkGameOver`), not the generic `a2Result`, so `openStacker()` isn't
  double-charged on replay.
- **💣 Blast Bot / 🫧 Bubble Blast: sequential levels, easy → difficult, no selection (`js/40-action.js`).**
  `BB_LEVELS` (4: rising drone count, crate density, drone speed, blast radius) and `BU_LEVELS` (4:
  rising gremlin count/speed, angry gremlins from level 4) — `_bbSetup()`/`_buSetup()` build one level
  from `BB.level`/`BU.level`; clearing (`_bbWin`/`_buWin`) advances for free or, on the last level, ends
  the run via a custom result screen. Losing reports which level was reached.
- **🎯 Pop-a-Tic-Tac-Toe (`js/36-arcade.js`, new).** Tic-tac-toe vs a CPU on the shared arcade shell
  (`agTopBar`/`agShowView`, same pattern as Mini Sudoku). Difficulty picks the CPU: easy = random,
  normal = take-the-win/block-the-loss, hard = full minimax (`_popMinimax`, a 3×3 search is instant) —
  hard is unbeatable. `popStart(diff)` → tap a cell (`popTap`) → CPU replies after a short delay
  (`_popCpuMove`) → `_popResolve` checks all 8 win-lines + draw. Cash-only reward via `wgRecordScore`/
  `wgPayReward`, scaled by difficulty base × a speed bonus (fewer moves = more).
- **🎳 Star Lanes Bowling (`js/40-action.js`, new).** A real 10-frame game. Each throw is set by
  **stopping 3 moving markers yourself** — aim → power → spin, in sequence (`_bowlStop()` advances the
  phase; the RAF loop (`_bowlLoop`) continuously writes the live marker value into `BOWL.angle/power/spin`
  while its phase is current, so stopping just freezes whatever was showing at that instant). Scoring is
  the classic flat-rolls algorithm (`bowlScoreFrames`, pure, unit-tested against a perfect game = 300,
  all gutters = 0, all spares = 150, and a textbook mixed example = 133) with correct 10th-frame bonus
  balls (strike → fresh rack for ball 2; ball-2 strike or a spare → bonus ball 3). Pin knockdown
  (`bowlComputeKnockdown`, pure, injectable RNG for tests) is a radius-around-impact model with one
  domino chain pass — a well-aimed max-power throw CAN clear the rack but isn't guaranteed, and repeated
  dead-centre throws realistically leave the 7-10 corner pins standing. **Every strike pays an immediate
  +100 🪙 Gold bonus** (`BOWL.strikeGold`, on top of the normal end-of-run `a2Reward`). One pass buys the
  whole 10-frame game (`openBowling` does NOT self-charge — entered via the standard `_wondCard`/
  `wonderPlay` pass, unlike Sky Stacker/Astro Drop which have their own level-select).
- **🎵 Cosmic Rhythm (`js/40-action.js`, new).** A 4-lane falling-note rhythm game — press ← ↓ ↑ → (or
  tap the lane buttons) as a note crosses the hit line. `rhyGenChart(diff)` (pure) procedurally builds a
  beatmap at 120 BPM (easy/normal/hard vary song length + note density + chord chance). Judging
  (`rhyHitLane` → `_rhyJudge`) finds the closest un-judged note in that lane: ≤90ms = Perfect, ≤180ms =
  Good, otherwise the tap is ignored (no penalty for an early stray tap); notes that scroll past the
  window without a tap auto-miss and break the combo. Combo scales the per-note score
  (`100/50 + min(combo,20)×5/2`). 1 pass to enter from the lobby; Replay/Difficulty inside the game are
  free (call `rhythmStart`/`openRhythm` directly, not `wonderPlay`) — same pattern as Pop-a-Tic-Tac-Toe.
  Cash-only reward via `wgPayReward`, scaled by final score + a first-high-score bonus.

## Farm — `js/18-farm.js` (`#farmView`)

Crops (apple/orange/rice/wheat/corn/coffee/sugarcane) + animals (chicken/duck/sheep/pig/cow) + houses.
Growth is driven by **`state.solveClock`** (total problems solved; "1 planet" = 9 solves), **not
wall-clock**. `state.farm = { plots, animals, houses }`; `plots` is a fixed-length array (`null` =
empty owned plot) + a derived `plotCount`. Fertilizer → 9-solve crop (else 27); feed → animal grows
9 solves after feeding. **🛒 Go to Market** buys seeds(=plant)/animals/feed/fertilizer/plots/houses.
Pure helpers `cropProgress`/`animalProgress`.

## Laboratory — `js/19-alchemy.js` (`#alchemyView`)

The synthesis room (file/ids keep the internal `alchemy`/`alch-` names): `ALCHEMY_RECIPES` combine
inventory items + monster materials into **Super Medicine** (full HP/MP) and the **Acid Vial** (arms
Corrosion on the next battle — `poison_vial` id kept internally). `canCraft`/`craftRecipe`
(validate-then-spend). Bubbling-cauldron CSS.

## Item Store — `js/20-item-store.js` (`#itemStoreView`)

Sells potion/ether/moon_herb/star_dew (from `ITEMS` in `09-items.js`); a backpack "Use" section.
`buyStoreItem(id, qty)`. Consumables/ingredients live in `state.inventory` (id→count);
`countItem/addItem/spendItem/useItem` in `09-items.js`.
