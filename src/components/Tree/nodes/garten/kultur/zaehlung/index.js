import { DateTime } from 'luxon'

export default ({ store }) => {
  const { showGarten, visibleOpenNodes, garten, gartenKultur } = store.tree
  if (!showGarten) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 5 &&
      node[0] === 'Gaerten' &&
      node[2] === 'Kulturen' &&
      node[4] === 'Zaehlungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const gartenId = node[1]
    const gartenIndex = garten.findIndex((a) => a.id === gartenId)
    const kulturId = node[3]
    const kulturIndex = gartenKultur.findIndex(
      (a) => a.id === `${gartenId}${kulturId}`,
    )
    const zaehlungen = store.zaehlungsFiltered.filter(
      (z) => z.kultur_id === kulturId,
    )

    return zaehlungen
      .map((el) => {
        const datum = el.datum
          ? DateTime.fromSQL(el.datum).toFormat('yyyy.LL.dd')
          : 'kein Datum'
        const anz =
          el?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_pflanzen ?? '-'
        const anzAb =
          el?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_auspflanzbereit ??
          '-'
        const anzMu =
          el?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_mutterpflanzen ??
          '-'
        const numbers = `${anz
          .toString()
          .padStart(3, '\u00A0')}/${anzAb
          .toString()
          .padStart(3, '\u00A0')}/${anzMu.toString().padStart(3, '\u00A0')}`
        const prognose = el.prognose ? ' (Prognose)' : ''
        const label = `${datum}: ${numbers}${prognose}`

        return {
          nodeType: 'table',
          menuTitle: 'Zählung',
          table: 'zaehlung',
          id: `${gartenId}${kulturId}${el.id}`,
          label,
          url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Zaehlungen', el.id],
          hasChildren: false,
          mono: true,
        }
      })
      .map((el, index) => {
        el.sort = [4, gartenIndex, 1, kulturIndex, 2, index]
        return el
      })
  })
}
