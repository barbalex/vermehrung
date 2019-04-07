import get from 'lodash/get'

export default ({ nodes, data }) =>
  get(data, 'art', [])
    // only show if parent node exists
    .filter(() => nodes.map(n => n.id).includes('artFolder'))
    .map(n => ({
      nodeType: 'table',
      menuTitle: 'Art',
      table: 'art',
      id: `art${n.id}`,
      parentId: 'artFolder',
      label: get(n, 'art_ae_art.name') || '(keine Art gewählt)',
      url: ['Arten', n.id],
      hasChildren: true,
    }))
    .map((n, index) => {
      n.sort = [1, index]
      return n
    })
