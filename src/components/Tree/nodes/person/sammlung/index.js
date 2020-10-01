import { DateTime } from 'luxon'

import artLabelFromSammlung from '../../../../../utils/artLabelFromSammlung'

export default ({ store }) => {
  const { showPerson, visibleOpenNodes, person } = store.tree
  if (!showPerson) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 3 && node[0] === 'Personen' && node[2] === 'Sammlungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const personId = node[1]
    const personIndex = person.findIndex((a) => a.id === personId)

    const sammlungen = store.sammlungsFiltered.filter(
      (s) => s.person_id === personId,
    )

    return sammlungen
      .map((el) => {
        const datum = el.datum
          ? DateTime.fromSQL(el.datum).toFormat('yyyy.LL.dd')
          : 'kein Datum'
        const artLabel = artLabelFromSammlung({ sammlung: el, store })
        const herkunft = el.herkunft_id
          ? store.herkunfts.get(el.herkunft_id)
          : {}
        const herkunftLabel = herkunft
          ? herkunft?.nr ?? '(Herkunft ohne Nr)'
          : '(keine Herkunft)'
        const geplant = el.geplant ? ' (geplant)' : ''
        const label = `${datum}: von ${herkunftLabel}: ${artLabel}${geplant}`

        return {
          nodeType: 'table',
          menuTitle: 'Sammlung',
          table: 'sammlung',
          id: `${personId}${el.id}`,
          label,
          url: ['Personen', personId, 'Sammlungen', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [11, personIndex, 1, index]
        return el
      })
  })
}
