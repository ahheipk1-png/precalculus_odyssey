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
// (getSaveSnapshot shape) and a defensive clamp. Nothing else is editable here — gear arrays,
// codex, arena stats, etc. are left untouched. Must mirror ADMIN_SAVE_FIELDS in cloud-auth.js.
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
  return json(200, { ok: true, hasProgress: true, username, progressAt: acc.progress_at || '', fields });
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
  await DB.prepare(
    `UPDATE cloud_accounts SET progress_json = ?1, progress_at = ?2, admin_override = 1 WHERE account_id = ?3`
  ).bind(saveJson, now, acc.account_id).run();

  return json(200, { ok: true, action, username });
}

export const onRequest = (ctx) => {
  const m = ctx.request.method;
  if (m === 'GET') return onRequestGet(ctx);
  if (m === 'POST') return onRequestPost(ctx);
  return bad('METHOD_NOT_ALLOWED', 'Use GET or POST.', 405);
};
