const gartenKulturAnlieferungFolder = ({ store }) => {
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

    const anlieferungen = store.lieferungsFiltered.filter(
      (t) => t.nach_kultur_id === kulturId,
    )
    const nr =
      !initialDataQueried && !anlieferungen.length
        ? '...'
        : anlieferungen.length

    return {
      nodeType: 'folder',
      menuTitle: 'An-Lieferungen',
      id: `${gartenId}${kulturId}AnLieferungFolder`,
      label: `An-Lieferungen (${nr})`,
      url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'An-Lieferungen'],
      sort: [4, gartenIndex, 1, kulturIndex, 3],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}

export default gartenKulturAnlieferungFolder
