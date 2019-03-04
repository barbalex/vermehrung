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
  const anlieferungen = filterNodes({
    rows: get(kultur, 'lieferungsBynachKulturId', []),
    filter: store.filter,
    table: 'lieferung',
  })

  const kulturNodes = nodes.filter(n => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  return (
    anlieferungen
      // only show if parent node exists
      .filter(() =>
        nodes.map(n => n.id).includes(`kultur${kulturId}AnLieferungFolder`),
      )
      .map(el => {
        const nach_datum = el.von_datum
          ? moment(el.nach_datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : '(kein von-Datum)'
        const label = `${nach_datum}: ${get(el, 'personBypersonId.name') ||
          '(kein Name)'}; ${get(el, 'lieferungTypWerteBytyp.wert') ||
          '(kein Typ)'}; ${get(el, 'lieferungStatusWerteBystatus.wert') ||
          '(kein Status)'}`

        return {
          nodeType: 'table',
          menuTitle: 'An-Lieferung',
          table: 'lieferung',
          id: `kultur${kulturId}Lieferung${el.id}`,
          parentId: `kultur${kulturId}AnLieferungFolder`,
          label,
          url: ['Kulturen', kulturId, 'An-Lieferungen', el.id],
          hasChildren: false,
        }
      })
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [7, kulturIndex, 2, index]
        return el
      })
  )
}
