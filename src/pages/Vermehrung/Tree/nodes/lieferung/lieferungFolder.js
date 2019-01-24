// @flow

export default () => {
  const index = 4

  return {
    nodeType: 'folder',
    menuType: 'lieferungFolder',
    id: index,
    label: 'Lieferungen',
    url: ['Lieferungen'],
    sort: [index],
    hasChildren: true,
  }
}
