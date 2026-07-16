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

**Carnival games — `js/34-wonder-games.js`.** Three original, math-flavoured, free-to-play games launch
from the lobby (shared helpers `wgMini`/`wgRecordScore`/`wgPayReward`; `wgStopAll` stops every
carnival timer and is called by all Wonderland nav exits):
- **Bullseye Numbers 🎯** (`openBullseye`) — timed mental-maths dartboard; a question + 4 targets
  (correct-by-construction via `bullGen`), tap or press 1-4, combo scoring, 45s.
- **Gone Fishin' 🎣** (`openFishin`) — numbered fish swim a pond; a rotating rule (`fishGenRule`/
  `fishRuleMatch`: even/odd/multiple/greater/less/exact) says which to catch; spawns biased so matches
  appear; 40s.
- **Merry Math-Go-Round 🎠** (`openCarousel`) — a rotating ring of 6 horses (`mgrGen`, reuses bullGen);
  click the horse answering the centre sum; ring spins by difficulty, horses counter-rotate upright.
All persist a high score in `state.miniGames[id]` and pay **Cash only**, scaled by score+difficulty with
a beat-your-best bonus (rare CPU chip only on top Hard runs) — replayable for score, never a rare-gear
farm. Each has a view-active self-check that stops its timers on navigation. Keyboard + touch; tooltips.

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
  1-pass Shikinjou/紫禁城 tile-push puzzle built on the shared A2 shell (like the Sokoban games). You
  walk a 🐼 around the palace and **push spirit tiles** (`SHIK_TILE` colour map); pushing two identical
  tiles together **cancels both**, pushing into a different tile or a wall is blocked, and you win by
  reaching the 🚪 exit. 5 hand-authored, verified-solvable chambers (`SHIK_LEVELS`, ASCII
  `#`/`@`/`E`/`1-6`/`.`), with **Undo** (JSON snapshot stack), **Restart**, arrow/WASD keys + a button
  pad. Uses `wonderPlay('openShikinjou')` (no self-charging → no double-charge); win pays via `a2Result`.
- **💊 Virus Lab now shows the next two capsules.** Added a look-ahead queue (`VL.queue`, seeded in
  `openVirusLab`, advanced in `_vlSpawn` via `_vlRoll`); `_vlHud` renders a "💊 Next:" preview of the
  upcoming two pills as colour swatches (`_vlPillSwatch`, indexing `VL_COLS`).

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
