import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import filterNodes from '../../../../../../utils/filterNodes'

export default ({ url, nodes, data, loading, store }) => {
  const sammlungId = url[1]
  const lieferungId = url[3]

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
  const lieferung = lieferungen.find(p => p.id === lieferungId)
  const kulturen = filterNodes({
    rows: [get(lieferung, 'kulturBynachKulturId', [])],
    filter: store.filter,
    table: 'kultur',
  })
  const nr = loading && !kulturen.length ? '...' : kulturen.length

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

  // only return if parent exists
  if (
    !nodes
      .map(n => n.id)
      .includes(`sammlung${sammlungId}Lieferung${lieferungId}`)
  )
    return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Kulturen',
      id: `sammlung${sammlungId}Lieferung${lieferungId}KulturFolder`,
      label: `Kulturen (${nr})`,
      url: [
        'Sammlungen',
        sammlungId,
        'Aus-Lieferungen',
        lieferungId,
        'Kulturen',
      ],
      sort: [6, sammlungIndex, 3, lieferungIndex, 1],
      hasChildren: true,
    },
  ]
}
