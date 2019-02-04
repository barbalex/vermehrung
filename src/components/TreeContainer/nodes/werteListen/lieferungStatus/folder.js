import get from 'lodash/get'

export default ({ data, loading, nodes }) => {
  const werte = get(data, 'lieferung_status_werte', [])
  const nr = loading && !werte.length ? '...' : werte.length

  // only return if parent exists
  if (!nodes.map(n => n.id).includes('werteListenFolder')) return []

  return [
    {
      nodeType: 'folder',
      menuType: 'lieferungStatusFolder',
      id: 'lieferungStatusFolder',
      parentId: 'werteListenFolder',
      label: `Lieferung: Status (${nr})`,
      url: ['Werte-Listen', 'Lieferung-Status'],
      sort: [8, 4],
      hasChildren: true,
    },
  ]
}
