import isEqual from 'lodash/isEqual'

import personLabelFromPerson from '../../../../utils/personLabelFromPerson'

const personNodes = ({ store, persons }) => {
  const { showPerson, visibleOpenNodes } = store.tree

  if (!showPerson) return []
  // only show if parent node exists
  if (!visibleOpenNodes.some((node) => isEqual(['Personen'], node))) {
    return []
  }

  return persons
    .map((el) => ({
      nodeType: 'table',
      menuTitle: 'Person',
      table: 'person',
      id: el.id,
      label: personLabelFromPerson({ person: el }),
      url: ['Personen', el.id],
      hasChildren: true,
    }))
    .map((el, index) => {
      el.sort = [11, index]
      return el
    })
}

export default personNodes
