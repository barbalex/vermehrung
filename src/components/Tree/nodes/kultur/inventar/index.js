import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../compareLabel'
import allParentNodesExist from '../../../allParentNodesExist'

export default ({ nodes, data, url }) => {
  const kulturId = url[1]
  const kulturen = get(data, 'kultur', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const inventare = get(kultur, 'kulturInventarsBykulturId', [])

  const kulturNodes = nodes.filter(n => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  return inventare
    .map(el => {
      const datum = get(el, 'datum', '(kein Datum)')
      const kasten = get(el, 'kasten')
      const kastenLabel = kasten ? `Kasten: ${kasten}` : '(kein Kasten)'
      const beet = get(el, 'beet')
      const beetLabel = beet ? `Beet: ${beet}` : '(kein Beet)'
      const nr = get(el, 'nr')
      const nrLabel = nr ? `Nr: ${nr}` : '(keine Nr)'
      const label = `${datum}: ${kastenLabel}, ${beetLabel}, ${nrLabel}`

      return {
        nodeType: 'table',
        menuType: 'inventar',
        filterTable: 'inventar',
        id: `kultur${kulturId}Inventar${el.id}`,
        parentId: `kultur${kulturId}InventarFolder`,
        label,
        url: ['Kulturen', kulturId, 'Inventare', el.id],
        hasChildren: false,
      }
    })
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [7, kulturIndex, 5, index]
      return el
    })
}
