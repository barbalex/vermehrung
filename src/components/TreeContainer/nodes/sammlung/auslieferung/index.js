import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

import compareLabel from '../../compareLabel'

export default ({ nodes, data, url }) => {
  const sammlungId = url[1]
  const sammlungen = get(data, 'sammlung', [])
  const sammlung = sammlungen.find(p => p.id === sammlungId)
  const lieferungen = get(sammlung, 'lieferungs', [])

  const sammlungNodes = nodes.filter(n => n.parentId === 'sammlungFolder')
  const sammlungIndex = findIndex(
    sammlungNodes,
    n => n.id === `sammlung${sammlungId}`,
  )

  return (
    lieferungen
      // only show if parent node exists
      .filter(() =>
        nodes.map(n => n.id).includes(`sammlung${sammlungId}LieferungFolder`),
      )
      .map(el => {
        const von_datum = el.von_datum
          ? moment(el.von_datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : '(kein von-Datum)'
        const label = `${von_datum}: ${get(el, 'person.name') ||
          '(kein Name)'}; ${get(el, 'lieferung_typ_werte.wert') ||
          '(kein Typ)'}; ${get(el, 'lieferung_status_werte.wert') ||
          '(kein Status)'}`

        return {
          nodeType: 'table',
          menuTitle: 'Aus-Lieferung',
          table: 'lieferung',
          id: `sammlung${sammlungId}Lieferung${el.id}`,
          parentId: `sammlung${sammlungId}LieferungFolder`,
          label,
          url: ['Sammlungen', sammlungId, 'Aus-Lieferungen', el.id],
          hasChildren: false,
        }
      })
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [6, sammlungIndex, 3, index]
        return el
      })
  )
}
