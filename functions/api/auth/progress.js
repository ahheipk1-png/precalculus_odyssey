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
    // Read the CURRENTLY-STORED save up front — needed both for the admin-override guard below and
    // for the never-downgrade merge (cleared arenas / perfect stars are monotonic; see below).
    // Defensive column fallbacks mirror the GET handler's, so pre-migration DBs never hard-500.
    let stored = null, storedOverride = 0;
    try {
      const row = await context.env.DB.prepare(
        `SELECT admin_override, progress_json FROM cloud_accounts WHERE account_id = ?1`
      ).bind(acc.accountId).first();
      if (row) {
        storedOverride = row.admin_override || 0;
        try { stored = row.progress_json ? JSON.parse(row.progress_json) : null; } catch (e) { stored = null; }
      }
    } catch (e) {
      // admin_override column not present yet (pre-migration-0007 DB) — still fetch the save itself.
      try {
        const row2 = await context.env.DB.prepare(
          `SELECT progress_json FROM cloud_accounts WHERE account_id = ?1`
        ).bind(acc.accountId).first();
        if (row2) { try { stored = row2.progress_json ? JSON.parse(row2.progress_json) : null; } catch (e2) { stored = null; } }
      } catch (e2) { /* pre-migration-0006 DB — no progress column at all */ }
    }
    // Pending admin edit/reset guard (migration 0007, functions/api/admin/save.js): a LIVE player's
    // own heartbeat push would otherwise silently overwrite an admin's edit within ~25s, before the
    // client ever had a chance to pull and apply it. Reject the push (returning the admin's version
    // instead) unless the client is explicitly confirming it just applied that override (ack:true —
    // see authPushProgress, cloud-auth.js).
    if ((!body || !body.ack) && storedOverride) {
      return json(200, { ok: false, error: 'OVERRIDE_PENDING', progress: stored });
    }
    const progress = body && body.progress ? body.progress : body;
    // NEVER-DOWNGRADE merge (2026-08-04 data-loss postmortem: an old device's stale local profile
    // overwrote a real player's cloud save, re-locking arenas 4-10 and erasing their stars — the
    // owner's rule: "any level passed should never be locked again, every level got green star
    // should never be downgraded"). bossDefeated/perfectArenas only ever legitimately grow, so any
    // cleared/starred arena already stored is folded into every incoming push. The client now
    // guards this too (bridgeToGame/_mergeProgressMaps, cloud-auth.js), but devices can run stale
    // cached JS for weeks — this server-side union is the invariant's real enforcement.
    // Exception: an admin "Reset to beginning" (_adminReset marker) is a deliberate wipe — honor it.
    if (stored && progress && typeof progress === 'object' && !stored._adminReset) {
      for (const key of ['bossDefeated', 'perfectArenas']) {
        const src = stored[key];
        if (!src || typeof src !== 'object') continue;
        if (!progress[key] || typeof progress[key] !== 'object') progress[key] = {};
        for (const k in src) { if (src[k] && !progress[key][k]) progress[key][k] = true; }
      }
    }
    let text = '';
    try { text = JSON.stringify(progress); } catch (e) { return bad('BAD_JSON', 'Bad progress payload.'); }
    if (text.length > 512 * 1024) return bad('TOO_LARGE', 'Progress too large.');   // matches MAX_SAVE_BYTES in _shared.js (the other save pipeline's tested cap) — now a full save, not just a summary
    const now = nowIso();
    try {
      await context.env.DB.prepare(`UPDATE cloud_accounts SET progress_json = ?1, progress_at = ?2, admin_override = 0 WHERE account_id = ?3`)
        .bind(text, now, acc.accountId).run();
    } catch (e) {
      // Same pre-migration-0007 fallback as the guard above — write the two columns every DB has.
      await context.env.DB.prepare(`UPDATE cloud_accounts SET progress_json = ?1, progress_at = ?2 WHERE account_id = ?3`)
        .bind(text, now, acc.accountId).run();
    }
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
