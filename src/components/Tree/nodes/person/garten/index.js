import { first as first$ } from 'rxjs/operators'

const personGartenNodes = async ({ garten, index, personId, personIndex }) => {
  let label = ''
  try {
    label = await garten.label.pipe(first$()).toPromise()
  } catch {}

  return {
    nodeType: 'table',
    menuTitle: 'Garten',
    table: 'garten',
    id: `${personId}${garten.id}`,
    label,
    url: ['Personen', personId, 'Gaerten', garten.id],
    sort: [11, personIndex, 2, index],
    hasChildren: true,
    aktiv: garten.aktiv,
  }
}

export default personGartenNodes
