import get from 'lodash/get'

export default ({ data, loading }) => {
  const sammlungen = get(data, 'sammlung', [])
  const nr = loading && !sammlungen.length ? '...' : sammlungen.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'sammlungFolder',
      id: 'sammlungFolder',
      label: `Sammlungen (${nr})`,
      url: ['Sammlungen'],
      sort: [6],
      hasChildren: true,
    },
  ]
}
