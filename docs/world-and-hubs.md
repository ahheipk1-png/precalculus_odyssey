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

- **👾 Comet Muncher fix, take 2 (`js/40-action.js`).** The first fix (a `0.75·spd` distance-to-centre
  threshold) was mathematically sound for the current speeds but fragile — any future speed/tile-size
  combo where a step ≥ the detection window would silently skip a turn. Replaced with a robust,
  speed-agnostic design: `_cmStep` now tracks each entity's tile INDEX (`e.tx/e.ty`, `floor(x/T)`) and
  re-evaluates `want`/`dir` whenever that index changes (a real tile crossing) or every frame while
  stopped (`dir=[0,0]`, e.g. blocked by a wall) — so a freshly-pressed direction is picked up
  immediately. Position is deliberately NOT snapped to the new tile's centre on crossing (that
  happens near the tile's LEADING EDGE, not its centre — snapping there caused a ~13px teleport-
  forward every crossing); it's left exactly where the per-frame `+= dir·spd` step put it. All
  respawn/reset sites (`gh.x=…` on being eaten, `CM.pac.x=…` on a life lost) now also reset
  `tx`/`ty`. Verified via real `keydown` dispatch over sustained holds + rapid direction-mashing with
  no teleports (max single-sample jump = exactly 2 frames' worth of movement) and correct wall-
  stopping/turning throughout.
- **💊 Virus Lab: Space is now an immediate HARD DROP** (was a one-step soft drop); `ArrowDown` still
  soft-drops. Key legend updated.
- **❄️ Glacier Push: PROCEDURALLY GENERATED every session (`js/39-puzzles.js`), not hand-authored.**
  `openGlacier()` calls `_glGenerateLevels()` for a fresh set of 8 ice-slide puzzles each time — a
  non-rectangular region (`_glCarveRegion`: starts as a rectangle, randomly converts interior floor
  cells to wall, keeping only carves that leave the region connected via flood-fill), then crates +
  targets placed via REVERSE CONSTRUCTION (`_glReversePlace`): start crates ON their targets (solved),
  then play `diff.scramble` random valid ice-slide moves BACKWARDS, so a forward solution is
  guaranteed to exist by design — pure random placement was tried first and largely failed (ice-slide
  crates can only ever rest against a backstop; a target dropped in the open interior is almost never
  reachable, confirmed empirically at ~0-22% hit rates depending on crate count). A full BFS solve
  (`_glSolvable`, the same ice-slide push rule as `sokoMove`) is still run as a safety-net check; a
  level that somehow fails falls back to one of the original 8 hand-authored levels (kept as
  `GLACIER_FALLBACK_LEVELS`) so the player is never handed a broken puzzle — verified this path is
  never actually hit in practice. Generation takes ~150-500ms for all 8 levels. Levels use the
  standard Sokoban `*`/`+` combined crate-on-target/player-on-target markers (a crate can scramble
  onto ANY target's cell, not just its own). Verified end-to-end: 120/120 generated levels solved
  correctly through the real `sokoMove` engine (walking to each push position, then pushing). Stays
  sequential, no level-select.
- **🎰 Star Slots: pure skill-stop, no auto-stop, rebalanced odds, capped bet + spins/pass.** Reels
  now spin FOREVER — the old per-column auto-stop timers (`SL.stopTimers`, scheduled at
  700/1050/1400/1750/2100ms in `slSpin()`) are gone entirely; a column only ever locks in when the
  player calls `slStopOne(col)` (one of the 5 `#slReelStop0..4` buttons) or `slStop()` (STOP ALL).
  Odds were too rare at 3+-only (~3%/line), so `_slLineMatch()` now also pays a smaller 2-symbol run:
  `SL_RUN_MULT = { 2: 0.5, 3: 1, 4: 4, 5: 15 }` (the 3/4/5 tiers are unchanged from before — only the
  new 2-tier was added, keeping EV per unit bet ≈ 59% from line wins, not a money-printer). Max total
  bet is capped at `SL_MAX_BET = 1000` (bet-per-line options `10/50/100/200` × line-count `1/3/5` can't
  exceed it — `200 × 5 = 1000` exactly — plus a defensive runtime guard in `slSpin()`). One Wonderland
  Pass now buys `SL_MAX_SPINS = 3` spins (`SL.spinsLeft`, shown in the HUD); once exhausted, `#slSpinBtn`
  disables and `#slPlayAgainRow` appears with a "🔁 Play Again (1 🎟️ · 3 spins)" button that re-invokes
  `wonderPlay('openSlots')` to buy another 3. `_slSettle()` rounds win amounts (`Math.round`) since the
  new 0.5 multiplier can otherwise produce fractional cash.
- **🎲 Hoo Hey How: skill-stop ONE DIE AT A TIME (`js/27-hoohey.js`).** Previously one "Stop" button
  jumped straight to the payout. Now each of the 3 dice has its own state (`_hhDieStopped[i]`) and its
  own ⏹ button; `_hhStopDie(i)` locks that die's face immediately (writing straight to its `#hhDie{i}`
  DOM node — no full re-render mid-roll, so the other two keep tumbling), and once all 3 are stopped
  `_hhFinishRoll()` runs the payout (reading `_hhFinal`/`_hhBetsSnapshot`/`_hhTotal`). `hhStop()`
  remains as "Stop All". (2026-07-16, later same day: the per-die auto-stop fallback timer this
  originally had was removed entirely — see the batch note below, dice now tumble forever until the
  player stops them.)
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
- **🎯 Pop-a-Tic-Tac-Toe (`js/36-arcade.js`) — rebuilt 2026-07-16, was never actually tic-tac-toe.**
  The first version was adversarial tic-tac-toe vs a CPU (even had a minimax AI) — wrong game
  entirely. The real design, matching the redemption cabinet it's named after: bet, then **ROLL** —
  4 balls tumble and settle into 4 of the 9 grid cells (`_popShuffleUnfixed`, an 80ms visual shuffle
  via `a2Every` then a final settle). Tap any settled ball to **FIX** it (`popToggleFix`, gold
  border + 🔒); rolling again only re-randomizes the UNFIXED balls, onto cells none of the OTHER
  balls (fixed or not) occupy. 3 rolls per round, or bank early with **✅ Score Now**
  (`popScoreNow`). The final 4-cell pattern is paid out (`popEvaluate`, pure, priority-ordered):
  **Four Corners** (exact `{0,2,6,8}`) = jackpot ×50; a **2×2 block** (any of the 4) = ×20; a
  **complete tic-tac-toe line** (3 of the 4 cells forming one of the 8 lines) = ×10; **holding the
  centre** = ×2; otherwise nothing. Cash-betting like Star Slots (10/50/100 chips,
  `_wondCard`/`wonderPlay` charges 1 pass to enter, replay is free once in).
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
- **🎵 Cosmic Rhythm (`js/40-action.js`, new).** A 4-lane falling-note rhythm game — press D F J K (or
  tap the lane buttons) as a note crosses the hit line. (2026-07-16, later same day: rebound from the
  original ← ↓ ↑ → to D/F/J/K, the classic 4-key rhythm-game layout; `RHY_KEYS`/`RHY_KEY_LABEL`, matched
  case-insensitively.) `rhyGenChart(diff)` (pure) procedurally builds a
  beatmap at 120 BPM (easy/normal/hard vary song length + note density + chord chance). Judging
  (`rhyHitLane` → `_rhyJudge`) finds the closest un-judged note in that lane: ≤90ms = Perfect, ≤180ms =
  Good, otherwise the tap is ignored (no penalty for an early stray tap); notes that scroll past the
  window without a tap auto-miss and break the combo. Combo scales the per-note score
  (`100/50 + min(combo,20)×5/2`). 1 pass to enter from the lobby; Replay/Difficulty inside the game are
  free (call `rhythmStart`/`openRhythm` directly, not `wonderPlay`) — same pattern as Pop-a-Tic-Tac-Toe.
  Cash-only reward via `wgPayReward`, scaled by final score + a first-high-score bonus.

**2026-07-16 batch #2 — Hoo Hey How pure skill-stop + pass economy, Quantum Block Forge tray
resize/reposition, Virus Lab medicine redesign, Cosmic Rhythm rebind, global Ranking leaderboard.**

- **🎲 Hoo Hey How: removed the per-die auto-stop fallback, added a Wonderland-Pass roll economy
  (`js/27-hoohey.js`).** Dice used to tumble for a fixed ~2.4s then auto-lock (staggered per die) even
  if the player never tapped ⏹ — that fallback (`_hhDieTimers`) is gone; dice now tumble **forever**
  until `hhStopDie(i)`/`hhStop()` is called, pure skill-stop like Star Slots. Entry already cost 1
  Wonderland Pass (`wonderPlay('openHooHey')`), but a pass used to buy *unlimited* rolls — now it buys
  `HH_MAX_ROLLS` (3) (`_hhRollsLeft`, reset in `openHooHey()` on every entry/re-entry); once exhausted
  the Roll button is replaced by a "🔁 Play Again (1 🎟️ · 3 rolls)" button. Total bet across all 6
  symbols is capped at `HH_MAX_BET` (1000), enforced in both `hhBet()` and `hhRoll()`. Added a `+100`
  bet-increment button next to the existing `+10`/`+50` per symbol.
- **🧩 Quantum Block Forge: tray pieces now render at the SAME size as the board, to the board's
  RIGHT (`js/35-block-forge.js`, `css/wonderland.css`).** The tray's `.qbf-mini` cells were a fixed
  14px/12px regardless of the board's actual (much larger, size-dependent) cell size — and a dead
  `@media (max-width:520px)` rule with `!important` forced 12px even harder. Fixed by having
  `qbfRender()` measure the board's real rendered cell width and write it to a `--qbf-cell` CSS custom
  property on `.qbf-wrap`; `.qbf-mini`/`.qbf-piece-used`/tray-piece `grid-template-columns` all read
  that variable, so a tray piece is pixel-identical to the board it's about to be dropped onto. Layout:
  `.qbf-wrap` is `flex-direction:row` (grid left, tray right, `flex-direction:column` on the tray
  itself) above 720px width, falling back to the original stacked (tray below, horizontal row) layout
  under 720px for narrow screens — verified both breakpoints via rendered bounding-rect measurements.
- **💊 Virus Lab: capsules redesigned as glossy medicine pills, viruses as spiky angry germs, not flat
  blocks / a neutral happy-face (`js/40-action.js`).** The canvas `cell()` draw function used one flat
  rounded-rect for every cell, with viruses getting a plain 2-dot-eyes + line-mouth face — visually just
  "simple blocks" either way. Capsules now draw as a stadium/pill shape (`roundRect` with radius = half
  the cell) plus a glossy highlight ellipse; viruses draw as a bumpy 8-point spiked blob with angled
  angry eyebrows + a jagged frown, clearly distinct from the friendly medicine. The HUD's "Next"
  pill-queue swatch (`_vlPillSwatch`) got a matching circular/glossy tweak.
- **🎵 Cosmic Rhythm: rebound to D/F/J/K** (superseded same day — see batch #3 below, now 1/2/9/0).
- **🏆 Ranking — new global leaderboard (`functions/api/cloud/leaderboard.js`,
  `js/17-wonderland.js`).** A "🏆 Ranking" button sits in the Wonderland lobby's pass row
  (`openRanking()`). It calls the new `GET /api/cloud/leaderboard` Cloudflare Pages Function (same
  Bearer-token auth as the rest of `/api/cloud/*`, but — unlike `profiles.js` — reads every non-deleted
  `player_profiles` row, not just the caller's own), which parses each profile's `save_json` (no new D1
  table needed) to build: the **top 20 by `state.level`**, and the **single best score per tracked
  minigame** (`state.miniGames[id].highScore` for `blockForge`/`rhythm`/`fishin`/`memory`/`sudoku`) —
  the ID + display label list lives in `leaderboard.js`'s `GAMES` array. Frontend renders both lists
  (`_rankHtml`) or a friendly message if signed out / the request fails (verified: a fake/invalid
  Bearer token correctly surfaces "Network error — is the game deployed to Cloudflare?" without
  throwing, since this dev environment has no real D1-backed Functions runtime to test against live).

**2026-07-16 batch #3 — new Snake game, Star Slots symbol/jackpot rebalance, Sudoku 9×9 +
sequential, difficulty pickers removed from Block Forge/Cosmic Rhythm/Star Match, Cosmic Rhythm
rebound again (1/2/9/0), level counts on every lobby card.**

- **🐍 Snake (`js/40-action.js`, new).** Classic grid snake in the `a2Shell` canvas style (same
  family as Comet Muncher/Virus Lab), adapted from a reference implementation the user supplied.
  16×16 grid, arrow keys/WASD + an on-screen ◀▲▼▶ pad; grid-based movement on a `SN.tick =
  a2Every(_snStep, tickMs)` timer, never allowed to reverse straight into its own neck (`_snDir`).
  Sequential levels (`SN_LEVELS`, no difficulty picker): each level raises the food target and
  lowers `tickMs` (speed); reaching a level's target advances to a fresh snake for free
  (`_snLevelClear`), hitting a wall or the snake's own tail ends the run (`_snGameOver`) — both
  route through `_snEnd`/`a2Result`/`a2Reward` like its canvas-game siblings, not the Cash-only
  `wg*` reward track. Verified: food-eat growth, level-clear transition (target/tickMs update
  correctly on the next level), wall-collision game over, and reversal-prevention all via direct
  function calls; no console errors.
- **🎰 Star Slots: dropped 2 of 9 symbol types (🚀, 🪐) to raise win frequency, then fixed a
  pre-existing jackpot imbalance the drop would have made much worse (`js/41-slots.js`).** Fewer
  distinct symbols mechanically raises match probability — confirmed by Monte Carlo simulation
  (300k+ spins per run) that per-line win rate rose from the prior rebalance's baseline. But the
  SAME simulation revealed the ORIGINAL `SL_JP_CORNER=250`/`SL_JP_CROSS=1000` jackpot multipliers
  were already a severe money-printer even at 9 symbol types (a naive hand-computed corner-jackpot
  EV alone was ≈181% — a 4-corner match is far more common than a ×250 payout can tolerate), and
  dropping to 7 types made 4-cell/7-cell matches easier still (empirically ≈108-110% combined RTP
  with the old jackpot values immediately after the symbol drop — a real money-printer). Retuned to
  `SL_JP_CORNER=4`, `SL_JP_CROSS=150`, verified by simulation to hold a stable ~88-90% combined RTP
  (line wins + both jackpots) across every bet-per-line/line-count combination — generous (up from
  the prior batch's ~59% line-only baseline), not broken.
- **🔢 Mini Sudoku: generalized from a hardcoded 4×4-only engine to any box size, added real 9×9
  levels, removed the difficulty picker (`js/36-arcade.js`, `css/wonderland.css`).** `sudGenSolution`,
  `sudConflicts`, and the render/tap/tray logic were all hardcoded to N=4/k=2 (16 cells, fixed
  `SUD_BOXES`, `%5` digit-cycle, etc.); rewritten to take `N`/`k` and generalize the base-grid
  formula (`(k*(r%k) + floor(r/k) + c) % N`) plus band/stack shuffling to any box size — verified
  valid (no row/col/box conflicts) across 200 generated 4×4 AND 200 generated 9×9 solutions. Win
  is still validated by the RULES, not a fixed solution (any valid completion counts), so clue
  count needs no uniqueness guarantee. `SUD_LEVELS` (6, no picker): 3 levels of 4×4 (10→8→6 clues)
  as a warm-up, then 3 levels of a REAL 9×9 board (36→30→24 clues) for genuine high-difficulty
  play. `--sud-font` CSS var shrinks the digit size for the 9×9 board so it still fits. Verified
  end-to-end through all 6 levels including the 4×4→9×9 transition and the final "ALL LEVELS
  SOLVED!" screen.
- **Difficulty pickers removed from Quantum Block Forge, Cosmic Rhythm, and Star Match — all three
  now follow the Sky Stacker/Blast Bot sequential-level pattern** (pay 1 pass, always start at
  level 1, advance for free on clearing a level, run ends on failure/song-miss or completing the
  last level; `wonderPlay(...)` again to restart from level 1). `QBF_LEVELS` (5, shrinking board
  9×9→7×7 + rising score goal), `RHY_LEVELS` (5, rising note density/chords; ≥50% accuracy clears
  a level), `MEM_LEVELS` (5, growing grid + shrinking preview time) replace the old
  `easy`/`normal`/`hard` picker screens outright. Each keeps a `totalScore` accumulator across the
  whole run for the final Cash reward, separate from the per-level score that gates advancement.
  All three verified end-to-end (level clear → advance with fresh state, and the failure path)
  with no console errors.
- **🎵 Cosmic Rhythm: rebound again, to 1/2/9/0** (same day the D/F/J/K rebind above shipped) —
  `RHY_KEYS`/`RHY_KEY_LABEL`, matched case-insensitively like before.
- **Every Wonderland lobby card that has discrete levels now states the count** (`js/17-wonderland.js`),
  reading each game's own `*_LEVELS.length` (or `FISH_MAX_LEVEL`) live rather than a hand-typed
  number, so the text can't drift out of sync — e.g. Sudoku's card explicitly calls out "grows from
  a 4×4 warm-up to a full 9×9". Games with no discrete level concept (Hoo Hey How, Star Slots,
  Virus Lab, Circuit Loop, Comet Muncher, Pop-a-Tic-Tac-Toe, Star Lanes Bowling) were left as-is.

**2026-07-16 batch #4 — 💎 Crystal Cascade (new game).**

- **💎 Crystal Cascade (`js/40-action.js`, new).** A falling vertical-triplet match-3 (Puyo-Puyo
  style), adapted from a reference the user supplied. A column of 3 gems falls down a 6×13 board;
  ← → moves it, ↑/X cycles the 3 gems' colour order in place (`piece.colors.unshift(pop())` — a
  recolour, not a spatial rotation), ↓ soft-drops (+1 score/step), Space hard-drops (+2/step).
  Landing locks the triplet into the board, then `_ccResolveChain` cascades: find every gem in a
  3+ run along any of the 4 line directions (row/col/either diagonal) via the codebase's usual
  object-as-set idiom, score `(count×30 + max(0,count-3)×18) × chain × level`, clear, apply
  gravity, and repeat until a round finds nothing — each step paced with `a2Later` (260/90/210ms)
  instead of the reference's native `async`/`await`, to match this file's callback-chain style used
  everywhere else. Unlike Snake/Sudoku/Block Forge/Rhythm/Memory, this is an ENDLESS single run
  with no discrete levels to select or clear — `level = 1 + floor(cleared/40)` climbs automatically
  as more gems clear (speeding up the fall via `_ccFallInterval`), the same continuous-ramp idea as
  Tile Ball, so its lobby card has no level count. Ends when a fresh column can't spawn (top-out);
  reward scales via `a2Result`/`a2Reward` (frac = score/4000, capped at 1) like its Comet
  Muncher/Virus Lab canvas-game siblings, not the Cash-only `wg*` track. Gem art keeps the
  reference's faceted-octagon + radial-gradient + shine-highlight look (canvas `createRadialGradient`)
  rather than flattening to the plain-colour style elsewhere — a small enough per-piece visual
  flourish not to need "chrome simplification" the way Snake's Nokia-phone HTML wrapper did. The
  "Next" preview reuses Virus Lab's inline-colour-dot-in-the-HUD pattern instead of a second canvas.
  Verified: move/cycle, a real 3-match → score/clear/gravity/respawn end-to-end, and the
  still-off-screen-lock game-over path, all via direct function calls with no console errors.

**2026-07-16 batch #5 — every non-gambling game gets a free welcome screen with its own top-10
leaderboard; Tile Ball/Astro Drop/Gone Fishin' lose their last remaining pickers.**

- **`gameWelcome(gameId, icon, title, desc, playFn)` — new shared helper (`js/17-wonderland.js`).**
  The single entry point every non-gambling Wonderland game now opens into: icon/title/description,
  a "Your best" chip (`wgMini(gameId).highScore`), that game's own **top 10** leaderboard fetched
  live from `/api/cloud/leaderboard`, and one "▶ Play!" button. Opening the screen is FREE — no
  Wonderland Pass is spent just to look. The Play button is the only thing that charges, via
  `wonderPlay(playFn)`, where `playFn` is a small internal "just start the run" function (e.g.
  `_qbfStartRun`, `_tbStartRun`) — never the same name as the public `openX()` opener, to keep the
  free-view/paid-play split unambiguous. `_gwLoadBoard` handles the fetch, rendering "sign in to see
  the leaderboard" or "network error" gracefully if the request fails (verified both paths).
- **Backend: `/api/cloud/leaderboard` now returns `byGameTop10[gameId]` (up to 10 entries), not a
  single best (`functions/api/cloud/leaderboard.js`).** `GAMES` grew from 5 to 19 entries — every
  non-gambling game now has an id (`tileBall`, `skyStacker`, `astroDrop`, `snake`, `crystal`,
  `cargo`, `glacier`, `shikinjou`, `virusLab`, `circuit`, `comet`, `blastBot`, `bubble`, `bowling`,
  plus the original 5). `wgMini`/`wgRecordScore` (`34-wonder-games.js`) gained a `bestLevel` field,
  snapshotted alongside `highScore` whenever a new high lands, so the leaderboard can show "Lv X ·
  score Y" per row without a separate per-game field. The existing 🏆 Ranking screen's "Top Minigame
  Scores" section now reads `byGameTop10[id][0]` instead of the old single-best shape.
- **`_wondCard(icon, name, desc, launcher, gambling)` gained a 5th param.** Default (`gambling`
  omitted/false) now renders "View / Play" calling `launcher()` directly — free navigation to that
  game's welcome screen. Passing `gambling: true` (Star Slots, Pop-a-Tic-Tac-Toe only — entering
  those two games directly costs a pass, there's no separate "browse first" step) keeps the old
  `wonderPlay(launcher)` direct-charge behavior. Hoo Hey How's card is hand-written, not through
  `_wondCard`, and was left untouched (same direct-charge reasoning).
- **`a2Result(title, headline, detailHtml, frac, replayName)` (`39-puzzles.js`) changed its Play
  Again button from `wonderPlay(replayName)` to `replayName()` directly** — every a2Result caller's
  `replayName` is now that game's free welcome-screen opener, so replaying always shows the updated
  leaderboard first rather than silently re-charging a pass. This is a hard precondition: EVERY
  a2Result-using game had to gain a welcome screen in the same batch (Comet Muncher, Virus Lab,
  Circuit Loop, Blast Bot, Bubble Blast, Cargo Bay, Glacier Push, Forbidden City, Snake, Crystal
  Cascade, Astro Drop) — otherwise replays for whichever games hadn't been converted yet would have
  become accidentally free. Verified: all of the above render error-free and none double-charge.
- **Tile Ball's locked level-select grid (`wondTileLevelSelectHtml`) is GONE — the persistent
  `unlockedCount`/per-level-pass-charge system it drove is retired** (the field stays in
  `state.miniGames.tileBall` for old saves but is no longer read). `wondOpenTileLevels()` is now the
  welcome screen; `_tbStartRun()`/`_tbGoToLevel(idx)` replace `startTileBall(idx)` — a run always
  starts at level 1 and free-advances through `WOND_LEVELS` (clearing no longer re-charges a pass;
  only the welcome screen's Play button does). `WOND.runScore` accumulates across the whole run for
  the final `wgRecordScore('tileBall', …)` call. Verified end-to-end: free view → paid start → 2
  free level-advances → reaching the last level → `wgRecordScore` firing with the correct total.
- **Astro Drop's level-select grid is GONE.** Its 5 "levels" were never a clear/advance ladder —
  just 5 different starting-speed presets for one endless Tetris-style run (speed already climbs
  every 10 lines regardless of preset). Every run now starts at the easiest preset (`AD_LEVELS[0]`)
  — the built-in ramp supplies the rising difficulty, the same endless-run shape as Crystal Cascade.
  `adStart()` dropped its `levelIdx` param and self-charge; `_adGameOver` now also calls
  `wgRecordScore('astroDrop', AD.score, AD.level)`.
- **Gone Fishin's easy/normal/hard picker is GONE.** The difficulty tier is now DERIVED from the
  level number (`fishDiffForLevel`: levels 1-2 easy, 3 normal, 4-5 hard) instead of chosen upfront —
  `fishLevelConf`/`fishGenRule` take the level, not a separate diff string. `fishReward`'s Cash rate
  and `wgRecordScore('fishin', score, level)`'s third arg both moved from a difficulty string to the
  level number, fixing a pre-existing type inconsistency in `wgRecordScore` callers.
- **Sky Stacker also gained a welcome screen** (`openStacker` was the one already-sequential game
  still self-charging with no browse-first step) — `_stkStartRun()` now does what `openStacker` used
  to, and `_stkGameOver` records `wgRecordScore('skyStacker', runFloors × 20, levelIdx + 1)`.
- **Cargo Bay / Glacier Push / Forbidden City (shared/parallel Sokoban-style engines) had no fail
  state and no persisted score before this batch** — clearing every level was the only way a run
  ever ended. Added `SOKO.totalMoves`/`SHIK.totalMoves` (cumulative across all levels in the run) and
  a `wgRecordScore(gameId, max(100, 3000 − totalMoves×10), levelCount)` call right before the
  "ALL LEVELS CLEAR" `a2Result`, so fewer total moves = a higher leaderboard score for the same full
  clear. `SOKO` gained a `gameId` field (`'cargo'`/`'glacier'`) since both games share one engine.
- **Virus Lab / Circuit Loop / Comet Muncher / Blast Bot / Bubble Blast / Star Lanes Bowling** each
  gained a `wgRecordScore` call at their existing win/game-over point(s) — none had persisted a
  score before. Scores are synthesized from each game's own natural metrics (Virus Lab: viruses
  zapped ×100; Circuit Loop: `max(100, 1000 − moves×10)`; Comet Muncher: stars eaten ×10; Blast
  Bot/Bubble Blast: `level×200 + kills-or-pops×20`; Bowling: the real 0-300 bowling score, already
  computed by `bowlScoreFrames`). Bowling's result screen also picked up a `</b> / 300` fix for a
  pre-existing malformed-HTML typo (`<\b> \ 300`) spotted while editing the same lines.
- Every conversion verified via direct function calls in-browser: free-view (pass count unchanged),
  `wonderPlay(startFn)` charging exactly 1 pass, and a full sweep of all 19 non-gambling entry
  points opening with zero console errors.

**2026-07-16 batch #6 — movement fairness, per-canvas square cells, drag-ghost sizing, one exit
button, admin-dashboard diagnosis:**
- **Comet Muncher: UFOs frozen at spawn until the player's first move** (`CM.waiting`, cleared by a
  new `_cmWant(dx,dy)` used by both the arrow keys and the D-pad buttons) — `_cmLoop` skips the ghost
  `_cmStep` calls while waiting; the HUD shows a "▶ Move to start!" chip until then. Also converted
  to **5 sequential levels** (`CM_LEVELS`: 3→5 UFOs, rising per-ghost speed multiplier via
  `CM_GHOST_BASE_SPD`); the maze itself is reused every level (only UFO count/speed changes), same
  pattern as Snake's fixed-grid/rising-tick levels. `_cmLevelClear()` advances for free or ends the
  run on the last level; `CM.totalEaten` accumulates the `wgRecordScore` metric across levels.
- **Bubble Blast: gremlins frozen at spawn until the player's first move** (`BU.waiting`, cleared by
  a new `_buWake()` called from `_buJump`/`_buShoot`/the left-right pointerdown handlers) — mirrors
  the Comet Muncher fix; Bubble Blast already had sequential levels from an earlier batch, so only
  the freeze was new here.
