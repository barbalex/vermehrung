import { DateTime } from 'luxon'

const herkunftLabelFromHerkunft = ({ herkunft }) => {
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
      node.length === 3 && node[0] === 'Arten' && node[2] === 'Sammlungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const artId = node[1]
    const artIndex = art.findIndex((a) => a.id === artId)
    const sammlungen = store.sammlungsFiltered.filter((s) => s.art_id === artId)

    return sammlungen
      .map((el) => {
        const person = el.person_id ? store.persons.get(el.person_id) : {}
        const personLabel = person?.fullname
          ? person.fullname ?? '(Person ohne Name)'
          : ''
        const datumLabel = el.datum
          ? DateTime.fromSQL(el.datum).toFormat('yyyy.LL.dd')
          : 'Kein Datum'
        const herkunft = el.herkunft_id
          ? store.herkunfts.get(el.herkunft_id)
          : {}
        const herkunftLabel = `von: ${herkunftLabelFromHerkunft({ herkunft })}`
        const geplantLabel = el.geplant ? 'geplant' : undefined
        const label = [datumLabel, herkunftLabel, personLabel, geplantLabel]
          .filter((e) => !!e)
          .join('; ')

        return {
          nodeType: 'table',
          menuTitle: 'Sammlung',
          table: 'sammlung',
          id: `${artId}${el.id}`,
          label,
          url: ['Arten', artId, 'Sammlungen', el.id],
          hasChildren: true,
        }
      })
      .map((el, index) => ({ ...el, sort: [1, artIndex, 1, index] }))
  })
}
