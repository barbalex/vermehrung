import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, store, url }) => {
  const herkunftId = url[1]
  const sammlungId = url[3]

  const herkunftNodes = nodes.filter((n) => n.parentId === 'herkunftFolder')
  const herkunftIndex = findIndex(
    herkunftNodes,
    (n) => n.id === `herkunft${herkunftId}`,
  )
  const sammlungNodes = nodes.filter(
    (n) => n.parentId === `herkunft${herkunftId}SammlungFolder`,
  )
  const sammlungIndex = findIndex(
    sammlungNodes,
    (n) => n.id === `herkunft${herkunftId}Sammlung${sammlungId}`,
  )

  const lieferungen = store.lieferungFiltered.filter(
    (l) => l.von_sammlung_id === sammlungId,
  )

  return lieferungen
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
        id: `herkunft${herkunftId}Sammlung${sammlungId}Lieferung${el.id}`,
        parentId: `herkunft${herkunftId}Sammlung${sammlungId}LieferungFolder`,
        label,
        url: [
          'Herkuenfte',
          herkunftId,
          'Sammlungen',
          sammlungId,
          'Aus-Lieferungen',
          el.id,
        ],
        hasChildren: false,
      }
    })
    .map((el, index) => {
      el.sort = [2, herkunftIndex, 2, sammlungIndex, 1, index]
      return el
    })
}
