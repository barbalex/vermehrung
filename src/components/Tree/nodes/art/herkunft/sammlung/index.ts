import { first as first$ } from 'rxjs/operators'

export const buildArtHerkunftSammlung = async ({
  sammlung,
  sammlungIndex,
  herkunft,
  herkunftIndex,
  artId,
  artIndex,
}) => {
  let label = ''
  try {
    label = await sammlung.label.pipe(first$()).toPromise()
  } catch {}

  return {
    nodeType: 'table',
    menuTitle: 'Sammlung',
    table: 'sammlung',
    id: `${artId}/${herkunft.id}/${sammlung.id}`,
    label,
    url: ['Arten', artId, 'Herkuenfte', herkunft.id, 'Sammlungen', sammlung.id],
    hasChildren: true,
    sort: [1, artIndex, 1, herkunftIndex, 1, sammlungIndex],
  }
}
