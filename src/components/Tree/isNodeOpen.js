import isEqual from 'lodash/isEqual'

export const isNodeOpen = ({ store, url }) => {
  const { openNodes } = store.tree
  if (!url) return false

  return openNodes.some((n) => isEqual(n, url))
}
