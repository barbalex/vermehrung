import get from 'lodash/get'

export default ({ nodes, data }) => {
  return (
    get(data, 'person', [])
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('personFolder'))
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'Person',
        table: 'person',
        id: `person${el.id}`,
        parentId: 'personFolder',
        label: get(el, 'name') || '(kein Name)',
        url: ['Personen', el.id],
        hasChildren: true,
      }))
      .map((el, index) => {
        el.sort = [5, index]
        return el
      })
  )
}
