# Precalculus Odyssey — Master Restructure Plan

**Companion to `Precalculus_Odyssey_AI_Agent_Instructions.txt` (the source of truth).**
Status: **PROPOSAL — awaiting approval. No implementation begins until this plan is approved.**
Author: agent · Date: 2026-07-12

This document is the "REQUIRED RESPONSE BEFORE CODING" deliverable requested by the instructions
file, section by section: (1) requirements gap table, (2) navigation diagram, (3) state/data model,
(4) save-migration plan, (5) files each phase modifies, (6) risks & conflicts, (7) acceptance tests,
(8) confirmation of no-code-until-approved.

> **🪐 Terminology:** a **chapter = a star system**, a **planet = a level** (Planet 1 = Earth …).
> Where this plan says "room" or "world" it means **planet** / **star system** (code identifiers
> like `roomCount` keep the legacy names). Canonical: `docs/README.md` → Terminology.

---

## 0. Guiding constraints (non-negotiable, from the instructions file)

- **Math first.** The planet/question screen stays clean, spacious, math-focused. RPG systems live
  behind buttons/drawers/other views — never crowded around the equation.
- **Architecture unchanged.** Ordered **classic scripts** sharing one global scope (works over
  `file://` AND `http://`). No ES modules, no build step, no framework.
- **Preserve saves.** Migrate existing player profiles; never silently reset or discard them.
- **Deterministic content stays deterministic** (a given enemy always drops from the same table;
  seed by enemy id, never per-player RNG for identity).
- **Verify for real.** Confirm files on disk, test in the live browser, check the console, and
  re-run the math regression harness after any change to problem generation / equation / solving.
- **Don't delete working systems** to change a UI; **don't redesign unrelated pages** in one pass.
- **Back up before every nontrivial change.** (Use PowerShell for `game/` FS ops — Git Bash
  currently has a blind view of the folder; see handoff.md incident note.)

---

## 0.5 Config-driven architecture (NEW user requirement — applies to EVERY phase)

