import eventLabelFromEvent from '../../../../../utils/eventLabelFromEvent'

const kulturEventNodes = ({ store }) => {
  const { showKultur, visibleOpenNodes, kultur } = store.tree
  if (!showKultur) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 3 && node[0] === 'Kulturen' && node[2] === 'Events',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const kulturId = node[1]
    const kulturIndex = kultur.findIndex((a) => a.id === kulturId)
    const events = store.eventsFiltered.filter((z) => z.kultur_id === kulturId)

    return events
      .map((el) => ({
        nodeType: 'table',
        menuTitle: 'Event',
        table: 'event',
        id: `${kulturId}${el.id}`,
        label: eventLabelFromEvent({ event: el }),
        url: ['Kulturen', kulturId, 'Events', el.id],
        hasChildren: false,
      }))
      .map((el, index) => {
        el.sort = [5, kulturIndex, 5, index]
        return el
      })
  })
}

export default kulturEventNodes
