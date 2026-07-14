-- Seed a ready-to-use admin account:  username = admin   password = admin
-- Run this AFTER 0001_cloud_saves.sql and 0002_auth.sql:
--   npx wrangler d1 execute precalculus_odyssey --file=./migrations/0003_seed_admin.sql
-- or paste into the Cloudflare dashboard → D1 → precalculus_odyssey → Console.
--
-- The password is stored as a salted SHA-256 hash exactly the way the login endpoint
-- computes it:  sha256hex( password_salt + ':' + password )  =  sha256hex('adminseed01:admin').
-- Change the password after logging in (Admin panel → Set password) — the login endpoint
-- accepts this short one, but admin "Set password" requires 8+ characters for the new one.
--
-- Idempotent: re-running it resets the admin account back to admin / admin.

DELETE FROM cloud_accounts WHERE username = 'admin';

INSERT INTO cloud_accounts
  (account_id, recovery_hash, username, password_hash, password_salt, status, is_admin, approved_at, created_at, updated_at, last_seen_at)
VALUES
  ('acc_seed_admin',
   '0000000000000000000000000000000000000000000000000000000000000000',
   'admin',
   '18fbfd7fff0c602a8f11f55e365ab30db3738ceb1a529bbb6f8ecc993d209462',
   'adminseed01',
   'approved',
   1,
   '2026-07-14T00:00:00.000Z',
   '2026-07-14T00:00:00.000Z',
   '2026-07-14T00:00:00.000Z',
   '2026-07-14T00:00:00.000Z');
