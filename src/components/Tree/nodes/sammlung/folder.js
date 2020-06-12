export default ({ store }) => {
  const { loading, showSammlung } = store.tree

  if (!showSammlung) return []

  const sammlungen = store.sammlungsFiltered
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
      childrenCount: nr,
    },
  ]
}
