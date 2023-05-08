import { first as first$ } from 'rxjs/operators'

const gartenNodes = async ({ garten, index }) => {
  let label = ''
  try {
    label = await garten.label.pipe(first$()).toPromise()
  } catch {}

  return {
    nodeType: 'table',
    menuTitle: 'Garten',
    table: 'garten',
    id: garten.id,
    label,
    url: ['Gaerten', garten.id],
    sort: [4, index],
    hasChildren: true,
    aktiv: garten.aktiv,
  }
}

export default gartenNodes
