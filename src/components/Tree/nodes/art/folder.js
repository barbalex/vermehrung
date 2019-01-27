import get from 'lodash/get'

export default ({ data, loading }) => {
  const arten = get(data, 'ae_art', [])
  const nr = loading ? '...' : arten.length

  return [
    {
      nodeType: 'folder',
      menuType: 'artFolder',
      id: 'artFolder',
      label: `Arten (${nr})`,
      url: ['Arten'],
      sort: [1],
      hasChildren: true,
    },
  ]
}
