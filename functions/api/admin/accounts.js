// GET /api/admin/accounts — admin-only: list every account + its status (item 2).
import { json, bad, authAdmin } from '../cloud/_shared.js';

export async function onRequestGet(context) {
  const admin = await authAdmin(context);
  if (!admin) return bad('FORBIDDEN', 'Admin access required.', 403);
  const res = await context.env.DB.prepare(
    `SELECT username, status, is_admin, created_at, last_seen_at, approved_at
       FROM cloud_accounts WHERE username IS NOT NULL ORDER BY (status='pending') DESC, created_at DESC LIMIT 500`
  ).all();
  return json(200, {
    ok: true,
    accounts: (res.results || []).map((r) => ({
      username: r.username, status: r.status, isAdmin: !!r.is_admin,
      createdAt: r.created_at, lastSeenAt: r.last_seen_at, approvedAt: r.approved_at
    }))
  });
}
export const onRequest = (ctx) => (ctx.request.method === 'GET' ? onRequestGet(ctx) : bad('METHOD_NOT_ALLOWED', 'Use GET.', 405));
