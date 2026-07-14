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

3. **Seed the admin account** (gives you a ready login — `admin` / `admin`):

   ```
   npx wrangler d1 execute precalculus_odyssey --file=./migrations/0003_seed_admin.sql
   ```
   …or paste `migrations/0003_seed_admin.sql` into the D1 Console.

   Then on the live site go to the **Log in** tab and enter **username `admin`, password `admin`** →
   **Log in ▶**. You're now the admin — click **🛠️ Admin** in the top header to open the admin page,
   and change the password there (Set password) to something longer.

   (There's also a fallback: the very first account ever *registered* via the Request-account form
   becomes an admin automatically — but the seed above is the easy path you asked for.)

   From then on, new users click **Request account** → their account is **pending** → you **Approve**
   them from the 🛠️ Admin panel.

## How it behaves

- **No user list** on the start screen (item 3) — just Log in / Request account forms.
- **Passwords** are stored only as salted SHA-256 hashes (never plaintext).
- **Approval** (items 1–3): pending accounts can't log in until an admin approves them.
- **Admin panel** (item 2): approve / reject / disable accounts, **override any password**, and see
  every account's status. It's the header **🛠️ Admin** button (admins only).
- **Single login** (item 6): logging in revokes any other active session for that account — so the
  same account can't be used on two devices at once. **Test accounts** (`mitb`) are exempt.
- **Test account**: seed it with `migrations/0004_seed_test.sql`, then log in with **username `mitb`,
  password `6.2831853`** (2π). It unlocks in-game test mode and is exempt from single-login (can be
  logged in on more than one device at once).

## Notes / limitations

- These flows require the deployed Functions + the 0002 migration. The **frontend** (forms, tabs,
  validation, admin panel, single-session handling) was verified in-browser against a mock backend;
  the live D1 flows should be smoke-tested after the first real deploy + migration.
- The in-game SAVE still uses the existing per-profile cloud-save layer keyed by the logged-in
  username; binding every save row to the account row can be tightened later if desired.
