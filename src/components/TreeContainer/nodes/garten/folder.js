export default ({ loading, store }) => {
  const gaerten = store.gartenFiltered
  const nr = loading && !gaerten.length ? '...' : gaerten.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Gärten',
      id: 'gartenFolder',
      label: `Gärten (${nr})`,
      url: ['Gaerten'],
      sort: [4],
      hasChildren: true,
    },
  ]
}
