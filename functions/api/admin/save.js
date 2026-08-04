// Admin-only: read and edit a player's authoritative account progress directly (item: admin tools).
//   GET  /api/admin/save?username=NAME            → curated fields + sync meta
//   POST /api/admin/save {username, action, ...}   → override | reset
//
// Operates on cloud_accounts.progress_json — the SAME full-snapshot field the account-login system
// (cloud-auth.js) reads/writes (getSaveSnapshot() shape). This used to target the older, separate
// `player_profiles` table from the Cloud Save layer (cloud-save.js) instead — but that layer's own
// upload UI (#cloudBtn) was never wired into index.html, so no real username/password player ever
// populates player_profiles; every edit made through the old version of this file was silently
// invisible to every real player (2026-07-21, found while diagnosing "admin should see everything").
//
// Edits/resets set admin_override = 1 (migration 0007). The player's client (authPushProgress,
// cloud-auth.js) checks for this on its next heartbeat push — live sessions pick up the change
// within ~25s, not just on next login — see functions/api/auth/progress.js's POST handler.
import { json, bad, nowIso, authAdmin, normalizeUsername, readJsonBody } from '../cloud/_shared.js';

// Curated numeric fields an admin may override, with the path inside the progress snapshot
// (getSaveSnapshot shape) and a defensive clamp. Equipped gear and chips are handled separately
// below (GEAR_SLOTS/CHIP_IDS) — codex, arena stats, inventory, etc. remain untouched. Must mirror
// ADMIN_SAVE_FIELDS in cloud-auth.js.
const CURATED = [
  { key: 'level',        path: ['level'],               min: 1, max: 65,      fresh: 1 },
  { key: 'coins',        path: ['coins'],               min: 0, max: 1e9,     fresh: 0 },
  { key: 'gold',         path: ['currencies', 'gold'],  min: 0, max: 1e9,     fresh: 0 },
  { key: 'silver',       path: ['currencies', 'silver'],min: 0, max: 1e9,     fresh: 0 },
  { key: 'heroLvl',      path: ['heroLvl'],             min: 1, max: 999,     fresh: 1 },
  { key: 'playerMaxHp',  path: ['playerMaxHp'],         min: 1, max: 1e7,     fresh: 100 },
  { key: 'playerHp',     path: ['playerHp'],            min: 0, max: 1e7,     fresh: 100 },
  { key: 'playerMaxMp',  path: ['playerMaxMp'],         min: 0, max: 1e7,     fresh: 20 },
  { key: 'playerMp',     path: ['playerMp'],            min: 0, max: 1e7,     fresh: 20 },
  { key: 'wonderPasses', path: ['wonderPasses'],        min: 0, max: 1e6,     fresh: 0 },
];

// Gear catalogue ids/names — this file (a Cloudflare Pages Function / ES module) can't `import` the
// browser's classic-script config (game/config/gear.config.js, a plain global `var` file with no
// bundler), so the ids are duplicated here for validation, same manual-sync convention as CURATED
// mirroring ADMIN_SAVE_FIELDS in cloud-auth.js. Keep in sync if gear.config.js's ids ever change.
// Each entry's `arrayKey` is the progress-snapshot array holding {id, owned, upgradeLvl} objects
// (getSaveSnapshot shape, game/js/03-save.js); `equipKey` is the scalar equipped-id field.
const GEAR_SLOTS = [
  { slot: 'weapon', label: 'Weapon', arrayKey: 'weapons', equipKey: 'equippedWeapon', def: 'wood_sword', ids: [
    'wood_sword', 'bronze_dagger', 'iron_broadsword',
    'axiom_blade', 'solar_meridian', 'tidal_paradox', 'verdant_recursion', 'gravity_keystone', 'infinity_vector'
  ] },
  { slot: 'shield', label: 'Shield', arrayKey: 'shields', equipKey: 'equippedShield', def: 'leather_buckler', ids: [
    'leather_buckler', 'wood_shield', 'iron_shield', 'aegis_shield', 'crystal_shield',
    'aegis_of_sol', 'tide_bulwark', 'grove_rampart', 'tectonic_wall', 'mirror_paradox', 'eternity_bastion'
  ] },
  { slot: 'armor', label: 'Armor', arrayKey: 'armor', equipKey: 'equippedArmor', def: 'cloth_tunic', ids: [
    'cloth_tunic', 'solar_carapace', 'abyssal_plate', 'bramble_mail', 'bedrock_aegis', 'chrome_exosuit', 'singularity_plate'
  ] },
  { slot: 'shoes', label: 'Shoes', arrayKey: 'shoes', equipKey: 'equippedShoes', def: 'basic_boots', ids: [
    'basic_boots', 'swift_equation_boots', 'cloud_strider_treads', 'tidal_surfer_greaves',
    'inferno_dashers', 'stonewall_stompers', 'quantum_striders'
  ] },
];

