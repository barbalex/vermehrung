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
  const zaehlungen = get(kultur, 'zaehlungsBykulturId', [])

  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${artId}`)
  const kulturNodes = nodes.filter(
    n => n.parentId === `art${artId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    n => n.id === `art${artId}Kultur${kulturId}`,
  )

  return zaehlungen
    .map(el => ({
      nodeType: 'table',
      menuType: 'zaehlung',
      filterTable: 'zaehlung',
      id: `art${artId}Kultur${kulturId}Zaehlung${el.id}`,
      parentId: `art${artId}Kultur${kulturId}ZaehlungFolder`,
      label: get(el, 'datum', '(kein Datum)'),
      url: ['Arten', artId, 'Kulturen', kulturId, 'Zaehlungen', el.id],
      hasChildren: false,
    }))
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [1, artIndex, 1, kulturIndex, 1, index]
      return el
    })
}
