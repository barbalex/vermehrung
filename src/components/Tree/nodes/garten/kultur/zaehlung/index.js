import { first as first$ } from 'rxjs/operators'

const gartenKulturZaehlungNodes = async ({
  zaehlung,
  zaehlungIndex,
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
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

export default gartenKulturZaehlungNodes
