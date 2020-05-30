export default ({ data, loading }) => {
  const zaehlungen = data?.zaehlung ?? []
  const nr = loading && !zaehlungen.length ? '...' : zaehlungen.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Zählungen',
      id: 'zaehlungFolder',
      label: `Zählungen (${nr})`,
      url: ['Zaehlungen'],
      sort: [7],
      hasChildren: true,
    },
  ]
}
