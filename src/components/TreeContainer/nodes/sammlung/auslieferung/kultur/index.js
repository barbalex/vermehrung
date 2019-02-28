import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../../compareLabel'
import filterNodes from '../../../../../../utils/filterNodes'

export default ({ nodes, data, url, store }) => {
  const sammlungId = url[1]
  const lieferungId = url[3]
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

  return (
    kulturen
      // only show if parent node exists
      .filter(() =>
        nodes
          .map(n => n.id)
          .includes(`sammlung${sammlungId}Lieferung${lieferungId}KulturFolder`),
      )
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'Kultur',
        table: 'kultur',
        id: `sammlung${sammlungId}Lieferung${lieferungId}Kultur${el.id}`,
        parentId: `sammlung${sammlungId}Lieferung${lieferungId}KulturFolder`,
        label: get(el, 'gartenBygartenId.personBypersonId.name', '(kein Name)'),
        url: [
          'Sammlungen',
          sammlungId,
          'Aus-Lieferungen',
          lieferungId,
          'Kulturen',
          el.id,
        ],
        hasChildren: true,
      }))
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [6, sammlungIndex, 3, lieferungIndex, 1, index]
        return el
      })
  )
}
