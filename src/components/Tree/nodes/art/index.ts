import { first as first$ } from 'rxjs/operators'

export const buildArt = async ({
  art,
  index,
  label: labelPassed,
}: {
  art: import('../../../../dbModel.ts').Art
  index: number
  // pass the label when the caller already resolved it (e.g. for
  // sorting) to spare the second async round trip per art
  label?: string
}) => {
  let label = labelPassed ?? ''
  if (labelPassed === undefined) {
    try {
      label = (await art.label.pipe(first$()).toPromise()) ?? ''
    } catch {}
  }

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
