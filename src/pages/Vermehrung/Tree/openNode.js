import { navigate } from '@reach/router'
import isNodeOpen from './isNodeOpen'

export default ({ node, openNodes, store }) => {
  const { setOpenNodes } = store.tree
  // make sure this node's url is not yet contained
  // otherwise same nodes will be added multiple times!
  if (isNodeOpen(openNodes, node.url)) return

  let newOpenNodes = [...openNodes, node.url]

  setOpenNodes(newOpenNodes)
  navigate(`/Vermehrung/${node.url.join('/')}`)
}
