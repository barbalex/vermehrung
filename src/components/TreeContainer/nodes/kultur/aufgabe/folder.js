import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const kulturId = url[1]
  const kulturen = get(data, 'kultur', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const aufgaben = get(kultur, 'aufgaben', [])
  const nr = loading && !aufgaben.length ? '...' : aufgaben.length

  const kulturNodes = nodes.filter(n => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  // only return if parent exists
  if (!nodes.map(n => n.id).includes(`kultur${kulturId}`)) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Aufgaben',
      id: `kultur${kulturId}AufgabeFolder`,
      label: `Aufgaben (${nr})`,
      url: ['Kulturen', kulturId, 'Aufgaben'],
      sort: [5, kulturIndex, 5],
      hasChildren: true,
    },
  ]
}
