import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

import allParentNodesExist from '../../../allParentNodesExist'

export default ({ nodes, data }) => {
  const werte = sortBy(get(data, 'zaehleinheit_werte', []), ['sort', 'wert'])

  return werte
    .map(el => ({
      nodeType: 'table',
      menuType: 'zaehleinheit_werte',
      filterTable: 'zaehleinheit_werte',
      id: `zaehleinheit${el.id}`,
      parentId: 'zaehleinheitenFolder',
      label: get(el, 'wert', '(kein Wert)'),
      url: ['Werte-Listen', 'Zaehleinheiten', el.id],
      hasChildren: false,
    }))
    .filter(n => allParentNodesExist(nodes, n))
    .map((el, index) => {
      el.sort = [8, 2, index]
      return el
    })
}
