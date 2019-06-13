import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, data, url }) => {
  const sammlungId = url[1]
  const lieferungId = url[3]
  const kulturId = url[5]

  const sammlungen = get(data, 'sammlung', [])
  const sammlung = sammlungen.find(p => p.id === sammlungId)
  const lieferungen = get(sammlung, 'lieferungs', [])
  const lieferung = lieferungen.find(p => p.id === lieferungId)
  const kulturen = [get(lieferung, 'kulturByNachKulturId', [])]
  const auslieferungen =
    kulturen.length === 0 ? [] : get(kulturen[0], 'lieferungsByVonKulturId', [])

  const sammlungNodes = nodes.filter(n => n.parentId === 'sammlungFolder')
  const sammlungIndex = findIndex(
    sammlungNodes,
    n => n.id === `sammlung${sammlungId}`,
  )
  const lieferungNodes = nodes.filter(
    n => n.parentId === `sammlung${sammlungId}LieferungFolder`,
  )
  const lieferungIndex = findIndex(
    lieferungNodes,
    n => n.id === `sammlung${sammlungId}Lieferung${lieferungId}`,
  )
  const kulturNodes = nodes.filter(
    n =>
      n.parentId === `sammlung${sammlungId}Lieferung${lieferungId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    n =>
      n.id === `sammlung${sammlungId}Lieferung${lieferungId}Kultur${kulturId}`,
  )

  return (
    auslieferungen
      // only show if parent node exists
      .filter(() =>
        nodes
          .map(n => n.id)
          .includes(
            `sammlung${sammlungId}Lieferung${lieferungId}Kultur${kulturId}AusLieferungFolder`,
          ),
      )
      .map(el => {
        const von_datum = el.von_datum
          ? moment(el.von_datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : '(kein von-Datum)'
        const label = `${von_datum}: ${get(el, 'person.name') || '(kein Name)'}`

        return {
          nodeType: 'table',
          menuTitle: 'Aus-Lieferung',
          table: 'lieferung',
          id: `sammlung${sammlungId}Lieferung${lieferungId}Kultur${kulturId}Lieferung${el.id}`,
          parentId: `sammlung${sammlungId}Lieferung${lieferungId}Kultur${kulturId}AusLieferungFolder`,
          label,
          url: [
            'Sammlungen',
            sammlungId,
            'Aus-Lieferungen',
            lieferungId,
            'Kulturen',
            kulturId,
            'Aus-Lieferungen',
            el.id,
          ],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [
          6,
          sammlungIndex,
          3,
          lieferungIndex,
          1,
          kulturIndex,
          3,
          index,
        ]
        return el
      })
  )
}
