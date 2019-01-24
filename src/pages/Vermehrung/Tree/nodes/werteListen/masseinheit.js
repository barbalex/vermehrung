// @flow
import get from 'lodash/get'

import compareLabel from '../compareLabel'
import allParentNodesExist from '../../allParentNodesExist'

export default ({ nodes: nodesPassed, data }) => {
  const werte = get(data, 'hasura.masseinheit_werte', [])

  const nodes = werte
    .map(el => ({
      nodeType: 'table',
      menuType: 'masseinheit_werte',
      filterTable: 'masseinheit_werte',
      id: el.id,
      parentId: 'masseinheitenFolder',
      label: get(el, 'wert', '(kein Wert)'),
      url: ['Werte-Listen', 'Masseinheiten', el.id],
      hasChildren: false,
    }))
    .filter(n => allParentNodesExist(nodesPassed, n))
    // sort by label
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [6, 1, index]
      return el
    })

  return nodes
}
