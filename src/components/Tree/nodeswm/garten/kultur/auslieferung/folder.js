const gartenKulturAuslieferungFolder = ({ store }) => {
  const { initialDataQueried } = store
  const { showGarten, visibleOpenNodes, garten, gartenKultur } = store.tree
  if (!showGarten) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 4 && node[0] === 'Gaerten' && node[2] === 'Kulturen',
  )

  return parentNodes.map((node) => {
    const gartenId = node[1]
    const gartenIndex = garten.findIndex((a) => a.id === gartenId)
    const kulturId = node[3]
    const kulturIndex = gartenKultur.findIndex(
      (a) => a.id === `${gartenId}${kulturId}`,
    )

    const auslieferungen = store.lieferungsFiltered.filter(
      (t) => t.von_kultur_id === kulturId,
    )
    const nr =
      !initialDataQueried && !auslieferungen.length
        ? '...'
        : auslieferungen.length

    return {
      nodeType: 'folder',
      menuTitle: 'Aus-Lieferungen',
      id: `${gartenId}${kulturId}AusLieferungFolder`,
      label: `Aus-Lieferungen (${nr})`,
      url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Aus-Lieferungen'],
      sort: [4, gartenIndex, 1, kulturIndex, 4],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}

export default gartenKulturAuslieferungFolder