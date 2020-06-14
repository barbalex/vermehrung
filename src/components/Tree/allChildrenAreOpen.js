// NOT IN USE
import isEqual from 'lodash/isEqual'

import isNodeOpen from './isNodeOpen'

export default ({ store, nodes, url }) => {
  if (!url) return false

  // return false if node itself is closed
  if (!isNodeOpen({ store, url })) return false

  const childNodes = nodes.filter((n) => {
    const urlPartWithEqualLength = n.url.slice(0, url.length)
    return (
      isEqual(urlPartWithEqualLength, url) && n.url.length === url.length + 1
    )
  })
  return childNodes.every((n) => isNodeOpen({ store, url: n.url }))
}
