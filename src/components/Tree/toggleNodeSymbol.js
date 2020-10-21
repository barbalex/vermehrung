import isEqual from 'lodash/isEqual'
import { getSnapshot } from 'mobx-state-tree'

import isNodeOpen from './isNodeOpen'
import isNodeInActiveNodePath from './isNodeInActiveNodePath'

export default ({ node, store }) => {
  const { addNotification } = store
  const { setActiveNodeArray, activeNodeArray } = store.tree
  if (!node.url) {
    console.log('passsed node has no url:', node)
    return addNotification({
      message: 'Fehler: Dem Knoten im Navigationsbaum fehlt die url',
    })
  }
  const { setOpenNodes, addOpenNodes, openNodes: openNodesRaw } = store.tree
  const openNodes = getSnapshot(openNodesRaw)

  store.filter.setShow(false)
  let newOpenNodes = [...openNodes]
  // TODO: tell user if childrenCount is 0 he can create
  if (isNodeOpen({ store, url: node.url })) {
    newOpenNodes = newOpenNodes.filter((n) => !isEqual(n, node.url))
    setOpenNodes(newOpenNodes)
    if (isNodeInActiveNodePath({ node, activeNodeArray })) {
      // when a user closes a folder in the active node path
      // the active node should swith to the node's parent
      const newActiveNodeArray = [...node.url]
      newActiveNodeArray.pop()
      setActiveNodeArray(newActiveNodeArray)
    }
  } else {
    addOpenNodes([node.url])
  }
}
