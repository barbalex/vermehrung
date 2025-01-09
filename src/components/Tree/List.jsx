/**
 * needed to place list in own component
 * because ref did not work when this was included in it's parent
 * listRef.current was always null
 */
import React, { useContext, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'
import findIndex from 'lodash/findIndex'
import isEqual from 'lodash/isEqual'
import { FixedSizeList as List } from 'react-window'

import StoreContext from '../../mobxStoreContext.js'
import Row from './Row.jsx'

const StyledList = styled(List)`
  margin-top: 5px;

  @media print {
    display: none !important;
  }
`

const Tree = ({
  scrollableNodeRef,
  contentNodeRef,
  width,
  height,
  nodes,
  userRole,
}) => {
  const store = useContext(StoreContext)
  const {
    singleRowHeight,
    activeNodeArray: aNAProxy,
    lastActiveNodeArray: lastTouchedNodeProxy,
  } = store.tree
  const aNA = getSnapshot(aNAProxy)
  const activeNode = nodes.find((n) => isEqual(n.url, aNA))

  const listRef = useRef(null)
  const lastActiveNodeArray = getSnapshot(lastTouchedNodeProxy)
  // when loading on url, lastActiveNodeArray may not be set
  const urlToFocus = lastActiveNodeArray.length ? lastActiveNodeArray : aNA
  const nodeIndex = findIndex(nodes, (node) => isEqual(node.url, urlToFocus))
  useEffect(() => {
    if (nodeIndex > -1) {
      listRef.current?.scrollToItem(nodeIndex)
    }
  }, [listRef, activeNode?.label, aNA, nodes, nodeIndex])

  return (
    <StyledList
      height={height - 5}
      itemCount={nodes.length}
      itemSize={singleRowHeight}
      width={width}
      ref={listRef}
      innerRef={contentNodeRef}
      outerRef={scrollableNodeRef}
    >
      {({ index, style }) => (
        <Row
          key={index}
          style={style}
          index={index}
          node={nodes[index]}
          nodes={nodes}
          userRole={userRole}
        />
      )}
    </StyledList>
  )
}

export default observer(Tree)
