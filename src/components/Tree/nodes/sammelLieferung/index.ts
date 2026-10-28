import { first as first$ } from 'rxjs/operators'

export const buildSammelLieferung = async ({ sammelLieferung, index }) => {
  let label = ''
  try {
    label = await sammelLieferung.label.pipe(first$()).toPromise()
  } catch {}

  return {
    nodeType: 'table',
    menuTitle: 'Sammel-Lieferung',
    table: 'sammel_lieferung',
    id: sammelLieferung.id,
    label,
    url: ['Sammel-Lieferungen', sammelLieferung.id],
    sort: [9, index],
    hasChildren: true,
    mono: true,
  }
}
