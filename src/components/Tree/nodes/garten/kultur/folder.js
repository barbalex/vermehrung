import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const gartenNodes = nodes.filter(n => n.parentId === 'gartenFolder')
  const gartenIndex = findIndex(gartenNodes, n => n.id === `garten${url[1]}`)

  const gaerten = get(data, 'garten', [])
  const garten = gaerten.find(a => a.id === url[1])
  const kulturen = get(garten, 'kultursBygartenId', [])
  const nr = loading ? '...' : kulturen.length

  return [
    {
      nodeType: 'folder',
      menuType: 'artKulturenFolder',
      id: `garten${url[1]}KulturFolder`,
      label: `Kulturen (${nr})`,
      url: ['Gaerten', url[1], 'Kulturen'],
      sort: [2, gartenIndex, 1],
      hasChildren: true,
    },
  ]
}
