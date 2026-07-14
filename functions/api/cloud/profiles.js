// GET /api/cloud/profiles  — list this account's profiles (metadata only, not full saves).
import { json, bad, authAccount } from './_shared.js';

export async function onRequestGet(context) {
  const acc = await authAccount(context);
  if (!acc) return bad('UNAUTHORIZED', 'Sign in with your recovery code.', 401);
  try {
    const { results } = await context.env.DB
      .prepare(`SELECT profile_id, player_name, save_version, revision, updated_at, created_at
                  FROM player_profiles
                 WHERE account_id = ?1 AND deleted_at IS NULL
                 ORDER BY updated_at DESC`)
      .bind(acc.accountId).all();
    return json(200, { ok: true, profiles: results || [] });
  } catch (e) {
    return bad('SERVER_ERROR', 'Could not list profiles.', 500);
  }
}

export const onRequest = (ctx) => (ctx.request.method === 'GET' ? onRequestGet(ctx) : bad('METHOD_NOT_ALLOWED', 'Use GET.', 405));
