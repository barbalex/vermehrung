import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../../compareLabel'
import filterNodes from '../../../../../../utils/filterNodes'

export default ({ nodes, data, url, store }) => {
  const gartenId = url[1]
  const kulturId = url[3]
  const gaerten = filterNodes({
    rows: get(data, 'garten', []),
    filter: store.filter,
    table: 'garten',
  })
  const garten = gaerten.find(a => a.id === gartenId)
  const kulturen = filterNodes({
    rows: get(garten, 'kultursBygartenId', []),
    filter: store.filter,
    table: 'kultur',
  })
  const kultur = kulturen.find(k => k.id === kulturId)
  const anlieferungen = filterNodes({
    rows: get(kultur, 'lieferungsBynachKulturId', []),
    filter: store.filter,
    table: 'lieferung',
  })

  const gartenNodes = nodes.filter(n => n.parentId === 'gartenFolder')
  const gartenIndex = findIndex(gartenNodes, n => n.id === `garten${gartenId}`)
  const kulturNodes = nodes.filter(
    n => n.parentId === `garten${gartenId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    n => n.id === `garten${gartenId}Kultur${kulturId}`,
  )

  return (
    anlieferungen
      // only show if parent node exists
      .filter(() =>
        nodes
          .map(n => n.id)
          .includes(`garten${gartenId}Kultur${kulturId}AnLieferungFolder`),
      )
      .map(el => {
        const label = `${get(el, 'nach_datum', '(kein nach-Datum)')}: ${get(
          el,
          'personBypersonId.name',
          '(kein Name)',
        )}; ${get(el, 'lieferungTypWerteBytyp.wert', '(kein Typ)')}; ${get(
          el,
          'lieferungStatusWerteBystatus.wert',
          '(kein Status)',
        )}`

        return {
          nodeType: 'table',
          menuTitle: 'An-Lieferung',
          table: 'lieferung',
          id: `garten${gartenId}Kultur${kulturId}Lieferung${el.id}`,
          parentId: `garten${gartenId}Kultur${kulturId}AnLieferungFolder`,
          label,
          url: [
            'Gaerten',
            gartenId,
            'Kulturen',
            kulturId,
            'An-Lieferungen',
            el.id,
          ],
          hasChildren: false,
        }
      })
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [2, gartenIndex, 1, kulturIndex, 2, index]
        return el
      })
  )
}
