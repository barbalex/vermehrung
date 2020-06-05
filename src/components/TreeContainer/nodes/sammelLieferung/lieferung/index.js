import moment from 'moment'

export default ({ store }) => {
  const { showSammelLieferung, visibleOpenNodes, sammelLieferung } = store.tree
  if (!showSammelLieferung) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 3 &&
      node[0] === 'Sammel-Lieferungen' &&
      node[2] === 'Lieferungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const sammelLieferungId = node[1]
    const sammelLieferungIndex = sammelLieferung.findIndex(
      (a) => a.id === sammelLieferungId,
    )

    const lieferungen = store.lieferungsFiltered.filter(
      (l) => l.sammel_lieferung_id === sammelLieferungId,
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
          menuTitle: 'Lieferung',
          table: 'lieferung',
          id: el.id,
          label,
          url: ['Sammel-Lieferungen', sammelLieferungId, 'Lieferungen', el.id],
          hasChildren: false,
          mono: true,
        }
      })
      .map((el, index) => {
        el.sort = [9, sammelLieferungIndex, 3, index]
        return el
      })
  })
}
