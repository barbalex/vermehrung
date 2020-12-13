import { first as first$ } from 'rxjs/operators'

const kulturZaehlungNodes = async ({
  zaehlung,
  zaehlungIndex,
  kulturId,
  kulturIndex,
}) => {
  const label = await zaehlung.label.pipe(first$()).toPromise()

  return {
    nodeType: 'table',
    menuTitle: 'Zählung',
    table: 'zaehlung',
    id: `${kulturId}${zaehlung.id}`,
    label,
    url: ['Kulturen', kulturId, 'Zaehlungen', zaehlung.id],
    sort: [5, kulturIndex, 2, zaehlungIndex],
    hasChildren: false,
    mono: true,
  }
}

export default kulturZaehlungNodes
