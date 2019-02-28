import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import filterNodes from '../../../../../../../utils/filterNodes'

export default ({ url, nodes, data, loading, store }) => {
  const sammlungId = url[1]
  const lieferungId = url[3]
  const kulturId = url[5]

  const sammlungen = filterNodes({
    rows: get(data, 'sammlung', []),
    filter: store.filter,
    table: 'sammlung',
  })
  const sammlung = sammlungen.find(p => p.id === sammlungId)
  const lieferungen = get(sammlung, 'lieferungsByvonSammlungId', [])
  const lieferung = lieferungen.find(p => p.id === lieferungId)
  const kulturen = filterNodes({
    rows: [get(lieferung, 'kulturBynachKulturId', [])],
    filter: store.filter,
    table: 'kultur',
  })
  const auslieferungen = filterNodes({
    rows:
      kulturen.length === 0
        ? []
        : get(kulturen[0], 'lieferungsByvonKulturId', []),
    filter: store.filter,
    table: 'lieferung',
  })
  const nr = loading && !auslieferungen.length ? '...' : auslieferungen.length

  const sammlungNodes = nodes.filter(n => n.parentId === 'sammlungFolder')
  const sammlungIndex = findIndex(
    sammlungNodes,
    n => n.id === `sammlung${sammlungId}`,
  )
  const lieferungNodes = nodes.filter(
    n => n.parentId === `sammlung${sammlungId}LieferungFolder`,
  )
  const lieferungIndex = findIndex(
    lieferungNodes,
    n => n.id === `sammlung${sammlungId}Lieferung${lieferungId}`,
  )
  const kulturNodes = nodes.filter(
    n =>
      n.parentId === `sammlung${sammlungId}Lieferung${lieferungId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    n =>
      n.id === `sammlung${sammlungId}Lieferung${lieferungId}Kultur${kulturId}`,
  )

  // only return if parent exists
  if (
    !nodes
      .map(n => n.id)
      .includes(`sammlung${sammlungId}Lieferung${lieferungId}Kultur${kulturId}`)
  )
    return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Aus-Lieferungen',
      id: `sammlung${sammlungId}Lieferung${lieferungId}Kultur${kulturId}AusLieferungFolder`,
      label: `Aus-Lieferungen (${nr})`,
      url: [
        'Sammlungen',
        sammlungId,
        'Aus-Lieferungen',
        lieferungId,
        'Kulturen',
        kulturId,
        'Aus-Lieferungen',
      ],
      sort: [6, sammlungIndex, 3, lieferungIndex, 1, kulturIndex, 3],
      hasChildren: true,
    },
  ]
}
