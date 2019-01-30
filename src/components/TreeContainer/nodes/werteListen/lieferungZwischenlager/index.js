import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

import allParentNodesExist from '../../../allParentNodesExist'

export default ({ nodes, data }) => {
  const werte = sortBy(get(data, 'lieferung_zwischenlager_werte', []), [
    'sort',
    'wert',
  ])

  return werte
    .map(el => ({
      nodeType: 'table',
      menuType: 'lieferung_zwischenlager_werte',
      filterTable: 'lieferung_zwischenlager_werte',
      id: `lieferungZwischenlager${el.id}`,
      parentId: 'lieferungZwischenlagerFolder',
      label: get(el, 'wert', '(kein Wert)'),
      url: ['Werte-Listen', 'Lieferung-Zwischenlager', el.id],
      hasChildren: false,
    }))
    .filter(n => allParentNodesExist(nodes, n))
    .map((el, index) => {
      el.sort = [8, 5, index]
      return el
    })
}
