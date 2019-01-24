import isEqual from 'lodash/isEqual'

export default (openNodes, url) => {
  if (!url) return false
  if (!openNodes) return false
  if (!openNodes.some) return false

  return openNodes.some(n => isEqual(n, url))
}
