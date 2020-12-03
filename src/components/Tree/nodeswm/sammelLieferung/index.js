import isEqual from 'lodash/isEqual'

import sammelLieferungLabelFromSammelLieferung from '../../../../utils/sammelLieferungLabelFromSammelLieferung'

const sammelLieferungNodes = ({ store, sammelLieferungs }) => {
  const { showSammelLieferung, visibleOpenNodes } = store.tree

  if (!showSammelLieferung) return []
  // only show if parent node exists
  if (!visibleOpenNodes.some((node) => isEqual(['Sammel-Lieferungen'], node))) {
    return []
  }

  return sammelLieferungs
    .map((el) => ({
      nodeType: 'table',
      menuTitle: 'Sammel-Lieferung',
      table: 'sammel_lieferung',
      id: el.id,
      label: sammelLieferungLabelFromSammelLieferung({
        lieferung: el,
        store,
      }),
      url: ['Sammel-Lieferungen', el.id],
      hasChildren: true,
      mono: true,
    }))
    .map((el, index) => {
      el.sort = [9, index]
      return el
    })
}

export default sammelLieferungNodes
