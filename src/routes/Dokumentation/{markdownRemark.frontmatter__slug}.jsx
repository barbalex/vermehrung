import React from 'react'
// import { graphql } from 'gatsby'

import Documentation from '../../components/Documentation'

const DocTemplate = ({ data, location }) => (
  <Documentation data={data} location={location} />
)

// export const pageQuery = graphql`
//   query ($id: String!) {
//     markdownRemark(id: { eq: $id }) {
//       html
//       frontmatter {
//         date(formatString: "DD.MM.YYYY")
//         slug
//         title
//       }
//     }
//     allMarkdownRemark(
//       sort: [{ frontmatter: { sort1: ASC } }, { frontmatter: { sort2: ASC } }]
//     ) {
//       edges {
//         node {
//           id
//           frontmatter {
//             date(formatString: "DD.MM.YYYY")
//             slug
//             title
//             sort1
//             sort2
//           }
//         }
//       }
//     }
//   }
// `

export default DocTemplate
