import isEqual from 'lodash/isEqual'
import moment from 'moment'

export default ({ store }) => {
  const { showZaehlung, visibleOpenNodes } = store.tree

  if (!showZaehlung) return []

  return (
    store.zaehlungsFiltered
      // only show if parent node exists
      .filter(() =>
        visibleOpenNodes.some((node) => isEqual(['Zaehlungen'], node)),
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
          id: el.id,
          label,
          url: ['Zaehlungen', el.id],
          hasChildren: false,
          mono: true,
        }
      })
      .map((el, index) => {
        el.sort = [7, index]
        return el
      })
  )
}
