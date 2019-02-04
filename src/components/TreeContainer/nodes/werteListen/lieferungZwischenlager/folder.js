import get from 'lodash/get'

export default ({ data, loading, nodes }) => {
  const werte = get(data, 'lieferung_zwischenlager_werte', [])
  const nr = loading && !werte.length ? '...' : werte.length

  // only return if parent exists
  if (!nodes.map(n => n.id).includes('werteListenFolder')) return []

  return [
    {
      nodeType: 'folder',
      menuType: 'lieferungZwischenlagerFolder',
      id: 'lieferungZwischenlagerFolder',
      parentId: 'werteListenFolder',
      label: `Lieferung: Zwischenlager (${nr})`,
      url: ['Werte-Listen', 'Lieferung-Zwischenlager'],
      sort: [8, 5],
      hasChildren: true,
    },
  ]
}
