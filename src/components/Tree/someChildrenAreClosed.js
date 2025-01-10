import isEqual from 'lodash/isEqual'

import { isNodeOpen } from './isNodeOpen.js'

const someChildrenAreClosed = ({ store, nodes, url }) => {
  if (!url) return false

  // return false if node itself is closed
  if (!isNodeOpen({ store, url })) return true

  const childNodes = nodes.filter((n) => {
    if (!n.url) {
      //TODO: this happens!
      //console.log('someChildrenAreClosed:', { n, nodes })
      return false
    }
    const urlPartWithEqualLength = n.url.slice(0, url.length)
    return (
      isEqual(urlPartWithEqualLength, url) && n.url.length === url.length + 1
    )
  })
  return childNodes.some((n) => !isNodeOpen({ store, url: n.url }))
}

export default someChildrenAreClosed
