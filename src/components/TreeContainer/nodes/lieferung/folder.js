export default ({ store, loading }) => {
  const lieferungen = store.lieferungFiltered
  const nr = loading && !lieferungen.length ? '...' : lieferungen.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Lieferungen',
      id: 'lieferungFolder',
      label: `Lieferungen (${nr})`,
      url: ['Lieferungen'],
      sort: [8],
      hasChildren: true,
    },
  ]
}
