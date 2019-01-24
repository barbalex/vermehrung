// @flow

export default () => {
  const index = 3

  return {
    nodeType: 'folder',
    menuType: 'herkunftFolder',
    id: index,
    label: 'Herkünfte',
    url: ['Herkuenfte'],
    sort: [index],
    hasChildren: true,
  }
}
