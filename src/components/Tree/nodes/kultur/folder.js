export default ({ store }) => {
  const { initialDataQueried } = store
  const { showKultur } = store.tree

  if (!showKultur) return []

  const kulturen = store.kultursFiltered
  const nr = !initialDataQueried && !kulturen.length ? '...' : kulturen.length

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