// Mirrors CHIPS/CHIP_ORDER in game/config/economy.config.js. `chips` in the snapshot is a flat
// {chipId: count} map (not an array), so no owned/upgradeLvl reconciliation is needed here.
const CHIP_IDS = ['energy_core', 'robotic_alloy', 'cpu', 'gpu', 'neural_chip', 'quantum_chip', 'alien_processor'];

function getPath(obj, path) {
  let cur = obj;
  for (const step of path) { if (cur == null) return undefined; cur = cur[step]; }
  return cur;
}
function setPath(obj, path, value) {
  let cur = obj;
  for (let i = 0; i < path.length - 1; i++) {
    if (cur[path[i]] == null || typeof cur[path[i]] !== 'object') cur[path[i]] = {};
    cur = cur[path[i]];
  }
  cur[path[path.length - 1]] = value;
}
function clampInt(v, min, max) {
  const n = Math.round(Number(v));
  if (!Number.isFinite(n)) return null;
  return Math.max(min, Math.min(max, n));
}

// Equip `itemId` into `slotCfg`'s slot AND flag it owned on the matching array entry (creating one
// if the save predates this catalogue id). Setting only the equipped-id field is NOT enough — the
// client's _validEquip (03-save.js) silently reverts any equipped id back to the slot default the
// moment it isn't also owned:true, which would make an admin's edit here silently vanish on load.
function setGearSlot(save, slotCfg, itemId, upgradeLvl) {
  if (!Array.isArray(save[slotCfg.arrayKey])) save[slotCfg.arrayKey] = [];
  const arr = save[slotCfg.arrayKey];
  let entry = arr.find((x) => x && x.id === itemId);
  if (!entry) { entry = { id: itemId, owned: true, upgradeLvl: 0 }; arr.push(entry); }
  entry.owned = true;
  if (upgradeLvl != null) entry.upgradeLvl = upgradeLvl;
  save[slotCfg.equipKey] = itemId;
}

async function loadAccount(env, username) {
  return env.DB.prepare(
    `SELECT account_id, progress_json, progress_at FROM cloud_accounts WHERE username = ?1`
  ).bind(username).first();
}

export async function onRequestGet(context) {
  const admin = await authAdmin(context);
  if (!admin) return bad('FORBIDDEN', 'Admin access required.', 403);
  const url = new URL(context.request.url);
  const username = normalizeUsername(url.searchParams.get('username'));
  if (!username) return bad('MISSING', 'username required.');

  const acc = await loadAccount(context.env, username);
  if (!acc) return bad('NO_ACCOUNT', 'No such account.', 404);
  if (!acc.progress_json) return json(200, { ok: true, hasProgress: false });

  let save = {};
  try { save = JSON.parse(acc.progress_json) || {}; } catch (e) { save = {}; }
  const fields = {};
  for (const f of CURATED) { const v = getPath(save, f.path); fields[f.key] = (v == null ? null : v); }

  const gear = {};
  for (const g of GEAR_SLOTS) {
    const equipped = getPath(save, [g.equipKey]) || g.def;
    const arr = Array.isArray(save[g.arrayKey]) ? save[g.arrayKey] : [];
    const entry = arr.find((x) => x && x.id === equipped);
    gear[g.slot] = { equipped, upgradeLvl: entry ? (entry.upgradeLvl || 0) : 0 };
  }
  const chips = {};
  for (const id of CHIP_IDS) { const v = getPath(save, ['chips', id]); chips[id] = (v == null ? 0 : v); }

  return json(200, { ok: true, hasProgress: true, username, progressAt: acc.progress_at || '', fields, gear, chips });
}

