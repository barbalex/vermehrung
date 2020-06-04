export default ({ store }) => {
  const { loading, showGarten } = store.tree
  const gaerten = store.gartensFiltered
  const nr = loading && !gaerten.length ? '...' : gaerten.length

  if (!showGarten) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Gärten',
      id: 'gartenFolder',
      label: `Gärten (${nr})`,
      url: ['Gaerten'],
      sort: [4],
      hasChildren: true,
      childrenCount: nr,
    },
  ]
}
