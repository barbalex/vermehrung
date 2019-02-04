import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ data, loading, url, nodes }) => {
  const sammlungId = url[1]

  const sammlungen = get(data, 'sammlung', [])
  const sammlung = sammlungen.find(p => p.id === sammlungId)
  const herkunft = get(sammlung, 'herkunftByherkunftId')
  const nr = loading && !herkunft ? '...' : herkunft ? 1 : 0

  const sammlungNodes = nodes.filter(n => n.parentId === 'sammlungFolder')
  const sammlungIndex = findIndex(
    sammlungNodes,
    n => n.id === `sammlung${sammlungId}`,
  )

  // only return if parent exists
  if (!nodes.map(n => n.id).includes(`sammlung${sammlungId}`)) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'sammlungHerkunftFolder',
      id: `sammlung${sammlungId}HerkunftFolder`,
      label: `Herkünfte (${nr})`,
      url: ['Sammlungen', sammlungId, 'Herkuenfte'],
      sort: [6, sammlungIndex, 1],
      hasChildren: true,
    },
  ]
}
