import get from 'lodash/get'

export default ({ nodes, data }) => {
  const aufgaben = get(data, 'aufgabe', [])

  return (
    aufgaben
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('aufgabeFolder'))
      .map(el => {
        return {
          nodeType: 'table',
          menuTitle: 'Zählung',
          table: 'aufgabe',
          id: `aufgabe${el.id}`,
          parentId: 'aufgabeFolder',
          label: el.aufgabe || '(keine Aufgabe)',
          url: ['Aufgaben', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [7, index]
        return el
      })
  )
}
