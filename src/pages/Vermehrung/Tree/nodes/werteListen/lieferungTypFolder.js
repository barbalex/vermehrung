// @flow

export default () => {
  return {
    nodeType: 'folder',
    menuType: 'lieferungTypFolder',
    id: 'lieferungTypFolder',
    parentId: 'werteListenFolder',
    urlLabel: 'Lieferung-Typ',
    label: 'Lieferung: Typ',
    url: ['Werte-Listen', 'Lieferung-Typ'],
    sort: [6, 3],
    hasChildren: true,
  }
}
