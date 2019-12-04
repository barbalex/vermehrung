import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ nodes, data, url }) => {
  const sammlungId = url[1]
  const sammlungen = get(data, 'sammlung') || []
  const sammlung = sammlungen.find(p => p.id === sammlungId)
  const herkunft = get(sammlung, 'herkunft')

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
      .map(el => {
        const label = `${el.nr || '(keine Nr)'}: ${el.gemeinde ||
          '(keine Gemeinde)'}, ${el.lokalname || '(kein Lokalname)'}`

        return {
          nodeType: 'table_no_menu',
          menuTitle: 'Herkunft',
          table: 'herkunft',
          id: `sammlung${sammlungId}Herkunft${el.id}`,
          parentId: `sammlung${sammlungId}HerkunftFolder`,
          label,
          url: ['Sammlungen', sammlungId, 'Herkuenfte', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [3, sammlungIndex, 1, index]
        return el
      })
  )
}
