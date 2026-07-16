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
