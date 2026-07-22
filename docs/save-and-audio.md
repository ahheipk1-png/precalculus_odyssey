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
