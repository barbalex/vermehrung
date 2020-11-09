import isEqual from 'lodash/isEqual'

import gartenLabelFromGarten from '../../../../utils/gartenLabelFromGarten'

const gartenNodes = ({ store }) => {
  const { showGarten, visibleOpenNodes } = store.tree
  if (!showGarten) return []

  return (
    store.gartensFiltered
      // only show if parent node exists
      .filter(() => visibleOpenNodes.some((node) => isEqual(['Gaerten'], node)))
      .map((el) => ({
        nodeType: 'table',
        menuTitle: 'Garten',
        table: 'garten',
        id: el.id,
        label: gartenLabelFromGarten({ garten: el, store }),
        url: ['Gaerten', el.id],
        hasChildren: true,
      }))
      .map((el, index) => {
        el.sort = [4, index]
        return el
      })
  )
}

export default gartenNodes
