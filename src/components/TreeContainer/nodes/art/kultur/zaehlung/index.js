import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, data, url }) => {
  const artId = url[1]
  const kulturId = url[3]
  const arten = get(data, 'art') || []
  const art = arten.find(a => a.id === artId)
  const kulturen = get(art, 'kulturs') || []
  const kultur = kulturen.find(k => k.id === kulturId)
  const zaehlungen = get(kultur, 'zaehlungs') || []

  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${artId}`)
  const kulturNodes = nodes.filter(
    n => n.parentId === `art${artId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    n => n.id === `art${artId}Kultur${kulturId}`,
  )

  return (
    zaehlungen
      // only show if parent node exists
      .filter(() =>
        nodes
          .map(n => n.id)
          .includes(`art${artId}Kultur${kulturId}ZaehlungFolder`),
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
