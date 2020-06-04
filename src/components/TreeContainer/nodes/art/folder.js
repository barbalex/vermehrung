export default ({ store }) => {
  const { loading, showArt } = store.tree
  const arten = store.artsFiltered
  const nr = loading && !arten.length ? '...' : arten.length

  if (!showArt) return []

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
