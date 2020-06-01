import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, store, url }) => {
  const sammlungId = url[1]
  const lieferungId = url[3]
  const kulturId = url[5]

  const events = store.eventFiltered.filter((z) => z.kultur_id === kulturId)

  const sammlungNodes = nodes.filter((n) => n.parentId === 'sammlungFolder')
  const sammlungIndex = findIndex(
    sammlungNodes,
    (n) => n.id === `sammlung${sammlungId}`,
  )
  const lieferungNodes = nodes.filter(
    (n) => n.parentId === `sammlung${sammlungId}LieferungFolder`,
  )
  const lieferungIndex = findIndex(
    lieferungNodes,
    (n) => n.id === `sammlung${sammlungId}Lieferung${lieferungId}`,
  )
  const kulturNodes = nodes.filter(
    (n) =>
      n.parentId === `sammlung${sammlungId}Lieferung${lieferungId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    (n) =>
      n.id === `sammlung${sammlungId}Lieferung${lieferungId}Kultur${kulturId}`,
  )

  return (
    events
      // only show if parent node exists
      .filter(() =>
        nodes
          .map((n) => n.id)
          .includes(
            `sammlung${sammlungId}Lieferung${lieferungId}Kultur${kulturId}EventFolder`,
          ),
      )
      .map((el) => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : null
        const geplant = el.geplant ? ' (geplant)' : ''
        const event = `${el?.beschreibung ?? '(nicht beschrieben)'}${geplant}`
        const label = `${datum ?? '(kein Datum)'}: ${event}`

        return {
          nodeType: 'table',
          menuTitle: 'Event',
          table: 'event',
          id: `sammlung${sammlungId}Lieferung${lieferungId}Kultur${kulturId}Event${el.id}`,
          parentId: `sammlung${sammlungId}Lieferung${lieferungId}Kultur${kulturId}EventFolder`,
          label,
          url: [
            'Sammlungen',
            sammlungId,
            'Aus-Lieferungen',
            lieferungId,
            'Kulturen',
            kulturId,
            'Events',
            el.id,
          ],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [
          3,
          sammlungIndex,
          3,
          lieferungIndex,
          1,
          kulturIndex,
          4,
          index,
        ]
        return el
      })
  )
}
