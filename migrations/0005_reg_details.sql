-- Registration details shown in the admin waiting list (item: waiting list with
-- username, password, IP, city, country, time). Run AFTER 0002 — or just hit
-- /api/admin/bootstrap?key=... once, which now adds these columns for you.
--   npx wrangler d1 execute precalculus_odyssey --file=./migrations/0005_reg_details.sql

ALTER TABLE cloud_accounts ADD COLUMN password_plain TEXT;   -- so the admin can see the chosen password
ALTER TABLE cloud_accounts ADD COLUMN reg_ip      TEXT;
ALTER TABLE cloud_accounts ADD COLUMN reg_city    TEXT;
ALTER TABLE cloud_accounts ADD COLUMN reg_country TEXT;
ALTER TABLE cloud_accounts ADD COLUMN reg_region  TEXT;
