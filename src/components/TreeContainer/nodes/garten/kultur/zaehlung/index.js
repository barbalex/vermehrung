import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, store, url }) => {
  const gartenId = url[1]
  const kulturId = url[3]
  const zaehlungen = store.zaehlungFiltered.filter(
    (z) => z.kultur_id === kulturId,
  )

  const gartenNodes = nodes.filter((n) => n.parentId === 'gartenFolder')
  const gartenIndex = findIndex(
    gartenNodes,
    (n) => n.id === `garten${gartenId}`,
  )
  const kulturNodes = nodes.filter(
    (n) => n.parentId === `garten${gartenId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    (n) => n.id === `garten${gartenId}Kultur${kulturId}`,
  )

  return (
    zaehlungen
      // only show if parent node exists
      .filter(() =>
        nodes
          .map((n) => n.id)
          .includes(`garten${gartenId}Kultur${kulturId}ZaehlungFolder`),
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
          id: `garten${gartenId}Kultur${kulturId}Zaehlung${el.id}`,
          parentId: `kultur${kulturId}ZaehlungFolder`,
          label,
          url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Zaehlungen', el.id],
          hasChildren: false,
          mono: true,
        }
      })
      .map((el, index) => {
        el.sort = [4, gartenIndex, 1, kulturIndex, 2, index]
        return el
      })
  )
}
