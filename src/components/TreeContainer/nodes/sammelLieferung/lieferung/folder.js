import findIndex from 'lodash/findIndex'

export default ({ url, nodes, store, loading }) => {
  const sammelLieferungId = url[1]

  const lieferungen = store.lieferungsFiltered.filter(
    (l) => l.sammel_lieferung_id === sammelLieferungId,
  )
  const nr = loading && !lieferungen.length ? '...' : lieferungen.length

  const sammelLieferungNodes = nodes.filter(
    (n) => n.parentId === `sammelLieferungFolder`,
  )
  const sammelLieferungIndex = findIndex(
    sammelLieferungNodes,
    (n) => n.id === `sammelLieferung${sammelLieferungId}`,
  )

  // only return if parent exists
  if (!nodes.map((n) => n.id).includes(`sammelLieferung${sammelLieferungId}`))
    return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Lieferungen',
      id: `sammelLieferung${sammelLieferungId}LieferungFolder`,
      label: `Lieferungen (${nr})`,
      url: ['Sammel-Lieferungen', sammelLieferungId, 'Lieferungen'],
      sort: [9, sammelLieferungIndex, 3],
      hasChildren: true,
      childrenCount: nr,
    },
  ]
}
