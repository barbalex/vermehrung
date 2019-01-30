import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const sammlungId = url[1]
  const lieferungId = url[3]
  const kulturId = url[5]

  const sammlungen = get(data, 'sammlung', [])
  const sammlung = sammlungen.find(p => p.id === sammlungId)
  const lieferungen = get(sammlung, 'lieferungsByvonSammlungId', [])
  const lieferung = lieferungen.find(p => p.id === lieferungId)
  const kultur = get(lieferung, 'kulturBynachKulturId', [])
  const auslieferungen = get(kultur, 'lieferungsByvonKulturId', [])
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

  return [
    {
      nodeType: 'folder',
      menuType: 'sammlungLieferungKulturAusLieferungFolder',
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
