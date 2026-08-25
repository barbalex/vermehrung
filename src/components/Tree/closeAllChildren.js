import { isEqual } from 'es-toolkit'

import { store, openNodesAtom, setOpenNodes } from '../../store/index.js'

export const closeAllChildren = ({ node }) => {
  const openNodes = store.get(openNodesAtom)

  const newOpenNodes = openNodes.filter((n) => {
    const urlPartWithEqualLength = n.slice(0, node.url.length)
    return !(
      isEqual(urlPartWithEqualLength, node.url) && n.length >= node.url.length
    )
  })
  setOpenNodes(newOpenNodes)
}
