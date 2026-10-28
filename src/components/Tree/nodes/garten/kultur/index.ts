import { first as first$ } from 'rxjs/operators'

export const buildGartenKultur = async ({
  kultur,
  kulturIndex,
  gartenId,
  gartenIndex,
}: {
  kultur: import('../../../../../dbModel.ts').Kultur
  kulturIndex: number
  gartenId: string
  gartenIndex: number
}) => {
  let label = ''
  try {
    label = (await kultur.labelUnderGarten.pipe(first$()).toPromise()) ?? ''
  } catch {}

  return {
    nodeType: 'table',
    menuTitle: 'Kultur',
    table: 'kultur',
    id: `${gartenId}${kultur.id}`,
    label,
    url: ['Gaerten', gartenId, 'Kulturen', kultur.id],
    sort: [4, gartenIndex, 1, kulturIndex],
    hasChildren: true,
    aktiv: kultur.aktiv,
  }
}
