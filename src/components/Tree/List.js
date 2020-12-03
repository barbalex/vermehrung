/**
 * needed to place list in own component
 * because ref did not work - listRef.current was always null
 */
import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'
import findIndex from 'lodash/findIndex'
import isEqual from 'lodash/isEqual'
import { FixedSizeList as List } from 'react-window'

import { StoreContext } from '../../models/reactUtils'
import Row from './Row'

const StyledList = styled(List)`
  margin-top: 5px;

  /* hide native scrollbar */
  &::-webkit-scrollbar {
    width: 0;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    box-shadow: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    box-shadow: none;
  }

  @media print {
    display: none !important;
  }
`

const Tree = ({ scrollableNodeRef, contentNodeRef, width, height, nodes }) => {
  const store = useContext(StoreContext)
  const {
    singleRowHeight,
    activeNodeArray: aNAProxy,
    activeNode,
    //nodes: storeNodes,
  } = store.tree
  const aNA = getSnapshot(aNAProxy)

  const listRef = useRef(null)

  // what else to rerender on?

  // TODO:
  // need to scroll when any of the label-relevant fields of the active form change
  const nodeIndex = findIndex(nodes, (node) => isEqual(node.url, aNA))
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
        />
      )}
    </StyledList>
  )
}

export default observer(Tree)
