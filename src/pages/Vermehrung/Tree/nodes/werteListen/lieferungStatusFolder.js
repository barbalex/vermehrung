// @flow

export default () => {
  return {
    nodeType: 'folder',
    menuType: 'lieferungStatusFolder',
    id: 'lieferungStatusFolder',
    parentId: 'werteListenFolder',
    urlLabel: 'Lieferung-Status',
    label: 'Lieferung: Status',
    url: ['Werte-Listen', 'Lieferung-Status'],
    sort: [6, 4],
    hasChildren: true,
  }
}
