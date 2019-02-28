import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import filterNodes from '../../../../../utils/filterNodes'

export default ({ url, nodes, data, loading, store }) => {
  const kulturId = url[1]
  const kulturen = filterNodes({
    rows: get(data, 'kultur', []),
    filter: store.filter,
    table: 'kultur',
  })
  const kultur = kulturen.find(k => k.id === kulturId)
  const anlieferungen = filterNodes({
    rows: get(kultur, 'lieferungsBynachKulturId', []),
    filter: store.filter,
    table: 'lieferung',
  })
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
      sort: [7, kulturIndex, 2],
      hasChildren: true,
    },
  ]
}
