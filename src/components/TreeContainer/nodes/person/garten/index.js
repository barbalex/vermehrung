import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../compareLabel'

export default ({ nodes, data, url, store }) => {
  const personId = url[1]
  const personen = get(data, 'person', [])
  const person = personen.find(p => p.id === personId)
  const gaerten = get(person, 'gartensBypersonId', [])

  const personNodes = nodes.filter(n => n.parentId === 'personFolder')
  const personIndex = findIndex(personNodes, n => n.id === `person${personId}`)

  return (
    gaerten
      // only show if parent node exists
      .filter(() =>
        nodes.map(n => n.id).includes(`person${personId}GartenFolder`),
      )
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'Garten',
        table: 'garten',
        id: `person${personId}Garten${el.id}`,
        parentId: `person${personId}GartenFolder`,
        label: el.id,
        url: ['Personen', personId, 'Gaerten', el.id],
        hasChildren: true,
      }))
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [5, personIndex, 1, index]
        return el
      })
  )
}
