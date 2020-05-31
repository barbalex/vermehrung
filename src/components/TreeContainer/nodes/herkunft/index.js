export default ({ nodes, store }) => {
  const herkuenfte = store.herkunftFiltered

  return (
    herkuenfte
      // only show if parent node exists
      .filter(() => nodes.map((n) => n.id).includes('herkunftFolder'))
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
