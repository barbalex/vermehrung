const sammlungAuslieferungKulturAuslieferungFolder = ({ store }) => {
  const { initialDataQueried } = store
  const {
    showSammlung,
    visibleOpenNodes,
    sammlung: sammlungNodes,
    sammlungAusLieferung: lieferungNodes,
    sammlungAusLieferungKultur: kulturNodes,
  } = store.tree
  if (!showSammlung) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 6 &&
      node[0] === 'Sammlungen' &&
      node[2] === 'Aus-Lieferungen' &&
      node[4] === 'Kulturen',
  )

  return parentNodes.map((node) => {
    const sammlungId = node[1]
    const sammlungIndex = sammlungNodes.findIndex((a) => a.id === sammlungId)
    const lieferungId = node[3]
    const lieferungIndex = lieferungNodes.findIndex(
      (a) => a.id === `${sammlungId}${lieferungId}`,
    )
    const kulturId = node[5]
    const kulturIndex = kulturNodes.findIndex(
      (a) => a.id === `${sammlungId}${lieferungId}${kulturId}`,
    )

    const auslieferungen = store.lieferungsFiltered.filter(
      (z) => z.von_kultur_id === kulturId,
    )
    const nr =
      !initialDataQueried && !auslieferungen.length
        ? '...'
        : auslieferungen.length

    return {
      nodeType: 'folder',
      menuTitle: 'Aus-Lieferungen',
      id: `${sammlungId}${lieferungId}${kulturId}AusLieferungFolder`,
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
      sort: [3, sammlungIndex, 3, lieferungIndex, 1, kulturIndex, 4],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}

export default sammlungAuslieferungKulturAuslieferungFolder
