import moment from 'moment'

export default ({ nodes, store }) => {
  const sammlungen = store.sammlungFiltered

  return (
    sammlungen
      // only show if parent node exists
      .filter(() => nodes.map((n) => n.id).includes('sammlungFolder'))
      .map((el) => {
        const { datum } = el
        const art = el?.art?.art_ae_art?.name ?? '(keine Art)'
        const person = el?.person?.name ?? '(keine Person)'
        const herkunft = el?.herkunft?.nr ?? '(keine Herkunft-Nr)'
        const date = datum
          ? moment(datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : 'kein Datum'
        const geplant = el.geplant ? ' (geplant)' : ''
        const label = `${
          el.nr ?? '(keine Nr)'
        }, ${date}: Herkunft ${herkunft}, ${person}; ${art}${geplant}`

        return {
          nodeType: 'table',
          menuTitle: 'Sammlung',
          table: 'sammlung',
          id: `sammlung${el.id}`,
          parentId: 'sammlungFolder',
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
