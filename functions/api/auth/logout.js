// POST /api/auth/logout — revoke the caller's current session.
import { json, bad, nowIso, sha256hex } from '../cloud/_shared.js';

export async function onRequestPost(context) {
  try {
    const auth = context.request.headers.get('Authorization') || '';
    const m = /^Bearer\s+([A-Za-z0-9._-]+)$/.exec(auth);
    if (m) {
      const tokenHash = await sha256hex(m[1]);
      await context.env.DB.prepare(`UPDATE cloud_sessions SET revoked_at = ?1 WHERE token_hash = ?2 AND revoked_at IS NULL`).bind(nowIso(), tokenHash).run();
    }
    return json(200, { ok: true });
  } catch (e) {
    return json(200, { ok: true });
  }
}
export const onRequest = (ctx) => (ctx.request.method === 'POST' ? onRequestPost(ctx) : bad('METHOD_NOT_ALLOWED', 'Use POST.', 405));
