import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../../compareLabel'
import allParentNodesExist from '../../../../allParentNodesExist'

export default ({ nodes, data, url }) => {
  const artId = url[1]
  const sammlungId = url[3]

  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${artId}`)
  const sammlungNodes = nodes.filter(
    n => n.parentId === `art${artId}SammlungFolder`,
  )
  const sammlungIndex = findIndex(
    sammlungNodes,
    n => n.id === `sammlung${sammlungId}`,
  )

  const arten = get(data, 'art', [])
  const art = arten.find(a => a.id === artId)
  const sammlungen = get(art, 'sammlungsByartId', [])
  const sammlung = sammlungen.find(s => s.id === sammlungId)
  const lieferungen = get(sammlung, 'lieferungsByvonSammlungId', [])

  return lieferungen
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
        parentId: `art${artId}SammlungLieferungFolder`,
        label,
        url: [
          'Arten',
          artId,
          'Sammlungen',
          sammlungId,
          'Aus-Lieferungen',
          el.id,
        ],
        hasChildren: false,
      }
    })
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [1, artIndex, 2, sammlungIndex, 1, index]
      return el
    })
}
