export default ({ store }) => {
  const arten = store.artsFiltered
  const nr = store.tree.loading && !arten.length ? '...' : arten.length

  if (!store.tree.showArt) return []

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
