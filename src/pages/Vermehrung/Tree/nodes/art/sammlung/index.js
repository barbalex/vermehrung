import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../compareLabel'
import allParentNodesExist from '../../../allParentNodesExist'

export default ({ nodes: nodesPassed, data, url }) => {
  const arten = get(data, 'hasura.ae_art', [])
  const art = arten.find(a => a.id === url[1])
  const sammlungen = get(art, 'ae_art_art.sammlungsByartId', [])
  const artNodes = nodesPassed.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${url[1]}`)

  const nodes = sammlungen
    .map(el => ({
      nodeType: 'table',
      menuType: 'sammlung',
      filterTable: 'sammlung',
      id: `sammlung${el.id}`,
      parentId: `art${url[1]}SammlungenFolder`,
      urlLabel: el.id,
      label: `${get(el, 'datum', '(kein Datum)')}: ${get(
        el,
        'herkunftByherkunftId.nr',
        '(keine Nr.)',
      )}`,
      url: ['Arten', url[1], 'Sammlungen', el.id],
      hasChildren: true,
    }))
    .filter(n => allParentNodesExist(nodesPassed, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [1, artIndex, 2, index]
      return el
    })

  return nodes
}
