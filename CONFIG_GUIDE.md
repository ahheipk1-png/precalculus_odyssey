# Config Guide — Precalculus Odyssey

**All game *content* lives in `game/config/*.config.js`, separate from logic.** Add star systems,
planets, story, (and soon weapons, enemies, spells, items) by **editing a config file** — no code
changes. This guide documents every config's shape with copy-paste "how to add X" recipes.

> Companion to `Precalculus_Odyssey_Master_Plan.md` (§0.5) and the `docs/` set.

> **Terminology:** a **chapter = a star system**, a **planet = a level** (Planet 1 = Earth …
> Planet 10 = Neptune). The config **filenames** `worlds.config.js` / `rooms.config.js` and the
> `room` / `roomCount` fields keep the legacy names (renaming them risks breaking the game) — read
> "world" as star system and "room" as planet.

## Rules (why it's `.js`, not `.json`)

1. **Configs are classic `.js` files** that assign global variables (e.g. `var WORLDS = […]`).
   They are **not** JSON — because the game must run over `file://` (double-click), and
   `fetch()`-ing JSON is blocked there. Plain `<script>`-loaded `.js` works everywhere.
2. **Config = data only, no behavior.** No functions with logic. (A problem generator is named as
   a *string* and resolved at boot — see rooms/worlds below.)
3. **Load order:** every file in `game/config/` is listed in `index.html` **before** `js/01-data.js`,
   so all logic modules can read the config globals. If you add a new config file, add its
   `<script>` there too (in the config block).
4. **One definition only.** A config global must be declared **only** in its config file — never
   also in a `js/` module (the later copy would shadow the config). The logic modules were emptied
   of these literals during the config extraction.
