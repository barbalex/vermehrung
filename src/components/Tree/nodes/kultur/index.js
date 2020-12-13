import { first as first$ } from 'rxjs/operators'

const kulturNodes = async ({ kultur, index }) => {
  const label = await kultur.label.pipe(first$()).toPromise()

  return {
    nodeType: 'table',
    menuTitle: 'Kultur',
    table: 'kultur',
    id: kultur.id,
    label,
    url: ['Kulturen', kultur.id],
    sort: [5, index],
    hasChildren: true,
  }
}

export default kulturNodes
