import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../../compareLabel'
import allParentNodesExist from '../../../../allParentNodesExist'

export default ({ nodes, data, url }) => {
  const gartenId = url[1]
  const kulturId = url[3]
  const gaerten = get(data, 'garten', [])
  const garten = gaerten.find(a => a.id === gartenId)
  const kulturen = get(garten, 'kultursBygartenId', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const zulieferungen = get(kultur, 'lieferungsBynachKulturId', [])

  const gartenNodes = nodes.filter(n => n.parentId === 'gartenFolder')
  const gartenIndex = findIndex(gartenNodes, n => n.id === `garten${gartenId}`)
  const kulturNodes = nodes.filter(
    n => n.parentId === `garten${gartenId}KulturFolder`,
  )
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  return zulieferungen
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
        menuType: 'zulieferung',
        filterTable: 'lieferung',
        id: `lieferung${el.id}`,
        parentId: `kultur${kulturId}ZuLieferungFolder`,
        label,
        url: [
          'Gaerten',
          gartenId,
          'Kulturen',
          kulturId,
          'Zu-Lieferungen',
          el.id,
        ],
        hasChildren: false,
      }
    })
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [2, gartenIndex, 1, kulturIndex, 2, index]
      return el
    })
}
