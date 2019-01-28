import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../compareLabel'
import allParentNodesExist from '../../../allParentNodesExist'

export default ({ nodes, data, url }) => {
  const kulturId = url[1]
  const kulturen = get(data, 'kultur', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const zaehlungen = get(kultur, 'zaehlungsBykulturId', [])

  const kulturNodes = nodes.filter(n => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  return zaehlungen
    .map(el => ({
      nodeType: 'table',
      menuType: 'zaehlung',
      filterTable: 'zaehlung',
      id: `kultur${kulturId}Zaehlung${el.id}`,
      parentId: `kultur${kulturId}ZaehlungFolder`,
      label: get(el, 'datum', '(kein Datum)'),
      url: ['Kulturen', kulturId, 'Zaehlungen', el.id],
      hasChildren: false,
    }))
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [7, kulturIndex, 1, index]
      return el
    })
}
