import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const kulturId = url[1]
  const kulturen = get(data, 'kultur', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const anlieferungen = get(kultur, 'lieferungsByNachKulturId', [])
  const nr = loading && !anlieferungen.length ? '...' : anlieferungen.length

  const kulturNodes = nodes.filter(n => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  // only return if parent exists
  if (!nodes.map(n => n.id).includes(`kultur${kulturId}`)) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'An-Lieferungen',
      id: `kultur${kulturId}AnLieferungFolder`,
      label: `An-Lieferungen (${nr})`,
      url: ['Kulturen', kulturId, 'An-Lieferungen'],
      sort: [5, kulturIndex, 3],
      hasChildren: true,
    },
  ]
}
