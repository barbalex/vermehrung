import isEqual from 'lodash/isEqual'
import moment from 'moment'

export default ({ store }) => {
  const { showArt, openNodes, artArt, artSammlung } = store.tree
  if (!showArt) return []

  const parentNodes = openNodes.filter(
    (node) =>
      node.length === 5 &&
      node[0] === 'Arten' &&
      node[2] === 'Sammlungen' &&
      node[4] === 'Aus-Lieferungen',
  )

  return parentNodes.flatMap((node) => {
    const artId = node[1]
    const sammlungId = node[3]
    const artIndex = artArt.findIndex((a) => a.id === artId)
    const sammlungIndex = artSammlung.findIndex((s) => s.id === sammlungId)

    const lieferungen = store.lieferungsFiltered.filter(
      (l) => l.von_sammlung_id === sammlungId,
    )

    return (
      lieferungen
        // only show if parent node exists
        .filter(() =>
          openNodes.some((node) =>
            isEqual(
              ['Arten', artId, 'Sammlungen', sammlungId, 'Aus-Lieferungen'],
              node,
            ),
          ),
        )
        .map((el) => {
          const datum = el.datum
            ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
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
            id: el.id,
            parentId: `${artId}Sammlung${sammlungId}LieferungFolder`,
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
    )
  })
}
