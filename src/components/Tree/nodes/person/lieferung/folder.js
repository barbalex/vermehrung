import get from 'lodash/get'

export default ({ data, loading }) => {
  const lieferungen = get(data, 'lieferung', [])
  const nr = loading ? '...' : lieferungen.length

  return [
    {
      nodeType: 'folder',
      menuType: 'lieferungFolder',
      id: 'lieferungFolder',
      label: `Lieferungen (${nr})`,
      url: ['Lieferungen'],
      sort: [5],
      hasChildren: true,
    },
  ]
}
