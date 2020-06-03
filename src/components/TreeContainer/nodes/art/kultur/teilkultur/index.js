import findIndex from 'lodash/findIndex'

export default ({ nodes, store, url }) => {
  if (!store.tree.showArt) return []
  const artId = url[1]
  const kulturId = url[3]
  const teilkulturen = store.teilkultursFiltered.filter(
    (t) => t.kultur_id === kulturId,
  )

  const artNodes = nodes.filter((n) => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, (n) => n.id === `art${artId}`)
  const kulturNodes = nodes.filter(
    (n) => n.parentId === `art${artId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    (n) => n.id === `art${artId}Kultur${kulturId}`,
  )

  return (
    teilkulturen
      // only show if parent node exists
      .filter(() =>
        nodes
          .map((n) => n.id)
          .includes(`art${artId}Kultur${kulturId}TeilkulturFolder`),
      )
      .map((el) => {
        const label = el.name || '(kein Name)'

        return {
          nodeType: 'table',
          menuTitle: 'Teilkultur',
          table: 'teilkultur',
          id: `art${artId}Kultur${kulturId}Teilkultur${el.id}`,
          parentId: `art${artId}Kultur${kulturId}TeilkulturFolder`,
          label,
          url: ['Arten', artId, 'Kulturen', kulturId, 'Teilkulturen', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [1, artIndex, 2, kulturIndex, 1, index]
        return el
      })
  )
}
