import get from 'lodash/get'
import moment from 'moment'

import exists from '../../../../utils/exists'

export default ({ nodes, data }) => {
  const lieferungen = get(data, 'lieferung') || []

  return (
    lieferungen
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('lieferungFolder'))
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
          id: `lieferung${el.id}`,
          parentId: 'lieferungFolder',
          label,
          url: ['Lieferungen', el.id],
          hasChildren: false,
          mono: true,
        }
      })
      .map((el, index) => {
        el.sort = [8, index]
        return el
      })
  )
}
