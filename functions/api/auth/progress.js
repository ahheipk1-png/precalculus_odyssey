// POST /api/auth/progress — the game pushes the logged-in player's progress summary
// (level, arenas passed, per-arena performance, settings, mini-game scores, …) so the
// admin dashboard can show it. Authenticated by the player's own session token.
import { json, bad, nowIso, authAccountFull, readJsonBody } from '../cloud/_shared.js';

export async function onRequestPost(context) {
  try {
    const acc = await authAccountFull(context);
    if (!acc) return bad('UNAUTHENTICATED', 'Log in first.', 401);
    const body = await readJsonBody(context.request);
    const progress = body && body.progress ? body.progress : body;
    let text = '';
    try { text = JSON.stringify(progress); } catch (e) { return bad('BAD_JSON', 'Bad progress payload.'); }
    if (text.length > 200 * 1024) return bad('TOO_LARGE', 'Progress too large.');
    await context.env.DB.prepare(`UPDATE cloud_accounts SET progress_json = ?1, progress_at = ?2 WHERE account_id = ?3`)
      .bind(text, nowIso(), acc.accountId).run();
    return json(200, { ok: true });
  } catch (e) {
    return bad('SERVER_ERROR', 'Could not save progress: ' + (e && e.message ? e.message : 'unknown'), 500);
  }
}
export const onRequest = (ctx) => (ctx.request.method === 'POST' ? onRequestPost(ctx) : bad('METHOD_NOT_ALLOWED', 'Use POST.', 405));
