import findIndex from 'lodash/findIndex'

export default ({ url, nodes, store, loading }) => {
  const personId = url[1]
  const gartenId = url[3]

  const kulturen = store.kulturFiltered.filter((s) => s.garten_id === gartenId)
  const nr = loading && !kulturen.length ? '...' : kulturen.length

  const personNodes = nodes.filter((n) => n.parentId === 'personFolder')
  const personIndex = findIndex(
    personNodes,
    (n) => n.id === `person${personId}`,
  )

  const gartenNodes = nodes.filter(
    (n) => n.parentId === `person${personId}GartenFolder`,
  )
  const gartenIndex = findIndex(
    gartenNodes,
    (n) => n.id === `person${personId}Garten${gartenId}`,
  )

  // only return if parent exists
  if (!nodes.map((n) => n.id).includes(`person${personId}Garten${gartenId}`))
    return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Kulturen',
      id: `person${personId}Garten${gartenId}KulturFolder`,
      label: `Kulturen (${nr})`,
      url: ['Personen', personId, 'Gaerten', gartenId, 'Kulturen'],
      sort: [11, personIndex, 2, gartenIndex, 1],
      hasChildren: true,
    },
  ]
}
