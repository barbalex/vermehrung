import findIndex from 'lodash/findIndex'

export default ({ nodes, store, url }) => {
  const sammlungId = url[1]
  console.log('nodes, sammlung herkunft, sammlungId:', sammlungId)

  const sammlung = store.sammlungs.get(sammlungId) || {}
  const herkunfts = store.herkunftsFiltered.filter(
    (h) => h.id === sammlung.herkunft_id,
  )

  const sammlungNodes = nodes.filter((n) => n.parentId === 'sammlungFolder')
  const sammlungIndex = findIndex(
    sammlungNodes,
    (n) => n.id === `sammlung${sammlungId}`,
  )

  return (
    herkunfts
      // only show if parent node exists
      .filter(() =>
        nodes.map((n) => n.id).includes(`sammlung${sammlungId}HerkunftFolder`),
      )
      // there were null values causing errors
      .filter((n) => !!n)
      .map((el) => {
        const label = `${el.nr || '(keine Nr)'}: ${
          el.gemeinde || '(keine Gemeinde)'
        }, ${el.lokalname || '(kein Lokalname)'}`

        return {
          nodeType: 'table_no_menu',
          menuTitle: 'Herkunft',
          table: 'herkunft',
          id: `sammlung${sammlungId}Herkunft${el.id}`,
          parentId: `sammlung${sammlungId}HerkunftFolder`,
          label,
          url: ['Sammlungen', sammlungId, 'Herkuenfte', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [3, sammlungIndex, 1, index]
        return el
      })
  )
}
