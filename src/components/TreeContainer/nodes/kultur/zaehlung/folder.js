import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const kulturId = url[1]

  const kulturen = get(data, 'kultur', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const zaehlungen = get(kultur, 'zaehlungsBykulturId', [])
  const nr = loading && !zaehlungen.length ? '...' : zaehlungen.length

  const kulturNodes = nodes.filter(n => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  // only return if parent exists
  if (!nodes.map(n => n.id).includes(`kultur${kulturId}`)) return []

  return [
    {
      nodeType: 'folder',
      menuType: 'kulturZaehlungFolder',
      id: `kultur${kulturId}ZaehlungFolder`,
      label: `Zählungen (${nr})`,
      url: ['Kulturen', kulturId, 'Zaehlungen'],
      sort: [7, kulturIndex, 1],
      hasChildren: true,
    },
  ]
}
