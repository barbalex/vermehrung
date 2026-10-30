#!/bin/bash
set -e

# 02_restore.sh restores a pg_dump of the vermehrung database. Roles are
# cluster-level objects and never part of a dump, so the api roles
# (authenticator, anon, artverantwortlich, gaertner, manager) with their
# grants and row level security are created here from the generated sql.
# Both files are idempotent (create or replace / if not exists) and are
# mounted to /api_sql via docker-compose.yaml - deliberately outside
# /docker-entrypoint-initdb.d, or the entrypoint would run
# createApiAccess.sql itself, without the app.password option it needs.
# Runs after 02_restore.sh: the grants need the restored tables.

echo "creating api roles"
password="$(printf '%s' "$PGRST_DB_URI" | tr -d '\r' | sed -E 's|^[a-z]+://[^:]+:([^@]+)@.*$|\1|')"
PGOPTIONS="-c app.password=$password" psql --username "$POSTGRES_USER" --dbname=vermehrung -v ON_ERROR_STOP=1 --file=/api_sql/createApiAccess.sql
echo "api roles created"

# the sync rpc comes with the backup; reapply to be independent of backup age
echo "creating sync function"
psql --username "$POSTGRES_USER" --dbname=vermehrung -v ON_ERROR_STOP=1 --file=/api_sql/createSyncFunction.sql
echo "sync function created"
