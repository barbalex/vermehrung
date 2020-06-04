import { getSnapshot } from 'mobx-state-tree'
export default ({ store }) => {
  const {
    showHerkunft,
    visibleOpenNodes,
    loading,
    herkunftHerkunft,
  } = store.tree
  if (!showHerkunft) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) => node.length === 2 && node[0] === 'Herkuenfte',
  )
  console.log('nodes herkunft sammlung', {
    parentNodes,
    visibleOpenNodes,
  })

  return parentNodes.map((node) => {
    const herkunftId = node[1]
    const herkunftIndex = herkunftHerkunft.findIndex((a) => a.id === herkunftId)

    const sammlungen = store.sammlungsFiltered.filter(
      (s) => s.herkunft_id === herkunftId,
    )
    const nr = loading && !sammlungen.length ? '...' : sammlungen.length
    console.log('nodes herkunft sammlung', {
      herkunftId,
      herkunftIndex,
      sammlungen,
    })

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
