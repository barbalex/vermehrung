import get from 'lodash/get'

export default ({ data, loading }) => {
  const sammelLieferungen = get(data, 'sammel_lieferung', [])
  const nr =
    loading && !sammelLieferungen.length ? '...' : sammelLieferungen.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Sammel-Lieferungen',
      id: 'sammelLieferungFolder',
      label: `Sammel-Lieferungen (${nr})`,
      url: ['Sammel-Lieferungen'],
      sort: [9],
      hasChildren: true,
    },
  ]
}
