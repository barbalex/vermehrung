import isEqual from 'lodash/isEqual'
import moment from 'moment'

export default ({ store }) => {
  const { personsSorted, herkunftsSorted, artsSorted, aeArtsSorted } = store
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
        const art = artsSorted.find((a) => a.id === el.art_id)
        const aeArt = aeArtsSorted.find((ae) => ae.id === art?.ae_id)
        const artName = aeArt ? aeArt?.name ?? '(Art ohne Name)' : '(keine Art)'
        const person = personsSorted.find((p) => p.id === el.person_id)
        const personName = person
          ? person?.name ?? '(Person ohne Name)'
          : '(keine Person)'
        const herkunft = herkunftsSorted.find((h) => h.id === el.herkunft_id)
        const herkunftNr = herkunft
          ? herkunft?.nr ?? '(Herkunft ohne Nr)'
          : '(keine Herkunft)'
        const date = datum
          ? moment(datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : 'kein Datum'
        const geplant = el.geplant ? ' (geplant)' : ''
        const label = `${
          el.nr ?? '(keine Nr)'
        }, ${date}: Herkunft ${herkunftNr}, ${personName}; ${artName}${geplant}`

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
