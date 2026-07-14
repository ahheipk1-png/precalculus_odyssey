-- Precalculus Odyssey — cloud-save schema for Cloudflare D1.
-- Apply from the Cloudflare dashboard (D1 → Console) or:
--   npx wrangler d1 execute precalculus-odyssey --file=./migrations/0001_cloud_saves.sql
-- Only HASHES of recovery codes / session tokens are stored — never plaintext secrets.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS cloud_accounts (
    account_id    TEXT PRIMARY KEY,
    recovery_hash TEXT NOT NULL,
    created_at    TEXT NOT NULL,
    updated_at    TEXT NOT NULL,
    last_seen_at  TEXT NOT NULL,
    disabled_at   TEXT
);

CREATE TABLE IF NOT EXISTS cloud_sessions (
    session_id TEXT PRIMARY KEY,
    account_id TEXT NOT NULL,
    token_hash TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    revoked_at TEXT,
    FOREIGN KEY (account_id) REFERENCES cloud_accounts(account_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS player_profiles (
    profile_id   TEXT PRIMARY KEY,
    account_id   TEXT NOT NULL,
    player_name  TEXT NOT NULL,
    save_version INTEGER NOT NULL,
    revision     INTEGER NOT NULL DEFAULT 1,
    save_json    TEXT NOT NULL,
    created_at   TEXT NOT NULL,
    updated_at   TEXT NOT NULL,
    deleted_at   TEXT,
    FOREIGN KEY (account_id) REFERENCES cloud_accounts(account_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_cloud_sessions_token_hash ON cloud_sessions(token_hash);
CREATE INDEX IF NOT EXISTS idx_cloud_sessions_account    ON cloud_sessions(account_id);
CREATE INDEX IF NOT EXISTS idx_player_profiles_account   ON player_profiles(account_id);
CREATE INDEX IF NOT EXISTS idx_player_profiles_updated   ON player_profiles(account_id, updated_at);
CREATE INDEX IF NOT EXISTS idx_cloud_accounts_recovery   ON cloud_accounts(recovery_hash);
