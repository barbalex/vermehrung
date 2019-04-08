import get from 'lodash/get'
import memoizeOne from 'memoize-one'

export default ({ nodes, data }) =>
  memoizeOne(() =>
    get(data, 'lieferung_zwischenlager_werte', [])
      // only show if parent node exists
      .filter(() =>
        nodes.map(n => n.id).includes('lieferungZwischenlagerFolder'),
      )
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'Lieferung: Zwischenlager',
        table: 'lieferung_zwischenlager_werte',
        id: `lieferungZwischenlager${el.id}`,
        parentId: 'lieferungZwischenlagerFolder',
        label: get(el, 'wert') || '(kein Wert)',
        url: ['Werte-Listen', 'Lieferung-Zwischenlager', el.id],
        hasChildren: false,
      }))
      .map((el, index) => {
        el.sort = [8, 5, index]
        return el
      }),
  )()
