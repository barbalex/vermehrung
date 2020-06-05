export default ({ store }) => {
  const {
    showSammlung,
    visibleOpenNodes,
    loading,
    sammlung: sammlungNodes,
  } = store.tree
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
    const nr = loading && !herkunft ? '...' : herkunft ? 1 : 0

    return [
      {
        nodeType: 'folder_no_menu',
        menuTitle: 'Herkünfte',
        id: `sammlung${sammlungId}HerkunftFolder`,
        label: `Herkünfte (${nr})`,
        url: ['Sammlungen', sammlungId, 'Herkuenfte'],
        sort: [3, sammlungIndex, 1],
        hasChildren: true,
      },
    ]
  })
}
