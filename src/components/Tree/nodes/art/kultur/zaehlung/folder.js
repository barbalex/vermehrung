import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const artId = url[1]
  const kulturId = url[3]
  const arten = get(data, 'ae_art', [])
  const art = arten.find(a => a.id === artId)
  const kulturen = get(art, 'ae_art_art.kultursByartId', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const zaehlungen = get(kultur, 'zaehlungsBykulturId', [])
  const nr = loading ? '...' : zaehlungen.length

  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${artId}`)
  const kulturNodes = nodes.filter(
    n => n.parentId === `art${artId}KulturFolder`,
  )
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  return [
    {
      nodeType: 'folder',
      menuType: 'artKulturZaehlungFolder',
      id: `kultur${kulturId}ZaehlungFolder`,
      label: `Zählungen (${nr})`,
      url: ['Arten', artId, 'Kulturen', kulturId, 'Zaehlungen'],
      sort: [1, artIndex, 1, kulturIndex, 1],
      hasChildren: true,
    },
  ]
}
