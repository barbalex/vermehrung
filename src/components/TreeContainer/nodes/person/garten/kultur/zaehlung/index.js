import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../../../compareLabel'
import filterNodes from '../../../../../../../utils/filterNodes'

export default ({ nodes, data, url, store }) => {
  const personId = url[1]
  const gartenId = url[3]
  const kulturId = url[5]

  const personen = filterNodes({
    rows: get(data, 'person', []),
    filter: store.filter,
    table: 'person',
  })
  const person = personen.find(p => p.id === personId)
  const gaerten = filterNodes({
    rows: get(person, 'gartensBypersonId', []),
    filter: store.filter,
    table: 'garten',
  })
  const garten = gaerten.find(a => a.id === gartenId)
  const kulturen = filterNodes({
    rows: get(garten, 'kultursBygartenId', []),
    filter: store.filter,
    table: 'kultur',
  })
  const kultur = kulturen.find(k => k.id === kulturId)
  const zaehlungen = filterNodes({
    rows: get(kultur, 'zaehlungsBykulturId', []),
    filter: store.filter,
    table: 'zaehlung',
  })

  const personNodes = nodes.filter(n => n.parentId === 'personFolder')
  const personIndex = findIndex(personNodes, n => n.id === `person${personId}`)
  const gartenNodes = nodes.filter(
    n => n.parentId === `person${personId}GartenFolder`,
  )
  const gartenIndex = findIndex(
    gartenNodes,
    n => n.id === `person${personId}Garten${gartenId}`,
  )
  const kulturNodes = nodes.filter(
    n => n.parentId === `person${personId}Garten${gartenId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    n => n.id === `person${personId}Garten${gartenId}Kultur${kulturId}`,
  )

  return (
    zaehlungen
      // only show if parent node exists
      .filter(() =>
        nodes
          .map(n => n.id)
          .includes(
            `person${personId}Garten${gartenId}Kultur${kulturId}ZaehlungFolder`,
          ),
      )
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'Zählung',
        table: 'zaehlung',
        id: `zaehlung${el.id}`,
        parentId: `person${personId}Garten${gartenId}Kultur${kulturId}ZaehlungFolder`,
        label: get(el, 'datum', '(kein Datum)'),
        url: [
          'Personen',
          personId,
          'Gaerten',
          gartenId,
          'Kulturen',
          kulturId,
          'Zaehlungen',
          el.id,
        ],
        hasChildren: false,
      }))
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [5, personIndex, 1, gartenIndex, 1, kulturIndex, 1, index]
        return el
      })
  )
}
