import isNodeOpen from './isNodeOpen'
import openNode from './openNode'

const toggleNode = ({ node, store }) => {
  const { addNotification, tree } = store
  if (!node.url) {
    console.log('passsed node has no url:', node)
    return addNotification({
      message: 'Fehler: Dem Knoten im Navigationsbaum fehlt die url',
    })
  }
  const { setActiveNodeArray } = store.tree

  const nodeIsOpen = isNodeOpen({ store, url: node.url })
  if (!nodeIsOpen) {
    // node is closed
    // open it and make it the active node
    openNode({ node, store })
    const newActiveNodeArray = [...node.url]
    setActiveNodeArray(newActiveNodeArray)
  } else if (node.id === tree?.activeNode?.id) {
    // the node is open
    // AND it is the active node
    // make it's parent the new active node
    const newActiveNodeArray = [...node.url]
    newActiveNodeArray.pop()
    setActiveNodeArray(newActiveNodeArray)
  } else {
    // the node is open
    // but not the active node
    // make it the new active node
    const newActiveNodeArray = [...node.url]
    setActiveNodeArray(newActiveNodeArray)
  }
  store.filter.setShow(false)
}

export default toggleNode
