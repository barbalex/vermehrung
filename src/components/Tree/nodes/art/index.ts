import { first as first$ } from 'rxjs/operators'

export const buildArt = async ({ art, index }) => {
  let label = ''
  try {
    label = await art.label.pipe(first$()).toPromise()
  } catch {}

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
