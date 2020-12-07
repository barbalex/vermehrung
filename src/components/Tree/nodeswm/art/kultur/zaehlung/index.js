import { first as first$ } from 'rxjs/operators'

const artKulturZaehlungNodes = async ({
  zaehlung,
  zaehlungIndex,
  kulturId,
  kulturIndex,
  artId,
  artIndex,
}) => {
  const label = await zaehlung.label.pipe(first$()).toPromise()

  return {
    nodeType: 'table',
    menuTitle: 'Zählung',
    table: 'zaehlung',
    id: `${artId}${kulturId}${zaehlung.id}`,
    label,
    url: ['Arten', artId, 'Kulturen', kulturId, 'Zaehlungen', zaehlung.id],
    sort: [1, artIndex, 2, kulturIndex, 2, zaehlungIndex],
    hasChildren: false,
    mono: true,
  }
}

export default artKulturZaehlungNodes
