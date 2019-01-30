import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const sammlungId = url[1]
  const lieferungId = url[3]
  const sammlungen = get(data, 'sammlung', [])
  const sammlung = sammlungen.find(p => p.id === sammlungId)
  const lieferungen = get(sammlung, 'lieferungsByvonSammlungId', [])
  const lieferung = lieferungen.find(p => p.id === lieferungId)
  const kulturen = get(lieferung, 'kulturBynachKulturId', [])
  const nr = loading && !kulturen ? '...' : kulturen ? 1 : 0

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

  return [
    {
      nodeType: 'folder',
      menuType: 'sammlungLieferungKulturFolder',
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
