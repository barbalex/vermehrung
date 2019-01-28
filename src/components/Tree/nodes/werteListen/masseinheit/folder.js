import get from 'lodash/get'

export default ({ data, loading }) => {
  const werte = get(data, 'masseinheit_werte', [])
  const nr = loading ? '...' : werte.length

  return [
    {
      nodeType: 'folder',
      menuType: 'masseinheitenFolder',
      id: 'masseinheitenFolder',
      parentId: 'werteListenFolder',
      label: `Masseinheiten (${nr})`,
      url: ['Werte-Listen', 'Masseinheiten'],
      sort: [8, 1],
      hasChildren: true,
    },
  ]
}
