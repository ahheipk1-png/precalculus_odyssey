# ⚖️ Balance Design — stats, gear, monsters & combat formulas

← [docs orchestra](README.md) · implemented in: `config/economy.config.js` (the `BAL` block),
`js/06-gear-shop.js` + siblings (06b/06c/06d/06e), `js/26-spells.js`, `js/05-render.js`

This is the **single source of truth for the 2026-07-17 combat/economy rebalance** — the design
was derived from a real playtest (see `playtest-methodology.md` + the dated entries in
`rpg-combat-economy.md`) plus classical-RPG balancing rules. **Change numbers here first, then
mirror them into the config** — never tune code constants without updating this doc.

## Why (the five measured problems this fixes)

1. **Flat-subtraction damage** (`max(1, AP−DEF)`) made difficulty binary: one DEF point above your
   AP → 70-hit "impossible" fight; one cheap purchase → trivial. Walls at every gear-tier boundary.
2. **The economy finished at ~arena 20 of 65**: boss Cash grew linearly (cumulative ≈ quadratic)
   while the gear ladder capped at 10k — everything maxed by arena ~20, then 45 arenas of one-shot
   trivia.
3. **Math income never scaled** (5–15 Cash at arena 1 *and* 65) — the educational activity became
   economically worthless next to combat.
4. **Flat 100 XP/kill + one-time monster kills** → hero level ~√(kills) → the boss-gate
   requirement (`ceil(r/2)+2`) became unreachable around arena 40–45 (soft-lock).
5. **Dead stats**: weapon `crit` was authored but never read; shoe SPD was cosmetic.

## Design principles (industry-standard, adapted)

- **Battle-length first**: pick how many hits a fight should take, derive stats backward.
- **Ratio damage** `C·AP·AP/(AP+DP)` (Pokémon/LoL-family): smooth, scale-free, no walls.
- **Endpoint-pinned curves**: designer tables with checkpoints + linear interpolation — the
  arena-65 numbers are *chosen*, not emergent.
- **Enemy damage coefficient** `C = 0.75`: monsters get impressive stats but deal controlled damage.
- **Constant time-to-upgrade**: each gear tier costs ≈ a similar stretch of on-level play.
- Kept deliberately: the ×2.5 gear tiers and ×2/×3/×5 upgrade multipliers (the game's identity —
  safe under ratio damage), the Wu Xing element multipliers (1.6/1.15/1.0/0.66), hero level-up
  grants (+20 HP/+10 MP/+2 AP/+1 DP, +1 SPD per 2 levels).

## The formulas

```
Player hit:    dmg = max(1, round( AP² / (AP + monsterDEF) × element ))
Monster hit:   eff = ATK × statusFactor
               dmg = max(1, round( 0.75 × eff² / (eff + playerDP) × element × incomingFactor ))
Dodge:         chance% = clamp( 5 + (defenderSPD − attackerSPD) × 0.8, 2, 25 )
               (rolled BEFORE damage; a dodge deals nothing — no floor-1)
Power hit:     rolled after a non-dodge. Player chance = equipped weapon's crit stat (5–24%).
               Monster chance = 4 + 2×rank %. Damage × 1.5.
Spell cast:    70% full effect · 20% weak (×0.5 effect) · 10% fizzle (MP spent, no effect)
Boss heal:     amount = 20% of maxHp · cost = max(20, 35% of maxMp)  → ≈2 heals per fight, any arena
Kill XP:       (20 + 8×arena) × rank      (rank 1/2/3)
Problem Cash:  rating × (3 + ceil(arena/2))     (rating 1–3 from solve speed)
Problem XP:    unchanged (10/20/30 by rating)
Monster SPD:   round(2 + 0.6×arena)
```

## The power curve (everything derives from this one table)

`AP*(r)` = expected on-curve total player AP at arena r (weapon on schedule, ~+1 upgraded, + hero
bonus). Piecewise-linear between checkpoints:

```
[1,12] [5,30] [10,70] [15,115] [20,175] [25,265] [30,400]
[35,600] [40,950] [45,1400] [50,1950] [55,2600] [60,3700] [65,5200]
```

Boss stats: **HP = 6×AP*** · **DEF = AP*/3** · **Cash = 40 + 3×AP*** · **MP = rankMp + 2×arena** ·
**ATK** from its own solved table (targets ~12-hit player survival):

```
[1,24] [5,38] [10,57] [15,75] [20,95] [25,118] [30,145]
[35,177] [40,219] [45,266] [50,316] [55,370] [60,444] [65,530]
```

