import eventLabelFromEvent from '../../../../../../utils/eventLabelFromEvent'

const artKulturEventNodes = ({ store }) => {
  const { showArt, visibleOpenNodes, art, artKultur } = store.tree
  if (!showArt) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 5 &&
      node[0] === 'Arten' &&
      node[2] === 'Kulturen' &&
      node[4] === 'Events',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const artId = node[1]
    const artIndex = art.findIndex((a) => a.id === artId)
    const kulturId = node[3]
    const kulturIndex = artKultur.findIndex(
      (a) => a.id === `${artId}${kulturId}`,
    )
    const events = store.eventsFiltered.filter((e) => e.kultur_id === kulturId)

    return events
      .map((el) => ({
        nodeType: 'table',
        menuTitle: 'Event',
        table: 'event',
        id: `${artId}${kulturId}${el.id}`,
        label: eventLabelFromEvent({ event: el }),
        url: ['Arten', artId, 'Kulturen', kulturId, 'Events', el.id],
        hasChildren: false,
      }))
      .map((el, index) => {
        el.sort = [1, artIndex, 2, kulturIndex, 5, index]
        return el
      })
  })
}

export default artKulturEventNodes
