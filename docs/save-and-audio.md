# Save / Persistence & Audio

← [docs orchestra](README.md)

## Save system — `js/03-save.js`

localStorage, **no server**, persists across restarts. Up to **10 named player profiles** under
`balanceQuestProfiles_v1` (legacy single-slot `balanceQuestSave_v1` migrated once). Each profile is
a snapshot of `state` + `id`/`name`/`savedAt`.

- **Start screen:** New Player (named) or Continue a saved profile; profiles show planet, hero level,
  Cash, and last-saved time.
- **Autosave:** primary save inside `updateStats()`; safety-net `beforeunload`/`visibilitychange` +
  a 20s interval.
- **Recycle-bug fix:** deleting the active profile nulls `activeProfileId`/`gameStarted` so a
  safety-net save can't resurrect it; `loadAllProfiles` dedupes by id.

## ☁ Cloud Save layer — `js/cloud-save.js` + `js/cloud-ui.js` (opt-in)

Wraps the localStorage save with an optional Cloudflare-backed cloud (see `CLOUD_SETUP.md`). Design:
localStorage stays the fast local source of truth; `saveGame()` additionally calls
`window.Cloud.queueSave('save')` (guarded), which is a **no-op until the player enables Cloud Save**
(creates an account). Uploads are **debounced ~10s** and event-based, never per-frame.

- **Canonical snapshot** = the existing `getSaveSnapshot()` body (no competing state model), wrapped
  with `{ saveVersion, profileId, playerName, clientUpdatedAt, data }`.
- **Account:** anonymous — a one-time **recovery code** (shown once) → server issues a **session
  token** (Bearer). Only SHA-256 **hashes** of the code/token live in D1. No email/PII.
- **Revisions/conflict:** every profile has a monotonic server `revision`; PUT sends
  `expectedRevision`; a stale write → **HTTP 409** → the in-game conflict dialog (`onCloudConflict`)
  — never a silent overwrite.
- **Offline:** pending snapshot kept in `localStorage` (`poCloudPending`), retried with backoff;
  flushes on `online`/`visibilitychange`. Status chip in the header (`#cloudBtn` / `updateCloudStatusUI`).
- **Transfer:** Export/Import JSON always available; optional best-effort `C:\temp` backup via the
  localhost companion `tools/local-save-server.ps1` (off by default; failure never affects cloud).
- **Server:** Cloudflare **Pages Functions** in `/functions/api/cloud/*` + D1 (`migrations/0001_cloud_saves.sql`).
  Client only calls **relative** `/api/cloud/...`. localStorage keys: `poCloudSession`, `poCloudMeta`,
  `poSavePrefs`, `poCloudPending`.

## 🔐 Account login & progress sync — `js/cloud-auth.js` + `functions/api/auth/*`, `functions/api/admin/*`

