import type { TreeNode } from './nodes/index.ts'

import { isEqual } from 'es-toolkit'

import {
  store,
  activeNodeArrayAtom,
  addNotification,
  addOpenNode,
  setActiveNodeArray,
  setLastActiveNodeArray,
  setFilterShow,
} from '../../store/index.ts'
import { isNodeOpen } from './isNodeOpen.ts'
import { breadcrumbsEnabled } from '../../utils/breadcrumbsEnabled.ts'
import { singularOfFolder } from '../../utils/singularOfFolder.ts'

// with breadcrumbs enabled, activating an object node opens its form
// directly (the url gets the object name suffix)
const urlToActivate = (node: TreeNode) => {
  if (!breadcrumbsEnabled || node.nodeType !== 'table') return [...node.url]
  const objectName = singularOfFolder[node.url.at(-2) as string]
  return objectName ? [...node.url, objectName] : [...node.url]
}

export const toggleNode = ({
  node,
  nodes,
}: {
  node: TreeNode
  nodes: TreeNode[]
}) => {
  if (!node.url) {
    console.log('passsed node has no url:', node)
    return addNotification({
      message: 'Fehler: Dem Knoten im Navigationsbaum fehlt die url',
    })
  }
  const aNA = store.get(activeNodeArrayAtom)
  const activeNode = nodes.find((n: TreeNode) => isEqual(n.url, aNA))

  const nodeIsOpen = isNodeOpen({ url: node.url })
  if (!nodeIsOpen) {
    // node is closed
    // open it and make it the active node
    addOpenNode(node.url)
    const newActiveNodeArray = urlToActivate(node)
    setActiveNodeArray(newActiveNodeArray)
    setLastActiveNodeArray(node.url)
  } else if (node.id === activeNode?.id) {
    // the node is open
    // AND it is the active node
    // make it's parent the new active node
    const newActiveNodeArray = [...node.url]
    newActiveNodeArray.pop()
    setActiveNodeArray(newActiveNodeArray)
    setLastActiveNodeArray(node.url)
  } else {
    // the node is open
    // but not the active node
    // make it the new active node
    const newActiveNodeArray = urlToActivate(node)
    setActiveNodeArray(newActiveNodeArray)
    setLastActiveNodeArray(node.url)
  }
  setFilterShow(false)
}
