import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../compareLabel'
import allParentNodesExist from '../../../allParentNodesExist'

export default ({ nodes, data, url }) => {
  const kulturId = url[1]
  const kulturen = get(data, 'kultur', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const anlieferungen = get(kultur, 'lieferungsBynachKulturId', [])

  const kulturNodes = nodes.filter(n => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  return anlieferungen
    .map(el => {
      const label = `${get(el, 'nach_datum', '(kein nach-Datum)')}: ${get(
        el,
        'personBypersonId.name',
        '(kein Name)',
      )}; ${get(el, 'lieferungTypWerteBytyp.wert', '(kein Typ)')}; ${get(
        el,
        'lieferungStatusWerteBystatus.wert',
        '(kein Status)',
      )}`

      return {
        nodeType: 'table',
        menuType: 'anlieferung',
        filterTable: 'lieferung',
        id: `kultur${kulturId}Lieferung${el.id}`,
        parentId: `kultur${kulturId}AnLieferungFolder`,
        label,
        url: ['Kulturen', kulturId, 'An-Lieferungen', el.id],
        hasChildren: false,
      }
    })
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [7, kulturIndex, 2, index]
      return el
    })
}
