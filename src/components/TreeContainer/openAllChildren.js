import { getSnapshot } from 'mobx-state-tree'

import isNodeOpen from './isNodeOpen'
import openNode from './openNode'

export default ({ node: nodeRaw, store }) => {
  const { nodes, setOpenNodes, openNodes: openNodesRaw, addNode } = store.tree
  const openNodes = getSnapshot(openNodesRaw)
  const node = getSnapshot(nodeRaw)

  if (!isNodeOpen(openNodes, node.url)) {
    openNode({ node: nodeRaw, store })
  }

  let newOpenNodes = [...openNodes, node.url]
  setOpenNodes(newOpenNodes)
  // now add a loading node at the right position
  // to tell the user what is going on
  const loadingNode = {
    table: 'none',
    hasChildren: false,
    id: 'loadingNode',
    label: 'lade...',
    menuTitle: 'none',
    nodeType: 'table',
    parentId: 'hm',
    url: [...node.url, 1],
    sort: [...node.sort, 1],
  }
  addNode(loadingNode)
}
