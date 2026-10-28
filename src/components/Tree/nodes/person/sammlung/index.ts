import { first as first$ } from 'rxjs/operators'

export const buildPersonSammlung = async ({
  sammlung,
  index,
  personId,
  personIndex,
}: {
  sammlung: import('../../../../../dbModel.ts').Sammlung
  index: number
  personId: string
  personIndex: number
}) => {
  let label = ''
  try {
    label = (await sammlung.label.pipe(first$()).toPromise()) ?? ''
  } catch {}

  return {
    nodeType: 'table',
    menuTitle: 'Sammlung',
    table: 'sammlung',
    id: `${personId}${sammlung.id}`,
    label,
    url: ['Personen', personId, 'Sammlungen', sammlung.id],
    sort: [11, personIndex, 1, index],
    hasChildren: false,
  }
}
