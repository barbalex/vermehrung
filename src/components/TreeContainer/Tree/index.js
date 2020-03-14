import React, {
  useContext,
  useEffect,
  useReducer,
  useCallback,
  useRef,
} from 'react'
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
  margin-top: 5px;
  @media print {
    display: none !important;
  }
`

const singleRowHeight = 23

function sizeReducer(state, action) {
  return action.payload
}

const Tree = ({ data, personId, nodes }) => {
  const store = useContext(storeContext)

  const { activeNodeArray: aNA } = store.tree

  const [sizeState, sizeDispatch] = useReducer(sizeReducer, {
    width: 0,
    height: 0,
  })
  const onResize = useCallback(
    (width, height) => sizeDispatch({ payload: { width, height } }),
    [],
  )

  const listRef = useRef(null)

  useEffect(() => {
    const index = findIndex(nodes, node => isEqual(node.url, aNA))
    if (index > -1 && listRef.current) listRef.current.scrollToItem(index)
  }, [aNA, listRef, nodes])

  return (
    <ErrorBoundary>
      <Settings data={data} personId={personId} />
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      <StyledList
        height={sizeState.height - 5}
        itemCount={nodes.length}
        itemSize={singleRowHeight}
        width={sizeState.width}
        ref={listRef}
      >
        {({ index, style }) => (
          <Row
            key={index}
            style={style}
            index={index}
            node={nodes[index]}
            nodes={nodes}
          />
        )}
      </StyledList>
    </ErrorBoundary>
  )
}

export default observer(Tree)
