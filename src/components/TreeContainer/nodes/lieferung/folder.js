import get from 'lodash/get'

export default ({ data, loading }) => {
  const lieferungen = get(data, 'lieferung', [])
  const nr = loading && !lieferungen.length ? '...' : lieferungen.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Lieferungen',
      id: 'lieferungFolder',
      label: `Lieferungen (${nr})`,
      url: ['Lieferungen'],
      sort: [10],
      hasChildren: true,
    },
  ]
}
