import isEqual from 'lodash/isEqual'

import teilkulturLabelFromTeilkultur from '../../../../utils/teilkulturLabelFromTeilkultur'

const teilkulturNodes = ({ store, teilkulturs }) => {
  const { showTeilkultur, visibleOpenNodes } = store.tree

  if (!showTeilkultur) return []
  // only show if parent node exists
  if (!visibleOpenNodes.some((node) => isEqual(['Teilkulturen'], node)))
    return []

  return teilkulturs
    .map((n) => ({
      nodeType: 'table',
      menuTitle: 'Teilkultur',
      table: 'teilkultur',
      id: n.id,
      label: teilkulturLabelFromTeilkultur({ teilkultur: n }),
      url: ['Teilkulturen', n.id],
      hasChildren: false,
    }))
    .map((n, index) => {
      n.sort = [6, index]
      return n
    })
}

export default teilkulturNodes
