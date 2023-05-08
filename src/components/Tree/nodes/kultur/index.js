import { first as first$ } from 'rxjs/operators'

const kulturNodes = async ({ kultur, index }) => {
  let label = ''
  try {
    label = await kultur.label.pipe(first$()).toPromise()
  } catch {}

  return {
    nodeType: 'table',
    menuTitle: 'Kultur',
    table: 'kultur',
    id: kultur.id,
    label,
    url: ['Kulturen', kultur.id],
    sort: [5, index],
    hasChildren: true,
    aktiv: kultur.aktiv,
  }
}

export default kulturNodes
