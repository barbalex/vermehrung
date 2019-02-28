import get from 'lodash/get'

import filterNodes from '../../../../utils/filterNodes'

export default ({ data, loading, store }) => {
  const herkuenfte = get(data, 'herkunft', [])
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
