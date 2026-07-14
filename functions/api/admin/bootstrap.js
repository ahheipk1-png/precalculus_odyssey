// GET/POST /api/admin/bootstrap?key=SETUP_KEY
// One-shot setup so you never have to open the D1 console:
//   1) adds the auth columns to cloud_accounts (idempotent — ignores "duplicate column"),
//   2) creates the username unique index,
//   3) seeds two ready accounts:  admin / admin   and   mitb / Pi*2=6.2831853  (the test account).
// Re-running it just resets those two accounts back to those passwords.
//
// Gate: the `key` query param (or `x-seed-key` header) must equal env SEED_KEY if you set one in the
// Pages dashboard, otherwise the baked default below. Change SETUP_KEY (or set a SEED_KEY secret),
// and/or delete this file after you've bootstrapped, since anyone with the key can reset these two logins.
import { json, bad, nowIso, sha256hex } from '../cloud/_shared.js';

const SETUP_KEY = 'odyssey-setup-2pi';   // <-- change me (or set a SEED_KEY secret in Cloudflare Pages)

export async function onRequest(context) {
  try {
    const url = new URL(context.request.url);
    const provided = url.searchParams.get('key') || context.request.headers.get('x-seed-key') || '';
    const expected = context.env.SEED_KEY || SETUP_KEY;
    if (provided !== expected) return bad('FORBIDDEN', 'Bad or missing setup key.', 403);

    const DB = context.env.DB;

    // 1) schema (idempotent)
    const alters = [
      "ALTER TABLE cloud_accounts ADD COLUMN username TEXT",
      "ALTER TABLE cloud_accounts ADD COLUMN password_hash TEXT",
      "ALTER TABLE cloud_accounts ADD COLUMN password_salt TEXT",
      "ALTER TABLE cloud_accounts ADD COLUMN status TEXT NOT NULL DEFAULT 'approved'",
      "ALTER TABLE cloud_accounts ADD COLUMN is_admin INTEGER NOT NULL DEFAULT 0",
      "ALTER TABLE cloud_accounts ADD COLUMN approved_at TEXT"
    ];
    for (const sql of alters) { try { await DB.prepare(sql).run(); } catch (e) { /* column already exists — fine */ } }
    try { await DB.prepare("CREATE UNIQUE INDEX IF NOT EXISTS idx_cloud_accounts_username ON cloud_accounts(username)").run(); } catch (e) {}

    // 2) seed admin + test account (idempotent: delete + insert)
    const now = nowIso();
    const seeds = [
      { id: 'acc_seed_admin', username: 'admin', salt: 'adminseed01', pw: 'admin',          admin: 1 },
      { id: 'acc_seed_mitb',  username: 'mitb',  salt: 'mitbseed01',  pw: 'Pi*2=6.2831853',  admin: 0 }
    ];
    for (const s of seeds) {
      const hash = await sha256hex(s.salt + ':' + s.pw);   // same as the login endpoint's hashPassword
      await DB.prepare("DELETE FROM cloud_accounts WHERE username = ?1").bind(s.username).run();
      await DB.prepare(
        `INSERT INTO cloud_accounts
          (account_id, recovery_hash, username, password_hash, password_salt, status, is_admin, approved_at, created_at, updated_at, last_seen_at)
         VALUES (?1, ?2, ?3, ?4, ?5, 'approved', ?6, ?7, ?7, ?7, ?7)`
      ).bind(s.id, '0'.repeat(64), s.username, hash, s.salt, s.admin, now).run();
    }

    return json(200, { ok: true, message: 'Bootstrap complete. Log in as admin/admin (admin) or mitb / Pi*2=6.2831853 (test).' });
  } catch (e) {
    return bad('SERVER_ERROR', 'Bootstrap failed: ' + (e && e.message ? e.message : 'unknown'), 500);
  }
}
