import get from 'lodash/get'

export default ({ data, loading, store }) => {
  const gaerten = get(data, 'garten', [])
  const nr = loading && !gaerten.length ? '...' : gaerten.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Gärten',
      id: 'gartenFolder',
      label: `Gärten (${nr})`,
      url: ['Gaerten'],
      sort: [2],
      hasChildren: true,
    },
  ]
}
