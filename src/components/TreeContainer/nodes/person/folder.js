export default ({ data, loading }) => {
  const personen = data?.person ?? []
  const nr = loading && !personen.length ? '...' : personen.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Personen',
      id: 'personFolder',
      label: `Personen (${nr})`,
      url: ['Personen'],
      sort: [11],
      hasChildren: true,
    },
  ]
}