5. **Encoding:** save as UTF-8. Emoji, curly quotes `’`, em-dash `—`, `°`, `−` are fine typed
   directly. (Don't hand-edit these files through PowerShell JSON round-trips — it mojibakes emoji.)

## Files (current)

| File | Global(s) | Holds |
|---|---|---|
| `worlds.config.js` | `chapters` (6 math worlds), `STAR_SYSTEMS` (24 real systems) | World registry + real-star-system atlas metadata (arena ranges stamped by `curriculum.config`) |
| `curriculum.config.js` | `MATH_WORLDS` (11), `CURRICULUM` (187 arenas), `getArena`/`arenasForSystem`/`arenaByCode` | **Single source of truth**: every planet's topic, question style (`mechanic`), region (`systemId`), Worm Hole code, and real body. Systems are grouped into ONE region per world (`systemId` = worldId; the real star each body belongs to is kept in `origSystem`). |
| `tutorials.config.js` | `TUTORIALS` (n → explain string) | Per-planet "how to play" text shown by the tutorial overlay (`js/29-tutorial.js`); live worked examples come from re-running the planet's generator |
| `rooms.config.js` | `levelCodes`, `levelTitles`, `formulaBank`, `sceneCaptions` | Legacy per-planet content (formula bank still used; codes/titles now come from `curriculum.config`) |
| `planets.config.js` | `BODIES`, `BODY_ORDER` | Rich hand-drawn art for the 10 original Sol bodies (astro card falls back to a generic disc for others) |
| `story.config.js` | `STORY`, `CHAPTER_LORE` | Opening narration, ending, per-chapter intro + boss memory fragments |

| `gear.config.js` | `WEAPONS`, `SHIELDS`, `ARMOR`, `SHOES`, `GEAR_RARITY`, `WEAPON_CATS` | The full catalogue — 5 starter + 25 legendary weapons (from the image) + shields/armor/shoes. Add a weapon = one `_wpn(id,name,category,element,rarity)` line |
| `economy.config.js` | `CURRENCIES`, `CHIPS`, `CHIP_ORDER`, `UPGRADE_CHIP_RECIPES`, `CHIP_BONUS`, `TRADING` | Cash/Gold/Silver + the 7 AI chips (upgrade materials), upgrade recipes, socket bonuses, trading prices |
| `elements.config.js` | `ELEMENTS`, `ELEMENT_ORDER`, `WUXING_GENERATES`, `WUXING_OVERCOMES`, `WUXING_MULT` | Wu Xing five elements + both cycles + damage multipliers |
| `spells.config.js` | `SPELLS` | 14 spells (element, manaCost, targetType, power, statusEffect, duration, desc). Add a spell = append an entry |

*(Still config-external: enemy roster — `monsterCatalog` in `js/06-rpg-battle.js` — and consumable
`ITEMS`/`ITEM_ORDER` in `js/09-items.js`; both can move to config in a later cleanup.)*

### `gear.config.js` — add a weapon

```js
// Element: wood|fire|earth|metal|water|all. Rarity: legendary|archive|stellar|rift|odyssey (or common for starters).
_wpn('my_blade', 'My Blade', 'sword', 'fire', 'stellar')   // → full def (power/cost/speed/crit/chipSlots auto-derived)
```
Append to `LEGENDARY_WEAPONS`; it appears in the shop + Profile with element-tinted SVG art and a
rarity frame, no code change. The catalogue is reconciled into every save on load (owned/upgradeLvl
preserved).

## Schemas & recipes

### `worlds.config.js`

```js
// chapters: the gameplay registry (drives rooms + which generator runs).
//   startRoom/endRoom/chapterIndex are computed at boot (01-data.js); generator wired in 07-main.js.
{ id, title, subtitle, storyTitle, system, roomCount, generator:null }

// STAR_SYSTEMS: atlas metadata for the nearby-stars map (Phase 1 Star Atlas).
{ id, name, chapterId, distanceLy, star, planets, fact, unlocked }
```
**Add a world/chapter:** append a `chapters` entry (set `roomCount`; leave `generator:null` — it is
wired at boot). Add a matching `STAR_SYSTEMS` entry with `chapterId` pointing at it and
`unlocked:true` when playable. Room ranges recompute automatically; `state.maxLevel` follows.

### `rooms.config.js`

```js
levelCodes    // string[10] — 4-letter Worm Hole password per room (index = room-1)
levelTitles   // string[10] — HUD title per room
formulaBank   // [{ label, original, subject, coeff, add, addSign, result }]  (change-of-subject problems)
sceneCaptions // string[10][5] — reward-scene caption per room, one per growth stage
```
**Add a room's code/title/captions:** extend the arrays (keep them aligned by index). **Add a
formula:** append to `formulaBank` (`coeff`/`add` are token letters or `null`; `addSign` is +1/−1).

### `planets.config.js`

```js
BODIES = { <roomNumber>: {
  room, art,        // art = key into PLANET_ART (14-lore.js): earth/moon/mars/venus/mercury/jupiter/europa/saturn/titan/neptune/sun
  name, kind, accent,
  blurb, fun,
  facts: [ [label, value], … ]   // shown in the astro card + Star Atlas
}}
BODY_ORDER = [1..10]
```
**Add a planet:** add a `room: {…}` entry + its room number to `BODY_ORDER`. For brand-new art, add
a matching generator to `PLANET_ART` in `js/14-lore.js` (the only code touch — art is logic).

### `story.config.js`

```js
STORY = { tagline, openingNarration:[…paragraphs], ending:[…] }   // verbatim player-facing text
CHAPTER_LORE = { <chapterId>: {
  storyTitle, system, intro, hook,
  memoryFragments: { <roomNumber>: { boss, title, text } }   // unlocked when that room's rank-3 boss falls
}}
```
**Add a chapter's story:** add a `CHAPTER_LORE[chapterId]` entry with a `memoryFragments` map keyed
by room number (the `boss` name should match the room's rank-3 enemy).

## Verifying a config change

Serve `game/` (local http server) and reload; the game should reflect the edit with **no code
change** and **no console errors**. If a value doesn't appear, check: (a) the `<script>` is in
`index.html`'s config block before `01-data.js`, and (b) the global isn't also declared in a `js/`
module. After any change to `formulaBank` or generators, re-run the algebra regression harness.
