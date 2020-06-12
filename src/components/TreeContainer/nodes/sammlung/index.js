import isEqual from 'lodash/isEqual'
import moment from 'moment'

export default ({ store }) => {
  const { personsSorted } = store
  const { showSammlung, visibleOpenNodes } = store.tree

  if (!showSammlung) return []

  return (
    store.sammlungsFiltered
      // only show if parent node exists
      .filter(() =>
        visibleOpenNodes.some((node) => isEqual(['Sammlungen'], node)),
      )
      .map((el) => {
        const { datum } = el
        const art = el?.art?.art_ae_art?.name ?? '(keine Art)'
        const person = personsSorted.find((p) => p.id === el.person_id)
        const personName = person
          ? person?.name ?? '(Person ohne Name)'
          : '(keine Person)'
        const herkunft = el?.herkunft?.nr ?? '(keine Herkunft-Nr)'
        const date = datum
          ? moment(datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : 'kein Datum'
        const geplant = el.geplant ? ' (geplant)' : ''
        const label = `${
          el.nr ?? '(keine Nr)'
        }, ${date}: Herkunft ${herkunft}, ${personName}; ${art}${geplant}`

        return {
          nodeType: 'table',
          menuTitle: 'Sammlung',
          table: 'sammlung',
          id: el.id,
          label,
          url: ['Sammlungen', el.id],
          hasChildren: true,
        }
      })
      .map((el, index) => {
        el.sort = [3, index]
        return el
      })
  )
}
