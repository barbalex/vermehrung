import get from 'lodash/get'
import moment from 'moment'

export default ({ nodes, data }) => {
  const sammelLieferungen = get(data, 'sammel_lieferung', [])

  return (
    sammelLieferungen
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('sammelLieferungFolder'))
      .map(el => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : `Kein Datum. ID: ${el.id}`
        const garten = get(el, 'kulturByVonKulturId.garten.name')
        const gartenPerson = get(el, 'kulturByVonKulturId.garten.person.name')
        const von =
          garten || gartenPerson ? `, von: ${garten || gartenPerson}` : ''
        const werPerson = get(el, 'person.name')
        const wer = werPerson ? `, wer: ${werPerson}` : ''
        const label = `${datum}${von}${wer}`

        return {
          nodeType: 'table',
          menuTitle: 'Sammel-Lieferung',
          table: 'sammel_lieferung',
          id: `sammelLieferung${el.id}`,
          parentId: 'sammelLieferungFolder',
          label,
          url: ['Sammel-Lieferungen', el.id],
          hasChildren: false,
          mono: true,
        }
      })
      .map((el, index) => {
        el.sort = [9, index]
        return el
      })
  )
}