- **Snake: obstacle walls that scale with level** (`SN_WALL_POOL`, a fixed hand-placed pool kept
  clear of the spawn row so a level's layout is always fair; `SN_LEVELS[i].walls` slices more of the
  same pool per level: 0/6/10/14/20). `_snIsWall(x,y)` is checked both by `_snStep`'s collision
  (`hitObstacle`) and `_snPlaceFood` (food never spawns on a wall); `_snDraw` renders them as grey
  blocks.
- **Fixed a real CSS bug making every `.a2-canvas` game board render as a squashed rectangle, not
  square cells** (Crystal Cascade, Comet Muncher, Snake, Blast Bot, Bubble Blast, Bowling, Rhythm,
  Virus Lab, Astro Drop, Sky Stacker). The old rule set `width:100%` (a hard value, driven by the
  container) AND `max-height:68vh` (a hard, INDEPENDENT cap) at the same time — the browser would
  stretch width to fill the container, derive height from that width via the canvas's intrinsic
  ratio, then clamp that height down to fit `max-height` WITHOUT shrinking width back to match,
  visibly squashing tall boards (worst on Crystal Cascade's 240×520 portrait canvas). Fix: every
  `.a2-canvas` now sets `--cw`/`--ch` inline (its real pixel width/height) and the CSS computes
  `width: min(100%, 560px, 68vh * (--cw/--ch))` + `aspect-ratio: var(--ar)` — converting the height
  cap into an equivalent width cap via the ratio, so whichever constraint binds, the box always keeps
  the board's true aspect ratio. Verified via `getBoundingClientRect()`: Crystal Cascade's cells are
  exactly square at both mobile and 1280px-desktop widths.
- **Fixed Block Forge's and Mini Sudoku's drag-and-drop ghost rendering much smaller than the piece
  it was dragged from.** Both bugs had the same two causes: (1) the ghost used a hardcoded pixel size
  (Block Forge: `18px` grid tracks; Sudoku: a fixed `54px` box) instead of the real, measured cell
  size, and (2) even after switching to the same `var(--qbf-cell)`/`--sud-cell` custom property the
  tray/grid uses, the property was only set on the tray's own wrapper — but `a2DragStart` (shared
  drag helper, `39-puzzles.js`) appends its ghost `<div>` straight to `document.body` (so it's never
  clipped by a scrolling tray), which sits OUTSIDE that wrapper's subtree and so never inherited the
  property. Fix: both games now also set their `--*-cell` custom property on `document.documentElement`
  (not just the local wrapper), which the body-appended ghost does inherit. Verified: the ghost now
  renders at exactly `1.08×` the real cell size (the `.a2-drag-ghost` class's own intentional
  pick-up-lift `scale(1.08)`), for both a 63px Block Forge cell and a 118px Sudoku cell.
