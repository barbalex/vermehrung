export default ({ store }) => {
  const { loading, showKultur } = store.tree

  if (!showKultur) return []

  const kulturen = store.kultursFiltered
  const nr = loading && !kulturen.length ? '...' : kulturen.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Kulturen',
      id: 'kulturFolder',
      label: `Kulturen (${nr})`,
      url: ['Kulturen'],
      sort: [5],
      hasChildren: true,
      childrenCount: nr,
    },
  ]
}
