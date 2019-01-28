import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${url[1]}`)

  const arten = get(data, 'ae_art', [])
  const art = arten.find(a => a.id === url[1])
  const sammlungen = get(art, 'ae_art_art.sammlungsByartId', [])
  const nr = loading ? '...' : sammlungen.length

  return [
    {
      nodeType: 'folder',
      menuType: 'artSammlungFolder',
      id: `art${url[1]}SammlungFolder`,
      label: `Sammlungen (${nr})`,
      url: ['Arten', url[1], 'Sammlungen'],
      sort: [5, artIndex, 2],
      hasChildren: true,
    },
  ]
}
