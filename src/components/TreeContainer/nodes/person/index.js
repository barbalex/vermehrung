import get from 'lodash/get'

export default ({ nodes, data }) => {
  console.log('nodes, person, personData', get(data, 'person', []))
  return (
    get(data, 'person', [])
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('personFolder'))
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'Person',
        table: 'person',
        id: `person${el.id}`,
        parentId: 'personFolder',
        label: get(el, 'name') || '(kein Name)',
        url: ['Personen', el.id],
        hasChildren: true,
        hasAccount: !!el.account_id,
      }))
      .map((el, index) => {
        el.sort = [5, index]
        return el
      })
  )
}
