import get from 'lodash/get'

export default ({ data, loading }) => {
  const werte = get(data, 'lieferung_zwischenlager_werte', [])
  const nr = loading ? '...' : werte.length

  return [
    {
      nodeType: 'folder',
      menuType: 'lieferungZwischenlagerFolder',
      id: 'lieferungZwischenlagerFolder',
      parentId: 'werteListenFolder',
      label: `Lieferung: Zwischenlager (${nr})`,
      url: ['Werte-Listen', 'Lieferung-Zwischenlager'],
      sort: [6, 5],
      hasChildren: true,
    },
  ]
}
