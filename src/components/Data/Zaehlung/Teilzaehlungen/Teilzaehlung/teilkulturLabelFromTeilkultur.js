export default (tk) => {
  if (tk?.name) return tk?.name
  if (tk?.ort1) {
    return `${tk?.ort1}${
      tk?.ort2 ? ` / ${tk?.ort2}${tk?.ort3 ? ` / ${tk?.ort3}` : ''}` : ''
    }`
  }
  return '(kein Name, kein Ort)'
}
