import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const gartenId = url[1]
  const kulturId = url[3]
  const gaerten = data?.garten ?? []
  const garten = gaerten.find((a) => a.id === gartenId)
  const kulturen = garten?.kulturs ?? []
  const kultur = kulturen.find((k) => k.id === kulturId)
  const tk = kultur?.kultur_option?.tk
  if (!tk) return []
  const teilkulturen = kultur?.teilkulturs ?? []
  const nr = loading && !teilkulturen.length ? '...' : teilkulturen.length

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
      menuTitle: 'Teilkulturen',
      id: `garten${gartenId}Kultur${kulturId}TeilkulturFolder`,
      label: `Teilkulturen (${nr})`,
      url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Teilkulturen'],
      sort: [4, gartenIndex, 1, kulturIndex, 1],
      hasChildren: true,
    },
  ]
}
