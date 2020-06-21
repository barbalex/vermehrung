import isEqual from 'lodash/isEqual'

export default ({ store }) => {
  const { showPerson, visibleOpenNodes } = store.tree

  if (!showPerson) return []

  return (
    store.personsFiltered
      // only show if parent node exists
      .filter(() =>
        visibleOpenNodes.some((node) => isEqual(['Personen'], node)),
      )
      .map((el) => ({
        nodeType: 'table',
        menuTitle: 'Person',
        table: 'person',
        id: el.id,
        label: el?.fullname ?? '(kein Name)',
        url: ['Personen', el.id],
        hasChildren: true,
      }))
      .map((el, index) => {
        el.sort = [11, index]
        return el
      })
  )
}
