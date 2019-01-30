import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../../../compareLabel'
import allParentNodesExist from '../../../../../allParentNodesExist'

export default ({ nodes, data, url }) => {
  const sammlungId = url[1]
  const lieferungId = url[3]
  const kulturId = url[5]

  const sammlungen = get(data, 'sammlung', [])
  const sammlung = sammlungen.find(p => p.id === sammlungId)
  const lieferungen = get(sammlung, 'lieferungsByvonSammlungId', [])
  const lieferung = lieferungen.find(p => p.id === lieferungId)
  const kultur = get(lieferung, 'kulturBynachKulturId', [])
  const auslieferungen = get(kultur, 'lieferungsByvonKulturId', [])

  const sammlungNodes = nodes.filter(n => n.parentId === 'sammlungFolder')
  const sammlungIndex = findIndex(
    sammlungNodes,
    n => n.id === `sammlung${sammlungId}`,
  )

  const lieferungNodes = nodes.filter(
    n => n.parentId === `sammlung${sammlungId}LieferungFolder`,
  )
  const lieferungIndex = findIndex(
    lieferungNodes,
    n => n.id === `sammlung${sammlungId}Lieferung${lieferungId}`,
  )

  const kulturNodes = nodes.filter(
    n =>
      n.parentId === `sammlung${sammlungId}Lieferung${lieferungId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    n =>
      n.id === `sammlung${sammlungId}Lieferung${lieferungId}Kultur${kulturId}`,
  )

  return auslieferungen
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
        menuType: 'sammlungLieferungKulturAuslieferung',
        filterTable: 'lieferung',
        id: `sammlung${sammlungId}Lieferung${lieferungId}Kultur${kulturId}Lieferung${
          el.id
        }`,
        parentId: `sammlung${sammlungId}Lieferung${lieferungId}Kultur${kulturId}AusLieferungFolder`,
        label,
        url: [
          'Sammlungen',
          sammlungId,
          'Aus-Lieferungen',
          lieferungId,
          'Kulturen',
          kulturId,
          'Aus-Lieferungen',
          el.id,
        ],
        hasChildren: false,
      }
    })
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [6, sammlungIndex, 3, lieferungIndex, 1, kulturIndex, 3, index]
      return el
    })
}
