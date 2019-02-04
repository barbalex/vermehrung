import get from 'lodash/get'

export default ({ data, loading, nodes }) => {
  const werte = get(data, 'zaehleinheit_werte', [])
  const nr = loading && !werte.length ? '...' : werte.length

  // only return if parent exists
  if (!nodes.map(n => n.id).includes('werteListenFolder')) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Zähleinheiten',
      id: 'zaehleinheitenFolder',
      parentId: 'werteListenFolder',
      label: `Zähleinheiten (${nr})`,
      url: ['Werte-Listen', 'Zaehleinheiten'],
      sort: [8, 2],
      hasChildren: true,
    },
  ]
}
