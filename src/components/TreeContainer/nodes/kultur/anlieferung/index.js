import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, store, url }) => {
  const { showKultur, visibleOpenNodes, kulturKultur } = store.tree
  if (!showKultur) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 3 &&
      node[0] === 'Kulturen' &&
      node[2] === 'An-Lieferungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const kulturId = node[1]
    const kulturIndex = kulturKultur.findIndex((a) => a.id === kulturId)
  })
  const kulturId = url[1]

  const anlieferungen = store.lieferungsFiltered.filter(
    (z) => z.nach_kultur_id === kulturId,
  )

  const kulturNodes = nodes.filter((n) => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(
    kulturNodes,
    (n) => n.id === `kultur${kulturId}`,
  )

  return (
    anlieferungen
      // only show if parent node exists
      .filter(() =>
        nodes.map((n) => n.id).includes(`kultur${kulturId}AnLieferungFolder`),
      )
      .map((el) => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : 'kein Datum'
        const anz = el.anzahl_pflanzen ?? '_'
        const anzAb = el.anzahl_auspflanzbereit ?? '_'
        const numbers = `${anz
          .toString()
          .padStart(3, '_')}/${anzAb.toString().padStart(3, '_')}`
        const geplant = el.geplant ? ' (geplant)' : ''
        const label = `${datum}: ${numbers}${geplant}`

        return {
          nodeType: 'table',
          menuTitle: 'An-Lieferung',
          table: 'lieferung',
          id: `kultur${kulturId}Lieferung${el.id}`,
          parentId: `kultur${kulturId}AnLieferungFolder`,
          label,
          url: ['Kulturen', kulturId, 'An-Lieferungen', el.id],
          hasChildren: false,
          mono: true,
        }
      })
      .map((el, index) => {
        el.sort = [5, kulturIndex, 3, index]
        return el
      })
  )
}
