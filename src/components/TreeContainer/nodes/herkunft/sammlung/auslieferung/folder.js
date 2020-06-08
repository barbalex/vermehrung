export default ({ store }) => {
  const {
    showHerkunft,
    visibleOpenNodes,
    loading,
    herkunft,
    herkunftSammlung,
  } = store.tree
  if (!showHerkunft) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 4 && node[0] === 'Herkuenfte' && node[2] === 'Sammlungen',
  )

  return parentNodes.map((node) => {
    const herkunftId = node[1]
    const herkunftIndex = herkunft.findIndex((a) => a.id === herkunftId)
    const sammlungId = node[3]
    const sammlungIndex = herkunftSammlung.findIndex((a) => a.id === sammlungId)

    const lieferungen = store.lieferungsFiltered.filter(
      (l) => l.von_sammlung_id === sammlungId,
    )
    const nr = loading && !lieferungen.length ? '...' : lieferungen.length

    return {
      nodeType: 'folder',
      menuTitle: 'Aus-Lieferungen',
      id: `${herkunftId}${sammlungId}SammlungLieferungFolder`,
      label: `Aus-Lieferungen (${nr})`,
      url: [
        'Herkuenfte',
        herkunftId,
        'Sammlungen',
        sammlungId,
        'Aus-Lieferungen',
      ],
      sort: [2, herkunftIndex, 2, sammlungIndex, 1],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}
