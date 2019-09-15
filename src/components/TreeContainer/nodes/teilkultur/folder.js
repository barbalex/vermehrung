import get from 'lodash/get'

export default ({ data, loading }) => {
  const teilkulturen = get(data, 'teilkultur', [])
  const nr = loading && !teilkulturen.length ? '...' : teilkulturen.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Teilkulturen',
      id: 'teilkulturFolder',
      label: `Teilkulturen (${nr})`,
      url: ['Teilkulturen'],
      sort: [7],
      hasChildren: true,
    },
  ]
}