- **Every Wonderland game's active-play top bar is now the same `agTopBar()` — same "← Back" label,
  same position.** Block Forge, Gone Fishin', and Tile Ball each had their own hardcoded
  `.wond-game-top` div with a "✕ Quit" button instead of using the shared helper every other game
  already used; converted all three to `agTopBar(title, backCall)` calls. (Result/end screens were
  already uniformly "← Lobby" — no change needed there.)
- **Admin dashboard**: investigated a report that a player's page showed account info (password,
  location, last-seen) but not their level/arena/mini-game progress, despite them having played
  recently. `authPushProgress`/`authStartProgressSync` (`cloud-auth.js`) and the backend
  (`/api/auth/progress`, `/api/admin/player`) all read correctly in source. The most likely cause:
  `progress_json`/`progress_at` were added to `cloud_accounts` by migration 0006, applied via the
  idempotent `/api/admin/bootstrap` endpoint — if that endpoint hasn't been re-run since the columns
  were added to this deployment, every progress push silently 500s (swallowed client-side) and
  `/api/admin/player`'s progress `SELECT` silently no-ops (it's wrapped in its own try/catch
  specifically for this scenario, per its own comment). Not fixed in code — re-running
  `/api/admin/bootstrap?key=<SEED_KEY or the baked default>` once is the fix, and it also resets the
  `admin`/`admin` seed account's password, so it needs the site owner's go-ahead before running.

