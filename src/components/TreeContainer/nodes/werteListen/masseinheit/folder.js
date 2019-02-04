import get from 'lodash/get'

export default ({ data, loading, nodes }) => {
  const werte = get(data, 'masseinheit_werte', [])
  const nr = loading && !werte.length ? '...' : werte.length

  // only return if parent exists
  if (!nodes.map(n => n.id).includes('werteListenFolder')) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'masseinheitenFolder',
      id: 'masseinheitenFolder',
      parentId: 'werteListenFolder',
      label: `Masseinheiten (${nr})`,
      url: ['Werte-Listen', 'Masseinheiten'],
      sort: [8, 1],
      hasChildren: true,
    },
  ]
}
