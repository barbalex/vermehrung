# restore test: downloads the newest backup from nextcloud and
# restores it into a scratch database inside the running postgres,
# runs sanity counts, drops the scratch database.
# run inside the v_db container: docker exec -it v_db bash ./test-restore.sh
# optionally pass a local dump file to skip the download:
#   docker exec -it v_db bash ./test-restore.sh /sik_data/vermehrung.backup
# BEWARE: rclone config is expected at /root/.config/rclone/rclone.conf
# (mounted from the host, see docker-compose.yaml)
# 2026-11-20: backups are age-encrypted since that date. This container
# deliberately holds NO private key (a compromised VM must not decrypt
# the offsite copies), so encrypted backups cannot be tested here —
# the ongoing drill is notebook-side: npm run fetchBackup + dev rebuild.
# This script still works for plaintext dumps (the old pre-encryption
# backups, or a dump decrypted on the notebook and passed explicitly).

set -e

REMOTE_DIR="nextcloud:Gabriel Software/projekte/vermehrung/sik"
SCRATCH_DB="vermehrung_restore_test"
NEWEST=${1:-}

if [ -z "$NEWEST" ]; then
  echo "finding newest backup..."
  NEWEST=$(rclone lsf "$REMOTE_DIR" | grep -E '^[0-9]{4}-' | sort | tail -1)
  if [ -z "$NEWEST" ]; then
    echo "ERROR: no backup found in $REMOTE_DIR"
    exit 1
  fi
fi
case "$NEWEST" in
  *.age)
    echo "ERROR: $NEWEST is age-encrypted and this container deliberately holds no"
    echo "private key (ransomware model: the VM must not decrypt offsite backups)."
    echo "test notebook-side instead: npm run fetchBackup, then rebuild the dev stack."
    echo "or decrypt on the notebook and pass the plaintext dump explicitly."
    exit 1
    ;;
esac
if [ ! -f "$NEWEST" ]; then
  echo "downloading $NEWEST..."
  rclone copyto "$REMOTE_DIR/$NEWEST" "/tmp/$NEWEST" --retries 3
  NEWEST="/tmp/$NEWEST"
fi
echo "newest backup: $NEWEST"

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
