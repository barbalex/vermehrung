import get from 'lodash/get'

import compareLabel from '../compareLabel'
import allParentNodesExist from '../../allParentNodesExist'

export default ({ nodes, data }) => {
  const sammlungen = get(data, 'sammlung', [])

  return sammlungen
    .map(el => {
      const { datum } = el
      const art = get(el, 'artByartId.art_ae_art.name', '(keine Art)')
      const person = get(el, 'personBypersonId.name', '(keine Person)')
      const herkunft = get(el, 'herkunftByherkunftId.nr', '(keine Herkunft-Nr)')
      const label = `${datum}: Herkunft ${herkunft}; ${person}; ${art}`

      return {
        nodeType: 'table',
        menuType: 'sammlung',
        filterTable: 'sammlung',
        id: `sammlung${el.id}`,
        parentId: 'sammlungFolder',
        label,
        url: ['Sammlungen', el.id],
        hasChildren: true,
      }
    })
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [6, index]
      return el
    })
}
