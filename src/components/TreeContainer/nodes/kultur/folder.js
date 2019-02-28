import get from 'lodash/get'

import filterNodes from '../../../../utils/filterNodes'

export default ({ data, loading, store }) => {
  const kulturen = filterNodes({
    rows: get(data, 'kultur', []),
    filter: store.filter,
    table: 'kultur',
  })
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
