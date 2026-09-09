import { isEqual } from 'es-toolkit'

import { store, openNodesAtom, setOpenNodes } from '../../store/index.js'

export const openAllChildren = ({ node, nodes }) => {
  const openNodes = store.get(openNodesAtom)

  const childNodes = nodes.filter((n) => {
    const urlPartWithEqualLength = n.url.slice(0, node.url.length)
    return (
      isEqual(urlPartWithEqualLength, node.url) &&
      n.url.length === node.url.length + 1
    )
  })

  const newOpenNodes = [...openNodes, ...childNodes.map((n) => n.url)]
  setOpenNodes(newOpenNodes)
}
