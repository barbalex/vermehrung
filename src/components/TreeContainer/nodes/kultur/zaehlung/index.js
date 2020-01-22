import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, data, url }) => {
  const kulturId = url[1]
  const kulturen = get(data, 'kultur') || []
  const kultur = kulturen.find(k => k.id === kulturId)
  const zaehlungen = get(kultur, 'zaehlungs') || []

  const kulturNodes = nodes.filter(n => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  return (
    zaehlungen
      // only show if parent node exists
      .filter(() =>
        nodes.map(n => n.id).includes(`kultur${kulturId}ZaehlungFolder`),
      )
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
        const prognose = el.prognose ? ' (Prognose)' : ''
        const label = `${datum}: ${numbers}${prognose}`

        return {
          nodeType: 'table',
          menuTitle: 'Zählung',
          table: 'zaehlung',
          id: `kultur${kulturId}Zaehlung${el.id}`,
          parentId: `kultur${kulturId}ZaehlungFolder`,
          label,
          url: ['Kulturen', kulturId, 'Zaehlungen', el.id],
          hasChildren: false,
          mono: true,
        }
      })
      .map((el, index) => {
        el.sort = [5, kulturIndex, 2, index]
        return el
      })
  )
}
