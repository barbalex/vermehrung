import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ nodes, data, url }) => {
  const artId = url[1]
  const arten = get(data, 'art') || []
  const art = arten.find(a => a.id === artId)
  const kulturen = get(art, 'kulturs') || []
  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${artId}`) || 0

  return (
    kulturen
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes(`art${artId}KulturFolder`))
      .map(el => {
        const garten =
          get(el, 'garten.name') ||
          `(${get(el, 'garten.person.name') || 'kein Name'})`
        const herkunft = get(el, 'herkunft.nr') || '(Herkunft ohne Nr)'
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
