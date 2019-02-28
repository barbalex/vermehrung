import get from 'lodash/get'

import filterNodes from '../../../../utils/filterNodes'

export default ({ data, loading, store }) => {
  const sammlungen = filterNodes({
    rows: get(data, 'sammlung', []),
    filter: store.filter,
    table: 'sammlung',
  })
  const nr = loading && !sammlungen.length ? '...' : sammlungen.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Sammlungen',
      id: 'sammlungFolder',
      label: `Sammlungen (${nr})`,
      url: ['Sammlungen'],
      sort: [6],
      hasChildren: true,
    },
  ]
}
