export default ({ store, loading }) => {
  const herkuenfte = store.herkunftsFiltered
  const nr = loading && !herkuenfte.length ? '...' : herkuenfte.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Herkünfte',
      id: 'herkunftFolder',
      label: `Herkünfte (${nr})`,
      url: ['Herkuenfte'],
      sort: [2],
      hasChildren: true,
      childrenCount: nr,
    },
  ]
}
