import get from 'lodash/get'

export default ({ data, loading, store }) => {
  const kulturen = get(data, 'kultur', [])
  const nr = loading && !kulturen.length ? '...' : kulturen.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Kulturen',
      id: 'kulturFolder',
      label: `Kulturen (${nr})`,
      url: ['Kulturen'],
      sort: [7],
      hasChildren: true,
    },
  ]
}
