import { isEqual } from 'es-toolkit'

export const isNodeOpen = ({ store, url }) => {
  const { openNodes } = store.tree
  if (!url) return false

  return openNodes.some((n) => isEqual(n, url))
}