**2026-07-16 batch #7 — multiplicative gear economy, superscript fix, All-Chips modal, boss-gate
click, admin monster unlock, housekeeping:**
- **Gear economy → multiplicative upgrades + combat rescale.** Full write-up in
  [rpg-combat-economy.md](rpg-combat-economy.md) (2026-07-16 section). Upgrades now ×2/×3/×5 via
  `UPGRADE_MULT`, tiers ≈2.5× apart, one `effectiveGearStat` helper for all four gear families (fixes
  the armor display/combat mismatch), monster stats retuned (fixes a late-boss softlock). Verified by
  in-browser combat simulation across arenas 3–65.
- **"All Chips" HUD tile + 🔍 view modal.** `updateCurrencyBar` (`05-render.js`) relabels the chip
  tile "All Chips" and adds a `🔍 view` button → `viewChips()` — a sky-blue overlay listing all 7
  AI-chip types (icon · name · count) from `CHIP_ORDER`/`CHIPS`, so the player can break down the
  rollup total. `closeViewChips()` dismisses it; CSS `.chipv-*` in `styles.css`, `.cur-chip-view` in
  `systems.css`.
- **Exponent `2^?` now renders as a superscript.** The `mathPretty` superscript regex
  (`04-logic.js`) only matched `^<digit/letter>`; it now also accepts `^?` and the Unicode minus
  (`10^−4`), so "2⁸ ÷ 2² = 2^?" reads correctly (like `$2^{?}$`). Display-only — never affects answer
  checking — and covers every laws-of-indices generator + MC choices + hints in one place.
