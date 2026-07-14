-- Precalculus Odyssey — username/password auth + approval + admin (items 1,2,3,6).
-- Apply AFTER 0001_cloud_saves.sql:
--   npx wrangler d1 execute precalculus_odyssey --file=./migrations/0002_auth.sql
-- or paste into the Cloudflare dashboard D1 console.
-- Passwords are stored ONLY as salted SHA-256 hashes (password_salt + ':' + password).

-- New columns on cloud_accounts. (SQLite ADD COLUMN can't be UNIQUE/NOT-NULL-without-default,
-- so username uniqueness is enforced by the index below; NULL usernames are allowed for the
-- legacy recovery-code accounts, which keep working with status 'approved'.)
ALTER TABLE cloud_accounts ADD COLUMN username      TEXT;
ALTER TABLE cloud_accounts ADD COLUMN password_hash TEXT;
ALTER TABLE cloud_accounts ADD COLUMN password_salt TEXT;
ALTER TABLE cloud_accounts ADD COLUMN status        TEXT NOT NULL DEFAULT 'approved';  -- pending | approved | rejected | disabled
ALTER TABLE cloud_accounts ADD COLUMN is_admin      INTEGER NOT NULL DEFAULT 0;
ALTER TABLE cloud_accounts ADD COLUMN approved_at   TEXT;

-- Case-insensitive-unique usernames (we store them already lower-cased at registration).
CREATE UNIQUE INDEX IF NOT EXISTS idx_cloud_accounts_username ON cloud_accounts(username);
CREATE INDEX IF NOT EXISTS idx_cloud_accounts_status ON cloud_accounts(status);
