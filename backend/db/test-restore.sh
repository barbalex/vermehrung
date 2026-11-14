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
NEWEST=$(rclone lsf "$REMOTE_DIR" | sort | tail -1)
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
pg_restore -U postgres -h localhost --dbname="$SCRATCH_DB" --no-owner "/tmp/$NEWEST"

echo "sanity counts:"
for t in art kultur zaehlung lieferung person sammlung herkunft garten; do
  COUNT=$(psql -U postgres -h localhost -At -c "select count(*) from $SCRATCH_DB.$t")
  echo "  $t: $COUNT"
done

echo "cleaning up..."
dropdb -U postgres -h localhost "$SCRATCH_DB"
rm -f "/tmp/$NEWEST"
echo "restore test OK: $NEWEST restores cleanly"
