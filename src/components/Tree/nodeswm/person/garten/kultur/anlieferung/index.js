import lieferungLabelFromLieferung from '../../../../../../../utils/lieferungLabelFromLieferung'

const personGartenKulturAnlieferungNodes = ({ store }) => {
  const {
    showPerson,
    visibleOpenNodes,
    person,
    personGarten,
    personGartenKultur,
  } = store.tree
  if (!showPerson) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 7 &&
      node[0] === 'Personen' &&
      node[2] === 'Gaerten' &&
      node[4] === 'Kulturen' &&
      node[6] === 'An-Lieferungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const personId = node[1]
    const personIndex = person.findIndex((a) => a.id === personId)
    const gartenId = node[3]
    const gartenIndex = personGarten.findIndex(
      (a) => a.id === `${personId}${gartenId}`,
    )
    const kulturId = node[5]
    const kulturIndex = personGartenKultur.findIndex(
      (a) => a.id === `${personId}${gartenId}${kulturId}`,
    )

    const anlieferungen = store.lieferungsFiltered.filter(
      (z) => z.nach_kultur_id === kulturId,
    )

    return anlieferungen
      .map((el) => ({
        nodeType: 'table',
        menuTitle: 'An-Lieferung',
        table: 'lieferung',
        id: `${personId}${gartenId}${kulturId}${el.id}`,
        label: lieferungLabelFromLieferung({ lieferung: el }),
        url: [
          'Personen',
          personId,
          'Gaerten',
          gartenId,
          'Kulturen',
          kulturId,
          'An-Lieferungen',
          el.id,
        ],
        hasChildren: false,
        mono: true,
      }))
      .map((el, index) => {
        el.sort = [11, personIndex, 2, gartenIndex, 1, kulturIndex, 3, index]
        return el
      })
  })
}

export default personGartenKulturAnlieferungNodes