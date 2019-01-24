// @flow
import get from 'lodash/get'

import compareLabel from '../compareLabel'
import allParentNodesExist from '../../allParentNodesExist'

export default ({ nodes: nodesPassed, data }) => {
  const personen = get(data, 'hasura.person', [])

  const nodes = personen
    .map(el => ({
      nodeType: 'table',
      menuType: 'person',
      filterTable: 'person',
      id: el.id,
      parentId: 5,
      label: get(el, 'name', '(kein Name)'),
      url: ['Personen', el.id],
      hasChildren: true,
    }))
    .filter(n => allParentNodesExist(nodesPassed, n))
    // sort by label
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [5, index]
      return el
    })

  return nodes
}
