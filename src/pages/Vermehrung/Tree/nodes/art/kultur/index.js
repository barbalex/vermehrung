import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../compareLabel'
import allParentNodesExist from '../../../allParentNodesExist'

export default ({ nodes: nodesPassed, data, url }) => {
  const arten = get(data, 'hasura.ae_art', [])
  const art = arten.find(a => a.id === url[1])
  const kulturen = get(art, 'ae_art_art.kultursByartId', [])
  const artNodes = nodesPassed.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${url[1]}`)

  const nodes = kulturen
    .map(el => ({
      nodeType: 'table',
      menuType: 'kultur',
      filterTable: 'kultur',
      id: `kultur${el.id}`,
      parentId: `art${url[1]}KulturenFolder`,
      urlLabel: el.id,
      label: get(el, 'gartenBygartenId.personBypersonId.name', '(kein Name)'),
      url: ['Arten', url[1], 'Kulturen', el.id],
      hasChildren: true,
    }))
    .filter(n => allParentNodesExist(nodesPassed, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [1, artIndex, 1, index]
      return el
    })

  return nodes
}
