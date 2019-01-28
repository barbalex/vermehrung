import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../compareLabel'
import allParentNodesExist from '../../../allParentNodesExist'

export default ({ nodes, data, url }) => {
  const personId = url[1]
  const personen = get(data, 'person', [])
  const person = personen.find(p => p.id === personId)
  const sammlungen = get(person, 'sammlungsBypersonId', [])

  const personNodes = nodes.filter(n => n.parentId === 'personFolder')
  const personIndex = findIndex(personNodes, n => n.id === `person${personId}`)

  return sammlungen
    .map(el => {
      const datum = get(el, 'datum', '(kein Datum)')
      const art = get(el, 'artByartId.art_ae_art.name', '(keine Art)')
      const herkunft = get(el, 'herkunftByherkunftId.nr', '(keine Herkunft-Nr)')
      const label = `${datum}: Herkunft ${herkunft}: ${art}`

      return {
        nodeType: 'table',
        menuType: 'personSammlung',
        filterTable: 'sammlung',
        id: `person${personId}Sammlung${el.id}`,
        parentId: `person${personId}SammlungFolder`,
        label,
        url: ['Personen', personId, 'Sammlungen', el.id],
        hasChildren: true,
      }
    })
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [5, personIndex, 2, index]
      return el
    })
}
