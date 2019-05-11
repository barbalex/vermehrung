import React, {
  useEffect,
  useContext,
  useCallback,
  useState,
  useRef,
} from 'react'
import styled from 'styled-components'
import SplitPane from 'react-split-pane'
import { observer } from 'mobx-react-lite'

import ErrorBoundary from '../components/ErrorBoundary'
import Layout from '../components/Layout'
import activeNodeArrayFromPathname from '../utils/activeNodeArrayFromPathname'
import openNodesFromActiveNodeArray from '../utils/openNodesFromActiveNodeArray'
import { login, isAuthenticated, silentAuth } from '../utils/auth'
import Tree from '../components/TreeContainer'
import Data from '../components/Data'
import storeContext from '../storeContext'

const Container = styled.div`
  margin-top: 64px;
  min-height: calc(100vh - 64px);
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

const Vermehrung = ({ location }) => {
  const store = useContext(storeContext)
  const { setActiveNodeArray, setOpenNodes } = store.tree

  const { pathname } = location
  const activeNodeArray = activeNodeArrayFromPathname(pathname)

  const [loading, setLoading] = useState(true)
  const [dimensions, setDimensions] = useState({ height: 200, width: 200 })
  const containerEl = useRef(null)

  // on first render set openNodes
  useEffect(() => {
    setOpenNodes(openNodesFromActiveNodeArray(activeNodeArray))
  }, [])
  useEffect(() => {
    console.log('Vermehrung, useLayoutEffect', {
      containerEl,
      containerElCurrent: containerEl.current,
    })
    setDimensions({
      height: containerEl.current ? containerEl.current.clientHeight : 200,
      width: containerEl.current ? containerEl.current.clientWidth : 200,
    })
  }, [])
  // when pathname changes, update activeNodeArray
  useEffect(() => {
    setActiveNodeArray(activeNodeArray)
  }, [pathname])
  const onChange = useCallback(() => {
    if (containerEl.current && containerEl.current.clientWidth) {
      setDimensions({
        height: containerEl.current.clientHeight,
        width: containerEl.current.clientWidth,
      })
    } else {
      setDimensions({ height: 200, width: 200 })
    }
  })
  const handleCheckSession = useCallback(() => setLoading(false))
  useEffect(() => {
    silentAuth({ callback: handleCheckSession, store })
  }, [])
  if (loading) return null

  console.log('Vermehrung', {
    containerEl,
    containerElCurrent: containerEl.current,
  })

  if (!isAuthenticated()) {
    login()
    return <Container>Öffne login...</Container>
  }

  return (
    <ErrorBoundary>
      <Layout>
        <Container ref={containerEl}>
          <StyledSplitPane
            split="vertical"
            size="33%"
            minSize={200}
            onDragFinished={onChange}
          >
            <Tree dimensions={dimensions} />
            <Data />
          </StyledSplitPane>
        </Container>
      </Layout>
    </ErrorBoundary>
  )
}

export default observer(Vermehrung)
