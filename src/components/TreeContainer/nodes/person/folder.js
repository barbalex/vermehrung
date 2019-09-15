import get from 'lodash/get'

export default ({ data, loading }) => {
  const personen = get(data, 'person', [])
  const nr = loading && !personen.length ? '...' : personen.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Personen',
      id: 'personFolder',
      label: `Personen (${nr})`,
      url: ['Personen'],
      sort: [8],
      hasChildren: true,
    },
  ]
}
