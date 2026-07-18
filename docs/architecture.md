# Architecture

← [docs orchestra](README.md)

## What it is

`game/index.html` is the entry point: markup only, linking the CSS and an **ordered list of classic
`<script>` files** that share **one global scope**. Not ES modules, no bundler, no build step — so
the game runs identically over `http://` (the local test server) and `file://` (double-click).
Root `Game_0.2.html` is a `<meta refresh>` redirect to `game/index.html` for old shortcuts.

## Load order (in `index.html`)

Order matters: a file may reference another file's globals **at runtime** freely, but **top-level
code that uses a value from a later file at load time** breaks. Current order:

```
config/worlds.config.js     ← content data (pure). Loads FIRST so logic can read it.
config/rooms.config.js
config/planets.config.js
config/story.config.js
config/curriculum.config.js  65 arenas (6 condensed pre-algebra warm-ups + 59 Bible phases, one per phase); CURRICULUM_ROWS + getArena/arenaByCode/CURRICULUM_MAX
config/generated/*.js        8 registries BUILT from the Question Bible by tools/build-registries.ps1 (do not hand-edit): curriculum-index, arena-registry, question-templates (QUESTION_TEMPLATES[phaseId]=[templates]), hint-registry (HINT_REGISTRY[hintSeqId]=[6 rungs]), tutorial-registry (TUTORIAL_REGISTRY["Tut-Pnnn"]={sections}), socratic-registry (SOCRATIC_REGISTRY["Soc-Pnnn"]={branches}), misconception-registry, prereq-graph
js/01-data.js               state object, chapter range computation, getChapterForLevel
js/02-dom.js               the `el` id-cache + reduceMotion
js/03-save.js              localStorage profiles: load/save/migrate/dedupe/render/reset
js/04-logic.js             PURE LOGIC (browser-testable): problem gen, hints, modeRegistry, applyOp/applyFormulaOp/solveFully, sameToken
js/09-items.js             materials, loot, upgrade recipes, ITEMS/consumables, wonder-pass economy
js/14-lore.js              story/astronomy RENDER logic (planet SVG, codex/atlas/narration views, unlock helpers) — reads story/planets config
js/05-render.js            economy helpers, updateStats, renderEquation, panels, scenes, loadProblem, gate/lives/game-over, warp FX
js/06-gear-shop.js         shop + upgrades + window.rpgActions (split 2026-07-18; see below)
js/06b-monster-roster.js   monster art/build/roster/gauntlet-chain generation
js/06c-monster-select.js   monster-select screen + gauntlet/easy/arena cards
js/06d-combat-round.js     the live combat round + spell casting
js/06e-combat-outcome.js   victory/defeat outcomes + advanceToNextLevel
js/13-audio.js             background music (WAV loops) + SFX placeholders + mute
js/15-map.js               star-system / Earth hub (walkable map, hotel)
js/16-chest.js             victory treasure-chest overlay (pure presentation)
js/17-wonderland.js        Wonderland lobby + Tile Ball minigame
js/18-farm.js              Farm (crops/animals, market, solve-clock growth)
js/19-alchemy.js           Laboratory (synthesize ingredients+materials → Super Medicine/Acid Vial)
js/20-item-store.js        Item Store (buy/use consumables)
js/28-arena-generators.js  ARENA_GENS — pre-algebra generators; a stamping loop labels the atlas but SKIPS Bible arenas (phaseId) and Equation-Battle arenas (numeric/formula/bracket) so their config mechanic is preserved
js/29-tutorial.js          "How to play" tutorial overlay: renders TUTORIAL_REGISTRY sections (Learning goal→Common mistakes) as paged steps for Bible arenas + 3 live worked examples; _mdLite markdown-lite renderer (reused by Socratic)
js/30-bodyart.js           window.bodyArtSVG — universal shaded-sphere art for every body (all systems)
js/31-graph.js             coordinate-geometry graphs: buildGraphSVG + interactive tap-a-point / draw-a-line (#graphPanel)
js/32-tooltip.js           global cursor-following tooltip (#gameTooltip): data-tooltip + auto-upgrades native title=; keyboard/touch aware
js/33-variety.js           question-variety engine: buildArenaTrial(n) composes a 10-Q trial of mixed styles; RETURNS NULL for Bible arenas (phaseId) so they use the native registry-served questions
js/37-socratic.js          Socratic "Ask the tutor" chat: choose-your-response dialogue over SOCRATIC_REGISTRY branches (askTutor/socPick/closeTutor); exit screen routes to hint/tutorial ("I don't understand")
js/34-wonder-games.js      Wonderland carnival games (Bullseye Numbers, Gone Fishin', Merry Math-Go-Round) + shared wg* mini-game helpers + wgStopAll
js/35-block-forge.js       Quantum Block Forge — original turn-based block-placement puzzle (pure qbfCanPlace/qbfClearLines/qbfAnyPlaceable)
js/36-arcade.js            Wonderland arcade games: Star Match (memory) + Mini Sudoku (4×4); shared agTopBar (← Back + player Cash/Passes) + agStopAll (wired into wgStopAll). FOCUSED PLAY MODE: wonderland.css uses body:has(#wonderlandView.active) to hide the whole app chrome so game rooms get the full screen
js/cloud-save.js           OPT-IN cloud layer around localStorage: account/recovery, debounced sync, revision/conflict, offline retry (window.Cloud)
js/cloud-ui.js             Cloud Save panel + header status chip (openCloudPanel, updateCloudStatusUI, export/import, conflict UI)
js/cloud-auth.js           account login/register over an illustrated hero welcome screen (renderStart adds .auth-dock-mode → game/assets/welcome-hero.png backdrop + a two-wing "auth dock" at the bottom: username+tabs left wing, password+Log-in right wing, straddling the portal; ref game/assets/precalculus_odyssey_login_designed_fixed.html) with a show/hide password eye (authToggleEye) and an admin-reset "Recover access" (authRecover); full-screen ADMIN dashboard (authOpenAdmin): approval waiting-list + per-player details (settings/level/arenas/per-arena stats); pushes progress to D1 every 25s (authStartProgressSync, admin/test account excluded)
--- server (Cloudflare, deployed from repo ROOT, not game/) — see CLOUD_SETUP.md ---
functions/api/cloud/*      Pages Functions: account.js, account/recover.js, profiles.js, profiles/[profileId].js, _shared.js (D1 binding `DB`, auth helpers: hashPassword/authAccountFull/authAdmin/TEST_USERNAMES)
functions/api/auth/*       account auth: register.js (captures cf.city/country + IP), login.js (approval-gated, single active login except test accounts), logout.js, progress.js (player pushes progress_json)
functions/api/admin/*      admin-only: accounts.js (list), account.js (approve/reject/disable/makeAdmin/setPassword), player.js (one player + progress), bootstrap.js (idempotent column-adds + seeds admin/admin — which is ALSO the test account — and removes the old mitb; key=odyssey-setup-2pi)
migrations/0001_cloud_saves.sql   D1 schema (cloud_accounts, cloud_sessions, player_profiles)
migrations/0002-0006_*.sql        auth columns, seed admin (also the test account; old mitb removed via bootstrap), registration details (ip/city/country), progress_json
wrangler.toml              Pages config: static output = game/, D1 binding DB
tools/local-save-server.ps1       optional localhost companion for C:\temp backups
js/07-main.js              ALL event wiring + boot (loads last of the main scope); wires chapter generator, initLore(), initMuteBtn()
js/08-layout.js            widescreen-dashboard DOM-reparenting IIFE (self-contained)
```

