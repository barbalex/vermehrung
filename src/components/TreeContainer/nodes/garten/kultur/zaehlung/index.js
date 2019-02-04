import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../../compareLabel'

export default ({ nodes, data, url }) => {
  const gartenId = url[1]
  const kulturId = url[3]
  const gaerten = get(data, 'garten', [])
  const garten = gaerten.find(a => a.id === gartenId)
  const kulturen = get(garten, 'kultursBygartenId', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const zaehlungen = get(kultur, 'zaehlungsBykulturId', [])

  const gartenNodes = nodes.filter(n => n.parentId === 'gartenFolder')
  const gartenIndex = findIndex(gartenNodes, n => n.id === `garten${gartenId}`)
  const kulturNodes = nodes.filter(
    n => n.parentId === `garten${gartenId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    n => n.id === `garten${gartenId}Kultur${kulturId}`,
  )

  return (
    zaehlungen
      // only show if parent node exists
      .filter(() =>
        nodes
          .map(n => n.id)
          .includes(`garten${gartenId}Kultur${kulturId}ZaehlungFolder`),
      )
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'Zählung',
        filterTable: 'zaehlung',
        id: `garten${gartenId}Kultur${kulturId}Zaehlung${el.id}`,
        parentId: `kultur${kulturId}ZaehlungFolder`,
        label: get(el, 'datum', '(kein Datum)'),
        url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Zaehlungen', el.id],
        hasChildren: false,
      }))
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [2, gartenIndex, 1, kulturIndex, 1, index]
        return el
      })
  )
}
