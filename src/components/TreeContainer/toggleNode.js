import { navigate } from '@reach/router'

import isNodeOpen from './isNodeOpen'
import isNodeInActiveNodePath from './isNodeInActiveNodePath'
import openNode from './openNode'

export default ({ node, store }) => {
  if (!node.url) {
    return console.log('passsed node has no url:', node)
    //throw new Error('passed node has no url')
  }
  const { openNodes, activeNodeArray, setActiveNodeArray } = store.tree

  const newActiveNodeArray = [...node.url]
  const nodeIsOpen = isNodeOpen(openNodes, node.url)
  if (nodeIsOpen && isNodeInActiveNodePath(node, activeNodeArray)) {
    // need to check if node is last in activeNodePath
    if (node.url.length === activeNodeArray.length) {
      /**
       * dont do anything:
       * klicked node should always be / remain active
       */
    } else {
      // leave newActiveNodeArray as it is
    }
  } else if (!nodeIsOpen) {
    openNode({ node, store })
  }

  setActiveNodeArray(newActiveNodeArray)
  navigate(`/Vermehrung/${node.url.join('/')}`)
}
