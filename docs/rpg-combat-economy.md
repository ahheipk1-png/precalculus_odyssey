# RPG: Combat & Economy

← [docs orchestra](README.md) · code: `js/06-gear-shop.js` + siblings (06b/06c/06d/06e — split
2026-07-18, see world-and-hubs.md), `js/09-items.js`, `js/16-chest.js`

> ⚠️ **2026-07-17: the combat/economy system was REBALANCED end-to-end** — ratio damage, designer
> stat curves, dodge/power-hit/spell-reliability, scaled XP & Cash. The authoritative design (all
> formulas + curve tables + rationale) is **[balance-design.md](balance-design.md)**; the entry
> below records what changed and how it was verified. Older sections of this file describing
> `max(1, AP−DEF)` damage, `monsterRanks` linear stat coefficients, flat 100 XP, or flat 5-15
> problem Cash are SUPERSEDED.

## 2026-07-17 — Full rebalance implemented (BAL curves + combat-feel layer)

User-approved ("you can change the numbers… I am open to anything") redesign fixing the five
measured issues from the same-day playtest (binary walls, economy done by arena 20, worthless math
income, XP soft-lock ≈ arena 40-45, dead crit/SPD stats). Implementation:
- **`config/economy.config.js`**: new `BAL` block — `AP_STAR`/`BOSS_ATK` checkpoint tables +
  `_balLerp` interpolation, rank multipliers, dodge/crit/heal/spell constants, `killXp`,
  `problemCash`. All numbers mirror `balance-design.md`.
- **`js/06-rpg-battle.js`**: `buildMonster` now reads the curves (+ new `speed`, `xp` fields);
  BOTH monster-attack blocks and the player-attack block use dodge → power-hit → ratio damage;
  boss heal = 20% of maxHp costing 35% of maxMp (≈2 heals cap); victory XP = `monster.xp`;
  new helpers `triggerFloatingNote`, `getPlayerCrit`, `rollDodge`; `castPlayerSpell` gained the
  70/20/10 reliability roll.
- **`js/26-spells.js`**: `castSpell` reliability roll (fizzle keeps the monster counter-turn);
  `spellMonsterCounter` uses the same dodge/power/ratio logic as 06.
- **`js/05-render.js`**: `handleSolved` Cash = `BAL.problemCash(state.level, rating)`.
- **`css/styles.css`**: `.floating-dmg.note`/`.power` + `dodgeSlide` keyframes (MISS/POWER HIT
  callouts, dodge side-step).

**Verified** (memory rule: simulate via the real functions): (1) `buildMonster` outputs match the
design table exactly at r=1 and r=65; (2) full r=1..65 sweep through the real `buildMonster` + the
real damage formulas with an on-schedule gear model: kill-in 7-14 / die-in 9-33 nearly everywhere —
the 13 mild outliers (worst kill-in 26 at r53) are artifacts of the sim's pessimistic upgrade
pacing (real income buys upgrades much sooner); no walls, no one-shots; (3) LIVE arena-2 boss fight
through the real UI on the new balance: Granite Titan 99/28/6 — 9 player hits (incl. one 💥 POWER
HIT for 24 that rendered correctly), boss healed exactly twice then ran dry (cap works), player
took formula-exact 18/hit and won at 52/160 HP — precisely the intended "tense but fair" feel;
(4) Hotel heal (30 Cash) exercised via the real `hotelSleep()`; (5) no console errors.

**2026-07-17 follow-up fixes:** shield ladder was non-monotonic (crystal_shield 25 DEF/380 >
legendary 8/600) — `SHIELD_DEF.legendary` raised 8→35 (archive/stellar/rift/odyssey scaled up in
step to keep the ~2.5x/tier spacing: 90/225/560/1400). Wonderland's `a2Reward` Cash was flat
20-100/pass regardless of arena — added `BAL.wonderCash(arena, frac)` (same `(3+ceil(r/2))/3.5`
scale factor as `problemCash`) and wired it in; the per-game `wgPayReward` payouts (memory/sudoku/
rhythm) already scale with score/level, just not arena, and are lower-priority left-as-is.
Separately, found the `odyssey` rarity tier was priced in every gear table but backed by zero
actual items (no odyssey sword/shield/armor/shoes existed anywhere) — added one capstone item per
category (`gear.config.js`): Infinity Vector, Eternity Bastion, Singularity Plate, Quantum
Striders. See `balance-design.md`'s content inventory for full details.

