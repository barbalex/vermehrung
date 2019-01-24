// @flow
import get from 'lodash/get'

import compareLabel from '../compareLabel'
import allParentNodesExist from '../../allParentNodesExist'

export default ({ nodes: nodesPassed, data }) => {
  const werte = get(data, 'hasura.zaehleinheit_werte', [])

  const nodes = werte
    .map(el => ({
      nodeType: 'table',
      menuType: 'zaehleinheit_werte',
      filterTable: 'zaehleinheit_werte',
      id: el.id,
      parentId: 'zaehleinheitenFolder',
      label: get(el, 'wert', '(kein Wert)'),
      url: ['Werte-Listen', 'Zaehleinheiten', el.id],
      hasChildren: false,
    }))
    .filter(n => allParentNodesExist(nodesPassed, n))
    // sort by label
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [6, 2, index]
      return el
    })

  return nodes
}
