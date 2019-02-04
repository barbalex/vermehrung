import get from 'lodash/get'

export default ({ data, loading }) => {
  const lieferungen = get(data, 'lieferung', [])
  const nr = loading && !lieferungen.length ? '...' : lieferungen.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'lieferungFolder',
      id: 'lieferungFolder',
      label: `Lieferungen (${nr})`,
      url: ['Lieferungen'],
      sort: [4],
      hasChildren: true,
    },
  ]
}
