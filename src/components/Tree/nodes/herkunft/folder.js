export default ({ store }) => {
  const { initialDataQueried } = store
  const { showHerkunft } = store.tree
  const herkuenfte = store.herkunftsFiltered
  const nr =
    !initialDataQueried && !herkuenfte.length ? '...' : herkuenfte.length

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
