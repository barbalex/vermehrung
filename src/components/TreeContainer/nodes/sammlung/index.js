import get from 'lodash/get'

import compareLabel from '../compareLabel'

export default ({ nodes, data }) => {
  const sammlungen = get(data, 'sammlung', [])

  return (
    sammlungen
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('sammlungFolder'))
      .map(el => {
        const { datum } = el
        const art = get(el, 'artByartId.art_ae_art.name', '(keine Art)')
        const person = get(el, 'personBypersonId.name', '(keine Person)')
        const herkunft = get(
          el,
          'herkunftByherkunftId.nr',
          '(keine Herkunft-Nr)',
        )
        const label = `${datum}: Herkunft ${herkunft}; ${person}; ${art}`

        return {
          nodeType: 'table',
          menuTitle: 'Sammlung',
          filterTable: 'sammlung',
          id: `sammlung${el.id}`,
          parentId: 'sammlungFolder',
          label,
          url: ['Sammlungen', el.id],
          hasChildren: true,
        }
      })
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [6, index]
        return el
      })
  )
}
