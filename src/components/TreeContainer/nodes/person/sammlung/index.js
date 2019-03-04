import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

import compareLabel from '../../compareLabel'
import filterNodes from '../../../../../utils/filterNodes'

export default ({ nodes, data, url, store }) => {
  const personId = url[1]
  const personen = filterNodes({
    rows: get(data, 'person', []),
    filter: store.filter,
    table: 'person',
  })
  const person = personen.find(p => p.id === personId)
  const sammlungen = filterNodes({
    rows: get(person, 'sammlungsBypersonId', []),
    filter: store.filter,
    table: 'sammlung',
  })

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
          : '(kein Datum)'
        const art = get(el, 'artByartId.art_ae_art.name') || '(keine Art)'
        const herkunft =
          get(el, 'herkunftByherkunftId.nr') || '(keine Herkunft-Nr)'
        const label = `${datum}: Herkunft ${herkunft}: ${art}`

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
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [5, personIndex, 2, index]
        return el
      })
  )
}
