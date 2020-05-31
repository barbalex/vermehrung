export default ({ store, loading }) => {
  const zaehlungen = store.zaehlungFiltered
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
