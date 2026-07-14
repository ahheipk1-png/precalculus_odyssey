// POST /api/cloud/account/recover  — exchange a recovery code for a fresh session.
import { json, bad, nowIso, sha256hex, newId, newSessionToken, normalizeCode, readJsonBody, SESSION_TTL_DAYS } from '../_shared.js';

export async function onRequestPost(context) {
  let body;
  try { body = await readJsonBody(context.request); }
  catch (e) { return bad('BAD_REQUEST', 'Invalid request.', e.tooLarge ? 413 : 400); }

  const code = normalizeCode(body.recoveryCode);
  if (code.length < 12) return bad('INVALID_CODE', 'That code is not valid.', 401);

  try {
    const recoveryHash = await sha256hex(code);
    const acc = await context.env.DB
      .prepare(`SELECT account_id FROM cloud_accounts WHERE recovery_hash = ?1 AND disabled_at IS NULL`)
      .bind(recoveryHash).first();
    // Same generic response whether or not the account exists is impossible here (we must issue a token),
    // but we avoid leaking WHY it failed.
    if (!acc) return bad('INVALID_CODE', 'That code did not match any account.', 401);

    const token = newSessionToken();
    const tokenHash = await sha256hex(token);
    const now = nowIso();
    const expires = new Date(Date.now() + SESSION_TTL_DAYS * 86400000).toISOString();
    await context.env.DB.prepare(
      `INSERT INTO cloud_sessions (session_id, account_id, token_hash, created_at, expires_at)
       VALUES (?1, ?2, ?3, ?4, ?5)`).bind(newId('ses_'), acc.account_id, tokenHash, now, expires).run();
    await context.env.DB.prepare(`UPDATE cloud_accounts SET last_seen_at = ?1 WHERE account_id = ?2`).bind(now, acc.account_id).run();

    return json(200, { accountId: acc.account_id, sessionToken: token, expiresAt: expires });
  } catch (e) {
    return bad('SERVER_ERROR', 'Could not recover account.', 500);
  }
}

export const onRequest = (ctx) => (ctx.request.method === 'POST' ? onRequestPost(ctx) : bad('METHOD_NOT_ALLOWED', 'Use POST.', 405));
