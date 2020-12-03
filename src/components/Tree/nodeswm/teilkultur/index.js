import isEqual from 'lodash/isEqual'

import teilkulturLabelFromTeilkultur from '../../../../utils/teilkulturLabelFromTeilkultur'

const teilkulturNodes = ({ store }) => {
  const { showTeilkultur, visibleOpenNodes } = store.tree

  if (!showTeilkultur) return []

  return (
    store.teilkultursFiltered
      // only show if parent node exists
      .filter(() =>
        visibleOpenNodes.some((node) => isEqual(['Teilkulturen'], node)),
      )
      .map((el) => {
        return {
          nodeType: 'table',
          menuTitle: 'Teilkultur',
          table: 'teilkultur',
          id: el.id,
          label: teilkulturLabelFromTeilkultur({ teilkultur: el }),
          url: ['Teilkulturen', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [6, index]
        return el
      })
  )
}

export default teilkulturNodes
