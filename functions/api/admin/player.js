// GET /api/admin/player?username=NAME — admin-only: one player's full details for the dashboard
// (account info + their synced progress JSON: settings, level, arenas passed, per-arena performance…).
import { json, bad, authAdmin, normalizeUsername } from '../cloud/_shared.js';

export async function onRequestGet(context) {
  try {
    const admin = await authAdmin(context);
    if (!admin) return bad('FORBIDDEN', 'Admin access required.', 403);
    const url = new URL(context.request.url);
    const username = normalizeUsername(url.searchParams.get('username'));
    if (!username) return bad('MISSING', 'username required.');

    // Base columns — the same set the accounts list uses, so they exist in every
    // deployed schema. Keep this query free of any later-added column.
    const r = await context.env.DB.prepare(
      `SELECT username, password_plain, status, is_admin, created_at, last_seen_at, approved_at,
              reg_ip, reg_city, reg_country, reg_region
         FROM cloud_accounts WHERE username = ?1`
    ).bind(username).first();
    if (!r) return bad('NO_ACCOUNT', 'No such account.', 404);

    // progress_json / progress_at were added later (migration 0006 / bootstrap). Fetch them
    // in a separate try so a DB that predates those columns still returns the account details
    // instead of throwing an unhandled 500. Re-run /api/admin/bootstrap once to add them.
    let progress = null, progressAt = '';
    try {
      const pr = await context.env.DB.prepare(
        `SELECT progress_json, progress_at FROM cloud_accounts WHERE username = ?1`
      ).bind(username).first();
      if (pr) {
        progressAt = pr.progress_at || '';
        if (pr.progress_json) { try { progress = JSON.parse(pr.progress_json); } catch (e) { progress = null; } }
      }
    } catch (e) { /* progress columns not present yet — details still load without them */ }

    return json(200, {
      ok: true,
      account: {
        username: r.username, password: r.password_plain || '', status: r.status, isAdmin: !!r.is_admin,
        createdAt: r.created_at, lastSeenAt: r.last_seen_at, approvedAt: r.approved_at,
        ip: r.reg_ip || '', city: r.reg_city || '', country: r.reg_country || '', region: r.reg_region || '',
        progressAt: progressAt
      },
      progress: progress
    });
  } catch (e) {
    return bad('SERVER_ERROR', 'Could not load player: ' + (e && e.message ? e.message : 'unknown'), 500);
  }
}
export const onRequest = (ctx) => (ctx.request.method === 'GET' ? onRequestGet(ctx) : bad('METHOD_NOT_ALLOWED', 'Use GET.', 405));
