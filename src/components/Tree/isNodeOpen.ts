import { isEqual } from 'es-toolkit'

import { store, openNodesAtom } from '../../store/index.ts'

export const isNodeOpen = ({ url }) => {
  const openNodes = store.get(openNodesAtom)
  if (!url) return false

  return openNodes.some((n) => isEqual(n, url))
}
