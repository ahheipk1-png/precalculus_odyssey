# 🎼 Precalculus Odyssey — Documentation Orchestra

> **New AI agent taking over?** Read **[`AiAgentReadMe.md`](../AiAgentReadMe.md)** (repo root)
> FIRST — it has the deploy pipeline (GitHub → Cloudflare Pages), connection details, the
> non-negotiable workflow rules, and the current-state summary. Then come back here.

This is the **orchestrator**: start here, then jump to the module doc you need. Documentation is
split by area so each stays small and current. **When you change code, update the matching module
doc (and this file's status table) in the same turn** — the long-standing project rule.

> **Precalculus Odyssey** is a browser math-RPG (HTML/CSS/JS, no build step) that teaches
> algebra→precalculus by solving equations, wrapped in an RPG + astronomy story. Entry point:
> `game/index.html`.

## 🪐 Terminology (canonical)

The game's structure uses **astronomy terms**: a **chapter = a star system** (Chapter 1 = the Sol
system) and a **planet = a level/stage** (Planet 1 = Earth … Planet 10 = Neptune). Everything the
**player sees** and **all documentation** use **star system / planet**. Only **internal code
identifiers** (and a couple of config filenames) still say **"world" (= star system)** and **"room"
(= planet)** — e.g. `roomCount`, `getRoomBoss`, `roomInChapter`, `state.roomFails`,
`config/rooms.config.js`, `config/worlds.config.js`. Those names are deliberately kept (renaming
them risks breaking the working game); when a doc names one, read "room" as "planet".

## ⭐ Source of truth (priority order)

1. The user's latest direct message.
2. **`Precalculus_Odyssey_AI_Agent_Instructions.txt`** (repo root) — the master requirements.
3. **`Precalculus_Odyssey_Master_Plan.md`** (repo root) — the approved phased build plan.
4. These `docs/*.md` module docs (current architecture & behavior).
5. `ROOMS_AND_CODES.md`, `CONFIG_GUIDE.md` (specific references).
6. `handoff.md` — retained as the **detailed session-by-session history/archive**; superseded as
   the primary reference by this `docs/` set, but still the deepest record of *why* things are.

## 📁 Documentation map

| Doc | Covers | Update it when… |
|---|---|---|
| [architecture.md](architecture.md) | Module system, load order, classic-script rules, **config-driven architecture**, file/module map | You add/rename a module or config, or change load order |
| [config.md → CONFIG_GUIDE.md](../CONFIG_GUIDE.md) | Every `game/config/*.config.js` schema + "how to add a world/room/planet/story" recipes | You add or change a config file/field |
| [gameplay.md](gameplay.md) | Equation-solving core, the question styles, the **65-arena curriculum** across 11 real star systems (`curriculum.config.js`), scoring, lives/hints/game-over, warp, reward scenes | You touch problem generation, solving, planets, or the planet UX |
| [../ROOMS_AND_CODES.md](../ROOMS_AND_CODES.md) | ⚠️ STALE (still describes an old 133-planet map) — the live curriculum is 65 arenas / 11 systems in `curriculum.config.js`; regenerate or retire | You want the human-readable per-system topic list |
| [rpg-combat-economy.md](rpg-combat-economy.md) | Monsters, combat loop, spells/poison, victory chest, trophies, shop, upgrades, cash/materials economy | You touch battle, the shop, drops, or upgrades |
| [balance-design.md](balance-design.md) | **The authoritative stat/curve design** — damage formulas, dodge/power-hit/spell reliability, the AP*/boss checkpoint tables, gear schedule, feel targets | You tune ANY combat/economy number — change the doc first, then mirror into `BAL` (economy.config.js) |
| [world-and-hubs.md](world-and-hubs.md) | Map/Earth hub, hotel, Wonderland (+Tile Ball, passes), Farm, Alchemy Lab, Item Store | You touch any hub destination module |
| [story-astronomy.md](story-astronomy.md) | Story/narration/tagline, Star Log (Story + Star Atlas), planets/astronomy, boss memory fragments | You touch story text, the codex, or astronomy |
| [save-and-audio.md](save-and-audio.md) | Save/profiles, the 4-place persistence rule, save migration, the audio module | You add a saved `state` field or touch audio |
| [process-and-roadmap.md](process-and-roadmap.md) | How the user works, verification approach, backups, **known gotchas** (Bash-blind FS, UTF-8), phase status, superseded requirements | Any session — read before starting; update the phase status as phases land |
| [playtest-methodology.md](playtest-methodology.md) | **Reusable how-to for playing the game as a human** (not calling functions) — local no-password session setup, reading/clicking the equation screen, the JS-handler fallback for non-accessible shop/hub/battle buttons, known tool limitations | You're asked to playtest/evaluate feel (question difficulty, combat pacing, economy motivation) rather than verify generator correctness |

## 🚦 Build status (high level; details in [process-and-roadmap.md](process-and-roadmap.md))

- **Done & verified:** the equation core + chapter/mode registry; named profiles + autosave;
  story/opening narration + Star Log (story + astronomy); RPG R1 economy (cash + materials + drops);
  audio; the hub/Wonderland/Farm/Alchemy/Item-Store/Chest/Hotel batch; the fixes (IR=V bug, hints
  limit, 5-fail game-over, warp FX, `balance.png`); **Phase 0.5 config extraction** (world/room/
  story/astronomy content now in `game/config/`).
- **Next (per the master plan):** Phase 1 navigation (Earth hub + global nav + Star Atlas drill-down)
  and Phase 4 weapon catalogue (30 items from the user's reference image, config-driven SVG art).
- **Also built since:** Profile/Inventory UI, the **Cash · Gold · Silver · Chips** currency HUD (with
  hover tooltips on every chip), Trading Room (with an arena-style review question drawn from the last
  5 planets played), Star Atlas navigation, and **Hoo Hey How** (animated dice-roll betting).
- **Not built yet:** weapon catalogue, Wu Xing, full spell system; essence→AI-chip migration.

## 🔑 Golden rules (apply to every change)

1. Keep the **math screen uncluttered** — RPG systems live in other views/drawers.
2. **Classic scripts** sharing one global scope (works over `file://`) — no ES modules, no build.
3. **All content in `game/config/`**, logic reads it — adding content = a config edit.
4. **Preserve saves** via migration; never silently reset a profile.
5. **Back up before nontrivial changes** (use PowerShell for `game/` FS ops — Git Bash is currently
   blind to the folder; see process-and-roadmap.md).
6. **Verify on disk + in the live browser**, check the console, re-run the algebra harness after any
   logic change.
