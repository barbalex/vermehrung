import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../../compareLabel'

export default ({ nodes, data, url }) => {
  const personId = url[1]
  const gartenId = url[3]

  const personen = get(data, 'person', [])
  const person = personen.find(p => p.id === personId)
  const gaerten = get(person, 'gartensBypersonId', [])
  const garten = gaerten.find(a => a.id === gartenId)
  const kulturen = get(garten, 'kultursBygartenId', [])

  const personNodes = nodes.filter(n => n.parentId === 'personFolder')
  const personIndex = findIndex(personNodes, n => n.id === `person${personId}`)
  const gartenNodes = nodes.filter(
    n => n.parentId === `person${personId}GartenFolder`,
  )
  const gartenIndex = findIndex(
    gartenNodes,
    n => n.id === `person${personId}Garten${gartenId}`,
  )

  return (
    kulturen
      // only show if parent node exists
      .filter(() =>
        nodes
          .map(n => n.id)
          .includes(`person${personId}Garten${gartenId}KulturFolder`),
      )
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'personGartenKultur',
        filterTable: 'kultur',
        id: `person${personId}Garten${gartenId}Kultur${el.id}`,
        parentId: `person${personId}Garten${gartenId}KulturFolder`,
        label: get(el, 'artByartId.art_ae_art.name', '(keine Art)'),
        url: ['Personen', personId, 'Gaerten', gartenId, 'Kulturen', el.id],
        hasChildren: true,
      }))
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [5, personIndex, 1, gartenIndex, 1, index]
        return el
      })
  )
}
