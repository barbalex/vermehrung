import teilkulturSort from './teilkulturSort'

export default (a, b) => {
  const tkA = a?.teilkultur || {}
  const tkB = b?.teilkultur || {}

  return teilkulturSort(tkA, tkB)
}
