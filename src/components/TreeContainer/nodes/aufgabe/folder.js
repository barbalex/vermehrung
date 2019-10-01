import get from 'lodash/get'

export default ({ data, loading }) => {
  const aufgaben = get(data, 'aufgabe', [])
  const nr = loading && !aufgaben.length ? '...' : aufgaben.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Aufgaben',
      id: 'aufgabeFolder',
      label: `Aufgaben (${nr})`,
      url: ['Aufgaben'],
      sort: [10],
      hasChildren: true,
    },
  ]
}
