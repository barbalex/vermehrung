import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, data, url }) => {
  const kulturId = url[1]
  const kulturen = data?.kultur ?? []
  const kultur = kulturen.find((k) => k.id === kulturId)
  const anlieferungen = kultur?.lieferungsByNachKulturId ?? []

  const kulturNodes = nodes.filter((n) => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(
    kulturNodes,
    (n) => n.id === `kultur${kulturId}`,
  )

  return (
    anlieferungen
      // only show if parent node exists
      .filter(() =>
        nodes.map((n) => n.id).includes(`kultur${kulturId}AnLieferungFolder`),
      )
      .map((el) => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : 'kein Datum'
        const anz = el.anzahl_pflanzen ?? '_'
        const anzAb = el.anzahl_auspflanzbereit ?? '_'
        const numbers = `${anz
          .toString()
          .padStart(3, '_')}/${anzAb.toString().padStart(3, '_')}`
        const geplant = el.geplant ? ' (geplant)' : ''
        const label = `${datum}: ${numbers}${geplant}`

        return {
          nodeType: 'table',
          menuTitle: 'An-Lieferung',
          table: 'lieferung',
          id: `kultur${kulturId}Lieferung${el.id}`,
          parentId: `kultur${kulturId}AnLieferungFolder`,
          label,
          url: ['Kulturen', kulturId, 'An-Lieferungen', el.id],
          hasChildren: false,
          mono: true,
        }
      })
      .map((el, index) => {
        el.sort = [5, kulturIndex, 3, index]
        return el
      })
  )
}
