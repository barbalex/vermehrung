import isEqual from 'lodash/isEqual'

import lieferungLabelFromLieferung from '../../../../utils/lieferungLabelFromLieferung'

export default ({ store }) => {
  const { showLieferung, visibleOpenNodes } = store.tree

  if (!showLieferung) return []
  const lieferungen = store.lieferungsFiltered

  return (
    lieferungen
      // only show if parent node exists
      .filter(() =>
        visibleOpenNodes.some((node) => isEqual(['Lieferungen'], node)),
      )
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
  )
}
