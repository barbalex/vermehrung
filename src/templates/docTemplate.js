import React from 'react'
import { graphql } from 'gatsby'

import Documentation from '../components/Documentation'

const DocTemplate = ({ data, location }) => (
  <Documentation data={data} location={location} />
)

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "DD.MM.YYYY")
        path
        title
      }
    }
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___sort1, frontmatter___sort2] }
      filter: { fileAbsolutePath: { regex: "/(/docs)/.*.md$/" } }
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "DD.MM.YYYY")
            path
            title
            sort1
            sort2
          }
        }
      }
    }
  }
`

export default DocTemplate
