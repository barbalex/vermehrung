// @flow

export default () => {
  const index = 6

  return {
    nodeType: 'folder',
    menuType: 'werteListenFolder',
    id: index,
    urlLabel: 'PersonWerte-Listenen',
    label: 'Werte-Listen',
    url: ['Werte-Listen'],
    sort: [index],
    hasChildren: true,
  }
}
