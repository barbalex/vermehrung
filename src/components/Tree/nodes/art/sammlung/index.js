import { first as first$ } from 'rxjs/operators'

const artSammlungNodes = async ({
  sammlung,
  sammlungIndex,
  artId,
  artIndex,
}) => {
  const label = await sammlung.label.pipe(first$()).toPromise()

  return {
    nodeType: 'table',
    menuTitle: 'Sammlung',
    table: 'sammlung',
    id: `${artId}${sammlung.id}`,
    label,
    url: ['Arten', artId, 'Sammlungen', sammlung.id],
    hasChildren: true,
    sort: [1, artIndex, 1, sammlungIndex],
  }
}

export default artSammlungNodes
