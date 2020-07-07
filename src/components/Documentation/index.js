import React, { useState, useEffect, useContext } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { withResizeDetector } from 'react-resize-detector'
import SplitPane from 'react-split-pane'
import { observer } from 'mobx-react-lite'

import Layout from '../Layout'
import ArticleList from './ArticleList'
import ErrorBoundary from '../shared/ErrorBoundary'
import getConstants from '../../utils/constants'
import { StoreContext } from '../../models/reactUtils'
import Doku from './Doku'

const constants = getConstants()

const Container = styled.div`
  height: calc(100vh - 64px);
`

const StyledSplitPane = styled(SplitPane)`
  height: calc(100vh - 64px) !important;
  .Resizer {
    background: rgba(74, 20, 140, 0.1);
    opacity: 1;
    z-index: 1;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 7px;
    cursor: col-resize;
  }
  .Resizer:hover {
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    background-color: #fff59d !important;
  }
  .Resizer.disabled {
    cursor: not-allowed;
  }
  .Resizer.disabled:hover {
    border-color: transparent;
  }
  .Pane {
    overflow: hidden;
  }
`

const Documentation = ({ data, width }) => {
  const store = useContext(StoreContext)
  const { docFilter, setDocsCount, setDocsFilteredCount } = store
  const frontmatter = data?.markdownRemark?.frontmatter
  const html = data?.markdownRemark?.html
  const edges = data?.allMarkdownRemark?.edges ?? []

  const [mobile, setMobile] = useState(true)

  useEffect(() => {
    if (width >= constants?.tree?.minimalWindowWidth && mobile) {
      setMobile(false)
    }
    if (width < constants?.tree?.minimalWindowWidth && !mobile) {
      setMobile(true)
    }
  }, [mobile, width])

  // hide resizer when is mobile
  const resizerStyle = mobile ? { width: 0 } : {}
  const treeWidth = mobile ? '100%' : `30%`

  const [items, setItems] = useState([])
  useEffect(() => {
    if (edges.length) {
      const items = edges
        .filter((n) => !!n && !!n.node)
        .filter((n) =>
          docFilter
            ? (n?.node?.frontmatter?.title ?? '(Titel fehlt)')
                .toLowerCase()
                .includes(docFilter.toLowerCase())
            : true,
        )
      setItems(items)
      setDocsCount(edges.length)
      setDocsFilteredCount(items.length)
    }
  }, [docFilter, edges, setDocsCount, setDocsFilteredCount])

  console.log('Documentation, items:', items)

  return (
    <ErrorBoundary>
      <Layout>
        <Container>
          <StyledSplitPane
            split="vertical"
            size="30%"
            minSize={200}
            //resizerStyle={resizerStyle}
          >
            <ArticleList items={items} />
            {html ? (
              <Doku frontmatter={frontmatter} html={html} />
            ) : (
              <div></div>
            )}
          </StyledSplitPane>
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

export default withResizeDetector(observer(Documentation))
