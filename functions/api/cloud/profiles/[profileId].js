// /api/cloud/profiles/{profileId}
//   GET    → load one profile (must belong to the authed account)
//   PUT    → create/update with optimistic concurrency (expectedRevision → 409)
//   DELETE → soft-delete
import { json, bad, nowIso, authAccount, readJsonBody } from '../_shared.js';

export async function onRequest(context) {
  const acc = await authAccount(context);
  if (!acc) return bad('UNAUTHORIZED', 'Sign in with your recovery code.', 401);

  const pid = context.params.profileId;
  if (!pid || typeof pid !== 'string' || pid.length > 128) return bad('BAD_PROFILE_ID', 'Invalid profile id.', 400);

  const method = context.request.method;
  if (method === 'GET') return getProfile(context, acc, pid);
  if (method === 'PUT') return putProfile(context, acc, pid);
  if (method === 'DELETE') return deleteProfile(context, acc, pid);
  return bad('METHOD_NOT_ALLOWED', 'Use GET, PUT or DELETE.', 405);
}

async function getProfile(context, acc, pid) {
  try {
    const row = await context.env.DB
      .prepare(`SELECT profile_id, player_name, save_version, revision, save_json, updated_at
                  FROM player_profiles WHERE profile_id = ?1 AND account_id = ?2 AND deleted_at IS NULL`)
      .bind(pid, acc.accountId).first();
    if (!row) return bad('NOT_FOUND', 'Profile not found.', 404);
    let save = null; try { save = JSON.parse(row.save_json); } catch (e) {}
    return json(200, { ok: true, profileId: row.profile_id, playerName: row.player_name,
      saveVersion: row.save_version, revision: row.revision, updatedAt: row.updated_at, save });
  } catch (e) { return bad('SERVER_ERROR', 'Could not load profile.', 500); }
}

async function putProfile(context, acc, pid) {
  let body;
  try { body = await readJsonBody(context.request); }
  catch (e) { return bad(e.tooLarge ? 'TOO_LARGE' : 'BAD_REQUEST', e.tooLarge ? 'Save too large.' : 'Invalid JSON.', e.tooLarge ? 413 : 400); }

  const playerName = String(body.playerName || '').slice(0, 40) || 'Player';
  const saveVersion = Number.isInteger(body.saveVersion) ? body.saveVersion : 1;
  const expected = Number.isInteger(body.expectedRevision) ? body.expectedRevision : 0;
  if (body.save == null || typeof body.save !== 'object') return bad('BAD_SAVE', 'Missing save object.', 400);
  const saveJson = JSON.stringify(body.save);
  if (saveJson.length > 512 * 1024) return bad('TOO_LARGE', 'Save too large.', 413);

  const now = nowIso();
  try {
    const existing = await context.env.DB
      .prepare(`SELECT revision FROM player_profiles WHERE profile_id = ?1 AND account_id = ?2 AND deleted_at IS NULL`)
      .bind(pid, acc.accountId).first();

    if (!existing) {
      // First upload of this profile. Guard against a cross-account id collision.
      const owned = await context.env.DB.prepare(`SELECT account_id FROM player_profiles WHERE profile_id = ?1`).bind(pid).first();
      if (owned && owned.account_id !== acc.accountId) return bad('FORBIDDEN', 'Profile id belongs to another account.', 403);
      const rev = 1;
      await context.env.DB.prepare(
        `INSERT INTO player_profiles (profile_id, account_id, player_name, save_version, revision, save_json, created_at, updated_at)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?7)
         ON CONFLICT(profile_id) DO UPDATE SET
           player_name = excluded.player_name, save_version = excluded.save_version,
           revision = excluded.revision, save_json = excluded.save_json, updated_at = excluded.updated_at, deleted_at = NULL`)
        .bind(pid, acc.accountId, playerName, saveVersion, rev, saveJson, now).run();
      return json(200, { ok: true, revision: rev, updatedAt: now });
    }

    // Optimistic concurrency: the client's expectedRevision must match the current one.
    if (existing.revision !== expected) {
      const cur = await context.env.DB
        .prepare(`SELECT revision, updated_at FROM player_profiles WHERE profile_id = ?1 AND account_id = ?2`)
        .bind(pid, acc.accountId).first();
      return json(409, { ok: false, code: 'REVISION_CONFLICT', cloudRevision: cur.revision, cloudUpdatedAt: cur.updated_at });
    }
    const nextRev = existing.revision + 1;
    await context.env.DB.prepare(
      `UPDATE player_profiles SET player_name = ?1, save_version = ?2, revision = ?3, save_json = ?4, updated_at = ?5
        WHERE profile_id = ?6 AND account_id = ?7 AND revision = ?8`)
      .bind(playerName, saveVersion, nextRev, saveJson, now, pid, acc.accountId, expected).run();
    return json(200, { ok: true, revision: nextRev, updatedAt: now });
  } catch (e) { return bad('SERVER_ERROR', 'Could not save profile.', 500); }
}

async function deleteProfile(context, acc, pid) {
  try {
    await context.env.DB
      .prepare(`UPDATE player_profiles SET deleted_at = ?1 WHERE profile_id = ?2 AND account_id = ?3 AND deleted_at IS NULL`)
      .bind(nowIso(), pid, acc.accountId).run();
    return json(200, { ok: true, deleted: true });
  } catch (e) { return bad('SERVER_ERROR', 'Could not delete profile.', 500); }
}
