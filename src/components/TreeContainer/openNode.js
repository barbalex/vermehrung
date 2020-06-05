import { getSnapshot } from 'mobx-state-tree'
import isNodeOpen from './isNodeOpen'

export default ({ node, store }) => {
  const { addOpenNodes, openNodes: openNodesRaw } = store.tree
  const openNodes = getSnapshot(openNodesRaw)
  // make sure this node's url is not yet contained
  // otherwise same nodes will be added multiple times!
  if (isNodeOpen(openNodes, node.url)) return

  //  console.log('openNode opening:', node.url)
  addOpenNodes([node.url])
  if (!node.hasChildren) return
  // now add a loading node at the right position
  // to tell the user what is going on
  // turned off 2020.06.02 because prevented new nodes from appearing
  /*const loadingNode = {
    table: 'none',
    hasChildren: false,
    id: 'loadingNode',
    label: 'lade...',
    menuTitle: 'none',
    nodeType: 'table',
    url: [...node.url, 1],
    sort: [...node.sort, 1],
  }
  addNode(loadingNode)*/
}
