import isEqual from 'lodash/isEqual'

import treeLabelKultur from '../../../../utils/treeLabelKultur'

export default ({ store }) => {
  const { showKultur, visibleOpenNodes } = store.tree
  if (!showKultur) return []

  return (
    store.kultursFiltered
      // only show if parent node exists
      .filter(() =>
        visibleOpenNodes.some((node) => isEqual(['Kulturen'], node)),
      )
      .map((el) => {
        const label = treeLabelKultur(el)

        return {
          nodeType: 'table',
          menuTitle: 'Kultur',
          table: 'kultur',
          id: el.id,
          label,
          url: ['Kulturen', el.id],
          hasChildren: true,
        }
      })
      .map((el, index) => {
        el.sort = [5, index]
        return el
      })
  )
}
