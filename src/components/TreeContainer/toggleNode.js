import isNodeOpen from './isNodeOpen'
import openNode from './openNode'

export default ({ node, store }) => {
  const { addNotification } = store
  if (!node.url) {
    console.log('passsed node has no url:', node)
    return addNotification({
      message: 'Fehler: Dem Knoten im Navigationsbaum fehlt eine url',
    })
  }
  const { openNodes, setActiveNodeArray } = store.tree

  //console.log('toggleNode')

  const newActiveNodeArray = [...node.url]
  const nodeIsOpen = isNodeOpen(openNodes, node.url)
  if (!nodeIsOpen) {
    openNode({ node, store })
  }
  store.filter.setShow(false)
  setActiveNodeArray(newActiveNodeArray)
}
