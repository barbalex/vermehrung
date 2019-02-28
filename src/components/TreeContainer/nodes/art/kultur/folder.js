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
  const kulturen = filterNodes({
    rows: get(art, 'kultursByartId', []),
    filter: store.filter,
    table: 'kultur',
  })
  const nr = loading && !kulturen.length ? '...' : kulturen.length

  // only return if parent exists
  if (!nodes.map(n => n.id).includes(`art${artId}`)) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Kulturen',
      id: `art${artId}KulturFolder`,
      label: `Kulturen (${nr})`,
      url: ['Arten', artId, 'Kulturen'],
      sort: [1, artIndex, 1],
      hasChildren: true,
    },
  ]
}
