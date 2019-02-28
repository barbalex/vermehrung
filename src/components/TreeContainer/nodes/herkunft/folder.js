import get from 'lodash/get'

import filterNodes from '../../../../utils/filterNodes'

export default ({ data, loading, store }) => {
  const herkuenfte = filterNodes({
    rows: get(data, 'herkunft', []),
    filter: store.filter,
    table: 'herkunft',
  })
  const nr = loading && !herkuenfte.length ? '...' : herkuenfte.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Herkünfte',
      id: 'herkunftFolder',
      label: `Herkünfte (${nr})`,
      url: ['Herkuenfte'],
      sort: [3],
      hasChildren: true,
    },
  ]
}
