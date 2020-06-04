export default ({ store }) => {
  const { loading, showHerkunft } = store.tree
  const herkuenfte = store.herkunftsFiltered
  const nr = loading && !herkuenfte.length ? '...' : herkuenfte.length

  if (!showHerkunft) return []

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
