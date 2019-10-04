import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, data, url }) => {
  const herkunftId = url[1]

  const herkuenfte = get(data, 'herkunft', [])
  const herkunft = herkuenfte.find(a => a.id === herkunftId)
  const sammlungen = get(herkunft, 'sammlungs', [])

  const herkunftNodes = nodes.filter(n => n.parentId === 'herkunftFolder')
  const herkunftIndex =
    findIndex(herkunftNodes, n => n.id === `herkunft${herkunftId}`) || 0

  return (
    sammlungen
      // only show if parent node exists
      .filter(() =>
        nodes.map(n => n.id).includes(`herkunft${herkunftId}SammlungFolder`),
      )
      .map(el => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : 'kein Datum'
        const artName = get(el, 'art.art_ae_art.name') || '(keine Art)'
        const geplant = el.geplant ? ' (geplant)' : ''
        const label = `${datum}: ${artName}${geplant}`

        return {
          nodeType: 'table',
          menuTitle: 'Sammlung',
          table: 'sammlung',
          id: `herkunft${herkunftId}Sammlung${el.id}`,
          parentId: `herkunft${herkunftId}SammlungFolder`,
          label,
          url: ['Herkuenfte', herkunftId, 'Sammlungen', el.id],
          hasChildren: true,
        }
      })
      .map((el, index) => {
        el.sort = [2, herkunftIndex, 2, index]
        return el
      })
  )
}
