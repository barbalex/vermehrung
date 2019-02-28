import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../compareLabel'

export default ({ nodes, data, url, store }) => {
  const artId = url[1]
  const arten = get(data, 'art', [])
  const art = arten.find(a => a.id === artId)
  const kulturen = get(art, 'kultursByartId', [])
  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${artId}`) || 0

  return (
    kulturen
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes(`art${artId}KulturFolder`))
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'Kultur',
        table: 'kultur',
        id: `art${artId}Kultur${el.id}`,
        parentId: `art${artId}KulturFolder`,
        label: get(el, 'gartenBygartenId.personBypersonId.name', '(kein Name)'),
        url: ['Arten', artId, 'Kulturen', el.id],
        hasChildren: true,
      }))
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [1, artIndex, 1, index]
        return el
      })
  )
}
