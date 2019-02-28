import get from 'lodash/get'

import filterNodes from '../../../../utils/filterNodes'

export default ({ data, loading, store }) => {
  const lieferungen = filterNodes({
    rows: get(data, 'lieferung', []),
    filter: store.filter,
    table: 'lieferung',
  })
  const nr = loading && !lieferungen.length ? '...' : lieferungen.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Lieferungen',
      id: 'lieferungFolder',
      label: `Lieferungen (${nr})`,
      url: ['Lieferungen'],
      sort: [4],
      hasChildren: true,
    },
  ]
}
