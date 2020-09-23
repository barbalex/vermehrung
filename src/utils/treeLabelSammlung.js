import { DateTime } from 'luxon'

export default (el) => {
  const artName = el?.art
    ? el?.art?.art_ae_art?.name ?? '(Art ohne Name)'
    : '(keine Art)'
  const personName = el?.person
    ? el?.person?.fullname ?? '(Person ohne Name)'
    : '(keine Person)'
  const herkunftNr = el?.herkunft
    ? el?.herkunft?.nr ?? '(Herkunft ohne Nr)'
    : '(keine Herkunft)'
  const date = el?.datum
    ? DateTime.fromSQL(el?.datum).toFormat('yyyy.LL.dd')
    : 'kein Datum'
  const geplant = el?.geplant ? ' (geplant)' : ''
  return `${
    el?.nr ?? '(keine Nr)'
  }, ${date}: von ${herkunftNr}, ${personName}; ${artName}${geplant}`
}
