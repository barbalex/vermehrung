export default ({ store }) => {
  const { loading, showPerson } = store.tree

  if (!showPerson) return []

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
      childrenCount: nr,
    },
  ]
}
