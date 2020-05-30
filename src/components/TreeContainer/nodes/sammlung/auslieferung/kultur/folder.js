import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const sammlungId = url[1]
  const lieferungId = url[3]

  const sammlungen = data?.sammlung ?? []
  const sammlung = sammlungen.find((p) => p.id === sammlungId)
  const lieferungen = sammlung?.lieferungs ?? []
  const lieferung = lieferungen.find((p) => p.id === lieferungId)
  const kultur = lieferung?.kulturByNachKulturId
  const nr = loading || !kultur ? 0 : 1

  const sammlungNodes = nodes.filter((n) => n.parentId === 'sammlungFolder')
  const sammlungIndex = findIndex(
    sammlungNodes,
    (n) => n.id === `sammlung${sammlungId}`,
  )
  const lieferungNodes = nodes.filter(
    (n) => n.parentId === `sammlung${sammlungId}LieferungFolder`,
  )
  const lieferungIndex = findIndex(
    lieferungNodes,
    (n) => n.id === `sammlung${sammlungId}Lieferung${lieferungId}`,
  )

  // only return if parent exists
  if (
    !nodes
      .map((n) => n.id)
      .includes(`sammlung${sammlungId}Lieferung${lieferungId}`)
  )
    return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Kulturen',
      id: `sammlung${sammlungId}Lieferung${lieferungId}KulturFolder`,
      label: `Kultur (${nr})`,
      url: [
        'Sammlungen',
        sammlungId,
        'Aus-Lieferungen',
        lieferungId,
        'Kulturen',
      ],
      sort: [3, sammlungIndex, 3, lieferungIndex, 1],
      hasChildren: true,
    },
  ]
}
