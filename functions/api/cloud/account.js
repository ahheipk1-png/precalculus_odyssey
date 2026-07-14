// POST /api/cloud/account  — create a new anonymous cloud account.
// Returns the recovery code + a session token ONCE. Only hashes are stored in D1.
import { json, bad, nowIso, sha256hex, newId, newSessionToken, newRecoveryCode, normalizeCode, SESSION_TTL_DAYS } from './_shared.js';

export async function onRequestPost(context) {
  try {
    const accountId = newId('acc_');
    const recoveryCode = newRecoveryCode();
    const recoveryHash = await sha256hex(normalizeCode(recoveryCode));
    const token = newSessionToken();
    const tokenHash = await sha256hex(token);
    const sessionId = newId('ses_');
    const now = nowIso();
    const expires = new Date(Date.now() + SESSION_TTL_DAYS * 86400000).toISOString();

    await context.env.DB.batch([
      context.env.DB.prepare(
        `INSERT INTO cloud_accounts (account_id, recovery_hash, created_at, updated_at, last_seen_at)
         VALUES (?1, ?2, ?3, ?3, ?3)`).bind(accountId, recoveryHash, now),
      context.env.DB.prepare(
        `INSERT INTO cloud_sessions (session_id, account_id, token_hash, created_at, expires_at)
         VALUES (?1, ?2, ?3, ?4, ?5)`).bind(sessionId, accountId, tokenHash, now, expires)
    ]);

    return json(200, { accountId, recoveryCode, sessionToken: token, expiresAt: expires });
  } catch (e) {
    return bad('SERVER_ERROR', 'Could not create account.', 500);
  }
}

export const onRequest = (ctx) => (ctx.request.method === 'POST' ? onRequestPost(ctx) : bad('METHOD_NOT_ALLOWED', 'Use POST.', 405));
