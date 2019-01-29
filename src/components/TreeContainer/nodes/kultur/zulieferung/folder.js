import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const kulturId = url[1]
  const kulturen = get(data, 'kultur', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const zulieferungen = get(kultur, 'lieferungsBynachKulturId', [])
  const nr = loading && !zulieferungen.length ? '...' : zulieferungen.length

  const kulturNodes = nodes.filter(n => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  return [
    {
      nodeType: 'folder',
      menuType: 'artKulturZuLieferungFolder',
      id: `kultur${kulturId}ZuLieferungFolder`,
      label: `Zu-Lieferungen (${nr})`,
      url: ['Kulturen', kulturId, 'Zu-Lieferungen'],
      sort: [7, kulturIndex, 2],
      hasChildren: true,
    },
  ]
}
