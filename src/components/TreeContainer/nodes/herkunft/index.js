import get from 'lodash/get'

import compareLabel from '../compareLabel'

export default ({ nodes, data, store }) => {
  const herkuenfte = get(data, 'herkunft', [])

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
        label: get(el, 'lokalname', '(keine Herkunft gewählt)'),
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
