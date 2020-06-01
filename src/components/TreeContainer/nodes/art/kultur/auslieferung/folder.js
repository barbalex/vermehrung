import findIndex from 'lodash/findIndex'

export default ({ url, nodes, store, loading }) => {
  const artId = url[1]
  const kulturId = url[3]
  const auslieferungen = store.lieferungsFiltered.filter(
    (e) => e.von_kultur_id === kulturId,
  )
  const nr = loading && !auslieferungen.length ? '...' : auslieferungen.length

  const artNodes = nodes.filter((n) => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, (n) => n.id === `art${artId}`)
  const kulturNodes = nodes.filter(
    (n) => n.parentId === `art${artId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    (n) => n.id === `art${artId}Kultur${kulturId}`,
  )

  // only return if parent exists
  if (!nodes.map((n) => n.id).includes(`art${artId}Kultur${kulturId}`))
    return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Aus-Lieferungen',
      id: `art${artId}Kultur${kulturId}AusLieferungFolder`,
      label: `Aus-Lieferungen (${nr})`,
      url: ['Arten', artId, 'Kulturen', kulturId, 'Aus-Lieferungen'],
      sort: [1, artIndex, 2, kulturIndex, 4],
      hasChildren: true,
    },
  ]
}
