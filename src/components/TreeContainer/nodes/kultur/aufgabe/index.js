import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, data, url }) => {
  const kulturId = url[1]
  const kulturen = get(data, 'kultur', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const aufgaben = get(kultur, 'aufgaben', [])

  const kulturNodes = nodes.filter(n => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  return (
    aufgaben
      // only show if parent node exists
      .filter(() =>
        nodes.map(n => n.id).includes(`kultur${kulturId}AufgabeFolder`),
      )
      .map(el => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : null
        const aufgabe = get(el, 'aufgabe') || '(nicht beschrieben)'
        const label = datum ? `${aufgabe} (${datum})` : aufgabe

        return {
          nodeType: 'table',
          menuTitle: 'Aufgabe',
          table: 'aufgabe',
          id: `kultur${kulturId}Aufgabe${el.id}`,
          parentId: `kultur${kulturId}AufgabeFolder`,
          label,
          url: ['Kulturen', kulturId, 'Aufgaben', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [5, kulturIndex, 3, index]
        return el
      })
  )
}
