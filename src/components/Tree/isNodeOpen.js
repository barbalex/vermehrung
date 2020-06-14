import isEqual from 'lodash/isEqual'

//export default (openNodes, url) => {
export default ({ store, url }) => {
  const { openNodesNotFiltered } = store.tree
  if (!url) return false

  return openNodesNotFiltered.some((n) => isEqual(n, url))
}
