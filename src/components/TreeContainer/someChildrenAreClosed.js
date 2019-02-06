import isEqual from 'lodash/isEqual'

import isNodeOpen from './isNodeOpen'

export default ({ nodes, openNodes, url }) => {
  if (!url) return false
  if (!openNodes) return false
  if (!openNodes.some) return false

  // return false if node itself is closed
  if (!isNodeOpen(openNodes, url)) return true

  const childNodes = nodes.filter(n => {
    const urlPartWithEqualLength = n.url.slice(0, url.length)
    return (
      isEqual(urlPartWithEqualLength, url) && n.url.length === url.length + 1
    )
  })
  return childNodes.some(n => !isNodeOpen(openNodes, n.url))
}
