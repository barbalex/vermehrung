import { first as first$ } from 'rxjs/operators'

export const buildArtHerkunftKultur = async ({
  kultur,
  kulturIndex,
  herkunft,
  herkunftIndex,
  artId,
  artIndex,
}: {
  kultur: import('../../../../../../dbModel.ts').Kultur
  kulturIndex: number
  herkunft: import('../../../../../../dbModel.ts').Herkunft
  herkunftIndex: number
  artId: string
  artIndex: number
}) => {
  let label = ''
  try {
    label = await kultur.labelUnderArt.pipe(first$()).toPromise()
  } catch {}

  return {
    nodeType: 'table',
    menuTitle: 'Kultur',
    table: 'kultur',
    id: `${artId}/${herkunft.id}/${kultur.id}`,
    label,
    url: ['Arten', artId, 'Herkuenfte', herkunft.id, 'Kulturen', kultur.id],
    sort: [1, artIndex, 1, herkunftIndex, 2, kulturIndex],
    hasChildren: true,
    aktiv: kultur.aktiv,
  }
}
