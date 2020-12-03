import isEqual from 'lodash/isEqual'

import herkunftLabelFromHerkunft from '../../../../utils/herkunftLabelFromHerkunft'

const herkunftNodes = ({ store, herkunfts }) => {
  const { showHerkunft, visibleOpenNodes } = store.tree
  if (!showHerkunft) return []
  // only show if parent node exists
  if (!visibleOpenNodes.some((node) => isEqual(['Herkuenfte'], node))) return []

  return herkunfts
    .map((el) => ({
      nodeType: 'table',
      menuTitle: 'Herkunft',
      table: 'herkunft',
      id: el.id,
      label: herkunftLabelFromHerkunft({ herkunft: el }),
      url: ['Herkuenfte', el.id],
      hasChildren: true,
    }))
    .map((el, index) => {
      el.sort = [2, index]
      return el
    })
}

export default herkunftNodes
