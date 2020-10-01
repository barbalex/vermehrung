import isEqual from 'lodash/isEqual'
import { DateTime } from 'luxon'

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
          ? DateTime.fromSQL(el.datum).toFormat('yyyy.LL.dd')
          : `Kein Datum. ID: ${el.id}`
        const vonKultur = el.von_kultur_id
          ? store.kulturs.get(el.von_kultur_id)
          : {}
        const vonGarten = vonKultur.garten_id
          ? store.gartens.get(vonKultur.garten_id)
          : {}
        const gartenName = vonGarten?.name
        const vonPerson = vonGarten.person_id
          ? store.persons.get(vonGarten.person_id)
          : {}
        const gartenPerson = vonPerson?.fullname
        const von =
          gartenName ?? gartenPerson
            ? `, von: ${gartenName || gartenPerson}`
            : ''
        const werPerson = el.person_id ? store.persons.get(el.person_id) : {}
        const werPersonLabel = werPerson?.fullname
        const wer = werPersonLabel ? `, wer: ${werPersonLabel}` : ''
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
