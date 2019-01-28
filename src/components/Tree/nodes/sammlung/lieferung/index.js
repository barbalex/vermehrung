import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../compareLabel'
import allParentNodesExist from '../../../allParentNodesExist'

export default ({ nodes, data, url }) => {
  const sammlungId = url[1]
  const sammlungen = get(data, 'sammlung', [])
  const sammlung = sammlungen.find(p => p.id === sammlungId)
  const lieferungen = get(sammlung, 'lieferungsByvonSammlungId', [])

  const sammlungNodes = nodes.filter(n => n.parentId === 'sammlungFolder')
  const sammlungIndex = findIndex(
    sammlungNodes,
    n => n.id === `sammlung${sammlungId}`,
  )

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
        menuType: 'sammlungLieferung',
        filterTable: 'lieferung',
        id: `sammlung${sammlungId}Lieferung${el.id}`,
        parentId: `sammlung${sammlungId}LieferungFolder`,
        label,
        url: ['Sammlungen', sammlungId, 'Lieferungen', el.id],
        hasChildren: true,
      }
    })
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [6, sammlungIndex, 2, index]
      return el
    })
}
