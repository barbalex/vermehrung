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
  const zaehlungen = get(kultur, 'zaehlungsBykulturId', [])

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

  return zaehlungen
    .map(el => ({
      nodeType: 'table',
      menuType: 'zaehlung',
      filterTable: 'artKulturZaehlung',
      id: `sammlung${sammlungId}Lieferung${lieferungId}Kultur${kulturId}Zaehlung${
        el.id
      }`,
      parentId: `sammlung${sammlungId}Lieferung${lieferungId}Kultur${kulturId}ZaehlungFolder`,
      label: get(el, 'datum', '(kein Datum)'),
      url: [
        'Sammlungen',
        sammlungId,
        'Aus-Lieferungen',
        lieferungId,
        'Kulturen',
        kulturId,
        'Zaehlungen',
        el.id,
      ],
      hasChildren: false,
    }))
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [6, sammlungIndex, 3, lieferungIndex, 1, kulturIndex, 1, index]
      return el
    })
}
