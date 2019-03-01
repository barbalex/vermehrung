import get from 'lodash/get'

import compareLabel from '../compareLabel'
import filterNodes from '../../../../utils/filterNodes'

export default ({ nodes, data, store }) => {
  const herkuenfte = filterNodes({
    rows: get(data, 'herkunft', []),
    filter: store.filter,
    table: 'herkunft',
  })

  return (
    herkuenfte
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('herkunftFolder'))
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'Herkunft',
        table: 'herkunft',
        id: `herkunft${el.id}`,
        parentId: 'herkunftFolder',
        label: `${el.nr || '(keine Nr)'}: ${el.lokalname || 'kein Lokalname'}`,
        url: ['Herkuenfte', el.id],
        hasChildren: true,
      }))
      // sort by label
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [3, index]
        return el
      })
  )
}
