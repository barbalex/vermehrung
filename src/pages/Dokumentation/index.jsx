import React from 'react'
import { graphql } from 'gatsby'

import Documentation from '../../components/Documentation'
import Header from '../../components/Head'

const Dokumentation = ({ data, location }) => (
  <Documentation data={data} location={location} />
)

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: [{ frontmatter: { sort1: ASC } }, { frontmatter: { sort2: ASC } }]
      filter: { fileAbsolutePath: { regex: "/(/docs)/.*.md$/" } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD.MM.YYYY")
            slug
          }
        }
      }
    }
  }
`

export default Dokumentation

export const Head = () => <Header />
