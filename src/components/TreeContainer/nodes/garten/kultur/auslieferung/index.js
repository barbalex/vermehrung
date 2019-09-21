import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, data, url }) => {
  const gartenId = url[1]
  const kulturId = url[3]
  const gaerten = get(data, 'garten', [])
  const garten = gaerten.find(a => a.id === gartenId)
  const kulturen = get(garten, 'kulturs', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const auslieferungen = get(kultur, 'lieferungsByVonKulturId', [])

  const gartenNodes = nodes.filter(n => n.parentId === 'gartenFolder')
  const gartenIndex = findIndex(gartenNodes, n => n.id === `garten${gartenId}`)
  const kulturNodes = nodes.filter(
    n => n.parentId === `garten${gartenId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    n => n.id === `garten${gartenId}Kultur${kulturId}`,
  )

  return (
    auslieferungen
      // only show if parent node exists
      .filter(() =>
        nodes
          .map(n => n.id)
          .includes(`garten${gartenId}Kultur${kulturId}AusLieferungFolder`),
      )
      .map(el => {
        const nach_datum = el.nach_datum
          ? moment(el.nach_datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : '(kein von-Datum)'

        const label = `${nach_datum}: ${get(el, 'person.name') ||
          '(kein Name)'}`

        return {
          nodeType: 'table',
          menuTitle: 'Aus-Lieferung',
          table: 'lieferung',
          id: `garten${gartenId}Kultur${kulturId}Lieferung${el.id}`,
          parentId: `garten${gartenId}Kultur${kulturId}AusLieferungFolder`,
          label,
          url: [
            'Gaerten',
            gartenId,
            'Kulturen',
            kulturId,
            'Aus-Lieferungen',
            el.id,
          ],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [4, gartenIndex, 1, kulturIndex, 3, index]
        return el
      })
  )
}
