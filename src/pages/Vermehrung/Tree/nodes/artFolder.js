// @flow

export default () => {
  const index = 1

  return {
    nodeType: 'folder',
    menuType: 'artFolder',
    id: index,
    urlLabel: 'Arten',
    label: 'Arten',
    url: ['Arten'],
    sort: [index],
    hasChildren: true,
  }
}
