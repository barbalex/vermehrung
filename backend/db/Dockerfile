# https://registry.hub.docker.com/r/postgis/postgis/tags
# 2026.11.19: live server moved 14-3.5 -> 18-3.6 (pg 18.6); bumped to 18-3.7
# (pg 18.7, postgis 3.7.0). Minor pg upgrades are storage-compatible; the
# postgis extension needs ALTER EXTENSION postgis UPDATE; after the swap.
FROM postgis/postgis:18-3.7

# init db from vermehrung.backup (only runs when no db detected)
COPY ./init/ /docker-entrypoint-initdb.d/
COPY ./vermehrung.backup /sik_data/vermehrung.backup

# glob: production's init dir deliberately lacks 04_api_access.sh
# (its db was initialized from a backup, api access applied separately)
RUN chmod +x /docker-entrypoint-initdb.d/*.sh

# for using cron, see https://www.cloudsavvyit.com/9033/how-to-use-cron-with-your-docker-containers/

# Install some helpful stuff
RUN apt-get -qq update
# log less: https://askubuntu.com/a/668859
RUN apt-get install -y -qq curl
RUN apt-get install -y -qq bash
RUN apt-get install -y -qq nano
RUN apt-get install -y -qq rclone
RUN apt-get install -y -qq dos2unix

# add the backup + restore-test scripts
ADD backup.sh /backup.sh
ADD test-restore.sh /test-restore.sh
# Change line ending format to LF
RUN dos2unix /backup.sh /test-restore.sh
RUN chmod +x /backup.sh /test-restore.sh
RUN chmod 0744 /backup.sh /test-restore.sh
