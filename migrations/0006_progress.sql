-- Player progress sync for the admin dashboard (level, arenas passed, per-arena
-- performance, settings, mini-game scores…). Run AFTER 0002 — or just re-hit
-- /api/admin/bootstrap?key=... once, which now adds these columns for you.
--   npx wrangler d1 execute precalculus_odyssey --file=./migrations/0006_progress.sql

ALTER TABLE cloud_accounts ADD COLUMN progress_json TEXT;
ALTER TABLE cloud_accounts ADD COLUMN progress_at   TEXT;
