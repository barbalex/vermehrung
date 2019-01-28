import get from 'lodash/get'

export default ({ data, loading }) => {
  const werte = get(data, 'lieferung_typ_werte', [])
  const nr = loading ? '...' : werte.length

  return [
    {
      nodeType: 'folder',
      menuType: 'lieferungTypFolder',
      id: 'lieferungTypFolder',
      parentId: 'werteListenFolder',
      label: `Lieferung: Typ (${nr})`,
      url: ['Werte-Listen', 'Lieferung-Typ'],
      sort: [6, 3],
      hasChildren: true,
    },
  ]
}
