-- Error telemetry collector: the opt-in client reporter
-- (src/modules/errorTelemetry.ts) posts one JSON object per client error
-- to VITE_ERROR_TELEMETRY_URL = https://api.vermehrung.ch/error_report.
--
-- Privacy model: the payload carries message/stack/url/user-agent/release
-- only — no user identity. Anyone (anon) may append a report; only
-- manager may read them. Field caps are enforced by CHECKs and
-- id/created_at are forced server-side, so the endpoint cannot be abused
-- as arbitrary storage.
--
-- Idempotent: applied on fresh db volumes by backend*/db/init/04_api_access.sh
-- (mounted at /api_sql) and to the running production db by
-- scripts/deployBackend.mjs --apply. The table definition is mirrored in
-- createTables.sql — keep the two in sync.

CREATE TABLE IF NOT EXISTS error_report (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  release text CHECK (char_length(release) <= 40),
  kind text NOT NULL CHECK (
    kind IN ('window.error', 'unhandledrejection', 'boundary', 'manual')
  ),
  message text NOT NULL CHECK (char_length(message) <= 2000),
  stack text CHECK (char_length(stack) <= 5000),
  url text CHECK (char_length(url) <= 2000),
  user_agent text CHECK (char_length(user_agent) <= 1000)
);

CREATE INDEX IF NOT EXISTS error_report_created_at_idx
  ON error_report USING btree(created_at);

-- force id/created_at regardless of what the client sends
CREATE OR REPLACE FUNCTION error_report_force_defaults()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.id := gen_random_uuid();
  NEW.created_at := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS error_report_force_defaults ON error_report;
CREATE TRIGGER error_report_force_defaults
  BEFORE INSERT ON error_report
  FOR EACH ROW EXECUTE FUNCTION error_report_force_defaults();

ALTER TABLE error_report ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS insert_anon ON error_report;
CREATE POLICY insert_anon ON error_report
  FOR INSERT TO anon
  WITH CHECK (true);

DROP POLICY IF EXISTS read_manager ON error_report;
CREATE POLICY read_manager ON error_report
  FOR SELECT TO manager
  USING (true);

-- anon: insert only — no read/update/delete
GRANT INSERT ON error_report TO anon;
GRANT SELECT ON error_report TO manager;

-- PostgREST caches the schema: a long-running api container must be told
-- to reload it, or the new table 404s until its next restart. No-op while
-- nobody listens (e.g. during first init, before the api starts)
NOTIFY pgrst, 'reload schema';
