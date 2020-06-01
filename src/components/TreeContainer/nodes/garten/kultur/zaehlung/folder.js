import findIndex from 'lodash/findIndex'

export default ({ url, nodes, store, loading }) => {
  const gartenId = url[1]
  const kulturId = url[3]
  const zaehlungen = store.zaehlungFiltered.filter(
    (z) => z.kultur_id === kulturId,
  )
  const nr = loading && !zaehlungen.length ? '...' : zaehlungen.length

  const gartenNodes = nodes.filter((n) => n.parentId === 'gartenFolder')
  const gartenIndex = findIndex(
    gartenNodes,
    (n) => n.id === `garten${gartenId}`,
  )
  const kulturNodes = nodes.filter(
    (n) => n.parentId === `garten${gartenId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    (n) => n.id === `garten${gartenId}Kultur${kulturId}`,
  )

  // only return if parent exists
  if (!nodes.map((n) => n.id).includes(`garten${gartenId}Kultur${kulturId}`))
    return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Zählungen',
      id: `garten${gartenId}Kultur${kulturId}ZaehlungFolder`,
      label: `Zählungen (${nr})`,
      url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Zaehlungen'],
      sort: [4, gartenIndex, 1, kulturIndex, 2],
      hasChildren: true,
    },
  ]
}
