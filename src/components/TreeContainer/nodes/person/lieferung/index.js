import moment from 'moment'

import exists from '../../../../../utils/exists'

export default ({ store }) => {
  const { showPerson, visibleOpenNodes, personPerson } = store.tree
  if (!showPerson) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 3 && node[0] === 'Personen' && node[2] === 'Lieferungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const personId = node[1]
    const personIndex = personPerson.findIndex((a) => a.id === personId)

    const lieferungen = store.lieferungsFiltered.filter(
      (s) => s.person_id === personId,
    )

    return lieferungen
      .map((el) => {
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
          id: el.id,
          label,
          url: ['Personen', personId, 'Lieferungen', el.id],
          hasChildren: false,
          mono: true,
        }
      })
      .map((el, index) => {
        el.sort = [11, personIndex, 3, index]
        return el
      })
  })
}
