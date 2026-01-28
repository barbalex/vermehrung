/**
 * needed to place list in own component
 * because ref did not work when this was included in it's parent
 * listRef.current was always null
 */
import { useContext, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'
import { isEqual } from 'es-toolkit'
import { Virtuoso } from 'react-virtuoso'

import { MobxStoreContext } from '../../mobxStoreContext.js'
import { TreeRow } from './Row.jsx'

export const TreeList = observer(
  ({ scrollableNodeRef, contentNodeRef, width, height, nodes, userRole }) => {
    const store = useContext(MobxStoreContext)
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
    const nodeIndex = nodes.findIndex((node) => isEqual(node.url, urlToFocus))
    
    // Only scroll once on initial mount, not on every click
    const hasScrolledRef = useRef(false)
    const initialIndexRef = useRef(nodeIndex && nodeIndex > -1 ? nodeIndex : 0)
    
    useEffect(() => {
      if (!hasScrolledRef.current && nodeIndex > -1) {
        hasScrolledRef.current = true
      }
    }, [nodeIndex])

    // using Virtuoso instead of react-virtualized because of white-space: normal on the tree rows
    // react-virtualized only supports predefined heights
    return (
      <Virtuoso
        ref={listRef}
        style={{
          height: height - 5,
          width: width,
          marginTop: 5,
          scrollbarWidth: 'thin',
        }}
        totalCount={nodes.length}
        initialTopMostItemIndex={initialIndexRef.current}
        itemContent={(index) => (
          <TreeRow
            key={index}
            node={nodes[index]}
            nodes={nodes}
            userRole={userRole}
          />
        )}
      />
    )
  },
)
