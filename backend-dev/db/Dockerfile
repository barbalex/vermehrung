# https://registry.hub.docker.com/r/postgis/postgis/tags
FROM postgis/postgis:18-3.6

COPY ./init/ /docker-entrypoint-initdb.d/
# enable to seed data
COPY ./vermehrung.backup /sik_data/vermehrung.backup

RUN chmod +x /docker-entrypoint-initdb.d/02_restore.sh
RUN chmod +x /docker-entrypoint-initdb.d/04_api_access.sh

# Install some helpful stuff
RUN apt-get -qq update
# log less: https://askubuntu.com/a/668859
RUN apt-get install -y -qq curl
RUN apt-get install -y -qq bash
RUN apt-get install -y -qq nano
RUN apt-get install -y -qq rclone
