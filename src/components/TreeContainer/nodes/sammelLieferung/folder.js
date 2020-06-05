export default ({ store }) => {
  const { loading, showSammelLieferung } = store.tree

  if (!showSammelLieferung) return []

  const sammelLieferungen = store.sammelLieferungsFiltered
  const nr =
    loading && !sammelLieferungen.length ? '...' : sammelLieferungen.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Sammel-Lieferungen',
      id: 'sammelLieferungFolder',
      label: `Sammel-Lieferungen (${nr})`,
      url: ['Sammel-Lieferungen'],
      sort: [9],
      hasChildren: true,
      childrenCount: nr,
    },
  ]
}
