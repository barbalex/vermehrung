import React, { useContext, useEffect, useReducer, useCallback } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import findIndex from 'lodash/findIndex'
import isEqual from 'lodash/isEqual'
import { FixedSizeList as List } from 'react-window'
import ErrorBoundary from 'react-error-boundary'
import ReactResizeDetector from 'react-resize-detector'

import storeContext from '../../../storeContext'
import Row from './Row'
import Settings from './Settings'

const StyledList = styled(List)`
  overflow-x: hidden !important;
  margin-top: 5px;
  margin-bottom: 5px;
  @media print {
    display: none !important;
  }
`

const singleRowHeight = 23

function sizeReducer(state, action) {
  return action.payload
}

const Tree = ({ refetch }) => {
  const store = useContext(storeContext)
  const { activeNodeArray: aNA, nodesSorted: nodes } = store.tree

  const [sizeState, sizeDispatch] = useReducer(sizeReducer, {
    width: 0,
    height: 0,
  })
  const onResize = useCallback(
    (width, height) => sizeDispatch({ payload: { width, height } }),
    [],
  )

  const listRef = React.createRef()

  useEffect(() => {
    const index = findIndex(nodes, node => isEqual(node.url, aNA))
    if (index > -1 && listRef.current) listRef.current.scrollToItem(index)
  }, [aNA, listRef, nodes])

  return (
    <ErrorBoundary>
      <Settings refetch={refetch} />
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      <StyledList
        height={sizeState.height - 10}
        itemCount={nodes.length}
        itemSize={singleRowHeight}
        width={sizeState.width}
        ref={listRef}
      >
        {({ index, style }) => (
          <Row key={index} style={style} index={index} node={nodes[index]} />
        )}
      </StyledList>
    </ErrorBoundary>
  )
}

export default observer(Tree)
