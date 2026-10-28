import { isEqual } from 'es-toolkit'

import type { TreeNode } from './nodes/index.ts'

import { store, openNodesAtom, setOpenNodes } from '../../store/index.ts'

export const closeAllChildren = ({ node }: { node: TreeNode }) => {
  const openNodes = store.get(openNodesAtom)

  const newOpenNodes = openNodes.filter((n: string[]) => {
    const urlPartWithEqualLength = n.slice(0, node.url.length)
    return !(
      isEqual(urlPartWithEqualLength, node.url) && n.length >= node.url.length
    )
  })
  setOpenNodes(newOpenNodes)
}
