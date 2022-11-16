/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const docTemplate = path.resolve(`src/templates/docTemplate.js`)
  // was: sort: { order: ASC, fields: [frontmatter___sort1, frontmatter___sort2] }
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: [{ frontmatter: { sort1: ASC } }, { frontmatter: { sort2: ASC } }]
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    return Promise.reject(result.errors)
  }

  const { edges } = result.data.allMarkdownRemark
  edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: docTemplate,
    })
  })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  actions.setWebpackConfig({
    resolve: { fallback: { fs: false } },
  })
  if (stage === 'build-html') {
    /*
     * During the build step, `firebase` will break because it relies on
     * browser-specific APIs. Fortunately, we don’t need it during the build.
     * Using Webpack’s null loader, we’re able to effectively ignore `firebase`
     * during the build
     */
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /@firebase/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
