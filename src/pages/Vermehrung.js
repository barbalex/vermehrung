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
import ErrorBoundary from 'react-error-boundary'

import Layout from '../components/Layout'
import activeNodeArrayFromPathname from '../utils/activeNodeArrayFromPathname'
import openNodesFromActiveNodeArray from '../utils/openNodesFromActiveNodeArray'
import { login, isAuthenticated, silentAuth } from '../utils/auth'
import getWindowSize from '../utils/getWindowSize'
import Tree from '../components/TreeContainer'
import Data from '../components/Data'
import Filter from '../components/Filter'
import storeContext from '../storeContext'

const Container = styled.div`
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

const treeWidthInPercentOfScreen = 33

const Vermehrung = ({ location }) => {
  const store = useContext(storeContext)
  const { setActiveNodeArray, setOpenNodes } = store.tree
  const showFilter = store.filter.show

  const { pathname } = location
  const activeNodeArray = activeNodeArrayFromPathname(pathname)

  const [loading, setLoading] = useState(true)
  const [dimensions, setDimensions] = useState({ height: 200, width: 200 })
  const containerEl = useRef(null)

  // on first render set openNodes
  useEffect(() => {
    setOpenNodes(openNodesFromActiveNodeArray(activeNodeArray))
  }, [])
  const handleCheckSession = useCallback(() => setLoading(false))
  useEffect(() => {
    silentAuth({ callback: handleCheckSession, store })
  }, [])
  const windowSize = getWindowSize()
  useEffect(() => {
    /**
     * Problem
     * using containerEl.current.clientHeight does not work on first load
     * containerEl contains object with key current
     * containerEl.current is null AT THE SAME MOMENT!!!!!!!!!!!!
     * no idea why
     * Solution: calculate values from window size
     */
    setDimensions({
      height: windowSize.height - 64,
      width: windowSize.width * treeWidthInPercentOfScreen,
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
  if (loading) return null

  /**
   * ISSUE
   * aeArtQuery gets filter _like:"%%" from queryFromTable
   * maybe only when user does not have personId?
   * WHICH IS ABSOLUTELY WRONG AND IMPOSSIBLE
   */

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
            size={`${treeWidthInPercentOfScreen}%`}
            minSize={200}
            onDragFinished={onChange}
          >
            <Tree dimensions={dimensions} />
            {showFilter ? <Filter /> : <Data />}
          </StyledSplitPane>
        </Container>
      </Layout>
    </ErrorBoundary>
  )
}

export default observer(Vermehrung)
