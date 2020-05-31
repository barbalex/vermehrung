export default ({ store, loading }) => {
  const kulturen = store.kulturFiltered
  const nr = loading && !kulturen.length ? '...' : kulturen.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Kulturen',
      id: 'kulturFolder',
      label: `Kulturen (${nr})`,
      url: ['Kulturen'],
      sort: [5],
      hasChildren: true,
    },
  ]
}
