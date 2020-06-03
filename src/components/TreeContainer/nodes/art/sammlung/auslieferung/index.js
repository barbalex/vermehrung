import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, store, url }) => {
  if (!store.tree.showArt) return []
  const artId = url[1]
  const sammlungId = url[3]

  const artNodes = nodes.filter((n) => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, (n) => n.id === `art${artId}`)
  const sammlungNodes = nodes.filter(
    (n) => n.parentId === `art${artId}SammlungFolder`,
  )
  const sammlungIndex = findIndex(
    sammlungNodes,
    (n) => n.id === `art${artId}Sammlung${sammlungId}`,
  )

  const lieferungen = store.lieferungsFiltered.filter(
    (l) => l.von_sammlung_id === sammlungId,
  )

  return (
    lieferungen
      // only show if parent node exists
      .filter(() =>
        nodes
          .map((n) => n.id)
          .includes(`art${artId}Sammlung${sammlungId}LieferungFolder`),
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
          id: `art${artId}Sammlung${sammlungId}Lieferung${el.id}`,
          parentId: `art${artId}Sammlung${sammlungId}LieferungFolder`,
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
}
