import findIndex from 'lodash/findIndex'

export default ({ url, nodes, store, loading }) => {
  const gartenId = url[1]
  const gartenNodes = nodes.filter((n) => n.parentId === 'gartenFolder')
  const gartenIndex = findIndex(
    gartenNodes,
    (n) => n.id === `garten${gartenId}`,
  )

  const kulturen = store.kultursFiltered.filter((k) => k.garten_id === gartenId)
  const nr = loading && !kulturen.length ? '...' : kulturen.length

  // only return if parent exists
  if (!nodes.map((n) => n.id).includes(`garten${gartenId}`)) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Kulturen',
      id: `garten${gartenId}KulturFolder`,
      label: `Kulturen (${nr})`,
      url: ['Gaerten', gartenId, 'Kulturen'],
      sort: [4, gartenIndex, 1],
      hasChildren: true,
      childrenCount: nr,
    },
  ]
}
