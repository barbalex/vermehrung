# https://registry.hub.docker.com/r/postgis/postgis/tags
FROM postgis/postgis:12-3.0

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

# install dropbox uploader
ADD dropbox_uploader.conf /dropbox_uploader.conf
RUN curl "https://raw.githubusercontent.com/andreafabrizi/Dropbox-Uploader/master/dropbox_uploader.sh" -o dropbox_uploader.sh
RUN chmod +x dropbox_uploader.sh

# add the backup script
ADD backup.sh /backup.sh
RUN chmod +x /backup.sh
# see: https://stackoverflow.com/a/37458519/712005
RUN chmod 0744 /backup.sh