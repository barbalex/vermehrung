import get from 'lodash/get'

import compareLabel from '../compareLabel'
import filterNodes from '../../../../utils/filterNodes'

export default ({ nodes, data, store }) =>
  filterNodes({
    rows: get(data, 'art', []),
    filter: store.filter,
    table: 'art',
  })
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
    .sort(compareLabel)
    .map((n, index) => {
      n.sort = [1, index]
      return n
    })
