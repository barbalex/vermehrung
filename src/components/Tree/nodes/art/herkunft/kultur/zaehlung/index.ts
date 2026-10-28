import { first as first$ } from 'rxjs/operators'

export const buildArtHerkunftKulturZaehlung = async ({
  zaehlung,
  zaehlungIndex,
  kulturId,
  kulturIndex,
  herkunft,
  herkunftIndex,
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
    id: `/${herkunft.id}/${kulturId}/${zaehlung.id}`,
    label,
    url: [
      'Arten',
      artId,
      'Herkuenfte',
      herkunft.id,
      'Kulturen',
      kulturId,
      'Zaehlungen',
      zaehlung.id,
    ],
    sort: [1, artIndex, 1, herkunftIndex, 2, kulturIndex, 2, zaehlungIndex],
    hasChildren: false,
    mono: true,
  }
}
