import { getSnapshot } from 'mobx-state-tree'
import isNodeOpen from './isNodeOpen'

export default ({ node: nodeRaw, store }) => {
  const { setOpenNodes, openNodes: openNodesRaw, addNode } = store.tree
  const openNodes = getSnapshot(openNodesRaw)
  const node = getSnapshot(nodeRaw)
  // make sure this node's url is not yet contained
  // otherwise same nodes will be added multiple times!
  if (isNodeOpen(openNodes, node.url)) return

  let newOpenNodes = [...openNodes, node.url]
  setOpenNodes(newOpenNodes)
  // now add a loading node at the right position
  // to tell the user what is going on
  const loadingNode = {
    filterTable: 'none',
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
