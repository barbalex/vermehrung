import isEqual from 'lodash/isEqual'

export default ({ store }) => {
  const { showHerkunft, visibleOpenNodes } = store.tree
  if (!showHerkunft) return []

  return (
    store.herkunftsFiltered
      // only show if parent node exists
      .filter(() =>
        visibleOpenNodes.some((node) => isEqual(['Herkuenfte'], node)),
      )
      .map((el) => {
        // only show lokal if exist
        // does not exist if user does not have right to see it
        const gemeinde = el.gemeinde || ''
        const lokalname = el.lokalname || ''
        const nr = el.nr || '(keine Nr.)'
        const label = [nr, gemeinde, lokalname].filter((e) => !!e).join(', ')

        return {
          nodeType: 'table',
          menuTitle: 'Herkunft',
          table: 'herkunft',
          id: el.id,
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
