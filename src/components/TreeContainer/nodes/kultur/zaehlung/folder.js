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
  const zaehlungen = filterNodes({
    rows: get(kultur, 'zaehlungsBykulturId', []),
    filter: store.filter,
    table: 'zaehlung',
  })
  const nr = loading && !zaehlungen.length ? '...' : zaehlungen.length

  const kulturNodes = nodes.filter(n => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  // only return if parent exists
  if (!nodes.map(n => n.id).includes(`kultur${kulturId}`)) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Zählungen',
      id: `kultur${kulturId}ZaehlungFolder`,
      label: `Zählungen (${nr})`,
      url: ['Kulturen', kulturId, 'Zaehlungen'],
      sort: [7, kulturIndex, 1],
      hasChildren: true,
    },
  ]
}
