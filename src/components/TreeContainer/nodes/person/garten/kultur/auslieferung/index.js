import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, data, url }) => {
  const personId = url[1]
  const gartenId = url[3]
  const kulturId = url[5]
  const personen = data?.person ?? []
  const person = personen.find((p) => p.id === personId)
  const gaerten = person?.gartens ?? []
  const garten = gaerten.find((a) => a.id === gartenId)
  const kulturen = garten?.kulturs ?? []
  const kultur = kulturen.find((k) => k.id === kulturId)
  const auslieferungen = kultur?.lieferungsByVonKulturId ?? []

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
    auslieferungen
      // only show if parent node exists
      .filter(() =>
        nodes
          .map((n) => n.id)
          .includes(
            `person${personId}Garten${gartenId}Kultur${kulturId}AusLieferungFolder`,
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
          menuTitle: 'Aus-Lieferung',
          table: 'lieferung',
          id: `person${personId}Garten${gartenId}Kultur${kulturId}Auslieferung${el.id}`,
          parentId: `person${personId}Garten${gartenId}Kultur${kulturId}AusLieferungFolder`,
          label,
          url: [
            'Personen',
            personId,
            'Gaerten',
            gartenId,
            'Kulturen',
            kulturId,
            'Aus-Lieferungen',
            el.id,
          ],
          hasChildren: false,
          mono: true,
        }
      })
      .map((el, index) => {
        el.sort = [11, personIndex, 2, gartenIndex, 1, kulturIndex, 4, index]
        return el
      })
  )
}
