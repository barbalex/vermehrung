import get from 'lodash/get'

export default ({ nodes, data }) => {
  const events = get(data, 'event', [])

  return (
    events
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('eventFolder'))
      .map(el => {
        const geplant = el.geplant ? ' (geplant)' : ''
        const label = `${get(el, 'beschreibung') ||
          '(nicht beschrieben)'}${geplant}`

        return {
          nodeType: 'table',
          menuTitle: 'Event',
          table: 'event',
          id: `event${el.id}`,
          parentId: 'eventFolder',
          label,
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
