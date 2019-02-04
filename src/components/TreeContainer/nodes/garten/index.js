import get from 'lodash/get'

import compareLabel from '../compareLabel'

export default ({ nodes, data }) => {
  const gaerten = get(data, 'garten', [])

  return (
    gaerten
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('gartenFolder'))
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'garten',
        filterTable: 'garten',
        id: `garten${el.id}`,
        parentId: 'gartenFolder',
        label: get(el, 'personBypersonId.name', '(kein Garten gewählt)'),
        url: ['Gaerten', el.id],
        hasChildren: true,
      }))
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [2, index]
        return el
      })
  )
}
