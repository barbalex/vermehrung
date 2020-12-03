import isEqual from 'lodash/isEqual'

import sammlungLabelFromSammlung from '../../../../utils/sammlungLabelFromSammlung'

const sammlungNodes = ({ store }) => {
  const { showSammlung, visibleOpenNodes } = store.tree

  if (!showSammlung) return []

  return (
    store.sammlungsFiltered
      // only show if parent node exists
      .filter(() =>
        visibleOpenNodes.some((node) => isEqual(['Sammlungen'], node)),
      )
      .map((el) => {
        const label = sammlungLabelFromSammlung({ sammlung: el, store })

        return {
          nodeType: 'table',
          menuTitle: 'Sammlung',
          table: 'sammlung',
          id: el.id,
          label,
          url: ['Sammlungen', el.id],
          hasChildren: true,
        }
      })
      .map((el, index) => {
        el.sort = [3, index]
        return el
      })
  )
}

export default sammlungNodes
