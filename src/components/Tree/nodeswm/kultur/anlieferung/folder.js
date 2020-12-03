const kulturAnlieferungFolder = ({ store }) => {
  const { initialDataQueried } = store
  const { showKultur, visibleOpenNodes, kultur } = store.tree
  if (!showKultur) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) => node.length === 2 && node[0] === 'Kulturen',
  )

  return parentNodes.map((node) => {
    const kulturId = node[1]
    const kulturIndex = kultur.findIndex((a) => a.id === kulturId)

    const anlieferungen = store.lieferungsFiltered.filter(
      (z) => z.nach_kultur_id === kulturId,
    )
    const nr =
      !initialDataQueried && !anlieferungen.length
        ? '...'
        : anlieferungen.length

    return {
      nodeType: 'folder',
      menuTitle: 'An-Lieferungen',
      id: `${kulturId}AnLieferungFolder`,
      label: `An-Lieferungen (${nr})`,
      url: ['Kulturen', kulturId, 'An-Lieferungen'],
      sort: [5, kulturIndex, 3],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}

export default kulturAnlieferungFolder
