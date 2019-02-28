import get from 'lodash/get'

import filterNodes from '../../../../utils/filterNodes'

export default ({ data, loading, store }) => {
  const gaerten = filterNodes({
    rows: get(data, 'garten', []),
    filter: store.filter,
    table: 'garten',
  })
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
