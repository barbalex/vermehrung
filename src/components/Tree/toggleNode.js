import { isEqual } from 'es-toolkit'

import {
  store,
  activeNodeArrayAtom,
  addNotification,
  addOpenNode,
  setActiveNodeArray,
  setLastActiveNodeArray,
  setFilterShow,
} from '../../store/index.js'
import { isNodeOpen } from './isNodeOpen.js'

export const toggleNode = ({ node, nodes }) => {
  if (!node.url) {
    console.log('passsed node has no url:', node)
    return addNotification({
      message: 'Fehler: Dem Knoten im Navigationsbaum fehlt die url',
    })
  }
  const aNA = store.get(activeNodeArrayAtom)
  const activeNode = nodes.find((n) => isEqual(n.url, aNA))

  const nodeIsOpen = isNodeOpen({ url: node.url })
  if (!nodeIsOpen) {
    // node is closed
    // open it and make it the active node
    addOpenNode(node.url)
    const newActiveNodeArray = [...node.url]
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
    const newActiveNodeArray = [...node.url]
    setActiveNodeArray(newActiveNodeArray)
    setLastActiveNodeArray(node.url)
  }
  setFilterShow(false)
}
