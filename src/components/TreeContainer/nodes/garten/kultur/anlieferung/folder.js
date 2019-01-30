import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const gartenId = url[1]
  const kulturId = url[3]
  const gaerten = get(data, 'garten', [])
  const garten = gaerten.find(a => a.id === gartenId)
  const kulturen = get(garten, 'kultursBygartenId', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const anlieferungen = get(kultur, 'lieferungsBynachKulturId', [])
  const nr = loading && !anlieferungen.length ? '...' : anlieferungen.length

  const gartenNodes = nodes.filter(n => n.parentId === 'gartenFolder')
  const gartenIndex = findIndex(gartenNodes, n => n.id === `garten${gartenId}`)
  const kulturNodes = nodes.filter(
    n => n.parentId === `garten${gartenId}KulturFolder`,
  )
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  return [
    {
      nodeType: 'folder',
      menuType: 'artKulturAnLieferungFolder',
      id: `kultur${kulturId}AnLieferungFolder`,
      label: `An-Lieferungen (${nr})`,
      url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'An-Lieferungen'],
      sort: [2, gartenIndex, 1, kulturIndex, 2],
      hasChildren: true,
    },
  ]
}
