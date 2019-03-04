import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../../../compareLabel'
import filterNodes from '../../../../../../../utils/filterNodes'

export default ({ nodes, data, url, store }) => {
  const sammlungId = url[1]
  const lieferungId = url[3]
  const kulturId = url[5]

  const sammlungen = filterNodes({
    rows: get(data, 'sammlung', []),
    filter: store.filter,
    table: 'sammlung',
  })
  const sammlung = sammlungen.find(p => p.id === sammlungId)
  const lieferungen = filterNodes({
    rows: get(sammlung, 'lieferungsByvonSammlungId', []),
    filter: store.filter,
    table: 'lieferung',
  })
  const lieferung = lieferungen.find(p => p.id === lieferungId)
  const kulturen = filterNodes({
    rows: [get(lieferung, 'kulturBynachKulturId', [])],
    filter: store.filter,
    table: 'kultur',
  })
  const zaehlungen = filterNodes({
    rows:
      kulturen.length === 0 ? [] : get(kulturen[0], 'zaehlungsBykulturId', []),
    filter: store.filter,
    table: 'zaehlung',
  })

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

  return (
    zaehlungen
      // only show if parent node exists
      .filter(() =>
        nodes
          .map(n => n.id)
          .includes(
            `sammlung${sammlungId}Lieferung${lieferungId}Kultur${kulturId}ZaehlungFolder`,
          ),
      )
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'Zählung',
        table: 'artKulturZaehlung',
        id: `sammlung${sammlungId}Lieferung${lieferungId}Kultur${kulturId}Zaehlung${
          el.id
        }`,
        parentId: `sammlung${sammlungId}Lieferung${lieferungId}Kultur${kulturId}ZaehlungFolder`,
        label: get(el, 'datum') || '(kein Datum)',
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
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [
          6,
          sammlungIndex,
          3,
          lieferungIndex,
          1,
          kulturIndex,
          1,
          index,
        ]
        return el
      })
  )
}
