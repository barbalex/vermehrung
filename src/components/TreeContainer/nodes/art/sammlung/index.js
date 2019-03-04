import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../compareLabel'
import filterNodes from '../../../../../utils/filterNodes'

export default ({ nodes, data, url, store }) => {
  const artId = url[1]
  const arten = filterNodes({
    rows: get(data, 'art', []),
    filter: store.filter,
    table: 'art',
  })
  const art = arten.find(a => a.id === artId)
  const sammlungen = get(art, 'sammlungsByartId', [])
  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${artId}`) || 0

  return (
    filterNodes({
      rows: sammlungen,
      filter: store.filter,
      table: 'sammlung',
    })
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes(`art${artId}SammlungFolder`))
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'Sammlung',
        table: 'sammlung',
        id: `art${artId}Sammlung${el.id}`,
        parentId: `art${artId}SammlungFolder`,
        label: `${get(el, 'datum') || '(kein Datum)'}: ${get(
          el,
          'herkunftByherkunftId.nr',
        ) || '(keine Nr.)'}`,
        url: ['Arten', artId, 'Sammlungen', el.id],
        hasChildren: true,
      }))
      .sort(compareLabel)
      .map((el, index) => ({ ...el, sort: [1, artIndex, 2, index] }))
  )
}
