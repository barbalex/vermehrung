// @flow
import get from 'lodash/get'

import compareLabel from '../compareLabel'
import allParentNodesExist from '../../allParentNodesExist'

export default ({ nodes: nodesPassed, data }) => {
  const werte = get(data, 'hasura.lieferung_typ_werte', [])

  const nodes = werte
    .map(el => ({
      nodeType: 'table',
      menuType: 'lieferung_typ_werte',
      filterTable: 'lieferung_typ_werte',
      id: el.id,
      parentId: 'lieferungTypFolder',
      label: get(el, 'wert', '(kein Wert)'),
      url: ['Werte-Listen', 'Lieferung-Typ', el.id],
      hasChildren: false,
    }))
    .filter(n => allParentNodesExist(nodesPassed, n))
    // sort by label
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [6, 3, index]
      return el
    })

  return nodes
}
