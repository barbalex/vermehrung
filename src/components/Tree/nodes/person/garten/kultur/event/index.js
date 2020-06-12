import moment from 'moment'

export default ({ store }) => {
  const {
    showPerson,
    visibleOpenNodes,
    person,
    personGarten,
    personGartenKultur,
  } = store.tree
  if (!showPerson) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 7 &&
      node[0] === 'Personen' &&
      node[2] === 'Gaerten' &&
      node[4] === 'Kulturen' &&
      node[6] === 'Events',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const personId = node[1]
    const personIndex = person.findIndex((a) => a.id === personId)
    const gartenId = node[3]
    const gartenIndex = personGarten.findIndex((a) => a.id === gartenId)
    const kulturId = node[5]
    const kulturIndex = personGartenKultur.findIndex((a) => a.id === kulturId)

    const events = store.eventsFiltered.filter((z) => z.kultur_id === kulturId)

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
          id: `${personId}${gartenId}${kulturId}${el.id}`,
          label,
          url: [
            'Personen',
            personId,
            'Gaerten',
            gartenId,
            'Kulturen',
            kulturId,
            'Events',
            el.id,
          ],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [11, personIndex, 2, gartenIndex, 1, kulturIndex, 5, index]
        return el
      })
  })
}
