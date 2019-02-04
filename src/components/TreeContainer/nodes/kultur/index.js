import get from 'lodash/get'

import compareLabel from '../compareLabel'

export default ({ nodes, data }) => {
  const kulturen = get(data, 'kultur', [])

  return (
    kulturen
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('kulturFolder'))
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'Kultur',
        filterTable: 'kultur',
        id: `kultur${el.id}`,
        parentId: 'kulturFolder',
        label: get(el, 'gartenBygartenId.personBypersonId.name', '(kein Name)'),
        url: ['Kulturen', el.id],
        hasChildren: true,
      }))
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [7, index]
        return el
      })
  )
}