**Goal (user's words):** all *content* — names, info, worlds/star-systems, rooms, planets, astronomy
facts, weapons/gear, enemies, spells, elements, materials/currencies, prices, story text, farm
crops/animals, items — lives in **config files**, separated from logic, so new content is added by
editing (or dropping in) a config with **zero logic changes**.

**How (must respect classic-script / `file://`):** `fetch()` of JSON fails over `file://`, so
configs are **classic `.js` files in `game/config/`** that assign global data objects, loaded as
`<script>`s BEFORE the logic modules that read them. Each file is **pure data, no behavior.**

```
game/config/
  worlds.config.js    → WORLDS    (star systems: id, name, distance, star facts, unlock, order)
  planets.config.js   → PLANETS   (per body: name, system, kind, accent, facts[], fun, artId)
  rooms.config.js     → ROOMS     (room → topic, warp code, difficulty band, boss id, generator-by-name)
  story.config.js     → STORY     (opening narration, ending, chapter lore, boss memory fragments)
  weapons.config.js   → WEAPONS   (the full catalogue — see Phase 4)
  gear.config.js      → SHIELDS / ARMOR / SHOES / ACCESSORIES
  chips.config.js     → CHIPS     (AI components + what they upgrade)
  enemies.config.js   → ENEMIES   (id, name, room, rank, element, stats, drop table)
  spells.config.js    → SPELLS
  elements.config.js  → ELEMENTS  (Wu Xing cycles + interaction rules)
  items.config.js     → ITEMS     (consumables / ingredients + prices)
  economy.config.js   → CURRENCIES, MATERIALS, trading params, hotel/farm prices
```

**Rules:** (1) config = data only; a problem generator is referenced **by name**
(`generator: 'generateBalanceQuestProblem'`, resolved at boot) to keep the load-order rule intact;
(2) logic modules read config at runtime and never hard-code content; (3) adding content = append a
config entry — no code edits; (4) a boot-time validation pass logs a console warning on malformed
entries so bad config fails loud, not silent.

**Documentation:** a new **`CONFIG_GUIDE.md`** documents every config's schema with copy-paste
recipes ("how to add a new world / room / weapon / enemy / spell") — the user's explicit ask.

**Phasing:** **Phase 0.5** extracts the *existing* hard-coded content (rooms, formulas, monsters,
current gear, story, astronomy) into `game/config/`, proving no behavior change via the harness +
browser. From then on **every phase authors its content as config** (Phase 4 weapons, Phase 5
elements, Phase 6 spells, …). Data that already lives cleanly in `01-data.js`/`14-lore.js`/etc. is
*moved*, not rewritten.

---

## 1. Requirements gap table (instructions §A audit — verified against the actual code)

Legend: ✅ working · 🟡 partial · 📄 doc-only (designed, not built) · ♻️ outdated form · ❌ missing

| # | Required system | Status | What exists today | Gap / action |
|---|---|---|---|---|
| 1 | Enemies = AI robots; drops = **AI chip / CPU / GPU / neural / quantum / alien processor / robotic alloy / energy core** | ♻️ | Enemies already framed as Archive-Mind guardian machines (story). Drops are **Monster Essence 🫀 + silver/gold/gem** (`09-items.js` `MATERIALS`, `rollMonsterLoot`) | Re-theme drops to component chips; migrate `essence`→a chip; keep precious metals but re-scope (see §2) |
| 2 | **Star Atlas** global; star-system list → planet list drill-down; rich system cards | 🟡 | **Star Log** (`14-lore.js`): Story + Star Atlas tabs, real astronomy for 10 Sol bodies, stylized SVG planets, boss memory fragments. Flat (all bodies at once); header-button entry only | Add star-system → planet hierarchy; make it reachable from a **global nav bar**; reuse all existing astronomy/art/story |
| 3 | Planet page stays question-focused; facts behind a compact Info control | ✅ (mostly) | Equation view is the planet page; a slim astro card shows name + 2 facts + "Star Log →" | Convert astro card to a compact **Planet Info** button/drawer so the equation owns the screen |
| 4 | **Earth** = home hub; global **"Go Back to Earth"**; combat-retreat confirm | 🟡 | A walkable **Map hub** was built this turn (`15-map.js`) with Weapon/Item/Hotel/Wonderland/Farm/Alchemy | **Reframe** the Map hub as **Earth** (don't rebuild); add the global button + "retreat resets enemy HP" confirm |
| 5 | **Profile + Inventory + Equipment** interface (stats, currencies, gear, chips, spells, quest items; equip/inspect/compare/upgrade/sell) | ❌ | Inventory *data* exists (`state.inventory`, weapons/shields arrays); **no screen** | Build a full `#profileView` (double-click profile + a button/touch alt) |
| 6 | **Wonderland** on Earth; **Hoo Hey How** with an obvious entrance | 🟡 | Wonderland (`17-wonderland.js`) + Tile Ball minigame + pass economy | Add **Hoo Hey How** (dice betting) inside Wonderland |
| 7 | **Trading Room** (cash/gold/silver/gems; buy/sell/change/history/holdings/transactions; review-to-refresh prices) | 📄 | Designed in old notes; **not built**. `MATERIALS.cashValue` exists as a hook | Build `#tradingView` with fluctuating prices + a review question to refresh |
| 8 | **Large data-driven weapon catalogue** + SVG art (no emoji as final art); categories, rarity, stats, element, chip slots | ❌/📄 | 5 text weapons + 5 shields (`01-data.js`). A `weaponSVG` generator exists only as a **demo Artifact**, not in the game | Build a `WEAPONS` catalogue module + port the SVG generator; add shields/shoes/armor/accessories |
| 9 | **Wu Xing** (Wood/Fire/Earth/Metal/Water; generating + overcoming cycles; affinities everywhere) | ❌ | None | Build `elements.js` with both cycles + affinity fields on weapons/enemies/spells/planets/chips |
| 10 | **Spell system** (freeze/poison/burn/armor-break/shield/heal/speed/accuracy/AI-hack/chip-disrupt + 5 elemental attacks; real turn-based status effects) | 🟡 | Heal spell + monster heal; **poison DoT** (this turn's Poison Vial). No Wu Xing/freeze/burn/etc. | Build a `SPELLS` data table + status-effect engine in combat |

**Already solid (keep, don't touch):** the equation-solving core (`04-logic.js`, deterministic,
1132-assertion harness), the chapter/mode registry, named profiles + autosave, the story/opening
narration, the reward-scene system, the audio module, and this turn's map/farm/wonderland/alchemy/
item-store/chest/hotel + the fixes (IR bug, hints-limit, 5-fail game-over, warp FX, balance.png).

---

## 2. Conflict & migration report (instructions §B)

| Old / current | New (source of truth) | Reconciliation |
|---|---|---|
| Drops = **Monster Essence** 🫀 (biological) | **AI chips / components** (CPU, GPU, neural, quantum, alien processor, robotic alloy, energy core) | Rename the drop tables; `rollMonsterLoot` returns components. **Migrate** old `state.materials.essence` → `inventory.chips` (a starter "Robotic Alloy" or "Energy Core") 1:1 |
| gold/silver/gem = **upgrade materials** (`state.materials`) | gold/silver/gems = **tradeable currencies** (Trading Room) | Split: precious metals become `state.currencies.{gold,silver,gems}`; **AI chips/components** become the upgrade inputs. Migrate counts across |
| `state.coins` (spendable "Cash") | `currencies.cash` | Keep `state.coins` as the live field OR alias to `currencies.cash`; migration copies the value. Least-risk: **keep `state.coins`** as cash and add `currencies` for the metals/gems only |
| vestigial `state.gems` | `currencies.gems` | Fold into currencies; retire the dead field |
| **"World Map" hub** (`15-map.js`, this turn) | **Earth** hub | Rename/reframe UI + add global button; keep the module & buildings |
| flat **Star Log** atlas | **Star Atlas** system→planet hierarchy | Extend `14-lore.js`; keep data/art/story |
| Old plan artifacts: R2–R6 phases, "Number Kingdom / Star Village / 6-world" names, casino-with-materials | superseded | Mark **Superseded** in handoff (Phase 0); Hoo Hey How is Cash-only |

**Determinism note:** enemy → component drop *table* is fixed per enemy id; only the per-kill *roll*
is random (as today). No per-player variation in which enemies/tables exist.

---

## 3. Page & navigation map (instructions §C)

Everything is a `.view-container` toggled by the existing `openX()/closeX()` pattern, plus a new
**global top nav bar** (always visible, lives OUTSIDE the view containers like the current header
actions). Existing views in **bold-italic** already exist.

```
GLOBAL NAV BAR (persistent):  👤 Profile · 🪐 Star Atlas · 🌍 Go to / Back to Earth · 🎯 Missions · 🔊 Music · ⚙️ Settings
                              (+ a compact HUD: Cash · Gold · Silver · Gems · HP · MP · 🎟️ passes)

├── 🌍 EARTH HUB  (#mapView, reframed from this turn's Map hub)
│    ├── ⚔️  Weapon Room ............ ***openShop*** (→ Phase 4 catalogue + SVG art)
│    ├── 🔄  Trading Room ........... #tradingView (Phase 3)
│    ├── 🧪  Equipment / AI-Chip Lab  #alchemyView + chip-install UI (extend this turn's Alchemy Lab)
│    ├── 🎡  Wonderland ............. ***#wonderlandView*** → 🎲 Hoo Hey How (Phase 7) + Tile Ball
│    ├── 🌾  Farm .................... ***#farmView***
│    ├── 🏨  Hotel .................... ***in-hub panel*** (heal for 15×level Cash)
│    ├── 🎯  Mission Center .......... #missionsView (Phase 1, light)
│    └── 🪐  Star Atlas .............. #starAtlasView

├── 🪐 STAR ATLAS  (#starAtlasView, extends the Star Log)
│    ├── Star-system list  (cards: name · you-are-here marker · locked/unlocked · #planets · fun fact · travelable?)
│    │     └── Selected system → Planet list
│    │            └── Planet → travel → the PLANET/QUESTION page (the equation view)
│    └── "Current location" indicator     (Ch.1 = Sol system; systems 2–9 recorded, unlock later)

├── 👤 PLAYER PROFILE  (#profileView, Phase 2 — double-click profile + button/touch alt)
│    ├── Stats: name · level · XP · HP · MP · ATK · DEF · Speed · elemental affinities
│    ├── Currencies: Cash · Gold · Silver · Gems
│    ├── Equipped: weapon · shield · armor · shoes · accessories · installed AI chips
│    ├── Inventory: weapons · shields · shoes · armor · consumables · chips · materials · quest items · spells
│    └── Actions: equip · unequip · inspect · compare · upgrade · sell

└── 🌍/🪐 PLANET (QUESTION) PAGE  (***#equationView***)
     └── Math question + tiles + op controls + progress + battle/mission controls
         Planet facts behind a compact "🪐 Planet Info" button/drawer (not inline clutter)
```

**Navigation state:** the flat `state.level` (1–133 rooms) stays the canonical progress counter;
`getChapterForLevel(level)` already derives the chapter = **star system**, and the body/planet is
derived per room (`BODIES` in `14-lore.js`). We add a light `state.location {starSystemId, planetId}`
only for Atlas UI, kept in sync with `level` — this preserves every existing save.

---

## 4. Proposed state & data model (instructions §D)

Additive + migration; **kept** fields keep working. `schemaVersion` gates migration.

```js
state = {
  schemaVersion: 2,                 // NEW — drives migrateSave()

  // ---- progress (KEEP; canonical) ----
  level, score, streak, levelSolves, solveClock, roomFails, maxLevel,
  heroLvl, heroXp, playerHp, playerMaxHp, playerMp, playerMaxMp,
  defeatedMonsters, trophies, codex, wonderPasses, passEarns, farm,   // all KEEP

  // ---- NEW: navigation (derived from level; for Atlas UI) ----
  location: { starSystemId: 'sol', planetId: 'earth' },

  // ---- currencies (Cash KEPT as coins; metals/gems promoted) ----
  coins,                            // = Cash 💵 (KEEP the field name; no churn)
  currencies: { gold: 0, silver: 0, gems: 0 },   // NEW (migrated from state.materials)

  // ---- inventory (weapons/shields KEPT as arrays; new buckets added) ----
  inventory: {
    weapons: [...],  shields: [...],            // migrate from state.weapons/shields
    armor: [],  shoes: [],  accessories: [],
    chips: {},                                   // component id -> count (migrated from materials)
    consumables: {},                             // = state.inventory today (potions, etc.)
    materials: {},                               // any non-chip crafting bits
    questItems: [],  spells: []
  },

  // ---- equipment (KEEP the equipped ids; add slots) ----
  equipment: {
    weaponId, shieldId,                          // migrate from equippedWeapon/equippedShield
    armorId: null, shoesId: null,
    accessoryIds: [], installedChipIds: []
  },

  // ---- NEW: economy ----
  trading: { prices: {}, history: {}, holdings: {}, transactions: [] },

  // ---- NEW: combat systems ----
  elements: { affinity: {} },                    // player elemental affinities (Wu Xing)
  activeStatus: {}                               // in-battle only; not persisted
};
```

**New data modules (static, not per-save):** `WEAPONS` catalogue, `CHIPS`/components, `ELEMENTS`
(Wu Xing tables), `SPELLS`, enemy element/affinity tags. These live in code, not the save (only
owned/upgrade state persists, matching today's weapons pattern).

---

## 5. Save-migration plan

- **Versioned, non-destructive, one-way.** On load, `applySnapshotToState` calls
  `migrateSave(snap)` when `snap.schemaVersion` is missing/older.
- **v1 → v2 mapping:** `coins`→stays; `materials.gold/silver/gem`→`currencies.gold/silver/gems`;
  `materials.essence`→`inventory.chips['energy_core']` (or a designated starter component);
  `weapons/shields`→`inventory.weapons/shields`; `equippedWeapon/Shield`→`equipment.weaponId/shieldId`;
  everything else copied as-is; set `schemaVersion=2`, derive `location` from `level`.
- **Guards:** every new nested field guarded with `|| {}` / `Array.isArray` (the existing 4-place
  rule — default in `01-data.js`, `getSaveSnapshot`, `applySnapshotToState`, `resetPlayerState`).
- **Safety:** back up `game/` before the migration lands; migration never throws (wrap in try/catch,
  fall back to a fresh-but-named profile only if the snapshot is unparseable — never wipe silently);
  keep a one-release read path for v1 so downgrades don't corrupt.
- **Acceptance:** load a real v1 profile (Room N, some coins/materials/gear) → all value/gear
  survive, appear in the new Profile, and re-save round-trips.

---

## 6. Phased implementation — files & acceptance tests

Ordered per the instructions file. Each phase: **one feature area, backed up first, verified in the
browser, handoff updated, harness re-run if logic changed.** Modules keep the `NN-name.js` +
`name.css` convention and register in `index.html` load order.

### Phase 0 — Stabilize documentation *(low-risk; can start immediately)*
- **Files:** `handoff.md` (add "Superseded Requirements" section; mark instructions file as source
  of truth — *done in part this turn*), `ROOMS_AND_CODES.md` (only if rooms/codes change — they
  don't), `knowledge.md` (record the Bash-blindness + UTF-8-transcript-extraction lessons), NEW
  `CONFIG_GUIDE.md` (stub the config schema doc, filled in as configs are created).
- **Accept:** docs name the source of truth, list superseded items, and match the code.

### Phase 0.5 — Config extraction *(foundational; do before content phases)*
- **Build:** the `game/config/` folder + config files listed in §0.5; move existing content
  (rooms/warp-codes/formula bank, monster catalog, current weapons/shields, story text, astronomy)
  out of the logic modules into config; logic reads from the globals. Generators referenced by name.
  Write the boot validation pass + `CONFIG_GUIDE.md`.
- **Files:** NEW `game/config/*.config.js`, `CONFIG_GUIDE.md`; EDIT `01-data.js`, `14-lore.js`,
  `06-rpg-battle.js`, `09-items.js` (read from config instead of literals), `index.html` (load
  config scripts first), `04-logic.js` (resolve generator-by-name).
- **Accept:** the 1132-assertion harness stays green (content unchanged, just relocated); rooms,
  warp codes, monsters, gear, story, astronomy all render identically; adding a demo weapon/room via
  a config edit alone appears in-game with no logic change; zero console errors.

### Phase 1 — Navigation & world structure
- **Build:** global nav bar (persistent) + compact currency/HP HUD; **Earth hub** (reframe
  `15-map.js`) + global **"Go Back to Earth"** (with combat-retreat confirm that resets enemy HP);
  **Star Atlas** system→planet hierarchy (`#starAtlasView`, extends `14-lore.js`); **Planet Info**
  compact control (convert the astro card); a light **Mission Center** stub.
- **Files:** NEW `21-nav.js`, `22-star-atlas.js`, `nav.css`, `star-atlas.css`; EDIT `15-map.js`
  (Earth reframe), `14-lore.js` (system list + planet list), `05-render.js` (Planet Info drawer),
  `index.html` (nav bar + new view divs + script/css tags), `styles.css`.
- **Accept:** nav bar shows on every screen; Star Atlas lists systems → click Sol → planet list →
  a planet opens the equation page; "Go Back to Earth" works from anywhere incl. combat (enemy HP
  resets); the equation screen is uncluttered (facts only behind Planet Info); zero console errors.
- **Do NOT** rebuild combat/economy here.

### Phase 2 — Profile, inventory, equipment + save migration
- **Build:** `#profileView` (double-click profile + button/touch alt) with Stats/Currencies/
  Equipped/Inventory tabs + equip/unequip/inspect/compare/upgrade/sell; the **currencies** split;
  the **v1→v2 save migration**; armor/shoes/accessory/chip inventory buckets + equipment slots.
- **Files:** NEW `23-profile.js`, `profile.css`; EDIT `01-data.js` (state shape), `03-save.js`
  (migration + 4-place), `06-rpg-battle.js` (equip actions reuse), `index.html`, `styles.css`.
- **Accept:** a migrated v1 profile shows all prior cash/materials/gear correctly; equip/unequip
  reflects in combat stats; sell/upgrade adjust currency + inventory; reload round-trips; no profile
  is ever reset.

### Phase 3 — Economy / Trading Room
- **Build:** `#tradingView` — buy/sell cash⇄gold⇄silver⇄gems at **fluctuating prices**, holdings,
  per-material **history sparkline**, transaction log; **review-question to refresh prices** (pool =
  all math up to the current room; prices only move on a correct answer).
- **Files:** NEW `24-trading.js`, `trading.css`; EDIT `index.html`, `styles.css`; reuse
  `generateProblem`/`modeRegistry` for the review question.
- **Accept:** exchange updates holdings + cash correctly; refresh only moves prices on a correct
  answer; history renders; transactions persist; the review question is drawn from learned material.

### Phase 4 — Equipment & art (weapon catalogue + AI-chip slots)

**Catalogue is authored in `weapons.config.js` / `gear.config.js` (per §0.5) directly from the
user's reference image — 30 legendary items across 6 categories**, each with a Wu Xing element, a
rarity tier, 3 AI-chip sockets, a unique-animation flag, and 4 upgrade states (Base / +1 / +2 / +3):

| Category | Item (element) ×5 |
|---|---|
| **Swords** | Axiom Blade (Metal) · Solar Meridian (Fire) · Tidal Paradox (Water) · Verdant Recursion (Wood) · Gravity Keystone (Earth) |
| **Bows** | Kepler Arc (Metal) · Fibonacci Longbow (Wood) · Cryo Crescent (Water) · Phoenix Plasma Bow (Fire) · Event Horizon Railbow (Metal) |
| **Spears** | Vector Lance (Metal) · Orbitbreaker Spear (Earth) · Root-Seeker Glaive (Wood) · Hydra Current Trident (Water) · Comet-Tail Naginata (Fire) |
| **Staves** | Scepter of Sigma (Metal) · Logarithm Staff (Water) · Celestial Abacus (Earth) · Prism of the Five Phases (**All**) · Infinity Relay (Metal) |
| **Heavy** | Titan's Equation (Earth) · Singularity Maul (Earth) · Iron Theorem (Metal) · Meteor Forge Axe (Fire) · Avalanche Engine (Water) |
| **Shoes** | Swift Equation Boots (Metal) · Cloud Strider Treads (Wood) · Tidal Surfer Greaves (Water) · Inferno Dashers (Fire) · Stonewall Stompers (Earth) |

**Rarity tiers (color + lore, from the image — ties into the Archive-Minds story):**
Legendary (gold) = ordinary endgame · **Archive** Legendary (purple) = ancient human AI tech ·
**Stellar** Legendary (blue) = evolved interstellar AI tech · **Rift** Legendary (red) = other-
universe tech · **Odyssey** Legendary (orange) = unique story weapons.

**Upgrade mechanics (from the image):** +1 = higher base stats + **minor effect**; +2 = stats
further + **enhanced effect**; +3 (Max) = massive stats + **ultimate ability**. Every weapon has
**3 AI-chip sockets** and a **unique animation** flag. Per-item config fields: `id, name, category,
element, rarity, baseAtk/spd/acc/crit, effectsByLevel[], chipSlots:3, uniqueAnim:true, price, desc`.

**Art — deterministic SVG generators, NOT hand-drawn 120 assets and NOT emoji** (matches the
image's 4-column Base→+3 look): `weaponSVG(category, element, upgradeLvl)` draws a base silhouette
per category (sword/bow/spear/staff/heavy/shoe), tinted by element color (Metal=silver-grey,
Fire=red-orange, Water=blue, Wood=green, Earth=amber-gold, **All**=prism/rainbow), with upgrade
decorations: **Base** clean → **+1** subtle elemental glow → **+2** aura + orbiting particles →
**+3** full elemental burst + rune accents. Rarity paints the card frame (gold/purple/blue/red/
orange). One generator family covers all 30 + future items → adding a weapon = one config line.

- **Also build:** shields/shoes/armor/accessories (same pattern); **AI-chip slots** (install/remove,
  chips modify stats); upgrade UI consuming chips/components (the essence→chip economy).
- **Files:** NEW `weapons.config.js` + `gear.config.js` + `chips.config.js` (data), `25-catalogue.js`
  (`weaponSVG` + render helpers), `26-chips.js`, `catalogue.css`; EDIT `06-rpg-battle.js` (shop
  renders catalogue + SVG + chip slots + rarity frames), `01-data.js`/`03-save.js` (owned/upgrade +
  installed-chip state, migrated), `index.html`.
- **Accept:** the weapon store shows all 30 illustrated items across the 6 categories with
  element-tinted art, rarity-colored frames, and the 4 upgrade renders; buy/equip/upgrade works;
  chips install into the 3 sockets and change stats; upgrade consumes components; **adding a new
  weapon via a single `weapons.config.js` entry shows up with correct art and no code change**;
  all persists; no emoji as final art; zero console errors.

### Phase 5 — Wu Xing
- **Build:** `ELEMENTS` = Wood/Fire/Earth/Metal/Water with **generating** (Wood→Fire→Earth→Metal→
  Water→Wood) and **overcoming** (Wood→Earth→Water→Fire→Metal→Wood) cycles; affinity fields on
  weapons/shields/armor/spells/chips/enemies/planets; damage/resistance logic using BOTH cycles
  (not a flat multiplier); UI indicators (element icons + "generating/overcoming" hints).
- **Files:** NEW `27-elements.js`, EDIT `06-rpg-battle.js` (combat math), catalogue/spell data,
  `styles.css`.
- **Accept:** unit tests for all element pairings (generating bonus, overcoming bonus, weakness,
  resistance); combat log explains the interaction; icons show on gear/enemies/spells.

### Phase 6 — Combat & spells
- **Build:** `SPELLS` table (freeze/poison/burn/armor-break/shield/heal/speed/accuracy/AI-hack/
  chip-disrupt + 5 elemental attacks) with `{id,name,icon,element,manaCost,targetType,power,
  duration,cooldown,statusEffect,description}`; a **turn-based status-effect engine** (freeze skips
  turns, poison/burn tick, armor-break lowers DEF, etc.) integrated with Wu Xing; enemy AI responses;
  combat-log explanations.
- **Files:** NEW `28-spells.js`, EDIT `06-rpg-battle.js` (status engine, spell menu), reuse this
  turn's poison DoT as the pattern; `index.html`, `styles.css`.
- **Accept:** freeze/poison/burn are real multi-turn effects (not cosmetic); mana/cooldown enforced;
  elemental spells respect Wu Xing; enemies react; log narrates each effect.

### Phase 7 — Wonderland completion
- **Build:** **Hoo Hey How** (dice betting, Cash-only) inside Wonderland with an obvious entrance;
  wire its rewards; keep Tile Ball; scaffold the "more games later" list.
- **Files:** NEW `29-hoo-hey-how.js`, `hoo-hey-how.css`; EDIT `17-wonderland.js` (entrance),
  `index.html`.
- **Accept:** Hoo Hey How is reachable from Wonderland, playable, pays out/loses Cash correctly,
  and persists; Tile Ball still works.

---

## 7. Risks & conflicts

- **Save migration = highest risk** (data loss). Mitigations: versioning, back up before landing,
  non-destructive one-way map, try/catch that never wipes, keep a v1 read path one release.
- **Scope is large — multi-session.** Each phase is independently shippable/verifiable; we stop and
  verify between phases. No phase depends on a later one being done.
- **Cluttering the math screen** (the doc's repeated warning). Guard: all RPG UI lives in other
  views/drawers; Phase-1 acceptance explicitly checks the equation screen stays clean.
- **Currency vs material model change** touches shop/upgrade/trading. Mitigation: do the model +
  migration in Phase 2 before Trading (Phase 3) and Catalogue (Phase 4) depend on it.
- **Determinism** must survive the essence→chip change (fixed drop tables per enemy id).
- **Wu Xing complexity vs kid-friendliness** — surface it with clear icons + plain-language combat
  log ("Fire melts Metal — super effective!"), not jargon.
- **Tooling gotcha (recorded):** Git Bash currently can't see `game/`; use PowerShell for `game/`
  FS ops; read agent transcripts as explicit UTF-8 to avoid emoji mojibake.
- **Regression:** any touch to problem generation/equation/solving → re-run the 1132-assertion
  harness (most phases don't touch it; Phase 3's review question reuses it read-only).

---

## 8. Consolidated acceptance tests (per phase, run live in the browser)

Each phase must pass its §6 acceptance list PLUS the global checks: **zero console errors**, a real
**v1 profile migrates and round-trips**, the **math screen stays uncluttered**, the game loads over
both the http server and (spot-check) `file://`, and the **algebra harness stays green** whenever
logic is touched. Testing uses the `mitb` test account (infinite resources) for reachability and a
normal profile for exact-count assertions.

---

## 9. Confirmation

**No implementation will begin until this plan is approved.** On approval I will proceed in phase
order (starting with Phase 0, then Phase 1), backing up before each phase, verifying in the live
browser, and updating `handoff.md` every code-changing turn. Tell me if you want the order changed,
scope trimmed, or any decision (e.g., the currency/material split, or whether "Cash" stays
`state.coins`) settled differently before I start.
