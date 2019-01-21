const fetch = require(`node-fetch`)
const { createHttpLink } = require(`apollo-link-http`)

const secrets = require('./secrets.json')

module.exports = {
  siteMetadata: {
    title: 'vermehrung',
  },
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
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Roboto'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: './src/utils/typography.js',
      },
    },
    'gatsby-plugin-react-helmet',
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
    },
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
