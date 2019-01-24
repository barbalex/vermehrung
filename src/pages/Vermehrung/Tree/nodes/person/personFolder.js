// @flow

export default () => {
  const index = 5

  return {
    nodeType: 'folder',
    menuType: 'personFolder',
    id: index,
    label: 'Personen',
    url: ['Personen'],
    sort: [index],
    hasChildren: true,
  }
}
