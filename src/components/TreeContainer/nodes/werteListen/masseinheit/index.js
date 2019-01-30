import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

import allParentNodesExist from '../../../allParentNodesExist'

export default ({ nodes, data }) => {
  const werte = sortBy(get(data, 'masseinheit_werte', []), ['sort', 'wert'])

  return werte
    .map(el => ({
      nodeType: 'table',
      menuType: 'masseinheit_werte',
      filterTable: 'masseinheit_werte',
      id: `masseinheit${el.id}`,
      parentId: 'masseinheitenFolder',
      label: get(el, 'wert', '(kein Wert)'),
      url: ['Werte-Listen', 'Masseinheiten', el.id],
      hasChildren: false,
    }))
    .filter(n => allParentNodesExist(nodes, n))
    .map((el, index) => {
      el.sort = [8, 1, index]
      return el
    })
}
