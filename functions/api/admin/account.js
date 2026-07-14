// POST /api/admin/account — admin-only actions on one account (item 2):
//   approve | reject | disable | enable | makeAdmin | setPassword (override).
import { json, bad, nowIso, authAdmin, normalizeUsername, validPassword, newSalt, hashPassword } from '../cloud/_shared.js';

export async function onRequestPost(context) {
  const admin = await authAdmin(context);
  if (!admin) return bad('FORBIDDEN', 'Admin access required.', 403);

  const body = await context.request.json().catch(() => ({}));
  const username = normalizeUsername(body.username);
  const action = String(body.action || '');
  if (!username) return bad('MISSING', 'username required.');

  const acc = await context.env.DB.prepare(`SELECT account_id, is_admin FROM cloud_accounts WHERE username = ?1`).bind(username).first();
  if (!acc) return bad('NO_ACCOUNT', 'No such account.', 404);
  const DB = context.env.DB, now = nowIso();
  const revokeSessions = () => DB.prepare(`UPDATE cloud_sessions SET revoked_at = ?1 WHERE account_id = ?2 AND revoked_at IS NULL`).bind(now, acc.account_id).run();

  switch (action) {
    case 'approve':
      await DB.prepare(`UPDATE cloud_accounts SET status='approved', approved_at=?1, updated_at=?1 WHERE account_id=?2`).bind(now, acc.account_id).run();
      break;
    case 'reject':
      await DB.prepare(`UPDATE cloud_accounts SET status='rejected', updated_at=?1 WHERE account_id=?2`).bind(now, acc.account_id).run();
      await revokeSessions();
      break;
    case 'disable':
      await DB.prepare(`UPDATE cloud_accounts SET status='disabled', updated_at=?1 WHERE account_id=?2`).bind(now, acc.account_id).run();
      await revokeSessions();
      break;
    case 'enable':
      await DB.prepare(`UPDATE cloud_accounts SET status='approved', approved_at=COALESCE(approved_at, ?1), updated_at=?1 WHERE account_id=?2`).bind(now, acc.account_id).run();
      break;
    case 'makeAdmin':
      await DB.prepare(`UPDATE cloud_accounts SET is_admin=1, status='approved', approved_at=COALESCE(approved_at, ?1), updated_at=?1 WHERE account_id=?2`).bind(now, acc.account_id).run();
      break;
    case 'setPassword': {
      const pw = String(body.newPassword || '');
      if (!validPassword(pw)) return bad('BAD_PASSWORD', 'Password must be at least 8 characters.');
      const salt = newSalt(), h = await hashPassword(salt, pw);
      await DB.prepare(`UPDATE cloud_accounts SET password_hash=?1, password_salt=?2, password_plain=?3, updated_at=?4 WHERE account_id=?5`).bind(h, salt, pw, now, acc.account_id).run();
      await revokeSessions();   // force re-login with the new password
      break;
    }
    default:
      return bad('BAD_ACTION', 'Unknown action.');
  }
  return json(200, { ok: true, username, action });
}
export const onRequest = (ctx) => (ctx.request.method === 'POST' ? onRequestPost(ctx) : bad('METHOD_NOT_ALLOWED', 'Use POST.', 405));
