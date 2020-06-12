export default ({ store }) => {
  const { initialDataQueried } = store
  if (!store.tree.showEvent) return []

  const events = store.eventsFiltered
  const nr = !initialDataQueried && !events.length ? '...' : events.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Events',
      id: 'eventFolder',
      label: `Events (${nr})`,
      url: ['Events'],
      sort: [10],
      hasChildren: true,
      childrenCount: nr,
    },
  ]
}
