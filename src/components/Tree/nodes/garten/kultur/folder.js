const gartenKulturFolder = ({ store }) => {
  const { initialDataQueried } = store
  const { showGarten, visibleOpenNodes, garten } = store.tree
  if (!showGarten) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) => node.length === 2 && node[0] === 'Gaerten',
  )

  return parentNodes.map((node) => {
    const gartenId = node[1]
    const gartenIndex = garten.findIndex((a) => a.id === gartenId)
    const kulturen = store.kultursFiltered.filter(
      (k) => k.garten_id === gartenId,
    )
    const nr = !initialDataQueried && !kulturen.length ? '...' : kulturen.length

    return {
      nodeType: 'folder',
      menuTitle: 'Kulturen',
      id: `${gartenId}KulturFolder`,
      label: `Kulturen (${nr})`,
      url: ['Gaerten', gartenId, 'Kulturen'],
      sort: [4, gartenIndex, 1],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}

export default gartenKulturFolder
