import findIndex from 'lodash/findIndex'

export default ({ url, nodes, store, loading }) => {
  const sammlungId = url[1]
  const lieferungId = url[3]
  const kulturId = url[5]

  const auslieferungen = store.lieferungFiltered.filter(
    (z) => z.von_kultur_id === kulturId,
  )
  const nr = loading && !auslieferungen.length ? '...' : auslieferungen.length

  const sammlungNodes = nodes.filter((n) => n.parentId === 'sammlungFolder')
  const sammlungIndex = findIndex(
    sammlungNodes,
    (n) => n.id === `sammlung${sammlungId}`,
  )
  const lieferungNodes = nodes.filter(
    (n) => n.parentId === `sammlung${sammlungId}LieferungFolder`,
  )
  const lieferungIndex = findIndex(
    lieferungNodes,
    (n) => n.id === `sammlung${sammlungId}Lieferung${lieferungId}`,
  )
  const kulturNodes = nodes.filter(
    (n) =>
      n.parentId === `sammlung${sammlungId}Lieferung${lieferungId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    (n) =>
      n.id === `sammlung${sammlungId}Lieferung${lieferungId}Kultur${kulturId}`,
  )

  // only return if parent exists
  if (
    !nodes
      .map((n) => n.id)
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
      sort: [3, sammlungIndex, 3, lieferungIndex, 1, kulturIndex, 3],
      hasChildren: true,
    },
  ]
}
