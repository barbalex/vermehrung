import isEqual from 'lodash/isEqual'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, store, url }) => {
  const { showArt, openNodes } = store.tree
  if (!showArt) return []
  const artId = url[1]
  const kulturId = url[3]
  const zaehlungen = store.zaehlungsFiltered.filter(
    (z) => z.kultur_id === kulturId,
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
    zaehlungen
      // only show if parent node exists
      .filter(() =>
        openNodes.some((node) =>
          isEqual(['Arten', artId, 'Kulturen', kulturId, 'Zaehlungen'], node),
        ),
      )
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
        const prognose = el.prognose ? ' (Prognose)' : ''
        const label = `${datum}: ${numbers}${prognose}`

        return {
          nodeType: 'table',
          menuTitle: 'Zählung',
          table: 'zaehlung',
          id: `art${artId}Kultur${kulturId}Zaehlung${el.id}`,
          parentId: `art${artId}Kultur${kulturId}ZaehlungFolder`,
          label,
          url: ['Arten', artId, 'Kulturen', kulturId, 'Zaehlungen', el.id],
          hasChildren: false,
          mono: true,
        }
      })
      .map((el, index) => {
        el.sort = [1, artIndex, 2, kulturIndex, 2, index]
        return el
      })
  )
}
