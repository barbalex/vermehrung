import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const artId = url[1]
  const kulturId = url[3]
  const arten = get(data, 'art', [])
  const art = arten.find(a => a.id === artId)
  const kulturen = get(art, 'kulturs', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const aufgaben = get(kultur, 'aufgaben', [])
  const nr = loading && !aufgaben.length ? '...' : aufgaben.length

  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${artId}`)
  const kulturNodes = nodes.filter(
    n => n.parentId === `art${artId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    n => n.id === `art${artId}Kultur${kulturId}`,
  )

  // only return if parent exists
  if (!nodes.map(n => n.id).includes(`art${artId}Kultur${kulturId}`)) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Aufgaben',
      id: `art${artId}Kultur${kulturId}AufgabeFolder`,
      label: `Aufgaben (${nr})`,
      url: ['Arten', artId, 'Kulturen', kulturId, 'Aufgaben'],
      sort: [1, artIndex, 1, kulturIndex, 4],
      hasChildren: true,
    },
  ]
}
