import findIndex from 'lodash/findIndex'

export default ({ url, nodes, store, loading }) => {
  if (!store.tree.showArt) return []
  const artId = url[1]
  const sammlungId = url[3]

  const artNodes = nodes.filter((n) => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, (n) => n.id === `art${artId}`)
  const sammlungNodes = nodes.filter(
    (n) => n.parentId === `art${artId}SammlungFolder`,
  )
  const sammlungIndex = findIndex(
    sammlungNodes,
    (n) => n.id === `art${artId}Sammlung${sammlungId}`,
  )

  const lieferungen = store.lieferungsFiltered.filter(
    (l) => l.von_sammlung_id === sammlungId,
  )
  const nr = loading && !lieferungen.length ? '...' : lieferungen.length

  // only return if parent exists
  if (!nodes.map((n) => n.id).includes(`art${artId}Sammlung${sammlungId}`))
    return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Lieferungen',
      id: `art${artId}Sammlung${sammlungId}LieferungFolder`,
      label: `Aus-Lieferungen (${nr})`,
      url: ['Arten', artId, 'Sammlungen', sammlungId, 'Aus-Lieferungen'],
      sort: [1, artIndex, 1, sammlungIndex, 1],
      hasChildren: true,
      childrenCount: nr,
    },
  ]
}
