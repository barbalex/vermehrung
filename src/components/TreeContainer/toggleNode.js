import isNodeOpen from './isNodeOpen'
import openNode from './openNode'

export default ({ node, store }) => {
  if (!node.url) {
    return console.log('passsed node has no url:', node)
    //throw new Error('passed node has no url')
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
