import { isEqual } from 'es-toolkit'

import type { TreeNode } from './nodes/index.ts'

import { store, openNodesAtom } from '../../store/index.ts'

export const isNodeOpen = ({
  url,
}: {
  url: string[] | undefined
}) => {
  const openNodes = store.get(openNodesAtom)
  if (!url) return false

  return openNodes.some((n: string[]) => isEqual(n, url))
}
