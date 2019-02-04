import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../compareLabel'

export default ({ nodes, data, url }) => {
  const personId = url[1]
  const personen = get(data, 'person', [])
  const person = personen.find(p => p.id === personId)
  const lieferungen = get(person, 'lieferungsBypersonId', [])

  const personNodes = nodes.filter(n => n.parentId === 'personFolder')
  const personIndex = findIndex(personNodes, n => n.id === `person${personId}`)

  return (
    lieferungen
      // only show if parent node exists
      .filter(() =>
        nodes.map(n => n.id).includes(`person${personId}LieferungFolder`),
      )
      .map(el => {
        const label = `${get(el, 'von_datum', '(kein von-Datum)')}: ${get(
          el,
          'personBypersonId.name',
          '(kein Name)',
        )}; ${get(el, 'lieferungTypWerteBytyp.wert', '(kein Typ)')}; ${get(
          el,
          'lieferungStatusWerteBystatus.wert',
          '(kein Status)',
        )}`

        return {
          nodeType: 'table',
          menuTitle: 'Lieferung',
          filterTable: 'lieferung',
          id: `person${personId}Lieferung${el.id}`,
          parentId: `person${personId}LieferungFolder`,
          label,
          url: ['Personen', personId, 'Lieferungen', el.id],
          hasChildren: false,
        }
      })
      // sort by label
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [5, personIndex, 3, index]
        return el
      })
  )
}
