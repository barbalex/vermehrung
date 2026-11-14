# restore test: downloads the newest backup from nextcloud and
# restores it into a scratch database inside the running postgres,
# runs sanity counts, drops the scratch database.
# run inside the v_db container: docker exec -it v_db bash ./test-restore.sh
# BEWARE: rclone config is expected at /root/.config/rclone/rclone.conf
# (mounted from the host, see docker-compose.yaml)

set -e

REMOTE_DIR="nextcloud:Gabriel Software/projekte/vermehrung/sik"
SCRATCH_DB="vermehrung_restore_test"

echo "finding newest backup..."
NEWEST=$(rclone lsf "$REMOTE_DIR" | grep -E '^[0-9]{4}-' | sort | tail -1)
if [ -z "$NEWEST" ]; then
  echo "ERROR: no backup found in $REMOTE_DIR"
  exit 1
fi
echo "newest backup: $NEWEST"

echo "downloading..."
rclone copyto "$REMOTE_DIR/$NEWEST" "/tmp/$NEWEST" --retries 3

echo "restoring into scratch database $SCRATCH_DB..."
dropdb --if-exists -U postgres -h localhost "$SCRATCH_DB"
createdb -U postgres -h localhost "$SCRATCH_DB"
# the postgis image pre-installs the extension into databases it
# initializes itself (that is why the init restore works) - a plain
# createdb does not
psql -U postgres -h localhost -d "$SCRATCH_DB" -c 'create extension if not exists postgis'
# the ae_art foreign table's server is created out-of-band on the live
# db (01_db_users_roles.sql / manually) - a dummy server lets the
# restore create the foreign table itself
psql -U postgres -h localhost -d "$SCRATCH_DB" -c '
  create extension if not exists postgres_fdw;
  create server if not exists ae_server foreign data wrapper postgres_fdw;'
# tolerate only benign errors (e.g. CREATE SCHEMA public colliding
# with the schema createdb made) - anything else fails the test
set +e
pg_restore -U postgres -h localhost --dbname="$SCRATCH_DB" --no-owner "/tmp/$NEWEST" 2> /tmp/restore.log
set -e
FATAL=$(grep '^pg_restore: error:' /tmp/restore.log | grep -cv 'already exists') || true
if [ "$FATAL" -gt 0 ]; then
  cat /tmp/restore.log
  echo "ERROR: restore had $FATAL fatal errors"
  exit 1
fi
echo "restore ok ($(grep -c '^pg_restore: error:' /tmp/restore.log || true) benign errors tolerated)"

echo "sanity counts:"
for t in art kultur zaehlung lieferung person sammlung herkunft garten; do
  COUNT=$(psql -U postgres -h localhost -d "$SCRATCH_DB" -At -c "select count(*) from $t")
  echo "  $t: $COUNT"
done

echo "cleaning up..."
dropdb -U postgres -h localhost "$SCRATCH_DB"
rm -f "/tmp/$NEWEST"
echo "restore test OK: $NEWEST restores cleanly"
