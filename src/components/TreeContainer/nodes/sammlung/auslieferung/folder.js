import findIndex from 'lodash/findIndex'

export default ({ store, loading, url, nodes }) => {
  const sammlungId = url[1]

  const lieferungen = store.lieferungsFiltered.filter(
    (l) => l.von_sammlung_id === sammlungId,
  )
  const nr = loading && !lieferungen.length ? '...' : lieferungen.length

  const sammlungNodes = nodes.filter((n) => n.parentId === 'sammlungFolder')
  const sammlungIndex = findIndex(
    sammlungNodes,
    (n) => n.id === `sammlung${sammlungId}`,
  )

  // only return if parent exists
  if (!nodes.map((n) => n.id).includes(`sammlung${sammlungId}`)) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Aus-Lieferungen',
      id: `sammlung${sammlungId}LieferungFolder`,
      label: `Aus-Lieferungen (${nr})`,
      url: ['Sammlungen', sammlungId, 'Aus-Lieferungen'],
      sort: [3, sammlungIndex, 3],
      hasChildren: true,
    },
  ]
}
