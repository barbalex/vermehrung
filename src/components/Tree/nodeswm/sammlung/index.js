import { first as first$ } from 'rxjs/operators'

const sammlungNodes = async ({ sammlung, index }) => {
  const label = await sammlung.label.pipe(first$()).toPromise()

  return {
    nodeType: 'table',
    menuTitle: 'Sammlung',
    table: 'sammlung',
    id: sammlung.id,
    label,
    url: ['Sammlungen', sammlung.id],
    sort: [3, index],
    hasChildren: true,
  }
}

export default sammlungNodes
