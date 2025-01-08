# https://registry.hub.docker.com/r/postgis/postgis/tags
# TODO: upgrade to 15-3.3?
FROM postgis/postgis:17-3.5

COPY ./init/ /docker-entrypoint-initdb.d/
# enable to seed data
COPY ./vermehrung.backup /sik_data/vermehrung.backup

RUN chmod +x /docker-entrypoint-initdb.d/02_restore.sh

# for using cron, see https://www.cloudsavvyit.com/9033/how-to-use-cron-with-your-docker-containers/

# Install some helpful stuff
RUN apt-get -qq update
# log less: https://askubuntu.com/a/668859
RUN apt-get install -y -qq curl
RUN apt-get install -y -qq bash
RUN apt-get install -y -qq nano
RUN apt-get install -y -qq rclone
RUN apt-get install -y -qq dos2unix

# add the backup script
ADD backup.sh /backup.sh
# Change line ending format to LF
RUN dos2unix /backup.sh
RUN chmod +x /backup.sh
RUN chmod 0744 /backup.sh
