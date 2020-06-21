import moment from 'moment'

export default (s) => {
  const datum = s?.datum ? moment(s.datum).format('DD.MM.YYYY') : '(kein Datum)'
  const nr = s?.herkunft?.nr ?? '(keine Nr)'
  const person = s?.person?.fullname ?? '(kein Name)'
  const label = `${datum}: Herkunft ${nr}; ${person}`

  return label
}
