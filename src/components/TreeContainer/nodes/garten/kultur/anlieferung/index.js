import moment from 'moment'

export default ({ store }) => {
  const { showGarten, visibleOpenNodes, garten, gartenKultur } = store.tree
  if (!showGarten) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 5 &&
      node[0] === 'Gaerten' &&
      node[2] === 'Kulturen' &&
      node[4] === 'An-Lieferungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const gartenId = node[1]
    const gartenIndex = garten.findIndex((a) => a.id === gartenId)
    const kulturId = node[3]
    const kulturIndex = gartenKultur.findIndex((a) => a.id === kulturId)

    const anlieferungen = store.lieferungsFiltered.filter(
      (t) => t.nach_kultur_id === kulturId,
    )

    return anlieferungen
      .map((el) => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : 'kein Datum'
        const anz = el?.anzahl_pflanzen ?? '_'
        const anzAb = el.anzahl_auspflanzbereit ?? '_'
        const numbers = `${anz
          .toString()
          .padStart(3, '_')}/${anzAb.toString().padStart(3, '_')}`
        const geplant = el.geplant ? ' (geplant)' : ''
        const label = `${datum}: ${numbers}${geplant}`

        return {
          nodeType: 'table',
          menuTitle: 'An-Lieferung',
          table: 'lieferung',
          id: `${gartenId}${kulturId}${el.id}`,
          label,
          url: [
            'Gaerten',
            gartenId,
            'Kulturen',
            kulturId,
            'An-Lieferungen',
            el.id,
          ],
          hasChildren: false,
          mono: true,
        }
      })
      .map((el, index) => {
        el.sort = [4, gartenIndex, 1, kulturIndex, 3, index]
        return el
      })
  })
}
