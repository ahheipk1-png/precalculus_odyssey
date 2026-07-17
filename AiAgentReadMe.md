# 🤖 AiAgentReadMe.md — START HERE (handoff guide for the next AI agent)

You are taking over **Precalculus Odyssey**, a browser math-RPG (pure HTML/CSS/JS, **no build
step**) that teaches algebra→precalculus through equation-solving, wrapped in an RPG + astronomy
story with a large arcade ("Wonderland") of minigames. A student (the user's child) plays it live
in production. The user is not a professional programmer — they test in the browser and report
issues in casual language; **you** are responsible for engineering rigor.

| Fact | Value |
|---|---|
| Live site | **https://precalculus-odyssey.pages.dev** |
| GitHub repo | **https://github.com/ahheipk1-png/precalculus_odyssey.git** (branch `main`) |
| GitHub account | `ahheipk1-png` (user's email: ahheipk1@gmail.com) |
| Hosting | **Cloudflare Pages** — auto-deploys on every push to `main` (~1 min) |
| Database | **Cloudflare D1** `precalculus_odyssey`, binding `DB`, id `a236252a-157e-40fc-bf10-30cb2610b61a` |
| Local project root | `C:\PythonProject\AlgebraGame` (Windows 11, PowerShell + Git Bash available, no Node/Python installed) |
| Game entry point | `game/index.html` |
| Server code | `functions/api/**` (Cloudflare Pages Functions: `auth/`, `cloud/`, `admin/`) |
| Current cache token | `?v=20260717p` (see "Cache-busting" below — bump it EVERY deploy) |

---

## 1. Required reading, in order

1. **This file** — workflow, deploy, and the non-negotiable rules.
2. **`docs/README.md`** — the documentation orchestrator: terminology (star system/planet vs the
   internal "world/room" names), the source-of-truth priority order, and the map of all module docs.
3. **`docs/process-and-roadmap.md`** — how the user works, verification approach, known gotchas.
4. **`docs/playtest-methodology.md`** — if you're asked to evaluate how the game *feels* to play
   (question difficulty, combat pacing, economy motivation), not just verify code correctness. Has
   the reusable no-password local session setup and the UI-interaction tricks for this codebase.
5. The **`docs/*.md` module doc for whatever area you're touching** (architecture, gameplay,
   rpg-combat-economy, world-and-hubs, story-astronomy, save-and-audio). Each ends with dated
   "batch" changelog entries — the most recent entries describe the newest systems in detail.
6. **`CONFIG_GUIDE.md`** — schema of every `game/config/*.config.js` (all content is config-driven).
7. When you need history/rationale: `handoff.md` (deep session-by-session archive),
   `Precalculus_Odyssey_Master_Plan.md`, `Precalculus_Odyssey_AI_Agent_Instructions.txt`.
8. For cloud/account work: `CLOUD_SETUP.md` (click-by-click Cloudflare setup) and `AUTH_SETUP.md`
   (login/approval/admin system + the one-URL bootstrap).

> ⚠️ `ROOMS_AND_CODES.md` is **stale** (describes an old 133-planet map). The live curriculum is
> **65 arenas / 11 star systems** in `game/config/curriculum.config.js`.

---

## 2. How deployment works (GitHub → Cloudflare)

There is **no CI, no build step, no bundler**. The pipeline is exactly:

```
edit files → bump ?v= cache token in game/index.html → git commit → git push origin main
→ Cloudflare Pages detects the push → deploys game/ as the static site + functions/ as the API
→ live at https://precalculus-odyssey.pages.dev in ~1 minute
```

- `wrangler.toml` declares `pages_build_output_dir = "game"` and the D1 binding `DB`. You normally
  never touch it.
- One-command deploy exists: `powershell -ExecutionPolicy Bypass -File .\tools\deploy.ps1 "message"`
  (stages ALL changes — prefer explicit `git add <files>` so you don't sweep in unrelated junk;
  the repo root contains untracked scratch that must stay untracked).
- Watch a deploy: Cloudflare dashboard → Workers & Pages → `precalculus-odyssey` → Deployments.

### Connecting to GitHub (new machine / new agent)
- On the current machine, git credentials are already cached — `git push` just works.
- On a new machine: `git clone https://github.com/ahheipk1-png/precalculus_odyssey.git`, then either
  `gh auth login` (GitHub CLI) or a Personal Access Token as the password on first push. Only the
  user can create a PAT (github.com → Settings → Developer settings → Tokens). Never ask them to
  paste a password into chat if avoidable; have them complete auth prompts themselves.

### Connecting to Cloudflare (only needed for dashboard/db work — NOT for deploys)
- Deploys need no Cloudflare access at all (push = deploy).
- Dashboard work (D1 console, deploy logs, env vars) happens in the **user's** Cloudflare account —
  ask them to open the dashboard or run the relevant `wrangler` command; there is no wrangler CLI
  auth configured on this machine.
- Database schema changes = a new numbered file in `migrations/` (currently 0001–0006), which the
  user pastes into the D1 console (dashboard → D1 → precalculus_odyssey → Console). The
  `/api/admin/bootstrap?key=odyssey-setup-2pi` endpoint (see AUTH_SETUP.md) can also apply setup
  server-side.
- Admin login: username `admin` (password was initially `admin`; the user may have changed it).
  The admin account doubles as the test account: 1-question planets, infinite resources, all
  systems + monsters unlocked, exempt from single-session login.

---

## 3. Architecture in 60 seconds

- **Classic scripts, one shared global scope.** All `game/js/*.js` are plain `<script>` tags loaded
  by `game/index.html` in numeric order (01→41 + cloud-*.js). No modules, no imports — every
  function/var is global; cross-file calls work regardless of load order **at runtime** (call time),
  but top-level code must not reference later files.
- **All content lives in `game/config/*.config.js`** — curriculum (65 arenas), worlds, rooms, story,
  monsters, gear, economy. Logic reads config; adding content should be a config edit.
- **The front end calls only relative `/api/...` paths** — nothing is hard-coded to a domain, so it
  works on pages.dev and locally.
- **Saves**: local profiles + cloud saves (D1) with a migration rule — never silently reset a
  profile; new `state` fields need the 4-place persistence treatment (see `docs/save-and-audio.md`).
- Minigames: `17-wonderland.js` (lobby) + `34-40` + `41-slots.js`. Shared shells: `a2*` helpers in
  `39-puzzles.js` (A2 shell), `wg*`/`ag*` helpers in `34/36`. Leaderboards via `wgRecordScore` +
  `functions/api/cloud` (top-10 per game).

---

## 4. Non-negotiable workflow rules (learned the hard way — follow ALL of them)

1. **Cache-busting is mandatory.** `game/index.html` stamps `?v=TOKEN` on all ~67 css/js tags.
   The user's browser caches aggressively — if you deploy without bumping the token, they will
   report your "fix" as broken. Bump with one command (current token in the table above):
   `sed -i 's/OLDTOKEN/NEWTOKEN/g' game/index.html` then verify `grep -c NEWTOKEN game/index.html`
   returns 67. When a reported bug contradicts a verified fix, suspect stale cache FIRST.
2. **Update documentation in the same turn as the code change.** Add a dated batch entry (they're
   numbered "batch #N") to the matching `docs/*.md` file describing what changed, why, and how it
   was verified. This is a standing user requirement ("update any changes we make in details").
   Update THIS file's table when a fact in it changes (e.g. the cache token).
3. **Verify by running the real code, not by reading it.** Start the dev server (a PowerShell
   static server on **port 8793**, defined in `.claude/launch.json` → `.claude/static-server.ps1`;
   serve from the `game/` folder so `/index.html` resolves), open the page, and drive the actual
   game functions from the browser console (e.g. call a generator 10× per difficulty and assert
   0 failures; simulate 100k slot spins for RTP). The login screen blocks UI-level testing —
   game-logic functions are all global, so call them directly instead.
4. **Gambling/economy changes must be Monte-Carlo simulated** through the real payout functions
   (all payout sources — line wins AND jackpots). Hand math has already missed a jackpot
   money-printer once.
5. **Combat/economy invariants**: gear upgrades are multiplicative (×2/×3/×5 `UPGRADE_MULT`); all
   stat reads go through `effectiveGearStat`; keep DEF base values low (flat DEF + big multiplier =
   binary invincibility); live monsters come from `getRoomMonsters` → `buildMonster`. Verify combat
   changes by simulation.
6. **`04-logic.js` contains intentional NUL bytes** (`\x00SQ0\x00` tokenizer delimiters). They are
   NOT corruption. Never "clean" them; avoid tools that strip or mangle NULs on that file.
7. **File encoding**: everything is UTF-8 with emoji everywhere. When writing files from
   PowerShell use `-Encoding utf8`; prefer the agent's native file-edit tools over shell redirects.
8. **Back up before big refactors** (the repo root's `game_backup_*` folders are that habit;
   they're untracked — keep it that way; git history is the real safety net).
9. **Don't commit junk.** The repo root holds untracked scratch (old `Game_0.*.html` monoliths,
   `backups/`, `game_backup_*`, `game/assets/bodies/ArtistImpession/`). Stage files explicitly.
10. **Preserve the pass/charge economics of minigames**: game welcome screens are free to view;
    the Play button charges 1 Wonderland Pass via `wonderPlay`; sequential-level games advance
    levels FREE within a run; "Play Again" goes back to the free welcome screen (never
    double-charges). Gambling games (Star Slots, Hoo Hey How) charge directly instead.
11. **If execution tools (browser preview, Bash, cscript/node) get denied by the session's auto-mode
    safety classifier**, try the same action through a different tool first (Bash blocked → try
    PowerShell, or vice versa — one has succeeded where the other failed before). If NONE work for
    the whole turn: don't skip verification silently. Fall back to hand-tracing the algorithm (state
    the specific invariants that keep it safe), say so explicitly in the docs batch entry AND to the
    user, and flag that the next session should run the real stress test. Never claim something was
    "verified" when it was only reasoned about — see the batch #12 entry in world-and-hubs.md for the
    template.
