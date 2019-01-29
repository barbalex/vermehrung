const secrets = require('./secrets.json')
const constants = require('./src/utils/constants.json')

module.exports = {
  client: {
    service: {
      name: 'api',
      url: constants.graphQlUri,
      // optional headers
      headers: {
        'X-Hasura-Access-Key': secrets.accessKey,
      },
    },
  },
}
