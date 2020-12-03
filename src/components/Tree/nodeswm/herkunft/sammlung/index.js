import { DateTime } from 'luxon'

import artLabelFromSammlung from '../../../../../utils/artLabelFromSammlung'

const herkunftSammlungNodes = ({ store }) => {
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
        const datumLabel = el.datum
          ? DateTime.fromSQL(el.datum).toFormat('yyyy.LL.dd')
          : 'Kein Datum'
        const artLabel = artLabelFromSammlung({ sammlung: el, store })
        const geplantLabel = el.geplant ? ' geplant' : ''
        const person = el.person_id ? store.persons.get(el.person_id) : {}
        const personLabel = person?.fullname
          ? person.fullname ?? '(Person ohne Name)'
          : ''
        const label = [datumLabel, artLabel, personLabel, geplantLabel]
          .filter((e) => !!e)
          .join('; ')

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

export default herkunftSammlungNodes
