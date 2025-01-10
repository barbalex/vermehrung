import { getSnapshot } from 'mobx-state-tree'
import isEqual from 'lodash/isEqual'

export const openAllChildren = ({ node, store, nodes }) => {
  const { setOpenNodes, openNodes: openNodesRaw } = store.tree
  const openNodes = getSnapshot(openNodesRaw)

  const childNodes = nodes.filter((n) => {
    const urlPartWithEqualLength = n.url.slice(0, node.url.length)
    return (
      isEqual(urlPartWithEqualLength, node.url) &&
      n.url.length === node.url.length + 1
    )
  })

  const newOpenNodes = [...openNodes, ...childNodes.map((n) => n.url)]
  setOpenNodes(newOpenNodes)
}
