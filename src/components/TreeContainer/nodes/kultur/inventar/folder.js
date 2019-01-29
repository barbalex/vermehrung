import findIndex from 'lodash/findIndex'
import get from 'lodash/get'

export default ({ url, nodes, data, loading }) => {
  const kulturId = url[1]
  const kulturen = get(data, 'kultur', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const inventare = get(kultur, 'kulturInventarsBykulturId', [])
  const nr = loading && !inventare.length ? '...' : inventare.length

  const kulturNodes = nodes.filter(n => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  return [
    {
      nodeType: 'folder',
      menuType: 'artKulturInventarFolder',
      id: `kultur${kulturId}InventarFolder`,
      label: `Inventare (${nr})`,
      url: ['Kulturen', kulturId, 'Inventare'],
      sort: [7, kulturIndex, 5],
      hasChildren: true,
    },
  ]
}
