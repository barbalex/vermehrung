import isEqual from 'lodash/isEqual'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, store, url }) => {
  const { showArt, openNodes } = store.tree
  if (!showArt) return []
  const artId = url[1]
  const kulturId = url[3]

  const anlieferungen = store.lieferungsFiltered.filter(
    (e) => e.nach_kultur_id === kulturId,
  )

  const artNodes = nodes.filter((n) => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, (n) => n.id === `art${artId}`)
  const kulturNodes = nodes.filter(
    (n) => n.parentId === `art${artId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    (n) => n.id === `art${artId}Kultur${kulturId}`,
  )

  return (
    anlieferungen
      // only show if parent node exists
      .filter(() =>
        openNodes.some((node) =>
          isEqual(
            ['Arten', artId, 'Kulturen', kulturId, 'An-Lieferungen'],
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
          menuTitle: 'Anlieferung',
          table: 'lieferung',
          id: `art${artId}Kultur${kulturId}Lieferung${el.id}`,
          parentId: `art${artId}Kultur${kulturId}AnLieferungFolder`,
          label,
          url: ['Arten', artId, 'Kulturen', kulturId, 'An-Lieferungen', el.id],
          hasChildren: false,
          mono: true,
        }
      })
      .map((el, index) => {
        el.sort = [1, artIndex, 2, kulturIndex, 3, index]
        return el
      })
  )
}
