export default () => {
  return [
    {
      nodeType: 'folder',
      menuType: 'masseinheitenFolder',
      id: 'masseinheitenFolder',
      parentId: 'werteListenFolder',
      label: 'Masseinheiten',
      url: ['Werte-Listen', 'Masseinheiten'],
      sort: [6, 1],
      hasChildren: true,
    },
  ]
}
