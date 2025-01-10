import { first as first$ } from 'rxjs/operators'

export const buildKulturZaehlung = async ({
  zaehlung,
  zaehlungIndex,
  kulturId,
  kulturIndex,
}) => {
  let label = ''
  try {
    label = await zaehlung.label.pipe(first$()).toPromise()
  } catch {}

  return {
    nodeType: 'table',
    menuTitle: 'Zählung',
    table: 'zaehlung',
    id: `${kulturId}${zaehlung.id}`,
    label,
    url: ['Kulturen', kulturId, 'Zaehlungen', zaehlung.id],
    sort: [5, kulturIndex, 2, zaehlungIndex],
    hasChildren: false,
    mono: true,
  }
}
