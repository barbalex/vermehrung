import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../compareLabel'

export default ({ nodes, data, url, store }) => {
  const sammlungId = url[1]
  const sammlungen = get(data, 'sammlung', [])
  const sammlung = sammlungen.find(p => p.id === sammlungId)
  const herkunft = get(sammlung, 'herkunftByherkunftId', {})

  const sammlungNodes = nodes.filter(n => n.parentId === 'sammlungFolder')
  const sammlungIndex = findIndex(
    sammlungNodes,
    n => n.id === `sammlung${sammlungId}`,
  )

  return (
    [herkunft]
      // only show if parent node exists
      .filter(() =>
        nodes.map(n => n.id).includes(`sammlung${sammlungId}HerkunftFolder`),
      )
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'Herkunft',
        table: 'herkunft',
        id: `sammlung${sammlungId}Herkunft${el.id}`,
        parentId: `sammlung${sammlungId}HerkunftFolder`,
        label: el.nr || '(keine Nr)',
        url: ['Sammlungen', sammlungId, 'Herkuenfte', el.id],
        hasChildren: false,
      }))
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [6, sammlungIndex, 1, index]
        return el
      })
  )
}
