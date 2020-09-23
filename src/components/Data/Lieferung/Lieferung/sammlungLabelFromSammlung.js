import { DateTime } from 'luxon'

export default (s) => {
  const datum = s?.datum
    ? DateTime.fromSQL(s.datum).toFormat('dd.LL.yyyy')
    : '(kein Datum)'
  const nr = s?.herkunft?.nr ?? '(keine Nr)'
  const person = s?.person?.fullname ?? '(kein Name)'
  const label = `${datum}: Herkunft ${nr}; ${person}`

  return label
}
