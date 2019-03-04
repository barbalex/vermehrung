import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../../compareLabel'
import filterNodes from '../../../../../../utils/filterNodes'

export default ({ nodes, data, url, store }) => {
  const artId = url[1]
  const kulturId = url[3]

  const arten = filterNodes({
    rows: get(data, 'art', []),
    filter: store.filter,
    table: 'art',
  })
  const art = arten.find(a => a.id === artId)
  const kulturen = filterNodes({
    rows: get(art, 'kultursByartId', []),
    filter: store.filter,
    table: 'kultur',
  })
  const kultur = kulturen.find(k => k.id === kulturId)
  const auslieferungen = filterNodes({
    rows: get(kultur, 'lieferungsByvonKulturId', []),
    filter: store.filter,
    table: 'lieferung',
  })

  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${artId}`)
  const kulturNodes = nodes.filter(
    n => n.parentId === `art${artId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    n => n.id === `art${artId}Kultur${kulturId}`,
  )

  return (
    auslieferungen
      // only show if parent node exists
      .filter(() =>
        nodes
          .map(n => n.id)
          .includes(`art${artId}Kultur${kulturId}AusLieferungFolder`),
      )
      .map(el => {
        const label = `${get(el, 'von_datum') || '(kein von-Datum)'}: ${get(
          el,
          'personBypersonId.name',
        ) || '(kein Name)'}; ${get(
          el,
          'lieferungTypWerteBytyp.wert',
          '(kein Typ)',
        )}; ${get(el, 'lieferungStatusWerteBystatus.wert') || '(kein Status)'}`

        return {
          nodeType: 'table',
          menuTitle: 'Auslieferung',
          table: 'lieferung',
          id: `art${artId}Kultur${kulturId}Lieferung${el.id}`,
          parentId: `art${artId}Kultur${kulturId}AusLieferungFolder`,
          label,
          url: ['Arten', artId, 'Kulturen', kulturId, 'Aus-Lieferungen', el.id],
          hasChildren: false,
        }
      })
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [1, artIndex, 1, kulturIndex, 3, index]
        return el
      })
  )
}
