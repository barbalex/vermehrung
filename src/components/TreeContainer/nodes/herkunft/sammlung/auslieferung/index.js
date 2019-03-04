import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

import compareLabel from '../../../compareLabel'
import filterNodes from '../../../../../../utils/filterNodes'

export default ({ nodes, data, url, store }) => {
  const herkunftId = url[1]
  const sammlungId = url[3]

  const herkunftNodes = nodes.filter(n => n.parentId === 'herkunftFolder')
  const herkunftIndex = findIndex(
    herkunftNodes,
    n => n.id === `herkunft${herkunftId}`,
  )
  const sammlungNodes = nodes.filter(
    n => n.parentId === `herkunft${herkunftId}SammlungFolder`,
  )
  const sammlungIndex = findIndex(
    sammlungNodes,
    n => n.id === `herkunft${herkunftId}Sammlung${sammlungId}`,
  )

  const herkuenfte = filterNodes({
    rows: get(data, 'herkunft', []),
    filter: store.filter,
    table: 'herkunft',
  })
  const herkunft = herkuenfte.find(a => a.id === herkunftId)
  const sammlungen = filterNodes({
    rows: get(herkunft, 'sammlungsByherkunftId', []),
    filter: store.filter,
    table: 'sammlung',
  })
  const sammlung = sammlungen.find(s => s.id === sammlungId)
  const lieferungen = filterNodes({
    rows: get(sammlung, 'lieferungsByvonSammlungId', []),
    filter: store.filter,
    table: 'lieferung',
  })

  return lieferungen
    .map(el => {
      const von_datum = el.von_datum
        ? moment(el.von_datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
        : '(kein von-Datum)'

      const label = `${von_datum}: ${get(el, 'personBypersonId.name') ||
        '(kein Name)'}; ${get(
        el,
        'lieferungTypWerteBytyp.wert',
        '(kein Typ)',
      )}; ${get(el, 'lieferungStatusWerteBystatus.wert') || '(kein Status)'}`

      return {
        nodeType: 'table',
        menuTitle: 'Aus-Lieferung',
        table: 'lieferung',
        id: `herkunft${herkunftId}Sammlung${sammlungId}Lieferung${el.id}`,
        parentId: `herkunft${herkunftId}Sammlung${sammlungId}LieferungFolder`,
        label,
        url: [
          'Herkuenfte',
          herkunftId,
          'Sammlungen',
          sammlungId,
          'Aus-Lieferungen',
          el.id,
        ],
        hasChildren: false,
      }
    })
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [3, herkunftIndex, 2, sammlungIndex, 1, index]
      return el
    })
}
