import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../compareLabel'
import allParentNodesExist from '../../../allParentNodesExist'

export default ({ nodes, data, url }) => {
  const sammlungId = url[1]
  const sammlungen = get(data, 'sammlung', [])
  const sammlung = sammlungen.find(p => p.id === sammlungId)
  const kulturen = get(sammlung, 'sammlungInKultursBysammlungId', []).map(
    s => s.kulturBykulturId,
  )

  const sammlungNodes = nodes.filter(n => n.parentId === 'sammlungFolder')
  const sammlungIndex = findIndex(
    sammlungNodes,
    n => n.id === `sammlung${sammlungId}`,
  )

  return kulturen
    .map(el => ({
      nodeType: 'table',
      menuType: 'sammlungKultur',
      filterTable: 'kultur',
      id: `sammlung${sammlungId}Kultur${el.id}`,
      parentId: `sammlung${sammlungId}KulturFolder`,
      label: get(el, 'gartenBygartenId.personBypersonId.name', '(kein Name)'),
      url: ['Sammlungen', sammlungId, 'Kulturen', el.id],
      hasChildren: true,
    }))
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [6, sammlungIndex, 1, index]
      return el
    })
}
