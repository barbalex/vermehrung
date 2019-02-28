import isEqual from 'lodash/isEqual'
import { getSnapshot } from 'mobx-state-tree'

import isNodeOpen from './isNodeOpen'

export default ({ node: nodeRaw, store }) => {
  const node = getSnapshot(nodeRaw)
  if (!node.url) throw new Error('passed node has no url')
  const { setOpenNodes, openNodes: openNodesRaw } = store.tree
  const openNodes = getSnapshot(openNodesRaw)

  let newOpenNodes = [...openNodes]
  if (isNodeOpen(openNodes, node.url)) {
    newOpenNodes = newOpenNodes.filter(n => !isEqual(n, node.url))
  } else {
    newOpenNodes.push(node.url)
  }
  store.filter.setShow(false)
  setOpenNodes(newOpenNodes)
}
