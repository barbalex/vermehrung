const fetch = require(`node-fetch`)
const { createHttpLink } = require(`apollo-link-http`)

const secrets = require('./secrets.json')

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|cache|public|docs)/,
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    {
      resolve: `@wapps/gatsby-plugin-material-ui`,
      options: {
        // Add any options here
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'HASURA',
        fieldName: 'hasura',
        createLink: () =>
          createHttpLink({
            uri: `${process.env.HASURA_GRAPHQL_URL}`,
            headers: {
              'X-Hasura-Access-Key': secrets.accessKey,
            },
            fetch,
          }),
        refetchInterval: 10, // Refresh every 60 seconds for new data
      },
    } /*
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'POSTGRAPHILE',
        fieldName: 'ae',
        createLink: () =>
          createHttpLink({
            uri: `${process.env.POSTGRAPHILE_URL}`,
            headers: {},
            fetch,
          }),
        refetchInterval: 10, // Refresh every 60 seconds for new data
      },
    },*/,
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'vermehrung.apflora.ch',
        short_name: 'vermehrung',
        start_url: '/',
        background_color: '#00695c',
        theme_color: '#00695c',
        display: 'minimal-ui',
        icon: 'src/images/seedling.png',
      },
    },
    'gatsby-plugin-offline',
  ],
}
