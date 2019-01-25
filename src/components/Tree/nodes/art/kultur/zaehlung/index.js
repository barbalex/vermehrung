import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../compareLabel'
import allParentNodesExist from '../../../allParentNodesExist'

export default ({ nodes, data, url }) => {
  const artId = url[1]
  const kulturId = url[3]
  const arten = get(data, 'hasura.ae_art', [])
  const art = arten.find(a => a.id === url[1])
  const kulturen = get(art, 'ae_art_art.kultursByartId', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const zaehlungen = get(kultur, '')

  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${artId}`)
  const kulturNodes = nodes.filter(
    n => n.parentId === `art${artId}KulturFolder`,
  )
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  return kulturen
    .map(el => ({
      nodeType: 'table',
      menuType: 'kultur',
      filterTable: 'kultur',
      id: `kultur${el.id}`,
      parentId: `art${url[1]}KulturFolder`,
      label: get(el, 'gartenBygartenId.personBypersonId.name', '(kein Name)'),
      url: ['Arten', url[1], 'Kulturen', el.id],
      hasChildren: true,
    }))
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [1, artIndex, 1, index]
      return el
    })
}
