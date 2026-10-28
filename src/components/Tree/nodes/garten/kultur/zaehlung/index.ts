import { first as first$ } from 'rxjs/operators'

export const buildGartenKulturZaehlung = async ({
  zaehlung,
  zaehlungIndex,
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
}: {
  zaehlung: import('../../../../../../dbModel.ts').Zaehlung
  zaehlungIndex: number
  kulturId: string
  kulturIndex: number
  gartenId: string
  gartenIndex: number
}) => {
  let label = ''
  try {
    label = await zaehlung.label.pipe(first$()).toPromise()
  } catch {}

  return {
    nodeType: 'table',
    menuTitle: 'Zählung',
    table: 'zaehlung',
    id: `${gartenId}${kulturId}${zaehlung.id}`,
    label,
    url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Zaehlungen', zaehlung.id],
    sort: [4, gartenIndex, 1, kulturIndex, 2, zaehlungIndex],
    hasChildren: false,
    mono: true,
  }
}
