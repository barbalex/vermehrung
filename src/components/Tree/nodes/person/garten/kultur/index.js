import { first as first$ } from 'rxjs/operators'

const personGartenKulturNodes = async ({
  kultur,
  kulturIndex,
  gartenId,
  gartenIndex,
  personId,
  personIndex,
}) => {
  const label = await kultur.label.pipe(first$()).toPromise()

  return {
    nodeType: 'table',
    menuTitle: 'Kultur',
    table: 'kultur',
    id: `${personId}${gartenId}${kultur.id}`,
    label,
    url: ['Personen', personId, 'Gaerten', gartenId, 'Kulturen', kultur.id],
    sort: [11, personIndex, 2, gartenIndex, 1, kulturIndex],
    hasChildren: true,
  }
}

export default personGartenKulturNodes
