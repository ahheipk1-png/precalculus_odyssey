// Shared helpers for the cloud-save Pages Functions (Cloudflare, D1 binding `DB`).
// Runtime is the Workers runtime: Web Crypto + fetch are global. No secrets ever
// reach the browser; recovery codes and tokens are stored ONLY as SHA-256 hashes.

export const MAX_SAVE_BYTES = 512 * 1024;   // reject bodies above ~512 KB
export const SESSION_TTL_DAYS = 400;
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no 0/O/1/I/L ambiguity

export function json(status, obj, extra) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: Object.assign({ 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }, extra || {})
  });
}
export const ok = (obj) => json(200, obj);
export const bad = (code, msg, status) => json(status || 400, { ok: false, code: code, error: msg || code });

export function nowIso() { return new Date().toISOString(); }

export async function sha256hex(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function randBytesHex(n) {
  const a = new Uint8Array(n); crypto.getRandomValues(a);
  return [...a].map((b) => b.toString(16).padStart(2, '0')).join('');
}
export function newId(prefix) { return (prefix || '') + randBytesHex(16); }
export function newSessionToken() { return randBytesHex(32); }  // 64 hex chars

// Human-friendly, cryptographically-secure recovery code: 5 groups of 4, e.g. WXYZ-2345-...
export function newRecoveryCode() {
  const a = new Uint32Array(20); crypto.getRandomValues(a);
  const chars = [...a].map((n) => CODE_ALPHABET[n % CODE_ALPHABET.length]);
  const groups = [];
  for (let i = 0; i < 20; i += 4) groups.push(chars.slice(i, i + 4).join(''));
  return groups.join('-');
}
export function normalizeCode(code) { return String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, ''); }

// Authenticate the Bearer token → return the account row, or null.
export async function authAccount(context) {
  const auth = context.request.headers.get('Authorization') || '';
  const m = /^Bearer\s+([A-Za-z0-9._-]+)$/.exec(auth);
  if (!m) return null;
  const tokenHash = await sha256hex(m[1]);
  const row = await context.env.DB
    .prepare(`SELECT s.account_id AS account_id
                FROM cloud_sessions s
               WHERE s.token_hash = ?1 AND s.revoked_at IS NULL AND s.expires_at > ?2`)
    .bind(tokenHash, nowIso())
    .first();
  if (!row) return null;
  // touch last_seen (best-effort; ignore failure)
  try { await context.env.DB.prepare(`UPDATE cloud_accounts SET last_seen_at = ?1 WHERE account_id = ?2`).bind(nowIso(), row.account_id).run(); } catch (e) {}
  return { accountId: row.account_id };
}

// ---- Username / password auth (items 1,2,3,6) ----
export const TEST_USERNAMES = ['mitb', 'michaelisthebest', 'michealisthebest']; // exempt from single-login

export function normalizeUsername(u) { return String(u || '').trim().toLowerCase(); }
export function validUsername(u) { return /^[a-z0-9_]{3,16}$/.test(u); }
export function validPassword(p) { return typeof p === 'string' && p.length >= 8 && p.length <= 64; }

export function newSalt() { return randBytesHex(12); }
export async function hashPassword(salt, password) { return sha256hex(salt + ':' + String(password)); }

// Authenticate the Bearer token → full account row (id, username, is_admin, status), or null.
export async function authAccountFull(context) {
  const auth = context.request.headers.get('Authorization') || '';
  const m = /^Bearer\s+([A-Za-z0-9._-]+)$/.exec(auth);
  if (!m) return null;
  const tokenHash = await sha256hex(m[1]);
  const row = await context.env.DB
    .prepare(`SELECT a.account_id AS account_id, a.username AS username, a.is_admin AS is_admin, a.status AS status
                FROM cloud_sessions s JOIN cloud_accounts a ON a.account_id = s.account_id
               WHERE s.token_hash = ?1 AND s.revoked_at IS NULL AND s.expires_at > ?2`)
    .bind(tokenHash, nowIso())
    .first();
  if (!row) return null;
  try { await context.env.DB.prepare(`UPDATE cloud_accounts SET last_seen_at = ?1 WHERE account_id = ?2`).bind(nowIso(), row.account_id).run(); } catch (e) {}
  return { accountId: row.account_id, username: row.username, isAdmin: !!row.is_admin, status: row.status };
}

// For admin-only endpoints: returns the admin account or throws a Response via the caller's guard.
export async function authAdmin(context) {
  const acc = await authAccountFull(context);
  if (!acc || !acc.isAdmin || acc.status !== 'approved') return null;
  return acc;
}

export async function readJsonBody(request) {
  const text = await request.text();
  if (text.length > MAX_SAVE_BYTES) { const e = new Error('too large'); e.tooLarge = true; throw e; }
  if (!text) return {};
  try { return JSON.parse(text); } catch (e) { const err = new Error('bad json'); err.badJson = true; throw err; }
}
