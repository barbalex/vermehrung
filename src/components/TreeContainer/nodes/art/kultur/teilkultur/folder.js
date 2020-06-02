import findIndex from 'lodash/findIndex'

export default ({ url, nodes, store, loading }) => {
  const artId = url[1]
  const kulturId = url[3]
  const kultur = [...store.kulturs.values()].find((k) => k.id === kulturId)
  const tk = kultur?.kultur_option?.tk
  if (!tk) return []
  const teilkulturen = store.teilkultursFiltered.filter(
    (t) => t.kultur_id === kulturId,
  )
  const nr = loading && !teilkulturen.length ? '...' : teilkulturen.length

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
  if (!nodes.map((n) => n.id).includes(`art${artId}Kultur${kulturId}`)) {
    return []
  }

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Teilkulturen',
      id: `art${artId}Kultur${kulturId}TeilkulturFolder`,
      label: `Teilkulturen (${nr})`,
      url: ['Arten', artId, 'Kulturen', kulturId, 'Teilkulturen'],
      sort: [1, artIndex, 2, kulturIndex, 1],
      hasChildren: true,
      childrenCount: nr,
    },
  ]
}