Rank multipliers: **Easy** hp .18 / atk .55 / def .50 / cash .15 · **Elite** hp .45 / atk .80 /
def .80 / cash .50 · **Boss** 1 / 1 / 1 / 1. `requiredHeroLvl = ceil(arena/2) + rank − 1` (kept).

### Boss checkpoint table

| Arena | HP | ATK | DEF | Cash | On-curve weapon |
|---:|---:|---:|---:|---:|---|
| 1 | 72 | 24 | 4 | 76 | bronze_dagger (60) |
| 5 | 180 | 38 | 10 | 130 | iron_broadsword (220) |
| 10 | 420 | 57 | 23 | 250 | legendary (700) |
| 15 | 690 | 75 | 38 | 385 | archive (1,600) |
| 20 | 1,050 | 95 | 58 | 565 | archive +1/+2 |
| 25 | 1,590 | 118 | 88 | 835 | stellar (3,200) |
| 30 | 2,400 | 145 | 133 | 1,240 | stellar +1/+2 |
| 35 | 3,600 | 177 | 200 | 1,840 | rift (6,000) |
| 40 | 5,700 | 219 | 317 | 2,890 | rift +1/+2 |
| 45 | 8,400 | 266 | 467 | 4,240 | rift +2 / odyssey soon |
| 50 | 11,700 | 316 | 650 | 5,890 | odyssey (10,000) |
| 55 | 15,600 | 370 | 867 | 7,840 | odyssey +1/+2 |
| 60 | 22,200 | 444 | 1,233 | 11,140 | odyssey +2/+3 |
| 65 | 31,200 | 530 | 1,733 | 15,640 | odyssey +3 (maxed) |

## Content inventory

- **65 arenas** / 11 star systems · **195 monster encounters** (65×3; 30 identities cycled with
  era names) · ~650 math problems minimum per run · 21+ Wonderland minigames.
- **Swords (9)**: wood 2/free · bronze 8/60 · iron 20/220 · legendary 30/700 (×2 element variants)
  · archive 75/1,600 · stellar 188/3,200 · rift 470/6,000 · **odyssey 1,175/10,000 (Infinity
  Vector — added 2026-07-17, see below)**.
- **Shields (11)**: leather 0/free · wood 2/30 · iron 5/80 · aegis 11/180 · crystal 25/380 ·
  legendary 35/600 (×2 element variants) · archive 90/1,400 · stellar 225/2,800 · rift 560/5,200 ·
  odyssey 1,400/8,000 (2026-07-17: legendary bumped 8→35 — it used to be *worse* than the
  380-Cash crystal_shield; now the ladder is monotonic and keeps the ~2.5x-per-tier spacing).
- **Armor (7)**: cloth 0/free · 5 DEF+30 HP/650 (×2 element variants) · 13+60/1,500 ·
  32+120/3,000 · 80+240/5,600 · 200+480/8,500.
- **Shoes (7)**: basic 2/free · 8/500 · 14/1,200 (×2 element variants) · 22/2,400 · 34/4,400 ·
  52/7,000 — **SPD now drives dodge**, shoes are real combat gear.
- **2026-07-17 fix — the odyssey tier didn't exist**: every gear table (`WEAPON_POWER`,
  `SHIELD_DEF`, `ARMOR_DEF`, `SHOE_SPEED`) priced an `odyssey` rarity, but zero items in
  `gear.config.js` actually used it — the stated endgame tier was unpurchasable in every category,
  and the "maxed everything at arena 65" feel-target was unreachable. `GEAR_RARITY.odyssey` is
  labeled "unique story weapon" (singular), so one capstone item was added per category rather
  than a five-element set: **Infinity Vector** (sword), **Eternity Bastion** (shield),
  **Singularity Plate** (armor), **Quantum Striders** (shoes).
- **Upgrades**: every item ×2/×3/×5 at +1/+2/+3, costing 25/50/100% of item price + chips.
- **7 chip types** and **all existing spells** unchanged (spells gain the reliability roll).

## Feel targets (the design's acceptance criteria)

1. Arena 1, zero purchases → close **loss** with visible progress ("slightly not enough" — nudges
   the player to the shop/Wonderland without a hard wall).
2. Arena 1 after the 90-Cash bronze+wood_shield combo → **narrow win**.
3. Every arena 1→65 with on-schedule gear: boss dies in **~6–12 hits**, kills you in **~10–14** —
   no floor-damage walls, no one-shots, anywhere.
4. Maxed everything at arena 65 → still a **~7-hit** boss fight.
5. Hero level tracks ≈ arena·0.6+ so the boss-gate requirement is always met by normal play.

## Combat outcome animations