**2026-07-17 — 2-Boss/3-Boss Gauntlet cards** (user request): the arena monster-select screen's
Elite/Boss cards became chained, no-retreat gauntlets — full detail + verification numbers in
`balance-design.md`'s "2-Boss / 3-Boss Gauntlets" section. Summary: 2 new named sub-bosses per
room (`gauntletCatalog`/`buildSubBoss` in `06-rpg-battle.js`), full Boss-tier stats
(`BAL.GAUNTLET_SUB_MULT`), an elevated hero-level gate on top of the normal boss requirement
(`cardLockReason`'s `bonus` param: +2 / +5) explicitly pointing players at Arena Infinity, and a
monster queue on `activeCombat` (`startCombat(monster, queue, locked)` → `continueGauntlet()`)
that chains fights with Escape/Flee/Shop hidden for the whole run. Death mid-chain needs no new
state — each kill already marks `state.defeatedMonsters`, so resuming just filters to
not-yet-defeated members. Card grid is `0.75fr 1.35fr 1.9fr` (narrow/medium/wide).

**Follow-up (same day):** the monster-select screen initially only showed the CURRENT arena's 3
cards — a read-only "Bounty Checklist" text summary was added to cover history, but that wasn't
actionable (couldn't click it to fight). Replaced both with the real thing: `renderMonsterChoices`
now loops every arena from `state.level` down to 1 and renders each one's own live, clickable
3-card row (`buildArenaCardRow`/`buildEasyCard`), most-recent-arena-first. The checklist container
is hidden (`#bountyListContainer` display:none) — fully superseded. Note: `#monsterChoices` in
`index.html` had to drop its own `monster-choices-grid` class (it used to BE the 3-column grid;
now each arena row creates its own inner grid, so the outer container must be a plain block or the
browser force-packs whole arena rows into 3 columns side-by-side). Verified at arena 65: 65 rows /
195 cards render in ~11ms, no console errors, clicking an older arena's card starts a real fight
against that arena's monster.

**Follow-up (2026-07-17, gauntlet polish — user feedback):** two gaps found once the gauntlet
cards were actually played through:
1. A fully-cleared gauntlet card only dimmed slightly (opacity 0.4) with no explicit label —
   `buildGauntletCard` now adds a `✅` on the title and a `☑️ CLEARED` banner
   (`.gauntlet-cleared-banner`), plus grayscale + stronger dimming, when `deadCount === members.length`.
2. Every individual kill in a chain popped its own victory chest — jarring mid-fight in a
   "no retreat" gauntlet. `activeCombat` now carries `chainCash`/`chainLoot` accumulators (merged
   via `_mergeLoot`, carried across `continueGauntlet`'s `startCombat` re-init since that builds a
   fresh `activeCombat` each link). Mid-chain kills get Cash/materials credited immediately (no
   gameplay change) but only a toast, not a chest; the chest fires exactly once, at the true end
   of the chain, with every link's cash+loot summed. Verified live: a 2-Boss chain showed 0 chest
   calls after link 1, exactly 1 after link 2 with the combined total (117+117=234, matching the
   card's own "Total Reward"); the cleared card shows the banner and greys out; the still-open
   3-Boss card (sharing 2 of the same sub-bosses) correctly shows "2/3 defeated — resume from here".

**Follow-up (2026-07-18, card declutter — user feedback with an annotated screenshot):** the Easy
card's full stat block (HP/MP, ATK/DEF, "Needs Hero Lv.", Reward, Drops) and the gauntlet cards'
"⚠️ No retreat…" warning line + "Total Reward" line were circled as clutter to remove. Cut all of
it: `buildEasyCard` now renders only art/name/element (+ a defeated/locked note when relevant);
`buildGauntletCard` drops the warning and reward lines (member portraits' own compact HP/ATK/DEF
row, the cleared banner, and the resume-progress line are untouched — those weren't circled). Also
re-verified the "CLEARED" banner/dark-state from the prior entry via a FULL real click-by-click
playthrough (real `startCombatBtn`/`postCombatBtn` clicks, not just `handleBattleVictory()` called
directly) after the user reported not seeing it — confirmed it still renders correctly; likely a
stale cache on their end, not a regression.

**Follow-up (2026-07-18, missing-Escape confusion):** removing the card's "No retreat" warning
(previous entry) left a real UX gap — the user asked "why no escape button" mid-fight, since
nothing in the combat screen itself explains why `combatEscapeBtn` is hidden during a gauntlet.
Added a small inline note (`#gauntletLockNote` in `index.html`, mapped in `02-dom.js`, toggled in
`startCombat` alongside the Escape-button visibility) directly under the Cast&Strike/Spell buttons:
"🔒 Gauntlet fight — no Escape until the whole chain is cleared" — hidden for solo fights, shown
only when `activeCombat.gauntletLocked`. Verified live: hidden + Escape visible for the solo Easy
fight, visible + correct text for a 2-Boss Gauntlet fight, no console errors.

**Follow-up (2026-07-18, three combat/admin fixes — user feedback):**
1. **Escape is now ALWAYS available** (superseding the "gauntlets hide Escape" rule above). The
   user wanted the button present everywhere but with a **speed-based success chance**. New
   `attemptEscape()`/`escapeSuccessChance()`/`monsterFreeHit()` in `06-rpg-battle.js`: chance =
   `clamp(55 + (playerSpeed − monsterSpeed)·3.5, 20, 90)%`. Success → back to monster select;
   failure → the monster lands one free ratio-damage hit (player dodge still applies) and you stay
   in the fight. `startCombat` always shows `combatEscapeBtn`; the gauntlet `#gauntletLockNote` was
   repurposed from "no Escape" to "escaping mid-chain is a speed gamble; failing costs a free hit."
   Verified live: chance 73% at spd 9 vs 4; forced-fail took 32 dmg and stayed in combat;
   forced-success returned to select.
2. **Beaten monsters show CLEARED + non-clickable even in admin.** `isMonsterDefeated` dropped its
   `if (state.testMode) return false` re-fight bypass — it now reads the real `defeatedMonsters`
   map for everyone, so an admin who beats a monster sees the greyed "☑️ CLEARED" card (the Easy
   card got the same banner treatment as the gauntlet cards) and can't re-click it. Admin keeps its
   other powers: `getMonsterLockReason` still bypasses arena/hero-level gates (fight ahead-of-level
   foes), and the Boss Gate is always open. **Trade-off:** admin can no longer RE-fight a cleared
   monster for testing (was task #66's convenience) — if that's needed later, add a dedicated
   "reset arena progress" admin action rather than restoring the silent bypass.
3. **Boss Gate always open in admin.** `setGateButton` now forces `open = true` when
   `state.testMode` — a single choke point so no caller (openBattle, arena-advance reset) can close
   it for admin. Verified: gate reads "⚔️ Boss Gate Open!" / enabled at 0 solves in test mode.

**Follow-up (2026-07-18, gauntlets are now ATOMIC — user: "escape on the 2nd monster → next time
start from the 1st"):** a gauntlet is all-or-nothing. `handleBattleVictory` no longer commits each
gauntlet kill's rewards/defeated-mark immediately — it **banks** them on `activeCombat`
(`chainCash`/`chainXp`/`chainLoot`/`chainKills`, carried across links by `continueGauntlet`) and
commits the entire batch only when the FINAL link falls (one `showVictoryChest`, all `defeatedMonsters`
marks, the boss's rank≥3 trophy/lore, `addHeroXp` of the summed XP). Escaping or dying mid-chain
nulls `activeCombat` → nothing was persisted → re-entering `startGauntletCard` starts from the first
monster again. **This supersedes the earlier "death resumes from checkpoint" design** — death now
also forfeits the chain (consistent with escape; death already costs the revival fee). Bonus: it
closes a kill-one → escape → repeat reward-farm hole (rewards only land on completion). Solo (Easy)
fights are unchanged — they commit immediately. Verified live (admin + non-admin): links 1–2 commit
nothing (coins/XP/defeated all unchanged); escape from link 2 → chain restarts from monster 1 with
0 members marked; full completion commits exactly once (2-Boss → +234 coins = 117+117, both marked;
3-Boss → all 3 marked, 1 trophy, 1 chest of 351, Advance button); solo Easy still credits its 18
coins + mark immediately. No console errors.

## Hero & stats

`state.heroLvl / heroXp / playerHp / playerMaxHp / playerMp / playerMaxMp`. XP curve
`heroLvl * 100` (cumulative-quadratic). AP = equipped weapon's **effective power** (`effectiveGearStat`
= base × the ×2/×3/×5 upgrade multiplier) + hero + sockets; DP = shield + armor effective defense +
hero + sockets (`getPlayerAp`/`getPlayerDp`). See the **2026-07-16 multiplicative-upgrade** section below.

## Monsters (deterministic — same for every player)

`monsterCatalog` + `monsterRanks` in `06-rpg-battle.js` (to be moved to `enemies.config.js` in a
later phase). 3 monsters per planet × 10 planets; rank 3 = the planet **boss**. `buildMonster(entry)`
scales stats by planet × rank. Monster identity is **fixed/deterministic**; only the per-kill loot
roll is random.

## Combat loop (`executeCombatRound`)

Turn-based: player strikes (`max(1, AP − DEF)`), then the monster attacks or heals (at low HP). Real
status effect: **Corrosion DoT** — an Acid Vial armed at the Laboratory (`state.poisonArmed`, kept as
the internal flag name; the `poison`/`burn` status keys are unchanged in the engine) sets
`activeCombat.poisonTurns=3` in `startCombat` and ticks each round. Music switches to `arena` on the
select screen and `battle` in combat; SFX on hit/victory/defeat.

**Wounds persist between battles.** `startCombat` enters combat at the hero's *current*
`state.playerHp/playerMp` (not full), and `updateCombatHpBars` mirrors live combat HP/MP back into
`state` every change — so damage carries over. HP/MP are restored **only** by the Hotel (`hotelSleep`),
a full-heal item (Super Medicine), or death-revival. Hero level-up (`addHeroXp`, `05-render.js`) adds
the +20 HP / +10 MP *capacity* but no longer wipes existing wounds.

**Death penalty** (`handleBattleDefeat` → `applyDeathPenalty`, `deathFee`): dying charges a Cash
**revival fee** (`deathFee() = 80 + level*40`, tunable) — paid from Cash first, then Gold, Silver and
Quantum Chips liquidated at the current market **spot** (`currencySpot`, chip `.value`) to cover any
shortfall. If total net worth can't cover the fee, the player loses **everything** (Cash + Gold +
Silver + all chips → 0). The hero is then revived to full HP/MP. (Test accounts refill currency via
`updateStats`, so the deduction is only visible on a normal profile.)

## Victory, chest & drops (R1 economy)

On victory (`handleBattleVictory`): credit Cash + 100 XP + loot, then show the **treasure chest**
overlay (`showVictoryChest`, `16-chest.js` — pure presentation; rewards already credited). Bosses
push a keepsake trophy **and unlock a Star Log memory fragment** (see
[story-astronomy.md](story-astronomy.md)).

Loot (`rollMonsterLoot`, `09-items.js`): `essence` 🫀 always + rank/element-weighted `silver`/`gold`/
`gem`. **NOTE (superseded):** the master plan replaces `essence` with **AI chips/components**, and
promotes gold/silver/gems to **currencies** — not yet migrated.

## Currency & materials (today)

- **Cash** = `state.coins` (the spendable currency; labelled "Cash 💵").
- **Materials** = `state.materials` (id→count): `essence/silver/gold/gem` (`MATERIALS`, `09-items.js`)
  — used to **upgrade gear**. A materials chip-bar renders atop the shop (`renderMaterialsBar`).
- Target end state (master plan / user): the interface shows **Cash · Gold · Silver · Chips**;
  gold/silver become tradeable currencies, chips the upgrade input. See
  [process-and-roadmap.md](process-and-roadmap.md).

## Shop & upgrades (`window.rpgActions`, `renderShopList`)

Buy / equip / sell / upgrade weapons & shields (currently 5 each in `01-data.js`; the **30-item
illustrated catalogue** from the user's image lands in master-plan Phase 4, config-driven). Upgrade
(+1/+2/+3) costs **Cash + a per-level material recipe** (`getUpgradeRecipe`); `getUpgradeHint` shows
it. SFX on buy/upgrade.

## Spells

Basic today: a heal spell + the monster's heal; corrosion via the Acid Vial. The full **Wu Xing +
status-effect spell system** (freeze/burn/armor-break/elemental attacks) is master-plan Phase 6.

---

## 2026-07-13 full build — what actually ships now (supersedes the notes above)

**Currencies & chips (config-driven).** `Cash` = `state.coins`; `state.currencies` = `{gold, silver}`
(tradeable); `state.chips` = AI components (`energy_core, robotic_alloy, cpu, gpu, neural_chip,
quantum_chip, alien_processor`) — the **upgrade** input (config: `economy.config.js`). HUD strip shows
**Cash · Gold · Silver · Chips · Passes** (`updateCurrencyBar`, `05-render.js`). Old `state.materials`
is retired; a v1→v2 `migrateSave` (`03-save.js`) converts essence→energy_core, gem→quantum_chip,
gold+gems→gold, silver→silver.
- **2026-07-22 — Passes joined the currency bar; the old page-wide progress bar retired.** Previously
  `.level-progress` was a full-width bar (progress dots + "Arena Progress: N/10" text + tries-left
  hearts + a separate 🎟️ Passes pill + a separate 🧩 Chips pill) sitting ABOVE `#equationView`, built
  by `08-layout.js`'s `setupWidescreenDashboard()` into `.hero-hud-stack`. User: "move this to the
  left top corner of the question panel" — split into two destinations instead: (1) the progress
  dots + text + hearts now live in `.quest-progress-badge` (`id="questProgressBadge"`), a small
  `position:absolute` badge pinned to `.quest-main-panel`'s own top-left corner (`position:relative`)
  — moved there by `08-layout.js` at boot, same as `#astroCard`. `.quest-main-panel` got extra
  `padding-top` (56px desktop / 78px phone, where the badge wraps to 2 lines) reserved specifically
  so the badge never overlaps the astro card / formula / scale / question-prompt content, which all
  still start flush at that padding edge in normal flow. (2) The 🎟️ Passes pill and the redundant
  🧩 Chips pill (the currency bar already had its own "All Chips" tile) both got folded into
  `updateCurrencyBar()` itself — Passes as a new `.cur-chip`, Chips pill simply deleted as a
  duplicate. `#passBarPill`/`#chipsBarPill`/`.lp-pill` and all `.level-progress` CSS (base rule,
  `.hero-hud-stack` scoping, 3 responsive breakpoints, the Wonderland-focus-mode hide list) removed
  as dead code — the element they targeted no longer exists.
  - **Follow-up same day**: the currency bar's two-piece Chips display ("🧩 N All Chips" span +
    separate "🔍 view" button) got merged into ONE clickable pill — `<button class="cur-chip
    cur-chip-view" onclick="viewChips()">🧩 Chips: N 🔍</button>` — matching the format the retired
    `#chipsBarPill` used to have. Passes moved to be the LAST item in the bar (after Chips), per
    user: "put passes right hand side of view". Order is now Cash · Gold · Silver · Chips · Passes.

**Enemies drop chips + gold/silver** (`rollMonsterLoot`, `09-items.js`) → the victory **chest**
(`16-chest.js`). Every enemy has a deterministic Wu Xing `element` (`getMonsterElement`).

**Gear catalogue (config `gear.config.js`).** 30 weapons (5 starter + 25 legendary from the image) +
shields/armor/shoes, each with a Wu Xing element, rarity tier (5 tiers → frame color + stat
multiplier), and 3 AI-chip sockets. Deterministic SVG art via `weaponSVG`/`gearArtSVG`
(`21-catalogue.js`) — element-tinted, Base→+1→+2→+3 glow/aura/burst; **no emoji as art**. The shop
(`renderGearList`/`gearGroup`, `06-rpg-battle.js`) renders all four gear kinds; `rpgActions`
(buy/equip/sell/upgrade) is gear-generic; **upgrades cost Cash + chips** (`hasChips`/`spendChips`).
State stores owned/upgradeLvl; the catalogue is reconciled from config on load.

**Wu Xing (`elements.config.js` + `21-catalogue.js`).** `elementMultiplier(atk,def)` uses both the
generating (相生) and overcoming (相克) cycles → super-effective 1.6 / resisted 0.66 / generating 1.15.
Applied to the player's strike (weapon element vs enemy) and the enemy's strike (vs shield element),
with a plain-language combat-log note (`elementMatchupNote`).

**Spell system (`spells.config.js` + `26-spells.js`).** 14 spells; `castSpell(id)` deals
element-scaled damage and/or applies a **real turn-based status** stored on
`activeCombat.mStatus`/`.pStatus`: freeze/stun (skip turn), poison/burn (DoT), armorbreak (−DEF),
weaken (−ATK), blind (miss chance), shield (halve incoming), haste, heal. `applyMonsterStatusPreTurn`
is called by `06`'s basic strike so statuses persist across mixed turns. `openSpellsMenu` (26's,
overrides 06's) renders the castable spells.

**New views (all reachable from the global header nav + the Earth hub buildings):**
`22-profile.js` (`#profileView` — Stats/Gear/Inventory, equip, use consumables), `24-trading.js`
(`#tradingView` — buy/sell Gold/Silver, fluctuating prices + sparkline + tx log, review-to-refresh:
`tradeAskReview` draws a real arena question via `generateProblem` from `state.recentLevels` — the last
5 arenas the player played, tracked in `loadProblem` — using only the single-answer styles, tap-one
**Identify** (`tradeReviewPick`) or type-a-number **Compute** (`tradeSubmitReview`), and falls back to a
quick arithmetic question if none qualify; a correct answer runs `_trDrift`),
`25-nav.js` (`#starAtlasView` — star-system→planet drill-down + Travel; `goToEarth` retreat-confirm),
`27-hoohey.js` (`#hooHeyView` — Hoo Hey How dice betting, Cash). The map hub (`15-map.js`) is
reframed as **Earth**; its buildings (with hover-`title` descriptions) are Practice Hall, Weapon Store,
Item Store, Hotel, Wonderland, Farm, Laboratory and Trading Room. The Star Atlas is reached from the
global header nav (removed from the hub to declutter it).

## 2026-07-15 batch — swords-only weapons, distinct monster art, Wu Xing on the battle page

**Weapons are SWORDS ONLY now** (`gear.config.js`). Per the user's request, all bows/spears/staves/heavy
weapons were removed: `WEAPON_CATS` keeps only `sword`; `STARTER_WEAPONS` keeps the 3 swords
(wood_sword/bronze_dagger/iron_broadsword); `LEGENDARY_WEAPONS` keeps the 5 element-swords
(axiom_blade metal, solar_meridian fire, tidal_paradox water, verdant_recursion wood, gravity_keystone
earth) — so **all five Wu Xing elements stay represented**. The `_catArt` SVG switch (`21-catalogue.js`)
keeps only the `sword` drawer (`weaponSVG` already falls back to it). Save-compat is automatic:
`reconcileGear` drops removed weapon ids from a loaded save and `_validEquip` re-homes a removed
equipped weapon to `wood_sword`.

**Widened sword price + power ladders (upgrade-first economy).** Swords now take both their **cost** and
their **attack power** from per-rarity tables (`WEAPON_COST` + `WEAPON_POWER` in `gear.config.js`)
instead of the shared `650×rarity-mult` / `42×rarity-mult` formulas, which had clustered the five
legendaries at ~1000-1820 cash (gaps ~260) and 65/82/99/118 AP (gaps ~17). The new ladders:

| Sword | Rarity | AP | Cost |
|---|---|---|---|
| Wooden / Bronze / Iron | common | 2 / 8 / 20 | 0 / 60 / 220 |
| Axiom Blade · Verdant Recursion | legendary | 55 | 700 |
| Gravity Keystone | archive | 95 | 1600 |
| Tidal Paradox | stellar | 150 | 3200 |
| Solar Meridian | rift | 230 | 6000 |

Both gaps **widen** at each tier. Cost: fully upgrading (~45% of price for a +3) is always cheaper than
the gap to the next sword (verified at every step — Iron→Axiom upgrade 123 vs gap 480; Gravity→Tidal
744 vs 1600). Power: a maxed sword lands about at the **next tier's base** AP (maxed Axiom 97 ≈ Gravity
95; maxed Gravity 167 > Tidal 150; maxed Tidal 264 > Solar 230) while the next tier keeps a far higher
ceiling — so upgrading carries you into the next power band and buying up is the bigger, later leap.
(The two legendaries share 55 AP / 700 cash as an element sidegrade.)

**The same widening was applied to the other three gear families** (`SHIELD_DEF`/`SHIELD_COST`,
`ARMOR_DEF`/`ARMOR_HP`/`ARMOR_COST`, `SHOE_SPEED`/`SHOE_COST` — all in `gear.config.js`), so the whole
Weapon Store follows one upgrade-first economy. Legendary→rift tiers:

| Family | Primary stat (leg → rift) | Cost (leg → rift) |
|---|---|---|
| Shields (DEF) | 40 → 70 → 110 → 165 | 600 → 1400 → 2800 → 5200 |
| Armor (DEF / HP) | 26/50 → 46/95 → 74/155 → 112/240 | 650 → 1500 → 3000 → 5600 |
| Shoes (SPD) | 10 → 18 → 28 → 42 | 500 → 1200 → 2400 → 4400 |

Each family's per-tier full-upgrade cost stays below the price gap to the next item, and a maxed item
lands ≈ the next tier's base (shields/armor upgrade DEF +25%/level; shoes +2 SPD/level, so shoes reach
a bit under the next base — SPD is a lighter stat). Common starters keep their hand-set values; only
the config's own `_shield`/`_armor`/`_shoe` builders read the new tables (falling back to the old
`Math.round(BASE×mult)` for any rarity not in a table).

**Distinct monster art.** `getMonsterArtMarkup` used to clone one shared ice-creature SVG tinted by
difficulty — every monster looked the same. It now takes the **monster object** and renders a distinct
**emoji creature** per base id via the `MONSTER_ART` map (30 entries, rooms 1-10 × 3 ranks; higher
arenas cycle by `_monsterBaseId`), inside an element-tinted glowing aura (`.monster-emoji-art` in
`styles.css`). All three call sites (startCombat, renderMonsterChoices, the legacy renderer) pass the
monster.

**Wu Xing shown on the battle main page.** `elementBadgeHtml(el)` renders an icon + 中文 + name badge;
`startCombat` fills `#monsterElementBadge` and `#playerElementBadge` (new spans in `index.html`) and
logs the matchup via `elementMatchupNote` (the `☯️ Super effective / Resisted / boost` line). The damage
multiplier itself was **already** wired (`elementMultiplier` at the two strike sites + the duplicate in
`castPlayerSpell`); this batch only surfaced it.

**AP-NaN fix.** Shoes showed `AP: NaN → NaN (+NaN)` because `getUpgradeHint` hard-coded weapon/AP and
read `item.power`. It is now **category-aware** — it pulls the label + current stat from `gearGroup(type)`
(so shoes read `SPD`, shields `DP`, armor `DEF`), with shoes using a flat +2/level gain; the call site
passes the real `type` instead of the collapsed `g.up`. `getUpgradeGain` is hardened to coerce the base
stat to a number so it can never emit `NaN`.

## 2026-07-17 — Real human-style playtest: arena-1 boss is a binary wall, not a "slightly hard" nudge

The player asked whether the boss/weapon/item settings genuinely motivate Wonderland visits — the
intended feel being "slightly not enough to beat the monster without going to Wonderland for money
and items." This was tested for real (see `docs/playtest-methodology.md` for how), not just modeled:
a fresh local profile solved exactly the `ARENA_GOAL=10` arena-1 problems through the actual UI,
reached the real Boss Gate, and fought the real Blackboard Behemoth (rank-3, room 1: 70 HP / 7 ATK /
4 DEF) via the real combat buttons.

**Two real data points, same profile:**
- **Zero gear purchases** (`wood_sword` AP=2, but Hero reached **Lv.3 for free** from XP along the
  way — `heroStatBonus` adds +2 AP/+1 DP per level past 1 — so live AP=6, DP=2, not the naive
  level-1 numbers a static calculation would assume): `dmg = max(1, round(6-4)) = 2`/hit → **35 hits
  to kill** the boss, while taking `max(1, round(7-2)) = 5`/hit → **dies in 28 hits.** A clean, total
  loss — this is not "slightly hard," it's a hard wall with zero real gear.
- **The single cheapest possible purchase** — `bronze_dagger` (60 Cash, 8 AP) + `wood_shield` (30
  Cash, 2 DP), **90 of the 150 Cash earned from the 10 problems alone, zero Wonderland income
  touched**: live AP=12, DP=4. A Metal-weapon-vs-Water-boss elemental bonus (`☯️ 金 feeds 水`, the
  Wu Xing "generating" 1.15× multiplier) pushed real damage to **9/hit** (not the flat 8 the raw
  formula alone predicts) vs **3/hit** taken. The boss's self-heal (`+25 HP` below 35% HP while it
  has ≥20 MP, `06-rpg-battle.js:660-678`) fired **4 times**, stretching the fight to 14 rounds before
  its MP ran dry — but the outcome was never in doubt: **victory at 98/140 HP (70% remaining)**,
  rewards `+140 Cash, +4 Gold, +7 Silver, +100 XP`, first trophy.

**The finding**: there is currently no "slightly not enough" zone at arena 1. It's binary — broke
(0 Cash spent) = cannot win at all; the single cheapest weapon+shield combo (90 Cash, fully covered
by normal problem-solving income with zero Wonderland involvement) = a comfortable win with 70% HP
to spare, no real risk despite the boss's sustain mechanic. A player never needs to visit Wonderland
to clear arena 1 — the "motivating nudge" the player wants isn't there yet. **Not yet re-tuned** —
this batch is the playtest finding only; see the same-day gameplay.md entry for the question-quality
half of this playtest, and treat the options below as candidates for a follow-up session:
- Lower normal-problem Cash income (currently 5-15/problem, flat regardless of arena) so 10 problems
  don't cover even the cheapest weapon+shield combo.
- Raise `bronze_dagger`/`wood_shield`'s Cash cost, or lower their AP/DP, so the "cheap starter combo"
  isn't already sufficient — while keeping `iron_broadsword` (220 Cash, clearly Wonderland-gated
  right now) as the natural next tier.
