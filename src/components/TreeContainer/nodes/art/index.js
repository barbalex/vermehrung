import get from 'lodash/get'

import compareLabel from '../compareLabel'

export default ({ nodes, data }) => {
  const arten = get(data, 'art', [])

  return (
    arten
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('artFolder'))
      .map(n => ({
        nodeType: 'table',
        menuTitle: 'Art',
        filterTable: 'art',
        id: `art${n.id}`,
        parentId: 'artFolder',
        label: get(n, 'art_ae_art.name', '(keine Art gewählt)'),
        url: ['Arten', n.id],
        hasChildren: true,
      }))
      .sort(compareLabel)
      .map((n, index) => {
        n.sort = [1, index]
        return n
      })
  )
}
