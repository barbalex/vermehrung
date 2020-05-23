export default (s) => {
  const datum = s?.datum ?? '(kein Datum)'
  const nr = s?.herkunft?.nr ?? '(keine Nr)'
  const person = s?.person?.name ?? '(kein Name)'
  const label = `${datum}: Herkunft ${nr}; ${person}`

  return label
}
