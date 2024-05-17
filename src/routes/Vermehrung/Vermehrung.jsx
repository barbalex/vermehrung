import React, { useContext, Suspense } from 'react'
import styled from '@emotion/styled'
import { Allotment } from 'allotment'
import { observer } from 'mobx-react-lite'

import StoreContext from '../../storeContext.js'
import Tree from '../../components/Tree/index.jsx'
import Data from '../../components/Data/index.jsx'
import Filter from '../../components/Filter.jsx'
import ApiDetector from '../../components/ApiDetector.jsx'
import constants from '../../utils/constants.js'
import FallBack from '../../components/shared/Fallback.jsx'

const Container = styled.div`
  min-height: calc(100dvh - ${constants.appBarHeight}px);
  position: relative;
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

  const formWidth = singleColumnView
    ? (!showTreeInSingleColumnView && activeForm) || showFilter
      ? '100%'
      : 0
    : `${100 - widthInPercentOfScreen}%`
  // ensure tree is invisible when printing but still exists
  // (caused errors to render form without tree while printing)
  if (isPrint) {
    treeWidth = 0
  }
  const minSizeTree = treeWidth < 30 ? treeWidth : 30
  const minSizeForm = formWidth < 30 ? formWidth : 30

  // need the key on Allotment or it would only render correctly on second render
  return (
    <>
      <Suspense fallback={<FallBack />}>
        <Container>
          <Allotment key={`${treeWidth}/${formWidth}`}>
            <Allotment.Pane
              visible={treeWidth !== 0}
              preferredSize={treeWidth}
              minSize={minSizeTree}
            >
              <Suspense fallback={<FallBack />}>
                <Tree />
              </Suspense>
            </Allotment.Pane>
            <Allotment.Pane
              visible={formWidth !== 0}
              preferredSize={formWidth}
              minSize={minSizeForm}
            >
              <Suspense fallback={<FallBack />}>
                {showFilter ? <Filter /> : <Data />}
              </Suspense>
            </Allotment.Pane>
          </Allotment>
        </Container>
        <Suspense fallback={null}>
          <ApiDetector />
        </Suspense>
      </Suspense>
    </>
  )
}

export default observer(Vermehrung)