**Load-order hazards that were neutralized (keep them so):** `chapters[0].generator` is `null` in
config and wired in `07-main.js`; `modeRegistry.formula.caption` is a lazy `function(){…}` because
its target lives in `05-render.js`. If you add a top-level object holding a function from a
later-loading file, wrap it lazily or wire it in `07-main.js`.

## Config-driven architecture (the "add content without code" layer)

All game **content** lives in `game/config/*.config.js` — pure-data classic scripts loaded before
the logic modules. Logic reads the config globals; **adding a star system/planet/story/(soon
weapon/enemy/spell) is a config edit, not a code change.** Full schemas + recipes:
**[CONFIG_GUIDE.md](../CONFIG_GUIDE.md)**.

- Config is `.js` (not JSON) because `fetch()` of JSON is blocked over `file://`.
- Config = data only; a generator is referenced by **name** (string), resolved at boot.
- A config global is declared **only** in its config file (never also in a `js/` module, or the
  later copy shadows the config). The `js/` modules were emptied of the extracted literals.
- **In config (`game/config/`):** `worlds` (`chapters`/`STAR_SYSTEMS`), `rooms`
  (`levelCodes`/`levelTitles`/`formulaBank`/`sceneCaptions`), `planets` (`BODIES`/`BODY_ORDER`),
  `story` (`STORY`/`CHAPTER_LORE`), `gear` (`WEAPONS`/`SHIELDS`/`ARMOR`/`SHOES` + rarity),
  `economy` (`CURRENCIES`/`CHIPS`/recipes/`TRADING`), `elements` (Wu Xing), `spells` (`SPELLS`).