- **Boss Gate button now works from any screen.** `showGateScreen` revealed `#levelGateActions`
  which lives inside `#equationView`; clicking the header button off the practice screen toggled
  panels inside a `display:none` view. It now activates the equation view first, then scrolls the
  boss-choice into view (it renders below the fold). See gameplay.md.
- **Admin/test account: all monsters unlocked + re-fightable.** `getMonsterLockReason` returns `''`
  and new `isMonsterDefeated` returns `false` when `state.testMode` — non-persistent, re-derived each
  session, always off for real players.
- **Forbidden City** HUD tile icon 🎴 (read as mahjong) → 🧩.
- **Housekeeping:** removed the phantom `MATH_WORLDS` global (the tagline + Star-Atlas topic labels
  now read `chapters` from `worlds.config.js`, restoring both features + fixing a broken `</span>`);
  deleted verified-dead functions (`_isPrime`, `_hcf`, `formatBracket`, `formatFormulaSide` in
  `04-logic.js`; the 82-line dead `renderMonsterChoicesLegacy` in `06-rpg-battle.js`;
  `materialsSummary` in `09-items.js`; `arenasForWorld` in `curriculum.config.js`); refreshed stale
  docs (README/CONFIG_GUIDE 133/187 → 65). NOTE: the 18 NUL bytes in `04-logic.js` are **intentional**
  token delimiters in the math-tokenizer (`\x00SQ0\x00`), NOT corruption — left untouched.

