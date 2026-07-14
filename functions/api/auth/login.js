// POST /api/auth/login — username/password login (items 1,6).
// Enforces approval status and SINGLE active session (revokes prior sessions, except test accounts).
import { json, bad, nowIso, sha256hex, newId, newSessionToken, normalizeUsername, hashPassword, SESSION_TTL_DAYS, TEST_USERNAMES } from '../cloud/_shared.js';

export async function onRequestPost(context) {
  try {
    const body = await context.request.json().catch(() => ({}));
    const username = normalizeUsername(body.username);
    const password = String(body.password || '');
    if (!username || !password) return bad('MISSING', 'Enter your username and password.');

    const acc = await context.env.DB.prepare(
      `SELECT account_id, password_hash, password_salt, status, is_admin FROM cloud_accounts WHERE username = ?1`
    ).bind(username).first();
    if (!acc || !acc.password_hash) return bad('BAD_CREDENTIALS', 'Wrong username or password.', 401);

    const pwHash = await hashPassword(acc.password_salt, password);
    if (pwHash !== acc.password_hash) return bad('BAD_CREDENTIALS', 'Wrong username or password.', 401);

    if (acc.status !== 'approved') {
      const map = { pending: ['PENDING', 'Your account is awaiting admin approval.'],
                    rejected: ['REJECTED', 'Your account request was declined.'],
                    disabled: ['DISABLED', 'Your account has been disabled.'] };
      const m = map[acc.status] || ['NOT_APPROVED', 'Your account is not approved.'];
      return bad(m[0], m[1], 403);
    }

    const now = nowIso();
    const expires = new Date(Date.now() + SESSION_TTL_DAYS * 86400000).toISOString();
    // Single-login: revoke every other live session (except designated test accounts).
    if (TEST_USERNAMES.indexOf(username) === -1) {
      await context.env.DB.prepare(`UPDATE cloud_sessions SET revoked_at = ?1 WHERE account_id = ?2 AND revoked_at IS NULL`).bind(now, acc.account_id).run();
    }
    const token = newSessionToken();
    const tokenHash = await sha256hex(token);
    await context.env.DB.prepare(
      `INSERT INTO cloud_sessions (session_id, account_id, token_hash, created_at, expires_at) VALUES (?1, ?2, ?3, ?4, ?5)`
    ).bind(newId('ses_'), acc.account_id, tokenHash, now, expires).run();

    return json(200, { ok: true, accountId: acc.account_id, username, isAdmin: !!acc.is_admin, sessionToken: token, expiresAt: expires });
  } catch (e) {
    return bad('SERVER_ERROR', 'Could not log in.', 500);
  }
}
export const onRequest = (ctx) => (ctx.request.method === 'POST' ? onRequestPost(ctx) : bad('METHOD_NOT_ALLOWED', 'Use POST.', 405));
