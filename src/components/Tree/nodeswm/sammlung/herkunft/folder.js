const sammlungHerkunftFolder = ({ store }) => {
  const { initialDataQueried } = store
  const { showSammlung, visibleOpenNodes, sammlung: sammlungNodes } = store.tree
  if (!showSammlung) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) => node.length === 2 && node[0] === 'Sammlungen',
  )

  return parentNodes.map((node) => {
    const sammlungId = node[1]
    const sammlungIndex = sammlungNodes.findIndex((a) => a.id === sammlungId)

    const sammlung = store.sammlungs.get(sammlungId) || {}
    const herkunft = store.herkunftsFiltered.find(
      (h) => h.id === sammlung.herkunft_id,
    )
    const nr = !initialDataQueried && !herkunft ? '...' : herkunft ? 1 : 0

    return {
      nodeType: 'folder_no_menu',
      menuTitle: 'Herkünfte',
      id: `${sammlungId}HerkunftFolder`,
      label: `Herkünfte (${nr})`,
      url: ['Sammlungen', sammlungId, 'Herkuenfte'],
      sort: [3, sammlungIndex, 1],
      hasChildren: true,
    }
  })
}

export default sammlungHerkunftFolder
