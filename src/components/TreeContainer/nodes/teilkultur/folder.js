import get from 'lodash/get'

export default ({ data, loading }) => {
  const teilkulturen = get(data, 'teilkultur', []).filter(t =>
    get(t, 'kultur.kultur_felder.tk'),
  )
  const nr = loading && !teilkulturen.length ? '...' : teilkulturen.length

  if (!teilkulturen.length) return []

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
