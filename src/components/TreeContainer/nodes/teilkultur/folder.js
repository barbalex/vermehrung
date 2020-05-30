export default ({ data, loading }) => {
  const teilkulturen = data?.teilkultur ?? []
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
    },
  ]
}
