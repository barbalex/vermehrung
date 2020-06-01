import findIndex from 'lodash/findIndex'

export default ({ url, nodes, store, loading }) => {
  const kulturId = url[1]

  const auslieferungen = store.lieferungsFiltered.filter(
    (z) => z.von_kultur_id === kulturId,
  )
  const nr = loading && !auslieferungen.length ? '...' : auslieferungen.length

  const kulturNodes = nodes.filter((n) => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(
    kulturNodes,
    (n) => n.id === `kultur${kulturId}`,
  )

  // only return if parent exists
  if (!nodes.map((n) => n.id).includes(`kultur${kulturId}`)) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Aus-Lieferungen',
      id: `kultur${kulturId}AusLieferungFolder`,
      label: `Aus-Lieferungen (${nr})`,
      url: ['Kulturen', kulturId, 'Aus-Lieferungen'],
      sort: [5, kulturIndex, 4],
      hasChildren: true,
    },
  ]
}
