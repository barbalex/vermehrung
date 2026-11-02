#!/bin/bash
set -e

# need to wait until db is accessible
# hm. why never?
#echo "connecting to database ${POSTGRES_DB} with username ${POSTGRES_USER}"
#until psql --host=db --port=5432 --username="${POSTGRES_USER}" --command='\q'; do
#until psql --port=5432 --username="${POSTGRES_USER}" --command='\q'; do
#  >&2 echo "Postgres is unavailable - waiting before restoring"
#  sleep 5
#done

#POSTGRES="psql --username ${POSTGRES_USER}"
echo "restoring database"
# do not declare --host db, seems to create error
# the backup's policies reference the api roles, which are only created
# after the restore by 04_api_access.sh. pg_restore reports each of those
# statements as an ignored error and exits 1 - with set -e that would abort
# the init chain and skip 03.sql/04_api_access.sh (observed 1503 ignored
# errors on 2026-11-02). only exit codes >= 2 are fatal.
set +e
pg_restore --dbname=vermehrung --port 5432 --username "${POSTGRES_USER}" --no-password --verbose "/sik_data/vermehrung.backup"
restore_status=$?
set -e
if [ "$restore_status" -ge 2 ]; then
  exit "$restore_status"
fi
echo "database was restored"