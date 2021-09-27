# https://registry.hub.docker.com/r/postgis/postgis/tags
FROM postgis/postgis:12-3.1

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
