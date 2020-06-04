import moment from 'moment'

export default ({ store }) => {
  const { showArt, visibleOpenNodes, artArt } = store.tree
  if (!showArt) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 3 && node[0] === 'Arten' && node[2] === 'Sammlungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const artId = node[1]
    const artIndex = artArt.findIndex((a) => a.id === artId)
    const sammlungen = store.sammlungsFiltered.filter((s) => s.art_id === artId)

    return sammlungen
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
          id: el.id,
          parentId: `${artId}SammlungFolder`,
          label,
          url: ['Arten', artId, 'Sammlungen', el.id],
          hasChildren: true,
        }
      })
      .map((el, index) => ({ ...el, sort: [1, artIndex, 1, index] }))
  })
}
