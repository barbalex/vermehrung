export default ({ store, loading }) => {
  const personen = store.personsFiltered
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
