import moment from 'moment'

export default ({ store }) => {
  const { showArt, visibleOpenNodes, artArt, artKultur } = store.tree
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
    const artIndex = artArt.findIndex((a) => a.id === artId)
    const kulturId = node[3]
    const kulturIndex = artKultur.findIndex((a) => a.id === kulturId)

    const events = store.eventsFiltered.filter((e) => e.kultur_id === kulturId)

    return events
      .map((el) => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : null
        const geplant = el.geplant ? ' (geplant)' : ''
        const event = `${el?.beschreibung ?? '(nicht beschrieben)'}${geplant}`
        const label = `${datum ?? '(kein Datum)'}: ${event}`

        return {
          nodeType: 'table',
          menuTitle: 'Event',
          table: 'event',
          id: `art${artId}Kultur${kulturId}Event${el.id}`,
          label,
          url: ['Arten', artId, 'Kulturen', kulturId, 'Events', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [1, artIndex, 2, kulturIndex, 5, index]
        return el
      })
  })
}
