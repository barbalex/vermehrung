import get from 'lodash/get'

export default ({ nodes, data }) => {
  const zaehlungen = get(data, 'zaehlung', [])

  return (
    zaehlungen
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('zaehlungFolder'))
      .map(el => {
        return {
          nodeType: 'table',
          menuTitle: 'Zählung',
          table: 'zaehlung',
          id: `zaehlung${el.id}`,
          parentId: 'zaehlungFolder',
          label: el.datum || '(kein Datum)',
          url: ['Zaehlungen', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [7, index]
        return el
      })
  )
}
