# see: https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/
FROM node:lts-alpine as build

RUN apk add dumb-init

# Create app directory
WORKDIR /usr/src/auth_app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node package*.json ./

RUN npm ci --only=production
# If you are building your code for production
# RUN npm ci --only=production

FROM node:lts-alpine as production

# Do not use root to run the app to avoid privilege escalation, container escape, etc.
USER node

WORKDIR /app

COPY --from=build --chown=node:node . /app

EXPOSE 7000

ENV NODE_ENV production

CMD ["dumb-init", "node", "server.js" ]