- Or accept zero-gear-loss as the intended tension and instead soften it (some non-zero, still-losing
  middle state) so the player experiences "close but not quite" before finding a cheap fix, rather
  than "impossible" flipping straight to "trivial" with one purchase.

## 2026-07-16 batch — MULTIPLICATIVE gear upgrades + combat rescale (supersedes the additive notes above)

**Upgrades now MULTIPLY, not add.** An upgrade multiplies the item's base stat by `UPGRADE_MULT`
(`[1,2,3,5]` in `economy.config.js`) → **×2 / ×3 / ×5** at +1 / +2 / +3. One new helper,
`effectiveGearStat(baseStat, upgradeLvl)` (`05-render.js`), is the single source every stat flows
through: `getPlayerAp` (weapon power), `getPlayerDp` (shield defence), `getArmorDefense`,
`getArmorHpBonus`, `getPlayerSpeed`, and all four `gearGroup(type).stat` display functions. This also
**fixes a pre-existing bug** where armor showed `+25%/level` in the shop but combat added only a flat
`+2/level` — display and combat can no longer diverge because both call `effectiveGearStat`.

**Tiers spaced ≈2.5× (weapons/DEF).** `WEAPON_POWER` (`gear.config.js`) is now
`legendary 30 · archive 75 · stellar 188 · rift 470` (≈2.5× per tier). With the ×5 ceiling this makes
the intended incentive exact: a fully-upgraded item (×5) = **2× the next tier's base** (2.5×) but stays
**under the tier-after-that** (6.25×) — so upgrading beats buying one tier up, yet buying up two tiers
still matters. Bases are anchored LOW on purpose: a freshly-bought higher tier is *weaker* than your
maxed current weapon until you re-upgrade it (accepted trade-off — the ×5 ceiling does the work).

