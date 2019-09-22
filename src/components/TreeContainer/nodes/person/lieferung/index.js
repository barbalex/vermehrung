import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, data, url }) => {
  const personId = url[1]
  const personen = get(data, 'person', [])
  const person = personen.find(p => p.id === personId)
  const lieferungen = get(person, 'lieferungs', [])

  const personNodes = nodes.filter(n => n.parentId === 'personFolder')
  const personIndex = findIndex(personNodes, n => n.id === `person${personId}`)

  return (
    lieferungen
      // only show if parent node exists
      .filter(() =>
        nodes.map(n => n.id).includes(`person${personId}LieferungFolder`),
      )
      .map(el => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : 'kein Datum'
        const anz = get(el, 'anzahl_pflanzen') || '-'
        const anzAb = get(el, 'anzahl_auspflanzbereit') || '-'
        const numbers = `${anz
          .toString()
          .padStart(3, '\u00A0')}/${anzAb.toString().padStart(3, '\u00A0')}`
        const geplant = el.geplant ? ' geplant' : ''
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
