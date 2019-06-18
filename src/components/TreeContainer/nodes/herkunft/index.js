import get from 'lodash/get'

export default ({ nodes, data }) => {
  const herkuenfte = get(data, 'herkunft', [])

  return (
    herkuenfte
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('herkunftFolder'))
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'Herkunft',
        table: 'herkunft',
        id: `herkunft${el.id}`,
        parentId: 'herkunftFolder',
        label: `${el.nr || '(keine Nr)'}: ${el.lokalname || 'kein Lokalname'}`,
        url: ['Herkuenfte', el.id],
        hasChildren: true,
      }))
      .map((el, index) => {
        el.sort = [2, index]
        return el
      })
  )
}
