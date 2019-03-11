import get from 'lodash/get'

import compareLabel from '../compareLabel'
import filterNodes from '../../../../utils/filterNodes'

export default ({ nodes, data, store }) => {
  const kulturen = filterNodes({
    rows: get(data, 'kultur', []),
    filter: store.filter,
    table: 'kultur',
  })

  return (
    kulturen
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('kulturFolder'))
      .map(el => {
        const person =
          get(el, 'gartenBygartenId.personBypersonId.name') || '(kein Name)'
        const art = get(el, 'artByartId.art_ae_art.name') || '(keine Art)'

        return {
          nodeType: 'table',
          menuTitle: 'Kultur',
          table: 'kultur',
          id: `kultur${el.id}`,
          parentId: 'kulturFolder',
          label: `${person}: ${art}`,
          url: ['Kulturen', el.id],
          hasChildren: true,
        }
      })
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [7, index]
        return el
      })
  )
}
