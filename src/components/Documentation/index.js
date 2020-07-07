import React, { useState, useEffect, useContext } from 'react'
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

const Documentation = ({ data, location, width }) => {
  const store = useContext(StoreContext)
  const { docFilter, setDocsCount, setDocsFilteredCount } = store
  const frontmatter = data?.markdownRemark?.frontmatter
  const html = data?.markdownRemark?.html
  const edges = data?.allMarkdownRemark?.edges ?? []

  const path = location.pathname.split('/').filter((e) => !!e)

  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    if (width >= constants?.tree?.minimalWindowWidth && mobile) {
      setMobile(false)
    }
    if (width < constants?.tree?.minimalWindowWidth && !mobile) {
      setMobile(true)
    }
  }, [mobile, width])

  const showList =
    width < constants?.tree?.minimalWindowWidth && path.length === 1
  const showArticle =
    width < constants?.tree?.minimalWindowWidth && path.length > 1

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

  if (showList) {
    return (
      <ErrorBoundary>
        <Layout>
          <Container>
            <ArticleList items={items} />
          </Container>
        </Layout>
      </ErrorBoundary>
    )
  }

  if (showArticle) {
    return (
      <ErrorBoundary>
        <Layout>
          <Container>
            <Doku
              frontmatter={frontmatter}
              html={html}
              location={location}
              mobile
            />
          </Container>
        </Layout>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <Layout>
        <Container>
          <StyledSplitPane split="vertical" size="30%" minSize={200}>
            <ArticleList items={items} />
            {html ? (
              <Doku frontmatter={frontmatter} html={html} location={location} />
            ) : (
              <div />
            )}
          </StyledSplitPane>
        </Container>
      </Layout>
    </ErrorBoundary>
  )
}

export default withResizeDetector(observer(Documentation))
