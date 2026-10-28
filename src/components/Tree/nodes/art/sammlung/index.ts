import { first as first$ } from 'rxjs/operators'

export const buildArtSammlung = async ({
  sammlung,
  sammlungIndex,
  artId,
  artIndex,
}: {
  sammlung: import('../../../../../dbModel.ts').Sammlung
  sammlungIndex: number
  artId: string
  artIndex: number
}) => {
  let label = ''
  try {
    label = (await sammlung.label.pipe(first$()).toPromise()) ?? ''
  } catch {}

  return {
    nodeType: 'table',
    menuTitle: 'Sammlung',
    table: 'sammlung',
    id: `${artId}${sammlung.id}`,
    label,
    url: ['Arten', artId, 'Sammlungen', sammlung.id],
    hasChildren: true,
    sort: [1, artIndex, 2, sammlungIndex],
  }
}
