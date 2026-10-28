import { first as first$ } from 'rxjs/operators'

export const buildArtKulturZaehlung = async ({
  zaehlung,
  zaehlungIndex,
  kulturId,
  kulturIndex,
  artId,
  artIndex,
}) => {
  let label = ''
  try {
    label = await zaehlung.label.pipe(first$()).toPromise()
  } catch {}

  return {
    nodeType: 'table',
    menuTitle: 'Zählung',
    table: 'zaehlung',
    id: `${artId}${kulturId}${zaehlung.id}`,
    label,
    url: ['Arten', artId, 'Kulturen', kulturId, 'Zaehlungen', zaehlung.id],
    sort: [1, artIndex, 3, kulturIndex, 2, zaehlungIndex],
    hasChildren: false,
    mono: true,
  }
}
