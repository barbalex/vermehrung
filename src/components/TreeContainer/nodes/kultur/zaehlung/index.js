import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../compareLabel'
import filterNodes from '../../../../../utils/filterNodes'

export default ({ nodes, data, url, store }) => {
  const kulturId = url[1]
  const kulturen = filterNodes({
    rows: get(data, 'kultur', []),
    filter: store.filter,
    table: 'kultur',
  })
  const kultur = kulturen.find(k => k.id === kulturId)
  const zaehlungen = filterNodes({
    rows: get(kultur, 'zaehlungsBykulturId', []),
    filter: store.filter,
    table: 'zaehlung',
  })

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
        label: get(el, 'datum', '(kein Datum)'),
        url: ['Kulturen', kulturId, 'Zaehlungen', el.id],
        hasChildren: false,
      }))
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [7, kulturIndex, 1, index]
        return el
      })
  )
}