| Outcome | Visual |
|---|---|
| Dodge | "💨 MISS!" floating text + defender side-step keyframe + journal line |
| Power hit | "💥 POWER HIT!" bigger floating text + stronger impact + journal line |
| Normal hit | existing hit effects (unchanged) |
| Weak spell | "✨ fizzles — only partly works!" journal + floating text |
| Failed spell | "💨 the spell fizzles out!" (MP still spent) |

## 2-Boss / 3-Boss Gauntlets (2026-07-17)

Every arena's monster-select screen keeps its Easy card as a single low-stakes fight, but the
other two cards are chained, no-retreat gauntlets (user request: "make the 3rd monster room not
easily beatable so the player needs to go to Arena Infinity"):

- **2-Boss Gauntlet** (middle card): 2 brand-new named sub-bosses per room (`gauntletCatalog` in
  `06b-monster-roster.js`, era-cycled across all 65 arenas the same way the base 30-monster roster is),
  fought back-to-back. (**2026-07-18 update:** the original "Escape hidden for the whole chain"
  no-retreat rule was replaced — Escape is now always available but a **speed-based gamble**
  (`attemptEscape`); a failed flee costs a free enemy hit. `activeCombat.gauntletLocked` still
  drives the chain/queue logic and the "escaping mid-chain is a gamble" note, it just no longer
  hides the button. See rpg-combat-economy.md's 2026-07-18 entry.)
- **3-Boss Gauntlet** (right card): the SAME 2 sub-bosses, then the arena's real Boss as the
  finale — so the existing arena-advance gate, trophy, and Star Log lore-fragment logic (all keyed
  off `rank>=3` / `getRoomBoss`) are completely untouched; sub-bosses use `rank:2` so they never
  trigger that branch themselves.
- **Sub-boss stats are DELIBERATELY full Boss-tier** (`BAL.GAUNTLET_SUB_MULT` = 1.0/1.0/1.0/1.0,
  economy.config.js) — not a nerfed Elite. Chaining 2-3 full Boss-tier fights with no heal is
  intentionally NOT reliably winnable at just-met on-schedule gear/hero-level; the design leans on
  Arena Infinity (the only REPEATABLE combat-XP source, since regular monster kills are one-time)
  as the intended path to over-level enough to clear it.
- **Elevated hero-level gate on top of the normal boss gate** (`cardLockReason`'s `bonus` param):
  2-Boss = members' own requirement +2, 3-Boss = +5. This means reaching the arena's normal boss
  gate is NOT enough to even attempt the 3-Boss card — a deliberate extra barrier, not just harder
  combat math. The locked-card message explicitly points at Arena Infinity.
- **Death/escape mid-chain (UPDATED 2026-07-18 — the gauntlet is now ATOMIC).** The original design
  (below) committed each kill immediately so death resumed from a checkpoint. That was **replaced**:
  gauntlet kills now BANK their rewards/defeated-marks on `activeCombat` and commit only when the
  whole chain is cleared, so escaping OR dying mid-chain forfeits everything and re-entry restarts
  from the first monster (user request: "escape on the 2nd monster → next time start from the 1st";
  also closes a kill-one→escape→repeat farm). See rpg-combat-economy.md's 2026-07-18 "gauntlets are
  now ATOMIC" entry. ~~(original: each kill marked `state.defeatedMonsters` immediately, so
  `startGauntletCard` resumed from the first not-yet-defeated member — dying on link 2 of 3 kept
  link 1's kill.)~~
- **Verified**: live-fought both gauntlets in the real UI at arena 4. Minimum-gate hero level +
  bare on-schedule gear (iron_broadsword, no upgrades) → 2-Boss cost ~46% HP, 3-Boss cost ~60%+ HP
  (real risk of death on a bad-luck run, as intended). A generously over-invested loadout (maxed
  legendary weapon+shield) cleared the 3-Boss chain trivially (4 HP lost) — confirms it rewards
  real investment rather than being a flat wall. No console errors; card layout uses
  `grid-template-columns: 0.75fr 1.35fr 1.9fr` (narrow Easy / medium 2-Boss / wide 3-Boss, so the
  widest card has room for 3 monster portraits).
- **Follow-up**: the exact "+2 / +5" hero-level bonus and full-Boss-tier sub-stats are a first pass
  based on formula simulation + one live arena's fights, not a full r=1..65 live playthrough —
  revisit if real play shows it's either a brick wall even with heavy Arena Infinity grinding, or
  still too easy.

## Galaxy Center & the Giant Black Hole (2026-07-18 — hidden endgame)

Three linked additions (user request):
- **Combat nav-lock**: during an active fight (`#combatArenaScreen`) the top `.header-actions` nav
  is hidden (`setNavLockForCombat`), so the speed-gated Escape is the only exit — you can't bail to
  Earth/Practice mid-fight. Restored on return-to-select / advance / leave-boss-room.
- **Perfect-clear stars**: `state.perfectArenas[n]=true` when arena n is cleared with `roomFails===0`
  (set in `advanceToNextLevel`, persisted in the save snapshot). A green shiny 🌟 pins to the
  top-right of that arena's atlas card (`_atlasArenaCard`, `.atlas-perfect-star`).
- **Hidden Galaxy Center**: when ALL 65 arenas have a perfect star (`galaxyUnlocked()`, or admin),
  a hidden star system `galaxy-center` ("Sagittarius A*") appears in the Star Atlas
  (`STAR_SYSTEMS` entry with `hidden:true`, filtered in `renderStarAtlas`). It holds ONE arena:
  **Giant Black Hole** = CURRICULUM arena **66**, appended AFTER the 65 authored rows with
  `special:'blackhole'`. `CURRICULUM_MAX` stays 65 and galaxy-center is NOT a `chapters` entry, so
  `state.maxLevel` stays 65 and normal advancement never flows into it — it's reached only via the
  atlas card.
  - **Questions**: `generateProblem(66)` → `_blackHoleProblem()` serves a random hardest (difficulty
    ≥4) template from ANY phase across the whole curriculum.
  - **Combat**: `getBlackHoleChain()` = a 10-monster gauntlet, monster i scaling `0.6+0.09·i`
    (≈0.69× → 1.5×) of the arena-65 boss line — each harder than the last, the 10th (Sagittarius A*
    — The Core, rank 3) beyond anything in the linear game. Reuses the atomic-gauntlet machinery
    (`buildGauntletCard`/`startGauntletCard`): one combined chest + a capstone trophy only on full
    clear; escaping/dying restarts from monster 1. Distinct cosmic art via `BLACKHOLE_ART`.
  - Verified live: gating (hidden until all-perfect), enter arena 66, hard-MC questions, the 10-card
    gauntlet renders, and a full 10-link clear commits exactly one chest + one trophy with
    "🏆 Victory — Return". No console errors.
  - **Tuning note**: the 10-monster scaling (0.69×–1.5× the r65 boss, full boss-tier, no heal) is a
    first pass — it's meant to be beatable only with maxed odyssey gear + high hero level. Revisit
    if real play shows it's impossible or trivial.

### Update (2026-07-18, later same day): renamed to "Arena 999" + a companion "Arena 888"

User: rename arena 66's display to "Arena 999"; on LOSING its gauntlet, reveal a new "Arena 888"
next to it — a pure 10-question MC quiz (derivatives, tangent slope, integration, integration by
parts, differential equations) that grants +10 hero levels on a perfect run. Full design/build notes
in `docs/world-and-hubs.md` batch #23; summary here since it directly extends this section:

- **The internal id (`n:66`, room 66, `state.level`) never changed** — only a new `displayN:999`
  field + `arenaDisplayNumber(n)` helper drive what's shown as text, everywhere.
- **New Arena 888 "The Second Chance"** (`n:67, special:'comeback'`) — its own hidden system, no
  combat, no Boss Gate; `handleComebackComplete()` grants the reward directly. One-time only
  (`state.comebackCleared`), matching this project's existing anti-farming pattern.
- **Two bugs in the ORIGINAL 66 implementation were found and fixed** while building this (see
  world-and-hubs.md batch #23 for full detail): the atlas tag was mislabelled "Compute" instead of
  "Identify" (a legacy `G[66]` generator, unrelated leftover from the old 187-arena numbering,
  silently overwrote the mechanic stamp), and — more seriously — **the Boss Gate could never
  actually open** for arena 66 through normal 10-question play, because the gate-opening check
  required `state.level < state.maxLevel`, and `state.maxLevel` is permanently 65. Both fixed.

## Out of scope this pass (follow-ups)

- ~~Wonderland `a2Reward` Cash amounts (flat 20–100)~~ — **fixed 2026-07-17**: added
  `BAL.wonderCash(arena, frac)`, same `(3+ceil(r/2))/3.5` scale factor as `problemCash` (≈1x at
  arena 1, ≈10x at arena 65), wired into `a2Reward` in `39-a2-shell.js`. The per-game `wgPayReward`
  payouts (memory/sudoku/rhythm in `36-arcade.js`/the 43-51 arcade split) already scale with in-game score
  and level, just not arena — left as-is, lower priority.
- New spells / item special effects (the reliability layer lands first).
- Elite/Easy respawn or repeatable-XP source if the playthrough shows XP still tight late.
