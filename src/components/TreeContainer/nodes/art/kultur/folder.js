import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${url[1]}`)

  const arten = get(data, 'art', [])
  const art = arten.find(a => a.id === url[1])
  const kulturen = get(art, 'ae_art_art.kultursByartId', [])
  const nr = loading && !kulturen.length ? '...' : kulturen.length

  return [
    {
      nodeType: 'folder',
      menuType: 'artKulturenFolder',
      id: `art${url[1]}KulturFolder`,
      label: `Kulturen (${nr})`,
      url: ['Arten', url[1], 'Kulturen'],
      sort: [1, artIndex, 1],
      hasChildren: true,
    },
  ]
}
