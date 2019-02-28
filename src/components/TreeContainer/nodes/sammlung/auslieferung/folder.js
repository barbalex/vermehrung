import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import filterNodes from '../../../../../utils/filterNodes'

export default ({ data, loading, url, nodes, store }) => {
  const sammlungId = url[1]

  const sammlungen = filterNodes({
    rows: get(data, 'sammlung', []),
    filter: store.filter,
    table: 'sammlung',
  })
  const sammlung = sammlungen.find(p => p.id === sammlungId)
  const lieferungen = filterNodes({
    rows: get(sammlung, 'lieferungsByvonSammlungId', []),
    filter: store.filter,
    table: 'lieferung',
  })
  const nr = loading && !lieferungen.length ? '...' : lieferungen.length

  const sammlungNodes = nodes.filter(n => n.parentId === 'sammlungFolder')
  const sammlungIndex = findIndex(
    sammlungNodes,
    n => n.id === `sammlung${sammlungId}`,
  )

  // only return if parent exists
  if (!nodes.map(n => n.id).includes(`sammlung${sammlungId}`)) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Aus-Lieferungen',
      id: `sammlung${sammlungId}LieferungFolder`,
      label: `Aus-Lieferungen (${nr})`,
      url: ['Sammlungen', sammlungId, 'Aus-Lieferungen'],
      sort: [6, sammlungIndex, 3],
      hasChildren: true,
    },
  ]
}
