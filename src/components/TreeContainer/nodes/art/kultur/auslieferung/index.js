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
  const auslieferungen = get(kultur, 'lieferungsByVonKulturId', [])

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
    auslieferungen
      // only show if parent node exists
      .filter(() =>
        nodes
          .map(n => n.id)
          .includes(`art${artId}Kultur${kulturId}AusLieferungFolder`),
      )
      .map(el => {
        const von_datum = el.von_datum
          ? moment(el.von_datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : '(kein von-Datum)'

        const label = `${von_datum}: ${get(el, 'person.name') || '(kein Name)'}`

        return {
          nodeType: 'table',
          menuTitle: 'Auslieferung',
          table: 'lieferung',
          id: `art${artId}Kultur${kulturId}Lieferung${el.id}`,
          parentId: `art${artId}Kultur${kulturId}AusLieferungFolder`,
          label,
          url: ['Arten', artId, 'Kulturen', kulturId, 'Aus-Lieferungen', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [1, artIndex, 1, kulturIndex, 3, index]
        return el
      })
  )
}
