export default ({ data, loading }) => {
  const kulturen = data?.kultur ?? []
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
