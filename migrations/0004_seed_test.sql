-- Seed the TEST account:  username = mitb   password = Pi*2=6.2831853   (literal text)
-- Easiest: DON'T run this — just hit /api/admin/bootstrap?key=... once (see AUTH_SETUP.md).
-- Or run AFTER 0001 + 0002:
--   npx wrangler d1 execute precalculus_odyssey --file=./migrations/0004_seed_test.sql
-- or paste into the Cloudflare dashboard → D1 → precalculus_odyssey → Console.
--
-- Password stored the same way the login endpoint computes it:
--   sha256hex( password_salt + ':' + password )  =  sha256hex('mitbseed01:Pi*2=6.2831853').
-- 'mitb' is a recognised test account: it unlocks test mode in-game AND is exempt from the
-- single-login rule (it can be logged in on more than one device at once).
-- Idempotent: re-running resets it back to mitb / Pi*2=6.2831853.

DELETE FROM cloud_accounts WHERE username = 'mitb';

INSERT INTO cloud_accounts
  (account_id, recovery_hash, username, password_hash, password_salt, status, is_admin, approved_at, created_at, updated_at, last_seen_at)
VALUES
  ('acc_seed_mitb',
   '0000000000000000000000000000000000000000000000000000000000000000',
   'mitb',
   'b6920ef6192fbce091f31c25b40506c36d475b01d7a0c243df9ba0438e872f50',
   'mitbseed01',
   'approved',
   0,
   '2026-07-14T00:00:00.000Z',
   '2026-07-14T00:00:00.000Z',
   '2026-07-14T00:00:00.000Z',
   '2026-07-14T00:00:00.000Z');
