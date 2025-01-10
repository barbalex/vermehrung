import { first as first$ } from 'rxjs/operators'

export const buildPersonGartenKulturZaehlung = async ({
  zaehlung,
  zaehlungIndex,
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
  personId,
  personIndex,
}) => {
  let label = ''
  try {
    label = await zaehlung.label.pipe(first$()).toPromise()
  } catch {}

  return {
    nodeType: 'table',
    menuTitle: 'Zählung',
    table: 'zaehlung',
    id: `${personId}${gartenId}${kulturId}${zaehlung.id}`,
    label,
    url: [
      'Personen',
      personId,
      'Gaerten',
      gartenId,
      'Kulturen',
      kulturId,
      'Zaehlungen',
      zaehlung.id,
    ],
    sort: [11, personIndex, 2, gartenIndex, 1, kulturIndex, 2, zaehlungIndex],
    hasChildren: false,
    mono: true,
  }
}