Was originally a SEPARATE, lighter-weight system from the Cloud Save layer above (built for admin
oversight — approve accounts, see each player's status — rather than full save portability). As of
2026-07-21 it now pushes/pulls the SAME full snapshot shape `getSaveSnapshot()`/`applySnapshotToState()`
already use for local profiles (see below), so the two systems now overlap in what they carry, even
though `cloud-save.js`'s own upload pathway (the `#cloudBtn` UI) still doesn't exist in `index.html`
and stays unreachable for username/password players — this account system is what's actually live.

`authProgressSummary()` (cloud-auth.js) now just returns `getSaveSnapshot()` directly — level, HP/MP,
equipped weapon/shield/armor/shoes, the full owned-gear arrays, inventory, materials, farm, codex,
chips, currencies, coins, bossDefeated, arenaStats, miniGames, settings, everything a local profile
snapshot has. Pushed to `cloud_accounts.progress_json` (TEXT, capped at 512KB matching `MAX_SAVE_BYTES`
in `_shared.js`) both on the pre-existing 25s heartbeat AND on every `saveGame()` call (`03-save.js`,
right after the existing `window.Cloud.queueSave('save')` line) — so the cloud copy goes stale for at
most a few seconds of actual gameplay, not up to 25s. Readable by an admin via `GET /api/admin/player?
username=` (the full-screen admin dashboard's Details panel — note `renderPlayerDetail`'s "arenas
passed" count is derived from `bossDefeated` client-side now, since the full snapshot doesn't carry a
precomputed `arenasPassed` field the old lightweight summary used to) or by the player themself via
`GET /api/auth/progress`.

- **Single active session by design** (`functions/api/auth/login.js`): every login revokes every
  OTHER live session for that username (except the `admin` test account). Confirmed intentional
  (user 2026-07-21: "does it make sense?" — yes, keep it) — logging in elsewhere is meant to sign
  you out elsewhere, not run two devices concurrently under one identity.
  - **The revoked device used to find out passively — now it's a forced kick-out** (same day, user:
    "the login in this computer should be kicked out with a notification"). Previously, a 401 on the
    heartbeat push just stopped the sync timer and showed a one-time toast; the player kept playing
    locally, indistinguishable from being properly logged in, silently accumulating progress that
    could never reach the cloud — and which could look "more advanced" than the account's real
    (other-device) progress on a later re-login, since `bridgeToGame`'s "cloud wins only if further"
    comparison (see below) trusted that orphaned local state at face value. Now `handleSessionRevoked()`
    (cloud-auth.js) fires the instant a 401 is seen — either at boot (`bridgeToGame`'s initial
    `GET /api/auth/progress`, for a stored session token that died while the tab was closed) or on
    the next heartbeat (`authPushProgress`) — and immediately shows a blocking `#accountKickOverlay`
    ("🔒 Logged Out — your account was logged in on another device…"), clears the local session, and
    reloads to the login screen on **OK**. This also directly fixes "log out and back in should go to
    the most recent star system": since local play can no longer silently drift past the point of
    takeover, `bridgeToGame`'s cloud-vs-local comparison stays sound, and a fresh login correctly
    restores the account's real latest arena/star system (verified: mocked a level-45 cloud snapshot,
    confirmed the header reads "🌌 Ross 128 · Arena 45 of 65" post-login, not Arena 1/Sol).
