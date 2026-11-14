# dumps vermehrung db
# prepends the datetime to filename
# uploads the backup to nextcloud
# but only if the size of the dump changed
# BEWARE: rclone config is expected at /root/.config/rclone/rclone.conf
# it is mounted from the host file /root/backup/rclone.conf, see docker-compose.yaml

# data fingerprint: deterministic md5 over every synced table's rows.
# replaces the old size-equality check - equal size with different
# content silently skipped backups
FINGERPRINT=$(PGPASSWORD=$POSTGRES_PASSWORD psql -U postgres -h localhost -d vermehrung -At -c "
  select coalesce(md5(string_agg(row_text, '' order by row_text)), '') from (
    select (to_jsonb(t))::text as row_text from public.art t
    union all select (to_jsonb(t))::text from public.art_qk t
    union all select (to_jsonb(t))::text from public.av t
    union all select (to_jsonb(t))::text from public.bedarf t
    union all select (to_jsonb(t))::text from public.garten t
    union all select (to_jsonb(t))::text from public.gv t
    union all select (to_jsonb(t))::text from public.herkunft t
    union all select (to_jsonb(t))::text from public.kultur t
    union all select (to_jsonb(t))::text from public.kultur_option t
    union all select (to_jsonb(t))::text from public.kultur_qk t
    union all select (to_jsonb(t))::text from public.lieferung t
    union all select (to_jsonb(t))::text from public.person t
    union all select (to_jsonb(t))::text from public.person_option t
    union all select (to_jsonb(t))::text from public.sammel_lieferung t
    union all select (to_jsonb(t))::text from public.sammlung t
    union all select (to_jsonb(t))::text from public.teilkultur t
    union all select (to_jsonb(t))::text from public.teilzaehlung t
    union all select (to_jsonb(t))::text from public.user_role t
    union all select (to_jsonb(t))::text from public.zaehlung t
    union all select (to_jsonb(t))::text from public.art_rev t
    union all select (to_jsonb(t))::text from public.art_qk_rev t
    union all select (to_jsonb(t))::text from public.av_rev t
    union all select (to_jsonb(t))::text from public.bedarf_rev t
    union all select (to_jsonb(t))::text from public.garten_rev t
    union all select (to_jsonb(t))::text from public.gv_rev t
    union all select (to_jsonb(t))::text from public.herkunft_rev t
    union all select (to_jsonb(t))::text from public.kultur_rev t
    union all select (to_jsonb(t))::text from public.lieferung_rev t
    union all select (to_jsonb(t))::text from public.person_rev t
    union all select (to_jsonb(t))::text from public.sammel_lieferung_rev t
    union all select (to_jsonb(t))::text from public.sammlung_rev t
    union all select (to_jsonb(t))::text from public.teilkultur_rev t
    union all select (to_jsonb(t))::text from public.teilzaehlung_rev t
    union all select (to_jsonb(t))::text from public.zaehlung_rev t
  ) s") || "-$(PGPASSWORD=$POSTGRES_PASSWORD psql -U postgres -h localhost -d vermehrung -At -c 'select count(*) from public.art_rev')"
if [ -f /sik_data/last.fingerprint ] && [ "$FINGERPRINT" = "$(cat /sik_data/last.fingerprint)" ]; then
  echo "data fingerprint unchanged - not dumping"
  exit 0
fi

echo "creating dump file..."
FILENAME=$(date +"%Y-%m-%d_%H-%M-%S_vermehrung.backup")
PGPASSWORD=$POSTGRES_PASSWORD pg_dump -U postgres -h localhost --file=/sik_data/$FILENAME -Fc -Z9 vermehrung

REMOTE_DIR="nextcloud:Gabriel Software/projekte/vermehrung/sik"

upload() {
  echo "uploading backup file..."
  # BEWARE: the remote name needs to match the one defined in rclone.conf, i.e. nextcloud
  if ! rclone copyto "/sik_data/$FILENAME" "$REMOTE_DIR/$FILENAME" --retries 3; then
    # on failure: keep last.backup so the next run retries the upload
    echo "ERROR: upload to nextcloud failed"
    rm -f "/sik_data/$FILENAME"
    exit 1
  fi
}

upload

# only replace last.backup and the fingerprint after a successful upload
rm -f /sik_data/last.backup
mv -f "/sik_data/$FILENAME" /sik_data/last.backup
echo "$FINGERPRINT" > /sik_data/last.fingerprint
echo "backed up $FILENAME"
