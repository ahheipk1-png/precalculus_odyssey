# Auth setup — username/password login, approval & admin (items 1,2,3,6)

The game now logs in through the **Cloudflare D1** database with a username + password,
account-approval workflow, an admin panel, and a single active session per account.

## One-time deploy steps

1. **Run the new migration** (adds the auth columns to `cloud_accounts`):

   ```
   npx wrangler d1 execute precalculus_odyssey --file=./migrations/0002_auth.sql
   ```
   …or paste `migrations/0002_auth.sql` into the Cloudflare dashboard → **D1 → your database → Console**.

2. **Deploy** (already automatic on `git push` to `main`). The new Functions are:
   - `POST /api/auth/register` — request an account (username 3–16, password ≥ 8 chars).
   - `POST /api/auth/login` — log in; enforces approval + single active session.
   - `POST /api/auth/logout` — end the session.
   - `GET  /api/admin/accounts` — admin-only: every account + its status.
   - `POST /api/admin/account` — admin-only: `approve` / `reject` / `disable` / `enable` / `makeAdmin` / `setPassword`.

3. **Create the admin account.** On the live site, click **Request account** and register a username +
   password. **The first account ever registered becomes the admin** (auto-approved). From then on:
   - New users click **Request account** → their account is created as **pending**.
   - You (admin) log in, click **🛠️ Admin** in the header, and **Approve** them.

## How it behaves

- **No user list** on the start screen (item 3) — just Log in / Request account forms.
- **Passwords** are stored only as salted SHA-256 hashes (never plaintext).
- **Approval** (items 1–3): pending accounts can't log in until an admin approves them.
- **Admin panel** (item 2): approve / reject / disable accounts, **override any password**, and see
  every account's status. It's the header **🛠️ Admin** button (admins only).
- **Single login** (item 6): logging in revokes any other active session for that account — so the
  same account can't be used on two devices at once. **Test accounts** (`mitb`) are exempt.
- **Test account**: the start screen has a **"Play the test account (offline)"** link — it starts the
  game locally without the cloud, so the game is always playable even before the backend is set up.

## Notes / limitations

- These flows require the deployed Functions + the 0002 migration. The **frontend** (forms, tabs,
  validation, admin panel, single-session handling) was verified in-browser against a mock backend;
  the live D1 flows should be smoke-tested after the first real deploy + migration.
- The in-game SAVE still uses the existing per-profile cloud-save layer keyed by the logged-in
  username; binding every save row to the account row can be tightened later if desired.
