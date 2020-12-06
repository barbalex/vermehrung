import { first as first$ } from 'rxjs/operators'

const artKulturNode = async ({ kultur, kulturIndex, artId, artIndex }) => {
  const label = await kultur.labelUnderArt.pipe(first$()).toPromise()

  return {
    nodeType: 'table',
    menuTitle: 'Kultur',
    table: 'kultur',
    id: `${artId}${kultur.id}`,
    label,
    url: ['Arten', artId, 'Kulturen', kultur.id],
    sort: [1, artIndex, 2, kulturIndex],
    hasChildren: true,
  }
}

export default artKulturNode
