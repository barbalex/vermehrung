import { getSnapshot } from 'mobx-state-tree'
import isEqual from 'lodash/isEqual'

export default ({ node: nodeRaw, store }) => {
  const { nodes: nodesRaw, setOpenNodes, openNodes: openNodesRaw } = store.tree
  const openNodes = getSnapshot(openNodesRaw)
  const node = getSnapshot(nodeRaw)
  const nodes = getSnapshot(nodesRaw)

  const childNodes = nodes.filter(n => {
    const urlPartWithEqualLength = n.url.slice(0, node.url.length)
    return (
      isEqual(urlPartWithEqualLength, node.url) &&
      n.url.length === node.url.length + 1
    )
  })

  const newOpenNodes = [...openNodes, ...childNodes.map(n => n.url)]
  setOpenNodes(newOpenNodes)
}
