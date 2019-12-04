import get from 'lodash/get'

export default ({ nodes, data }) => {
  const teilkulturen = get(data, 'teilkultur') || []
  /*.filter(t =>
    get(t, 'kultur.kultur_felder.tk'),
  )*/

  return (
    teilkulturen
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('teilkulturFolder'))
      .map(el => {
        return {
          nodeType: 'table',
          menuTitle: 'Teilkultur',
          table: 'teilkultur',
          id: `teilkultur${el.id}`,
          parentId: 'teilkulturFolder',
          label: el.name || '(kein Name)',
          url: ['Teilkulturen', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [6, index]
        return el
      })
  )
}
