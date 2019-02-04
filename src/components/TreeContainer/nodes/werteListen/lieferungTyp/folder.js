import get from 'lodash/get'

export default ({ data, loading, nodes }) => {
  const werte = get(data, 'lieferung_typ_werte', [])
  const nr = loading && !werte.length ? '...' : werte.length

  // only return if parent exists
  if (!nodes.map(n => n.id).includes('werteListenFolder')) return []

  return [
    {
      nodeType: 'folder',
      menuType: 'lieferungTypFolder',
      id: 'lieferungTypFolder',
      parentId: 'werteListenFolder',
      label: `Lieferung: Typ (${nr})`,
      url: ['Werte-Listen', 'Lieferung-Typ'],
      sort: [8, 3],
      hasChildren: true,
    },
  ]
}