export async function onRequestPost(context) {
  const admin = await authAdmin(context);
  if (!admin) return bad('FORBIDDEN', 'Admin access required.', 403);

  let body;
  try { body = await readJsonBody(context.request); } catch (e) { return bad('BAD_JSON', 'Bad request body.'); }
  const username = normalizeUsername(body.username);
  const action = String(body.action || '');
  if (!username) return bad('MISSING', 'username required.');

  const acc = await loadAccount(context.env, username);
  if (!acc) return bad('NO_ACCOUNT', 'No such account.', 404);
  const DB = context.env.DB, now = nowIso();

  let save = {};
  try { save = acc.progress_json ? (JSON.parse(acc.progress_json) || {}) : {}; } catch (e) { save = {}; }

  if (action === 'override') {
    const incoming = (body.fields && typeof body.fields === 'object') ? body.fields : {};
    for (const f of CURATED) {
      if (!(f.key in incoming) || incoming[f.key] === '' || incoming[f.key] == null) continue;
      const v = clampInt(incoming[f.key], f.min, f.max);
      if (v == null) return bad('BAD_FIELD', 'Field ' + f.key + ' must be a number.');
      setPath(save, f.path, v);
    }
    if (!save.currencies || typeof save.currencies !== 'object') save.currencies = { gold: 0, silver: 0 };

    const gear = (body.gear && typeof body.gear === 'object') ? body.gear : null;
    if (gear) {
      for (const g of GEAR_SLOTS) {
        const itemId = gear[g.slot];
        if (!itemId) continue;
        if (!g.ids.includes(itemId)) return bad('BAD_FIELD', 'Unknown ' + g.slot + ' id: ' + itemId);
        let lvl = null;
        const lvlRaw = gear[g.slot + 'UpgradeLvl'];
        if (lvlRaw !== '' && lvlRaw != null) {
          lvl = clampInt(lvlRaw, 0, 3);
          if (lvl == null) return bad('BAD_FIELD', 'Upgrade level for ' + g.slot + ' must be 0-3.');
        }
        setGearSlot(save, g, itemId, lvl);
      }
    }
    const chipsIn = (body.chips && typeof body.chips === 'object') ? body.chips : null;
    if (chipsIn) {
      if (!save.chips || typeof save.chips !== 'object') save.chips = {};
      for (const id of CHIP_IDS) {
        if (!(id in chipsIn) || chipsIn[id] === '' || chipsIn[id] == null) continue;
        const v = clampInt(chipsIn[id], 0, 999999);
        if (v == null) return bad('BAD_FIELD', 'Chip ' + id + ' must be a number.');
        save.chips[id] = v;
      }
    }

    // Arena unlock/star repair (added 2026-08-04 for the stale-save data-loss incident — see
    // docs/save-and-audio.md). ADD-ONLY by design: it can grant a cleared arena or a perfect star,
    // never take one away, so this tool can't itself become a way to violate the never-downgrade
    // invariant the sync path now enforces. Accepts {arenas:{cleared:[...], perfect:[...]}}.
    // A perfect star implies the arena was cleared, so `perfect` grants both.
    const arenasIn = (body.arenas && typeof body.arenas === 'object') ? body.arenas : null;
    if (arenasIn) {
      const maxArena = 999;   // 888/999 are the special end-game arenas; ordinary ones are 1-65
      const grant = (listRaw, keys) => {
        if (!Array.isArray(listRaw)) return null;
        for (const raw of listRaw) {
          const n = clampInt(raw, 1, maxArena);
          if (n == null) return 'Arena numbers must be integers.';
          for (const key of keys) {
            if (!save[key] || typeof save[key] !== 'object') save[key] = {};
            save[key][n] = true;
          }
        }
        return null;
      };
      const e1 = grant(arenasIn.cleared, ['bossDefeated']);
      if (e1) return bad('BAD_FIELD', e1);
      const e2 = grant(arenasIn.perfect, ['bossDefeated', 'perfectArenas']);
      if (e2) return bad('BAD_FIELD', e2);
    }

    save.schemaVersion = save.schemaVersion || 2;   // guard migrateSave()'s legacy-save path, see 03-save.js
  } else if (action === 'reset') {
    // Zero the curated fields (so THIS dashboard reflects it immediately) AND set the `_adminReset`
    // marker applySnapshotToState() (03-save.js) already knows how to honour — it calls the real,
    // tested resetPlayerState() client-side instead of loading a merely-zeroed snapshot, so gear,
    // codex, arena stats etc. all genuinely reset too, not just these curated numbers.
    for (const f of CURATED) setPath(save, f.path, f.fresh);
    save.schemaVersion = save.schemaVersion || 2;
    save._adminReset = now;
  } else {
    return bad('BAD_ACTION', 'Unknown action.');
  }

  const saveJson = JSON.stringify(save);
  if (saveJson.length > 512 * 1024) return bad('TOO_LARGE', 'Edited progress too large.', 413);
  // Falls back to writing just the two always-present columns on a DB that predates migration
  // 0007 — the edit still reaches the player on their next login either way, just not within the
  // usual ~25s live-pickup window until the migration actually runs (re-hit /api/admin/bootstrap).
  try {
    await DB.prepare(
      `UPDATE cloud_accounts SET progress_json = ?1, progress_at = ?2, admin_override = 1 WHERE account_id = ?3`
    ).bind(saveJson, now, acc.account_id).run();
  } catch (e) {
    await DB.prepare(
      `UPDATE cloud_accounts SET progress_json = ?1, progress_at = ?2 WHERE account_id = ?3`
    ).bind(saveJson, now, acc.account_id).run();
  }

  return json(200, { ok: true, action, username });
}

export const onRequest = (ctx) => {
  const m = ctx.request.method;
  if (m === 'GET') return onRequestGet(ctx);
  if (m === 'POST') return onRequestPost(ctx);
  return bad('METHOD_NOT_ALLOWED', 'Use GET or POST.', 405);
};
