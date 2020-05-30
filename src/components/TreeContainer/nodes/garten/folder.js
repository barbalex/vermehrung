export default ({ data, loading }) => {
  const gaerten = data?.garten ?? []
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
