import { isNodeOpen } from './isNodeOpen.js'
import { isNodeInActiveNodePath } from './isNodeInActiveNodePath.js'

const toggleNodeSymbol = ({ node, store }) => {
  const { addNotification } = store
  if (!node.url) {
    console.log('passsed node has no url:', node)
    return addNotification({
      message: 'Fehler: Dem Knoten im Navigationsbaum fehlt die url',
    })
  }
  const {
    addOpenNode,
    setActiveNodeArray,
    activeNodeArray,
    removeOpenNodeWithChildren,
    setLastActiveNodeArray,
  } = store.tree

  store.filter.setShow(false)
  // TODO: tell user if childrenCount is 0 he can create
  if (isNodeOpen({ store, url: node.url })) {
    removeOpenNodeWithChildren(node.url)
    if (isNodeInActiveNodePath({ node, activeNodeArray })) {
      // when a user closes a folder in the active node path
      // the active node should swith to the node's parent
      const newActiveNodeArray = [...node.url]
      newActiveNodeArray.pop()
      setActiveNodeArray(newActiveNodeArray)
    }
  } else {
    addOpenNode(node.url)
  }
  setLastActiveNodeArray(node.url)
}

export default toggleNodeSymbol
