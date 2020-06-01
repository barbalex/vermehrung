import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, store, url }) => {
  const sammlungId = url[1]

  const lieferungen = store.lieferungFiltered.filter(
    (l) => l.von_sammlung_id === sammlungId,
  )

  const sammlungNodes = nodes.filter((n) => n.parentId === 'sammlungFolder')
  const sammlungIndex = findIndex(
    sammlungNodes,
    (n) => n.id === `sammlung${sammlungId}`,
  )

  return (
    lieferungen
      // only show if parent node exists
      .filter(() =>
        nodes.map((n) => n.id).includes(`sammlung${sammlungId}LieferungFolder`),
      )
      .map((el) => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : 'kein Datum'
        const anz = el.anzahl_pflanzen ?? '_'
        const anzAb = el.anzahl_auspflanzbereit ?? '_'
        const numbers = `${anz
          .toString()
          .padStart(3, '_')}/${anzAb.toString().padStart(3, '_')}`
        const geplant = el.geplant ? ' (geplant)' : ''
        const label = `${datum}: ${numbers}${geplant}`

        return {
          nodeType: 'table',
          menuTitle: 'Aus-Lieferung',
          table: 'lieferung',
          id: `sammlung${sammlungId}Lieferung${el.id}`,
          parentId: `sammlung${sammlungId}LieferungFolder`,
          label,
          url: ['Sammlungen', sammlungId, 'Aus-Lieferungen', el.id],
          hasChildren: false,
          mono: true,
        }
      })
      .map((el, index) => {
        el.sort = [3, sammlungIndex, 3, index]
        return el
      })
  )
}
