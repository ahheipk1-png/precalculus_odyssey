// POST /api/auth/progress — the game pushes the logged-in player's FULL save (level, HP, gear,
// weapons, items, arena/boss/mini-game records, settings — the same shape getSaveSnapshot() builds
// for local profiles, see game/js/03-save.js) so the admin dashboard can show it AND so a login on
// a different device can restore everything, not just a level/cash summary (2026-07-21, per the
// player's own confirmation: "status" means levels, HP, arenas unlocked, weapons, items — all of it).
// GET  /api/auth/progress — the player's OWN saved copy, same auth, restored on login elsewhere
// (bridgeToGame in cloud-auth.js). Authenticated by the player's own session token both ways.
import { json, bad, nowIso, authAccountFull, readJsonBody } from '../cloud/_shared.js';

export async function onRequestPost(context) {
  try {
    const acc = await authAccountFull(context);
    if (!acc) return bad('UNAUTHENTICATED', 'Log in first.', 401);
    const body = await readJsonBody(context.request);
    // Pending admin edit/reset guard (migration 0007, functions/api/admin/save.js): a LIVE player's
    // own heartbeat push would otherwise silently overwrite an admin's edit within ~25s, before the
    // client ever had a chance to pull and apply it. Reject the push (returning the admin's version
    // instead) unless the client is explicitly confirming it just applied that override (ack:true —
    // see authPushProgress, cloud-auth.js).
    if (!body || !body.ack) {
      const pending = await context.env.DB.prepare(
        `SELECT admin_override, progress_json FROM cloud_accounts WHERE account_id = ?1`
      ).bind(acc.accountId).first();
      if (pending && pending.admin_override) {
        let overrideProgress = null;
        try { overrideProgress = pending.progress_json ? JSON.parse(pending.progress_json) : null; } catch (e) { overrideProgress = null; }
        return json(200, { ok: false, error: 'OVERRIDE_PENDING', progress: overrideProgress });
      }
    }
    const progress = body && body.progress ? body.progress : body;
    let text = '';
    try { text = JSON.stringify(progress); } catch (e) { return bad('BAD_JSON', 'Bad progress payload.'); }
    if (text.length > 512 * 1024) return bad('TOO_LARGE', 'Progress too large.');   // matches MAX_SAVE_BYTES in _shared.js (the other save pipeline's tested cap) — now a full save, not just a summary
    await context.env.DB.prepare(`UPDATE cloud_accounts SET progress_json = ?1, progress_at = ?2, admin_override = 0 WHERE account_id = ?3`)
      .bind(text, nowIso(), acc.accountId).run();
    return json(200, { ok: true });
  } catch (e) {
    return bad('SERVER_ERROR', 'Could not save progress: ' + (e && e.message ? e.message : 'unknown'), 500);
  }
}
export async function onRequestGet(context) {
  try {
    const acc = await authAccountFull(context);
    if (!acc) return bad('UNAUTHENTICATED', 'Log in first.', 401);
    let progress = null, progressAt = '';
    try {
      const r = await context.env.DB.prepare(
        `SELECT progress_json, progress_at FROM cloud_accounts WHERE account_id = ?1`
      ).bind(acc.accountId).first();
      if (r) {
        progressAt = r.progress_at || '';
        if (r.progress_json) { try { progress = JSON.parse(r.progress_json); } catch (e) { progress = null; } }
      }
    } catch (e) { /* progress columns not present yet (pre-migration-0006 DB) — return null, not a 500 */ }
    return json(200, { ok: true, progress, progressAt });
  } catch (e) {
    return bad('SERVER_ERROR', 'Could not load progress: ' + (e && e.message ? e.message : 'unknown'), 500);
  }
}
export const onRequest = (ctx) => {
  if (ctx.request.method === 'POST') return onRequestPost(ctx);
  if (ctx.request.method === 'GET') return onRequestGet(ctx);
  return bad('METHOD_NOT_ALLOWED', 'Use GET or POST.', 405);
};
