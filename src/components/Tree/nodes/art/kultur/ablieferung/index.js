import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../../compareLabel'
import allParentNodesExist from '../../../../allParentNodesExist'

export default ({ nodes, data, url }) => {
  const artId = url[1]
  const kulturId = url[3]
  const arten = get(data, 'hasura.ae_art', [])
  const art = arten.find(a => a.id === artId)
  const kulturen = get(art, 'ae_art_art.kultursByartId', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const ablieferungen = get(kultur, 'lieferungsByvonKulturId', [])

  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${artId}`)
  const kulturNodes = nodes.filter(
    n => n.parentId === `art${artId}KulturFolder`,
  )
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  return ablieferungen
    .map(el => {
      const label = `${get(el, 'von_datum', '(kein von-Datum)')}: ${get(
        el,
        'personBypersonId.name',
        '(kein Name)',
      )}; ${get(el, 'lieferungTypWerteBytyp.wert', '(kein Typ)')}; ${get(
        el,
        'lieferungStatusWerteBystatus.wert',
        '(kein Status)',
      )}`

      return {
        nodeType: 'table',
        menuType: 'lieferung',
        filterTable: 'lieferung',
        id: `lieferung${el.id}`,
        parentId: `kultur${kulturId}AbLieferungFolder`,
        label,
        url: ['Arten', artId, 'Kulturen', kulturId, 'Lieferungen', el.id],
        hasChildren: false,
      }
    })
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [1, artIndex, 1, kulturIndex, 2, index]
      return el
    })
}
