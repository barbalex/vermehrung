import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import { MuiThemeProvider } from '@material-ui/core/styles'

import Layout from '../../components/Layout'
import MenuItem from './MenuItem'
import ErrorBoundary from '../../components/ErrorBoundary'
import materialTheme from '../../utils/materialTheme'

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

const Template = ({ data }) => {
  const { allMarkdownRemark } = data
  const { edges } = allMarkdownRemark

  return (
    <MuiThemeProvider theme={materialTheme}>
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
              <p>Hoffentlich nützliche Infos für Sie</p>
            </Doku>
          </Container>
        </Layout>
      </ErrorBoundary>
    </MuiThemeProvider>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___sort] }
      filter: { fileAbsolutePath: { regex: "/(/benutzerDoku)/.*.md$/" } }
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

export default Template
