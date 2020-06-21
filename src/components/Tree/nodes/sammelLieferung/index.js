import isEqual from 'lodash/isEqual'
import moment from 'moment'

export default ({ store }) => {
  const { showSammelLieferung, visibleOpenNodes } = store.tree

  if (!showSammelLieferung) return []

  return (
    store.sammelLieferungsFiltered
      // only show if parent node exists
      .filter(() =>
        visibleOpenNodes.some((node) => isEqual(['Sammel-Lieferungen'], node)),
      )
      .map((el) => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : `Kein Datum. ID: ${el.id}`
        const garten = el?.kulturByVonKulturId?.garten?.name
        const gartenPerson = el?.kulturByVonKulturId?.garten?.person?.fullname
        const von =
          garten ?? gartenPerson ? `, von: ${garten || gartenPerson}` : ''
        const werPerson = el?.person?.fullname
        const wer = werPerson ? `, wer: ${werPerson}` : ''
        const label = `${datum}${von}${wer}`

        return {
          nodeType: 'table',
          menuTitle: 'Sammel-Lieferung',
          table: 'sammel_lieferung',
          id: el.id,
          label,
          url: ['Sammel-Lieferungen', el.id],
          hasChildren: true,
          mono: true,
        }
      })
      .map((el, index) => {
        el.sort = [9, index]
        return el
      })
  )
}
