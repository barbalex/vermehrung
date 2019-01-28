import get from 'lodash/get'

export default ({ data, loading }) => {
  const werte = get(data, 'lieferung_status_werte', [])
  const nr = loading ? '...' : werte.length

  return [
    {
      nodeType: 'folder',
      menuType: 'lieferungStatusFolder',
      id: 'lieferungStatusFolder',
      parentId: 'werteListenFolder',
      label: `Lieferung: Status (${nr})`,
      url: ['Werte-Listen', 'Lieferung-Status'],
      sort: [6, 4],
      hasChildren: true,
    },
  ]
}
