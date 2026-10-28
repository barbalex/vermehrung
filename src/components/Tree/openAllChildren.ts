import { isEqual } from 'es-toolkit'

import type { TreeNode } from './nodes/index.ts'

import { store, openNodesAtom, setOpenNodes } from '../../store/index.ts'

export const openAllChildren = ({
  node,
  nodes,
}: {
  node: import('./nodes/index.ts').TreeNode
  nodes: import('./nodes/index.ts').TreeNode[]
}) => {
  const openNodes = store.get(openNodesAtom)

  const childNodes = nodes.filter((n: TreeNode) => {
    const urlPartWithEqualLength = n.url.slice(0, node.url.length)
    return (
      isEqual(urlPartWithEqualLength, node.url) &&
      n.url.length === node.url.length + 1
    )
  })

  const newOpenNodes = [...openNodes, ...childNodes.map((n: TreeNode) => n.url)]
  setOpenNodes(newOpenNodes)
}
