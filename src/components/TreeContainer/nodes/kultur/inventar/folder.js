import findIndex from 'lodash/findIndex'
import get from 'lodash/get'

import filterNodes from '../../../../../utils/filterNodes'

export default ({ url, nodes, data, loading, store }) => {
  const kulturId = url[1]
  const kulturen = filterNodes({
    rows: get(data, 'kultur', []),
    filter: store.filter,
    table: 'kultur',
  })
  const kultur = kulturen.find(k => k.id === kulturId)
  const inventare = filterNodes({
    rows: get(kultur, 'kulturInventarsBykulturId', []),
    filter: store.filter,
    table: 'inventar',
  })
  const nr = loading && !inventare.length ? '...' : inventare.length

  const kulturNodes = nodes.filter(n => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  // only return if parent exists
  if (!nodes.map(n => n.id).includes(`kultur${kulturId}`)) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Inventare',
      id: `kultur${kulturId}InventarFolder`,
      label: `Inventare (${nr})`,
      url: ['Kulturen', kulturId, 'Inventare'],
      sort: [7, kulturIndex, 5],
      hasChildren: true,
    },
  ]
}
