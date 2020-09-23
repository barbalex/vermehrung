import { DateTime } from 'luxon'

export default ({ store }) => {
  const { showHerkunft, visibleOpenNodes, herkunft } = store.tree
  if (!showHerkunft) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 3 && node[0] === 'Herkuenfte' && node[2] === 'Sammlungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const herkunftId = node[1]
    const herkunftIndex = herkunft.findIndex((a) => a.id === herkunftId)

    const sammlungen = store.sammlungsFiltered.filter(
      (s) => s.herkunft_id === herkunftId,
    )

    return sammlungen
      .map((el) => {
        const datum = el.datum
          ? DateTime.fromSQL(el.datum).toFormat('yyyy.LL.dd')
          : 'kein Datum'
        const artName = el?.art?.art_ae_art?.name ?? '(keine Art)'
        const geplant = el.geplant ? ' (geplant)' : ''
        const label = `${datum}: ${artName}${geplant}`

        return {
          nodeType: 'table',
          menuTitle: 'Sammlung',
          table: 'sammlung',
          id: `${herkunftId}${el.id}`,
          label,
          url: ['Herkuenfte', herkunftId, 'Sammlungen', el.id],
          hasChildren: true,
        }
      })
      .map((el, index) => {
        el.sort = [2, herkunftIndex, 2, index]
        return el
      })
  })
}
