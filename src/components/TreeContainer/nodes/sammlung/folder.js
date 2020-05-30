export default ({ data, loading }) => {
  const sammlungen = data?.sammlung ?? []
  const nr = loading && !sammlungen.length ? '...' : sammlungen.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Sammlungen',
      id: 'sammlungFolder',
      label: `Sammlungen (${nr})`,
      url: ['Sammlungen'],
      sort: [3],
      hasChildren: true,
    },
  ]
}
