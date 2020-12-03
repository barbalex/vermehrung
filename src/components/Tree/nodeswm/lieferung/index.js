import isEqual from 'lodash/isEqual'

import lieferungLabelFromLieferung from '../../../../utils/lieferungLabelFromLieferung'

const lieferungNodes = ({ store, lieferungs }) => {
  const { showLieferung, visibleOpenNodes } = store.tree

  if (!showLieferung) return []
  // only show if parent node exists
  if (!visibleOpenNodes.some((node) => isEqual(['Lieferungen'], node))) {
    return []
  }

  return lieferungs
    .map((el) => ({
      nodeType: 'table',
      menuTitle: 'Lieferung',
      table: 'lieferung',
      id: el.id,
      label: lieferungLabelFromLieferung({ lieferung: el }),
      url: ['Lieferungen', el.id],
      hasChildren: false,
      mono: true,
    }))
    .map((el, index) => {
      el.sort = [8, index]
      return el
    })
}

export default lieferungNodes
