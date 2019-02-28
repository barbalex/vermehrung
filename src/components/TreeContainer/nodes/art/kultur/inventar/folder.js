import findIndex from 'lodash/findIndex'
import get from 'lodash/get'

import filterNodes from '../../../../../../utils/filterNodes'

export default ({ url, nodes, data, loading, store }) => {
  const artId = url[1]
  const kulturId = url[3]
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
  const kultur = kulturen.find(k => k.id === kulturId)
  const inventare = filterNodes({
    rows: get(kultur, 'kulturInventarsBykulturId', []),
    filter: store.filter,
    table: 'inventar',
  })
  const nr = loading && !inventare.length ? '...' : inventare.length

  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${artId}`)
  const kulturNodes = nodes.filter(
    n => n.parentId === `art${artId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    n => n.id === `art${artId}Kultur${kulturId}`,
  )

  // only return if parent exists
  if (!nodes.map(n => n.id).includes(`art${artId}Kultur${kulturId}`)) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Inventare',
      id: `art${artId}Kultur${kulturId}InventarFolder`,
      label: `Inventare (${nr})`,
      url: ['Arten', artId, 'Kulturen', kulturId, 'Inventare'],
      sort: [1, artIndex, 1, kulturIndex, 5],
      hasChildren: true,
    },
  ]
}
