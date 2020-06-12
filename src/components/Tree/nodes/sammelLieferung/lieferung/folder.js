export default ({ store }) => {
  const { initialDataQueried } = store
  const { showSammelLieferung, visibleOpenNodes, sammelLieferung } = store.tree
  if (!showSammelLieferung) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) => node.length === 2 && node[0] === 'Sammel-Lieferungen',
  )

  return parentNodes.map((node) => {
    const sammelLieferungId = node[1]
    const sammelLieferungIndex = sammelLieferung.findIndex(
      (a) => a.id === sammelLieferungId,
    )

    const lieferungen = store.lieferungsFiltered.filter(
      (l) => l.sammel_lieferung_id === sammelLieferungId,
    )
    const nr =
      !initialDataQueried && !lieferungen.length ? '...' : lieferungen.length

    return {
      nodeType: 'folder',
      menuTitle: 'Lieferungen',
      id: `${sammelLieferungId}LieferungFolder`,
      label: `Lieferungen (${nr})`,
      url: ['Sammel-Lieferungen', sammelLieferungId, 'Lieferungen'],
      sort: [9, sammelLieferungIndex, 3],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}
