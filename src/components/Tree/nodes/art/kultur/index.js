import gartenLabelFromKultur from '../../../../../utils/gartenLabelFromKultur'

const herkunftLabelFromKultur = ({ kultur, store }) => {
  const herkunft = kultur?.herkunft_id
    ? store.herkunfts.get(kultur.herkunft_id)
    : {}
  if (!herkunft) return 'keine Herkunft'
  if (!herkunft?.id) return 'keine Herkunft'
  // only show lokalname if exist
  // does not exist if user does not have right to see it
  const gemeinde = herkunft?.gemeinde ?? 'keine Gemeinde'
  const nr = herkunft?.nr ?? 'keine Nr.'
  const label = [gemeinde, nr].filter((e) => !!e).join(', ')

  return label
}

export default ({ store }) => {
  const { showArt, visibleOpenNodes, art } = store.tree
  if (!showArt) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 3 && node[0] === 'Arten' && node[2] === 'Kulturen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const artId = node[1]
    const artIndex = art.findIndex((a) => a.id === artId)
    const kulturen = store.kultursFiltered.filter((k) => k.art_id === artId)

    return kulturen
      .map((k) => {
        const herkunftLabel = `von: ${herkunftLabelFromKultur({
          kultur: k,
          store,
        })}`
        const gartenLabel = `in: ${gartenLabelFromKultur({ kultur: k, store })}`
        const zwischenlagerLabel = k?.zwischenlager
          ? 'Zwischenlager'
          : undefined
        const label = [herkunftLabel, gartenLabel, zwischenlagerLabel]
          .filter((e) => !!e)
          .join('; ')

        return {
          nodeType: 'table',
          menuTitle: 'Kultur',
          table: 'kultur',
          id: `${artId}${k.id}`,
          label,
          url: ['Arten', artId, 'Kulturen', k.id],
          hasChildren: true,
        }
      })
      .map((k, index) => {
        k.sort = [1, artIndex, 2, index]
        return k
      })
  })
}
