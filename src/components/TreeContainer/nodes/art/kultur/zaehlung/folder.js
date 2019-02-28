import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

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
  const zaehlungen = filterNodes({
    rows: get(kultur, 'zaehlungsBykulturId', []),
    filter: store.filter,
    table: 'zaehlung',
  })
  const nr = loading && !zaehlungen.length ? '...' : zaehlungen.length

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
      menuTitle: 'Zählungen',
      id: `art${artId}Kultur${kulturId}ZaehlungFolder`,
      label: `Zählungen (${nr})`,
      url: ['Arten', artId, 'Kulturen', kulturId, 'Zaehlungen'],
      sort: [1, artIndex, 1, kulturIndex, 1],
      hasChildren: true,
    },
  ]
}
