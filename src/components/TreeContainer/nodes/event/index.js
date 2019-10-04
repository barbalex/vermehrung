import get from 'lodash/get'

export default ({ nodes, data }) => {
  const events = get(data, 'event', [])

  return (
    events
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('eventFolder'))
      .map(el => {
        return {
          nodeType: 'table',
          menuTitle: 'Event',
          table: 'event',
          id: `event${el.id}`,
          parentId: 'eventFolder',
          label: el.beschreibung || '(nicht beschrieben)',
          url: ['Events', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [10, index]
        return el
      })
  )
}
