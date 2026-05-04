# https://registry.hub.docker.com/r/postgis/postgis/tags
# on server is: 14-3.5
# TODO: 
# update live servers by creating a new server using current backup, 
# then pointing api.apflora.ch to the new server's IP on vercel, 
# then recreating backups on the new server, and finally deleting the old server.
FROM postgis/postgis:18-3.6

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
