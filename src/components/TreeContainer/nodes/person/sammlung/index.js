import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, data, url }) => {
  const personId = url[1]
  const personen = get(data, 'person', [])
  const person = personen.find(p => p.id === personId)
  const sammlungen = get(person, 'sammlungs', [])

  const personNodes = nodes.filter(n => n.parentId === 'personFolder')
  const personIndex = findIndex(personNodes, n => n.id === `person${personId}`)

  return (
    sammlungen
      // only show if parent node exists
      .filter(() =>
        nodes.map(n => n.id).includes(`person${personId}SammlungFolder`),
      )
      .map(el => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : 'kein Datum'
        const art = get(el, 'art.art_ae_art.name') || '(keine Art)'
        const herkunft = get(el, 'herkunft.nr') || '(keine Herkunft-Nr)'
        const geplant = el.geplant ? ' geplant' : ''
        const label = `${datum}: Herkunft ${herkunft}: ${art}${geplant}`

        return {
          nodeType: 'table',
          menuTitle: 'Sammlung',
          table: 'sammlung',
          id: `person${personId}Sammlung${el.id}`,
          parentId: `person${personId}SammlungFolder`,
          label,
          url: ['Personen', personId, 'Sammlungen', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [10, personIndex, 1, index]
        return el
      })
  )
}
