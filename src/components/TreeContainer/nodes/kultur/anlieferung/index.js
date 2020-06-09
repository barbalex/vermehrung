import moment from 'moment'

export default ({ store }) => {
  const { showKultur, visibleOpenNodes, kultur } = store.tree
  if (!showKultur) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 3 &&
      node[0] === 'Kulturen' &&
      node[2] === 'An-Lieferungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const kulturId = node[1]
    const kulturIndex = kultur.findIndex((a) => a.id === kulturId)

    const anlieferungen = store.lieferungsFiltered.filter(
      (z) => z.nach_kultur_id === kulturId,
    )

    return anlieferungen
      .map((el) => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : 'kein Datum'
        const anz = el.anzahl_pflanzen ?? '_'
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
          id: `${kulturId}${el.id}`,
          label,
          url: ['Kulturen', kulturId, 'An-Lieferungen', el.id],
          hasChildren: false,
          mono: true,
        }
      })
      .map((el, index) => {
        el.sort = [5, kulturIndex, 3, index]
        return el
      })
  })
}
