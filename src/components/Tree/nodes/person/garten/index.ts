import { first as first$ } from 'rxjs/operators'

export const buildPersonGarten = async ({
  garten,
  index,
  personId,
  personIndex,
}: {
  garten: import('../../../../../dbModel.ts').Garten
  index: number
  personId: string
  personIndex: number
}) => {
  let label = ''
  try {
    label = (await garten.label.pipe(first$()).toPromise()) ?? ''
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
