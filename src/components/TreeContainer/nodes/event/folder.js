export default ({ data, loading }) => {
  const events = data?.event ?? []
  const nr = loading && !events.length ? '...' : events.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Events',
      id: 'eventFolder',
      label: `Events (${nr})`,
      url: ['Events'],
      sort: [10],
      hasChildren: true,
    },
  ]
}
