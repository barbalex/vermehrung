// file name need underscore
// otherwise weird things happen (edits are not registered)
// see: https://github.com/gatsbyjs/gatsby/issues/26554#issuecomment-677915552
import React, { useContext } from 'react'
import styled from 'styled-components'
import SplitPane from 'react-split-pane'
import { observer } from 'mobx-react-lite'

import StoreContext from '../../storeContext'
import Tree from '../../components/Tree'
import Data from '../../components/Data'
import Filter from '../../components/Filter'
import ApiDetector from '../../components/ApiDetector'
import constants from '../../utils/constants'

const Container = styled.div`
  min-height: calc(100vh - ${constants.appBarHeight}px);
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
      <Container>
        <StyledSplitPane
          split="vertical"
          size={treeWidth}
          maxSize={-10}
          resizerStyle={resizerStyle}
        >
          <Tree />
          {showFilter ? <Filter /> : <Data />}
        </StyledSplitPane>
      </Container>
      <ApiDetector />
    </>
  )
}

export default observer(Vermehrung)