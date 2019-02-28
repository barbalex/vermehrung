import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import filterNodes from '../../../../../../utils/filterNodes'

export default ({ url, nodes, data, loading, store }) => {
  const artId = url[1]
  const sammlungId = url[3]

  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${artId}`)
  const sammlungNodes = nodes.filter(
    n => n.parentId === `art${artId}SammlungFolder`,
  )
  const sammlungIndex = findIndex(
    sammlungNodes,
    n => n.id === `art${artId}Sammlung${sammlungId}`,
  )

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
  const sammlung = sammlungen.find(s => s.id === sammlungId)
  const lieferungen = filterNodes({
    rows: get(sammlung, 'lieferungsByvonSammlungId', []),
    filter: store.filter,
    table: 'lieferung',
  })
  const nr = loading && !lieferungen.length ? '...' : lieferungen.length

  // only return if parent exists
  if (!nodes.map(n => n.id).includes(`art${artId}Sammlung${sammlungId}`))
    return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Lieferungen',
      id: `art${artId}Sammlung${sammlungId}LieferungFolder`,
      label: `Aus-Lieferungen (${nr})`,
      url: ['Arten', artId, 'Sammlungen', sammlungId, 'Aus-Lieferungen'],
      sort: [1, artIndex, 2, sammlungIndex, 1],
      hasChildren: true,
    },
  ]
}
