import findIndex from 'lodash/findIndex'
import moment from 'moment'

import exists from '../../../../../utils/exists'

export default ({ nodes, store, url }) => {
  const personId = url[1]

  const lieferungen = store.lieferungFiltered.filter(
    (s) => s.person_id === personId,
  )

  const personNodes = nodes.filter((n) => n.parentId === 'personFolder')
  const personIndex = findIndex(
    personNodes,
    (n) => n.id === `person${personId}`,
  )

  return (
    lieferungen
      // only show if parent node exists
      .filter(() =>
        nodes.map((n) => n.id).includes(`person${personId}LieferungFolder`),
      )
      .map((el) => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : 'kein Datum'
        const anz = exists(el.anzahl_pflanzen) ? el.anzahl_pflanzen : '_'
        const anzAb = exists(el.anzahl_auspflanzbereit)
          ? el.anzahl_auspflanzbereit
          : '_'
        const numbers = `${anz
          .toString()
          .padStart(3, '_')}/${anzAb.toString().padStart(3, '_')}`
        const geplant = el.geplant ? ' (geplant)' : ''
        const label = `${datum}: ${numbers}${geplant}`

        return {
          nodeType: 'table',
          menuTitle: 'Lieferung',
          table: 'lieferung',
          id: `person${personId}Lieferung${el.id}`,
          parentId: `person${personId}LieferungFolder`,
          label,
          url: ['Personen', personId, 'Lieferungen', el.id],
          hasChildren: false,
          mono: true,
        }
      })
      .map((el, index) => {
        el.sort = [11, personIndex, 3, index]
        return el
      })
  )
}