- **2026-07-21 — a player's progress from a second computer was invisible everywhere; fixed in two
  passes the same day.** Root cause was two SEPARATE bugs compounding with the single-session design
  above: (1) `authPushProgress` called its API request without awaiting or checking the result — a
  revoked/expired session (or any transient error) failed every 25s sync silently, forever, with zero
  indication to the player or the admin dashboard; (2) `bridgeToGame()` (the post-login handoff) only
  ever checked THIS device's own local profile list — logging into an account on a device that had
  never played that profile locally just reset to a fresh Arena-1 game, ignoring whatever was already
  synced to the cloud. First-pass fix:
  - `authPushProgress` now awaits its request; a `401` (session revoked elsewhere) stops the sync
    timer and shows a one-time toast ("logged in somewhere else... log out and back in to resume")
    instead of retrying a dead session forever; other failures surface a "trouble syncing" toast
    after 3 consecutive misses.
  - New `GET /api/auth/progress` (self-serve, `functions/api/auth/progress.js` — previously only the
    admin-only `GET /api/admin/player` could read `progress_json`).
  - `bridgeToGame()` fetches the account's cloud progress on every login and compares it against any
    local profile of the same name: cloud wins (via `applySnapshotToState`) whenever it shows a
    HIGHER `level` (new device, or played further elsewhere more recently); otherwise the richer
    local save wins if there is one; otherwise fresh start.
  - **Second pass, same day — user clarified scope**: "the status of player = all the player's
    specific info including levels, hp, the arena unlocked, weapon, items, so on." The first pass had
    only synced a lightweight summary (no gear/inventory/HP), so a cross-device login restored arena
    number and Cash but dropped the player back to starter gear. Switched `authProgressSummary()` to
    reuse `getSaveSnapshot()` wholesale and `bridgeToGame()`'s cloud-wins branch to reuse
    `applySnapshotToState()` (the same functions already trusted for local-profile restores) instead
    of a bespoke partial-field copier — removed the now-redundant `applyProgressSummaryToState()`
    entirely rather than keep two parallel restore paths. Also added the `saveGame()` real-time push
    hook (user: "we need to make sure the db in cloud has been updated real time" — the 25s-only
    heartbeat wasn't tight enough) and bumped the POST size cap from 200KB to 512KB now that a full
    save, not a summary, is the payload.
  - Verified end-to-end both passes by mocking `window.fetch` around the REAL `authLogin`/
    `bridgeToGame`/`authPushProgress`/`saveGame` code paths (not just reading the source): a mocked
    full cloud snapshot (including HP, equipped armor/shoes by REAL catalog id, materials, with
    `schemaVersion:2` set) correctly restored every field including gear/inventory — the first attempt
    at this test used made-up armor/shoes ids and omitted `schemaVersion`, which correctly triggered
    this codebase's existing catalog-validation and legacy-migration safety nets (silently discarding
    unrecognized gear ids, zeroing `materials` for what looked like a pre-v2 save) — both were test-data
    mistakes, not defects, confirmed by fixing the mock and re-running to a clean pass; `saveGame()`
    confirmed to call `authPushProgress` on every save via a spy; local-further-than-cloud still
    correctly keeps the local save; a mocked `401` on push still correctly shows the one-time toast
    and doesn't repeat it. The actual D1-backed request/response could not be exercised from this
    environment (no wrangler/Cloudflare credentials configured here) — verify against the real
    deployment after pushing.
  - **Confirmed live 2026-07-21**: the `progress_json`/`progress_at` columns (migration `0006`) had
    never actually been applied to the production D1 database — pushing code to GitHub never runs a
    migration, that's a separate one-time step. Symptom: admin dashboard showed "This player hasn't
    played" for a real player (Jayden) who *had* logged in and played. Fixed by hitting
    `/api/admin/bootstrap?key=...` once (idempotent — also seeds `admin`/`admin`). That endpoint's
    key is baked into the public repo; delete `functions/api/admin/bootstrap.js` (or rotate the key
    into a Cloudflare Pages `SEED_KEY` secret) once bootstrapped, since anyone who finds it can hit it.
  - **Lands on the Star Atlas after login, not mid-question** (2026-07-22, user: "when i login, it
    should start in the most recent star system not answering questions"). `bridgeToGame()` used to
    just call `startGame()`, which leaves whatever view was already active in the static HTML
    (`#equationView`) showing — a live question. Now, whenever existing progress was actually
    restored (`loaded === true`), it also calls `openStarAtlas()` then `atlasOpenSystem(_currentSystemId())`
    (both globals from `25-nav.js` — this file has no IIFE wrapper, so its functions are directly
    callable from `cloud-auth.js`'s own closure) to land on the specific star-system page matching
    the restored arena. A brand-new player (`loaded === false`, the `showOpeningNarration()` branch)
    has no "most recent" system yet, so still starts on their real Arena 1 practice view as before.
    Note: **testing this requires a genuine non-admin test account** — `admin` is deliberately
    excluded from cloud sync (`authPushProgress` early-returns for it), by design, so it can never be
    used to verify sync behavior end-to-end.

## 🛠️ Admin edit/reset a player's progress — `functions/api/admin/save.js` + `game/js/cloud-auth.js`

Per-player admin dashboard page (`renderPlayerDetail`/`loadAdminSaveTools`) has an editable field
grid (level, cash, gold/silver, hero level, HP/MP, Wonderland passes — the `CURATED` list, mirrored
client-side as `ADMIN_SAVE_FIELDS`) plus **💾 Save overrides** and **↺ Reset to beginning**.

- **2026-07-21 — this used to be silently useless for every real player.** The whole feature
  (`GET`/`POST /api/admin/save`) originally targeted `player_profiles` (the older, separate Cloud
  Save layer's table, `cloud-save.js`) — but that layer's own upload button (`#cloudBtn`) was never
  wired into `index.html`, so no real username/password player ever populates `player_profiles`;
  every edit made through the old code silently vanished. Rewritten to operate on
  `cloud_accounts.progress_json` — the SAME full-snapshot field the account-login system actually
  reads/writes — so edits now genuinely reach real players (found while diagnosing "admin should be
  able to see everything and override everything").
- **Reaches an already-logged-in, LIVE player within ~25s, not just on next login.** New
  `admin_override` flag (migration `0007`): an edit/reset sets it; `POST /api/auth/progress`
  (the player's own 25s heartbeat push) checks it BEFORE accepting a normal push — if set, it
  rejects the push and hands back the admin's snapshot instead (`{ok:false, error:'OVERRIDE_PENDING',
  progress}`), so the player's own stale local state can't silently clobber the admin's edit before
  the client ever pulls it. `authPushProgress` (cloud-auth.js) applies that snapshot locally via
  `applySnapshotToState()`, saves, toasts "🛠️ An admin updated your progress — refreshed!", then
  re-pushes with `{ack:true}` to clear the flag and resume normal syncing. A `_applyingOverride`
  guard flag suppresses the nested `authPushProgress()` call `saveGame()` itself triggers as a side
  effect while applying the override, so the ack push doesn't race a redundant duplicate.
- **Reset reuses the existing `_adminReset` marker** `applySnapshotToState()` already knows how to
  honour (originally built for the old `player_profiles`-based version of this feature) — it zeroes
  the curated fields (so this dashboard reflects it immediately) AND sets `_adminReset`, which makes
  the CLIENT call the real, tested `resetPlayerState()` instead of just loading a zeroed snapshot —
  so gear, codex, arena stats, everything genuinely resets, not just the curated numbers.
- Verified client-side end-to-end by mocking `window.fetch` (override applies + persists to
  localStorage; reset correctly calls `resetPlayerState()`; exactly 2 network calls per flow, no
  duplicate/racing push) — the real D1-backed round trip couldn't be exercised from this environment
  (no wrangler/Cloudflare credentials here); verify against the real deployment after pushing.
- **Confirmed live 2026-07-22, and a real regression caught + fixed in the process.** Registered a
  genuine throwaway test account on production and played it for real (an `admin`-account test
  wouldn't have proven anything — `authPushProgress` deliberately excludes `admin` from cloud sync
  by design). Every `POST /api/auth/progress` came back `500: D1_ERROR: no such column:
  admin_override` — the `admin_override` guard/write added above queried and wrote that column on
  EVERY push with no fallback, so until migration `0007` actually runs, cloud sync is hard-broken
  for ALL players, not just the admin-override feature. Fixed by wrapping the read-side guard and
  both write paths (this file's own push, `admin/save.js`'s override/reset) in the same defensive
  try/catch this codebase already uses for `progress_json`/`progress_at` on a pre-migration-0006 DB
  — ordinary syncing now degrades gracefully instead of failing outright. Re-verified end-to-end
  after the hotfix deployed: real sync timestamp, real Arena-1 progress (`levelSolves`, streak,
  cash, hero XP), and the admin edit-tools field grid all showed up correctly for the test account;
  deleted the test account afterward via `/api/admin/account` (`action:'delete'`). **Lesson**: a
  migration this codebase depends on can still be un-applied on production even after being told to
  re-run bootstrap — always confirm with a REAL non-admin account, not just code review.
- **2026-07-22 — extended to cover equipped gear + chips**, per the player's own follow-up ("where
  is XP, the weapons/armour/shield/etc and the levels of them and chips"). Two additions, in the
  same `override` action:
  - **Read-only**: `renderPlayerDetail` now shows an "⚔️ Equipped gear" card (weapon/shield/armor/
    shoes names + `+upgradeLvl` if >0) and a "🧩 Chips" card (non-zero chip types only, icon+name×
    count) — both read names/icons straight from the REAL global catalogues (`WEAPONS`/`SHIELDS`/
    `ARMOR`/`SHOES`/`CHIPS`/`CHIP_ORDER`, `game/config/gear.config.js` + `economy.config.js`), which
    this page already loads as classic-script globals, so these can never drift out of sync.
  - **Editable**: 4 gear-slot `<select>` dropdowns (options built from those same real catalogues)
    each paired with a 0–3 upgrade-level number input, plus 7 chip-type number inputs (one per
    `CHIP_ORDER` id) — all added to the existing edit-tools field grid, submitted alongside the
    curated scalar fields in one `override` POST.
  - **The silent-discard trap, avoided**: just writing `equippedWeapon` (etc.) is NOT enough — the
    client's `_validEquip` (`03-save.js`) silently reverts any equipped id back to the slot default
    the instant it isn't also `owned:true` on that item's array entry, which would make an admin's
    gear edit vanish the moment the player's client applies the snapshot. `setGearSlot`
    (`functions/api/admin/save.js`) sets `owned:true` (+ `upgradeLvl` if given) on the matching
    `weapons`/`shields`/`armor`/`shoes` array entry — creating the entry if a very old save predates
    that catalogue id — THEN sets the equip pointer, so the edit survives the player's own
    `_validEquip` check.
  - **Server can't import the browser's classic-script catalogue** (`gear.config.js`/
    `economy.config.js` are plain global `var` files, no bundler) — `functions/api/admin/save.js` is
    a separate ES-module runtime (Cloudflare Function), so `GEAR_SLOTS`/`CHIP_IDS` duplicate the ids
    there for validation only, same manual-sync convention as `CURATED`/`ADMIN_SAVE_FIELDS`. The
    CLIENT side needs no duplication — `cloud-auth.js` runs on the same page as the game, so it
    reads `WEAPONS`/`SHIELDS`/`ARMOR`/`SHOES`/`CHIPS`/`CHIP_ORDER` directly as real globals for both
    the read-only display and the dropdown option lists.
  - Verified client-side by mocking `window.fetch` through the actual exposed entry points
    (`authShowPlayer` → `renderPlayerDetail`, `loadAdminSaveTools`, `authAdminSaveOverride`): confirmed
    read-only rows render correct names + upgrade-level suffixes and correctly hide zero-count chips;
    confirmed the 4 selects pre-populate with the right catalogue options and the right item
    pre-selected; confirmed changing a dropdown + upgrade level + a chip count and saving produces
    the exact expected POST body; confirmed the post-save re-render reflects the new values. Not yet
    live-tested against the real D1 backend (would need a push first, per standing convention) — the
    server logic mirrors the already-battle-tested `CURATED`/`setPath`/`clampInt` pattern from the
    scalar fields above.

## ⚠️ The 4-place persistence rule (do this for EVERY new saved field)

A `state` field is only truly saved if added in **all four** places — miss one and it silently
never persists (the original `state.gems` cautionary bug):

1. **Default** in `state` (`js/01-data.js`).
2. **`getSaveSnapshot()`** (`js/03-save.js`) — write it into the snapshot.
3. **`applySnapshotToState()`** (`js/03-save.js`) — read it back, guarding objects with `|| {}` and
   arrays with `Array.isArray`.
4. **`resetPlayerState()`** (`js/03-save.js`) — reset it for a new player.

Fields added this way include: `materials, codex, wonderPasses, passEarns, inventory, poisonArmed,
solveClock, roomFails, farm`.

## Save migration (planned — master plan Phase 2)

The currency/inventory/equipment model change (essence→chips, gold/silver/gems→currencies, new gear
slots) will introduce `schemaVersion` + a `migrateSave(snap)` in `applySnapshotToState` — versioned,
non-destructive, never resets a profile. See [process-and-roadmap.md](process-and-roadmap.md).

## Audio — `js/13-audio.js`

- **Background music**: WAV loops in `../sound/` switched by context — `playMusic('practice' |
  'shop' | 'arena' | 'battle')`. Deferred until the first user gesture (autoplay policy).
  Looping is **manual** (`audioEl.loop = false`): the `ended` event fires `onTrackEnded()`, which
  waits **1.5 s** (`AUDIO.gapTimer`) before replaying, so there's a short breath between loops.
  The pending gap is cancelled on a context/track switch (in `playMusic`) and on mute (in `toggleMute`).
- **SFX**: `playSfx(name)`. It first normalises two **back-compat aliases** — `correct` →
  `solve-correct` and `click` → `ui-click` (many Wonderland minigames call the short names, which
  weren't in either map and so were silently no-ops until 2026-07-15) — then checks `SFX_FILES` (real
  one-shot WAV samples in `../sound/`, played via `playSfxFile()` at `AUDIO.sfxVol`); any name **not**
  in that map falls back to a WebAudio-oscillator **placeholder** (`solve-correct`, `wrong`, `buy`,
  `upgrade`, `loot`, `defeat`, `chest-open`, `ui-click`). Real samples are cached and played via
  `cloneNode()` so rapid combat repeats don't cut each other off; the cache is warmed on the first
  gesture. All samples are one-shots (no loop). (Equip-SFX picker: `heavy` weapon category was dropped
  from `playEquipSfx` when weapons went swords-only.) Current real-sample event map:
  | event | file | fired from |
  |---|---|---|
  | `battle-hit` | `attack_impact.wav` | combat hits, offensive spells, tile-ball |
  | `victory` | `battle_victory_fanfare.wav` | winning a single battle (`handleBattleVictory`) |
  | `planet-complete` | `planet_complete_celebration.wav` | finishing a whole planet (`advanceToNextLevel`) |
  | `weapon-upgrade` | `weapon_upgrade.wav` | successful gear upgrade (`rpgActions.upgrade`) |
  | `equip-light` / `equip-heavy` / `equip-scifi` | `metal_equip_light_weapon` / `_heavy_armor` / `_scifi_lock.wav` | `playEquipSfx(item)` on equip/buy — variant chosen by gear category + rarity (archive/stellar/rift/odyssey → sci-fi; shield/armor/shoes → heavy; else light sword) |
  | `machine` / `warp` | `machine_activate.wav` | trading terminal & alchemy machine open; wormhole/star-gate travel (`playWarpFx`) |
- **Mute**: `toggleMute()` (🔊/🔇 header button), persisted in `localStorage 'po_muted'`.
