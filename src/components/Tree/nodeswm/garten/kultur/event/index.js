import eventLabelFromEvent from '../../../../../../utils/eventLabelFromEvent'

const gartenKulturEventNodes = ({ store }) => {
  const { showGarten, visibleOpenNodes, garten, gartenKultur } = store.tree
  if (!showGarten) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 5 &&
      node[0] === 'Gaerten' &&
      node[2] === 'Kulturen' &&
      node[4] === 'Events',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const gartenId = node[1]
    const gartenIndex = garten.findIndex((a) => a.id === gartenId)
    const kulturId = node[3]
    const kulturIndex = gartenKultur.findIndex(
      (a) => a.id === `${gartenId}${kulturId}`,
    )

    const events = store.eventsFiltered.filter((t) => t.kultur_id === kulturId)

    return events
      .map((el) => ({
        nodeType: 'table',
        menuTitle: 'Event',
        table: 'event',
        id: `${gartenId}${kulturId}${el.id}`,
        label: eventLabelFromEvent({ event: el }),
        url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Events', el.id],
        hasChildren: false,
      }))
      .map((el, index) => {
        el.sort = [4, gartenIndex, 1, kulturIndex, 5, index]
        return el
      })
  })
}

export default gartenKulturEventNodes