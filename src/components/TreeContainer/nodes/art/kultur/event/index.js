import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../../compareLabel'
import filterNodes from '../../../../../../utils/filterNodes'

export default ({ nodes, data, url, store }) => {
  const artId = url[1]
  const kulturId = url[3]
  const arten = get(data, 'art', [])
  const art = arten.find(a => a.id === artId)
  const kulturen = get(art, 'kultursByartId', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const events = get(kultur, 'kulturEventsBykulturId', [])

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
    events
      // only show if parent node exists
      .filter(() =>
        nodes
          .map(n => n.id)
          .includes(`art${artId}Kultur${kulturId}EventFolder`),
      )
      .map(el => {
        const label = `${get(el, 'datum', '(kein Datum)')}: ${get(
          el,
          'event',
          '(kein Event)',
        )}`

        return {
          nodeType: 'table',
          menuTitle: 'Event',
          table: 'event',
          id: `art${artId}Kultur${kulturId}Event${el.id}`,
          parentId: `art${artId}Kultur${kulturId}EventFolder`,
          label,
          url: ['Arten', artId, 'Kulturen', kulturId, 'Events', el.id],
          hasChildren: false,
        }
      })
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [1, artIndex, 1, kulturIndex, 4, index]
        return el
      })
  )
}
