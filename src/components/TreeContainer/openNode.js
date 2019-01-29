import { getSnapshot } from 'mobx-state-tree'
import isNodeOpen from './isNodeOpen'

export default ({ node: nodeRaw, store }) => {
  const { setOpenNodes, openNodes: openNodesRaw } = store.tree
  const openNodes = getSnapshot(openNodesRaw)
  const node = getSnapshot(nodeRaw)
  // make sure this node's url is not yet contained
  // otherwise same nodes will be added multiple times!
  if (isNodeOpen(openNodes, node.url)) return

  let newOpenNodes = [...openNodes, node.url]
  setOpenNodes(newOpenNodes)
}
