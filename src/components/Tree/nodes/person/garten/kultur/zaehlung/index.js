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
      node[6] === 'Zaehlungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const personId = node[1]
    const personIndex = person.findIndex((a) => a.id === personId)
    const gartenId = node[3]
    const gartenIndex = personGarten.findIndex((a) => a.id === gartenId)
    const kulturId = node[5]
    const kulturIndex = personGartenKultur.findIndex((a) => a.id === kulturId)

    const zaehlungen = store.zaehlungsFiltered.filter(
      (z) => z.kultur_id === kulturId,
    )

    return zaehlungen
      .map((el) => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : 'kein Datum'
        const anz =
          el?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_pflanzen ?? '-'
        const anzAb =
          el?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_auspflanzbereit ??
          '-'
        const anzMu =
          el?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_mutterpflanzen ??
          '-'
        const numbers = `${anz
          .toString()
          .padStart(3, '\u00A0')}/${anzAb
          .toString()
          .padStart(3, '\u00A0')}/${anzMu.toString().padStart(3, '\u00A0')}`
        const geplant = el.geplant ? ' (geplant)' : ''
        const label = `${datum}: ${numbers}${geplant}`

        return {
          nodeType: 'table',
          menuTitle: 'Zählung',
          table: 'zaehlung',
          id: `${personId}${gartenId}${kulturId}${el.id}`,
          label,
          url: [
            'Personen',
            personId,
            'Gaerten',
            gartenId,
            'Kulturen',
            kulturId,
            'Zaehlungen',
            el.id,
          ],
          hasChildren: false,
          mono: true,
        }
      })
      .map((el, index) => {
        el.sort = [11, personIndex, 2, gartenIndex, 1, kulturIndex, 2, index]
        return el
      })
  })
}
