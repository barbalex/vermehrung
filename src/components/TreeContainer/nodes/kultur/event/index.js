import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../compareLabel'

export default ({ nodes, data, url }) => {
  const kulturId = url[1]
  const kulturen = get(data, 'kultur', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const events = get(kultur, 'kulturEventsBykulturId', [])

  const kulturNodes = nodes.filter(n => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  return (
    events
      // only show if parent node exists
      .filter(() =>
        nodes.map(n => n.id).includes(`kultur${kulturId}EventFolder`),
      )
      .map(el => {
        const label = `${get(el, 'datum', '(kein Datum)')}: ${get(
          el,
          'event',
          '(kein Event)',
        )}`

        return {
          nodeType: 'table',
          menuType: 'event',
          filterTable: 'event',
          id: `kultur${kulturId}Event${el.id}`,
          parentId: `kultur${kulturId}EventFolder`,
          label,
          url: ['Kulturen', kulturId, 'Events', el.id],
          hasChildren: false,
        }
      })
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [7, kulturIndex, 4, index]
        return el
      })
  )
}
