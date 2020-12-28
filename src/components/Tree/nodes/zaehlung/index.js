import { first as first$ } from 'rxjs/operators'

const zaehlungNodes = async ({ zaehlung, index }) => {
  let label = ''
  try {
    label = await zaehlung.label.pipe(first$()).toPromise()
  } catch {}

  return {
    nodeType: 'table',
    menuTitle: 'Zählung',
    table: 'zaehlung',
    id: zaehlung.id,
    label,
    url: ['Zaehlungen', zaehlung.id],
    sort: [7, index],
    hasChildren: false,
    mono: true,
  }
}

export default zaehlungNodes
