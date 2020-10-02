import isEqual from 'lodash/isEqual'

import herkunftLabelFromHerkunft from '../../../../utils/herkunftLabelFromHerkunft'

export default ({ store }) => {
  const { showHerkunft, visibleOpenNodes } = store.tree
  if (!showHerkunft) return []

  return (
    store.herkunftsFiltered
      // only show if parent node exists
      .filter(() =>
        visibleOpenNodes.some((node) => isEqual(['Herkuenfte'], node)),
      )
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
  )
}
