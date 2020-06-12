export default ({ store }) => {
  const { loading, showTeilkultur } = store.tree

  if (!showTeilkultur) return []

  const teilkulturen = store.teilkultursFiltered
  /*.filter(t =>
    get(t, 'kultur.kultur_option.tk'),
  )*/
  if (!teilkulturen.length) return []
  const nr = loading && !teilkulturen.length ? '...' : teilkulturen.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Teilkulturen',
      id: 'teilkulturFolder',
      label: `Teilkulturen (${nr})`,
      url: ['Teilkulturen'],
      sort: [6],
      hasChildren: true,
      childrenCount: nr,
    },
  ]
}
