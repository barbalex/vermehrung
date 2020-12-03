import isEqual from 'lodash/isEqual'

import zaehlungLabelFromZaehlung from '../../../../utils/zaehlungLabelFromZaehlung'

const zaehlungNodes = ({ store }) => {
  const { showZaehlung, visibleOpenNodes } = store.tree

  if (!showZaehlung) return []

  return (
    store.zaehlungsFiltered
      // only show if parent node exists
      .filter(() =>
        visibleOpenNodes.some((node) => isEqual(['Zaehlungen'], node)),
      )
      .map((el) => ({
        nodeType: 'table',
        menuTitle: 'Zählung',
        table: 'zaehlung',
        id: el.id,
        label: zaehlungLabelFromZaehlung({ zaehlung: el, store }),
        url: ['Zaehlungen', el.id],
        hasChildren: false,
        mono: true,
      }))
      .map((el, index) => {
        el.sort = [7, index]
        return el
      })
  )
}

export default zaehlungNodes
