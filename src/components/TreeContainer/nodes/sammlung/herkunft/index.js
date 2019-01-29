import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../compareLabel'
import allParentNodesExist from '../../../allParentNodesExist'

export default ({ nodes, data, url }) => {
  const sammlungId = url[1]
  const sammlungen = get(data, 'sammlung', [])
  const sammlung = sammlungen.find(p => p.id === sammlungId)
  const herkunft = get(sammlung, 'herkunftByherkunftId', {})

  const sammlungNodes = nodes.filter(n => n.parentId === 'sammlungFolder')
  const sammlungIndex = findIndex(
    sammlungNodes,
    n => n.id === `sammlung${sammlungId}`,
  )

  return [herkunft]
    .map(el => ({
      nodeType: 'table',
      menuType: 'sammlungHerkunft',
      filterTable: 'herkunft',
      id: `sammlung${sammlungId}Herkunft${el.id}`,
      parentId: `sammlung${sammlungId}HerkunftFolder`,
      label: el.nr || '(keine Nr)',
      url: ['Sammlungen', sammlungId, 'Herkuenfte', el.id],
      hasChildren: false,
    }))
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [6, sammlungIndex, 1, index]
      return el
    })
}
