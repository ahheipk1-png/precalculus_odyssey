-- Lets an admin edit/reset a player's progress and have it reliably reach that player even if
-- they're already logged in and playing right now (not just on their next login). Without this,
-- the player's own 25s heartbeat push (authPushProgress, cloud-auth.js) would silently overwrite
-- the admin's edit with the player's own stale local state within seconds.
--
-- functions/api/auth/progress.js's POST handler checks this flag: if set, it REJECTS a normal
-- heartbeat push (returning the admin's edited snapshot instead of accepting the player's), so the
-- client can apply the admin's version locally first, then confirm (which clears the flag).
-- Run AFTER 0006 — or just re-hit /api/admin/bootstrap?key=... once, which adds this column too.
--   npx wrangler d1 execute precalculus_odyssey --file=./migrations/0007_admin_override.sql

ALTER TABLE cloud_accounts ADD COLUMN admin_override INTEGER NOT NULL DEFAULT 0;
