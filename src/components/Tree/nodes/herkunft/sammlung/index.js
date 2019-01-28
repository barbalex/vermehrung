import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../compareLabel'
import allParentNodesExist from '../../../allParentNodesExist'

export default ({ nodes, data, url }) => {
  const herkunftId = url[1]
  const herkuenfte = get(data, 'herkunft', [])
  const herkunft = herkuenfte.find(a => a.id === herkunftId)
  const sammlungen = get(herkunft, 'sammlungsByherkunftId', [])
  const herkunftNodes = nodes.filter(n => n.parentId === 'herkunftFolder')
  const herkunftIndex =
    findIndex(herkunftNodes, n => n.id === `herkunft${herkunftId}`) || 0

  return sammlungen
    .map(el => ({
      nodeType: 'table',
      menuType: 'sammlung',
      filterTable: 'sammlung',
      id: `sammlung${el.id}`,
      parentId: `herkunft${herkunftId}SammlungFolder`,
      label: `${get(el, 'datum', '(kein Datum)')}: ${get(
        el,
        'herkunftByherkunftId.nr',
        '(keine Nr.)',
      )}`,
      url: ['Herkuenfte', herkunftId, 'Sammlungen', el.id],
      hasChildren: true,
    }))
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [3, herkunftIndex, 2, index]
      return el
    })
}
