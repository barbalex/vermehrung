const kulturAuslieferungFolder = ({ store }) => {
  const { initialDataQueried } = store
  const { showKultur, visibleOpenNodes, kultur } = store.tree
  if (!showKultur) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) => node.length === 2 && node[0] === 'Kulturen',
  )

  return parentNodes.map((node) => {
    const kulturId = node[1]
    const kulturIndex = kultur.findIndex((a) => a.id === kulturId)

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
      id: `${kulturId}AusLieferungFolder`,
      label: `Aus-Lieferungen (${nr})`,
      url: ['Kulturen', kulturId, 'Aus-Lieferungen'],
      sort: [5, kulturIndex, 4],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}

export default kulturAuslieferungFolder
