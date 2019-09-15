import get from 'lodash/get'

export default ({ data, loading }) => {
  const zaehlungen = get(data, 'zaehlung', [])
  const nr = loading && !zaehlungen.length ? '...' : zaehlungen.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Zählungen',
      id: 'zaehlungFolder',
      label: `Zählungen (${nr})`,
      url: ['Zaehlungen'],
      sort: [8],
      hasChildren: true,
    },
  ]
}
