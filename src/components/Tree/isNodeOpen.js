import isEqual from 'lodash/isEqual'

const isNodeOpen = ({ store, url }) => {
  const { openNodes } = store.tree
  if (!url) return false

  return openNodes.some((n) => isEqual(n, url))
}

export default isNodeOpen
