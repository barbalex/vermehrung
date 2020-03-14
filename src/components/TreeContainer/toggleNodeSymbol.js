import isEqual from 'lodash/isEqual'
import { getSnapshot } from 'mobx-state-tree'

import isNodeOpen from './isNodeOpen'

export default ({ node, store }) => {
  if (!node.url) throw new Error('passed node has no url')
  const { setOpenNodes, addOpenNodes, openNodes: openNodesRaw } = store.tree
  const openNodes = getSnapshot(openNodesRaw)

  store.filter.setShow(false)
  let newOpenNodes = [...openNodes]
  if (isNodeOpen(openNodes, node.url)) {
    newOpenNodes = newOpenNodes.filter(n => !isEqual(n, node.url))
    setOpenNodes(newOpenNodes)
  } else {
    addOpenNodes([node.url])
  }
}
