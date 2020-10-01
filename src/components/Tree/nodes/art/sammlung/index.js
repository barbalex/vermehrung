import { DateTime } from 'luxon'

export default ({ store }) => {
  const { showArt, visibleOpenNodes, art } = store.tree
  if (!showArt) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 3 && node[0] === 'Arten' && node[2] === 'Sammlungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const artId = node[1]
    const artIndex = art.findIndex((a) => a.id === artId)
    const sammlungen = store.sammlungsFiltered.filter((s) => s.art_id === artId)

    return sammlungen
      .map((el) => {
        const datum = el.datum
          ? DateTime.fromSQL(el.datum).toFormat('yyyy.LL.dd')
          : 'kein Datum'
        const geplant = el.geplant ? ' (geplant)' : ''
        const herkunft = el.herkunft_id
          ? store.herkunfts.get(el.herkunft_id)
          : {}
        const herkunftId = herkunft?.id
        const herkunftLabel = herkunftId
          ? `${herkunft?.gemeinde ?? '(keine Gemeinde)'}, ${
              herkunft?.nr ?? '(keine Nr.)'
            }`
          : 'keine Herkunft'
        const label = `${datum}: ${herkunftLabel}${geplant}`

        return {
          nodeType: 'table',
          menuTitle: 'Sammlung',
          table: 'sammlung',
          id: `${artId}${el.id}`,
          label,
          url: ['Arten', artId, 'Sammlungen', el.id],
          hasChildren: true,
        }
      })
      .map((el, index) => ({ ...el, sort: [1, artIndex, 1, index] }))
  })
}
