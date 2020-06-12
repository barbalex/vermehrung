export default ({ store }) => {
  const { showHerkunft, visibleOpenNodes, loading, herkunft } = store.tree
  if (!showHerkunft) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) => node.length === 2 && node[0] === 'Herkuenfte',
  )

  return parentNodes.map((node) => {
    const herkunftId = node[1]
    const herkunftIndex = herkunft.findIndex((a) => a.id === herkunftId)

    const sammlungen = store.sammlungsFiltered.filter(
      (s) => s.herkunft_id === herkunftId,
    )
    const nr = loading && !sammlungen.length ? '...' : sammlungen.length

    return {
      nodeType: 'folder',
      menuTitle: 'Sammlungen',
      id: `${herkunftId}SammlungFolder`,
      label: `Sammlungen (${nr})`,
      url: ['Herkuenfte', herkunftId, 'Sammlungen'],
      sort: [2, herkunftIndex, 2],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}
