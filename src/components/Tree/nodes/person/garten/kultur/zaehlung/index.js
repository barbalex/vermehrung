import { first as first$ } from 'rxjs/operators'

const personGartenKulturZaehlungNodes = async ({
  zaehlung,
  zaehlungIndex,
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
  personId,
  personIndex,
}) => {
  const label = await zaehlung.label.pipe(first$()).toPromise()

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

export default personGartenKulturZaehlungNodes
