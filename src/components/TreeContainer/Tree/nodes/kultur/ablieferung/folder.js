import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const kulturId = url[1]
  const kulturen = get(data, 'kultur', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const ablieferungen = get(kultur, 'lieferungsByvonKulturId', [])
  const nr = loading && !ablieferungen.length ? '...' : ablieferungen.length

  const kulturNodes = nodes.filter(n => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  return [
    {
      nodeType: 'folder',
      menuType: 'artKulturAbLieferungFolder',
      id: `kultur${kulturId}AbLieferungFolder`,
      label: `Ab-Lieferungen (${nr})`,
      url: ['Kulturen', kulturId, 'Ab-Lieferungen'],
      sort: [7, kulturIndex, 3],
      hasChildren: true,
    },
  ]
}
