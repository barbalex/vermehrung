# see: https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/
FROM node:slim
RUN apt-get update && apt-get install -y dumb-init

ENV NODE_ENV production

# Create app directory
WORKDIR /usr/src/auth_app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node package*.json ./

RUN npm ci --only=production
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 7000

USER node

CMD ["dumb-init", "node", "server.js" ]