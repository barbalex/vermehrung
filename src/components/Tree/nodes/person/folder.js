export default ({ store }) => {
  const { initialDataQueried } = store
  const { showPerson } = store.tree

  if (!showPerson) return []

  const personen = store.personsFiltered
  const nr = !initialDataQueried && !personen.length ? '...' : personen.length

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
