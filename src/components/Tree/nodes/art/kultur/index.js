import { first as first$ } from 'rxjs/operators'

const artKulturNode = async ({ kultur, kulturIndex, artId, artIndex }) => {
  let label = ''
  try {
    label = await kultur.labelUnderArt.pipe(first$()).toPromise()
  } catch {}

  return {
    nodeType: 'table',
    menuTitle: 'Kultur',
    table: 'kultur',
    id: `${artId}${kultur.id}`,
    label,
    url: ['Arten', artId, 'Kulturen', kultur.id],
    sort: [1, artIndex, 3, kulturIndex],
    hasChildren: true,
    aktiv: kultur.aktiv,
  }
}

export default artKulturNode
