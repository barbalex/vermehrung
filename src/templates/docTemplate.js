import React, { useState, useEffect, useContext } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { withResizeDetector } from 'react-resize-detector'
import SplitPane from 'react-split-pane'
import { observer } from 'mobx-react-lite'

import Layout from '../components/Layout'
import Sidebar from './Sidebar'
import FormTitle from './FormTitle'
import ErrorBoundary from '../components/shared/ErrorBoundary'
import getConstants from '../utils/constants'
import { StoreContext } from '../models/reactUtils'
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
const DokuDate = styled.p`
  margin-bottom: 15px !important;
  color: grey;
`

const DocTemplate = ({ data, width }) => {
  const store = useContext(StoreContext)
  const { markdownRemark, allMarkdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const { edges } = allMarkdownRemark

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
  const { docFilter } = store

  const items = (edges || [])
    .filter((n) => !!n && !!n.node)
    .filter((n) =>
      docFilter
        ? (n?.node?.frontmatter?.title ?? '(Titel fehlt)')
            .toLowerCase()
            .includes(docFilter.toLowerCase())
        : true,
    )

  const totalNr = edges.length
  const filteredNr = items.length

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
            <Sidebar items={items} />
            <Doku
              totalNr={totalNr}
              filteredNr={filteredNr}
              frontmatter={frontmatter}
              html={html}
            />
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

export default withResizeDetector(observer(DocTemplate))
