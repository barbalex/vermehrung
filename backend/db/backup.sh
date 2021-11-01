# dumped vermehrung
# stellt dem Filenamen das Datum voran
# verschiebt das File auf die dropbox
echo "creating dump file..."
FILENAME=$(date +"%Y-%m-%d_%H-%M-%S_vermehrung.backup")
PGPASSWORD=$POSTGRES_PASSWORD pg_dump -U postgres -h localhost --file=/sik_data/$FILENAME -Fc -Z9 vermehrung
echo "uploading dump file..."
rclone move /sik_data/$FILENAME dropbox:Apps/vermehrung
echo "backed up $FILENAME" >> /var/log/cron.log 2>&1