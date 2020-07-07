import React from 'react'
import { graphql } from 'gatsby'

import Documentation from '../components/Documentation'

const Dokumentation = ({ data, location }) => (
  <Documentation data={data} location={location} />
)

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___sort1, frontmatter___sort2] }
      filter: { fileAbsolutePath: { regex: "/(/docs)/.*.md$/" } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD.MM.YYYY")
            path
          }
        }
      }
    }
  }
`

export default Dokumentation
