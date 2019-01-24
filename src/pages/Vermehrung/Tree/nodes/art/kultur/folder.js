import findIndex from 'lodash/findIndex'

export default ({ url, nodes }) => {
  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${url[1]}`)

  return {
    nodeType: 'folder',
    menuType: 'artKulturenFolder',
    id: 'artKulturenFolder',
    urlLabel: 'Kulturen',
    label: 'Kulturen',
    url: ['Arten', url[1], 'Kulturen'],
    sort: [1, artIndex, 1],
    hasChildren: true,
  }
}
