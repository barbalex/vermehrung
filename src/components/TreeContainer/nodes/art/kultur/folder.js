import isEqual from 'lodash/isEqual'
import findIndex from 'lodash/findIndex'

export default ({ url, nodes, store, loading }) => {
  const { showArt, openNodes } = store.tree
  if (!showArt) return []
  const artId = url[1]
  const artNodes = nodes.filter((n) => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, (n) => n.id === `art${artId}`)

  const kulturen = store.kultursFiltered.filter((k) => k.art_id === artId)
  const nr = loading && !kulturen.length ? '...' : kulturen.length

  // only return if parent exists
  if (!openNodes.some((node) => isEqual(['Arten', artId], node))) {
    return []
  }

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Kulturen',
      id: `art${artId}KulturFolder`,
      label: `Kulturen (${nr})`,
      url: ['Arten', artId, 'Kulturen'],
      sort: [1, artIndex, 2],
      hasChildren: true,
      childrenCount: nr,
    },
  ]
}
