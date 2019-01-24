import get from 'lodash/get'

import compareLabel from '../compareLabel'
import allParentNodesExist from '../../allParentNodesExist'

export default ({ nodes, data }) => {
  const personen = get(data, 'hasura.person', [])

  return personen
    .map(el => ({
      nodeType: 'table',
      menuType: 'person',
      filterTable: 'person',
      id: `person${el.id}`,
      parentId: 'personFolder',
      label: get(el, 'name', '(kein Name)'),
      url: ['Personen', el.id],
      hasChildren: true,
    }))
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [5, index]
      return el
    })
}
