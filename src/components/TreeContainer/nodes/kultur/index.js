import isEqual from 'lodash/isEqual'

export default ({ store }) => {
  const { showKultur, visibleOpenNodes } = store.tree
  if (!showKultur) return []

  return (
    store.kultursFiltered
      // only show if parent node exists
      .filter(() =>
        visibleOpenNodes.some((node) => isEqual(['Kulturen'], node)),
      )
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
          id: el.id,
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
