import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../../compareLabel'
import allParentNodesExist from '../../../../allParentNodesExist'

export default ({ nodes, data, url }) => {
  const gartenId = url[1]
  const kulturId = url[3]
  const gaerten = get(data, 'garten', [])
  const garten = gaerten.find(a => a.id === gartenId)
  const kulturen = get(garten, 'kultursBygartenId', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const inventare = get(kultur, 'kulturInventarsBykulturId', [])

  const gartenNodes = nodes.filter(n => n.parentId === 'gartenFolder')
  const gartenIndex = findIndex(gartenNodes, n => n.id === `garten${gartenId}`)
  const kulturNodes = nodes.filter(
    n => n.parentId === `garten${gartenId}KulturFolder`,
  )
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  return inventare
    .map(el => {
      const datum = get(el, 'datum', '(kein Datum)')
      const kasten = get(el, 'kasten')
      const kastenLabel = kasten ? `Kasten: ${kasten}` : '(kein Kasten)'
      const beet = get(el, 'beet')
      const beetLabel = beet ? `Beet: ${beet}` : '(kein Beet)'
      const nr = get(el, 'nr')
      const nrLabel = nr ? `Nr: ${nr}` : '(keine Nr)'
      const label = `${datum}: ${kastenLabel}, ${beetLabel}, ${nrLabel}`

      return {
        nodeType: 'table',
        menuType: 'zaehlung',
        filterTable: 'zaehlung',
        id: `zaehlung${el.id}`,
        parentId: `kultur${kulturId}ZaehlungFolder`,
        label,
        url: ['Arten', gartenId, 'Kulturen', kulturId, 'Zaehlungen', el.id],
        hasChildren: false,
      }
    })
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [1, gartenIndex, 1, kulturIndex, 5, index]
      return el
    })
}
