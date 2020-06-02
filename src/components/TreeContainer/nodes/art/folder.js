export default ({ loading, store }) => {
  const arten = store.artsFiltered
  const nr = loading && !arten.length ? '...' : arten.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Arten',
      id: 'artFolder',
      label: `Arten (${nr})`,
      url: ['Arten'],
      sort: [1],
      hasChildren: true,
      childrenCount: nr,
    },
  ]
}
