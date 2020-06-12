import moment from 'moment'

export default ({ store }) => {
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
    const kulturIndex = gartenKultur.findIndex((a) => a.id === kulturId)

    const events = store.eventsFiltered.filter((t) => t.kultur_id === kulturId)

    return events
      .map((el) => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : null
        const geplant = el.geplant ? ' (geplant)' : ''
        const event = `${el?.beschreibung ?? '(nicht beschrieben)'}${geplant}`
        const label = `${datum || '(kein Datum)'}: ${event}`

        return {
          nodeType: 'table',
          menuTitle: 'Event',
          table: 'event',
          id: `${gartenId}${kulturId}${el.id}`,
          label,
          url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Events', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [4, gartenIndex, 1, kulturIndex, 5, index]
        return el
      })
  })
}
