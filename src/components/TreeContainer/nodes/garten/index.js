import get from 'lodash/get'

export default ({ nodes, data }) =>
  get(data, 'garten', [])
    // only show if parent node exists
    .filter(() => nodes.map(n => n.id).includes('gartenFolder'))
    .map(el => ({
      nodeType: 'table',
      menuTitle: 'Garten',
      table: 'garten',
      id: `garten${el.id}`,
      parentId: 'gartenFolder',
      label: get(el, 'person.name') || '(keine Person gewählt)',
      url: ['Gaerten', el.id],
      hasChildren: true,
    }))
    .map((el, index) => {
      el.sort = [2, index]
      return el
    })
