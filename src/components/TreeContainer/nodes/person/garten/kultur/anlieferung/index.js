import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, store, url }) => {
  const personId = url[1]
  const gartenId = url[3]
  const kulturId = url[5]

  const anlieferungen = store.lieferungsFiltered.filter(
    (z) => z.nach_kultur_id === kulturId,
  )

  const personNodes = nodes.filter((n) => n.parentId === 'personFolder')
  const personIndex = findIndex(
    personNodes,
    (n) => n.id === `person${personId}`,
  )
  const gartenNodes = nodes.filter(
    (n) => n.parentId === `person${personId}GartenFolder`,
  )
  const gartenIndex = findIndex(
    gartenNodes,
    (n) => n.id === `person${personId}Garten${gartenId}`,
  )
  const kulturNodes = nodes.filter(
    (n) => n.parentId === `person${personId}Garten${gartenId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    (n) => n.id === `person${personId}Garten${gartenId}Kultur${kulturId}`,
  )

  return (
    anlieferungen
      // only show if parent node exists
      .filter(() =>
        nodes
          .map((n) => n.id)
          .includes(
            `person${personId}Garten${gartenId}Kultur${kulturId}AnLieferungFolder`,
          ),
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
          menuTitle: 'An-Lieferung',
          table: 'lieferung',
          id: `person${personId}Garten${gartenId}Kultur${kulturId}Anlieferung${el.id}`,
          parentId: `person${personId}Garten${gartenId}Kultur${kulturId}AnLieferungFolder`,
          label,
          url: [
            'Personen',
            personId,
            'Gaerten',
            gartenId,
            'Kulturen',
            kulturId,
            'An-Lieferungen',
            el.id,
          ],
          hasChildren: false,
          mono: true,
        }
      })
      .map((el, index) => {
        el.sort = [11, personIndex, 2, gartenIndex, 1, kulturIndex, 3, index]
        return el
      })
  )
}
