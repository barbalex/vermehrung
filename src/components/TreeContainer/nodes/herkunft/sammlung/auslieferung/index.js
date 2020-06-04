import moment from 'moment'

export default ({ store }) => {
  const {
    showHerkunft,
    visibleOpenNodes,
    herkunftHerkunft,
    herkunftSammlung,
  } = store.tree
  if (!showHerkunft) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 5 &&
      node[0] === 'Herkuenfte' &&
      node[2] === 'Sammlungen' &&
      node[4] === 'Aus-Lieferungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const herkunftId = node[1]
    const herkunftIndex = herkunftHerkunft.findIndex((a) => a.id === herkunftId)
    const sammlungId = node[3]
    const sammlungIndex = herkunftSammlung.findIndex((a) => a.id === sammlungId)

    const lieferungen = store.lieferungsFiltered.filter(
      (l) => l.von_sammlung_id === sammlungId,
    )

    return lieferungen
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
          menuTitle: 'Aus-Lieferung',
          table: 'lieferung',
          id: el.id,
          label,
          url: [
            'Herkuenfte',
            herkunftId,
            'Sammlungen',
            sammlungId,
            'Aus-Lieferungen',
            el.id,
          ],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [2, herkunftIndex, 2, sammlungIndex, 1, index]
        return el
      })
  })
}
