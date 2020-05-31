export default ({ loading, store }) => {
  const events = store.eventFiltered
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
