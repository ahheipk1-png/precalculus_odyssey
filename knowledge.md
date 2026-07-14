# knowledge.md — hard-won knowledge for the Precalculus Odyssey project

Things learned the hard way while working on this game. `handoff.md` is the architecture map;
this file is the "gotchas, environment, and how-to" companion. Read both.

---

## The environment (this Windows machine)

- **No Node.js and no Python are installed.** Both `node` and `python`/`python3` resolve to
  nothing / a Microsoft Store stub that errors. So `node test.js` and `python -m http.server`
  do **not** work here — don't reach for them.
- **Static file server = a tiny PowerShell `System.Net.HttpListener` script.** That's how the
  game gets served for testing. A reusable copy lives in the session scratchpad
  (`serve.ps1` / `serve2.ps1`). Pattern: it serves a root dir over `http://localhost:<port>/`,
  maps `/` → `index.html`, and (in `serve2.ps1`) accepts `POST /save` to write a file — used to
  save large generated artifacts to disk without relaying them through the model's output.
- **Run the game over `http://localhost`, not `file://`, when testing with the Claude Browser
  tool** — the browser tool cannot navigate `file://` URLs (it errors). The *user*, though,
  opens the game by double-clicking from disk (`file://`), so the game must work both ways.
- **Git Bash `/tmp` maps to `%TEMP%`** (`C:\Users\Michael Cheng\AppData\Local\Temp`). If you
  write a temp file from Bash and read it from PowerShell, look there.
- **`Bash` tool = Git Bash (POSIX sh); `PowerShell` tool = Windows PowerShell 5.1.** Use
  PowerShell for anything needing .NET (base64 decode, HttpListener, binary file writes).

## Testing without Node: run logic in the browser's JS engine

The project's convention is a Node-extraction regression harness (see handoff's "Verification
approach"), but since there's no Node, **run the exact same logic inside the Claude Browser
tool's real JS engine** via `javascript_tool`:
- After the **modularization**, the game's functions are now **plain globals** on `window`
  (the main IIFE was removed — see handoff). So you can call `generateProblem(5)`, `applyOp(...)`,
  `getChapterForLevel(8)` etc. **directly** on the loaded page — no need to re-inject the
  extracted code. Just load `game/index.html` over the local server and run the harness inline.
- The current harness asserts ~1130 things (chapter registry invariants + ~400 generated
  problems mechanically solved with correct `par`/answer + every `formulaBank` entry + the
  formula solve-order rule). It has passed 0-fail after every refactor. **Re-run it after any
  change to a `generate*`/`apply*`/`solveFully`/registry function.**
- **Drive the UI the same way**: `document.getElementById('newPlayerBtn').click()`,
  set input `.value` then `document.getElementById('applyForm').requestSubmit()`, and read back
  DOM text. This caught nothing broken across the modular split but is how you *prove* a change
  works end-to-end. Always finish with `read_console_messages({onlyErrors:true})`.

## Browser-tool quirks seen here

- **`computer` screenshots time out** on the game page when a ~950KB base64 image was inlined in
  the CSS (the renderer choked). After extracting that image to a real file (see below),
  screenshots are fine. If a screenshot times out, fall back to `read_page` / `javascript_tool`
  to read state — the page is usually fine, only the screenshot rendering hangs.
- **`localStorage` is per-origin.** When testing save/profiles, `localStorage.clear()` and seed
  data **in the same origin you'll read from** — e.g. don't seed on `file://` then read on
  `http://localhost` (different origins, different storage). Seed, then navigate within the same
  origin.
- **`read_network_requests` can exceed the token limit** on a busy page — filter it or avoid.

## The single biggest "file too long" cause

- The monolithic `Game_0.2.html` was ~1.1MB, but **~950KB of that was one line**: a base64
  data-URI JPEG (`background-image: url("data:image/jpeg;base64,…")`) for the chalkboard
  background. Extracting it to a real `game/assets/chalkboard-bg.jpg` (PowerShell
  `[Convert]::FromBase64String` → `WriteAllBytes`) and referencing it with a normal `url()`
  dropped the CSS from ~950KB to ~64KB. **If a single-file HTML feels huge, look for an inlined
  base64 asset first.**
