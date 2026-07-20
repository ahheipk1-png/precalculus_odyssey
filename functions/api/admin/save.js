// Admin-only: read and edit a player's authoritative CLOUD save directly (item: admin tools).
//   GET  /api/admin/save?username=NAME            → latest cloud profile: curated fields + meta
//   POST /api/admin/save {username, action, ...}   → override | reset | deleteSave
//
// Edits bump the profile's monotonic `revision`. The player's client carries a
// stale expectedRevision, so its next cloud sync returns 409 and the existing
// conflict UI (onCloudConflict in cloud-ui.js) offers "Use the cloud save",
// which pulls the admin-edited blob onto their device. A `reset` writes an
// `_adminReset` marker that applySnapshotToState honours by wiping progress.
import { json, bad, nowIso, authAdmin, normalizeUsername } from '../cloud/_shared.js';

// Curated numeric fields an admin may override, with the path inside the save
// blob (getSaveSnapshot shape) and a defensive clamp. Nothing else is editable
// here — gear arrays, codex, arena stats, etc. are left untouched.
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

async function accountId(env, username) {
  const acc = await env.DB.prepare(
    `SELECT account_id, is_admin FROM cloud_accounts WHERE username = ?1`
  ).bind(username).first();
  return acc || null;
}

async function latestProfile(env, accId) {
  return env.DB.prepare(
    `SELECT profile_id, player_name, save_version, revision, save_json, updated_at
       FROM player_profiles
      WHERE account_id = ?1 AND deleted_at IS NULL
      ORDER BY updated_at DESC LIMIT 1`
  ).bind(accId).first();
}

export async function onRequestGet(context) {
  const admin = await authAdmin(context);
  if (!admin) return bad('FORBIDDEN', 'Admin access required.', 403);
  const url = new URL(context.request.url);
  const username = normalizeUsername(url.searchParams.get('username'));
  if (!username) return bad('MISSING', 'username required.');

  const acc = await accountId(context.env, username);
  if (!acc) return bad('NO_ACCOUNT', 'No such account.', 404);
  const prof = await latestProfile(context.env, acc.account_id);
  if (!prof) return json(200, { ok: true, hasSave: false });

  let save = {};
  try { save = JSON.parse(prof.save_json) || {}; } catch (e) { save = {}; }
  const fields = {};
  for (const f of CURATED) { const v = getPath(save, f.path); fields[f.key] = (v == null ? null : v); }
  return json(200, {
    ok: true, hasSave: true, username,
    profileId: prof.profile_id, playerName: prof.player_name,
    revision: prof.revision, updatedAt: prof.updated_at, fields
  });
}

export async function onRequestPost(context) {
  const admin = await authAdmin(context);
  if (!admin) return bad('FORBIDDEN', 'Admin access required.', 403);

  const body = await context.request.json().catch(() => ({}));
  const username = normalizeUsername(body.username);
  const action = String(body.action || '');
  if (!username) return bad('MISSING', 'username required.');

  const acc = await accountId(context.env, username);
  if (!acc) return bad('NO_ACCOUNT', 'No such account.', 404);
  const DB = context.env.DB, now = nowIso();
  const prof = await latestProfile(context.env, acc.account_id);
  if (!prof) return bad('NO_SAVE', 'This player has no cloud save to edit yet.', 404);

  let save = {};
  try { save = JSON.parse(prof.save_json) || {}; } catch (e) { save = {}; }

  if (action === 'override') {
    const incoming = (body.fields && typeof body.fields === 'object') ? body.fields : {};
    const applied = {};
    for (const f of CURATED) {
      if (!(f.key in incoming) || incoming[f.key] === '' || incoming[f.key] == null) continue;
      const v = clampInt(incoming[f.key], f.min, f.max);
      if (v == null) return bad('BAD_FIELD', 'Field ' + f.key + ' must be a number.');
      setPath(save, f.path, v);
      applied[f.key] = v;
    }
    if (!save.currencies || typeof save.currencies !== 'object') save.currencies = { gold: 0, silver: 0 };
    save._adminEditedAt = now;
  } else if (action === 'reset') {
    // Mark the save so the client wipes progress on adopt, and also zero the
    // curated fields so a cloud recovery that ignores the marker still starts near scratch.
    for (const f of CURATED) setPath(save, f.path, f.fresh);
    save._adminReset = now;
  } else if (action === 'deleteSave') {
    await DB.prepare(
      `UPDATE player_profiles SET deleted_at = ?1 WHERE profile_id = ?2 AND account_id = ?3 AND deleted_at IS NULL`
    ).bind(now, prof.profile_id, acc.account_id).run();
    return json(200, { ok: true, action, deletedSave: true });
  } else {
    return bad('BAD_ACTION', 'Unknown action.');
  }

  const nextRev = (prof.revision || 0) + 1;
  const saveJson = JSON.stringify(save);
  if (saveJson.length > 512 * 1024) return bad('TOO_LARGE', 'Edited save too large.', 413);
  await DB.prepare(
    `UPDATE player_profiles SET save_json = ?1, revision = ?2, updated_at = ?3
      WHERE profile_id = ?4 AND account_id = ?5`
  ).bind(saveJson, nextRev, now, prof.profile_id, acc.account_id).run();

  return json(200, { ok: true, action, username, revision: nextRev });
}

export const onRequest = (ctx) => {
  const m = ctx.request.method;
  if (m === 'GET') return onRequestGet(ctx);
  if (m === 'POST') return onRequestPost(ctx);
  return bad('METHOD_NOT_ALLOWED', 'Use GET or POST.', 405);
};
