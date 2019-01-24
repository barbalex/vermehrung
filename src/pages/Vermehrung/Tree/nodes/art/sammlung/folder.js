import findIndex from 'lodash/findIndex'

export default ({ url, nodes }) => {
  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${url[1]}`)

  return {
    nodeType: 'folder',
    menuType: 'artSammlungenFolder',
    id: `art${url[1]}SammlungenFolder`,
    label: 'Sammlungen',
    url: ['Arten', url[1], 'Sammlungen'],
    sort: [1, artIndex, 2],
    hasChildren: true,
  }
}
