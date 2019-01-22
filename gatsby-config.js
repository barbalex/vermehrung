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
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: [`/Vermehrung/*`] },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/technischeDoku`,
        name: 'technischeDoku-pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/benutzerDoku`,
        name: 'benutzerDoku-pages',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
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
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        gfm: true,
        commonmark: true,
        footnotes: true,
        pedantic: true,
        excerpt_separator: '<!-- end -->',
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 740,
            },
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: '64',
            },
          },
          {
            resolve: 'gatsby-remark-emojis',
            options: {
              // Deactivate the plugin globally (default: true)
              active: true,
              // Add a custom css class
              class: 'emoji-icon',
              // Select the size (available size: 16, 24, 32, 64)
              size: 32,
              // Add custom styles
              styles: {
                display: 'inline',
                margin: '0',
                'margin-top': '-3px',
                position: 'relative',
                top: '3px',
                width: '20px',
              },
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_self',
              rel: 'nofollow',
            },
          },
        ],
      },
    },
    'gatsby-plugin-offline',
  ],
}
