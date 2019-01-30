import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

import allParentNodesExist from '../../../allParentNodesExist'

export default ({ nodes, data }) => {
  const werte = sortBy(get(data, 'lieferung_status_werte', []), [
    'sort',
    'wert',
  ])

  return werte
    .map(el => ({
      nodeType: 'table',
      menuType: 'lieferung_status_werte',
      filterTable: 'lieferung_status_werte',
      id: `lieferungStatus${el.id}`,
      parentId: 'lieferungStatusFolder',
      label: get(el, 'wert', '(kein Wert)'),
      url: ['Werte-Listen', 'Lieferung-Status', el.id],
      hasChildren: false,
    }))
    .filter(n => allParentNodesExist(nodes, n))
    .map((el, index) => {
      el.sort = [8, 4, index]
      return el
    })
}
