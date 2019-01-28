import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../compareLabel'
import allParentNodesExist from '../../../allParentNodesExist'

export default ({ nodes, data, url }) => {
  const personId = url[1]
  const personen = get(data, 'person', [])
  const person = personen.find(p => p.id === personId)
  const gaerten = get(person, 'gartensBypersonId', [])

  const personNodes = nodes.filter(n => n.parentId === 'personFolder')
  const personIndex = findIndex(personNodes, n => n.id === `person${personId}`)

  return gaerten
    .map(el => ({
      nodeType: 'table',
      menuType: 'personGarten',
      filterTable: 'garten',
      id: `person${personId}garten${el.id}`,
      parentId: `person${personId}gartenFolder`,
      label: el.id,
      url: ['Personen', personId, 'Gaerten', el.id],
      hasChildren: true,
    }))
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [5, personIndex, 1, index]
      return el
    })
}
