# Process, Gotchas & Roadmap

← [docs orchestra](README.md)

## How the user works

- Iterates feature-by-feature, casually phrased, often with typos — treat each message as a scoped
  addition unless told otherwise. Cares about **correctness and pedagogy**, not just polish (caught
  that the balance scale shouldn't tilt for a valid-but-unsolved equation).
- Dislikes **reused animations/assets across planets** — keep genuine per-planet variety.
- Wants docs kept **in sync every code-changing turn** (this doc set + the orchestra's status table).
- Wants content **config-driven** so they can add star systems/planets/weapons later without code edits.
- **Back up before nontrivial changes.**

## Verification approach (no Node/Python installed)

Serve `game/` on a local PowerShell `System.Net.HttpListener` server (port **8791**), open
`game/index.html` in the Claude Browser pane, and call the globals via `javascript_tool` (a real
page → `document`/`localStorage`/`matchMedia` all work). Checklist for any change:

1. Reload; **`read_console_messages` clean** (zero errors) — a parse error breaks all later scripts.
2. Exercise the changed path via `javascript_tool` (call the functions, assert on `state`).
3. After any change to problem generation / equation / solving logic, **re-run the algebra
   regression harness** (the 1132-assertion set) — must stay green.
4. Use the **`mitb`** test account (infinite Cash/materials/passes/items, 1 question per planet,
   boss gate always open) for reachability; a normal profile for exact-count assertions.
5. **Screenshots time out** on this game (large bg image + infinite CSS animations) — verify via
   `read_page`/`javascript_tool`/DOM inspection instead.

## ⚠️ Known environment gotchas

- **Git Bash currently has a blind view of `game/`** (created by PowerShell): `ls game/` reports
  "No such file" while PowerShell and the browser see it fine. **Use PowerShell (or the Read/Write/
  Edit tools) for `game/` filesystem operations, not Bash.**
- **`.git` is empty/corrupted** — no git recovery; rely on the `game_backup_*` folders.
- **2026-07-12 data-loss incident:** during a session-limit interruption mid-workflow, the live
  `game/` folder + `.git` were wiped. Recovered by restoring the latest `game_backup_before_*`,
  re-extracting workflow-authored modules from the agent transcripts
  (`.claude/projects/…/subagents/workflows/wf_*/agent-*.jsonl` → `message.content[]` tool_use
  `Write` → `input.{file_path,content}`), and re-applying inline edits. **Read those transcripts as
  explicit UTF-8** (`[IO.File]::ReadAllLines($p,[Text.UTF8Encoding]::new($false))`) or every
  emoji/em-dash double-encodes into mojibake.
- **Config files are `.js`, not `.json`** (fetch is blocked over `file://`).

## Backups

Copy the whole `game/` folder before nontrivial changes (PowerShell `Copy-Item -Recurse`), naming
`game_backup_<before|after>_<change>_<timestamp>`. Recent: `…_before_config_*`, `…_after_config_*`,
`…_after_map_farm_batch_*`.

## Roadmap & phase status

The build follows **`Precalculus_Odyssey_Master_Plan.md`** (repo root), which implements
**`Precalculus_Odyssey_AI_Agent_Instructions.txt`** (the source of truth).

| Phase | Area | Status |
|---|---|---|
| 0 | Doc stabilization (source-of-truth, superseded list, modular docs) | ✅ done |
| 0.5 | Config extraction (star-system/planet/story/astronomy + gear/economy/elements/spells) | ✅ done |
| 1 | Navigation: global nav (Profile/Earth/Atlas/Star Log header), **Earth** hub (reframed map), Star Atlas system→planet drill-down + Travel, Go-Back-to-Earth (combat-retreat confirm) | ✅ done & verified |
| 2 | Profile (Stats/Gear/Inventory) + equip + currencies (Cash·Gold·Silver·Chips HUD) + **v1→v2 save migration** | ✅ done & verified |
| 3 | Trading Room (buy/sell Gold/Silver for Cash, fluctuating prices + sparkline + tx log, review-question-to-refresh) | ✅ done & verified |
| 4 | Weapon catalogue (30 items from the image) + deterministic SVG art + rarity frames + armor/shoes + AI-chip upgrades | ✅ done & verified |
| 5 | Wu Xing (generating + overcoming cycles, `elementMultiplier`, gear/enemy/spell elements, combat matchups) | ✅ done & verified |
| 6 | Spell system (14 config spells; real turn-based freeze/poison/burn/armorbreak/weaken/blind/stun/shield/haste) | ✅ done & verified |
| 7 | Wonderland: **Hoo Hey How** dice betting game (Cash) | ✅ done & verified |

**All master-plan phases are built and verified** (2026-07-13, autonomous build). New modules:
`21-catalogue.js` (weaponSVG + Wu Xing `elementMultiplier` + gear stats), `22-profile.js`,
`24-trading.js`, `25-nav.js` (Star Atlas + goToEarth), `26-spells.js` (status engine),
`27-hoohey.js`. New configs: `gear/economy/elements/spells.config.js`. Save is now `schemaVersion:2`
(currencies `{gold,silver}` + `chips{}` + armor/shoes/equip slots), migrating v1 materials
(essence→energy_core, gem→quantum_chip, gold+gems→gold, silver→silver) and reconciling gear against
the config catalogue on load. Verified live end-to-end; zero console errors; algebra core untouched.
Backup: `game_backup_fullbuild_complete_20260713_003733`.

## Superseded requirements (don't rebuild the old forms)

- Monster Essence / biological drops → **AI chips/components**.
- gold/silver/gems as upgrade materials → **tradeable currencies**; chips are the upgrade input.
  **Interface must show: Cash · Gold · Silver · Chips.**
- "Star Village" / old world names → **Earth** hub + **Star Atlas** (reuse the Star Log).
- 5 text weapons → 30-item illustrated catalogue; healing-only spells → Wu Xing spell system.
- Old plan phases R2–R6 → folded into master-plan Phases 1–7.
