/**
 * needed to place list in own component
 * because ref did not work when this was included in it's parent
 * listRef.current was always null
 */
import { useContext, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'
import findIndex from 'lodash/findIndex'
import isEqual from 'lodash/isEqual'
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
    const nodeIndex = findIndex(nodes, (node) => isEqual(node.url, urlToFocus))
    useEffect(() => {
      if (nodeIndex > -1) {
        listRef.current?.scrollToItem(nodeIndex)
      }
    }, [listRef, activeNode?.label, aNA, nodes, nodeIndex])

    return (
      <Virtuoso
        style={{ height: `${height - 5}px`, width: `${width}px`, marginTop: 5 }}
        totalCount={nodes.length}
        initialTopMostItemIndex={nodeIndex && nodeIndex > -1 ? nodeIndex : 0}
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
