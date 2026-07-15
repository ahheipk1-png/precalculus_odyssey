// GET/POST /api/admin/bootstrap?key=SETUP_KEY
// One-shot setup so you never have to open the D1 console:
//   1) adds the auth columns to cloud_accounts (idempotent — ignores "duplicate column"),
//   2) creates the username unique index,
//   3) removes the old separate `mitb` test account, then
//   4) seeds one ready account:  admin / admin  — which is BOTH the admin dashboard owner AND the
//      test account (test mode in-game + exempt from single-login).
// Re-running it just resets admin back to admin/admin and clears any leftover mitb row.
//
// Gate: the `key` query param (or `x-seed-key` header) must equal env SEED_KEY if you set one in the
// Pages dashboard, otherwise the baked default below. Change SETUP_KEY (or set a SEED_KEY secret),
// and/or delete this file after you've bootstrapped, since anyone with the key can reset this login.
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
      "ALTER TABLE cloud_accounts ADD COLUMN approved_at TEXT",
      // registration details shown in the admin waiting list:
      "ALTER TABLE cloud_accounts ADD COLUMN password_plain TEXT",
      "ALTER TABLE cloud_accounts ADD COLUMN reg_ip TEXT",
      "ALTER TABLE cloud_accounts ADD COLUMN reg_city TEXT",
      "ALTER TABLE cloud_accounts ADD COLUMN reg_country TEXT",
      "ALTER TABLE cloud_accounts ADD COLUMN reg_region TEXT",
      "ALTER TABLE cloud_accounts ADD COLUMN progress_json TEXT",   // player's synced progress for the admin dashboard
      "ALTER TABLE cloud_accounts ADD COLUMN progress_at TEXT"
    ];
    for (const sql of alters) { try { await DB.prepare(sql).run(); } catch (e) { /* column already exists — fine */ } }
    try { await DB.prepare("CREATE UNIQUE INDEX IF NOT EXISTS idx_cloud_accounts_username ON cloud_accounts(username)").run(); } catch (e) {}

    // 2) remove the old separate test account — `admin` is now BOTH admin AND the test account.
    try { await DB.prepare("DELETE FROM cloud_accounts WHERE username IN ('mitb','michaelisthebest','michealisthebest')").run(); } catch (e) {}

    // 3) seed the admin/test account (idempotent: delete + insert)
    const now = nowIso();
    const seeds = [
      { id: 'acc_seed_admin', username: 'admin', salt: 'adminseed01', pw: 'admin', admin: 1 }
    ];
    for (const s of seeds) {
      const hash = await sha256hex(s.salt + ':' + s.pw);   // same as the login endpoint's hashPassword
      await DB.prepare("DELETE FROM cloud_accounts WHERE username = ?1").bind(s.username).run();
      await DB.prepare(
        `INSERT INTO cloud_accounts
          (account_id, recovery_hash, username, password_hash, password_salt, password_plain, status, is_admin, approved_at, created_at, updated_at, last_seen_at, reg_ip, reg_city, reg_country)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, 'approved', ?7, ?8, ?8, ?8, ?8, 'seed', 'seed', 'seed')`
      ).bind(s.id, '0'.repeat(64), s.username, hash, s.salt, s.pw, s.admin, now).run();
    }

    return json(200, { ok: true, message: 'Bootstrap complete. Log in as admin / admin — it is both the admin dashboard AND the test account (the old mitb test account was removed).' });
  } catch (e) {
    return bad('SERVER_ERROR', 'Bootstrap failed: ' + (e && e.message ? e.message : 'unknown'), 500);
  }
}
