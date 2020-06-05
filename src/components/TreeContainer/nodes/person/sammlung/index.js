import moment from 'moment'

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
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : 'kein Datum'
        const art = el?.art?.art_ae_art?.name ?? '(keine Art)'
        const herkunft = el?.herkunft?.nr ?? '(keine Herkunft-Nr)'
        const geplant = el.geplant ? ' (geplant)' : ''
        const label = `${datum}: Herkunft ${herkunft}: ${art}${geplant}`

        return {
          nodeType: 'table',
          menuTitle: 'Sammlung',
          table: 'sammlung',
          id: el.id,
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
