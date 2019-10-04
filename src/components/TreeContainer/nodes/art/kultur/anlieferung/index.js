import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, data, url }) => {
  const artId = url[1]
  const kulturId = url[3]

  const arten = get(data, 'art', [])
  const art = arten.find(a => a.id === artId)
  const kulturen = get(art, 'kulturs', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const anlieferungen = get(kultur, 'lieferungsByNachKulturId', [])

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
    anlieferungen
      // only show if parent node exists
      .filter(() =>
        nodes
          .map(n => n.id)
          .includes(`art${artId}Kultur${kulturId}AnLieferungFolder`),
      )
      .map(el => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : 'kein Datum'
        const anz = get(el, 'anzahl_pflanzen') || '_'
        const anzAb = get(el, 'anzahl_auspflanzbereit') || '_'
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