**DEF anchored lower than weapons.** Because DEF is a flat damage-subtraction, big multipliers on big
bases would make players invincible mid-game. So `SHIELD_DEF`/`ARMOR_DEF` bases are small
(`shield 8/20/50/125`, `armor 5/13/32/80`): un-upgraded defence still takes real damage, and only heavy
investment (+2/+3) makes you tanky (a reward, not a wall). `SHOE_SPEED` is **cosmetic** (shown in the
profile only — combat never reads `getPlayerSpeed`), so its ladder is small; the ×5 upgrade still shows.

**Upgrade cost curve** = item price × `UPGRADE_COST_FRAC` (`[0.25,0.5,1.0]`, indexed by current level) →
**1.75× the item's price** for a full +3 — steep enough that ×5 is a real investment, still cheaper than
buying the next tier (~2× the price for only 2.5× power). Chips are additionally required per
`UPGRADE_CHIP_RECIPES`. (`getUpgradeCostForLevel` in `05-render.js`.)

**Monster stats rescaled** (`monsterRanks` in `06-rpg-battle.js`): the OLD boss DEF of `arena×9`
out-scaled weapon power — even a *maxed* weapon did 1 damage to a late boss (a pre-existing softlock).
New per-arena coefficients: **Easy `hp10/atk2/def0.6` · Elite `hp32/atk4/def2` · Boss `hp70/atk7/def3.5`**
(`buildMonster` = arena × coeff). Verified by simulation across arenas 3–65: a tier-appropriate weapon
at **+2 clears a boss in ~4–10 hits**, **maxed in 2–5** (never a one-shot), an **un-upgraded** one is a
deliberate slog (upgrade incentive); an under-geared player dies in ~4–10 boss hits, a well-geared one
tanks it. The `renderMonsterChoicesLegacy` dead function (its old `state.level×15/35/75` monster block,
unreachable after a `return`) was deleted in the same pass.

