import { first as first$ } from 'rxjs/operators'

const artNodes = async ({ art, index }) => {
  const label = await art.label.pipe(first$()).toPromise()

  return {
    nodeType: 'table',
    menuTitle: 'Art',
    table: 'art',
    id: art.id,
    label,
    url: ['Arten', art.id],
    sort: [1, index],
    hasChildren: true,
  }
}

export default artNodes
