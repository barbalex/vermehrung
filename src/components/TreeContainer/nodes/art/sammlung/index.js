import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, data, url }) => {
  const artId = url[1]
  const arten = get(data, 'art', [])
  const art = arten.find(a => a.id === artId)
  const sammlungen = get(art, 'sammlungsByartId', [])
  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${artId}`) || 0

  return (
    sammlungen
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes(`art${artId}SammlungFolder`))
      .map(el => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : '(kein Datum)'

        return {
          nodeType: 'table',
          menuTitle: 'Sammlung',
          table: 'sammlung',
          id: `art${artId}Sammlung${el.id}`,
          parentId: `art${artId}SammlungFolder`,
          label: `${datum}: ${get(el, 'herkunftByherkunftId.nr') ||
            '(keine Nr.)'}`,
          url: ['Arten', artId, 'Sammlungen', el.id],
          hasChildren: true,
        }
      })
      .map((el, index) => ({ ...el, sort: [1, artIndex, 2, index] }))
  )
}
