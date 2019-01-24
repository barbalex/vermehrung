export default () => {
  return [
    {
      nodeType: 'folder',
      menuType: 'zaehleinheitenFolder',
      id: 'zaehleinheitenFolder',
      parentId: 'werteListenFolder',
      label: 'Zähleinheiten',
      url: ['Werte-Listen', 'Zaehleinheiten'],
      sort: [6, 2],
      hasChildren: true,
    },
  ]
}
