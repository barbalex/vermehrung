import { getSnapshot } from 'mobx-state-tree'
import isEqual from 'lodash/isEqual'

export default ({ node: nodeRaw, store }) => {
  const { setOpenNodes, openNodes: openNodesRaw } = store.tree
  const openNodes = getSnapshot(openNodesRaw)
  const node = getSnapshot(nodeRaw)

  const newOpenNodes = openNodes.filter(n => {
    const urlPartWithEqualLength = n.slice(0, node.url.length)
    return !(
      isEqual(urlPartWithEqualLength, node.url) && n.length >= node.url.length
    )
  })
  setOpenNodes(newOpenNodes)
}
