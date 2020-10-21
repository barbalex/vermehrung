import { DateTime } from 'luxon'

const sammlungLabelFromSammlung = ({ sammlung, store }) => {
  const art = sammlung?.art_id ? store.arts.get(sammlung.art_id) : {}
  const aeArt = art?.ae_id ? store.ae_arts.get(art.ae_id) : {}
  const herkunft = sammlung.herkunft_id
    ? store.herkunfts.get(sammlung.herkunft_id)
    : {}

  const artLabel = art ? aeArt?.name ?? '(Art ohne Name)' : '(keine Art)'
  const herkunftLabel = herkunft?.id
    ? `von ${herkunft?.nr}` ?? '(Herkunft ohne Nr)'
    : '(keine Herkunft)'
  const datumLabel = sammlung?.datum
    ? DateTime.fromSQL(sammlung?.datum).toFormat('yyyy.LL.dd')
    : 'Kein Datum'
  const geplantLabel = sammlung?.geplant ? 'geplant' : undefined
  const label = [datumLabel, herkunftLabel, artLabel, geplantLabel]
    .filter((e) => !!e)
    .join('; ')

  return label
}

export default ({ store }) => {
  const { showPerson, visibleOpenNodes, person } = store.tree
  if (!showPerson) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 3 && node[0] === 'Personen' && node[2] === 'Sammlungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const personId = node[1]
    const personIndex = person.findIndex((a) => a.id === personId)

    const sammlungen = store.sammlungsFiltered.filter(
      (s) => s.person_id === personId,
    )

    return sammlungen
      .map((el) => ({
        nodeType: 'table',
        menuTitle: 'Sammlung',
        table: 'sammlung',
        id: `${personId}${el.id}`,
        label: sammlungLabelFromSammlung({ sammlung: el, store }),
        url: ['Personen', personId, 'Sammlungen', el.id],
        hasChildren: false,
      }))
      .map((el, index) => {
        el.sort = [11, personIndex, 1, index]
        return el
      })
  })
}