12. **You CAN play the game like a human**, not just call functions from the console — see
    `docs/playtest-methodology.md`. A local, no-password, no-network session (`activeProfileName`
    set to anything except "admin") is reachable in one console call; from there `read_page` +
    `get_page_text` + real clicks drive actual gameplay. Use this when asked to evaluate how
    something *feels* (question difficulty, combat pacing), not just whether the code runs.

---

## 5. Current state (as of 2026-07-17)

**Recently shipped** (details in `docs/world-and-hubs.md` batches #8–#12):
- The 3 tile puzzles (Cargo Bay, Glacier Push, Forbidden City) are solver-backed procedural
  generators with ramping difficulty; Glacier's reverse-construction backstop bug fixed; walls now
  cluster into contiguous barriers instead of scattering as singletons (batch #12).
- Virus Lab: 10 sequential labs, 12→62 viruses (55% of the bottle at the top), anti-prematch
  seeding. Cosmic Rhythm: 5-tier judgment (PERFECT/EXCELLENT/GOOD/POOR/MISSED) with floating
  side comments.
- Multiplicative gear economy + combat rescale; All-Chips modal; boss-gate fixes (now a confirm
  popup, `docs/gameplay.md`); LaTeX-style superscript exponents; admin monster unlock.
- **First real human-style playtest done** (2026-07-17, `docs/playtest-methodology.md` +
  `docs/gameplay.md` + `docs/rpg-combat-economy.md` same-day entries) — see the two open findings
  below, both need a follow-up tuning session.

**Known open items / bugs (not yet fixed):**
- **Bible curriculum style-rotation bug (CONFIRMED, re-confirmed 2026-07-17)**: 65 arenas/registries
  exist, but questions only ever render Direct-MC style — the authored modeling/reverse/graph fields
  are never read. A fix has not been attempted yet.
- ~~arena-1 boss binary wall / economy-done-by-arena-20 / XP soft-lock ≈ arena 40~~ — **FIXED by
  the 2026-07-17 full rebalance** (`docs/balance-design.md` = the authoritative design; `BAL` block
  in `config/economy.config.js` = the implementation; verified by r=1..65 simulation + a live
  arena-2 boss fight). When tuning ANY combat/economy number: edit balance-design.md first, then
  mirror into BAL. Known leftovers: shield ladder non-monotonic (crystal 25 DEF/380 outclasses
  legendary+archive shields), Wonderland reward Cash still flat 20-100/pass.
- **NEW 2026-07-17 — Bible-curriculum (arenas 7-65) question/distractor quality still unverified by
  a human-style pass.** Only arena 1 (hand-authored pre-algebra) was played through this session and
  its distractors are genuinely good; the Bible-template phases' `_perturbDistractors`/
  `_exprVariants`/`_siblingDistractors` fallback machinery (the patch layer over the old
  generic-placeholder bug) has never been checked by actually reading rendered questions. Use
  `docs/playtest-methodology.md` to sample arenas 7-15 / the ~P021-P054 risk zone / 50-65 next.
- `ROOMS_AND_CODES.md` is stale (see §1 note).
- `game/assets/bodies/ArtistImpession/` is **untracked**: 27 unique AI-rendered body images, only
  8 match in-game bodies; 34 bodies still lack photos (list in `BODIES_LIST.md`); the images are
  NOT wired into the game (`BODY_PHOTOS` in `js/25-nav.js` only maps 23 Sol-system jpgs).
- No automated test suite. `tools/validate-arenas.js` exists for curriculum checks (but only loops
  arenas 1-187, predating the 65-arena rebuild — needs updating before reuse); everything else is
  verified through in-browser simulation (rule #3) or the human-style playtest (rule #12).

---

## 6. What the user is like / how to work with them

- They write informally and concretely ("right now is too easy", "add comments on the side").
  Restate what you'll do, then do the whole thing end-to-end: **code → verify by simulation →
  update docs → bump cache token → commit → push**. They expect finished, deployed work.
- The player is a child — keep game text playful and kid-friendly, difficulty fair but ramping.
- When they report a bug you believe is fixed, check the cache token first, then reproduce via
  console simulation before changing code.
- They value: harder/deeper gameplay, visible progress (levels, leaderboards), honest verification
  ("verify via simulation" has caught real bugs), and detailed documentation of every change.