- There is also a *dead* `background-image: url('balance_quest_empty_pans_….jpg')` rule that
  references a file that doesn't exist — it's overridden by the real (now extracted) image rule.
  Harmless; don't be confused by it.

## Module split: the load-order rules (no build step, classic scripts)

The game is split into ordered classic `<script src>` files sharing ONE global scope (the outer
IIFE was removed). This works over `file://` (classic scripts/links/images load from disk;
**ES-module `import`/`export` would NOT** — that's why classic scripts were chosen). The only
real hazard is **load-time-by-value references**: an object literal that captures a *function
value* (not a call) at load time needs that function already defined. Two existed and were
neutralized so module order is robust:
1. `chapters[0].generator = generateBalanceQuestProblem` — the generator is defined in
   `04-logic.js` but `chapters` is built in `01-data.js` (loads first). Fix: data declares
   `generator: null`; `07-main.js` wires it at boot.
2. `modeRegistry.formula.caption` referenced `updateFormulaCaption` (defined later in
   `05-render.js`) by value. Fix: it's now `caption: function(){ updateFormulaCaption(); }`
   (lazy) so definition order doesn't matter.
**If you add another top-level object that stores a function from a later-loading module, wrap it
in a lazy `function(){...}` or wire it in `07-main.js`.** Everything else (function bodies that
merely *call* other globals) resolves fine at runtime regardless of file order.

Proof technique that the split is faithful: `cat game/js/01..07 > x` and `diff` it against the
original main-IIFE body line range — it should be **byte-identical** (the modules were produced
by `sed`-slicing exact line ranges after making the 2 edits above). It was, and is.

## The RPG save / profiles gotchas

- Deleting the *currently-active* profile used to let a safety-net `saveGame()` (20s interval /
  `beforeunload`) resurrect it (`push` when `idx===-1`). Fixed by nulling `activeProfileId` +
  `gameStarted` on delete of the active profile. See handoff for the full fix set (dedupe-by-id,
  last-saved-time).
- A brand-new profile isn't in the list until its first `saveGame()` (fired via `updateStats()`
  in `startGame()`), which is why `saveGame` legitimately needs the `push`-when-absent branch —
  don't remove it.

## "Passwords" = Worm Hole codes (was "Warp Door")

When the user says "password," they mean the **4-letter Worm Hole codes** (`levelCodes` in
`01-data.js`): `SEED GROW ROOT WIND LAKE FIRE SAND VOID HERO STAR`, indexed by `level-1`
(planet 1 = SEED … planet 10 = STAR). Typing a code in the 🌀 Worm Hole (renamed from "Warp Door" —
internal ids like `warpDoorBtn`/`executeWarp` kept their names) jumps straight to that planet. See
`ROOMS_AND_CODES.md` for the planet→topic→password table.

## The multi-agent design workflow

- The full "Precalculus Odyssey" curriculum (6 star systems, 133 planets) + the materials system were
  designed by a parallel **Workflow** (`precalc-odyssey-design`). Its per-agent output is in the
  run's `journal.jsonl` under the session's `subagents/workflows/wf_*/` dir. The gambling,
  casino, and synthesis agents **failed on a subagent session limit** (resets 4pm America/Toronto)
  and were hand-authored into the published design-doc artifact instead. If you re-run design
  work and hit "session limit," that's the subagent quota, not a code error — wait or author
  inline.

## Standing process rules (also in handoff, repeated because they bite)

- **Back up `game/` (or the file) before any nontrivial change** — `Game_0.2_backup_before_<x>.html`
  has been the pattern; for the modular tree, copy the whole `game/` folder or the specific files.
- **Update `handoff.md` in the same turn as any code change.** Non-negotiable, user-requested.
- After logic changes, **re-run the browser harness**; after visual/UI changes, **drive the live
  page** and check console errors before claiming it works.
