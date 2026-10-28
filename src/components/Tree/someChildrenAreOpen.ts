import { isEqual } from 'es-toolkit'

import type { TreeNode } from './nodes/index.ts'

import { isNodeOpen } from './isNodeOpen.ts'

export const someChildrenAreOpen = ({
  nodes,
  url,
}: {
  nodes: TreeNode[]
  url: string[] | undefined
}) => {
  if (!url) return false

  // return false if node itself is closed
  if (!isNodeOpen({ url })) return false

  const childNodes = nodes.filter((n: TreeNode) => {
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
  return childNodes.some((n: TreeNode) => isNodeOpen({ url: n.url }))
}
