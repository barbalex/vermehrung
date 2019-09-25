import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const artId = url[1]
  const kulturId = url[3]
  const arten = get(data, 'art', [])
  const art = arten.find(a => a.id === artId)
  const kulturen = get(art, 'kulturs', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const zaehlungen = get(kultur, 'zaehlungs', [])
  const nr = loading && !zaehlungen.length ? '...' : zaehlungen.length

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
      menuTitle: 'Zählungen',
      id: `art${artId}Kultur${kulturId}ZaehlungFolder`,
      label: `Zählungen (${nr})`,
      url: ['Arten', artId, 'Kulturen', kulturId, 'Zaehlungen'],
      sort: [1, artIndex, 2, kulturIndex, 2],
      hasChildren: true,
    },
  ]
}
