import isEqual from 'lodash/isEqual'

export default ({ store }) => {
  const { showTeilkultur, visibleOpenNodes } = store.tree

  if (!showTeilkultur) return []

  return (
    store.teilkultursFiltered
      // only show if parent node exists
      .filter(() =>
        visibleOpenNodes.some((node) => isEqual(['Teilkulturen'], node)),
      )
      .map((el) => {
        return {
          nodeType: 'table',
          menuTitle: 'Teilkultur',
          table: 'teilkultur',
          id: el.id,
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
