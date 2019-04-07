import get from 'lodash/get'

import filterNodes from '../../../../utils/filterNodes'

export default ({ nodes, data, store }) => {
  const gaerten = filterNodes({
    rows: get(data, 'garten', []),
    filter: store.filter,
    table: 'garten',
  })

  return (
    gaerten
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('gartenFolder'))
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'Garten',
        table: 'garten',
        id: `garten${el.id}`,
        parentId: 'gartenFolder',
        label: get(el, 'personBypersonId.name') || '(keine Person gewählt)',
        url: ['Gaerten', el.id],
        hasChildren: true,
      }))
      .map((el, index) => {
        el.sort = [2, index]
        return el
      })
  )
}
