import { isEqual } from 'es-toolkit'

import { isNodeOpen } from './isNodeOpen.js'

export const someChildrenAreOpen = ({ store, nodes, url }) => {
  if (!url) return false

  // return false if node itself is closed
  if (!isNodeOpen({ store, url })) return false

  const childNodes = nodes.filter((n) => {
    if (!n.url) {
      //TODO: this happens!
      //console.log('someChildrenAreOpen:', { n, nodes })
      return false
    }
    const urlPartWithEqualLength = n.url.slice(0, url.length)
    return (
      isEqual(urlPartWithEqualLength, url) && n.url.length === url.length + 1
    )
  })
  return childNodes.some((n) => isNodeOpen({ store, url: n.url }))
}
