import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ nodes, data, url }) => {
  const sammlungId = url[1]
  const lieferungId = url[3]
  const sammlungen = get(data, 'sammlung', [])
  const sammlung = sammlungen.find(p => p.id === sammlungId)
  const lieferungen = get(sammlung, 'lieferungs', [])
  const lieferung = lieferungen.find(p => p.id === lieferungId)
  const kulturen = [get(lieferung, 'kulturByNachKulturId', [])]

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
        label: get(el, 'garten.person.name') || '(kein Name)',
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
      .map((el, index) => {
        el.sort = [6, sammlungIndex, 3, lieferungIndex, 1, index]
        return el
      })
  )
}
