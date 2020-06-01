export default ({ nodes, store }) => {
  const kulturen = store.kultursFiltered

  return (
    kulturen
      // only show if parent node exists
      .filter(() => nodes.map((n) => n.id).includes('kulturFolder'))
      .map((el) => {
        const garten =
          el?.garten?.name ?? `(${el?.garten?.person?.name ?? 'kein Name'})`
        const art = el?.art?.art_ae_art?.name ?? '(keine Art)'
        const herkunft = el?.herkunft?.nr ?? '(Herkunft ohne Nr)'
        const label = `${art}, von: ${herkunft}, in: ${garten}`

        return {
          nodeType: 'table',
          menuTitle: 'Kultur',
          table: 'kultur',
          id: `kultur${el.id}`,
          parentId: 'kulturFolder',
          label,
          url: ['Kulturen', el.id],
          hasChildren: true,
        }
      })
      .map((el, index) => {
        el.sort = [5, index]
        return el
      })
  )
}
