# Precalculus Odyssey — Cloud Save & Hosting setup (Cloudflare Pages + D1)

This is the **click-by-click** guide to put the game online with cloud saves. The **code is already written** (see “What’s in the repo” below); these are the account/deploy steps only you can do. Everything here uses **free tiers** — no server to buy.

Roughly 20–30 minutes. You’ll need a **GitHub** account and a **Cloudflare** account (both free).

---

## What’s already in the repo (done by the code layer)
| Path | Purpose |
|---|---|
| `game/` | the static game (unchanged play; now also loads `js/cloud-save.js` + `js/cloud-ui.js`) |
| `functions/api/cloud/…` | the server API (account, recover, profiles, profiles/[id]) — Cloudflare **Pages Functions** |
| `migrations/0001_cloud_saves.sql` | the **D1** database schema |
| `wrangler.toml` | Pages config: static output = `game/`, D1 binding `DB` |
| `tools/local-save-server.ps1` | optional `C:\temp` backup companion (not required) |

The front end only calls **relative** paths (`/api/cloud/...`) so nothing is hard-coded to a domain.

---

## Step 1 — Put the project on GitHub
1. Create a new **empty** GitHub repo, e.g. `precalculus-odyssey` (private is fine).
2. From the project root (`C:\PythonProject\AlgebraGame`) push it:
   ```powershell
   git add -A
   git commit -m "Add Cloudflare cloud-save layer"
   git branch -M main
   git remote add origin https://github.com/<you>/precalculus-odyssey.git
   git push -u origin main
   ```
   > Don’t commit the `backups/` folder — add it to `.gitignore` first (see “Housekeeping”).

## Step 2 — Create the D1 database
1. Cloudflare dashboard → **Workers & Pages → D1 → Create database**.
2. Name it **`precalculus-odyssey`** → Create.
3. Open it → **Console** tab → paste the entire contents of `migrations/0001_cloud_saves.sql` → **Execute**.
   (You should see the 3 tables + indexes created.)
4. Copy the database’s **Database ID** (you may paste it into `wrangler.toml`, optional).

## Step 3 — Create the Pages project (Git integration)
1. **Workers & Pages → Create → Pages → Connect to Git** → pick your repo.
2. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** **`game`**  ← important (the site lives in `game/`)
3. **Save and Deploy.** Wait for the first build; you’ll get a `https://<project>.pages.dev` URL.

## Step 4 — Bind D1 to the Pages project
1. Pages project → **Settings → Functions → D1 database bindings** (a.k.a. Bindings).
2. Add binding: **Variable name = `DB`**, **D1 database = precalculus-odyssey**.
3. Add the **same binding to Preview** too if you want cloud saves on preview deploys.
4. **Redeploy** (Deployments → … → Retry deployment) so the binding takes effect.

## Step 5 — Verify
- Open `https://<project>.pages.dev` — the game loads over HTTPS, no console errors.
- Click **☁ Cloud → Enable Cloud Save** → you should see a **recovery code** once. Save it.
- Play a little; the ☁ chip should go green (“Saved to cloud”).
- Open the game in a **different browser** → **☁ Cloud → Enter recovery code** → **Load here**.
- Quick API smoke test (optional), in DevTools console on the site:
  ```js
  fetch('/api/cloud/account',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'}).then(r=>r.json()).then(console.log)
  ```
  Should return `{accountId, recoveryCode, sessionToken, expiresAt}`.

---

## Optional — local `C:\temp` backups (developer/advanced only)
Not needed for normal play. To keep JSON copies on your PC:
1. Run the companion:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\tools\local-save-server.ps1
   ```
   It listens on `http://127.0.0.1:8765` and writes to `C:\temp\PrecalculusOdyssey\`.
2. In the game: **☁ Cloud** → tick **“Also back up to C:\temp…”**. It should report “Local companion detected”.
   If it isn’t running, the game just says so and cloud saving is unaffected.

---

## Housekeeping
- Add a `.gitignore` with at least:
  ```
  backups/
  *.output
  ```
- Keep `wrangler.toml`’s `database_id` in sync **only if** you use `wrangler` locally; the dashboard binding (Step 4) is what production uses.
- Sessions last ~400 days; recovery codes are stored **only as SHA-256 hashes** — the plaintext is shown once and never logged.

## Local development (optional, needs Node.js)
If you install Node + wrangler you can run the whole thing (Functions + D1) locally:
```powershell
npm i -g wrangler
wrangler d1 execute precalculus-odyssey --local --file=./migrations/0001_cloud_saves.sql
wrangler pages dev game --d1 DB=precalculus-odyssey
```
Without Node, everything still works — you just test on the deployed `pages.dev` site.

---

## Troubleshooting
| Symptom | Fix |
|---|---|
| `☁ Cloud` shows ✕ error, API returns 500 | D1 binding `DB` missing or migration not run → Steps 2 & 4, then redeploy |
| 401 on `/api/cloud/profiles` | not signed in — Enable Cloud Save or Enter recovery code |
| 409 conflict | expected when two devices edit the same profile — the in-game dialog lets you choose |
| Game loads but `/api/cloud/*` 404 | Build output dir must be `game`, and `functions/` must be at the **repo root** (not inside `game/`) |
| Assets 404 | check case-sensitive filenames; Cloudflare is case-sensitive, Windows isn’t |