**2026-07-18 — combat action column, 🎒 Use Item in battle, spell category tabs** (user request,
3 screenshots):
- **Action buttons are a vertical column** (`.combat-btn-stack` in `index.html`): Cast & Strike! /
  Spell / **Use Item** (new) / Escape stack top-to-bottom at equal width (max 260px) instead of the
  old wrapping row.
- **🎒 Use Item — consumables are usable MID-FIGHT** (`openItemsMenu`/`renderItemsMenu`/
  `useCombatItem` in `26-spells.js`; button wired in `07-main.js`; `#combatItemsPanel` in
  `index.html`, el refs in `02-dom.js`). Items offered: 🧪 Potion (+50 HP), 💧 Ether (+10 MP),
  💊 Super Medicine (full restore), ⚗️ Acid Vial (poisons the CURRENT monster 3 rounds — the
  out-of-combat version still arms for the next battle). **Using an item takes your turn**: effect
  lands, then the monster answers via the same `spellMonsterCounter()` path spells use (dodge /
  power-hit / status rules all apply). Effects write `activeCombat.playerHp/Mp`; the existing
  `updateCombatHpBars()` mirror keeps "wounds persist" bookkeeping in one place. No-op uses (HP
  already full, etc.) refund nothing and cost nothing — they just toast. Item buttons show live
  ×counts and disable at 0; empty bag shows a "stock up at the Item Store" note. The Use Item
  button hides/disables at every site the Spell button does (start, gauntlet-next, victory, defeat,
  mid-round). Verified in a REAL fight (Volt Eagle, arena 6, real clicks): potion 151→201 HP,
  count 2→1, eagle counter-hit for 13, panel closed, buttons re-enabled.
- **Spell menu grouped by category tabs** (`SPELL_CATS` + per-spell `cat` in `spells.config.js`;
  `renderSpellsMenu` in `26-spells.js`; `.spell-cat-row/.spell-cat-btn` CSS in `systems.css`):
  **⚔️ Attack (5)** elemental strikes · **🌀 Control (6)** freeze/poison/debuffs (Static Veil moved
  here) · **💚 Recovery (1)** Repair Wave · **✨ Special (2)** — spells with NO `cat` land in
  Special automatically (currently Aegis Field + Overclock), per the user's "unclassified ones call
  it special". Active tab remembered for the session (`_spellTab`). Verified with real clicks: tab
  counts correct, each tab lists exactly its spells.
- Also in this batch (other docs): puzzle-game Undo + key-leak fix (world-and-hubs.md batch #15),
  top-bar 🎟️/🧩 pills, green atlas star.
