import teilkulturSort from './teilkulturSort'

export default ({ a, b, store }) => {
  const tkA = a?.teilkultur || {}
  const tkB = b?.teilkultur || {}

  return teilkulturSort(tkA, tkB)
}
