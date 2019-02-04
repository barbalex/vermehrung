import findIndex from 'lodash/findIndex'
import get from 'lodash/get'

export default ({ url, nodes, data, loading }) => {
  const artId = url[1]
  const kulturId = url[3]
  const arten = get(data, 'art', [])
  const art = arten.find(a => a.id === artId)
  const kulturen = get(art, 'kultursByartId', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const inventare = get(kultur, 'kulturInventarsBykulturId', [])
  const nr = loading && !inventare.length ? '...' : inventare.length

  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${artId}`)
  const kulturNodes = nodes.filter(
    n => n.parentId === `art${artId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    n => n.id === `art${artId}Kultur${kulturId}`,
  )

  return [
    {
      nodeType: 'folder',
      menuType: 'artKulturInventarFolder',
      id: `art${artId}Kultur${kulturId}InventarFolder`,
      label: `Inventare (${nr})`,
      url: ['Arten', artId, 'Kulturen', kulturId, 'Inventare'],
      sort: [1, artIndex, 1, kulturIndex, 5],
      hasChildren: true,
    },
  ]
}
