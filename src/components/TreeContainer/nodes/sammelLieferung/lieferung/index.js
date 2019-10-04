import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, data, url }) => {
  const sammelLieferungId = url[1]
  const sammelLieferungen = get(data, 'sammel_lieferung', [])
  const sammelLieferung = sammelLieferungen.find(
    k => k.id === sammelLieferungId,
  )
  const lieferungen = get(sammelLieferung, 'lieferungs', [])

  const sammelLieferungNodes = nodes.filter(
    n => n.parentId === `sammelLieferungFolder`,
  )
  const sammelLieferungIndex = findIndex(
    sammelLieferungNodes,
    n => n.id === `sammelLieferung${sammelLieferungId}`,
  )

  return (
    lieferungen
      // only show if parent node exists
      .filter(() =>
        nodes
          .map(n => n.id)
          .includes(`sammelLieferung${sammelLieferungId}LieferungFolder`),
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
          menuTitle: 'Lieferung',
          table: 'lieferung',
          id: `sammelLieferung${sammelLieferungId}Lieferung${el.id}`,
          parentId: `sammelLieferung${sammelLieferungId}LieferungFolder`,
          label,
          url: ['Sammel-Lieferungen', sammelLieferungId, 'Lieferungen', el.id],
          hasChildren: false,
          mono: true,
        }
      })
      .map((el, index) => {
        el.sort = [9, sammelLieferungIndex, 3, index]
        return el
      })
  )
}
