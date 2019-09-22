import get from 'lodash/get'
import moment from 'moment'

export default ({ nodes, data }) => {
  const zaehlungen = get(data, 'zaehlung', [])

  return (
    zaehlungen
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('zaehlungFolder'))
      .map(el => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : 'kein Datum'
        const anz =
          get(el, 'teilzaehlungs_aggregate.aggregate.sum.anzahl_pflanzen') ||
          '-'
        const anzAb =
          get(
            el,
            'teilzaehlungs_aggregate.aggregate.sum.anzahl_auspflanzbereit',
          ) || '-'
        const anzMu =
          get(
            el,
            'teilzaehlungs_aggregate.aggregate.sum.anzahl_mutterpflanzen',
          ) || '-'
        const numbers = `${anz
          .toString()
          .padStart(3, '\u00A0')}/${anzAb
          .toString()
          .padStart(3, '\u00A0')}/${anzMu.toString().padStart(3, '\u00A0')}`
        const geplant = el.geplant ? ' geplant' : ''
        const label = `${datum}: ${numbers}${geplant}`

        return {
          nodeType: 'table',
          menuTitle: 'Zählung',
          table: 'zaehlung',
          id: `zaehlung${el.id}`,
          parentId: 'zaehlungFolder',
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
