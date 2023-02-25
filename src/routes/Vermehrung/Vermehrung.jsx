import React, { useContext, lazy, Suspense } from 'react'
import styled from '@emotion/styled'
import SplitPane from 'react-split-pane'
import { observer } from 'mobx-react-lite'

import StoreContext from '../../storeContext'
const Tree = lazy(() => import('../../components/Tree'))
const Data = lazy(() => import('../../components/Data'))
const Filter = lazy(() => import('../../components/Filter'))
const ApiDetector = lazy(() => import('../../components/ApiDetector'))
import constants from '../../utils/constants'
import FallBack from '../../components/shared/FallBack'

const Container = styled.div`
  min-height: calc(100vh - ${constants.appBarHeight}px);
  position: relative;
`
const StyledSplitPane = styled(SplitPane)`
  .Resizer {
    background: rgba(74, 20, 140, 0.1);
    opacity: 1;
    z-index: 1;
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

const Vermehrung = () => {
  const store = useContext(StoreContext)
  const { activeForm, isPrint, singleColumnView, showTreeInSingleColumnView } =
    store
  const { widthInPercentOfScreen } = store.tree

  const showFilter = store.filter.show
  let treeWidth = singleColumnView
    ? (!showTreeInSingleColumnView && activeForm) || showFilter
      ? 0
      : // if no form is active, show only tree
        '100%'
    : `${widthInPercentOfScreen}%`
  // ensure tree is invisible when printing but still exists
  // (caused errors to render form without tree while printing)
  if (isPrint) treeWidth = 0

  // hide resizer when tree is hidden
  const resizerStyle = treeWidth === 0 ? { width: 0 } : {}

  return (
    <>
      <Suspense fallback={<FallBack />}>
        <Container>
          <StyledSplitPane
            split="vertical"
            size={treeWidth}
            maxSize={-10}
            resizerStyle={resizerStyle}
          >
            <Tree />
            <Suspense fallback={<FallBack />}>
              {showFilter ? <Filter /> : <Data />}
            </Suspense>
          </StyledSplitPane>
        </Container>
        <ApiDetector />
      </Suspense>
    </>
  )
}

export default observer(Vermehrung)
