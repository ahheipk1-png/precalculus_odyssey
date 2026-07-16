# RPG: Combat & Economy

← [docs orchestra](README.md) · code: `js/06-rpg-battle.js`, `js/09-items.js`, `js/16-chest.js`

## Hero & stats

`state.heroLvl / heroXp / playerHp / playerMaxHp / playerMp / playerMaxMp`. XP curve
`heroLvl * 100` (cumulative-quadratic). AP = equipped weapon power + upgrades; DP = equipped shield
defense + upgrades (`getPlayerAp`/`getPlayerDp`).

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
**Cash · Gold · Silver · Chips** (`updateCurrencyBar`, `05-render.js`). Old `state.materials` is
retired; a v1→v2 `migrateSave` (`03-save.js`) converts essence→energy_core, gem→quantum_chip,
gold+gems→gold, silver→silver.

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

**Widened sword price ladder (upgrade-first economy).** Sword costs now come from a per-rarity table
`WEAPON_COST` (`gear.config.js`) instead of the old `650×rarity-mult` formula that clustered the five
legendaries at ~1000-1820 (gaps of only ~260). The ladder is **0 → 60 → 220 → 700 → 1600 → 3200 →
6000** (the two legendaries share 700 as an element sidegrade). The gaps widen so that **fully
upgrading your current sword (~45% of its price for a +3) is always cheaper than the gap to the next
tier** — verified at every step (e.g. Iron→Axiom upgrade 123 vs gap 480; Gravity→Tidal 744 vs 1600).
A maxed sword also overshoots the next tier's base AP (maxed Axiom 113 > Gravity base 82), so upgrading
carries you into the next power band while you save for the real jump. Only weapon costs changed;
shield/armor/shoes still use their own `Math.round(BASE×mult)` formulas.

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
