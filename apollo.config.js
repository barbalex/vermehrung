const constants = require('./src/utils/constants.json')

module.exports = {
  client: {
    service: {
      name: 'api',
      url: constants.graphQlUri,
      headers: {
        'X-Hasura-Access-Key': process.env.HASURA_ACCESS_KEY,
      },
    },
  },
}
