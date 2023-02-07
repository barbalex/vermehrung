import React, { useState, useEffect, useContext, useMemo } from 'react'
import styled from '@emotion/styled'
import { withResizeDetector } from 'react-resize-detector'
import SplitPane from 'react-split-pane'
import { observer } from 'mobx-react-lite'

import Layout from '../Layout'
import ArticleList from './ArticleList'
import ErrorBoundary from '../shared/ErrorBoundary'
import constants from '../../utils/constants'
import StoreContext from '../../storeContext'
import Doku from './Doku'

const Container = styled.div`
  height: calc(100vh - ${constants.appBarHeight}px);
`
const SplitPaneContainer = styled.div`
  height: calc(100vh - ${constants.appBarHeight}px);
  position: relative;
`

const StyledSplitPane = styled(SplitPane)`
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
  const edges = useMemo(
    () => data?.allMarkdownRemark?.edges ?? [],
    [data.allMarkdownRemark.edges],
  )

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
        <SplitPaneContainer>
          <StyledSplitPane split="vertical" size="22%" maxSize={-10}>
            <ArticleList items={items} />
            {html ? (
              <Doku frontmatter={frontmatter} html={html} location={location} />
            ) : (
              <div />
            )}
          </StyledSplitPane>
        </SplitPaneContainer>
      </Layout>
    </ErrorBoundary>
  )
}

export default withResizeDetector(observer(Documentation))
