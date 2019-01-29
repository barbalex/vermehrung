import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ data, loading, url, nodes }) => {
  const sammlungId = url[1]
  const sammlungen = get(data, 'sammlung', [])
  const sammlung = sammlungen.find(p => p.id === sammlungId)
  const lieferungen = get(sammlung, 'lieferungsByvonSammlungId', [])
  const nr = loading && !lieferungen.length ? '...' : lieferungen.length

  const sammlungNodes = nodes.filter(n => n.parentId === 'sammlungFolder')
  const sammlungIndex = findIndex(
    sammlungNodes,
    n => n.id === `sammlung${sammlungId}`,
  )

  return [
    {
      nodeType: 'folder',
      menuType: 'sammlungLieferungFolder',
      id: `sammlung${sammlungId}LieferungFolder`,
      label: `Lieferungen (${nr})`,
      url: ['Sammlungen', sammlungId, 'Lieferungen'],
      sort: [6, sammlungIndex, 3],
      hasChildren: true,
    },
  ]
}
