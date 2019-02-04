import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../../compareLabel'
import allParentNodesExist from '../../../../allParentNodesExist'

export default ({ nodes, data, url }) => {
  const artId = url[1]
  const kulturId = url[3]
  const arten = get(data, 'art', [])
  const art = arten.find(a => a.id === artId)
  const kulturen = get(art, 'kultursByartId', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const inventare = get(kultur, 'kulturInventarsBykulturId', [])

  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${artId}`)
  const kulturNodes = nodes.filter(
    n => n.parentId === `art${artId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    n => n.id === `art${artId}Kultur${kulturId}`,
  )

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
        menuType: 'inventar',
        filterTable: 'inventar',
        id: `art${artId}Kultur${kulturId}Inventar${el.id}`,
        parentId: `art${artId}Kultur${kulturId}InventarFolder`,
        label,
        url: ['Arten', artId, 'Kulturen', kulturId, 'Inventare', el.id],
        hasChildren: false,
      }
    })
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [1, artIndex, 1, kulturIndex, 5, index]
      return el
    })
}
