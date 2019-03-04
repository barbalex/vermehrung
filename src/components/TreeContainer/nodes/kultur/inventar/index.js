import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

import compareLabel from '../../compareLabel'
import filterNodes from '../../../../../utils/filterNodes'

export default ({ nodes, data, url, store }) => {
  const kulturId = url[1]
  const kulturen = filterNodes({
    rows: get(data, 'kultur', []),
    filter: store.filter,
    table: 'kultur',
  })
  const kultur = kulturen.find(k => k.id === kulturId)
  const inventare = filterNodes({
    rows: get(kultur, 'kulturInventarsBykulturId', []),
    filter: store.filter,
    table: 'inventar',
  })

  const kulturNodes = nodes.filter(n => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  return (
    inventare
      // only show if parent node exists
      .filter(() =>
        nodes.map(n => n.id).includes(`kultur${kulturId}InventarFolder`),
      )
      .map(el => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : '(kein Datum)'
        const kasten = get(el, 'kasten')
        const kastenLabel = kasten ? `Kasten: ${kasten}` : '(kein Kasten)'
        const beet = get(el, 'beet')
        const beetLabel = beet ? `Beet: ${beet}` : '(kein Beet)'
        const nr = get(el, 'nr')
        const nrLabel = nr ? `Nr: ${nr}` : '(keine Nr)'
        const label = `${datum}: ${kastenLabel}, ${beetLabel}, ${nrLabel}`

        return {
          nodeType: 'table',
          menuTitle: 'Inventar',
          table: 'inventar',
          id: `kultur${kulturId}Inventar${el.id}`,
          parentId: `kultur${kulturId}InventarFolder`,
          label,
          url: ['Kulturen', kulturId, 'Inventare', el.id],
          hasChildren: false,
        }
      })
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [7, kulturIndex, 5, index]
        return el
      })
  )
}