**2026-07-16 batch #8 — the three tile-puzzle games are now SOLVER-BACKED PROCEDURAL generators
(`js/39-puzzles.js`), ported from a reference the user supplied.** All three generate fresh, harder-
and-harder levels every run, each proven solvable before it ships, and generate LAZILY (one level at
a time as the player advances — masked by the inter-level toast — so there's never a run-start freeze).
- **Shared Sokoban core (Cargo Bay + Glacier Push).** `_skGenerateOne(diff, slide, fallback)` reverse-
  constructs from the SOLVED state: crates start on the goals, then a random legal scramble runs
  BACKWARDS (guaranteeing a forward solution exists). `slide=false` = classic one-cell PUSH (Cargo,
  `_skReversePull` — pulls crates back and RECORDS the forward solution, which `_skReplayPush` then
  replays to PROVE the exact level solvable — the same "replay the supplied solution" guarantee as the
  reference; a forward BFS would false-negative on the long 6-crate solutions). `slide=true` = ice
  GLIDE (Glacier, existing `_glReversePlace`, still BFS-verified by `_glSolvable` since multi-crate ice
  isn't guaranteed solvable by construction). The BFS solver was switched from `q.shift()` (O(n) → the
  whole search O(states²), which froze the harder profiles) to `q.pop()` (DFS, O(1) dequeue — we only
  need to know IF it's solvable), with a low state CAP so bad candidates bail fast. `CARGO_DIFFS`
  (10 tiers, 2→6 crates, deep pull-scrambles) and `GLACIER_DIFFS` (10 tiers, ≤3-crate ice) drive the
  ramp; the SOKO engine gained `diffs`/`fallbacks`/`total` + `_skEnsureLevel(idx)` for lazy generation.
- **Forbidden City (Shikinjou) — RULE FIXED + procedural chamber-gate generator.** The move core
  `_shikStep` now matches authentic Shikinjou / the reference: **zero-distance pushes are illegal** (a
  tile must slide ≥1 open cell — you can't cancel two *touching* tiles by nudging), and the **exit is
  ordinary floor** (tiles slide over it), not a stopper. `_shikGenerateOne` reverse-constructs a chain
  of chambers separated by 1-cell gates (exit leftmost, panda rightmost); each divider gets one
  MANDATORY matching pair placed by reversing a known solution, so every gate is a real constraint and
  a solution is guaranteed — then the recorded solution is REPLAYED through `_shikStep` to prove the
  level before shipping. `SHIK_DIFFS` ramps barriers 1→6 (board width 3·barriers+4, up to 22 cols, drawn
  with **responsive cell + gap sizing** so wide boards fit the viewport); `SHIK_TILE` expanded to 13
  types so every pair/decoy is unique. `SHIK_LEVELS` (the old hand-authored levels) is kept only as the
  fallback. Verified: all 10 tiers generate in ≤1ms, 0 fallbacks, every level replay-proven solvable.

**2026-07-16 batch #9 — the three tile-puzzles made HARDER, plus a latent Glacier solvability bug
fixed.** The player found all three "too easy" and asked for more walls/pillars (Cargo, Glacier) and
same-colour decoy tiles at the gates (Forbidden City).
- **Wall density is now a first-class difficulty lever.** `_glCarveRegion(W, H, carves, minFloorFrac)`
  gained the `minFloorFrac` arg — how much interior floor must survive a carve. **Push (Cargo)** passes
  a low frac (0.46) so dense pillar mazes are allowed; **ice (Glacier)** passes a high frac (0.60)
  because sliding crates need open lanes to reach a backstop (a dense ice board is usually unsolvable
  AND makes the verifying BFS crawl). `CARGO_DIFFS` carves ramp 2→20 (L9 ≈ 58 walls / 6 crates);
  `GLACIER_DIFFS` carves ramp 2→7 with deeper scrambles, **crates held at max 3** (4-crate ice blows the
  BFS up — proven by simulation).
- **Glacier reverse-construction bug FIXED (`_glReversePlace`).** It chose the forward push-direction
  `d` at RANDOM, but a forward push only glides a crate back onto its origin/target if there is a
  BACKSTOP (wall or crate) immediately beyond that origin in direction `d`. A random `d` almost never
  aligns with a backstop, so ~95% of ice constructions were genuinely UNsolvable and got rejected by
  `_glSolvable` — the shipped game had been silently serving the static fallback level for most harder
  Glacier levels. Now `d` is chosen ONLY from directions with a real backstop; per-attempt success
  jumped from ~2-5% to ~40-67%, so `_skGenerateOne` reliably returns a fresh procedural level (fallback
  probability ≈ 0.08%). The slide BFS `CAP` was retuned to 10 000 (measured: a solvable ice level is
  confirmed in ≤ ~3.3k states, so 10k confirms every good level yet lets a genuinely-unsolvable
  candidate bail ~6× sooner than a huge cap). `_skGenerateOne` retry budget: 60 for push (cheap,
  replay-proven), 14 for ice (BFS-verified, each attempt costs real time).
- **Forbidden City same-colour decoys (`_shikConstruct(board, decoys, mirrors)`).** `SHIK_DIFFS` gained
  a `mirrors` field (ramp 0→5). Mirror tiles reuse a real gate pair's colour and are placed ONLY in
  non-gate rows (so they can never sit in a gate tile's horizontal slide path and corrupt it); any
  placement that blocks the panda's walk is caught by the existing `_shikReplay` proof and retried
  (attempt budget 25→40). The player now sees several identical tiles and must push the RIGHT one to
  open the path to the door, exactly as requested. Unique-colour decoys (`decoys`) still fill remaining
  cells. Verified by simulation: all 10 tiers 0 fallbacks / ≤3ms, mirrors appear 0→5 as configured,
  every level still replay-proven solvable.
- **Verification (all via the real generators, in-browser).** Cargo: 0 fallbacks, ≤24ms/level. Glacier:
  0 fallbacks, every returned level independently BFS-confirmed solvable, ~90-370ms real per level.
  Forbidden City: 0 fallbacks, ≤3ms/level. No console errors; render path (`_glToRows`/`_skParse`/
  `_skGridHtml`/`_shikToRows`) unchanged.

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
