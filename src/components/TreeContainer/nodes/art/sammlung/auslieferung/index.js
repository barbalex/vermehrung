import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

import exists from '../../../../../../utils/exists'

export default ({ nodes, data, url }) => {
  const artId = url[1]
  const sammlungId = url[3]

  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${artId}`)
  const sammlungNodes = nodes.filter(
    n => n.parentId === `art${artId}SammlungFolder`,
  )
  const sammlungIndex = findIndex(
    sammlungNodes,
    n => n.id === `art${artId}Sammlung${sammlungId}`,
  )

  const arten = get(data, 'art') || []
  const art = arten.find(a => a.id === artId)
  const sammlungen = get(art, 'sammlungs') || []
  const sammlung = sammlungen.find(s => s.id === sammlungId)
  const lieferungen = get(sammlung, 'lieferungs') || []

  return (
    lieferungen
      // only show if parent node exists
      .filter(() =>
        nodes
          .map(n => n.id)
          .includes(`art${artId}Sammlung${sammlungId}LieferungFolder`),
      )
      .map(el => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : 'kein Datum'
        const anz = exists(el.anzahl_pflanzen) ? el.anzahl_pflanzen : '_'
        const anzAb = exists(el.anzahl_auspflanzbereit)
          ? el.anzahl_auspflanzbereit
          : '_'
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