- **Still in code (later cleanup):** the enemy roster (`monsterCatalog`, `06b-monster-roster.js`) and
  consumable `ITEMS` (`09-items.js`).
- **RPG-systems modules added (2026-07-13 full build):** `21-catalogue.js` (weaponSVG + Wu Xing
  `elementMultiplier` + gear stat helpers), `22-profile.js`, `24-trading.js`, `25-nav.js` (Star
  Atlas + goToEarth + the "About this body" info modal, which offers a **📷 See real photo**
  lightbox — `BODY_PHOTOS` maps a normalised body name to a JPEG bundled LOCALLY under
  `game/assets/bodies/` (NASA/Wikimedia public-domain, ~640px, no external URLs) — only for the
  ~23 Sol-System bodies we have a photo for. The 42 bodies with no real photo (exoplanets, Eris)
  show a **🎨 Artist's impression** caption under the procedural art instead of the photo button
  (condition: `!bodyPhotoUrl(b)`),
  `26-spells.js` (status engine, loads after `06` to override `openSpellsMenu`),
  `27-hoohey.js`. All load before `07-main.js`. Views: `#profileView`/`#tradingView`/
  `#starAtlasView`/`#hooHeyView` (+ the hub reframed as **Earth** in `15-map.js`). Global nav lives
  in `index.html`'s `.header-actions`. CSS for all of it is `game/css/systems.css`.

## Bible curriculum & learning support (question engine + hints/tutorial/Socratic)

The 59-phase **Question Bible** (`Precalculus_Odyssey_Bible_v5_Codex_Package/`) is compiled by
`tools/build-registries.ps1` into `config/generated/*.js` (PowerShell only — no Node/Python). The
game reads those registries at runtime; **there is no MD parsing in the browser**. Rebuild the
65-arena `curriculum.config.js` from the stable body source with `tools/rebuild-curriculum.ps1`
(preserves each arena's astronomy body by slot number, so photos/facts never shift).

- **Serving (`04-logic.js generateProblem`)** routes by mechanic: `numeric/formula/bracket` →
  native **Equation Battle** balance solver (LOCKED requirement — never flattened to MC); else if
  the arena has a `phaseId` → `bibleProblem()` serves a `QUESTION_TEMPLATES[phaseId]` template
  (recent-template memory avoids repeats); else pre-algebra `ARENA_GENS`.
- **Distractor repair:** batch-generated phases P021–P054 shipped placeholder "recipe" distractors;
  `bibleProblem` detects these and substitutes real, shape-matched **sibling-answer** distractors,
  and strips escaped-quote artifacts. (Upstream fix — regenerate real distractors — still pending.)
- **Hints:** `getHintLadder()` → `HINT_REGISTRY[hintSeqId]` = 6 rungs (nudge→…→full solution);
  `renderHintPanel()`/`hideHintPanel()` (05-render.js) drive the `#hintPanel` ladder UI. Native
  battle modes fall back to one live, state-aware rung. Available on every question.
- **Tutorial:** `29-tutorial.js` renders `TUTORIAL_REGISTRY["Tut-Pnnn"]` sections as paged steps.
- **Socratic:** `37-socratic.js` renders `SOCRATIC_REGISTRY["Soc-Pnnn"]` as a choose-your-response
  chat. Registries are keyed by tutorialId/socraticId, looked up from the arena's `phaseId`.

## Global `state`

Defined in `01-data.js`, saved wholesale by the profile system (see
[save-and-audio.md](save-and-audio.md)). Every **new saved field** must follow the **4-place rule**
(default + `getSaveSnapshot` + `applySnapshotToState` + `resetPlayerState`). Current fields include:
progress (`level, score, streak, levelSolves, solveClock, roomFails, heroLvl, heroXp, hp/mp`),
economy (`coins`, `materials`), collections (`weapons, shields, defeatedMonsters, trophies, codex`),
and the hub systems (`wonderPasses, passEarns, inventory, poisonArmed, farm`).

## Testing without Node/Python

Neither is installed. Serve `game/` on a local PowerShell `HttpListener` server (port 8791) and use
the Claude Browser tool's `javascript_tool` to call the globals directly (`generateProblem(5)`,
`applyOp(...)`, read `state`/`chapters`/`BODIES`, etc.) — a real page, so `document`/`localStorage`
just work. See [process-and-roadmap.md](process-and-roadmap.md).
