import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ nodes, data, url }) => {
  const kulturId = url[1]
  const kulturen = get(data, 'kultur', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const zaehlungen = get(kultur, 'zaehlungs', [])

  const kulturNodes = nodes.filter(n => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  return (
    zaehlungen
      // only show if parent node exists
      .filter(() =>
        nodes.map(n => n.id).includes(`kultur${kulturId}ZaehlungFolder`),
      )
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'Zählung',
        table: 'zaehlung',
        id: `kultur${kulturId}Zaehlung${el.id}`,
        parentId: `kultur${kulturId}ZaehlungFolder`,
        label: get(el, 'datum') || '(kein Datum)',
        url: ['Kulturen', kulturId, 'Zaehlungen', el.id],
        hasChildren: false,
      }))
      .map((el, index) => {
        el.sort = [5, kulturIndex, 2, index]
        return el
      })
  )
}
