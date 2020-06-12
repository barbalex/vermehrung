export default ({ store }) => {
  const { initialDataQueried } = store
  const { showLieferung } = store.tree

  if (!showLieferung) return []

  const lieferungen = store.lieferungsFiltered
  const nr =
    !initialDataQueried && !lieferungen.length ? '...' : lieferungen.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Lieferungen',
      id: 'lieferungFolder',
      label: `Lieferungen (${nr})`,
      url: ['Lieferungen'],
      sort: [8],
      hasChildren: true,
      childrenCount: nr,
    },
  ]
}
