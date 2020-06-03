import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, store, url }) => {
  if (!store.tree.showArt) return []
  const artId = url[1]
  const sammlungen = store.sammlungsFiltered.filter((s) => s.art_id === artId)
  const artNodes = nodes.filter((n) => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, (n) => n.id === `art${artId}`) || 0

  return (
    sammlungen
      // only show if parent node exists
      .filter(() =>
        nodes.map((n) => n.id).includes(`art${artId}SammlungFolder`),
      )
      .map((el) => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : 'kein Datum'
        const geplant = el.geplant ? ' (geplant)' : ''
        const herkunftId = el?.herkunft?.id
        const herkunft = herkunftId
          ? `${el?.herkunft?.gemeinde ?? '(keine Gemeinde)'}, ${
              el?.herkunft?.nr ?? '(keine Nr.)'
            }`
          : 'keine Herkunft'
        const label = `${datum}: ${herkunft}${geplant}`

        return {
          nodeType: 'table',
          menuTitle: 'Sammlung',
          table: 'sammlung',
          id: `art${artId}Sammlung${el.id}`,
          parentId: `art${artId}SammlungFolder`,
          label,
          url: ['Arten', artId, 'Sammlungen', el.id],
          hasChildren: true,
        }
      })
      .map((el, index) => ({ ...el, sort: [1, artIndex, 1, index] }))
  )
}
