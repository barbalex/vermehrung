import isEqual from 'lodash/isEqual'
import findIndex from 'lodash/findIndex'

export default ({ nodes, store, url }) => {
  const { showArt, openNodes } = store.tree
  if (!showArt) return []
  const artId = url[1]
  const kulturen = store.kultursFiltered.filter((k) => k.art_id === artId)
  const artNodes = nodes.filter((n) => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, (n) => n.id === `art${artId}`) || 0

  return (
    kulturen
      // only show if parent node exists
      .filter(() =>
        openNodes.some((node) => isEqual(['Arten', artId, 'Kulturen'], node)),
      )
      .map((el) => {
        const garten =
          el?.garten?.name ?? `(${el?.garten?.person?.name ?? 'kein Name'})`
        const herkunft = el?.herkunft?.nr ?? '(Herkunft ohne Nr)'
        const label = `von: ${herkunft}, in: ${garten}`

        return {
          nodeType: 'table',
          menuTitle: 'Kultur',
          table: 'kultur',
          id: `art${artId}Kultur${el.id}`,
          parentId: `art${artId}KulturFolder`,
          label,
          url: ['Arten', artId, 'Kulturen', el.id],
          hasChildren: true,
        }
      })
      .map((el, index) => {
        el.sort = [1, artIndex, 2, index]
        return el
      })
  )
}
