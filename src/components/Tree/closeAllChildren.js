import isEqual from 'lodash/isEqual'

export const closeAllChildren = ({ node, store }) => {
  const { setOpenNodes, openNodes } = store.tree

  const newOpenNodes = openNodes.filter((n) => {
    const urlPartWithEqualLength = n.slice(0, node.url.length)
    return !(
      isEqual(urlPartWithEqualLength, node.url) && n.length >= node.url.length
    )
  })
  setOpenNodes(newOpenNodes)
}
