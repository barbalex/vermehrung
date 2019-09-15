import get from 'lodash/get'

export default ({ data, loading }) => {
  const events = get(data, 'event', [])
  const nr = loading && !events.length ? '...' : events.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Events',
      id: 'eventFolder',
      label: `Events (${nr})`,
      url: ['Events'],
      sort: [9],
      hasChildren: true,
    },
  ]
}
