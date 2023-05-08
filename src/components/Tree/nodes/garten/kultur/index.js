import { first as first$ } from 'rxjs/operators'

const gartenKulturNodes = async ({
  kultur,
  kulturIndex,
  gartenId,
  gartenIndex,
}) => {
  let label = ''
  try {
    label = await kultur.labelUnderGarten.pipe(first$()).toPromise()
  } catch {}

  return {
    nodeType: 'table',
    menuTitle: 'Kultur',
    table: 'kultur',
    id: `${gartenId}${kultur.id}`,
    label,
    url: ['Gaerten', gartenId, 'Kulturen', kultur.id],
    sort: [4, gartenIndex, 1, kulturIndex],
    hasChildren: true,
    aktiv: kultur.aktiv,
  }
}

export default gartenKulturNodes
