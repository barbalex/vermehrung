const sammlungAuslieferungFolder = ({ store }) => {
  const { initialDataQueried } = store
  const { showSammlung, visibleOpenNodes, sammlung: sammlungNodes } = store.tree
  if (!showSammlung) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) => node.length === 2 && node[0] === 'Sammlungen',
  )

  return parentNodes.map((node) => {
    const sammlungId = node[1]
    const sammlungIndex = sammlungNodes.findIndex((a) => a.id === sammlungId)

    const lieferungen = store.lieferungsFiltered.filter(
      (l) => l.von_sammlung_id === sammlungId,
    )
    const nr =
      !initialDataQueried && !lieferungen.length ? '...' : lieferungen.length

    return {
      nodeType: 'folder',
      menuTitle: 'Aus-Lieferungen',
      id: `${sammlungId}LieferungFolder`,
      label: `Aus-Lieferungen (${nr})`,
      url: ['Sammlungen', sammlungId, 'Aus-Lieferungen'],
      sort: [3, sammlungIndex, 3],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}

export default sammlungAuslieferungFolder
