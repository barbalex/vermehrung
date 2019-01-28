import get from 'lodash/get'

export default ({ data, loading }) => {
  const werte = get(data, 'zaehleinheit_werte', [])
  const nr = loading ? '...' : werte.length

  return [
    {
      nodeType: 'folder',
      menuType: 'zaehleinheitenFolder',
      id: 'zaehleinheitenFolder',
      parentId: 'werteListenFolder',
      label: `Zähleinheiten (${nr})`,
      url: ['Werte-Listen', 'Zaehleinheiten'],
      sort: [8, 2],
      hasChildren: true,
    },
  ]
}
