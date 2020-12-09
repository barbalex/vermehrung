import { first as first$ } from 'rxjs/operators'

const gartenNodes = async ({ garten, index }) => {
  const label = await garten.label.pipe(first$()).toPromise()

  return {
    nodeType: 'table',
    menuTitle: 'Garten',
    table: 'garten',
    id: garten.id,
    label,
    url: ['Gaerten', garten.id],
    sort: [4, index],
    hasChildren: true,
  }
}

export default gartenNodes
