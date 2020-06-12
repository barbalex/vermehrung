export default ({ store }) => {
  const { initialDataQueried, artsFiltered } = store
  const { showArt } = store.tree
  const arten = artsFiltered
  const nr = !initialDataQueried && !arten.length ? '...' : arten.length

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
