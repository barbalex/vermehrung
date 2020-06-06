import isEqual from 'lodash/isEqual'
import { getSnapshot } from 'mobx-state-tree'

import isNodeOpen from './isNodeOpen'

export default ({ node, store }) => {
  const { addNotification } = store
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
  if (isNodeOpen(openNodes, node.url)) {
    newOpenNodes = newOpenNodes.filter((n) => !isEqual(n, node.url))
    setOpenNodes(newOpenNodes)
  } else {
    addOpenNodes([node.url])
  }
}
