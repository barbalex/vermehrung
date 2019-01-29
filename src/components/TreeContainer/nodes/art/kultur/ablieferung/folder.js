import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const artId = url[1]
  const kulturId = url[3]
  const arten = get(data, 'art', [])
  const art = arten.find(a => a.id === artId)
  const kulturen = get(art, 'kultursByartId', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const ablieferungen = get(kultur, 'lieferungsByvonKulturId', [])
  const nr = loading && !ablieferungen.length ? '...' : ablieferungen.length

  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${artId}`)
  const kulturNodes = nodes.filter(
    n => n.parentId === `art${artId}KulturFolder`,
  )
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  return [
    {
      nodeType: 'folder',
      menuType: 'artKulturAbLieferungFolder',
      id: `kultur${kulturId}AbLieferungFolder`,
      label: `Ab-Lieferungen (${nr})`,
      url: ['Arten', artId, 'Kulturen', kulturId, 'Ab-Lieferungen'],
      sort: [1, artIndex, 1, kulturIndex, 3],
      hasChildren: true,
    },
  ]
}
