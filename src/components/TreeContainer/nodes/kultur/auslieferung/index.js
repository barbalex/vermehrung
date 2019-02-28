import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../compareLabel'

export default ({ nodes, data, url, store }) => {
  const kulturId = url[1]
  const kulturen = get(data, 'kultur', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const auslieferungen = get(kultur, 'lieferungsByvonKulturId', [])

  const kulturNodes = nodes.filter(n => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  return (
    auslieferungen
      // only show if parent node exists
      .filter(() =>
        nodes.map(n => n.id).includes(`kultur${kulturId}AusLieferungFolder`),
      )
      .map(el => {
        const label = `${get(el, 'von_datum', '(kein von-Datum)')}: ${get(
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
          menuTitle: 'Aus-Lieferung',
          table: 'lieferung',
          id: `kultur${kulturId}Lieferung${el.id}`,
          parentId: `kultur${kulturId}AusLieferungFolder`,
          label,
          url: ['Kulturen', kulturId, 'Aus-Lieferungen', el.id],
          hasChildren: false,
        }
      })
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [7, kulturIndex, 3, index]
        return el
      })
  )
}
