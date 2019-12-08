import get from 'lodash/get'

export default ({ nodes, data }) => {
  const herkuenfte = get(data, 'herkunft') || []

  return (
    herkuenfte
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('herkunftFolder'))
      .map(el => {
        // only show lokal if exist
        // does not exist if user does not have right to see it
        const lokal =
          el.gemeinde || el.lokalname
            ? `, ${el.gemeinde && `${el.gemeinde}, `}${el.lokalname &&
                el.lokalname}`
            : ''
        const nr = el.nr || '(keine Nr.)'
        const label = `${nr}${lokal}`

        return {
          nodeType: 'table',
          menuTitle: 'Herkunft',
          table: 'herkunft',
          id: `herkunft${el.id}`,
          parentId: 'herkunftFolder',
          label,
          url: ['Herkuenfte', el.id],
          hasChildren: true,
        }
      })
      .map((el, index) => {
        el.sort = [2, index]
        return el
      })
  )
}
