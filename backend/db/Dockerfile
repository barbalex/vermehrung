# https://registry.hub.docker.com/r/postgis/postgis/tags
FROM postgis/postgis:12-3.1

# activate this if needing to initiate from backup
# see: apf2
#COPY ./init/ /docker-entrypoint-initdb.d/
#COPY ./vermehrung.backup /sik_data/vermehrung.backup

#RUN chmod +x /docker-entrypoint-initdb.d/02_restore.sh

# Install some helpful stuff
RUN apt-get update
RUN apt-get -y install cron
RUN apt-get -y install curl
RUN apt-get -y install bash
RUN apt-get -y install nano
RUN apt-get -y install rclone
RUN apt-get -y install dos2unix

# add the backup script
ADD backup.sh /backup.sh
# Change line ending format to LF
RUN dos2unix /backup.sh
RUN chmod +x /backup.sh
RUN chmod 0744 /backup.sh

# https://stackoverflow.com/a/51440621/712005
RUN apt-get -y install cron
ADD cron /etc/cron.d/cron
# Change line ending format to LF
RUN dos2unix /etc/cron.d/cron
# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/cron
# Apply cron job
RUN crontab /etc/cron.d/cron
# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Run the command on container startup
CMD cron && tail -F /var/log/cron.log 2>&1