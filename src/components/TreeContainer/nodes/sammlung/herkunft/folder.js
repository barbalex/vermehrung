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
  const herkunft = get(sammlung, 'herkunftByherkunftId')
  const nr = loading && !herkunft ? '...' : herkunft ? 1 : 0

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
      menuTitle: 'Herkünfte',
      id: `sammlung${sammlungId}HerkunftFolder`,
      label: `Herkünfte (${nr})`,
      url: ['Sammlungen', sammlungId, 'Herkuenfte'],
      sort: [6, sammlungIndex, 1],
      hasChildren: true,
    },
  ]
}
