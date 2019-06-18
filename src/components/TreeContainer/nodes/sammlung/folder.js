import get from 'lodash/get'

export default ({ data, loading }) => {
  const sammlungen = get(data, 'sammlung', [])
  const nr = loading && !sammlungen.length ? '...' : sammlungen.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Sammlungen',
      id: 'sammlungFolder',
      label: `Sammlungen (${nr})`,
      url: ['Sammlungen'],
      sort: [3],
      hasChildren: true,
    },
  ]
}
