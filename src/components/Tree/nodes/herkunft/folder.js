import get from 'lodash/get'

export default ({ data, loading }) => {
  const herkuenfte = get(data, 'herkunft', [])
  const nr = loading ? '...' : herkuenfte.length

  return [
    {
      nodeType: 'folder',
      menuType: 'herkunftFolder',
      id: 'herkunftFolder',
      label: `Herkünfte (${nr})`,
      url: ['Herkuenfte'],
      sort: [3],
      hasChildren: true,
    },
  ]
}
