import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import filterNodes from '../../../../../utils/filterNodes'

export default ({ url, nodes, data, loading, store }) => {
  const artId = url[1]
  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${artId}`)

  const arten = filterNodes({
    rows: get(data, 'art', []),
    filter: store.filter,
    table: 'art',
  })
  const art = arten.find(a => a.id === artId)
  const sammlungen = filterNodes({
    rows: get(art, 'sammlungsByartId', []),
    filter: store.filter,
    table: 'sammlung',
  })
  const nr = loading && !sammlungen.length ? '...' : sammlungen.length

  // only return if parent exists
  if (!nodes.map(n => n.id).includes(`art${artId}`)) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Sammlungen',
      id: `art${artId}SammlungFolder`,
      label: `Sammlungen (${nr})`,
      url: ['Arten', artId, 'Sammlungen'],
      sort: [1, artIndex, 2],
      hasChildren: true,
    },
  ]
}
