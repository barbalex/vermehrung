import { DateTime } from 'luxon'

export default ({ store }) => {
  const { showArt, visibleOpenNodes, art, artSammlung } = store.tree
  if (!showArt) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 5 &&
      node[0] === 'Arten' &&
      node[2] === 'Sammlungen' &&
      node[4] === 'Aus-Lieferungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const artId = node[1]
    const sammlungId = node[3]
    const artIndex = art.findIndex((a) => a.id === artId)
    const sammlungIndex = artSammlung.findIndex(
      (s) => s.id === `${artId}${sammlungId}`,
    )

    const lieferungen = store.lieferungsFiltered.filter(
      (l) => l.von_sammlung_id === sammlungId,
    )

    return lieferungen
      .map((el) => {
        const datum = el.datum
          ? DateTime.fromSQL(el.datum).toFormat('yyyy.LL.dd')
          : 'kein Datum'
        const anz = el?.anzahl_pflanzen ?? '_'
        const anzAb = el?.anzahl_auspflanzbereit ?? '_'
        const numbers = `${anz
          .toString()
          .padStart(3, '_')}/${anzAb.toString().padStart(3, '_')}`
        const geplant = el.geplant ? ' (geplant)' : ''
        const label = `${datum}: ${numbers}${geplant}`

        return {
          nodeType: 'table',
          menuTitle: 'Lieferung',
          table: 'lieferung',
          id: `${artId}${sammlungId}${el.id}`,
          label,
          url: [
            'Arten',
            artId,
            'Sammlungen',
            sammlungId,
            'Aus-Lieferungen',
            el.id,
          ],
          hasChildren: false,
          mono: true,
        }
      })
      .map((el, index) => {
        el.sort = [1, artIndex, 1, sammlungIndex, 1, index]
        return el
      })
  })
}
