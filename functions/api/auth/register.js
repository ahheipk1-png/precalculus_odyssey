// POST /api/auth/register — request a username/password account (items 1,3).
// New accounts start 'pending' and must be approved by an admin before they can log in.
// The FIRST username account ever created becomes the admin (approved) to bootstrap the system.
import { json, bad, nowIso, sha256hex, newId, normalizeUsername, validUsername, validPassword, newSalt, hashPassword } from '../cloud/_shared.js';

export async function onRequestPost(context) {
  try {
    const body = await context.request.json().catch(() => ({}));
    const username = normalizeUsername(body.username);
    const password = String(body.password || '');
    if (!validUsername(username)) return bad('BAD_USERNAME', 'Username must be 3–16 letters, numbers or underscore.');
    if (!validPassword(password)) return bad('BAD_PASSWORD', 'Password must be at least 8 characters.');

    const existing = await context.env.DB.prepare(`SELECT account_id FROM cloud_accounts WHERE username = ?1`).bind(username).first();
    if (existing) return bad('USERNAME_TAKEN', 'That username is already registered.', 409);

    const cnt = await context.env.DB.prepare(`SELECT COUNT(*) AS n FROM cloud_accounts WHERE username IS NOT NULL`).first();
    const isFirst = !cnt || cnt.n === 0;                 // bootstrap: first account = admin
    const accountId = newId('acc_');
    const salt = newSalt();
    const pwHash = await hashPassword(salt, password);
    const now = nowIso();
    const recoveryHash = await sha256hex(newId('rec_')); // recovery_hash is NOT NULL; unused for pw accounts

    await context.env.DB.prepare(
      `INSERT INTO cloud_accounts
        (account_id, recovery_hash, username, password_hash, password_salt, status, is_admin, approved_at, created_at, updated_at, last_seen_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?9, ?9)`
    ).bind(accountId, recoveryHash, username, pwHash, salt, isFirst ? 'approved' : 'pending', isFirst ? 1 : 0, isFirst ? now : null, now).run();

    return json(200, {
      ok: true, username, status: isFirst ? 'approved' : 'pending', isAdmin: isFirst,
      message: isFirst
        ? 'Admin account created and approved — you can log in now.'
        : 'Account requested! An admin must approve it before you can log in.'
    });
  } catch (e) {
    return bad('SERVER_ERROR', 'Could not register.', 500);
  }
}
export const onRequest = (ctx) => (ctx.request.method === 'POST' ? onRequestPost(ctx) : bad('METHOD_NOT_ALLOWED', 'Use POST.', 405));
