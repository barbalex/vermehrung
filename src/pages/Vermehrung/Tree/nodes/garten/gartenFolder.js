// @flow

export default () => {
  const index = 2

  return {
    nodeType: 'folder',
    menuType: 'gartenFolder',
    id: index,
    label: 'Gärten',
    url: ['Gaerten'],
    sort: [index],
    hasChildren: true,
  }
}
