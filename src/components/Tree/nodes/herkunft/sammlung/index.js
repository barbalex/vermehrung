import { first as first$ } from 'rxjs/operators'

export const buildHerkunftSammlung = async ({
  sammlung,
  sammlungIndex,
  herkunftId,
  herkunftIndex,
}) => {
  let label = ''
  try {
    label = await sammlung.labelUnderHerkunft.pipe(first$()).toPromise()
  } catch {}

  return {
    nodeType: 'table',
    menuTitle: 'Sammlung',
    table: 'sammlung',
    id: `${herkunftId}${sammlung.id}`,
    label,
    url: ['Herkuenfte', herkunftId, 'Sammlungen', sammlung.id],
    sort: [2, herkunftIndex, 2, sammlungIndex],
    hasChildren: true,
  }
}
