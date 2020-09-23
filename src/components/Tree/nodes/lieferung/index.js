import isEqual from 'lodash/isEqual'
import { DateTime } from 'luxon'

export default ({ store }) => {
  const { showLieferung, visibleOpenNodes } = store.tree

  if (!showLieferung) return []
  const lieferungen = store.lieferungsFiltered

  return (
    lieferungen
      // only show if parent node exists
      .filter(() =>
        visibleOpenNodes.some((node) => isEqual(['Lieferungen'], node)),
      )
      .map((el) => {
        const datum = el.datum
          ? DateTime.fromSQL(el.datum).toFormat('yyyy.LL.dd')
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
          menuTitle: 'Lieferung',
          table: 'lieferung',
          id: el.id,
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
