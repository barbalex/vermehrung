import { first as first$ } from 'rxjs/operators'

const sammelLieferungNodes = async ({
  sammelLieferung,
  sammelLieferungIndex,
}) => {
  const label = await sammelLieferung.label.pipe(first$()).toPromise()

  return {
    nodeType: 'table',
    menuTitle: 'Sammel-Lieferung',
    table: 'sammel_lieferung',
    id: sammelLieferung.id,
    label,
    url: ['Sammel-Lieferungen', sammelLieferung.id],
    sort: [9, sammelLieferungIndex],
    hasChildren: true,
    mono: true,
  }
}

export default sammelLieferungNodes
