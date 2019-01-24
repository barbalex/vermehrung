// @flow

export default () => {
  return {
    nodeType: 'folder',
    menuType: 'lieferungZwischenlagerFolder',
    id: 'lieferungZwischenlagerFolder',
    parentId: 'werteListenFolder',
    label: 'Lieferung: Zwischenlager',
    url: ['Werte-Listen', 'Lieferung-Zwischenlager'],
    sort: [6, 5],
    hasChildren: true,
  }
}
