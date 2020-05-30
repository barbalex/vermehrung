export default ({ data, loading }) => {
  const arten = data?.art ?? []
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
    },
  ]
}
