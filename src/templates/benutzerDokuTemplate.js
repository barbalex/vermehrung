import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'

import Layout from '../components/Layout'
import MenuItem from './MenuItem'
import ErrorBoundary from '../components/ErrorBoundary'

const Container = styled.div`
  margin-top: 64px;
  height: calc(100vh - 64px);
  display: flex;
`
const Menu = styled.div`
  width: 25%;
  min-width: 320px;
  height: calc(100vh - 64px);
  overflow-y: auto;
  padding: 25px 0;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`
const Doku = styled.div`
  width: 100%;
  padding: 25px;
  overflow-y: auto;
  ul {
    margin-top: 0;
  }
  p,
  li {
    margin-bottom: 0;
  }
  h1,
  h3,
  h4,
  ol {
    margin-bottom: 10px;
  }
  h2 {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`
const MenuTitle = styled.div`
  padding: 0 24px;
  margin-bottom: 14px;
`
const MenuTitleLink = styled(Link)`
  font-size: 21px;
  font-weight: 700;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
  &:hover {
    text-decoration: underline;
  }
`
const DokuDate = styled.p`
  margin-bottom: 15px !important;
  color: grey;
`

const BenutzerDokuTemplate = ({ data }) => {
  const { markdownRemark, allMarkdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const { edges } = allMarkdownRemark

  return (
    <ErrorBoundary>
      <Layout>
        <Container>
          <Menu>
            <MenuTitle>
              <MenuTitleLink to="/Benutzer-Dokumentation/">
                Benutzer-Dokumentation
              </MenuTitleLink>
            </MenuTitle>
            <List component="nav">
              <Divider />
              {edges
                .filter(n => !!n && !!n.node)
                .map(({ node }) => (
                  <MenuItem post={node} key={node.id} />
                ))}
            </List>
          </Menu>
          <Doku>
            <h1>{frontmatter.title}</h1>
            <DokuDate>{frontmatter.date}</DokuDate>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </Doku>
        </Container>
      </Layout>
    </ErrorBoundary>
  )
}

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
      sort: { order: ASC, fields: [frontmatter___sort] }
      filter: { fileAbsolutePath: { regex: "/(/benutzerDoku)/.*.md$/" } }
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "DD.MM.YYYY")
            path
            title
          }
        }
      }
    }
  }
`

export default BenutzerDokuTemplate
