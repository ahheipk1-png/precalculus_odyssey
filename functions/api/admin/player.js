// GET /api/admin/player?username=NAME — admin-only: one player's full details for the dashboard
// (account info + their synced progress JSON: settings, level, arenas passed, per-arena performance…).
import { json, bad, authAdmin, normalizeUsername } from '../cloud/_shared.js';

export async function onRequestGet(context) {
  const admin = await authAdmin(context);
  if (!admin) return bad('FORBIDDEN', 'Admin access required.', 403);
  const url = new URL(context.request.url);
  const username = normalizeUsername(url.searchParams.get('username'));
  if (!username) return bad('MISSING', 'username required.');

  const r = await context.env.DB.prepare(
    `SELECT username, password_plain, status, is_admin, created_at, last_seen_at, approved_at,
            reg_ip, reg_city, reg_country, reg_region, progress_json, progress_at
       FROM cloud_accounts WHERE username = ?1`
  ).bind(username).first();
  if (!r) return bad('NO_ACCOUNT', 'No such account.', 404);

  let progress = null;
  if (r.progress_json) { try { progress = JSON.parse(r.progress_json); } catch (e) { progress = null; } }

  return json(200, {
    ok: true,
    account: {
      username: r.username, password: r.password_plain || '', status: r.status, isAdmin: !!r.is_admin,
      createdAt: r.created_at, lastSeenAt: r.last_seen_at, approvedAt: r.approved_at,
      ip: r.reg_ip || '', city: r.reg_city || '', country: r.reg_country || '', region: r.reg_region || '',
      progressAt: r.progress_at || ''
    },
    progress: progress
  });
}
export const onRequest = (ctx) => (ctx.request.method === 'GET' ? onRequestGet(ctx) : bad('METHOD_NOT_ALLOWED', 'Use GET.', 405));
