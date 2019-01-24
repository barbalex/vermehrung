// @flow
import get from 'lodash/get'

import compareLabel from '../compareLabel'
import allParentNodesExist from '../../allParentNodesExist'

export default ({ nodes: nodesPassed, data }) => {
  const werte = get(data, 'hasura.lieferung_status_werte', [])

  const nodes = werte
    .map(el => ({
      nodeType: 'table',
      menuType: 'lieferung_status_werte',
      filterTable: 'lieferung_status_werte',
      id: el.id,
      parentId: 'lieferungStatusFolder',
      urlLabel: el.id,
      label: get(el, 'wert', '(kein Wert)'),
      url: ['Werte-Listen', 'Lieferung-Status', el.id],
      hasChildren: false,
    }))
    .filter(n => allParentNodesExist(nodesPassed, n))
    // sort by label
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [6, 4, index]
      return el
    })

  return nodes
}
